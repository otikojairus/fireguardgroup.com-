import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container not-found">
        <p className="eyebrow">Page not found</p>
        <h1>We could not find that fire safety page.</h1>
        <p className="muted">
          The workbook only includes the planned routes, so this path may not be part of the current SEO map.
        </p>
        <Link href="/" className="button">
          Return home
        </Link>
      </div>
    </section>
  );
}
