export const isProduction = process.env.NODE_ENV === "production";

export const SITE_URL = isProduction
  ? "https://fusihub.me"
  : "http://local.fusihub.com";

export const GITHUB_USERNAME = "nhattinyvu";

export const SITE_NAME = "FusiHub";
export const SITE_DESCRIPTION =
  "A self-hosted, delightfully over-engineered personal website. Built with Next.js, Rust, and Axum. A place to share my thoughts and projects.";
export const SITE_KEYWORDS = [
  "nhattinyvu",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Rust",
  "Axum",
];

export const SITE_GITHUB_URL = "https://github.com/nhattinyvu";
export const SITE_FACEBOOK_URL = "https://www.facebook.com/nhattinyvu";
export const SITE_INSTAGRAM_URL = "https://www.instagram.com/nhattinyvu";
