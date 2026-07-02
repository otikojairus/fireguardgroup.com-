import Link from "next/link";
import { PHONE_LINK, PHONE_NUMBER, SITE_NAME } from "@/lib/fireguard";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#coverage", label: "Locations" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={SITE_NAME}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
          </span>
          <span className="brand-copy">
            <strong>{SITE_NAME}</strong>
            <span className="brand-tagline">Fire safety inspections across Canada</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-meta">
            <span>Call for fast response</span>
            <a href={PHONE_LINK}>{PHONE_NUMBER}</a>
          </div>
          <a href={PHONE_LINK} className="button button-dark header-cta">
            Book a visit
          </a>
        </div>
      </div>
    </header>
  );
}
