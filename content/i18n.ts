/**
 * i18n.ts — locale config + UI dictionary (English + Arabic).
 *
 * English is complete. Arabic covers the global chrome, the home hero, and the
 * /shift quiz. Nastasia is bilingual, so she should review and refine the Arabic.
 * Deeper page bodies are English for now and ready to be added here.
 * No dashes as sentence punctuation in visible copy.
 */

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Short toggle label shown for the OTHER language you can switch to. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
};

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const messages = {
  en: {
    nav: { about: "About", coaching: "Coaching", results: "Results", freeGuide: "Free guide", contact: "Contact" },
    cta: { getGuide: "Get the free guide", backToSite: "Back to site" },
    footer: {
      explore: "Explore",
      connect: "Connect",
      optinLead: "The 4 mistakes keeping you",
      optinEmphasis: "stuck.",
      optinTail: "Get the fix, free.",
      optinButton: "Send it to me",
      reassurance: "No spam. Unsubscribe anytime.",
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      freeGuide: "Free guide",
    },
    home: {
      eyebrow: "Fitness by Nastasia",
      lead: "Stronger, healthier, and finally",
      emphasis: "fuelled.",
      sub: "Online and in person coaching for women who are done with under eating, over training, and guessing. Let's build a body that works with you.",
      primaryCta: "Get my free guide",
      secondaryCta: "Work with me",
      trustLine: "Trusted by 250+ women",
    },
    comingSoon: {
      eyebrow: "Launching soon",
      lead: "Something good is",
      emphasis: "coming.",
      sub: "The full site is on its way. In the meantime, take the quick quiz and grab my free guide to find what is keeping you stuck.",
      cta: "Get the free guide",
      follow: "Follow on Instagram",
    },
  },
  ar: {
    nav: { about: "عن نستازيا", coaching: "التدريب", results: "النتائج", freeGuide: "الدليل المجاني", contact: "تواصلي" },
    cta: { getGuide: "احصلي على الدليل المجاني", backToSite: "العودة إلى الموقع" },
    footer: {
      explore: "استكشفي",
      connect: "تواصلي",
      optinLead: "الأخطاء الأربعة التي تُبقيكِ",
      optinEmphasis: "عالقة.",
      optinTail: "احصلي على الحل، مجاناً.",
      optinButton: "أرسليه لي",
      reassurance: "بدون إزعاج. يمكنكِ إلغاء الاشتراك في أي وقت.",
      rights: "جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
      freeGuide: "الدليل المجاني",
    },
    home: {
      eyebrow: "اللياقة مع نستازيا",
      lead: "أقوى، أصحّ، وأخيراً",
      emphasis: "مُفعمة بالطاقة.",
      sub: "تدريب أونلاين وحضوري للنساء اللواتي سئمن الحرمان والإفراط في التمارين والتخمين. لنبنِ معاً جسماً يعمل لصالحكِ.",
      primaryCta: "احصلي على دليلي المجاني",
      secondaryCta: "تدرّبي معي",
      trustLine: "موثوقة من أكثر من ٢٥٠ امرأة",
    },
    comingSoon: {
      eyebrow: "قريباً",
      lead: "شيءٌ جميلٌ في",
      emphasis: "الطريق.",
      sub: "الموقع الكامل قادم قريباً. وحتى ذلك الحين، أجيبي عن الاختبار السريع واحصلي على دليلي المجاني لتكتشفي ما الذي يُبقيكِ عالقة.",
      cta: "احصلي على الدليل المجاني",
      follow: "تابعيني على إنستغرام",
    },
  },
} as const;

export type Dict = (typeof messages)["en"];
