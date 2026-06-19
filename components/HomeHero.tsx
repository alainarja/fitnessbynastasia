"use client";

import Link from "next/link";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { ImageSlot } from "./ImageSlot";
import { GhostNumeral } from "./GhostNumeral";
import { useLocale } from "./LocaleProvider";
import { images } from "@/content/site";

export function HomeHero() {
  const { t } = useLocale();
  const h = t.home;

  return (
    <section className="relative overflow-hidden">
      <span
        aria-hidden
        className="float-soft pointer-events-none absolute end-[-2.5rem] top-24 hidden h-40 w-40 rounded-full bg-blush/40 blur-2xl lg:block"
      />
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-6">
          <div className="rise-in" style={{ animationDelay: "0.05s" }}>
            <Eyebrow>{h.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl text-balance">
            <span className="rise-in inline-block" style={{ animationDelay: "0.15s" }}>
              {h.lead}{" "}
            </span>
            <em className="rise-in inline-block font-display italic text-red" style={{ animationDelay: "0.32s" }}>
              {h.emphasis}
            </em>
          </h1>
          <p className="rise-in mt-6 max-w-xl text-lg leading-relaxed text-brown" style={{ animationDelay: "0.48s" }}>
            {h.sub}
          </p>

          <div className="rise-in mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "0.6s" }}>
            <Button href="/shift" size="lg">
              {h.primaryCta}
            </Button>
            <Link href="/coaching" className="group inline-flex items-center gap-2 label-eyebrow text-espresso hover:text-red">
              {h.secondaryCta}
              <span className="arrow-nudge rtl:rotate-180" aria-hidden>
                &rarr;
              </span>
            </Link>
          </div>

          <p className="rise-in mt-7 flex items-center gap-2 text-sm text-brown" style={{ animationDelay: "0.72s" }}>
            <span className="inline-block h-px w-8 bg-red" aria-hidden />
            {h.trustLine}
          </p>
        </div>

        <div className="rise-in relative lg:col-span-6" style={{ animationDelay: "0.25s" }}>
          <GhostNumeral className="absolute -start-4 -top-16 hidden lg:block">01</GhostNumeral>
          <ImageSlot
            image={images.heroPortrait}
            ratio="aspect-[4/5]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            objectPosition="center 30%"
            className="relative z-10"
            imgClassName="ken-burns"
          />
        </div>
      </div>
    </section>
  );
}
