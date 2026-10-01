"use client";

import { useState } from "react";

/**
 * Real project photography hasn't been dropped into /public yet. This
 * renders the real image if the file loads, otherwise falls back to a
 * labeled placeholder that reads clearly as "artwork goes here" rather than
 * a broken image icon. Swapping in real files later at the same path (see
 * src/data/projects.ts) requires zero code changes.
 *
 * Plain <img> rather than next/image: this component needs to work inside
 * both server- and client-rendered trees and detect load failure at
 * runtime, which next/image's fill+optimization pipeline doesn't support
 * cleanly. Swap to next/image once real, known-good assets are in place.
 */
export default function Visual({
  src,
  alt,
  label,
  className = "",
  priority = false,
  natural = false,
  width,
  height,
  sketch = false,
  zoom = true,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  // Render at the image's own aspect ratio instead of cropping into a
  // fixed box — for plans and sketch sheets that shouldn't lose edges.
  natural?: boolean;
  // Intrinsic pixel size for `natural` images, so the box keeps its height
  // before the file loads (no layout shift).
  width?: number;
  height?: number;
  // Pencil sketch on an off-white sheet. The sheet is multiplied onto the
  // page colour so the lines read as drawn on the paper, and the drawing is
  // contained rather than cropped. Never use for colour photography —
  // multiply muddies it. The container is bg-paper, not transparent: <main>
  // is its own stacking context (z-index), so a blend inside it can't reach
  // the body background.
  sketch?: boolean;
  // Scale up on hover. Turn off for low-resolution files, where the zoom
  // magnifies the softness.
  zoom?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const hoverZoom = zoom ? "transition-transform duration-700 ease-out group-hover:scale-110" : "";
  const surface = sketch ? "bg-paper" : "bg-paper-soft";
  const blend = sketch ? "mix-blend-multiply" : "";

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-paper-deep via-paper-soft to-paper flex items-end p-4 ${className}`}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.35] text-ink-faint"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 70 L30 30 L55 55 L75 20 L100 60"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
          />
          <circle cx="78" cy="18" r="4" stroke="currentColor" strokeWidth="0.6" fill="none" />
        </svg>
        <span className="relative font-sans text-sm text-ink-soft">
          {label ?? alt}
        </span>
      </div>
    );
  }

  if (natural) {
    return (
      <div className={`group overflow-hidden ${surface} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={`block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105 ${blend}`}
        />
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden ${surface} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full ${hoverZoom} ${
          sketch ? `object-contain ${blend}` : "object-cover"
        }`}
      />
    </div>
  );
}
