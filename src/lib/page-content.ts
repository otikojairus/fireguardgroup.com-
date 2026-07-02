import { getCityDisplayName, getCityFromSlug, type CityProfile } from "@/lib/cities";
import { PHONE_NUMBER, getServiceFamily, type PageEntry } from "@/lib/fireguard";

export type FaqItem = { question: string; answer: string };

export type ContentSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "shield" | "clipboard" | "clock" | "building" | "check" | "phone";
};

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getServiceTopic(page: PageEntry): string {
  let keyword = (page.primaryKeyword || page.title).toLowerCase();
  const city = getCityFromSlug(page.slug);

  if (city) {
    const cityTokens = [city.slug, city.name.toLowerCase(), city.slug.replace(/-/g, " ")];
    for (const token of cityTokens) {
      keyword = keyword.replace(new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), "");
    }
    keyword = keyword.replace(/\s+/g, " ").trim();
  }

  return keyword
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getServiceListLabel(page: PageEntry): string {
  return getServiceTopic(page);
}

export function getPageH1(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const city = getCityDisplayName(page.targetArea);

  if (page.pageType === "City Service Page") {
    return `${topic} in ${city}`;
  }
  if (page.pageType === "Near Me Page") {
    return `Find ${topic} Near You`;
  }
  if (page.pageType === "Cost Guide") {
    const base = topic.replace(/\s+Cost$/i, "");
    return `What Does ${base} Cost?`;
  }
  if (page.pageType === "Rebate Guide") {
    return `${topic} Requirements in Ontario`;
  }
  if (page.pageType === "Service Page") {
    return topic;
  }
  return topic;
}

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length]!;
}

export function buildIntro(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const family = getServiceFamily(page).toLowerCase();
  const seed = hashSlug(page.slug);
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const nationalIntros = [
    `When an inspector walks your building, you want proof that every ${family} requirement is handled — not a scramble to find missing tags or outdated records. Our technicians visit commercial, industrial, and multi-residential properties across Canada with the tools, certifications, and documentation to keep you compliant. You get a clear schedule, a technician who explains what they found, and a report you can file without second-guessing. Whether you manage one site or a portfolio, we make the process predictable so you can focus on tenants and operations instead of fire-code paperwork.`,
    `Building owners call us when they need ${family} work done right the first time — before a failed inspection creates downtime, fines, or insurance headaches. We coordinate visits around your operating hours, tag and test equipment to current standards, and leave you with records that satisfy auditors and insurers alike. From walk-through to signed report, every step is explained in plain language. No jargon-filled invoices, no surprise callbacks — just thorough work from technicians who understand Canadian fire codes and respect your timeline.`,
    `Your occupants depend on systems that work when it matters. That is why we treat every ${family} visit as more than a checkbox: we inspect, test, document, and flag anything that needs attention before it becomes an emergency. Property managers appreciate our consistent scheduling, superintendents appreciate clear communication on-site, and owners appreciate reports they can hand to inspectors without editing. Serving buildings nationwide, we bring the same professionalism whether you operate a single retail plaza or a cross-country portfolio.`,
  ];

  const cityIntros = (profile: CityProfile) => [
    `Property teams in ${profile.name} juggle aging infrastructure, busy tenants, and inspections that do not wait for convenient timing. Near ${profile.landmark} and across ${profile.neighbourhood}, we help building owners stay ahead of requirements with on-site visits, clear tagging, and documentation ready for your next audit. With ${profile.population} and ${profile.climate}, equipment faces real wear — our technicians know what local conditions demand and explain findings in plain language so you can act fast.`,
    `From ${profile.neighbourhood} to the corridors around ${profile.landmark}, ${profile.name} buildings need ${family} support that respects tight schedules and strict codes. We schedule around your hours, test on-site, and deliver reports you can file the same week. ${profile.name}'s ${profile.climate} affects how equipment ages; we factor that into every visit so you are not caught off guard when an inspector arrives.`,
    `Managing a site in ${profile.name} means balancing ${profile.population}, variable weather, and the expectations of tenants who need the building open for business. Our local technicians serve ${profile.neighbourhood} and surrounding districts with the same rigour we bring nationwide — thorough inspections, honest recommendations, and records that stand up to review. You speak with a real coordinator, get a confirmed window, and know exactly what was checked before we leave.`,
  ];

  const nearMeIntro = `Searching for a nearby team should not mean calling five contractors and still wondering who is qualified. We route certified technicians to your address with clear arrival windows, upfront scope, and documentation included in every visit. Tell us your building type and location — we match you with the right specialist, confirm pricing before we dispatch, and follow up with a report you can keep on file. One call connects you to Canada-wide coverage with local response times that respect your schedule.`;

  const costIntro = `Budgeting for maintenance is easier when you know what drives the final invoice. Labour, equipment count, access difficulty, and compliance documentation all affect what you pay — and cutting corners on any of them usually costs more later. We break down typical price ranges, what is included in a standard visit, and when you should expect additional charges so there are no surprises on site. Use this guide to plan ahead, compare quotes fairly, and book work that keeps your building inspection-ready without overspending on work you do not need.`;

  const rebateIntro = `Ontario fire-code inspections can feel overwhelming when requirements change and deadlines stack up. This guide walks building owners through what inspectors look for, how to prepare documentation, and where provincial programs may offset upgrade costs. We focus on practical steps — who to contact, what to gather, and how to sequence repairs — so you enter your review confident rather than reactive. Whether you manage a heritage property or a new commercial build, clear preparation saves time and avoids costly rework.`;

  if (page.pageType === "City Service Page" && city) {
    return pick(cityIntros(city), seed);
  }
  if (page.pageType === "Near Me Page") return nearMeIntro;
  if (page.pageType === "Cost Guide") return costIntro;
  if (page.pageType === "Rebate Guide") return rebateIntro;

  return pick(nationalIntros, seed).replace(/family/g, family);
}

export function buildBodySections(page: PageEntry): ContentSection[] {
  const seed = hashSlug(page.slug);
  const family = getServiceFamily(page);
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const sections: ContentSection[] = [
    {
      id: "what-we-do",
      eyebrow: "What we do",
      title: pick(
        [
          "Thorough on-site work you can trust",
          "Inspection-ready from the first visit",
          "Clear results, no guesswork",
        ],
        seed,
      ),
      body: pick(
        [
          `Our technicians arrive with calibrated equipment, current certifications, and a checklist built for ${family.toLowerCase()} work. We walk the property with your superintendent, test each required point, photograph deficiencies, and tag compliant equipment before we leave. You receive a written summary the same day — not a vague invoice line item weeks later.`,
          `Every visit follows a documented process: scope confirmation, on-site testing, deficiency notes, and a signed report. We explain what passed, what needs attention, and recommended timelines so you can prioritize repairs without panic. Property managers use our records for insurance renewals, tenant communications, and internal maintenance planning.`,
          `We treat your building like our own reputation depends on it — because it does. Equipment is tested to applicable standards, access issues are noted respectfully, and your team gets a plain-language debrief before we pack up. No upselling scare tactics; just honest findings and a path to compliance.`,
        ],
        seed + 1,
      ),
      icon: "shield",
    },
    {
      id: "who-we-serve",
      eyebrow: "Who we serve",
      title: pick(
        ["Built for busy property teams", "Commercial and multi-residential focus", "Owners who need clarity fast"],
        seed + 2,
      ),
      body: pick(
        [
          "Office towers, retail plazas, warehouses, schools, condos, and mixed-use developments — if people occupy the building, we have likely serviced one like it. We coordinate with facility managers, respond to insurance-driven deadlines, and adapt to after-hours access when tenants cannot be disrupted.",
          "Our clients include national REITs, independent landlords, restaurant groups, and institutional facilities. What they share is a need for reliable scheduling, consistent technicians, and reports that satisfy fire officials without extra back-and-forth.",
          "Whether you oversee one address or dozens, you get a single point of contact, confirmed visit windows, and standardized reporting across your portfolio. That consistency makes audit season manageable instead of chaotic.",
        ],
        seed + 3,
      ),
      icon: "building",
    },
    {
      id: "how-it-works",
      eyebrow: "How it works",
      title: pick(["Three steps to done", "Simple scheduling, serious standards", "From call to completed report"], seed + 4),
      body: pick(
        [
          `Call ${PHONE_NUMBER} and tell us your building type, square footage, and preferred timing. We confirm scope and pricing, dispatch a certified technician, and deliver your report electronically. Most clients book recurring annual visits so nothing slips past the next inspection cycle.`,
          "Share your address and last inspection date — we handle the rest. A coordinator confirms access details, the technician completes on-site work, and you receive documentation within one business day. Need urgent support? Ask about expedited scheduling in your area.",
          "Start with a conversation, not a contract. We review what your building requires under current codes, propose a visit date that fits your operations, and follow up with actionable next steps if anything needs repair or replacement.",
        ],
        seed + 5,
      ),
      icon: "clock",
    },
  ];

  if (city) {
    sections.push({
      id: "local-context",
      eyebrow: `${cityName} coverage`,
      title: `Serving ${city.name} and nearby districts`,
      body: `Our ${city.name} clients include properties near ${city.landmark} and throughout ${city.neighbourhood}. With ${city.population} in a region known for ${city.climate}, equipment endures real stress — freeze-thaw cycles, humidity, and heavy daily use. We factor local conditions into every visit and can often coordinate multiple services in one trip when you manage several systems. Ask about bundled scheduling for portfolios in ${city.name} and surrounding communities.`,
      icon: "check",
    });
  }

  if (page.pageType === "Cost Guide") {
    sections.push({
      id: "pricing-factors",
      eyebrow: "Pricing factors",
      title: "What affects your quote",
      body: "Equipment quantity, building height, after-hours access, travel to remote sites, and repair parts all influence the final number. A straightforward annual visit on a single-floor retail unit costs less than a multi-tower portfolio with expired tags and locked mechanical rooms. We provide written quotes before dispatch so you can approve scope, compare vendors fairly, and avoid surprise line items when the technician arrives.",
      icon: "clipboard",
    });
  }

  return sections;
}

export function buildFaqs(page: PageEntry): FaqItem[] {
  const seed = hashSlug(page.slug);
  const family = getServiceFamily(page).toLowerCase();
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const pools: FaqItem[][] = [
    [
      {
        question: "How soon can you visit my building?",
        answer: `Most clients receive a confirmed window within a few business days. Tell us your address and urgency when you call ${PHONE_NUMBER} — we prioritize failed inspections and insurance deadlines.`,
      },
      {
        question: "What should I prepare before the technician arrives?",
        answer:
          "Unlock mechanical rooms, clear access to panels and equipment, and gather previous inspection reports if available. Your superintendent or facility contact should be on-site for the first 15 minutes to walk the route.",
      },
      {
        question: "Do you provide documentation for inspectors and insurers?",
        answer:
          "Yes. Every visit includes a written report with test results, deficiencies, photos where relevant, and recommended follow-up dates. Most clients store reports digitally and print copies for audit binders.",
      },
      {
        question: "Can you service multiple buildings on one contract?",
        answer:
          "Absolutely. Portfolio managers receive consolidated scheduling, standardized reporting formats, and a dedicated coordinator so every property stays on the same compliance calendar.",
      },
    ],
    [
      {
        question: "How often does my building need this work?",
        answer: `Most ${family} programs follow annual cycles, though some equipment or jurisdictions require semi-annual or monthly checks. We review your last report and local requirements to recommend the right interval.`,
      },
      {
        question: "What happens if something fails during the visit?",
        answer:
          "We document the deficiency clearly, explain the safety impact, and outline repair options with timelines. You decide whether we return for remediation or use your preferred contractor — either way, you know exactly what the inspector will ask about.",
      },
      {
        question: "Are your technicians certified?",
        answer:
          "Our field team holds current certifications relevant to fire and life-safety systems across Canadian jurisdictions. Credentials are available on request for property managers preparing audit packages.",
      },
      {
        question: "Do you work after hours or weekends?",
        answer:
          "Yes, when building operations require it. Restaurants, entertainment venues, and 24-hour facilities often need overnight or early-morning access — mention your constraints when booking.",
      },
    ],
    [
      {
        question: "Is there a minimum charge for small buildings?",
        answer:
          "Small sites still receive full documentation and on-site testing; minimum fees cover travel and setup. We quote transparently before confirming so you know the total before we dispatch.",
      },
      {
        question: "Can you coordinate with our existing maintenance vendor?",
        answer:
          "We regularly work alongside HVAC, electrical, and cleaning contractors. Share your vendor contacts and we align schedules to minimize duplicate trips and tenant disruption.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major business payment methods and can invoice property-management companies directly. Ask about net terms for established portfolio accounts.",
      },
      {
        question: "How do I book a recurring annual program?",
        answer: `Call ${PHONE_NUMBER} and ask to enroll in annual reminders. We track your due dates and reach out before the next cycle so inspections never lapse quietly.`,
      },
    ],
  ];

  const selected = pools[seed % pools.length]!.slice(0, 3);

  if (city) {
    selected.push({
      question: `Do you cover all areas of ${city.name}?`,
      answer: `Yes — including ${city.neighbourhood} and properties near ${city.landmark}. Mention your exact address when booking so we assign the closest available technician.`,
    });
  } else if (page.pageType === "Near Me Page") {
    selected.push({
      question: "How do you match me with a local technician?",
      answer:
        "We use your postal code and building type to route the nearest qualified team. You receive a confirmed arrival window and technician contact before the visit.",
    });
  } else if (page.pageType === "Cost Guide") {
    selected.push({
      question: "Can I get a firm quote before booking?",
      answer:
        "Yes. Share equipment counts, building size, and location — we provide a written quote with inclusions listed so you can compare options apples-to-apples.",
    });
  }

  return selected;
}

export function buildHomeIntro(): string {
  return "Your building's fire and life-safety systems exist for one reason: protecting people when seconds count. Yet between tenant turnover, equipment aging, and inspection deadlines, staying compliant often falls to whoever has the least spare time. Fire Guard Group exists to take that weight off your shoulders. We inspect extinguishers, alarms, sprinklers, emergency lighting, and backflow devices across Canada — with certified technicians who show up on schedule, explain what they find in plain language, and leave documentation you can hand to an inspector without rewriting. One call connects you to coordinated service whether you manage a single retail plaza or a national portfolio.";
}

export function buildHomeFaqs(): FaqItem[] {
  return [
    {
      question: "What types of buildings do you service?",
      answer:
        "We work with offices, retail, restaurants, warehouses, condos, schools, and institutional facilities. If people occupy the building, we can likely help — call to confirm scope for your specific systems.",
    },
    {
      question: "How quickly can I get a technician on-site?",
      answer: `Most areas receive a confirmed visit window within a few business days. Call ${PHONE_NUMBER} and mention urgent inspection deadlines — we prioritize time-sensitive bookings.`,
    },
    {
      question: "Can you handle multiple properties under one account?",
      answer:
        "Yes. Portfolio managers receive consolidated scheduling, standardized reports, and annual reminders so no property quietly falls out of compliance.",
    },
    {
      question: "Do you provide reports for insurance and fire officials?",
      answer:
        "Every visit includes written documentation with test results, deficiencies, and recommended follow-up. Clients use our reports for insurance renewals, tenant communications, and official inspections.",
    },
  ];
}

export function buildTrustPoints(): { title: string; description: string; icon: ContentSection["icon"] }[] {
  return [
    {
      title: "Certified technicians",
      description: "Field teams hold current credentials for fire and life-safety systems across Canadian jurisdictions.",
      icon: "shield",
    },
    {
      title: "Clear documentation",
      description: "Signed reports with test results and photos — ready for inspectors, insurers, and your own records.",
      icon: "clipboard",
    },
    {
      title: "Flexible scheduling",
      description: "Before-hours, after-hours, and weekend visits when your tenants cannot be disrupted.",
      icon: "clock",
    },
    {
      title: "Nationwide coverage",
      description: "Coordinated service from coast to coast with local response in major cities and regions.",
      icon: "building",
    },
  ];
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function getPageWordCount(page: PageEntry): number {
  const intro = buildIntro(page);
  const sections = buildBodySections(page);
  const faqs = buildFaqs(page);
  const body = sections.map((s) => s.body).join(" ");
  const faqText = faqs.map((f) => f.question + " " + f.answer).join(" ");
  return countWords(intro + " " + body + " " + faqText);
}
