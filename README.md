# KastProductions

Website for KastProductions, a software development agency in Vilnius, Lithuania. Coding agents work the backlog, a named engineer reviews every change, and the client gets the run record of each feature.

Live at [www.kastproductions.com](https://www.kastproductions.com).

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: hand-written CSS in `src/app/globals.css`, no framework
- **Fonts**: Bricolage Grotesque (text), IBM Plex Mono (run record)
- **Language**: TypeScript (strict)
- **Runtime**: Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production (static export to ./out)
bun run build

# Lint
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/app/
  layout.tsx           # Root layout: fonts, site-wide metadata, JSON-LD, analytics
  page.tsx             # Home page (hero, clients, method, runs, standing agents, reviewer, pricing, questions, contact); canonical URL
  standing-agents/
    page.tsx           # The standing agents line: fit, channels, mechanism, the four tiers, questions
  content.ts           # Brand constants, search snippet copy, client list, founder references, page copy for both lines
  globals.css          # Design tokens and component styles
  opengraph-image.tsx  # Open Graph image, rendered at build time
  manifest.ts          # Web app manifest
  robots.ts            # robots.txt
  sitemap.ts           # sitemap.xml
  icon.svg             # Favicon
src/components/
  site-chrome.tsx      # Header, footer and brand mark, shared by both pages
  run-record.tsx       # The example run in the hero
  mention-card.tsx     # The example mention in the standing agents hero
  analytics.tsx        # Google Analytics (NEXT_PUBLIC_GA_ID)
public/
  reviewers/           # Portraits for the reviewer section
vercel.json            # Redirects from retired URLs; content type for the Open Graph image
```

## Content

Brand name, domain, email, location, the client list, the references and the copy for both service lines live in `src/app/content.ts`. Three things in that file still need real figures before launch: the run table, the proof line, and the six tier prices in `tiers` (each currently reads "On request"). The vocabulary both lines use is fixed in `CONTEXT.md`, and the decisions behind the second line are in `docs/adr/`.

## Claims

Every claim on the page is either verifiable or labelled as an example.

Real, and may be stated as fact: the 17 client companies, the 6 references with portraits, and the prices. All of them live in `src/app/content.ts`.

Synthetic, and labelled as an example wherever a visitor could read it as fact: the proof line, the recent runs table, and the hero run record in `src/components/run-record.tsx`. The standing agents line has no case study, metric, press mention or client yet. Do not invent one.

Other people's names belong to them. Describe Vercel's `eve` framework and its templates accurately, by name, with a link, which is the descriptive use Apache-2.0 §6 permits. Never adopt a name from those repositories as a KastProductions product name, and never imply endorsement or partnership.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`). Deploy `./out` to any static host.

The site runs on Vercel, and `vercel.json` carries two settings the static export cannot express on its own:

- Permanent redirects from the retired `/about`, `/work`, `/contact` and `/og.png` URLs to the matching sections of the home page.
- A `Content-Type: image/png` header for `/opengraph-image`. Next.js writes that file without an extension, and a static host would otherwise serve it as a download.

On another host, port both settings to that host's configuration.

The Open Graph image fetches Bricolage Grotesque from Google Fonts during `bun run build`, so the build machine needs network access.

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)
