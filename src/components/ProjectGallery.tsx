"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import Visual from "@/components/Visual";
import type { GallerySlide } from "@/lib/gallery";

// Fetched on the first photo click (or a ?photo= deep link), never on page load.
const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });

const PARAM = "photo";

// 0-based slide index from ?photo=N (1-based), or null if absent/out of range.
function photoFromUrl(count: number) {
  const n = Number(new URLSearchParams(window.location.search).get(PARAM));
  return Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : null;
}

function photoUrl(index: number | null) {
  const url = new URL(window.location.href);
  if (index === null) url.searchParams.delete(PARAM);
  else url.searchParams.set(PARAM, String(index + 1));
  return url;
}

const focusRing =
  "cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type Row =
  | { kind: "full"; i: number }
  | { kind: "pair"; a: number; b: number }
  | { kind: "single"; i: number };

// Groups the photos after the hero into an editorial run: landscapes
// alternate between full width and side-by-side pairs, portraits pair up
// with the next portrait, and a lone portrait sits centred on its own.
function layoutRows(slides: GallerySlide[]): Row[] {
  const rows: Row[] = [];
  const portrait = (i: number) => slides[i].height > slides[i].width;
  let pairNext = false;
  let i = 1;
  while (i < slides.length) {
    const next = i + 1 < slides.length ? i + 1 : null;
    if (portrait(i)) {
      if (next !== null && portrait(next)) {
        rows.push({ kind: "pair", a: i, b: next });
        i += 2;
      } else {
        rows.push({ kind: "single", i });
        i += 1;
      }
    } else if (pairNext && next !== null && !portrait(next)) {
      rows.push({ kind: "pair", a: i, b: next });
      pairNext = false;
      i += 2;
    } else {
      rows.push({ kind: "full", i });
      pairNext = true;
      i += 1;
    }
  }
  return rows;
}

export default function ProjectGallery({
  slides,
  heroOverlay,
  intro,
  interludes = [],
}: {
  slides: GallerySlide[];
  // Laid over the bottom of the full-bleed hero photo (title, tags).
  heroOverlay?: ReactNode;
  // Between the hero and the rest of the photos (facts, lead paragraph).
  intro?: ReactNode;
  // One after each row of photos, in order; any left over follow the last row.
  interludes?: ReactNode[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  // Keeps the lightbox mounted after the first open so its chunk loads once.
  const [loaded, setLoaded] = useState(false);
  const triggers = useRef<(HTMLAnchorElement | null)[]>([]);
  const returnFocus = useRef<HTMLElement | null>(null);
  // True when opening pushed a history entry, so closing should pop it.
  const pushed = useRef(false);

  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
    setLoaded(true);
  }, []);

  // Deep link (?photo=N) on load, and back/forward while on the page.
  useEffect(() => {
    const initial = photoFromUrl(slides.length);
    if (initial !== null) {
      returnFocus.current = triggers.current[initial];
      // The URL is only readable after hydration, so this can't be initial state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      show(initial);
    }
    const onPopState = () => {
      const i = photoFromUrl(slides.length);
      if (i === null) {
        pushed.current = false;
        setOpen(false);
      } else if (window.history.state?.lightbox) {
        pushed.current = true;
        show(i);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [slides.length, show]);

  const onThumbClick = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
    // Let modified clicks (new tab/window) fall through to the raw file.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    returnFocus.current = e.currentTarget;
    window.history.pushState({ lightbox: true }, "", photoUrl(i));
    pushed.current = true;
    show(i);
  };

  const close = () => {
    if (pushed.current) {
      // popstate closes it, leaving the page URL as it was before opening.
      window.history.back();
    } else {
      window.history.replaceState(null, "", photoUrl(null));
      setOpen(false);
    }
  };

  const onView = (i: number) => {
    setIndex(i);
    window.history.replaceState(window.history.state, "", photoUrl(i));
  };

  const trigger = (i: number, className: string, children: ReactNode) => (
    <a
      ref={(el) => {
        triggers.current[i] = el;
      }}
      href={slides[i].src}
      target="_blank"
      rel="noopener"
      onClick={(e) => onThumbClick(e, i)}
      className={`block ${focusRing} ${className}`}
    >
      {children}
    </a>
  );

  // Pairs share one crop so the two frames line up top and bottom.
  const cropped = (i: number, aspect: string) =>
    trigger(
      i,
      "",
      <Visual src={slides[i].src} alt={slides[i].alt} label={slides[i].alt} className={`w-full ${aspect}`} />,
    );

  const natural = (i: number) => (
    <Visual
      src={slides[i].src}
      alt={slides[i].alt}
      label={slides[i].alt}
      width={slides[i].width}
      height={slides[i].height}
      natural
    />
  );

  const hero = slides[0];
  const rows = layoutRows(slides);

  return (
    <>
      <div className="relative h-[calc(100svh-var(--header-h))] min-h-[26rem] max-h-[60rem] w-full overflow-hidden bg-paper-soft">
        {trigger(
          0,
          "absolute inset-0 focus-visible:-outline-offset-4",
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />,
        )}
        {heroOverlay && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/35 to-transparent pt-32 pb-10 sm:pb-14 text-paper">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">{heroOverlay}</div>
          </div>
        )}
      </div>

      {intro}

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {rows.map((row, r) => (
          <Fragment key={r}>
            <div data-reveal="" className="mt-6 sm:mt-10">
              {row.kind === "full" && trigger(row.i, "", natural(row.i))}
              {row.kind === "single" && trigger(row.i, "mx-auto md:w-1/2", natural(row.i))}
              {row.kind === "pair" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                  {cropped(row.a, slides[row.a].height > slides[row.a].width ? "aspect-[4/5]" : "aspect-[3/2]")}
                  {cropped(row.b, slides[row.b].height > slides[row.b].width ? "aspect-[4/5]" : "aspect-[3/2]")}
                </div>
              )}
            </div>
            {interludes[r]}
          </Fragment>
        ))}
        {interludes.slice(rows.length)}
      </div>

      {loaded && (
        <GalleryLightbox
          open={open}
          index={index}
          slides={slides}
          onClose={close}
          onView={onView}
          onExited={() => returnFocus.current?.focus({ preventScroll: true })}
        />
      )}
    </>
  );
}
