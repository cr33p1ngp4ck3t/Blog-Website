import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Useful money resources",
  description:
    "Official tools to check benefits, report scams, review credit reports, verify deposit insurance, and save on home energy.",
  alternates: { canonical: "/deals" },
};
const resources = [
  {
    title: "Find financial assistance",
    category: "USAGOV",
    description:
      "Start with the official directory for food, housing, health coverage, and utility assistance.",
    url: "https://www.usa.gov/benefits",
  },
  {
    title: "Build your emergency fund",
    category: "CONSUMER FINANCIAL PROTECTION BUREAU",
    description:
      "Practical savings strategies for steady or irregular income, including automatic contributions and cash flow planning.",
    url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
  },
  {
    title: "Check your credit reports",
    category: "ANNUALCREDITREPORT.COM",
    description:
      "The federally authorized source for free credit reports. Review the details and dispute mistakes with the reporting company.",
    url: "https://www.annualcreditreport.com/",
  },
  {
    title: "Recognize and report a scam",
    category: "FEDERAL TRADE COMMISSION",
    description:
      "Learn the warning signs before sending money, then find the official routes to report fraud.",
    url: "https://consumer.ftc.gov/articles/how-avoid-scam",
  },
  {
    title: "Verify your deposit protection",
    category: "FDIC",
    description:
      "Understand what deposit insurance covers and use the official BankFind and coverage estimator links.",
    url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance",
  },
  {
    title: "Make home energy go further",
    category: "U.S. DEPARTMENT OF ENERGY",
    description:
      "Explore the Energy Saver guides for insulation, heating, appliances, and low cost improvements.",
    url: "https://www.energy.gov/energysaver/energy-saver",
  },
];
export default function DealsPage() {
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">THE USEFUL LINKS</span>
        <h1>
          A good place
          <br />
          <span>to go next.</span>
        </h1>
        <p>
          Official resources, practical tools, and a little less searching
          around. These links are free to visit and are not paid placements.
        </p>
      </div>
      <div className="resource-list">
        {resources.map((resource) => (
          <a
            key={resource.url}
            className="resource"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="section-label">{resource.category}</span>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <ArrowUpRight size={24} />
          </a>
        ))}
      </div>
    </main>
  );
}
