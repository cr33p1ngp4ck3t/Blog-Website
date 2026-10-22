import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "How to report a correction to FinAid Hub and find official help with a financial question.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">GET IN TOUCH</span>
        <h1>
          Good information
          <br />
          <span>starts with listening.</span>
        </h1>
        <p>
          Have a correction or a question about a guide? We want the information
          here to be clear and useful.
        </p>
      </div>
      <div className="simple-content prose">
        <h2>Share an editorial correction.</h2>
        {email ? (
          <>
            <p>
              Include the article title, the detail you want us to check, and a
              link to the official source. Please leave out account numbers,
              passwords, and other sensitive information.
            </p>
            <a href={`mailto:${email}`} className="primary-button">
              Email the editorial team ↗
            </a>
          </>
        ) : (
          <p>
            Direct editorial contact is not available yet. Every new guide
            includes its original sources so you can verify current information
            with the provider.
          </p>
        )}
        <h2>Need help with a financial issue?</h2>
        <p>
          FinAid Hub cannot process benefit applications, access your accounts,
          or resolve disputes. You can contact the relevant official service
          directly.
        </p>
        <div className="contact-actions">
          <a
            className="outline-button"
            href="https://www.consumerfinance.gov/complaint/"
            target="_blank"
            rel="noopener noreferrer"
          >
            File a financial complaint ↗
          </a>
          <a
            className="outline-button"
            href="https://www.usa.gov/benefits"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find government assistance ↗
          </a>
        </div>
        <h2>Keep exploring.</h2>
        <p>
          Looking for a specific subject? Use search in the header or{" "}
          <Link href="/articles">browse the journal</Link>.
        </p>
      </div>
    </main>
  );
}
