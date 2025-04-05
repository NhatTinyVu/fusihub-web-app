import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import {
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/libs/constants";

import Providers from "./providers";

type LayoutProps = {
  children: React.ReactNode;
};

export const generateMetadata = async (
  props: LayoutProps
): Promise<Metadata> => {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
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
      title: SITE_NAME,
      siteName: SITE_NAME,
      description: SITE_DESCRIPTION,
      locale: "en_US",
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: SITE_DESCRIPTION,
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default Layout;
