import Image from "next/image";
import { markPaths } from "./markPaths";

// Arch mark, inlined from public/brand/voussoir-mark.svg so it takes the text
// colour. The viewBox is cropped to the artwork so its height is the mark's.
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="734 148 1244 1541"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      <g transform="translate(0 2200) scale(0.1 -0.1)" fill="currentColor">
        {markPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

// Full stacked lockup: mark + wordmark + tagline (public/brand/voussoir-lockup.png).
export function Lockup({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/voussoir-lockup.png"
      alt="Voussoir — Architecture · Interior · Design"
      width={2032}
      height={1344}
      className={`object-contain ${className}`}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif font-medium tracking-[0.14em] uppercase ${className}`}
    >
      Voussoir
    </span>
  );
}

export default function Logo({
  className = "",
  markClassName = "h-9 w-auto",
  wordmarkClassName = "text-2xl",
  showTagline = false,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className={markClassName} />
      <span className="flex flex-col leading-none">
        <Wordmark className={wordmarkClassName} />
        {showTagline && (
          <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-soft mt-1">
            Architecture · Interior · Design
          </span>
        )}
      </span>
    </span>
  );
}
