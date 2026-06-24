# Khijani Africa — Marketing Site

The public landing site for **Khijani**, an ed-tech platform that builds measurable
critical-thinking skills in African classrooms through live "conundrums" scored by
the Khijani Index. This is the front door — an editorial, magazine-styled site that
introduces the method, the briefs, and the school plans, and houses the platform's
legal pages.

> Part of the Khijani platform · Hult Prize 2026 entry

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

---

## 🎥 Demo

> 🎥 Demo video coming soon · 🌍 Live site: _[add deployment URL]_

---

## Technologies Used

- **Next.js 14** (App Router) — static-first marketing pages
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3.4** — design tokens driven by CSS custom properties
- **Framer Motion** — scroll-triggered editorial motion
- **lucide-react** — iconography
- **react-markdown** + **remark-gfm** — renders the canonical legal documents
- **next/font** — Fraunces (display), Newsreader (body), JetBrains Mono (meta)

No backend: the marketing site is intentionally Supabase-free and ships as static
content.

## Features

- **Presents the method** — a guided walkthrough of Khijani's four-phase conundrum
  flow and the Khijani Index.
- **Showcases the briefs** — sample conundrums that demonstrate the product without a
  login.
- **Drives school enquiries** — Pilot and Custom (school-wide) plans that route
  straight to WhatsApp, matching the offline sales motion.
- **Renders the legal centre** — `/privacy`, `/terms`, and `/cookies` are generated
  at build time from the platform's single source of truth in the repo-root
  `documents/` folder, styled to match the brand.
- **Respects the reader** — semantic HTML, accessible navigation, and full
  `prefers-reduced-motion` support.
- **Holds a distinct visual identity** — an editorial system anchored by a restrained
  kente-derived tricolor rule, paper/ink palette, and serif display type.

## How It Was Built

The site was built App-Router-first, with each section of the homepage composed as a
self-contained component (`Hero`, `HowItWorks`, `Conundrums`, `Testimonials`,
`JourneyGallery`, `PricingBento`, `FAQ`, `CtaBanner`, `Footer`) and assembled in a
single `page.tsx`. The goal was an intentional, anti-template editorial look rather
than a generic SaaS landing page, so the design leans on a small set of brand
primitives defined as CSS custom properties in `globals.css` — the green/gold/
terracotta palette, the `kente-rule` divider, the `folio` mono meta-label, and a
hairline border system — surfaced to Tailwind through the theme config.

Motion is handled with Framer Motion, kept to compositor-friendly transforms and
opacity and gated behind a global reduced-motion rule so the experience degrades
gracefully. Typography pairs Fraunces for display with Newsreader for body to give
the pages a printed, magazine feel.

The most architecturally interesting part is the **legal centre**. Rather than
duplicating policy text into JSX, the legal documents live once in the repo-root
`documents/` folder and are read at build time (`src/lib/legal.ts`) and rendered by a
shared `LegalPage` component that maps Markdown onto the site's own type system via
`react-markdown` + `remark-gfm`. The pages are fully static, so the policy content is
baked into the build and the source of truth stays with the legal documents.

## What I Learned

- **Design tokens beat ad-hoc styling.** Defining the palette, rules, and type as CSS
  variables first made every component consistent and the editorial identity easy to
  hold across sections.
- **Single source of truth pays off across a monorepo.** Reading legal Markdown at
  build time instead of copying it into the app removed an entire class of drift
  between the published pages and the canonical documents.
- **Reduced-motion is a first-class concern.** Designing the animations so they fully
  collapse under `prefers-reduced-motion` was easier as a constraint up front than as
  a retrofit.
- **Static-first is the right default for marketing.** Keeping the site backend-free
  kept it fast and trivial to deploy.

## Possible Improvements

- Add a recorded demo video and wire the live deployment URL into the hero and this
  README.
- Internationalise copy for multiple African markets.
- Add lightweight, privacy-respecting analytics behind a consent control (and finish
  the Cookie Policy's pending implementation notes).
- Replace the remaining placeholder homepage anchors in the footer (Blog, Careers,
  Changelog) with real pages as content lands.
- Add visual-regression and accessibility checks to CI for key breakpoints.

## How to Run the Project

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm / bun)

### Setup

1. Clone the repository and enter the marketing app:

   ```bash
   git clone <repo-url>
   cd khijani/khijani-marketing
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

> **Legal docs:** the legal pages (`/privacy`, `/terms`, `/cookies`) render Markdown
> committed inside the app at `src/content/legal/`, so the build is self-contained
> and deploys cleanly even when the project root is set to `khijani-marketing`.
> These are the **public, curated** versions of the policies, intentionally lighter
> than the full internal set in the repo-root `documents/` folder — so they are
> maintained by hand here and are **not** auto-synced from `documents/`. Edit them
> directly and commit.

No environment variables are required — this site has no backend.

---

_Khijani Africa · Critical thinking for the modern African classroom._
