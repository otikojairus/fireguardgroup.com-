import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FeatureImage } from "@/components/feature-image";
import { HeroImage } from "@/components/hero-image";
import { ServiceIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import {
  getBreadcrumbItems,
  getCrossServiceCityLinks,
  getEmergencyStyleLinks,
  getPillarCityLinks,
  getPillarPage,
  getRelatedServiceLinks,
  isPillarPage,
} from "@/lib/links";
import {
  PHONE_LINK,
  PHONE_NUMBER,
  getPageByPath,
  getPages,
  getServiceFamily,
  normalizePath,
  SITE_NAME,
} from "@/lib/fireguard";
import {
  buildBodySections,
  buildFaqs,
  buildIntro,
  getPageH1,
} from "@/lib/page-content";
import { getHeroImage, getSecondaryImage } from "@/lib/images";
import { buildMetaDescription, buildMetaTitle } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/structured-data";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slug.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = normalizePath(slug.join("/"));
  const page = getPageByPath(path);

  if (!page) {
    return {};
  }

  const title = buildMetaTitle(page);
  const description = buildMetaDescription(page);

  return {
    title,
    description,
    alternates: {
      canonical: page.slug,
    },
    openGraph: {
      title,
      description,
      url: page.slug,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FireguardSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const path = normalizePath(slug.join("/"));
  const page = getPageByPath(path);

  if (!page) {
    notFound();
  }

  const h1 = getPageH1(page);
  const intro = buildIntro(page);
  const sections = buildBodySections(page);
  const faqs = buildFaqs(page);
  const heroImage = getHeroImage(page);
  const secondaryImage = getSecondaryImage(page);
  const breadcrumbs = getBreadcrumbItems(page);
  const pillar = getPillarPage(page);
  const family = getServiceFamily(page);

  const cityLinks = pillar && isPillarPage(pillar) ? getPillarCityLinks(pillar) : [];
  const crossLinks = getCrossServiceCityLinks(page);
  const relatedLinks = getRelatedServiceLinks(page);
  const emergencyLinks = getEmergencyStyleLinks(page);

  const schemaItems: Record<string, unknown>[] = [];
  const breadcrumb = breadcrumbJsonLd(page);
  const service = serviceJsonLd(page);
  const localBusiness = localBusinessJsonLd(page);
  const faqSchema = faqPageJsonLd(faqs);
  if (breadcrumb) schemaItems.push(breadcrumb);
  if (service) schemaItems.push(service);
  if (localBusiness) schemaItems.push(localBusiness);
  if (faqSchema) schemaItems.push(faqSchema);

  return (
    <>
      <JsonLd data={schemaItems} />

      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <Breadcrumbs items={breadcrumbs} />
            <p className="eyebrow">{family}</p>
            <h1>{h1}</h1>
            <p className="lead">{intro}</p>

            <div className="hero-actions">
              <a href={PHONE_LINK} className="button">
                Call {PHONE_NUMBER}
              </a>
              {pillar && pillar.slug !== page.slug ? (
                <Link href={pillar.slug} className="button button-dark">
                  View national overview
                </Link>
              ) : null}
            </div>
          </div>

          <HeroImage image={heroImage} />
        </div>
      </section>

      <section className="section section-light">
        <div className="container trust-grid">
          {sections.slice(0, 3).map((section) => (
            <article key={section.id} className="trust-card">
              <div className="trust-icon-wrap">
                <ServiceIcon name={section.icon} />
              </div>
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      {sections.length > 3 ? (
        <section className="section">
          <div className="container split-feature">
            <FeatureImage image={secondaryImage} />
            <div className="split-feature-copy">
              <p className="eyebrow">{sections[3]!.eyebrow}</p>
              <h2>{sections[3]!.title}</h2>
              <p className="lead">{sections[3]!.body}</p>
              <a href={PHONE_LINK} className="button">
                Schedule a visit
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {cityLinks.length > 0 ? (
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Locations we serve</p>
              <h2>Book a technician in your city</h2>
              <p className="muted">Select your area for local scheduling and on-site support.</p>
            </div>
            <div className="location-grid">
              {cityLinks.map((link) => (
                <Link key={link.href} href={link.href} className="location-card">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Common questions</p>
            <h2>What building owners ask us</h2>
          </div>

          <div className="faq-grid">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-card">
                <summary>
                  <h3>{faq.question}</h3>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {(crossLinks.length > 0 || relatedLinks.length > 0 || emergencyLinks.length > 0) ? (
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Related services</p>
              <h2>More ways we can help your building</h2>
            </div>

            <div className="page-grid related-grid">
              {[...crossLinks, ...relatedLinks, ...emergencyLinks]
                .filter((link, index, arr) => arr.findIndex((l) => l.href === link.href) === index)
                .filter((link) => link.href !== page.slug)
                .slice(0, 6)
                .map((link) => (
                  <Link key={link.href} href={link.href} className="page-card">
                    <h3>{link.label}</h3>
                    <span className="card-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section cta-section">
        <div className="container cta-card">
          <div>
            <p className="eyebrow">Ready to book?</p>
            <h2>Speak with a technician today</h2>
            <p className="muted">
              Tell us your building type and location — we confirm scope, pricing, and the next available visit window.
            </p>
          </div>
          <a href={PHONE_LINK} className="button">
            Call {PHONE_NUMBER}
          </a>
        </div>
      </section>
    </>
  );
}
