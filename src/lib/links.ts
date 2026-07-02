import { getCityFromSlug } from "@/lib/cities";
import { getPages, getServiceFamily, type PageEntry } from "@/lib/fireguard";
import { getPageH1, getServiceListLabel } from "@/lib/page-content";

export type InternalLink = {
  href: string;
  label: string;
};

const PILLAR_TYPES = new Set(["Service Pillar", "Service Page", "Near Me Page", "Cost Guide", "Rebate Guide"]);

function linkLabel(page: PageEntry): string {
  return getPageH1(page);
}

function listLabel(page: PageEntry): string {
  return getServiceListLabel(page);
}

export function isPillarPage(page: PageEntry): boolean {
  return PILLAR_TYPES.has(page.pageType);
}

export function getPillarSlug(page: PageEntry): string | null {
  const pillar = getPillarPage(page);
  return pillar?.slug ?? null;
}

export function getPillarPage(page: PageEntry): PageEntry | null {
  if (isPillarPage(page)) return page;
  if (page.pageType !== "City Service Page") return null;

  const pageSlug = page.slug.replace(/^\//, "");
  const pillars = getPages()
    .filter((p) => isPillarPage(p))
    .sort((a, b) => b.slug.length - a.slug.length);

  for (const pillar of pillars) {
    const prefix = pillar.slug.replace(/^\//, "");
    if (pageSlug.startsWith(`${prefix}-`)) {
      return pillar;
    }
  }

  return null;
}

export function getCityPagesForPillar(pillar: PageEntry): PageEntry[] {
  const prefix = pillar.slug.replace(/^\//, "");
  return getPages().filter(
    (p) => p.pageType === "City Service Page" && p.slug.replace(/^\//, "").startsWith(`${prefix}-`),
  );
}

export function getCitySiblingPages(page: PageEntry, limit = 5): PageEntry[] {
  const pillar = getPillarPage(page);
  if (!pillar) return [];
  return getCityPagesForPillar(pillar)
    .filter((p) => p.slug !== page.slug)
    .slice(0, limit);
}

export function getCrossServiceCityLinks(page: PageEntry, limit = 4): InternalLink[] {
  if (page.pageType !== "City Service Page") return [];
  const area = page.targetArea;
  return getPages()
    .filter((p) => p.pageType === "City Service Page" && p.targetArea === area && p.slug !== page.slug)
    .slice(0, limit)
    .map((p) => ({
      href: p.slug,
      label: linkLabel(p),
    }));
}

export function getFamilyCityLinks(page: PageEntry): InternalLink[] {
  const family = getServiceFamily(page);
  return getPages()
    .filter((p) => p.pageType === "City Service Page" && getServiceFamily(p) === family)
    .map((p) => ({
      href: p.slug,
      label: getCityFromSlug(p.slug)?.name ?? p.targetArea.replace(/,.*$/, ""),
    }));
}

export function getPillarCityLinks(pillar: PageEntry): InternalLink[] {
  const prefixLinks = getCityPagesForPillar(pillar).map((p) => ({
    href: p.slug,
    label: getCityFromSlug(p.slug)?.name ?? p.targetArea.replace(/,.*$/, ""),
  }));

  if (prefixLinks.length > 0) return prefixLinks;
  return getFamilyCityLinks(pillar);
}

export function getEmergencyStyleLinks(page: PageEntry): InternalLink[] {
  const pillar = getPillarPage(page) ?? (isPillarPage(page) ? page : null);
  const links: InternalLink[] = [];

  if (pillar && pillar.slug !== page.slug) {
    links.push({
      href: pillar.slug,
      label: listLabel(pillar),
    });
  }

  const cities = pillar ? getCityPagesForPillar(pillar) : getPages().filter((p) => p.pageType === "City Service Page");
  cities.slice(0, 5).forEach((p) => {
    links.push({
      href: p.slug,
      label: getCityFromSlug(p.slug)?.name ?? p.targetArea.replace(/,.*$/, ""),
    });
  });

  return links;
}

export function getBreadcrumbItems(page: PageEntry): InternalLink[] {
  const items: InternalLink[] = [{ href: "/", label: "Home" }];
  const family = getServiceFamily(page);
  const pillar = getPillarPage(page);

  if (pillar && pillar.slug !== page.slug) {
    items.push({
      href: pillar.slug,
      label: listLabel(pillar),
    });
  } else if (isPillarPage(page)) {
    items.push({ href: page.slug, label: family });
  }

  if (page.pageType === "City Service Page") {
    const city = getCityFromSlug(page.slug);
    items.push({
      href: page.slug,
      label: city?.name ?? page.targetArea.replace(/,.*$/, ""),
    });
  } else if (!isPillarPage(page)) {
    items.push({
      href: page.slug,
      label: linkLabel(page),
    });
  }

  return items;
}

export function getRelatedServiceLinks(page: PageEntry, limit = 4): InternalLink[] {
  const family = getServiceFamily(page);
  return getPages()
    .filter((p) => p.slug !== page.slug && getServiceFamily(p) === family && isPillarPage(p))
    .slice(0, limit)
    .map((p) => ({
      href: p.slug,
      label: listLabel(p),
    }));
}

export function getAllPillarLinks(): InternalLink[] {
  return getPages()
    .filter((p) => p.pageType === "Service Pillar")
    .map((p) => ({
      href: p.slug,
      label: listLabel(p),
    }));
}

export function getOrphanCheck(): string[] {
  const pages = getPages();
  const inbound = new Map<string, number>();
  inbound.set("/", 1);

  for (const page of pages) {
    const pillar = getPillarPage(page);
    if (pillar && pillar.slug !== page.slug) {
      inbound.set(page.slug, (inbound.get(page.slug) ?? 0) + 1);
    }
    getCityPagesForPillar(page).forEach((city) => {
      inbound.set(city.slug, (inbound.get(city.slug) ?? 0) + 1);
    });
    getCrossServiceCityLinks(page).forEach((link) => {
      inbound.set(link.href, (inbound.get(link.href) ?? 0) + 1);
    });
    getRelatedServiceLinks(page).forEach((link) => {
      inbound.set(link.href, (inbound.get(link.href) ?? 0) + 1);
    });
  }

  return pages.filter((p) => !inbound.has(p.slug)).map((p) => p.slug);
}
