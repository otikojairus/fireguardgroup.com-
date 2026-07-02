import { getPages, getSiteUrl } from "@/lib/fireguard";

export function GET() {
  const siteUrl = getSiteUrl();
  const urls = ["/", ...getPages().map((page) => page.slug)];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (path) => `  <url><loc>${siteUrl}${path === "/" ? "" : path}</loc></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
