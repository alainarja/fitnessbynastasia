"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";
import { site } from "@/content/site";

/**
 * Switches between the full site chrome and a minimal "focus mode" used on the
 * /shift lead magnet, so that page stays distraction free (no nav, slim footer).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();
  const focus = pathname === "/shift";

  if (focus) {
    return (
      <>
        <header className="border-b border-brown/12 bg-cream/80 backdrop-blur-sm">
          <div className="container-page flex h-16 items-center justify-between sm:h-20">
            <Logo />
            <LanguageToggle />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-brown/12 bg-cream">
          <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-brown/60 sm:flex-row">
            <p>
              &copy; 2026 {site.brandName}.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-red">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="hover:text-red">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
