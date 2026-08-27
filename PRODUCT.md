# Product

<!-- impeccable:product-schema 1 -->

> Provenance: written from repository evidence only. The user waived the init
> interview ("do not ask me any questions"). Facts taken from code, copy, and
> metadata are unmarked. Facts I reasoned to are marked `[INFERRED]` and are
> open to correction.

## Platform

web

## Users

Founders, product leads, and engineering managers who need a product surface
built and shipped, and who are evaluating whether one small senior team can do
it faster than their own hiring cycle. `[INFERRED]` They arrive from a referral,
a LinkedIn profile, or a marketplace listing (Toptal is a listed client), so they
already half-trust the name and are here to confirm competence and taste in one
sitting, then send one email.

Secondary: recruiters and agency partners checking whether the studio is real
before they route a contract. `[INFERRED]`

## Product Purpose

KastProductions is an AI-native product studio in Vilnius, Lithuania. It designs,
builds, and ships websites, APIs, and AI features. It uses AI across design,
engineering, and testing to move faster without losing quality. Success on the
site is one qualified email to `hello@kastproductions.com`. `[INFERRED: the site
has no other conversion path — every CTA is a mailto.]`

## Positioning

"The judgment of a senior team, at the speed of AI." The studio's claim is not
that it uses AI (everyone does) but that senior people review everything AI
produces, so speed does not become slop. The site's own words: teams "that want
to move fast without shipping AI slop."

The credible, uncopyable asset is the client list: 17 named companies across
three continents, including Trustpilot, Volkswagen Financial Services, An Post,
Irish Life, Rocket Software, and Toptal, plus six real named testimonials with
attributions and photographs.

## Operating Context

- Sole studio contact is email. No form, no booking link, no phone.
- One person is publicly named: Karolis Stulgys (author, creator in site
  metadata). Copy uses "we". `[INFERRED: a small studio or a solo principal with
  collaborators. Copy must not claim a headcount.]`
- Visitors evaluate on a laptop during a working day, often with several agency
  tabs open. `[INFERRED]`
- The site is the portfolio. There are no case studies yet.

## Capabilities and Constraints

Services offered (site copy, verbatim in intent):

- AI integration — LLM features, RAG, agents, with evals and guardrails
- Full-stack proof of concept — idea to working prototype in weeks
- UI/UX design — flows, wireframes, interfaces
- Website development — Next.js marketing sites and web apps
- API development — typed REST and GraphQL
- Mobile development — React Native
- End-to-end testing — Playwright

Technical constraints (hard):

- Next.js 16 App Router, `output: "export"` static export. No API routes, no
  server actions, no dynamic routes without `generateStaticParams`, no
  `next/image` optimization (`unoptimized: true`).
- Bun as runtime and package manager. Never npm or yarn.
- Tailwind CSS v4 CSS-first config. No `tailwind.config.ts`.
- shadcn/ui primitives vendored in `components/ui/`.
- TypeScript strict. `typescript` pinned to `^5`, `eslint` pinned to `^9`.
- Routes: `/`, `/about`, `/work`, `/contact`. `/about` and `/work` are
  placeholders today.
- Optional `NEXT_PUBLIC_GA_ID`.

## Brand Commitments

- Name: KastProductions (wordmark sometimes set "Kast Productions").
- Domain: `www.kastproductions.com`. Email: `hello@kastproductions.com`.
- Location line: Vilnius, LT — 54.69° N, 25.28° E.
- Voice in existing copy: plain, short, confident, unpadded, faintly dry
  ("without shipping AI slop", "unedited and unfiltered"). Keep it.
- No visual commitments were given. The incumbent look (near-white ground,
  Klein-blue accent, Swiss grid) is evidence, not authority: the user asked for
  a redesign.

## Evidence on Hand

Real, usable:

- 17 client logos in `public/logos/` with company URLs, all named in
  `app/page.tsx`.
- 6 testimonials with real names, roles, employers, and portraits in
  `public/reviewers/`. Marked in the site as unedited.
- `public/og.png`, `public/favicon.ico`, `public/scene.glb` (unused).

Absent — must not be fabricated:

- Case studies, project screenshots, or named deliverables per client.
- Metrics of any kind: revenue, uptime, team size, delivery counts, NPS.
- Pricing, engagement models, contract lengths, availability windows beyond the
  existing "available for new work" line.
- Awards, press, certifications.

## Product Principles

1. **The client list is the argument.** Names and real quotes outrank any
   adjective the studio could write about itself.
2. **Speed is only interesting next to quality.** Never sell velocity alone; the
   pairing is the position.
3. **One action.** Every surface leads to one email. Do not invent funnels.
4. **Say less, exactly.** Short sentences, no filler, no hype vocabulary. Copy
   that sounds like a template contradicts the offer.
5. **Do not fabricate proof.** Placeholders stay visibly placeholders until the
   studio supplies real material.

## Accessibility & Inclusion

No client-specific standard was established. Treat WCAG 2.2 AA as the floor:
4.5:1 body contrast, visible keyboard focus, `prefers-reduced-motion` honored,
full keyboard operation of navigation and controls. `[INFERRED from the existing
code, which already guards every animation behind `motion-safe:`.]`
