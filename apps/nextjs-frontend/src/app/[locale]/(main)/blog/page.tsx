import type { Metadata, ResolvingMetadata } from "next";
import type { Blog, WithContext } from "schema-dts";

import { i18n } from "@fusihub/i18n/config";
import { getTranslations, setRequestLocale } from "@fusihub/i18n/server";
import { allBlogPosts } from "content-collections";

import ListBlogPosts from "@/components/list-blog-posts";
import { SITE_NAME, SITE_URL } from "@/libs/constants";
import { getLocalizedPath } from "@/utils/get-localized-path";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params;
  const previousOpenGraph = (await parent).openGraph ?? {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t("title");
  const description = t("description");
  const url = getLocalizedPath({ slug: "/blog", locale });

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title,
      description,
    },
  };
};

const Page = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}${getLocalizedPath({ slug: "/blog", locale })}`;

  const blogPosts = allBlogPosts
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .filter((blogPost) => blogPost.locale === locale);

  const jsonLd: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": url,
    name: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: allBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${url}/${post.slug}`,
      datePublished: post.date,
      dateModified: post.modifiedTime,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListBlogPosts blogPosts={blogPosts} />
    </>
  );
};

export default Page;
