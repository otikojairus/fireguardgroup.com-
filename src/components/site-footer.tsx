import Link from "next/link";
import { getAllPillarLinks } from "@/lib/links";
import { PHONE_LINK, PHONE_NUMBER, SITE_NAME } from "@/lib/fireguard";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#coverage", label: "Locations" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  const pillars = getAllPillarLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core" />
            </span>
            <strong>{SITE_NAME}</strong>
          </Link>
          <p>
            Certified fire safety inspections for commercial and multi-residential buildings across Canada.
          </p>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <nav aria-label="Footer services">
            <ul>
              {pillars.slice(0, 8).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <nav aria-label="Footer company">
            <ul>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-column footer-contact-col">
          <h3>Contact</h3>
          <p>Speak with a coordinator about scheduling, pricing, or compliance questions.</p>
          <a href={PHONE_LINK} className="footer-phone">
            {PHONE_NUMBER}
          </a>
          <a href={PHONE_LINK} className="button footer-cta">
            Book a visit
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {SITE_NAME}. All rights reserved.</p>
        <p>Fire extinguisher, alarm, sprinkler &amp; backflow inspections — coast to coast.</p>
      </div>
    </footer>
  );
}
