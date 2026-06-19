/**
 * quiz.ts — the interactive /shift questionnaire, bilingual (English + Arabic).
 *
 * Purpose: qualify and segment each lead (what she is interested in, how ready she
 * is) so Nastasia can follow up MANUALLY by email or WhatsApp and upsell. The lead
 * leaves an email and/or a WhatsApp number at the end, then gets the free guide.
 *
 * Structural fields (value, tag, emoji, id) are language independent. Use getQuiz,
 * getQuizIntro, getQuizContact, getQuizUi with the current locale.
 * Arabic is provided for convenience; Nastasia (bilingual) should review it.
 * No dashes as sentence punctuation in visible copy.
 */

import type { Locale } from "./i18n";

export type QuizOption = {
  value: string;
  label: string;
  emoji: string;
  tag: string;
};

export type QuizQuestion = {
  id: string;
  lead: string;
  emphasis?: string;
  helper?: string;
  options: QuizOption[];
};

const quizEn: QuizQuestion[] = [
  {
    id: "gender",
    lead: "First, who am I",
    emphasis: "coaching?",
    options: [
      { value: "women", label: "Women", emoji: "👩", tag: "gender-women" },
      { value: "men", label: "Men", emoji: "👨", tag: "gender-men" },
    ],
  },
  {
    id: "struggle",
    lead: "What is keeping you stuck right",
    emphasis: "now?",
    helper: "Pick the one that hits hardest.",
    options: [
      { value: "no-results", label: "I train hard but see no results", emoji: "🔁", tag: "struggle-no-results" },
      { value: "food-fear", label: "I am scared of food and carbs", emoji: "🍞", tag: "struggle-food-fear" },
      { value: "no-rest", label: "No energy, no rest, always tired", emoji: "😴", tag: "struggle-no-rest" },
      { value: "no-plan", label: "I have no real plan", emoji: "🤷‍♀️", tag: "struggle-no-plan" },
    ],
  },
  {
    id: "experience",
    lead: "How long have you been",
    emphasis: "training?",
    options: [
      { value: "beginner", label: "I am just starting out", emoji: "🌱", tag: "exp-beginner" },
      { value: "on-off", label: "On and off for a while", emoji: "🔄", tag: "exp-on-off" },
      { value: "consistent", label: "A year or more, consistently", emoji: "💪", tag: "exp-consistent" },
      { value: "stuck-veteran", label: "Years, but I feel stuck", emoji: "🧱", tag: "exp-stuck-veteran" },
    ],
  },
  {
    id: "location",
    lead: "Where will you mostly",
    emphasis: "train?",
    options: [
      { value: "full-gym", label: "A full gym", emoji: "🏋️‍♀️", tag: "loc-full-gym" },
      { value: "home-equipment", label: "Home, with some equipment", emoji: "🏠", tag: "loc-home-equipment" },
      { value: "home-bodyweight", label: "Home, bodyweight only", emoji: "🤸‍♀️", tag: "loc-home-bodyweight" },
      { value: "not-yet", label: "I am not training yet", emoji: "🆕", tag: "loc-not-yet" },
    ],
  },
  {
    id: "goal",
    lead: "What matters most to you right",
    emphasis: "now?",
    options: [
      { value: "strength", label: "Getting stronger", emoji: "💪", tag: "goal-strength" },
      { value: "energy", label: "Feeling good and energised", emoji: "⚡", tag: "goal-energy" },
      { value: "pain-free", label: "Moving without pain", emoji: "🧘‍♀️", tag: "goal-pain-free" },
      { value: "sustainable", label: "A routine I can actually keep", emoji: "🌿", tag: "goal-sustainable" },
    ],
  },
  {
    id: "considerations",
    lead: "Anything I should",
    emphasis: "know?",
    helper: "This stays private. It just helps me coach you well.",
    options: [
      { value: "none", label: "Nothing in particular", emoji: "✅", tag: "note-none" },
      { value: "injury", label: "An old or current injury", emoji: "🩹", tag: "note-injury" },
      { value: "special-needs", label: "Special needs to work around", emoji: "💛", tag: "note-special-needs" },
      { value: "discuss", label: "I would rather discuss privately", emoji: "🤫", tag: "note-discuss" },
    ],
  },
  {
    id: "interest",
    lead: "What are you most interested",
    emphasis: "in?",
    helper: "This helps me point you to the right thing.",
    options: [
      { value: "guide", label: "The free guide for now", emoji: "📘", tag: "interest-guide" },
      { value: "program", label: "A training program to follow", emoji: "📋", tag: "interest-program" },
      { value: "pt", label: "Personal training sessions", emoji: "🏋️‍♀️", tag: "interest-pt" },
      { value: "packages", label: "Coaching packages or the SHIFT room", emoji: "✨", tag: "interest-packages" },
    ],
  },
];

const quizAr: QuizQuestion[] = [
  {
    id: "gender",
    lead: "بدايةً، من سأ",
    emphasis: "درّب؟",
    options: [
      { value: "women", label: "النساء", emoji: "👩", tag: "gender-women" },
      { value: "men", label: "الرجال", emoji: "👨", tag: "gender-men" },
    ],
  },
  {
    id: "struggle",
    lead: "ما الذي يُبقيكِ عالقة في هذه",
    emphasis: "المرحلة؟",
    helper: "اختاري الأقرب إلى حالتكِ.",
    options: [
      { value: "no-results", label: "أتدرّب بجدّ ولا أرى نتائج", emoji: "🔁", tag: "struggle-no-results" },
      { value: "food-fear", label: "أخاف من الطعام والكربوهيدرات", emoji: "🍞", tag: "struggle-food-fear" },
      { value: "no-rest", label: "لا طاقة ولا راحة ودائماً متعبة", emoji: "😴", tag: "struggle-no-rest" },
      { value: "no-plan", label: "ليس لديّ خطة واضحة", emoji: "🤷‍♀️", tag: "struggle-no-plan" },
    ],
  },
  {
    id: "experience",
    lead: "منذ متى وأنتِ",
    emphasis: "تتدرّبين؟",
    options: [
      { value: "beginner", label: "أنا في البداية", emoji: "🌱", tag: "exp-beginner" },
      { value: "on-off", label: "بشكل متقطّع منذ فترة", emoji: "🔄", tag: "exp-on-off" },
      { value: "consistent", label: "سنة أو أكثر بانتظام", emoji: "💪", tag: "exp-consistent" },
      { value: "stuck-veteran", label: "سنوات، لكنني أشعر أنني عالقة", emoji: "🧱", tag: "exp-stuck-veteran" },
    ],
  },
  {
    id: "location",
    lead: "أين ستتدرّبين في",
    emphasis: "الغالب؟",
    options: [
      { value: "full-gym", label: "في نادٍ رياضي مجهّز", emoji: "🏋️‍♀️", tag: "loc-full-gym" },
      { value: "home-equipment", label: "في المنزل مع بعض المعدّات", emoji: "🏠", tag: "loc-home-equipment" },
      { value: "home-bodyweight", label: "في المنزل بوزن الجسم فقط", emoji: "🤸‍♀️", tag: "loc-home-bodyweight" },
      { value: "not-yet", label: "لم أبدأ التدريب بعد", emoji: "🆕", tag: "loc-not-yet" },
    ],
  },
  {
    id: "goal",
    lead: "ما الأهمّ بالنسبة لكِ",
    emphasis: "الآن؟",
    options: [
      { value: "strength", label: "أن أصبح أقوى", emoji: "💪", tag: "goal-strength" },
      { value: "energy", label: "أن أشعر بالنشاط والطاقة", emoji: "⚡", tag: "goal-energy" },
      { value: "pain-free", label: "أن أتحرّك بلا ألم", emoji: "🧘‍♀️", tag: "goal-pain-free" },
      { value: "sustainable", label: "روتين أستطيع الالتزام به فعلاً", emoji: "🌿", tag: "goal-sustainable" },
    ],
  },
  {
    id: "considerations",
    lead: "هل من شيء يجب أن",
    emphasis: "أعرفه؟",
    helper: "تبقى المعلومة خاصة. هي فقط تساعدني لأدرّبكِ جيداً.",
    options: [
      { value: "none", label: "لا شيء بالتحديد", emoji: "✅", tag: "note-none" },
      { value: "injury", label: "إصابة قديمة أو حالية", emoji: "🩹", tag: "note-injury" },
      { value: "special-needs", label: "احتياجات خاصة يجب مراعاتها", emoji: "💛", tag: "note-special-needs" },
      { value: "discuss", label: "أفضّل أن نتحدث بشكل خاص", emoji: "🤫", tag: "note-discuss" },
    ],
  },
  {
    id: "interest",
    lead: "ما الذي يهمّكِ",
    emphasis: "أكثر؟",
    helper: "هذا يساعدني لأوجّهكِ إلى الأنسب لكِ.",
    options: [
      { value: "guide", label: "الدليل المجاني الآن", emoji: "📘", tag: "interest-guide" },
      { value: "program", label: "برنامج تدريبي ألتزم به", emoji: "📋", tag: "interest-program" },
      { value: "pt", label: "جلسات تدريب شخصي", emoji: "🏋️‍♀️", tag: "interest-pt" },
      { value: "packages", label: "باقات التدريب أو غرفة SHIFT", emoji: "✨", tag: "interest-packages" },
    ],
  },
];

export function getQuiz(locale: Locale): QuizQuestion[] {
  return locale === "ar" ? quizAr : quizEn;
}

/** Map the interest answer to the readiness used for the tailored thank-you page. */
export function readinessFromInterest(interest: string | undefined): "guide" | "curious" | "ready" {
  if (interest === "pt" || interest === "packages") return "ready";
  if (interest === "program") return "curious";
  return "guide";
}

const introEn = {
  eyebrow: "Free guide",
  lead: "Let's find what is keeping you",
  emphasis: "stuck.",
  sub: "Answer 6 quick questions. I will send your free guide and your next step personally. It takes under a minute.",
  stepLabel: "Question",
  trust: [
    "Built for women who train hard and still feel stuck.",
    "Health first. No crash diets, no carb fear, no over training.",
    "A tailored next step at the end, not just a download.",
  ],
};

const introAr = {
  eyebrow: "الدليل المجاني",
  lead: "لنكتشف ما الذي يُبقيكِ",
  emphasis: "عالقة.",
  sub: "أجيبي عن 6 أسئلة سريعة. سأرسل لكِ دليلكِ المجاني وخطوتكِ التالية بشكل شخصي. الأمر يستغرق أقل من دقيقة.",
  stepLabel: "سؤال",
  trust: [
    "مصمّم للنساء اللواتي يتدرّبن بجدّ ويشعرن أنهن عالقات.",
    "الصحة أولاً. بلا حميات قاسية ولا خوف من الكربوهيدرات ولا إفراط في التمارين.",
    "خطوة تالية مخصّصة لكِ في النهاية، وليست مجرد تحميل.",
  ],
};

export function getQuizIntro(locale: Locale) {
  return locale === "ar" ? introAr : introEn;
}

const contactEn = {
  badge: "🎉 Almost there",
  lead: "How can I reach",
  emphasis: "you?",
  sub: "Leave your email or your WhatsApp number. I will send your guide and your tailored next step to you personally.",
  namePlaceholder: "First name (optional)",
  emailPlaceholder: "Email",
  phonePlaceholder: "WhatsApp number",
  orText: "Add at least one so I can reach you.",
  button: "Send me my guide",
  sending: "Sending...",
  reassurance: "No spam. I will only use this to send your guide and follow up.",
  needContact: "Please add your email or your WhatsApp number.",
};

const contactAr = {
  badge: "🎉 خطوة أخيرة",
  lead: "كيف أتواصل",
  emphasis: "معكِ؟",
  sub: "اتركي بريدكِ الإلكتروني أو رقم الواتساب، وسأرسل لكِ الدليل وخطوتكِ التالية بشكل شخصي.",
  namePlaceholder: "الاسم الأول (اختياري)",
  emailPlaceholder: "البريد الإلكتروني",
  phonePlaceholder: "رقم الواتساب",
  orText: "أضيفي وسيلة تواصل واحدة على الأقل.",
  button: "أرسلي لي دليلي",
  sending: "جارٍ الإرسال...",
  reassurance: "بدون إزعاج. سأستخدمه فقط لإرسال دليلكِ والمتابعة.",
  needContact: "الرجاء إضافة بريدكِ الإلكتروني أو رقم الواتساب.",
};

export function getQuizContact(locale: Locale) {
  return locale === "ar" ? contactAr : contactEn;
}

const uiEn = { of: "of", lastStep: "Last step", back: "Back", error: "Something went wrong. Please try again." };
const uiAr = { of: "من", lastStep: "الخطوة الأخيرة", back: "رجوع", error: "حدث خطأ ما. حاولي مرة أخرى." };

export function getQuizUi(locale: Locale) {
  return locale === "ar" ? uiAr : uiEn;
}
