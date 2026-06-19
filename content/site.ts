/**
 * site.ts — the editable source of truth for facts, links, offers and labels.
 * Nastasia can change anything here without touching components.
 * Keep visible copy free of dashes used as punctuation (use full stops / commas).
 */

/** Her own stated number. Edit in ONE place. */
export const CLIENTS_HELPED_COUNT = 250;

/**
 * Launch switch. While false, every page except /shift (and the legal pages)
 * shows a "Coming soon" screen, so all traffic funnels to the free guide.
 * Flip to true to launch the full site. Typed as boolean so both branches stay live.
 */
export const SITE_LIVE: boolean = false;

export const site = {
  brandName: "Fitness by Nastasia",
  shortName: "Nastasia",
  coachName: "Nastasia",
  domain: "fitnessbynastasia.com",
  baseUrl: "https://fitnessbynastasia.com",
  instagramHandle: "@coach.nastasiaa",

  mission:
    "Online and in person coaching for women who want to move without pain, get stronger, and feel good in their body. Health first, never restriction.",

  /** Contact + social. WhatsApp number is digits only, international format, no plus or spaces. */
  contact: {
    email: "hello@fitnessbynastasia.com", // TODO(nastasia): confirm public email
    whatsappNumber: "9610000000", // TODO(nastasia): real WhatsApp number, digits only e.g. 96170123456
    location: "Based in Lebanon. Coaching women worldwide online.",
  },

  social: {
    instagram: "https://instagram.com/coach.nastasiaa",
    tiktok: "", // TODO(nastasia): add TikTok URL if she wants it shown
    // whatsapp link is built from contact.whatsappNumber
  },

  /** Booking link for discovery calls (Cal.com or Calendly). Falls back to /contact if empty. */
  bookingUrl: "", // TODO(nastasia): paste Cal.com / Calendly link

  /** Free guide download (hosted in /public/guides). */
  guidePdfPath: "/guides/shift-guide.pdf",
} as const;

/** Build a wa.me click-to-chat link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Booking link with a sensible fallback to the contact page. */
export function bookingHref(): string {
  return site.bookingUrl || "/contact";
}

/* -------------------------------------------------------------------------- */
/* The SHIFT method — four pillars                                            */
/* -------------------------------------------------------------------------- */
export type Pillar = {
  num: string;
  title: string;
  blurb: string;
};

export const pillars: Pillar[] = [
  {
    num: "01",
    title: "Training",
    blurb:
      "Lift with intention. We train for strength and capability, not for punishment. Quality reps over endless hours.",
  },
  {
    num: "02",
    title: "Nutrition",
    blurb:
      "Eat enough to fuel your training and your life. No carb fear, no extremes, just food you can actually live with.",
  },
  {
    num: "03",
    title: "Recovery",
    blurb:
      "Rest is where you get stronger. Sleep, real rest days, and a body that feels good moving are part of the plan.",
  },
  {
    num: "04",
    title: "Mindset",
    blurb:
      "Trade quick fixes for habits that hold. We build trust in your body and consistency you can keep for years.",
  },
];

/* -------------------------------------------------------------------------- */
/* Offers — names, inclusions, prices all editable here                        */
/* -------------------------------------------------------------------------- */
export type Offer = {
  id: string;
  name: string;
  /** Short line under the name describing who it is for. */
  bestFor: string;
  tagline: string;
  /** Leave price empty to show an "Apply" model instead of a number. */
  price: string;
  priceNote: string;
  inclusions: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  /** Set false to hide an offer (e.g. in person training until she enables it). */
  enabled: boolean;
};

export const offers: Offer[] = [
  {
    id: "shift-room",
    name: "The SHIFT room",
    bestFor: "Best for starting with structure and community",
    tagline: "My signature guided program to fix the 4 mistakes and build a routine that lasts.",
    price: "", // TODO(nastasia): set a price, or keep empty for an apply / join model
    priceNote: "Guided program",
    inclusions: [
      "A guided program that fixes the 4 mistakes keeping you stuck",
      "Structured training with real progressive overload",
      "A simple nutrition framework you can sustain",
      "A community of women on the same path",
      "Group support and accountability",
    ],
    ctaLabel: "Join the SHIFT room",
    ctaHref: "/contact",
    enabled: true,
  },
  {
    id: "online-coaching",
    name: "1:1 Online Coaching",
    bestFor: "Best for fully personal, fastest results",
    tagline: "Completely built around your life, your body, and your goals. Just the two of us.",
    price: "", // TODO(nastasia): set a price, or keep empty for an apply model
    priceNote: "By application",
    inclusions: [
      "A custom training plan for your gym, schedule, and level",
      "Nutrition that fits your life, no extreme dieting",
      "Weekly check ins and plan adjustments",
      "Direct access to me for questions and form checks",
      "Care around injuries, special cases, and special needs",
    ],
    ctaLabel: "Apply now",
    ctaHref: "/contact",
    featured: true,
    enabled: true,
  },
  {
    id: "in-person",
    name: "In person training",
    bestFor: "Best for hands on coaching in Lebanon",
    tagline: "One on one sessions in Lebanon, with hands on technique and real time feedback.",
    price: "", // TODO(nastasia): set a price, or keep empty for an enquiry model
    priceNote: "By enquiry",
    inclusions: [
      "In person sessions tailored to you",
      "Hands on technique and form coaching",
      "A plan to follow between sessions",
      "Accountability and progress tracking",
    ],
    ctaLabel: "Enquire",
    ctaHref: "/contact",
    enabled: true, // set false to hide in person training
  },
];

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */
export const howItWorks: { step: string; title: string; text: string }[] = [
  { step: "01", title: "Apply", text: "Tell me about you, your goals, and where you are stuck." },
  { step: "02", title: "Discovery call", text: "We talk it through and make sure we are the right fit." },
  { step: "03", title: "Get your plan", text: "I build training and nutrition around your real life." },
  { step: "04", title: "Start and adjust", text: "You train, we check in weekly, and we keep refining." },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need a gym?",
    a: "Not always. I build your plan around what you have access to, whether that is a full gym, a few dumbbells at home, or bands. We work with your setup.",
  },
  {
    q: "Is this for beginners?",
    a: "Yes. I coach women at every level, from total beginners to women who have trained for years and feel stuck. We start where you are.",
  },
  {
    q: "What about injuries or special needs?",
    a: "I have experience with special cases and special needs clients. We work carefully, around any injuries, and build strength in a way that feels safe for your body.",
  },
  {
    q: "Online or in person?",
    a: "I coach women worldwide online, and offer in person sessions in Lebanon when available. Online coaching is just as personal, with weekly check ins and direct access.",
  },
  {
    q: "How fast will I see results?",
    a: "Honestly, it depends on you and your starting point. This is not a quick fix. Most women feel stronger and more energised within a few weeks, and the bigger changes come from staying consistent over months.",
  },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */
export const mainNav: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/coaching" },
  { label: "Results", href: "/results" },
  { label: "Free guide", href: "/shift" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/* Image slots — central registry. Set `src` to a real file in /public/images */
/* to replace the labelled placeholder. Leave empty to show the placeholder.   */
/* -------------------------------------------------------------------------- */
export type ImageAsset = { src: string; alt: string; label: string };

export const images: Record<string, ImageAsset> = {
  heroPortrait: {
    src: "/images/gallery/IMG_20250103_181656_665.jpg.jpeg",
    alt: "Nastasia in a strong full body pose, black and white",
    label: "HERO PORTRAIT: strong full body or training shot, vertical",
  },
  aboutHero: {
    src: "/images/gallery/IMG_20251202_095004_434.jpg.jpeg",
    alt: "Nastasia smiling, training",
    label: "ABOUT HERO: warm, personal full shot",
  },
  aboutPortrait: {
    src: "/images/gallery/IMG_20251218_115238_221.webp",
    alt: "Portrait of Nastasia",
    label: "ABOUT PORTRAIT: headshot feel",
  },
  coachingHero: {
    src: "/images/gallery/IMG_20240614_192919_208.webp",
    alt: "Nastasia in a controlled training pose",
    label: "COACHING HERO: confident training shot",
  },
  shiftSupporting: {
    src: "/images/gallery/IMG_20251024_174023_577.webp",
    alt: "Nastasia laughing while flexing",
    label: "SHIFT SUPPORTING: energetic, personable",
  },
};

/** Optional 4 photo journey strip for Home or About. */
export const journey: { year: string; src: string; alt: string }[] = [
  { year: "2024", src: "/images/gallery/IMG_20240614_183308_549.webp", alt: "Nastasia training in 2024" },
  { year: "2024", src: "/images/gallery/IMG_20241231_150719_330.webp", alt: "Nastasia training, late 2024" },
  { year: "2025", src: "/images/gallery/IMG_20250103_031153_943.webp", alt: "Nastasia posing, 2025" },
  { year: "2025", src: "/images/gallery/IMG_20251202_095004_434.jpg.jpeg", alt: "Nastasia smiling, late 2025" },
];
