import { getSiteUrl, PHONE_NUMBER, type PageEntry } from "@/lib/fireguard";
import { getBreadcrumbItems } from "@/lib/links";
import { buildIntro } from "@/lib/page-content";
import { buildMetaDescription } from "@/lib/seo";
import { getCityFromSlug } from "@/lib/cities";

type FaqItem = {
  question: string;
  answer: string;
};

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fire Guard Group",
    url: siteUrl,
    telephone: PHONE_NUMBER,
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
  };
}

export function webSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fire Guard Group",
    url: siteUrl,
  };
}

export function breadcrumbJsonLd(page: PageEntry | null, isHome = false) {
  const siteUrl = getSiteUrl();
  const items = isHome
    ? [{ href: "/", label: "Home" }]
    : page
      ? getBreadcrumbItems(page)
      : [{ href: "/", label: "Home" }];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function serviceJsonLd(page: PageEntry) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${page.slug}`;
  const city = getCityFromSlug(page.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title.split("|")[0]?.trim() || page.title,
    description: buildIntro(page).slice(0, 300),
    url,
    provider: {
      "@type": "Organization",
      name: "Fire Guard Group",
      url: siteUrl,
      telephone: PHONE_NUMBER,
    },
    areaServed: city
      ? {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: city.province,
          },
        }
      : {
          "@type": "Country",
          name: "Canada",
        },
  };
}

export function localBusinessJsonLd(page: PageEntry) {
  const city = getCityFromSlug(page.slug);
  if (!city) return null;

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Fire Guard Group",
    url,
    telephone: PHONE_NUMBER,
    description: buildMetaDescription(page),
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.province,
      addressCountry: "CA",
    },
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function homeFaqJsonLd(faqs: FaqItem[]) {
  return faqPageJsonLd(faqs);
}
