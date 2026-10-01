"use client";

import { useId, useState, type ReactNode } from "react";

type Props = {
  heading: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "nav";
  "aria-label"?: string;
};

// Collapsible footer column on mobile; always expanded from `sm` up.
export default function FooterAccordion({
  heading,
  children,
  className = "",
  as: Tag = "div",
  "aria-label": ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <Tag aria-label={ariaLabel} className={`max-sm:border-t max-sm:border-line ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left max-sm:py-4 sm:mb-5 sm:pointer-events-none sm:cursor-default"
      >
        <span className="font-sans text-[0.8125rem] font-medium text-ink-faint max-sm:text-[0.9375rem] max-sm:text-ink">
          {heading}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`h-4 w-4 text-ink-faint transition-transform duration-300 sm:hidden ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3.5 6l4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out sm:grid-rows-[1fr] sm:visible ${
          open ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-sm:pb-5">{children}</div>
        </div>
      </div>
    </Tag>
  );
}
