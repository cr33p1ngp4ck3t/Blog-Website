import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "FinAid Hub turns complicated money questions into practical next steps, with official sources and an independent editorial approach.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">OUR STORY</span>
        <h1>
          Less money stress.
          <br />
          <span>More room for life.</span>
        </h1>
        <p>
          Good financial information should feel like a helping hand. That’s why
          FinAid Hub exists.
        </p>
      </div>
      <div className="simple-content prose">
        <h2>Make your next step a little clearer.</h2>
        <p>
          Money touches everything: the roof over your head, the food on the
          table, and the plans you want to make. We explain everyday savings,
          credit, emergency funds, and financial assistance in plain language.
        </p>
        <p>
          You don’t need a perfect budget to get started. You need a useful
          answer, a realistic action, and a place to find reliable information.
        </p>
        <h2>Sources you can check.</h2>
        <p>
          Our finance guides link to primary sources, including the Consumer
          Financial Protection Bureau, Federal Trade Commission, FDIC, Energy
          Department, and USAGov. Sources appear at the end of each new guide so
          you can check the details yourself.
        </p>
        <p>
          Current news helps us choose useful subjects. Eligibility rules,
          product terms, and program availability come from official providers.
          We don’t promise approval for benefits or invent offers.
        </p>
        <h2>Clear about our limits.</h2>
        <p>
          Articles are educational information. They do not replace advice from
          a qualified professional who understands your circumstances. Our
          assistance guides focus on U.S. programs; rules vary by state and
          household.
        </p>
        <p>
          The savings planner runs in your browser. It estimates a timeline
          without interest or fees and does not ask for bank access.
        </p>
        <Link href="/articles" className="primary-button">
          Find your next good read ↗
        </Link>
      </div>
    </main>
  );
}
