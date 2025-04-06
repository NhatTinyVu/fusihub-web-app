import type { NextRequest } from "next/server";

import { i18nMiddleware } from "@fusihub/i18n/middleware";

const middleware = (request: NextRequest) => {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.fusihub.com unpkg.com;
    style-src 'self' 'unsafe-inline' *.fusihub.com;
    img-src * blob: data:;
    font-src 'self' data: *.fusihub.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src *;
    media-src 'self';
    frame-ancestors 'none';
    frame-src *.fusihub.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src blob: 'self';
  `;

  const response = i18nMiddleware(request);

  response.headers.set("Content-Security-Policy", csp.replaceAll("\n", ""));

  return response;
};

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - _vercel (Vercel internal)
   * - favicon.ico (favicon file)
   * - folders in public (which resolve to /foldername)
   * - sitemap.xml
   * - robots.txt
   * - rss.xml
   */
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|og|favicon|fonts|images|videos|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)",
  ],
};

export default middleware;
