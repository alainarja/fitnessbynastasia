import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";
import { ComingSoon } from "@/components/ComingSoon";
import { images, journey, SITE_LIVE } from "@/content/site";
import { about } from "@/content/copy";

export const metadata: Metadata = {
  title: "About Nastasia",
  description:
    "I coach women health first: real strength over restriction, food you can live with, and recovery that lets progress happen. Skip the years of guessing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nastasia",
    description:
      "Health first strength coaching for women. My story, my philosophy, and who I help.",
  },
};

export default function AboutPage() {
  if (!SITE_LIVE) return <ComingSoon />;
  return (
    <>
      {/* 1. Hero */}
      <section className="container-page py-12 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl text-balance">
              {about.heroHeadlineLead}{" "}
              <em className="font-display italic text-red">{about.heroHeadlineEmphasis}</em>
            </h1>
          </div>
          <div className="lg:col-span-6">
            <ImageSlot
              image={images.aboutHero}
              ratio="aspect-[4/5]"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 2. Her story */}
      <section className="container-page py-16 sm:py-24">
        {/* TODO(nastasia): review and personalise */}
        <Reveal>
          <div className="max-w-2xl space-y-6">
            {about.story.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-brown">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3. Philosophy */}
      <section className="bg-card">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={about.philosophy.eyebrow}
              lead={about.philosophy.headlineLead}
              emphasis={about.philosophy.headlineEmphasis}
              size="lg"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {about.philosophy.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <div className="rounded-[8px] border border-brown/12 bg-cream p-7">
                  <span className="red-rule mb-4" aria-hidden />
                  <h3 className="text-xl">{point.title}</h3>
                  <p className="mt-3 text-brown">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who I help */}
      <section className="container-page py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <ImageSlot
                image={images.aboutPortrait}
                ratio="aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow={about.whoIHelp.eyebrow}
                lead={about.whoIHelp.headlineLead}
                emphasis={about.whoIHelp.headlineEmphasis}
                tail={about.whoIHelp.headlineTail}
                size="lg"
              />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown">
                {about.whoIHelp.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Journey strip */}
      <section className="bg-ink text-cream">
        <div className="container-page py-16 sm:py-24">
          <Reveal>
            <Eyebrow tone="light">My journey</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl text-cream text-balance">
              How it has{" "}
              <em className="font-display italic text-red">grown.</em>
            </h2>
          </Reveal>
          {/* TODO(nastasia): optional progression photos */}
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {journey.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure>
                  <ImageSlot
                    image={{ src: item.src, alt: item.alt, label: "JOURNEY PHOTO" }}
                    ratio="aspect-[3/4]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <figcaption className="mt-3 font-display text-xl text-cream">
                    {item.year}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Credentials */}
      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={about.credentials.eyebrow}
            lead={about.credentials.headlineLead}
            emphasis={about.credentials.headlineEmphasis}
            size="lg"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.credentials.placeholders.map((placeholder, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-[8px] border border-dashed border-brown/30 bg-cream-deep p-6">
                <span className="label-eyebrow text-red">TODO</span>
                <p className="mt-3 text-brown">{placeholder}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-brown/70">{about.credentials.note}</p>
        </Reveal>
      </section>

      {/* 7. Final CTA */}
      <section className="bg-red text-card">
        <div className="container-page py-20 text-center sm:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl text-card text-balance">
              Let&apos;s build something{" "}
              <em className="font-display italic text-ink">strong.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-card/85">
              Health first, strength over restriction, and a plan that fits your real life.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/coaching" variant="secondary" size="lg">
                Work with me
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
