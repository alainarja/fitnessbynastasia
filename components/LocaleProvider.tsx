"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { messages, defaultLocale, dir, type Dict, type Locale } from "@/content/i18n";

type Ctx = {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "fbn-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Restore saved choice on mount. Deferred so we render the default first
  // (matching SSR) and switch after hydration, avoiding a hydration mismatch.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (saved === "en" || saved === "ar") {
      const next = saved;
      queueMicrotask(() => setLocaleState(next));
    }
  }, []);

  // Reflect the locale on the document for language + RTL.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir(locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, t: messages[locale] as Dict, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
