# Kast Productions

Portfolio website for KastProductions — a design and frontend web development consultancy based in Lithuania.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export, Turbopack)
- **UI**: shadcn/ui (Radix primitives) + Tailwind CSS v4
- **Fonts**: Bricolage Grotesque (display), Instrument Sans (body), IBM Plex Mono (annotations)
- **Icons**: lucide-react
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
app/
  layout.tsx       # Root layout: fonts, metadata, globals.css
  globals.css      # Tailwind v4 theme tokens (dark-only drafting palette)
  page.tsx         # Home page (hero, capabilities, services, clients, testimonials, contact)
  about/page.tsx   # About page (placeholder)
  work/page.tsx    # Work page (placeholder)
  contact/page.tsx # Contact page
components/
  site-header.tsx  # Sticky header + nav
  menu-sheet.tsx   # Mobile menu (lazy-loaded on first use)
  analytics.tsx    # Google Analytics (NEXT_PUBLIC_GA_ID)
  ui/              # shadcn/ui components (button, sheet)
lib/
  utils.ts         # cn() class merge helper
public/
  logos/           # Client company logos
  reviewers/       # Testimonial avatars
```

## Design System

Dark-only "working drawing" theme — the site presents itself as the studio's technical sheet: hairline rules, registration crosshairs, mono annotations, zero border radius. Tokens live in `app/globals.css` (`--background`, `--primary`, `--iris`, etc.) and map to Tailwind utilities via `@theme inline`. Add shadcn components with:

```bash
bunx --bun shadcn@latest add <component>
```

## Deployment

Static site configured with `output: 'export'` in `next.config.ts`. Deploy `./out` to any static host (Vercel, Netlify, GitHub Pages, etc.).

```bash
bun run build
# Static files output to ./out
```

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)
