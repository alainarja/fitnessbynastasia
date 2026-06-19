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
    calculator: {
      eyebrow: "Free tool",
      lead: "Calculate your",
      emphasis: "calories.",
      sub: "Using the Mifflin-St Jeor equation. Find your BMR, then your maintenance calories based on how much you train, then your target for fat loss or weight gain.",
      disclaimer:
        "These are general estimates and do not account for your full health picture. This is not medical or nutrition advice. For anything specific, please speak with your doctor or a dietitian.",
      step1: "Step 1. Are you female or male?",
      female: "Female",
      male: "Male",
      step2: "Step 2. Your details",
      weight: "Weight (kg)",
      height: "Height (cm)",
      age: "Age",
      calcBtn: "Calculate my BMR",
      errSex: "Please choose female or male first.",
      errData: "Please enter a valid weight, height, and age.",
      bmrLabel: "Your BMR",
      perDay: "kcal / day",
      bmrNote: "This is the energy your body burns at complete rest. Next, let's factor in your training.",
      step3: "Step 3. How many times do you train per week?",
      act: [
        { label: "I don't really train yet", note: "Mostly sitting" },
        { label: "1 to 2 times a week", note: "Lightly active" },
        { label: "3 to 4 times a week", note: "Moderately active" },
        { label: "5 to 6 times a week", note: "Very active" },
        { label: "Every day, or twice a day", note: "Athlete level" },
      ],
      tdeeLabel: "Your maintenance (TDEE)",
      tdeeNote: "This is roughly what you burn in a day with your training. Now pick your goal.",
      step4: "Step 4. What is your goal?",
      goalMaintenance: "Give me my maintenance calories",
      goalRecomp: "Recomposition (lose fat and gain muscle)",
      goalLoss: "Fat loss (5 to 25% deficit)",
      goalGain: "Weight gain (5 to 25% surplus)",
      resMaintenance: "Your maintenance calories",
      resRecomp: "Your recomposition calories (lose fat and gain muscle)",
      resLoss: "Your fat loss calories, by deficit",
      resGain: "Your weight gain calories, by surplus",
      to: "to",
      deficit: "deficit",
      surplus: "surplus",
      resultNote:
        "A starting estimate. The best results come from eating enough, training with a plan, and adjusting as you go. Want help with that?",
      cta: "Get my free guide",
      startOver: "Start over",
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
    calculator: {
      eyebrow: "أداة مجانية",
      lead: "احسبي",
      emphasis: "سعراتك.",
      sub: "باستخدام معادلة Mifflin-St Jeor. اعرفي معدل الأيض الأساسي، ثم سعرات الحفاظ على وزنك حسب عدد مرات تدريبك، ثم هدفك لخسارة الدهون أو زيادة الوزن.",
      disclaimer:
        "هذه تقديرات عامة ولا تأخذ بعين الاعتبار حالتك الصحية الكاملة. هذه ليست نصيحة طبية أو غذائية. لأي أمر محدد، يرجى استشارة طبيبك أو أخصائي تغذية.",
      step1: "الخطوة 1. هل أنتِ أنثى أم ذكر؟",
      female: "أنثى",
      male: "ذكر",
      step2: "الخطوة 2. تفاصيلك",
      weight: "الوزن (كغ)",
      height: "الطول (سم)",
      age: "العمر",
      calcBtn: "احسبي معدل الأيض",
      errSex: "الرجاء اختيار أنثى أو ذكر أولاً.",
      errData: "الرجاء إدخال وزن وطول وعمر صحيحة.",
      bmrLabel: "معدل الأيض الأساسي (BMR)",
      perDay: "سعرة / يوم",
      bmrNote: "هذه هي الطاقة التي يحرقها جسمك أثناء الراحة التامة. الآن لنأخذ تدريبك بعين الاعتبار.",
      step3: "الخطوة 3. كم مرة تتدرّبين في الأسبوع؟",
      act: [
        { label: "لا أتدرّب بعد", note: "جلوس غالباً" },
        { label: "1 إلى 2 مرة في الأسبوع", note: "نشاط خفيف" },
        { label: "3 إلى 4 مرات في الأسبوع", note: "نشاط متوسط" },
        { label: "5 إلى 6 مرات في الأسبوع", note: "نشاط عالٍ" },
        { label: "كل يوم، أو مرتين في اليوم", note: "مستوى رياضي" },
      ],
      tdeeLabel: "سعرات الحفاظ على وزنك (TDEE)",
      tdeeNote: "هذا تقريباً ما يحرقه جسمك يومياً مع تدريبك. الآن اختاري هدفك.",
      step4: "الخطوة 4. ما هو هدفك؟",
      goalMaintenance: "أعطيني سعرات الحفاظ على وزني",
      goalRecomp: "إعادة تكوين الجسم (خسارة دهون وبناء عضل)",
      goalLoss: "خسارة الدهون (عجز 5 إلى 25%)",
      goalGain: "زيادة الوزن (فائض 5 إلى 25%)",
      resMaintenance: "سعرات الحفاظ على وزنك",
      resRecomp: "سعرات إعادة التكوين (خسارة دهون وبناء عضل)",
      resLoss: "سعرات خسارة الدهون، حسب العجز",
      resGain: "سعرات زيادة الوزن، حسب الفائض",
      to: "إلى",
      deficit: "عجز",
      surplus: "فائض",
      resultNote:
        "تقدير مبدئي. أفضل النتائج تأتي من الأكل الكافي، والتدريب بخطة، والتعديل مع الوقت. تريدين المساعدة في ذلك؟",
      cta: "احصلي على دليلي المجاني",
      startOver: "ابدئي من جديد",
    },
  },
} as const;

export type Dict = (typeof messages)["en"];
