import type { Metadata, ResolvingMetadata } from "next";
import type { AboutPage, WithContext } from "schema-dts";

import { i18n } from "@fusihub/i18n/config";
import { getTranslations, setRequestLocale } from "@fusihub/i18n/server";

import Mdx from "@/components/mdx";
import PageTitle from "@/components/page-title";
import {
  SITE_DESCRIPTION,
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
} from "@/libs/constants";
import { getLocalizedPath } from "@/utils/get-localized-path";

import { allPages } from "content-collections";
import { getImageFromUrl } from "@/fusihub/utils";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getPageMdx = (locale: string) =>
  allPages.find((p) => p.slug === "about" && p.locale === locale);

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params;
  const previousOpenGraph = (await parent).openGraph ?? {};
  const t = await getTranslations({ locale, namespace: "about" });
  const url = getLocalizedPath({ slug: "/about", locale });
  const page = getPageMdx(locale);
  const title = page?.title ?? t("title");
  const description = page?.summary ?? t("description");
  const image = getImageFromUrl(page?.imageUrl);
  const images = page?.imageUrl
    ? {
        images: [
          {
            url: image.url,
            alt: description,
            type: image.type,
          },
        ],
      }
    : {};

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      ...images,
      url,
      type: "profile",
      title,
      description,
    },
  };
};

const Page = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const page = getPageMdx(locale);
  const title = page?.title ?? t("about.title");
  const description = page?.summary ?? t("about.description");
  const url = `${SITE_URL}${getLocalizedPath({ slug: "/about", locale })}`;

  const jsonLd: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    mainEntity: {
      "@type": "Person",
      name: title,
      description,
      url: SITE_URL,
      sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_GITHUB_URL],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={SITE_NAME} description={SITE_DESCRIPTION} />
      {!!page?.code && <Mdx code={page?.code} />}
    </>
  );
};

export default Page;
