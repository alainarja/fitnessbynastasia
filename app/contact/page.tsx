import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ComingSoon } from "@/components/ComingSoon";
import { site, whatsappLink, SITE_LIVE } from "@/content/site";
import { contact } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about coaching, or ready to apply? Send a message to Fitness by Nastasia and start the conversation. Women's fitness coaching, health first.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Fitness by Nastasia",
    description:
      "Ask your questions or apply to work with me. Reach out by message, WhatsApp, Instagram, or email.",
  },
};

export default function ContactPage() {
  if (!SITE_LIVE) return <ComingSoon />;
  return (
    <>
      {/* 1. Hero header */}
      <section className="border-b border-brown/12">
        <div className="container-page py-12 lg:py-16">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl text-balance">
            {contact.headlineLead}{" "}
            <em className="font-display italic text-red">{contact.headlineEmphasis}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown">{contact.sub}</p>
        </div>
      </section>

      {/* 2. Two column: form + direct contact */}
      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: form card */}
          <Reveal>
            <div className="rounded-[8px] border border-brown/15 bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* RIGHT: reach me directly */}
          <Reveal delay={80}>
            <div>
              <Eyebrow>{contact.directEyebrow}</Eyebrow>

              <ul className="mt-8 flex flex-col divide-y divide-brown/12 border-y border-brown/12">
                <li>
                  <a
                    href={whatsappLink("Hi Nastasia, I would love to know more about coaching.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[64px] flex-col justify-center py-4 transition-colors"
                  >
                    <span className="label-eyebrow text-brown">WhatsApp</span>
                    <span className="mt-1 text-lg text-espresso transition-colors group-hover:text-red">
                      Message me on WhatsApp
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[64px] flex-col justify-center py-4 transition-colors"
                  >
                    <span className="label-eyebrow text-brown">Instagram</span>
                    <span className="mt-1 text-lg text-espresso transition-colors group-hover:text-red">
                      {site.instagramHandle}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="group flex min-h-[64px] flex-col justify-center py-4 transition-colors"
                  >
                    <span className="label-eyebrow text-brown">Email</span>
                    <span className="mt-1 text-lg text-espresso transition-colors group-hover:text-red">
                      {site.contact.email}
                    </span>
                  </a>
                </li>
              </ul>

              <p className="mt-6 text-brown">{site.contact.location}</p>

              {/* TODO(nastasia): review */}
              <p className="mt-6 max-w-md leading-relaxed text-brown">
                Write to me like you would a friend. Tell me where you are, what you
                want, and what feels stuck. I read every message myself and I will
                get back to you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
