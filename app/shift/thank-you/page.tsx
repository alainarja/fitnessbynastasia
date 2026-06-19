import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { site, bookingHref } from "@/content/site";
import { thankYou } from "@/content/copy";

export const metadata: Metadata = {
  title: "Your guide is on its way",
  description: "Thank you. Your free guide is on its way to your inbox. Here is your next step.",
  alternates: { canonical: "/shift/thank-you" },
  robots: { index: false, follow: true },
};

/** Tailor the upsell to how ready the quiz said they are. */
function upsellCopy(next: string | undefined) {
  if (next === "ready") {
    return {
      eyebrow: "You said you are ready",
      lead: "Let's make it",
      emphasis: "official.",
      body: "You told me you are ready to start soon. The fastest path is a free discovery call. We will map your plan and make sure we are the right fit.",
    };
  }
  if (next === "curious") {
    return {
      eyebrow: "You said you are curious",
      lead: "Curious how coaching",
      emphasis: "works?",
      body: "Let's talk it through, no pressure. A quick discovery call answers your questions and shows you exactly how I would coach you.",
    };
  }
  return {
    eyebrow: thankYou.nextStepEyebrow,
    lead: thankYou.nextStepHeadlineLead,
    emphasis: thankYou.nextStepHeadlineEmphasis,
    body: thankYou.nextStepBody,
  };
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const upsell = upsellCopy(next);

  return (
    <>
      <section className="container-page py-16 text-center sm:py-24">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red text-card">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <Eyebrow className="justify-center">Success</Eyebrow>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-balance">
            {thankYou.headlineLead} <em className="font-display italic text-red">{thankYou.headlineEmphasis}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown">{thankYou.sub}</p>

          <div className="mt-8">
            <Button href={site.guidePdfPath} variant="outline" size="lg">
              {thankYou.downloadCta}
            </Button>
          </div>
        </div>
      </section>

      {/* Next step (tailored to quiz readiness) */}
      <section className="bg-ink text-cream">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              tone="light"
              eyebrow={upsell.eyebrow}
              lead={upsell.lead}
              emphasis={upsell.emphasis}
              align="center"
              size="lg"
              className="mx-auto"
            />
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream/75">{upsell.body}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={bookingHref()} size="lg">
                {thankYou.bookCta}
              </Button>
              <Button href={site.social.instagram} variant="outlineLight" size="lg">
                {thankYou.followCta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
