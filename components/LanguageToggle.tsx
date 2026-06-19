"use client";

import { useLocale } from "./LocaleProvider";
import { localeNames, type Locale } from "@/content/i18n";

/** Switches between English and Arabic (with RTL). Shows the language to switch to. */
export function LanguageToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale } = useLocale();
  const other: Locale = locale === "en" ? "ar" : "en";

  const skin =
    tone === "light"
      ? "border-cream/40 text-cream hover:bg-cream hover:text-ink"
      : "border-brown/30 text-espresso hover:bg-espresso hover:text-cream";

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      aria-label={`Switch to ${localeNames[other]}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${skin}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {localeNames[other]}
    </button>
  );
}
