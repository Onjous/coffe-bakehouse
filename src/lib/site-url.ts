/**
 * Absolute origin for metadata, the sitemap and robots.txt, read at build time.
 *
 * 1. NEXT_PUBLIC_SITE_URL, if set (e.g. "https://ninepence.cafe").
 * 2. The production domain Vercel provides to every build.
 * 3. localhost, for local builds.
 */
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")
).replace(/\/+$/, "");
