import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How FinAid Hub uses local theme settings, anonymous site analytics, and external links.",
  alternates: { canonical: "/privacy-policy" },
};
export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">
          THE SMALL PRINT / UPDATED OCTOBER 2026
        </span>
        <h1>
          Your privacy
          <br />
          <span>matters here.</span>
        </h1>
      </div>
      <div className="simple-content prose">
        <h2>The information you enter.</h2>
        <p>
          The savings planner calculates estimates in your browser. It does not
          submit your savings amounts to our server or connect to your bank.
          Article search sends your search phrase to our server to find matching
          public content.
        </p>
        <h2>Local settings.</h2>
        <p>
          We store your light or dark theme choice in your browser’s local
          storage. You can remove it by clearing site data in your browser
          settings.
        </p>
        <h2>Site analytics.</h2>
        <p>
          This site uses Vercel Web Analytics to understand page visits and
          improve the reading experience. Learn how the service handles data in{" "}
          <a href="https://vercel.com/docs/analytics/privacy-policy">
            Vercel’s analytics privacy documentation
          </a>
          .
        </p>
        <h2>External services.</h2>
        <p>
          Articles and resources link to external websites with their own
          privacy practices. Share buttons open third party services. If
          comments are enabled by the site operator, Disqus processes comment
          activity according to its own terms. Article content and images are
          served through Sanity.
        </p>
        <h2>Contact.</h2>
        <p>
          See the <a href="/contact">contact page</a> for available editorial
          contact options. Do not send passwords, account numbers, or benefit
          application documents.
        </p>
      </div>
    </main>
  );
}
