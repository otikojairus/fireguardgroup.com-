import sectionsData from "@/data/fireguard-sections.json";
import pagesData from "@/data/fireguard-pages.json";

export type PageEntry = (typeof pagesData)[number];
export type SectionEntry = (typeof sectionsData)[number];

export const SITE_NAME = "Fire Guard Group";
export const SITE_DESCRIPTION =
  "Certified fire safety inspections for Canadian buildings — extinguishers, alarms, sprinklers, and backflow testing with clear reports and fast scheduling.";
export const PHONE_NUMBER = "1-888-793-2080";
export const PHONE_LINK = `tel:${PHONE_NUMBER.replace(/[^0-9+]/g, "")}`;
export const DEFAULT_SITE_URL = "https://fireguardgroup.com";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

export function getPages() {
  return [...pagesData] as PageEntry[];
}

export function getSections() {
  return [...sectionsData] as SectionEntry[];
}

export function getPageByPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return getPages().find((page) => page.slug === normalized) ?? null;
}

export function normalizePath(pathname: string) {
  const trimmed = pathname.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function pathToSlugParts(pathname: string) {
  return normalizePath(pathname)
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean);
}

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getServiceFamily(page: PageEntry) {
  const slug = page.slug;
  if (slug.includes("fire-extinguisher")) return "Fire Extinguishers";
  if (slug.includes("fire-alarm") || slug.includes("fire-detection")) return "Fire Alarms & Detection";
  if (slug.includes("fire-suppression") || slug.includes("fire-sprinkler") || slug.includes("kitchen-fire-suppression")) {
    return "Suppression Systems";
  }
  if (slug.includes("backflow")) return "Backflow & Water Systems";
  if (
    slug.includes("fire-safety-plan") ||
    slug.includes("emergency-lighting") ||
    slug.includes("fire-door") ||
    slug.includes("fire-damper") ||
    slug.includes("passive-fire-protection")
  ) {
    return "Life Safety";
  }
  if (slug.includes("fire-protection")) return "Regional Coverage";
  return titleCase(slug.replace(/^\//, "").split("/")[0] || "Compliance");
}

export function getSectionSummary(section: SectionEntry) {
  const first = section.pages[0];
  const last = section.pages[section.pages.length - 1];
  return {
    title: section.heading,
    count: section.pages.length,
    lead: first?.title ?? section.heading,
    slugSpan: `${first?.slug ?? "/"} to ${last?.slug ?? "/"}`,
  };
}

export function buildPageDescription(page: PageEntry) {
  const family = getServiceFamily(page);
  const area = page.targetArea || "Canada";

  if (page.pageType === "Cost Guide") {
    return `Compare pricing, service factors, and compliance expectations for ${page.title.toLowerCase()} in ${area}.`;
  }

  if (page.pageType === "Near Me Page") {
    return `Fast, local ${page.primaryKeyword || page.title.toLowerCase()} support in ${area} with a Canada-wide compliance team.`;
  }

  if (page.pageType === "City Service Page") {
    return `${page.title} built for ${area}, with a focused local compliance landing page for ${family.toLowerCase()}.`;
  }

  if (page.pageType === "Rebate Guide") {
    return `A clear compliance guide for ${area} covering requirements, planning steps, and available savings for ${page.title.toLowerCase()}.`;
  }

  return `${page.title} for ${area}. Built as a focused ${family.toLowerCase()} page with clear compliance messaging and a fast call-to-action.`;
}

export function buildFaqs(page: PageEntry) {
  const family = getServiceFamily(page).toLowerCase();
  const keyword = page.primaryKeyword || page.title;
  const area = page.targetArea || "Canada";

  return [
    {
      question: `What does ${page.title} cover?`,
      answer: `This page covers the key compliance, inspection, and service steps for ${keyword} in ${area}, with a focus on practical next steps.`,
    },
    {
      question: `How often should this service be scheduled?`,
      answer: `Most ${family} work follows annual or code-driven intervals, but the right cadence depends on the building type, equipment, and local requirements.`,
    },
    {
      question: `Do you serve ${area}?`,
      answer: `Yes. The site is structured for Canada-wide coverage, and the page is tuned to ${area} so local teams can find the right service quickly.`,
    },
    {
      question: `What is the fastest way to book?`,
      answer: `Click to call ${PHONE_NUMBER} for a fast response and a compliance-focused conversation about the job, location, and timing.`,
    },
  ];
}

export function buildServiceBullets(page: PageEntry) {
  const family = getServiceFamily(page);
  const primary = page.primaryKeyword || page.title;
  const area = page.targetArea || "Canada";

  return [
    `${family} coverage tailored to ${area}`,
    `Built around ${primary}`,
    `Clear compliance, inspection, and booking next steps`,
  ];
}

export function buildHeroStats() {
  return [
    { value: "75", label: "planned pages" },
    { value: "16", label: "content clusters" },
    { value: "24/7", label: "response-first positioning" },
    { value: "Canada", label: "national coverage" },
  ];
}

export function getFeaturedPages() {
  return getPages().filter((page) => page.index <= 12 || page.pageType === "City Service Page").slice(0, 12);
}

export function getRelatedPages(page: PageEntry, limit = 4) {
  const family = getServiceFamily(page);
  return getPages()
    .filter((item) => item.slug !== page.slug && getServiceFamily(item) === family)
    .slice(0, limit);
}

export function getPageBreadcrumb(page: PageEntry) {
  const section = getSections().find((item) => item.pages.some((child) => child.slug === page.slug));
  return [section?.heading ?? "Fire Guard Group", page.title];
}
