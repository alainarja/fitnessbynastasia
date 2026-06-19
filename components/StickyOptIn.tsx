"use client";

import { useEffect, useState } from "react";

/** Slim sticky opt-in bar that appears on scroll on /shift. Dismissible. */
export function StickyOptIn({ text, cta }: { text: string; cta: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-slide-up border-t border-cream/15 bg-ink/95 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <p className="hidden text-sm font-medium text-cream sm:block">{text}</p>
        <div className="flex flex-1 items-center justify-end gap-3 sm:flex-none">
          <a
            href="#guide-form"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[8px] bg-red px-6 py-2.5 text-sm font-semibold text-card hover:bg-maroon sm:flex-none"
          >
            {cta}
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-cream/60 hover:text-cream"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
