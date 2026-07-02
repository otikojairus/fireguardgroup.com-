import { getServiceFamily, type PageEntry } from "@/lib/fireguard";

export type SiteImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

function unsplash(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export const SITE_IMAGES = {
  homeHero: {
    src: unsplash("1581092918056-0c4c3acd3789"),
    alt: "Fire safety technician inspecting equipment in a commercial building",
    priority: true,
  },
  featureOffice: {
    src: unsplash("1497366216548-37526070297c", 900),
    alt: "Property manager reviewing fire safety compliance documents in a modern office",
  },
  extinguisher: {
    src: unsplash("1581092918056-0c4c3acd3789"),
    alt: "Technician inspecting a fire extinguisher mounted on a commercial wall",
    priority: true,
  },
  fireAlarm: {
    src: unsplash("1558002038-1055907df827"),
    alt: "Fire alarm control panel in a building utility room",
    priority: true,
  },
  sprinkler: {
    src: unsplash("1581578731548-c64695cc6952"),
    alt: "Fire sprinkler heads installed in a commercial ceiling",
    priority: true,
  },
  backflow: {
    src: unsplash("1621905251189-08b45d6a269e"),
    alt: "Technician testing backflow prevention equipment",
    priority: true,
  },
  lifeSafety: {
    src: unsplash("1586023492125-27b2c045efd7"),
    alt: "Emergency exit corridor with illuminated safety signage",
    priority: true,
  },
  skyline: {
    src: unsplash("1486406146926-c627a92ad1ab"),
    alt: "Modern commercial high-rise buildings in a Canadian city skyline",
    priority: true,
  },
  compliance: {
    src: unsplash("1558618666-fcd25c85cd64"),
    alt: "Fire safety professional reviewing building compliance checklist",
    priority: true,
  },
  technician: {
    src: unsplash("1621905252507-b35492cc74b4", 900),
    alt: "Safety technician in hard hat reviewing equipment checklist",
  },
  facility: {
    src: unsplash("1541339907198-e08756dedf3f", 900),
    alt: "Building manager walking through a commercial facility corridor",
  },
  building: {
    src: unsplash("1560179707-f14e90ef3623", 900),
    alt: "Commercial property exterior with glass facade",
  },
} satisfies Record<string, SiteImage>;

const FAMILY_IMAGES: Record<string, SiteImage> = {
  "Fire Extinguishers": SITE_IMAGES.extinguisher,
  "Fire Alarms & Detection": SITE_IMAGES.fireAlarm,
  "Suppression Systems": SITE_IMAGES.sprinkler,
  "Backflow & Water Systems": SITE_IMAGES.backflow,
  "Life Safety": SITE_IMAGES.lifeSafety,
  "Regional Coverage": SITE_IMAGES.skyline,
  Compliance: SITE_IMAGES.compliance,
};

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getHeroImage(page: PageEntry): SiteImage {
  const family = getServiceFamily(page);
  const base = FAMILY_IMAGES[family] ?? SITE_IMAGES.compliance;
  return { ...base, priority: true };
}

export function getSecondaryImage(page: PageEntry): SiteImage {
  const options = [SITE_IMAGES.technician, SITE_IMAGES.facility, SITE_IMAGES.building];
  return options[hashSlug(page.slug) % options.length]!;
}
