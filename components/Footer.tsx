"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { LeadForm } from "./LeadForm";
import { SectionHeading } from "./SectionHeading";
import { useLocale } from "./LocaleProvider";
import { site, whatsappLink } from "@/content/site";

export function Footer() {
  const year = 2026; // static to avoid build-time Date; update yearly or wire to env.
  const { t } = useLocale();

  const nav = [
    { href: "/about", label: t.nav.about },
    { href: "/coaching", label: t.nav.coaching },
    { href: "/results", label: t.nav.results },
    { href: "/shift", label: t.nav.freeGuide },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="mt-auto bg-ink text-cream">
      <div className="container-page py-16 sm:py-20">
        {/* Opt-in band */}
        <div className="grid gap-10 border-b border-cream/10 pb-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            tone="light"
            size="md"
            eyebrow={t.footer.freeGuide}
            lead={t.footer.optinLead}
            emphasis={t.footer.optinEmphasis}
            tail={t.footer.optinTail}
          />
          <div className="flex flex-col justify-center">
            <LeadForm
              variant="inline"
              tone="light"
              source="footer"
              showName={false}
              buttonLabel={t.footer.optinButton}
              reassurance={t.footer.reassurance}
            />
          </div>
        </div>

        {/* Lower footer */}
        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">{site.mission}</p>
            <p className="mt-4 text-sm text-cream/50">{site.contact.location}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="label-eyebrow text-cream/50">{t.footer.explore}</span>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream/80 hover:text-cream">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label-eyebrow text-cream/50">{t.footer.connect}</span>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/80 hover:text-cream">
              Instagram {site.instagramHandle}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/80 hover:text-cream">
              WhatsApp
            </a>
            {site.social.tiktok ? (
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/80 hover:text-cream">
                TikTok
              </a>
            ) : null}
            <a href={`mailto:${site.contact.email}`} className="text-sm text-cream/80 hover:text-cream">
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.brandName}. {t.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-cream">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
