import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withContentCollections } from "@content-collections/next";
const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["localhost", "*.fusihub.com", "fusihub.com"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withContentCollections(withNextIntl(nextConfig));
