import type { Metadata } from "next";
import SavingsCompare from "../components/SavingsCompare";
export const metadata: Metadata = {
  title: "Compare places to keep your savings",
  description:
    "Compare savings accounts, certificates of deposit, and money market deposit accounts by access, rates, and tradeoffs.",
  alternates: { canonical: "/compare" },
};
export default function ComparePage() {
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">SIDE BY SIDE</span>
        <h1>
          Same savings.
          <br />
          <span>Different possibilities.</span>
        </h1>
        <p>
          Select the options you want to compare. Focus on how soon you need the
          money, the fees, and whether the bank is insured.
        </p>
      </div>
      <SavingsCompare />
    </main>
  );
}
