"use client";

import { useSyncExternalStore } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./gallery-lightbox.css";
import type { GallerySlide } from "@/lib/gallery";

// Thin line icons in place of the library's filled ones.
function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="yarl__icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const icons = {
  iconPrev: () => <Icon d="M15 5l-7 7 7 7" />,
  iconNext: () => <Icon d="M9 5l7 7-7 7" />,
  iconClose: () => <Icon d="M6 6l12 12M18 6L6 18" />,
  iconZoomIn: () => <Icon d="M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L20 20M10.5 8v5M8 10.5h5" />,
  iconZoomOut: () => <Icon d="M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L20 20M8 10.5h5" />,
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export default function GalleryLightbox({
  open,
  index,
  slides,
  onClose,
  onView,
  onExited,
}: {
  open: boolean;
  index: number;
  slides: GallerySlide[];
  onClose: () => void;
  onView: (index: number) => void;
  onExited: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const hasCaptions = slides.some((s) => s.description);

  return (
    <Lightbox
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      on={{ view: ({ index }) => onView(index), exited: onExited }}
      plugins={hasCaptions ? [Zoom, Counter, Captions] : [Zoom, Counter]}
      className="voussoir-lightbox"
      render={icons}
      carousel={{ preload: 2, padding: 0, spacing: "8%", imageFit: "contain" }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{ maxZoomPixelRatio: 1.5, scrollToZoom: true }}
      captions={{ descriptionTextAlign: "center" }}
      animation={
        reducedMotion ? { fade: 0, swipe: 0, navigation: 0, zoom: 0 } : undefined
      }
    />
  );
}
