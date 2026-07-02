import { SITE_NAME, type PageEntry } from "@/lib/fireguard";
import { getCityDisplayName } from "@/lib/cities";
import { getServiceTopic } from "@/lib/page-content";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const trimmed = text.slice(0, max - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? trimmed.slice(0, lastSpace) : trimmed).trim() + "…";
}

export function buildMetaTitle(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const city = getCityDisplayName(page.targetArea);
  const isNational =
    page.targetArea.includes("National") || page.targetArea === "Canada" || page.pageType === "Near Me Page";

  let title: string;
  if (page.pageType === "City Service Page") {
    title = `${topic} ${city} | ${SITE_NAME}`;
  } else if (page.pageType === "Cost Guide") {
    title = `${topic} Cost Guide | ${SITE_NAME}`;
  } else if (page.pageType === "Rebate Guide") {
    title = `${topic} Guide Ontario | ${SITE_NAME}`;
  } else if (page.pageType === "Near Me Page") {
    title = `${topic} Near You | ${SITE_NAME}`;
  } else {
    title = isNational ? `${topic} Canada | ${SITE_NAME}` : `${topic} | ${SITE_NAME}`;
  }

  if (title.length > 60) {
    title = truncate(`${topic} | ${SITE_NAME}`, 60);
  }
  if (title.length < 50) {
    title = truncate(`${topic} Services | ${SITE_NAME}`, 60);
  }
  return title;
}

export function buildMetaDescription(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const city = getCityDisplayName(page.targetArea);
  const isCity = page.pageType === "City Service Page";

  const variants = [
    isCity
      ? `Need ${topic.toLowerCase()} in ${city}? Certified technicians, clear pricing, and documentation you can hand to your inspector. Call now for a same-week visit.`
      : `Certified ${topic.toLowerCase()} for commercial and multi-residential buildings across Canada. Scheduled visits, full reports, and code-ready documentation. Call today.`,
    isCity
      ? `${topic} for ${city} property managers and building owners. We handle scheduling, tagging, and compliance paperwork so you pass inspection the first time. Book a visit.`
      : `Keep your building inspection-ready with professional ${topic.toLowerCase()}. Annual programs, emergency response, and detailed service records. Speak with a technician today.`,
    page.pageType === "Cost Guide"
      ? `Understand ${topic.toLowerCase()} pricing before you book. We break down labour, parts, and compliance factors so you can budget with confidence. Get a quote today.`
      : `From walk-through to signed report, our team makes ${topic.toLowerCase()} straightforward. Serving ${isCity ? city : "Canada"} with licensed technicians. Call for availability.`,
  ];

  const pick = variants[page.index % variants.length]!;
  return truncate(pick, 160);
}

export function buildHomeMetaTitle(): string {
  return `Fire Safety Inspections Canada | ${SITE_NAME}`;
}

export function buildHomeMetaDescription(): string {
  return truncate(
    "Fire extinguisher, alarm, sprinkler, and backflow inspections for Canadian building owners. Certified technicians, clear reports, and fast scheduling. Call 1-888-793-2080.",
    160,
  );
}

export function buildHomeH1(): string {
  return "Fire Safety Inspections & Compliance for Canadian Buildings";
}
