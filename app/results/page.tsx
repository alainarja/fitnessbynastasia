import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ComingSoon } from "@/components/ComingSoon";
import { SITE_LIVE } from "@/content/site";
import { results } from "@/content/copy";

export const metadata: Metadata = {
  title: "Client results",
  description:
    "Real women getting stronger, more energised, and more confident with Fitness by Nastasia. Honest note: real client testimonials and wins are coming soon.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Client results | Fitness by Nastasia",
    description:
      "Strength, energy, and confidence that last. Real client words and wins are coming soon.",
  },
};

export default function ResultsPage() {
  if (!SITE_LIVE) return <ComingSoon />;
  return (
    <>
      {/* 1. Hero header */}
      <section className="border-b border-brown/12">
        <div className="container-page py-12 lg:py-16">
          <Eyebrow>{results.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl text-balance">
            {results.headlineLead}{" "}
            <em className="font-display italic text-red">{results.headlineEmphasis}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown">{results.sub}</p>
        </div>
      </section>

      {/* 2. Testimonials grid (placeholders only) */}
      {/* TODO(nastasia): replace with real testimonials (with client consent) */}
      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={i * 70} className="h-full">
              <TestimonialCard />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Client wins (placeholders only) */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <Eyebrow>Client wins</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Reveal key={i} delay={i * 70} className="h-full">
                <article className="h-full rounded-[8px] border border-dashed border-brown/30 bg-cream-deep p-7">
                  <span className="label-eyebrow text-[0.62rem] text-red">TODO</span>
                  <p className="mt-3 leading-relaxed text-brown">
                    A client win goes here. Strength milestone, energy, or confidence.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="bg-red text-card">
        <div className="container-page py-16 sm:py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl text-card text-balance">
              {results.finalHeadlineLead}{" "}
              <em className="font-display italic text-ink">{results.finalHeadlineEmphasis}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-card/85">
              Your story could be the next one here. Let&apos;s build it together, one
              strong week at a time.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="secondary" size="lg">
                Apply to work with me
              </Button>
              <Button href="/shift" variant="outlineLight" size="lg">
                Get the free guide
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
