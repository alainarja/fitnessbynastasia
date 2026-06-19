"use client";

import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { useLocale } from "./LocaleProvider";
import { site } from "@/content/site";

/** On-brand pre-launch screen. Funnels visitors to the free guide at /shift. */
export function ComingSoon() {
  const { t } = useLocale();
  const c = t.comingSoon;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden sm:min-h-[calc(100svh-5rem)]">
      <span
        aria-hidden
        className="float-soft pointer-events-none absolute end-[-3rem] top-20 hidden h-48 w-48 rounded-full bg-blush/40 blur-3xl lg:block"
      />
      <div className="container-page w-full py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <Eyebrow className="justify-center">{c.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-5xl leading-[1.03] sm:text-6xl lg:text-7xl text-balance">
            {c.lead} <em className="font-display italic text-red">{c.emphasis}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown">{c.sub}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/shift" size="lg">
              {c.cta}
            </Button>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="label-eyebrow text-espresso underline-offset-4 hover:text-red hover:underline"
            >
              {c.follow}
            </a>
          </div>

          <p className="mt-10 label-eyebrow text-brown/60">{site.instagramHandle}</p>
        </div>
      </div>
    </section>
  );
}
