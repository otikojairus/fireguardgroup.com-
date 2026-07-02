import { getSiteUrl } from "@/lib/fireguard";

export function GET() {
  const siteUrl = getSiteUrl();
  const content = [
    "User-Agent: *",
    "Allow: /wp-content/uploads/",
    "Allow: /wp-content/themes/",
    "Allow: /*/*.js",
    "Allow: /*/*.css",
    "Allow: /wp-*.png",
    "Allow: /wp-*.jpg",
    "Allow: /wp-*.jpeg",
    "Allow: /wp-*.gif",
    "Allow: /wp-*.svg",
    "Allow: /wp-*.pdf",
    "Disallow: /cgi-bin",
    "Disallow: /wp-",
    "Disallow: /?s=",
    "Disallow: *&s=",
    "Disallow: /author/",
    "Disallow: *?attachment_id=",
    "Disallow: */feed",
    "Disallow: */rss",
    "Disallow: */embed",
    "",
    "User-Agent: facebookexternalhit",
    "Allow: /",
    "",
    "User-Agent: Twitterbot",
    "Allow: /",
    "",
    "User-Agent: LinkedInBot",
    "Allow: /",
    "",
    "User-Agent: WhatsApp",
    "Allow: /",
    "",
    "User-Agent: Googlebot",
    "Allow: /",
    "",
    "User-Agent: Bingbot",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
