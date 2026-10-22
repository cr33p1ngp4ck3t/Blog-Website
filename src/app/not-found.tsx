import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="shell not-found">
      <span className="section-label">404 / A SMALL DETOUR</span>
      <h1>
        Let’s find
        <br />
        your next move.
      </h1>
      <p>This page isn’t here, but there’s plenty to explore.</p>
      <Link href="/articles" className="primary-button">
        Back to the journal ↗
      </Link>
    </main>
  );
}
