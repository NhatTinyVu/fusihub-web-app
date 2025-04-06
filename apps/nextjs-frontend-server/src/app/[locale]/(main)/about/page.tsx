import type { Metadata, ResolvingMetadata } from "next";
import type { AboutPage, WithContext } from "schema-dts";

import { i18n } from "@fusihub/i18n/config";
import { getTranslations, setRequestLocale } from "@fusihub/i18n/server";

import PageTitle from "@/components/page-title";
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
} from "@/libs/constants";
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
  const t = await getTranslations({ locale, namespace: "about" });
  const title = t("title");
  const description = t("description");
  const url = getLocalizedPath({ slug: "/about", locale });

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      type: "profile",
      title,
      description,
    },
  };
};

type ContentProps = {
  key: string;
  title: string;
  paragraphs?: string[];
  listItems?: { title: string; content: string }[];
};

const CONTENTS: ContentProps[] = [
  {
    key: "who-am-i",
    title: "WHO AM I",
    paragraphs: [
      "I'm a Full Stack Engineer based in Vietnam, passionate about cutting-edge technologies like Axum (Rust), Next.js, React, Astro, Remix, Postgres, cloud-native, serverless, and self-hosted architectures.",
      "Recently, I've been diving deeper into platform engineering, Rust-based backend, networking and infrastructure.",
    ],
  },
  {
    key: "what-powers-this-site",
    title: "What Powers This Site",
    listItems: [
      {
        title: "Frontend: Next.js",
        content:
          "I chose Next.js for its fast, flexible, and stunning development experience — perfect for building modern, responsive UIs with ease and performance in mind.",
      },
      {
        title: "Backend: Axum (Rust)",
        content:
          "The backend is built with Axum, a Rust-based web framework known for its type safety, security, and high performance. Acts as the dedicated service layer in front of the database — replacing the typical Node.js API — to deliver a consistent, reliable, and blazing-fast microservice architecture.",
      },
      {
        title: "Infrastructure",
        content:
          "This site runs on Proxmox, self-hosted on my old MacBook — a fun and budget-friendly way to sharpen my DevOps skills while keeping full control over the stack.",
      },
      {
        title: "Deployment",
        content:
          "Built as a Docker Compose microservice stack, it's highly flexible and can be deployed on VPS, serverless platforms, or cloud-native environments with ease.",
      },
      {
        title: "CDN & Networking",
        content:
          "Leveraging Cloudflared, the site is securely exposed to the internet with zero-cost egress, edge caching, and minimal overhead — I only pay for the domain.",
      },
    ],
  },
];

const Content = ({ title, paragraphs, listItems }: ContentProps) => {
  return (
    <>
      <h2 className="scroll-m-32" id="who-am-i">
        <a href="#who-am-i" className="group">
          {title}
        </a>
      </h2>
      {paragraphs?.map((paragraph, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <p key={index} className="text-lg">
          {paragraph}
        </p>
      ))}
      {listItems?.length ? (
        <ul>
          {listItems.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index} className="text-lg">
              <strong>{item.title}</strong>: {item.content}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

const Page = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const title = t("about.title");
  const description = t("about.description");
  const url = `${SITE_URL}${getLocalizedPath({ slug: "/about", locale })}`;

  const jsonLd: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      description: t("metadata.site-description"),
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
      <PageTitle title={title} description={description} />
      <div className="prose w-full">
        {CONTENTS.map((content) => (
          <Content
            key={content.key}
            title={content.title}
            paragraphs={content?.paragraphs}
            listItems={content?.listItems}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
