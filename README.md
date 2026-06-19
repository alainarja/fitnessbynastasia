# Fitness by Nastasia

Marketing website for Nastasia, an online and in person fitness coach for women.
The site is built to turn visitors into leads (free guide opt ins) and leads into
booked discovery calls and coaching clients.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or the port shown in the terminal).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> Note: the site runs with NO environment variables. Forms will succeed and log a
> warning instead of syncing to an email tool, so you can develop freely. Add keys
> (below) to switch real integrations on.

---

## Project structure

```
app/                     App Router pages and routes
  page.tsx               Home
  about/                 About Nastasia
  coaching/              Work with me (offers)
  shift/                 The free guide landing page (main lead magnet)
  shift/thank-you/       Opt in confirmation + next step
  results/               Client results and testimonials
  contact/               Contact
  privacy/ terms/        Legal pages
  api/subscribe/         Lead form route handler (email opt in)
  api/contact/           Contact form route handler
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg   SEO / metadata
  layout.tsx globals.css Root layout + brand design system

components/               Reusable UI (Header, Footer, Button, LeadForm, cards, ...)
content/
  site.ts                EDITABLE facts, links, offers, pillars, FAQ, image slots
  copy.ts                EDITABLE long form approved copy
lib/
  leads.ts               Email provider + transactional delivery (swappable)
  validation.ts          Form validation helpers
  rate-limit.ts          Simple per IP rate limiting
public/
  images/gallery/        Photos (shown grayscale to match her grid)
  guides/shift-guide.pdf  The free guide PDF (PLACEHOLDER, replace it)
```

---

## Editing content (no code needed)

Almost everything Nastasia needs to change lives in two files:

- `content/site.ts`
  - `CLIENTS_HELPED_COUNT` the "250+ women" number, edited in ONE place.
  - `site` brand name, email, WhatsApp number, social links, booking URL, guide path.
  - `offers` coaching offers (names, inclusions, prices, enable/disable each).
  - `pillars`, `howItWorks`, `faqs`, `mainNav`.
  - `images` the central image registry (see "Replacing images" below).
- `content/copy.ts` headlines and long form copy for each page.

House style: do not use dash characters as sentence punctuation in visible copy.
Use full stops, commas, colons, or parentheses.

---

## Replacing images

All photography is shown in black and white automatically (a grayscale CSS filter),
so you can drop in colour photos.

1. Put your photo files in `public/images/gallery/` (or anywhere under `public/`).
2. In `content/site.ts`, set the `src` for the slot you want in the `images` map,
   for example:
   ```ts
   heroPortrait: {
     src: "/images/gallery/your-photo.jpg",
     alt: "Describe the photo for accessibility",
     label: "HERO PORTRAIT: strong full body or training shot, vertical",
   },
   ```
3. Any slot with an empty `src` shows a labelled placeholder box that tells you
   exactly what photo belongs there, so nothing is ever broken.

Suggested slots: `heroPortrait`, `aboutHero`, `aboutPortrait`, `coachingHero`,
`shiftSupporting`, plus the optional 4 photo `journey` strip.

---

## Replacing the free guide PDF

Replace `public/guides/shift-guide.pdf` with the real guide. Keep the same file name,
or update `site.guidePdfPath` in `content/site.ts` if you rename it. The guide is
linked from the delivery email and the `/shift/thank-you` page.

---

## Integrations and environment variables

Copy `.env.example` to `.env.local` and fill in what you have. Every integration is
optional. See `.env.example` for the full annotated list. Summary:

| Variable | Purpose |
| --- | --- |
| `EMAIL_PROVIDER` | `mailerlite` or `kit` (ConvertKit). Leave empty to disable sync. |
| `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID` | MailerLite subscriber sync. |
| `KIT_API_KEY`, `KIT_TAG_ID` | Kit (ConvertKit) subscriber sync. |
| `RESEND_API_KEY`, `GUIDE_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Optional Resend email (instant guide delivery + contact messages). |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics (privacy friendly). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel for Instagram ad retargeting. |

Opt ins are tagged by source (for example `shift-hero`, `home-teaser`, `footer`) so
you can build automations per entry point.

**Booking:** paste a Cal.com or Calendly link into `site.bookingUrl` in
`content/site.ts`. If empty, booking buttons fall back to `/contact`.

**WhatsApp:** set `site.contact.whatsappNumber` (digits only, international format,
no plus, for example `96170123456`).

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New Project" and import the repo. Framework preset: Next.js.
   Build command and output are detected automatically.
3. Add your environment variables in Vercel (Project Settings, Environment Variables),
   the same ones from `.env.example` that you want live.
4. Deploy.

### Connect the domain fitnessbynastasia.com

1. In Vercel, open the project, Settings, Domains, and add `fitnessbynastasia.com`
   (and `www.fitnessbynastasia.com`).
2. At your domain registrar, point DNS to Vercel as instructed (an `A` record for
   the apex domain and/or a `CNAME` for `www`). Vercel shows the exact values.
3. Once verified, set the apex as primary and redirect `www` to it (or vice versa).

After the domain is live, `site.baseUrl` in `content/site.ts` is already set to
`https://fitnessbynastasia.com`, which drives canonical URLs, the sitemap, and OG tags.

---

## What is left to finish

See `CONTENT-TODO.md` for the single checklist of everything Nastasia needs to provide
(real photos, testimonials, certifications, prices, the guide PDF, Arabic copy, and the
booking and WhatsApp links).
