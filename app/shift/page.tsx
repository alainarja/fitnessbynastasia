import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ShiftQuiz } from "@/components/ShiftQuiz";
import { ShiftIntro } from "@/components/ShiftIntro";
import { Reveal } from "@/components/Reveal";
import { shift } from "@/content/copy";

export const metadata: Metadata = {
  title: "The free guide: 4 mistakes keeping you stuck",
  description:
    "Take the quick quiz to find what is keeping you stuck in the gym, and get the free guide to the 4 mistakes and how to fix each one. Health first, no extremes.",
  alternates: { canonical: "/shift" },
  openGraph: {
    title: "Find what is keeping you stuck | Free guide quiz",
    description: "Answer 6 quick questions and get the free guide to the 4 mistakes keeping you stuck.",
  },
};

export default function ShiftPage() {
  return (
    <>
      {/* Full-page hero with the interactive quiz as the centerpiece.
          Full-height centering only on desktop; mobile scrolls normally so the
          quiz card never overflows the viewport. */}
      <section className="border-b border-brown/12 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center">
        <div className="container-page grid w-full min-w-0 grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="min-w-0 lg:col-span-5">
            <ShiftIntro />
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ShiftQuiz />
          </div>
        </div>
      </section>

      {/* What is inside */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow={shift.insideEyebrow}
              lead={shift.insideHeadlineLead}
              emphasis={shift.insideHeadlineEmphasis}
              align="center"
              size="lg"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {shift.fixes.map((fix, i) => (
              <Reveal key={fix.num} delay={i * 70}>
                <article className="lift relative flex gap-5 overflow-hidden rounded-[8px] border border-brown/12 bg-cream p-7">
                  <span aria-hidden className="font-display text-4xl font-extrabold text-red/80">{fix.num}</span>
                  <div>
                    <h3 className="text-xl text-espresso">{fix.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-brown">{fix.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
