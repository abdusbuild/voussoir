import type { ReactNode } from "react";

// Line icons for the five approach pillars — same 24px grid and 1.5 stroke
// as ContactIcons, drawn from architectural motifs rather than generic UI glyphs.
const paths: Record<string, ReactNode> = {
  // Context — a marker set on site contours: rooted in place
  Context: (
    <>
      <path d="M12 14s-4.5-3.9-4.5-7.2a4.5 4.5 0 0 1 9 0C16.5 10.1 12 14 12 14Z" />
      <circle cx="12" cy="6.8" r="1.5" />
      <path d="M3.5 17.5c2.8-1.3 5.6-1.3 8.5 0s5.7 1.3 8.5 0M5.5 20.5c2.2-.9 4.4-.9 6.5 0s4.3.9 6.5 0" />
    </>
  ),
  // Space — an isometric volume
  Space: (
    <>
      <path d="M12 3.5 19.5 7.8v8.4L12 20.5l-7.5-4.3V7.8L12 3.5Z" />
      <path d="M4.5 7.8 12 12l7.5-4.2M12 12v8.5" />
    </>
  ),
  // Material — stacked layers of finish
  Material: (
    <>
      <path d="M12 4 20 8l-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
    </>
  ),
  // Sustainability — a leaf with its veins
  Sustainability: (
    <>
      <path d="M19.5 4.5C10 4.5 4.5 9 4.5 15.5c0 1.4.3 2.7.8 3.7 1 .5 2.3.8 3.7.8 6.5 0 10.5-5.5 10.5-15.5Z" />
      <path d="M4 20 14 10M9.5 14.5h4M12 12V9" />
    </>
  ),
  // Experience — a figure passing beneath an arch (the voussoir)
  Experience: (
    <>
      <path d="M4.5 20.5V11a7.5 7.5 0 0 1 15 0v9.5M3 20.5h18" />
      <circle cx="12" cy="11" r="1.3" />
      <path d="M12 13.5v3.5M10.3 20.5 12 17l1.7 3.5M10.2 15h3.6" />
    </>
  ),
};

export default function ApproachIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
