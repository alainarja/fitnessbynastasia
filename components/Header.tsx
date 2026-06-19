"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLocale();

  const nav = [
    { href: "/about", label: t.nav.about },
    { href: "/coaching", label: t.nav.coaching },
    { href: "/results", label: t.nav.results },
    { href: "/shift", label: t.nav.freeGuide },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-brown/15 bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
                className={`link-underline label-eyebrow text-[0.7rem] transition-colors hover:text-red ${
                  active ? "text-red" : "text-espresso"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button href="/shift" size="md">
            {t.cta.getGuide}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-[8px] text-espresso lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-brown/10 bg-cream/98 backdrop-blur-md transition-[max-height] duration-300 ease-out lg:hidden ${
          menuOpen ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-[8px] px-2 py-3 font-display text-xl text-espresso hover:text-red"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-3">
            <LanguageToggle />
            <Button href="/shift" size="lg" className="flex-1" onClick={() => setMenuOpen(false)}>
              {t.cta.getGuide}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
