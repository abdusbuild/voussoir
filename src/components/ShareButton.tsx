"use client";

import { useState } from "react";

// Opens the device share sheet where there is one (phones), otherwise copies
// the page link.
export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href.split("?")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Dismissed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing useful to show.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="link-sweep tap inline-flex! items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-ink-soft hover:text-accent transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
