/**
 * copy.ts — long form approved copy, separated from layout so it is easy to edit.
 * Hard rule: no dashes used as sentence punctuation. Use full stops, commas, colons.
 * Anything written in Nastasia's voice that she should review is marked TODO(nastasia).
 */

import { CLIENTS_HELPED_COUNT } from "./site";

export const home = {
  eyebrow: "Fitness by Nastasia",
  // The italic, red emphasis word is rendered separately in the heading component.
  heroHeadlineLead: "Stronger, healthier, and finally",
  heroHeadlineEmphasis: "fuelled.",
  heroSub:
    "Online and in person coaching for women who are done with under eating, over training, and guessing. Let's build a body that works with you.",
  heroPrimaryCta: "Get my free guide",
  heroSecondaryCta: "Work with me",
  trustLine: `Trusted by ${CLIENTS_HELPED_COUNT}+ women`,

  // Stat / promise bar
  stats: [
    { big: `${CLIENTS_HELPED_COUNT}+`, small: "women coached" },
    { big: "Train smarter,", small: "not more" },
    { big: "Food you can", small: "live with" },
  ],

  isThisYou: {
    eyebrow: "Is this you?",
    headlineLead: "You work",
    headlineEmphasis: "hard.",
    headlineTail: "So why are you stuck?",
    points: [
      "You train hard and still see no real results.",
      "You are scared of carbs and eat too little to grow.",
      "You never take a rest day, and you feel run down.",
      "You have no real plan, just a mix of what you saw online.",
      "You want to feel strong, not just smaller.",
    ],
  },

  method: {
    eyebrow: "The SHIFT method",
    headlineLead: "Four things we get",
    headlineEmphasis: "right.",
    sub: "No gimmicks. Just the pillars that actually move the needle, done consistently.",
  },

  guideTeaser: {
    eyebrow: "Free guide",
    headlineLead: "The 4 mistakes that keep you",
    headlineEmphasis: "stuck.",
    sub: "I made them all. Here is the fix for each, free.",
    cta: "Send me the guide",
  },

  resultsPreview: {
    eyebrow: "Real women, real change",
    headlineLead: "Results that",
    headlineEmphasis: "last.",
    sub: "Strength, energy, and confidence that stick around. Her words, coming soon.",
    cta: "See client results",
  },

  aboutTeaser: {
    eyebrow: "Meet Nastasia",
    headlineLead: "I spent years working hard for the",
    headlineEmphasis: "wrong",
    headlineTail: "things.",
    // TODO(nastasia): review and personalise
    body: "I trained hard for years and stayed stuck, tired, and frustrated. When I finally fixed my training, my food, and my recovery, everything changed. Now I help women skip the years of trial and error and build real strength.",
    cta: "Read my story",
  },

  finalCta: {
    headlineLead: "Ready to stop guessing and start",
    headlineEmphasis: "growing?",
    sub: "Get the free guide, or apply to work with me directly.",
    primary: "Get the free guide",
    secondary: "Apply to work with me",
  },
};

export const about = {
  eyebrow: "Meet Nastasia",
  heroHeadlineLead: "Hard work isn't the same as",
  heroHeadlineEmphasis: "right work.",
  // TODO(nastasia): review and personalise this whole story.
  story: [
    "For years I did everything I thought I was supposed to do. I trained hard, I ate as little as I could, and I pushed through with no rest. I was exhausted, and I was stuck.",
    "Then I changed the way I worked. I started training with a real plan and lifting for strength. I started eating enough to fuel my body instead of fighting it. I started resting properly and letting myself recover.",
    "I got stronger. I felt better. My body finally started to change, not because I did more, but because I did the right things.",
    "Now I coach women so they can skip the years of trial and error I went through. Health first, strength over restriction, and a plan that fits your real life.",
  ],
  philosophy: {
    eyebrow: "What I believe",
    headlineLead: "Health first,",
    headlineEmphasis: "always.",
    points: [
      { title: "Eat enough", text: "Food fuels training and life. Under eating keeps you weak and stuck." },
      { title: "Strength over restriction", text: "We build a strong body, not a smaller, hungrier one." },
      { title: "Recovery matters", text: "Rest is not lazy. It is where progress actually happens." },
      { title: "Sustainable, not extreme", text: "If you cannot keep it up for years, it is not the plan for you." },
    ],
  },
  whoIHelp: {
    eyebrow: "Who I help",
    headlineLead: "Women at",
    headlineEmphasis: "every",
    headlineTail: "level.",
    body: "Total beginners, women returning after a break, and women who have trained for years and feel stuck. I also have experience with special cases and special needs clients, and I coach with care around injuries.",
  },
  credentials: {
    eyebrow: "Credentials",
    headlineLead: "Qualified to coach",
    headlineEmphasis: "you.",
    // TODO(nastasia): add real certifications. Do not invent any.
    note: "TODO(nastasia): list your real certifications and qualifications here.",
    placeholders: ["Certification placeholder", "Certification placeholder", "Certification placeholder"],
  },
};

export const coaching = {
  eyebrow: "Work with me",
  heroHeadlineLead: "Coaching that fits your life, not the other way",
  heroHeadlineEmphasis: "around.",
  heroSub:
    "Personal training and nutrition built around your body, your schedule, and your goals. Health first, results that last.",
  offersEyebrow: "Ways to work together",
  offersHeadlineLead: "Pick the support that fits",
  offersHeadlineEmphasis: "you.",
  pillarsEyebrow: "What we work on together",
  pillarsHeadlineLead: "The full",
  pillarsHeadlineEmphasis: "picture.",
  howEyebrow: "How it works",
  howHeadlineLead: "Simple from day",
  howHeadlineEmphasis: "one.",
  faqEyebrow: "Questions",
  faqHeadlineLead: "Good to",
  faqHeadlineEmphasis: "know.",
  finalHeadlineLead: "Let's build your",
  finalHeadlineEmphasis: "plan.",
  finalSub: "Apply today and we will find the right fit for you.",
};

export const shift = {
  eyebrow: "Free guide",
  headlineLead: "Stop spinning your wheels in the",
  headlineEmphasis: "gym.",
  sub: "The free guide to the 4 mistakes keeping you stuck, and exactly how to fix each one.",
  formButton: "Send me the guide",
  reassurance: "No spam. Unsubscribe anytime.",
  insideEyebrow: "What is inside",
  insideHeadlineLead: "Four fixes you can use",
  insideHeadlineEmphasis: "today.",
  fixes: [
    { num: "01", title: "Your training", text: "Why working harder is not working, and what to do instead." },
    { num: "02", title: "Your program", text: "How to actually progress with progressive overload, not random workouts." },
    { num: "03", title: "Your nutrition", text: "Why eating too little keeps you stuck, and how to fuel real change." },
    { num: "04", title: "Your recovery", text: "How rest makes you stronger, and the rhythm that keeps you going." },
  ],
  forWho:
    "This is for women who are working hard and doing everything right, but still feel stuck. If that is you, this guide is your starting point.",
  stickyBarText: "Get the free guide. The 4 mistakes, fixed.",
  stickyBarCta: "Get it",
};

export const thankYou = {
  headlineLead: "You are all",
  headlineEmphasis: "set.",
  sub: "Thank you. I will personally contact you by email or WhatsApp with your free guide and your tailored next step. Keep an eye on your inbox, and check your spam folder just in case.",
  nextStepEyebrow: "Your next step",
  nextStepHeadlineLead: "Want help putting it into",
  nextStepHeadlineEmphasis: "action?",
  nextStepBody: "The guide shows you what to fix. Coaching is how we fix it together, around your real life.",
  bookCta: "Book a free discovery call",
  followCta: "Follow me on Instagram",
  downloadCta: "Download the guide now",
};

export const results = {
  eyebrow: "Client results",
  headlineLead: "Real women, real",
  headlineEmphasis: "change.",
  sub: "Strength, energy, and confidence that last. These spaces are ready for her clients' real words and wins.",
  finalHeadlineLead: "Your results could be",
  finalHeadlineEmphasis: "next.",
};

export const contact = {
  eyebrow: "Contact",
  headlineLead: "Let's",
  headlineEmphasis: "talk.",
  sub: "Questions about coaching, or ready to apply? Send a message and I will get back to you.",
  formName: "Your name",
  formEmail: "Your email",
  formMessage: "Your message",
  formButton: "Send message",
  successTitle: "Message sent.",
  successBody: "Thank you. I will get back to you as soon as I can.",
  directEyebrow: "Or reach me directly",
};
