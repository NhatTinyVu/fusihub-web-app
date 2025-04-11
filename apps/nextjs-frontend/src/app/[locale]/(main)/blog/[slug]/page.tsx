import type { Metadata, ResolvingMetadata } from "next";
import type { Article, WithContext } from "schema-dts";

import { setRequestLocale } from "@fusihub/i18n/server";
import { allBlogPosts } from "content-collections";
import { notFound } from "next/navigation";

import Mdx from "@/components/mdx";
import { SITE_NAME, SITE_URL } from "@/libs/constants";
import { getLocalizedPath } from "@/utils/get-localized-path";

import Providers from "./providers";
import PageTitle from "@/components/page-title";
import { getImageFromUrl } from "@/fusihub/utils";

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{
  slug: string;
  locale: string;
}> => {
  return allBlogPosts.map((blogPost) => ({
    slug: blogPost.slug,
    locale: blogPost.locale,
  }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug, locale } = await props.params;

  const blogPost = allBlogPosts.find(
    (p) => p.slug === slug && p.locale === locale
  );

  if (!blogPost) return {};

  const { date, modifiedTime, title, summary, imageUrl } = blogPost;

  const image = getImageFromUrl(imageUrl);
  const ISOPublishedTime = new Date(date).toISOString();
  const ISOModifiedTime = new Date(modifiedTime).toISOString();
  const previousOpenGraph = (await parent).openGraph ?? {};
  const url = getLocalizedPath({ slug: `/blog/${slug}`, locale });

  return {
    title: title,
    description: summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      type: "article",
      title: title,
      description: summary,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: SITE_URL,
      images: [
        {
          url: image.url,
          width: 1200,
          height: 630,
          alt: title,
          type: image.type,
        },
      ],
    },
  };
};

const Page = async (props: PageProps) => {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);

  const blogPost = allBlogPosts.find(
    (p) => p.slug === slug && p.locale === locale
  );
  const localizedPath = getLocalizedPath({ slug: `/blog/${slug}`, locale });
  const url = `${SITE_URL}${localizedPath}`;

  if (!blogPost) {
    notFound();
  }

  const { title, summary, date, modifiedTime, code, imageUrl } = blogPost;
  const image = getImageFromUrl(imageUrl);

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    name: title,
    description: summary,
    url,
    datePublished: date,
    dateModified: modifiedTime,
    image: image.url,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={summary} />
      <Providers post={blogPost}>
        <div className="mt-8 flex flex-col justify-between lg:flex-row">
          <article className="w-full">
            <Mdx code={code} />
          </article>
        </div>
      </Providers>
    </>
  );
};

export default Page;
