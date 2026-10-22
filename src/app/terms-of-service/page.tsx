import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms",
  description:
    "FinAid Hub provides educational money guides and estimates, with source links for current program rules and terms.",
  alternates: { canonical: "/terms-of-service" },
};
export default function TermsPage() {
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">
          THE SMALL PRINT / UPDATED OCTOBER 2026
        </span>
        <h1>
          A little clarity
          <br />
          <span>before you begin.</span>
        </h1>
      </div>
      <div className="simple-content prose">
        <h2>Educational information.</h2>
        <p>
          FinAid Hub publishes general information about saving, credit, and
          financial assistance. Content is not individualized financial, legal,
          tax, or investment advice. We do not process benefit applications or
          guarantee eligibility, savings, or approval.
        </p>
        <h2>Check current details.</h2>
        <p>
          Program rules, rates, and fees can change. Confirm important details
          with the official provider before applying or making a decision.
          Assistance guides focus on the United States unless a guide says
          otherwise.
        </p>
        <h2>Tools and estimates.</h2>
        <p>
          The savings planner shows an estimate based on the numbers you enter.
          It excludes interest and fees. Account comparisons explain general
          product types and do not endorse a bank or guarantee an offered rate.
        </p>
        <h2>External links.</h2>
        <p>
          We link to official resources and other relevant websites. Those
          services have their own terms, availability, and privacy policies. An
          external link does not mean we control or endorse every part of the
          destination.
        </p>
        <h2>Responsible use.</h2>
        <p>
          Use the site lawfully and avoid interfering with its operation.
          Contact options, when available, are for editorial questions and
          corrections. See <a href="/privacy-policy">our privacy notice</a> for
          information about site data.
        </p>
      </div>
    </main>
  );
}
