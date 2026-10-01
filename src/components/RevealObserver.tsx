"use client";

import { useEffect } from "react";

/*
 * Scroll reveal: one shared IntersectionObserver for every element marked
 * `data-reveal=""`. Mounted once in the root layout.
 *
 * The server HTML is always fully visible. The hidden state is only set here,
 * after JS runs, and only on elements that start fully below the viewport.
 * The CSS in globals.css only applies under `html.js-reveal`, which an inline
 * script in the root layout adds before paint. It skips that class when
 * there's no IntersectionObserver or when reduced motion is on. The CSS also
 * re-checks reduced motion itself.
 *
 * States (data-reveal): "" unprocessed · "hidden" waiting · "in" animating ·
 * "done" settled, no styles.
 */

const DURATION = 600;
const STEP = 80;
const MAX_STEPS = 3; // 0, 80, 160, 240ms

export default function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const pending = new Set<HTMLElement>();
    const timers = new Set<number>();

    const settle = (el: HTMLElement) => {
      el.dataset.reveal = "done";
      el.style.removeProperty("--reveal-delay");
    };

    const release = (el: HTMLElement) => {
      pending.delete(el);
      io.unobserve(el);
    };

    const show = (el: HTMLElement, delay: number) => {
      release(el);
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.reveal = "in";
      const t = window.setTimeout(() => {
        timers.delete(t);
        settle(el);
      }, DURATION + delay + 50);
      timers.add(t);
    };

    // Elements skipped past by a fast scroll or a jump may never cross the
    // threshold, so any whose top edge is above the viewport is shown
    // without animation.
    const sweepPassed = () => {
      for (const el of pending) {
        if (!el.isConnected) release(el);
        else if (el.getBoundingClientRect().top < 0) {
          release(el);
          settle(el);
        }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
          );
        entering.forEach((el, i) => show(el, Math.min(i, MAX_STEPS) * STEP));
        sweepPassed();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    // Anything touching or above the viewport is shown right away; only
    // elements that start fully below it are hidden.
    const scan = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach((el) => {
        if (el.getBoundingClientRect().top < vh) {
          settle(el);
        } else {
          el.dataset.reveal = "hidden";
          pending.add(el);
          io.observe(el);
        }
      });
      sweepPassed();
    };

    // New elements from client navigations or re-renders (e.g. the
    // /projects filter). Scanned on the next frame, after Next has scrolled.
    let frame = 0;
    const scheduleScan = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          scan();
        });
    };
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scrollend", sweepPassed, { passive: true });
    scheduleScan();

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("scrollend", sweepPassed);
      timers.forEach(clearTimeout);
      for (const el of pending) settle(el);
    };
  }, []);

  return null;
}
