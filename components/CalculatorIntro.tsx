"use client";

import { Eyebrow } from "./Eyebrow";
import { useLocale } from "./LocaleProvider";

/** Bilingual heading for the /calculator page. */
export function CalculatorIntro() {
  const { t } = useLocale();
  const c = t.calculator;

  return (
    <div className="text-center">
      <Eyebrow className="justify-center">{c.eyebrow}</Eyebrow>
      <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-balance">
        {c.lead} <em className="font-display italic text-red">{c.emphasis}</em>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brown">{c.sub}</p>
    </div>
  );
}
