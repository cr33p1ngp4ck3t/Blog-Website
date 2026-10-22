import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <Link href="/" className="wordmark footer-wordmark">
            FinAid<span className="wordmark-light">Hub</span>
            <span className="brand-dot">.</span>
          </Link>
          <p>
            Less money stress.
            <br />
            More life.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link href="/articles">The journal</Link>
            <Link href="/#money-tool">Savings planner</Link>
            <Link href="/deals">Useful resources</Link>
            <Link href="/feed.xml">RSS feed ↗</Link>
          </div>
          <div>
            <span>THE SMALL PRINT</span>
            <Link href="/about">About us</Link>
            <Link href="/contact">Get in touch</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
          </div>
        </div>
        <div className="footer-note">
          <span className="footer-asterisk" aria-hidden="true">
            ✳
          </span>
          <p>
            Good information.
            <br />A little perspective.
            <br />A better next step.
          </p>
          <Link href="/about" className="text-link">
            Our editorial approach <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} FinAid Hub</span>
        <p>
          Independent educational content. U.S. assistance guides link to
          official eligibility rules.
        </p>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
