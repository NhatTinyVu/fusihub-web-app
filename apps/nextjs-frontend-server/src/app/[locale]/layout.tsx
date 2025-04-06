import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "@fusihub/i18n/client";
import { routing } from "@fusihub/i18n/routing";
import { getTranslations, setRequestLocale } from "@fusihub/i18n/server";
import { cn } from "@fusihub/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { i18n } from "@fusihub/i18n/config";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "@/styles/globals.css";

import { SITE_KEYWORDS, SITE_URL } from "@/libs/constants";

import Providers from "../providers";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: LayoutProps
): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("site-title"),
      template: `%s | ${t("site-title")}`,
    },
    description: t("site-description"),
    robots: {
      index: false,
      follow: false,
    },
    manifest: "/favicon/site.webmanifest",
    keywords: SITE_KEYWORDS,
    creator: "nhattinyvu",
    openGraph: {
      url: SITE_URL,
      type: "website",
      title: t("site-title"),
      siteName: t("site-title"),
      description: t("site-description"),
      locale,
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: t("site-description"),
          type: "image/png",
        },
      ],
    },
    icons: {
      icon: "/favicon/favicon.svg",
      shortcut: "/favicon/favicon.svg",
      apple: [
        {
          url: "/favicon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/favicon/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/favicon/favicon-32x32.png",
        },
      ],
    },
  };
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const Layout = async (props: LayoutProps) => {
  const { children } = props;
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col">
        <NuqsAdapter>
          <Providers>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default Layout;
