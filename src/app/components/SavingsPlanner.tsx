"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function SavingsPlanner() {
  const [goal, setGoal] = useState(1000);
  const [saved, setSaved] = useState(0);
  const [monthly, setMonthly] = useState(100);
  const remaining = Math.max(0, goal - saved);
  const months = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const progress = goal > 0 ? Math.min(100, (saved / goal) * 100) : 100;
  const fields = [
    { id: "savings-goal", label: "Savings goal", value: goal, update: setGoal },
    {
      id: "savings-saved",
      label: "Already saved",
      value: saved,
      update: setSaved,
    },
    {
      id: "savings-monthly",
      label: "Monthly contribution",
      value: monthly,
      update: setMonthly,
    },
  ];
  return (
    <section id="money-tool" className="planner-section">
      <div className="shell planner-grid">
        <div className="planner-intro">
          <span className="section-label">
            A LITTLE TOOL. A BIG FIRST STEP.
          </span>
          <h2>
            Put a number
            <br />
            on your <span>next move.</span>
          </h2>
          <p>
            The rainy day fund. The first apartment. The thing you keep putting
            off. Let’s make a plan for it.
          </p>
          <Link
            href="/post/build-your-first-emergency-fund"
            className="text-link"
          >
            Read the emergency fund guide <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="planner">
          <div className="planner-top">
            <span>SAVINGS ROADMAP</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="planner-fields">
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <div className="money-input">
                  <span aria-hidden="true">$</span>
                  <input
                    id={field.id}
                    type="number"
                    min="0"
                    max="10000000"
                    step="1"
                    inputMode="decimal"
                    value={field.value}
                    onChange={(event) =>
                      field.update(
                        Math.min(
                          10000000,
                          Math.max(0, Number(event.target.value) || 0),
                        ),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div role="status" className="planner-result">
            {remaining === 0 ? (
              <strong>Goal reached. Nice work!</strong>
            ) : monthly === 0 ? (
              <strong>Add a monthly contribution to see your timeline.</strong>
            ) : (
              <>
                <span>
                  <strong data-testid="savings-months">{months}</strong> months
                </span>
                <p>
                  to your ${goal.toLocaleString("en-US")} goal.
                  <br />
                  One small step at a time.
                </p>
              </>
            )}
          </div>
          <div
            className="savings-track"
            role="progressbar"
            aria-label="Savings goal progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="planner-note">
            An estimate without interest or fees. Your numbers stay in this
            browser.
          </p>
        </div>
      </div>
    </section>
  );
}
