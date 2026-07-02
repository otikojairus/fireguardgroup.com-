import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/fireguard";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: "/fireguard-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/fireguard-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable}`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
