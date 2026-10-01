"use client";

import { useState } from "react";
import ProjectHook from "@/components/ProjectHook";
import { process } from "@/data/process";

type Stage = (typeof process)[number];

function StageDetail({ stage }: { stage: Stage }) {
  return (
    <>
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 ring-4 ring-accent/10 ring-offset-4 ring-offset-paper-soft font-sans text-lg font-medium tabular-nums text-accent">
        {stage.number}
      </span>
      <h3 className="mt-6 text-3xl sm:text-4xl">{stage.title}</h3>
      <span aria-hidden="true" className="mt-4 block h-px w-24 bg-accent/60" />
      <p className="mt-4 font-sans text-sm text-accent">{stage.tags}</p>
      <ProjectHook hook={stage.summary} className="mt-4 max-w-md text-ink-soft" />
      <ul className="mt-6 grid w-fit gap-x-8 gap-y-1.5 text-left text-ink-soft sm:grid-cols-2">
        {stage.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

/*
 * Numbered stage list on the left; the selected stage opens in a panel on
 * the right. Below lg there's no room for two columns, so the panel opens
 * inline under the selected stage instead.
 */
export default function ProcessExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <ol className="space-y-1">
        {process.map((stage, i) => {
          const selected = i === active;
          return (
            <li key={stage.number}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={selected}
                className={`tap flex w-full items-baseline gap-4 border-l-2 px-5 py-4 text-left transition-colors ${
                  selected
                    ? "border-accent bg-paper-soft"
                    : "border-transparent hover:bg-paper-soft/60"
                }`}
              >
                <span
                  className={`font-sans text-2xl font-light tabular-nums transition-colors ${
                    selected ? "text-accent" : "text-ink-faint"
                  }`}
                >
                  {stage.number}
                </span>
                <span
                  className={`font-sans text-base font-medium transition-colors ${
                    selected ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {stage.title}
                </span>
              </button>
              {selected && (
                <div className="bg-paper-soft px-5 pb-8 pt-4 lg:hidden">
                  <StageDetail stage={stage} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Every panel sits in the same grid cell so the box keeps the height
          of the tallest stage and doesn't jump when switching. */}
      <div className="hidden lg:grid border border-line-soft bg-paper-soft">
        {process.map((stage, i) => (
          <div
            key={stage.number}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center px-12 py-14 text-center transition-opacity duration-500 ${
              i === active ? "opacity-100" : "pointer-events-none invisible opacity-0"
            }`}
          >
            <StageDetail stage={stage} />
          </div>
        ))}
      </div>
    </div>
  );
}
