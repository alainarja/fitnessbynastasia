import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";
import { GhostNumeral } from "@/components/GhostNumeral";
import { OfferCard } from "@/components/OfferCard";
import { PillarCard } from "@/components/PillarCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CalorieCalculator } from "@/components/CalorieCalculator";
import { ComingSoon } from "@/components/ComingSoon";
import { offers, pillars, howItWorks, faqs, images, bookingHref, SITE_LIVE } from "@/content/site";
import { coaching } from "@/content/copy";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "One to one online coaching for women, built around your body, your schedule, and your goals. Health first, strength over restriction, plus the SHIFT room community. Apply to work with me.",
  alternates: { canonical: "/coaching" },
  openGraph: {
    title: "Work with me | Fitness by Nastasia",
    description:
      "One to one online coaching and the SHIFT room for women who want real strength. Health first, results that last.",
  },
};

export default function CoachingPage() {
  if (!SITE_LIVE) return <ComingSoon />;
  const enabledOffers = offers.filter((o) => o.enabled);

  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-brown/12">
        <div className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>{coaching.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl text-balance">
              {coaching.heroHeadlineLead}{" "}
              <em className="font-display italic text-red">{coaching.heroHeadlineEmphasis}</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown">{coaching.heroSub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="primary" size="lg">
                Apply now
              </Button>
              <a
                href="#offers"
                className="label-eyebrow inline-flex items-center gap-2 text-espresso hover:text-red"
              >
                See the ways to work together
              </a>
            </div>
          </div>

          <ImageSlot
            image={images.coachingHero}
            ratio="aspect-[4/5]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* 2. Offers */}
      <section id="offers" className="container-page py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={coaching.offersEyebrow}
            lead={coaching.offersHeadlineLead}
            emphasis={coaching.offersHeadlineEmphasis}
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>
        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enabledOffers.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 80} className="h-full">
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. The four pillars */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={coaching.pillarsEyebrow}
              lead={coaching.pillarsHeadlineLead}
              emphasis={coaching.pillarsHeadlineEmphasis}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 80} className="h-full">
                <PillarCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={coaching.howEyebrow}
            lead={coaching.howHeadlineLead}
            emphasis={coaching.howHeadlineEmphasis}
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 80} className="h-full">
              <article className="relative h-full overflow-hidden rounded-[8px] border border-brown/12 bg-cream p-7">
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 select-none"
                >
                  <GhostNumeral>{item.step}</GhostNumeral>
                </span>
                <div className="relative">
                  <span className="font-display text-4xl font-extrabold text-red">{item.step}</span>
                  <h3 className="mt-4 text-xl text-espresso">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-brown">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 4b. Calorie tool (Mifflin-St Jeor) */}
      <section className="bg-ink text-cream">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Fuel, not famine"
              lead="How much should you actually"
              emphasis="eat?"
              align="center"
              className="mx-auto max-w-2xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-center text-cream/75">
              Most women I coach are eating far too little. This calculator uses the Mifflin-St Jeor equation to estimate how much your body needs each day, so we can fuel your training instead of fighting it.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <CalorieCalculator />
          </Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-cream/50">
            These are general estimates from the Mifflin-St Jeor equation and do not account for your full health picture. This is not medical or nutrition advice. For anything specific, please speak with your doctor or a dietitian.
          </p>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow={coaching.faqEyebrow}
                lead={coaching.faqHeadlineLead}
                emphasis={coaching.faqHeadlineEmphasis}
                align="center"
                className="mx-auto"
              />
            </Reveal>
            <Reveal className="mt-12">
              <FaqAccordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="bg-red text-card">
        <div className="container-page py-16 sm:py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl text-card text-balance">
              {coaching.finalHeadlineLead}{" "}
              <em className="font-display italic text-ink">{coaching.finalHeadlineEmphasis}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-card/85">
              {coaching.finalSub}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href={bookingHref()} variant="secondary" size="lg">
                Book a discovery call
              </Button>
              <Button href="/shift" variant="outlineLight" size="lg">
                Get the free guide first
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
