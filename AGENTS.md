# AGENTS.md - Coding Agent Guidelines for KastProductions

## Project Overview

Marketing site for KastProductions, an AI-native product studio in Vilnius.
Next.js 16 App Router, Tailwind CSS v4, shadcn/ui primitives. Static site with
`output: 'export'` - no server-side features. The single conversion is one email
to `hello@kastproductions.com`.

Read `PRODUCT.md` for product truth and `DESIGN.md` for the visual system before
changing anything visible.

## Tech Stack

- **Runtime**: Bun (NOT npm/yarn)
- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui (Radix primitives, components vendored in `components/ui/`)
- **Styling**: Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`)
- **Icons**: lucide-react
- **Language**: TypeScript (strict mode)

## Commands

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Production build (static export to ./out)
bun run build

# Lint (eslint flat config; `next lint` was removed in Next 16)
bun run lint

# Add a shadcn component
bunx --bun shadcn@latest add <component>
```

**IMPORTANT**: Always use `bun`, never `npm` or `yarn`.

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx           # Root layout: faces, metadata, emitted direction contract
  globals.css          # Tailwind v4 theme: the desk's tokens and utilities
  page.tsx             # The desk (all six sections + content data)
  about/page.tsx       # A blanking plate: story not written yet
  work/page.tsx        # An empty bay: no case studies yet
  contact/page.tsx     # The output stage
components/
  site-header.tsx      # The meter bridge; lazy-loads menu-sheet (client)
  channel-legends.tsx  # The bridge nav; owns the scroll-driven lamp (client)
  menu-sheet.tsx       # Mobile nav Sheet, code-split via next/dynamic (client)
  analytics.tsx        # Google Analytics component
  desk/
    level-engine.tsx   # The one motion system: VU ballistics (client)
    vu-meter.tsx       # A VU movement, drawn as static SVG
    hardware.tsx       # Rail, PanelLink, Screw, RackEar, Knob, Jack, Fader,
                       #   Tape, PeakLadder
    record-button.tsx  # The commit control (the only red)
    site-footer.tsx    # The chassis bottom plate
  ui/                  # shadcn/ui primitives (button, sheet)
lib/
  nav.ts               # Bridge legends (as ids) + the email constants
  utils.ts             # cn() helper (clsx + tailwind-merge)
public/
  logos/               # Client logos. UNUSED — see the note in app/page.tsx
  reviewers/           # Referee portraits (JPEG), used in References
  og.png               # Social card, rendered from the desk's own components
```

## Design System (CRITICAL)

**The desk.** A mastering room at night: overheads off, the room lit by the
meter bridge and one desk lamp. Read `DESIGN.md` for the full record; this is the
short version. There is NO theme switching and no light mode.

- **Tokens** live in `app/globals.css` under `:root` and map to utilities via
  `@theme inline`. Two layers: the desk's own names (`bg-panel`, `text-silk`,
  `bg-face`, `text-ink`, `bg-signal`) and shadcn semantics
  (`bg-background`, `text-muted-foreground`) mapped onto them so vendored
  components inherit the chassis for free.
- **Palette**: warm anodised graphite chassis (`--desk #151413`,
  `--panel #232120`, `--panel-raised #2c2a27`), silkscreen ink
  (`--silk #d6d1c7`, `--silk-dim #9b958a`), ivory paper for meter faces and
  label tape (`--face #efe9dc`, `--ink #16150f`), walnut end cheeks
  (`--wood #6d4526`), brass screws (`--brass`).
- **Colour is hardware, never mood.** Exactly three functional roles:
  `signal` (amber) means signal present or active, `cue` (green) means routed or
  available, `over` (red) is reserved for the arc past 0 dB and for the one
  committing action. If you reach for red anywhere else, you are wrong.
- **Paper fields**: put `data-field="paper"` on a region to flip the raw
  variables to the ivory surface. Do not override utilities per callsite.
- **Elevation is declared once**: a machined bevel. Use `panel`,
  `panel-raised`, or `panel-recessed`. Never a border plus a shadow.
- **Radius** is small (`--radius: 4px`); these are machined panels, not cards.
- **Fonts** via `next/font/google`:
  - `font-display` = Anybody (variable, has a `wdth` axis). Silkscreen legends
    and monumental badging. Compress with `font-variation-settings: "wdth" N`,
    never with a transform.
  - `font-sans` = Archivo. All body copy.
  - There is no `font-mono`. Monospace as a costume for "technical" is banned;
    use `data-numerals="tabular"` for real measurements.
- **Type utilities**: `legend` (12px) and `legend-sm` (11px) for panel legends,
  `badge-type` for display, `engraved` for the cut-in lip, `tape` for label tape.
  Never go below 11px.
- **No eyebrows or kickers.** Section identity lives in the hardware (rails,
  plate legends, bay headers), never as a tracked label above a heading.
- **Motion is one system.** `components/desk/level-engine.tsx` publishes
  `--vu-l`, `--vu-r` and `--vu-drive` from real visitor activity under true VU
  ballistics. Needles, lamps and the peak ladder read those. Do not add
  independent animations; extend the engine or use nothing. The engine never
  starts under `prefers-reduced-motion`.
- **A `--vu-*` reader must carry `data-vu`.** The engine writes each number
  onto the elements that read it, found by `data-vu="l" | "r" | "drive"`, and
  never onto `:root`. A custom property set on the root invalidates computed
  style for every element in the document on every frame: measured on the home
  page, 973ms of style recalculation per 3s of movement from the root against
  72ms writing to the 16 readers. Add a consumer without `data-vu` and it will
  sit at its `@property` initial value and never move.
- **`--bridge`** is the fixed header's height. Pages clear it with `desk-frame`;
  anchors clear it with `under-bridge`. Never hardcode the number.

## Code Style Guidelines

### Imports

Order imports as follows:

1. React/Next.js imports
2. Third-party libraries (lucide-react, etc.)
3. Local components/utils with `@/` alias

```tsx
// Good
import { useState } from "react";
import NextLink from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### TypeScript

- **Strict mode enabled** - no implicit any
- Prefer `interface` for object shapes, `type` for unions/primitives
- Use `React.ReactNode` for children props

### shadcn/ui + Tailwind Conventions

- The chassis comes first. Build from `components/desk/` before reaching for
  `components/ui/`; a stock shadcn control dropped into a committed form is a
  lapse. `components/ui/` still holds `sheet` (the mobile nav) and `avatar`.
- Use tokens, never raw palette values. Both layers are legal: the desk's names
  (`bg-panel`, `text-silk`) and the shadcn semantics mapped onto them.
- Use `cn()` for conditional classes.
- Spacing: `flex` + `gap-*`, never `space-x-*`/`space-y-*`.
- Equal dimensions: `size-*`, not `w-* h-*`.
- Panels: `panel` / `panel-raised` / `panel-recessed`, never a hand-rolled
  border-plus-shadow pair.
- Long-form legends and monumental type set `fontVariationSettings` inline,
  because the width axis is the point and Tailwind has no utility for it.

### Component Patterns

- Server components by default; `"use client"` only where state or events are
  needed (currently `level-engine.tsx`, `site-header.tsx`, `channel-legends.tsx`,
  `menu-sheet.tsx` and `analytics.tsx`). Nothing in `components/desk/` except the
  engine declares `"use client"`, but a module a client component imports joins
  the client graph anyway: `Screw`, `PeakLadder` and `RecordButton` reach the
  browser through `site-header.tsx` and cost ~2.3KB. `Rail`, `PanelLink`,
  `RackEar`, `Knob`, `Jack`, `Fader` and `Tape` are server-only and ship as
  markup. Import a desk part into a client component and you ship it.
- Keep scroll-driven state in the smallest component that reads it. The active
  section lamp lives in `channel-legends.tsx`, not in `site-header.tsx`, so
  scrolling re-renders 15 elements instead of the whole bridge's 78.
- Colocate section components and content data in `app/page.tsx` until a
  second consumer exists.
- Load interaction-only UI on demand: the mobile menu Sheet is imported via
  `next/dynamic` and preloaded on trigger hover/focus, so radix Dialog code
  never ships in the initial bundle (Vercel `bundle-conditional` rule).
- Never fabricate proof. Client count, references, metrics and availability come
  from `PRODUCT.md`. There are 17 clients and 6 references; if you change a
  count in one place, change it everywhere.

### Responsive Design

Use Tailwind responsive prefixes, mobile-first:

```tsx
<div className="px-5 py-20 sm:px-8 md:px-12 md:py-28" />
<h2 className="text-3xl md:text-5xl" />
```

### Naming Conventions

- **Components**: PascalCase (`SiteHeader`, `Eyebrow`)
- **Files**: kebab-case (`site-header.tsx`)
- **Functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (`EMAIL_HREF`, `NAV_ITEMS`)

### Error Handling

- Use early returns for guard clauses
- Handle null/undefined explicitly with optional chaining (`?.`)

### Path Aliases

Use `@/` alias for imports from project root:

```tsx
import { Button } from "@/components/ui/button";
```

## Static Export Constraints

This is a static site (`output: 'export'`). **DO NOT use**:

- API routes (`app/api/`)
- Server Actions
- Dynamic routes without `generateStaticParams`
- `next/image`. `output: 'export'` forces `images.unoptimized`, so `next/image`
  emits the same bare `<img>` a hand-written one does, with no `srcset`, and
  charges ~14KB of client runtime on every route that imports it. Use a plain
  `<img>` with `width`, `height`, `loading="lazy"` and `decoding="async"`. The
  `@next/next/no-img-element` lint rule is off for this reason.

## Version Pins (do not "fix" these)

- `typescript` is pinned to `^5` - Next.js 16 does not support TypeScript 7
  (native tsgo compiler) for build-time typechecking.
- `eslint` is pinned to `^9` - `eslint-config-next`'s bundled
  typescript-eslint does not yet support ESLint 10.

## Git Workflow

- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- Always run `bun run build` before committing to verify static export works
- Keep commits atomic and focused

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

Only `NEXT_PUBLIC_` prefixed variables are available in the browser.
