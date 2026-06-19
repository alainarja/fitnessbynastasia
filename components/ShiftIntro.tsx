"use client";

import { Eyebrow } from "./Eyebrow";
import { useLocale } from "./LocaleProvider";
import { getQuizIntro } from "@/content/quiz";

/** Bilingual intro column beside the quiz on the /shift page. */
export function ShiftIntro() {
  const { locale } = useLocale();
  const intro = getQuizIntro(locale);

  return (
    <div>
      <Eyebrow>{intro.eyebrow}</Eyebrow>
      <h1 className="mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl text-balance">
        {intro.lead} <em className="font-display italic text-red">{intro.emphasis}</em>
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-brown">{intro.sub}</p>

      <ul className="mt-8 space-y-4">
        {intro.trust.map((point) => (
          <li key={point} className="flex items-start gap-3 text-espresso">
            <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red text-card">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[0.98rem] leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
