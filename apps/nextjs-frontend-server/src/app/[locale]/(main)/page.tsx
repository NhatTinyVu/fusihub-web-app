import type { Metadata } from "next";
import type { WebSite, WithContext } from "schema-dts";

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/libs/constants";

import Intro from "@/components/home/intro";
import { getTranslations, setRequestLocale } from "@/fusihub/i18n/server";
import { getLocalizedPath } from "@/utils/get-localized-path";
import { i18n } from "@fusihub/i18n/config";
import AboutMe from "@/components/home/about-me";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { locale } = await props.params;

  return {
    alternates: {
      canonical: getLocalizedPath({ slug: "", locale }),
    },
  };
};

const HomePage = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("metadata");

  const url = `${SITE_URL}${getLocalizedPath({ slug: "", locale })}`;

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site-title"),
    description: t("site-description"),
    url,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_GITHUB_URL],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL,
    },
    inLanguage: locale,
    copyrightYear: new Date().getFullYear(),
    keywords: SITE_KEYWORDS,
    dateCreated: "2020-12-05",
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Intro />
      <AboutMe />
    </>
  );
};

export default HomePage;
