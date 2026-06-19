import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageSlot } from "@/components/ImageSlot";
import { HomeHero } from "@/components/HomeHero";
import { StatBar } from "@/components/StatBar";
import { PillarCard } from "@/components/PillarCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ComingSoon } from "@/components/ComingSoon";
import { pillars, images, SITE_LIVE } from "@/content/site";
import { home } from "@/content/copy";

export default function HomePage() {
  if (!SITE_LIVE) return <ComingSoon />;
  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* Marquee strip */}
      <section className="border-y border-brown/12 bg-card">
        <Marquee items={["Strength", "Health first", "Eat enough", "Train smarter", "Recover well", "Move without pain"]} />
      </section>

      {/* 2. Stat bar */}
      <StatBar stats={home.stats} />

      {/* 3. Who this is for */}
      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <SectionHeading
                eyebrow={home.isThisYou.eyebrow}
                lead={home.isThisYou.headlineLead}
                emphasis={home.isThisYou.headlineEmphasis}
                tail={home.isThisYou.headlineTail}
                size="lg"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal direction="right">
              <ul className="space-y-5">
                {home.isThisYou.points.map((point) => (
                  <li key={point} className="flex items-start gap-4 border-b border-brown/12 pb-5">
                    <span aria-hidden className="mt-1 font-display text-xl font-bold text-red">&middot;</span>
                    <span className="text-lg text-espresso">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. The SHIFT method */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={home.method.eyebrow}
              lead={home.method.headlineLead}
              emphasis={home.method.headlineEmphasis}
              align="center"
              size="lg"
              className="mx-auto max-w-2xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-center text-brown">{home.method.sub}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 80}>
                <PillarCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Free guide teaser */}
      <section className="bg-ink text-cream">
        <div className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow={home.guideTeaser.eyebrow}
                lead={home.guideTeaser.headlineLead}
                emphasis={home.guideTeaser.headlineEmphasis}
                size="lg"
              />
              <p className="mt-5 max-w-lg text-lg text-cream/75">{home.guideTeaser.sub}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-[8px] border border-cream/15 bg-ink/40 p-6 sm:p-8">
                <p className="label-eyebrow mb-4 text-cream/60">Get it in your inbox</p>
                <LeadForm tone="light" source="home-teaser" buttonLabel={home.guideTeaser.cta} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Results preview */}
      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={home.resultsPreview.eyebrow}
              lead={home.resultsPreview.headlineLead}
              emphasis={home.resultsPreview.headlineEmphasis}
              size="lg"
            />
            <Link href="/results" className="label-eyebrow shrink-0 text-espresso hover:text-red">
              {home.resultsPreview.cta} &rarr;
            </Link>
          </div>
          <p className="mt-5 max-w-xl text-brown">{home.resultsPreview.sub}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 80}>
              <TestimonialCard />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. About teaser */}
      <section className="bg-card">
        <div className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <ImageSlot image={images.aboutPortrait} ratio="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 40vw" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal direction="right">
              <SectionHeading
                eyebrow={home.aboutTeaser.eyebrow}
                lead={home.aboutTeaser.headlineLead}
                emphasis={home.aboutTeaser.headlineEmphasis}
                tail={home.aboutTeaser.headlineTail}
                size="lg"
              />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown">{home.aboutTeaser.body}</p>
              <Button href="/about" variant="outline" size="lg" className="mt-8">
                {home.aboutTeaser.cta}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-red text-card">
        <div className="container-page py-20 text-center sm:py-28">
          <Reveal direction="scale">
            <h2 className="mx-auto max-w-3xl text-4xl text-card sm:text-5xl lg:text-6xl text-balance">
              {home.finalCta.headlineLead}{" "}
              <em className="font-display italic text-ink">{home.finalCta.headlineEmphasis}</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-card/85">{home.finalCta.sub}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/shift" variant="secondary" size="lg">
                {home.finalCta.primary}
              </Button>
              <Button href="/coaching" variant="outlineLight" size="lg">
                {home.finalCta.secondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
