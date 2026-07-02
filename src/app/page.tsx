import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FeatureImage } from "@/components/feature-image";
import { HeroImage } from "@/components/hero-image";
import { ServiceIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { getAllPillarLinks } from "@/lib/links";
import { SITE_IMAGES } from "@/lib/images";
import { PHONE_LINK, PHONE_NUMBER, getPages, SITE_NAME } from "@/lib/fireguard";
import { buildHomeFaqs, buildHomeIntro, buildTrustPoints } from "@/lib/page-content";
import { buildHomeMetaDescription, buildHomeMetaTitle, buildHomeH1 } from "@/lib/seo";
import { breadcrumbJsonLd, homeFaqJsonLd } from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  const title = buildHomeMetaTitle();
  const description = buildHomeMetaDescription();

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
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

export default function HomePage() {
  const pillarLinks = getAllPillarLinks();
  const cityPages = getPages().filter((p) => p.pageType === "City Service Page");
  const faqs = buildHomeFaqs();
  const trustPoints = buildTrustPoints();

  const homeSchema: Record<string, unknown>[] = [breadcrumbJsonLd(null, true)];
  const faqSchema = homeFaqJsonLd(faqs);
  if (faqSchema) homeSchema.push(faqSchema);

  return (
    <>
      <JsonLd data={homeSchema} />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
            <p className="eyebrow">Canada-wide fire safety</p>
            <h1>{buildHomeH1()}</h1>
            <p className="lead">{buildHomeIntro()}</p>

            <div className="hero-actions">
              <a href={PHONE_LINK} className="button">
                Call {PHONE_NUMBER}
              </a>
              <a href="#services" className="button button-dark">
                Browse services
              </a>
            </div>
          </div>

          <HeroImage image={SITE_IMAGES.homeHero} />
        </div>
      </section>

      <section className="section section-light" id="services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Our services</p>
            <h2>Everything your building needs to stay inspection-ready</h2>
            <p className="muted">
              From annual extinguisher checks to backflow testing and emergency lighting — one team, clear reports,
              coast-to-coast coverage.
            </p>
          </div>

          <div className="page-grid">
            {pillarLinks.map((link) => (
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

      <section className="section">
        <div className="container trust-grid">
          {trustPoints.map((point) => (
            <article key={point.title} className="trust-card trust-card-dark">
              <div className="trust-icon-wrap">
                <ServiceIcon name={point.icon} />
              </div>
              <h2>{point.title}</h2>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-light" id="coverage">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Local coverage</p>
            <h2>Technicians in cities across Canada</h2>
            <p className="muted">Select your area for local scheduling, or call for nationwide portfolio support.</p>
          </div>

          <div className="location-grid">
            {cityPages.map((page) => (
              <Link key={page.slug} href={page.slug} className="location-card">
                {page.targetArea.replace(/,.*$/, "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-feature">
          <FeatureImage image={SITE_IMAGES.featureOffice} />
          <div className="split-feature-copy">
            <p className="eyebrow">Why owners choose us</p>
            <h2>Compliance without the chaos</h2>
            <p className="lead">
              Inspection deadlines do not wait for convenient timing. We coordinate visits around your operations,
              document everything on-site, and flag issues before they become emergencies. Property managers get one
              coordinator; supers get clear walk-throughs; owners get reports they can file the same week.
            </p>
            <a href={PHONE_LINK} className="button">
              Get started
            </a>
          </div>
        </div>
      </section>

      <section className="section section-light" id="faq">
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

      <section className="section cta-section" id="contact">
        <div className="container cta-card">
          <div>
            <p className="eyebrow">Ready to book?</p>
            <h2>Your next inspection starts with one call</h2>
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
