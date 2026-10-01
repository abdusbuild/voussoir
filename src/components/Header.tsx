"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { navLinks } from "@/data/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Hide on scroll down, show on scroll up. Movement is summed since the last
  // change of direction so small jitters don't toggle it.
  useEffect(() => {
    const THRESHOLD = 10;
    const ALWAYS_VISIBLE_ABOVE = 100;
    const AT_TOP_BELOW = 8;
    const root = document.documentElement;

    // Clamp to the real scroll range so iOS rubber-band overscroll at the
    // top/bottom doesn't register as a direction change.
    const readY = () => {
      const max = Math.max(0, root.scrollHeight - window.innerHeight);
      return Math.min(Math.max(window.scrollY, 0), max);
    };

    let lastY = readY();
    let travel = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = readY();
      const delta = y - lastY;
      lastY = y;
      setAtTop(y < AT_TOP_BELOW);

      if (y < ALWAYS_VISIBLE_ABOVE || openRef.current || keyboardFocusInside(headerRef.current)) {
        travel = 0;
        setScrolledAway(false);
        return;
      }
      if (delta === 0) return;

      if (Math.sign(delta) !== Math.sign(travel)) travel = 0;
      travel += delta;

      if (travel > THRESHOLD) setScrolledAway(true);
      else if (travel < -THRESHOLD) setScrolledAway(false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Pages opened mid-scroll (e.g. /studio#team) start with a solid header.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const hidden = scrolledAway && !open;
  // Transparent over the top of the page; solid once scrolled or while the
  // mobile menu is open, so the menu never sits over bare content.
  const solid = !atTop || open;

  return (
    <header
      ref={headerRef}
      onFocus={(e) => {
        if (isFocusVisible(e.target)) setScrolledAway(false);
      }}
      className={`sticky top-0 z-40 border-b [transition:transform_250ms_ease-out,background-color_200ms_ease,border-color_200ms_ease] motion-reduce:transition-none ${
        solid ? "bg-paper/90 backdrop-blur-sm border-line-soft!" : "bg-transparent border-transparent!"
      } ${hidden ? "[transform:translateY(-100%)]" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-(--header-h) flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Voussoir — Home"
          className="group relative tap flex items-center text-ink"
        >
          <Logo markClassName="h-8 md:h-9 w-auto" wordmarkClassName="text-2xl md:text-[1.75rem]" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap bg-ink px-2.5 py-1 font-sans text-xs font-medium text-paper opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Home
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`link-sweep text-[1.0625rem] font-medium transition-colors ${
                  active ? "text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden flex flex-col gap-1.5 h-11 w-11 px-2.5 -mr-2.5 justify-center"
        >
          <span
            className={`block h-0.5 bg-ink transition-transform ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-ink transition-transform ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line-soft px-5 sm:px-8 py-4 flex flex-col sm:gap-4 bg-paper">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`tap text-lg sm:text-[1.0625rem] font-medium ${
                  active ? "text-accent" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

// Keyboard focus only: a mouse click on a nav link also focuses it, and that
// shouldn't pin the header open for the rest of the page.
function isFocusVisible(el: Element) {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

function keyboardFocusInside(header: HTMLElement | null) {
  const active = document.activeElement;
  return !!header && !!active && header.contains(active) && isFocusVisible(active);
}
