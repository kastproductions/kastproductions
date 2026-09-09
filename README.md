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
  page.tsx             # Home page (hero, clients, method, runs, reviewer, pricing, questions, contact); canonical URL
  content.ts           # Brand constants, search snippet copy, client list, founder references, page copy
  globals.css          # Design tokens and component styles
  opengraph-image.tsx  # Open Graph image, rendered at build time
  manifest.ts          # Web app manifest
  robots.ts            # robots.txt
  sitemap.ts           # sitemap.xml
  icon.svg             # Favicon
src/components/
  run-record.tsx       # The example run in the hero
  analytics.tsx        # Google Analytics (NEXT_PUBLIC_GA_ID)
public/
  reviewers/           # Portraits for the reviewer section
vercel.json            # Redirects from retired URLs; content type for the Open Graph image
```

## Content

Brand name, domain, email, location, the client list and the references live in `src/app/content.ts`. The run table and the proof line in that file are marked as placeholders; replace them with real figures before launch.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`). Deploy `./out` to any static host.

The site runs on Vercel, and `vercel.json` carries two settings the static export cannot express on its own:

- Permanent redirects from the retired `/about`, `/work`, `/contact` and `/og.png` URLs to the matching sections of the home page.
- A `Content-Type: image/png` header for `/opengraph-image`. Next.js writes that file without an extension, and a static host would otherwise serve it as a download.

On another host, port both settings to that host's configuration.

The Open Graph image fetches Bricolage Grotesque from Google Fonts during `bun run build`, so the build machine needs network access.

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)
