# Content checklist for Nastasia

One list of everything to finish so the site is fully yours. Nothing here blocks the
site from running. The build works today with sensible placeholders. Tackle these in
roughly this order. File paths tell you exactly where each item lives.

Reminder on house style: do not use dash characters as sentence punctuation in copy.
Use full stops, commas, colons, or parentheses.

---

## 1. Must do before launch

- [ ] **WhatsApp number** set `site.contact.whatsappNumber` (digits only, e.g. `96170123456`).
      `content/site.ts`
- [ ] **Public email** confirm `site.contact.email`. `content/site.ts`
- [ ] **Booking link** paste your Cal.com or Calendly URL into `site.bookingUrl`.
      Until then, "Book a call" buttons go to the contact page. `content/site.ts`
- [ ] **The guide PDF** replace `public/guides/shift-guide.pdf` with the real guide
      (keep the file name). `public/guides/`
- [ ] **Email tool** create a MailerLite or Kit account, then set `EMAIL_PROVIDER` and
      the matching API key in Vercel so opt ins are captured. `.env.example`
- [ ] **Legal review** have a professional review the Privacy Policy and Terms.
      `app/privacy/page.tsx`, `app/terms/page.tsx`

## 2. Photos (all shown black and white automatically)

- [ ] Confirm or swap the chosen photos for each slot in the `images` map. `content/site.ts`
  - `heroPortrait` strong full body / training shot, vertical (home hero)
  - `aboutHero`, `aboutPortrait` for the About page
  - `coachingHero` confident training shot
  - `shiftSupporting` energetic, personable shot for the free guide page
- [ ] Optional 4 photo `journey` strip (progression over time) on the About page.
      `content/site.ts` (`journey`), shown in `app/about/page.tsx`

## 3. Testimonials and results (do not invent any)

- [ ] Add real client testimonials (with consent): quote, name, optional photo.
      Replace the placeholder `TestimonialCard` instances on:
  - Home results preview, `app/page.tsx`
  - Free guide page, `app/shift/page.tsx`
  - Results page (6 placeholders + 3 "client win" placeholders), `app/results/page.tsx`
  - The card component itself: `components/TestimonialCard.tsx`

## 4. Credentials

- [ ] List your real certifications and qualifications. Replace the placeholders and the
      note in `about.credentials`. `content/copy.ts`, shown in `app/about/page.tsx`

## 5. Offers, packages and pricing

- [ ] Review the 3 packages (The SHIFT room, 1:1 Online Coaching, In person training):
      names, "best for" lines, and inclusions. `offers` in `content/site.ts`
- [ ] Set prices, or leave `price` empty to keep an apply / enquiry model.
- [ ] All 3 packages are visible by default. Set `enabled: false` on any you do not
      want shown (for example in person training if you pause it). `content/site.ts`

## 5b. Conversion tools (already built, just configure)

- [ ] The `/shift` page is now an interactive quiz that captures each lead's answers
      and segments them. To collect those profiles for follow up and upsell, set
      `LEAD_WEBHOOK_URL` (Zapier / Make / your CRM). Without it, profiles go to the
      server logs. `.env.example`. Quiz questions live in `content/quiz.ts`.
- [ ] The coaching page has a BMI tool that ends in a "Build my plan" call to action.
      No setup needed. Edit wording in `components/BmiCalculator.tsx` if you wish.

## 6. Copy to review and personalise (written in your voice, please make it yours)

- [ ] About teaser on the home page. `content/copy.ts` (`home.aboutTeaser`)
- [ ] Your full story on the About page. `content/copy.ts` (`about.story`)
- [ ] Any other copy you want to adjust across `content/copy.ts`.

## 7. Social and analytics

- [ ] Add your TikTok URL if you want it shown. `site.social.tiktok`, `content/site.ts`
- [ ] Confirm the Instagram link is correct. `site.social.instagram`
- [ ] Optional: set up analytics (Plausible or GA4) and the Meta Pixel for ads.
      Add the env vars in Vercel. `.env.example`

## 8. Phase 2 (later)

- [ ] Blog (MDX) seeded with 2 or 3 articles (the 4 mistakes, carb fear, why rest matters).
- [ ] Arabic (RTL) locale. The site keeps visible strings in `content/` so a second
      language can be added cleanly. Arabic copy should be your own words, not machine
      translated.

---

### Where to find each TODO in code

Search the project for `TODO(nastasia)` to jump straight to every spot that needs your
input. They are intentionally left as comments next to the relevant code.
