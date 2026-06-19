"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Target number to count to. */
  to: number;
  /** Text rendered after the number, e.g. "+". */
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
};

/** Counts up from 0 to `to` once it scrolls into view. Static for reduced motion. */
export function CountUp({ to, suffix = "", prefix = "", durationMs = 1400, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setValue(to));
      return;
    }

    let raf = 0;
    const run = () => {
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setValue(Math.round(eased * to));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
