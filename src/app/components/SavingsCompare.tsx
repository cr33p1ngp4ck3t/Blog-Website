"use client";
import { useState } from "react";
const options = [
  {
    name: "Savings account",
    intro: "Flexible access for a rainy day fund.",
    access: "Usually accessible; transfer and withdrawal policies vary.",
    rate: "Variable; compare the current APY.",
    tradeoff: "Fees or minimum balances can reduce what you earn.",
    best: "Emergency funds and short term goals.",
  },
  {
    name: "Certificate of deposit",
    intro: "A set term for money you can leave alone.",
    access:
      "Usually locked for the term; early withdrawal may incur a penalty.",
    rate: "Often fixed for the term; check renewal terms.",
    tradeoff: "Less flexibility if you need the money unexpectedly.",
    best: "A goal with a known date and a separate emergency fund.",
  },
  {
    name: "Money market deposit account",
    intro: "Savings with account specific access features.",
    access: "May include checks or a debit card; rules vary.",
    rate: "Usually variable; rates can depend on the balance.",
    tradeoff: "May require a higher minimum balance to avoid fees.",
    best: "Cash reserves when minimum balances fit your budget.",
  },
];
export default function SavingsCompare() {
  const [selected, setSelected] = useState([0, 1]);
  return (
    <>
      <div className="compare-options">
        {options.map((option, index) => (
          <button
            key={option.name}
            className="compare-option"
            aria-pressed={selected.includes(index)}
            onClick={() =>
              setSelected(
                selected.includes(index)
                  ? selected.filter((item) => item !== index)
                  : [...selected, index],
              )
            }
          >
            <span className="section-label">
              {selected.includes(index) ? "✓ SELECTED" : "+ ADD TO COMPARISON"}
            </span>
            <h2>{option.name}</h2>
            <p>{option.intro}</p>
          </button>
        ))}
      </div>
      <div className="comparison-table">
        {selected.length ? (
          <table>
            <caption className="sr-only">Savings account comparison</caption>
            <thead>
              <tr>
                <th scope="col">What matters</th>
                {selected.map((index) => (
                  <th scope="col" key={index}>
                    {options[index].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  { key: "access", label: "Access to your money" },
                  { key: "rate", label: "Interest" },
                  { key: "tradeoff", label: "Watch for" },
                  { key: "best", label: "Useful for" },
                ] as const
              ).map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  {selected.map((index) => (
                    <td key={index}>{options[index][row.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state" role="status">
            Select an option above to compare.
          </p>
        )}
        <p
          className="planner-note"
          style={{ color: "var(--muted-ink)", marginTop: 25 }}
        >
          These are general account types, not specific product offers. Deposit
          insurance applies to eligible deposits at insured institutions within
          coverage limits. A money market deposit account is different from a
          money market mutual fund.
        </p>
        <a
          href="https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance"
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check FDIC coverage ↗
        </a>
      </div>
    </>
  );
}
