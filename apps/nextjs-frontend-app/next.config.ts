import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rely on moon for these tasks
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
