# AGENTS.md - Coding Agent Guidelines for KastProductions

## Project Overview

Personal portfolio website built with Next.js 16 App Router, Tailwind CSS v4 and shadcn/ui.
Static site with `output: 'export'` - no server-side features.

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
  layout.tsx           # Root layout (fonts, metadata, globals.css)
  globals.css          # Tailwind v4 theme: design tokens, keyframes
  page.tsx             # Home page (all sections + content data)
  about/page.tsx       # About page (placeholder)
  work/page.tsx        # Work page (placeholder)
  contact/page.tsx     # Contact page
components/
  site-header.tsx      # Sticky header; lazy-loads menu-sheet on interaction (client)
  menu-sheet.tsx       # Mobile nav Sheet, code-split via next/dynamic (client)
  analytics.tsx        # Google Analytics component
  ui/                  # shadcn/ui primitives (button, sheet)
lib/
  utils.ts             # cn() helper (clsx + tailwind-merge)
public/
  logos/               # Client company logos (PNG)
  reviewers/           # Testimonial avatars (JPEG)
```

## Design System (CRITICAL)

Light-only, Vercel-style monochrome. There is NO theme switching and NO
`next-themes`; the `dark` custom variant in `globals.css` is unused.

- **Tokens** are defined in `app/globals.css` under `:root` (hex values) and
  mapped to utilities via `@theme inline`. Semantic names follow shadcn
  conventions (`bg-background`, `text-muted-foreground`, `border-border`,
  `bg-primary`), plus a custom `text-blueprint` accent (link blue `#0072f5`).
- **Palette**: white canvas, near-black `#171717` ink (never pure `#000`),
  `#ebebeb` whisper borders, `#666666` muted text. Blue is reserved for
  interactive/accent moments (logo dot, hero span, hover states) — never
  decorative chrome.
- **Radius**: `--radius: 0.5rem` (≈6px buttons via shadcn scale). Custom grid
  cells stay square; don't add `rounded-*` overrides to them.
- **Weights**: 400 body, 500 UI, 600 headings. Never `font-bold` (700).
  Display headlines use `tracking-tighter`/`tracking-tight` (negative only).
- **Fonts** via `next/font/google` variables:
  - `font-sans` = `font-display` = Geist (single face; display sizes are
    differentiated by weight and negative tracking)
  - `font-mono` = Geist Mono (annotations, nav, labels - uppercase + tracked)
- **Signature elements**: hairline borders (`border-border`), mono eyebrow
  labels (`01 — CAPABILITIES`), full-bleed section rules with a framed
  `max-w-7xl` container (`border-x`), dark `#171717` contact band.
- **Motion**: CSS-only. `motion-safe:animate-rise` for load-in,
  `motion-safe:animate-reveal` for scroll-driven reveals (progressive
  enhancement via `animation-timeline: view()`). Never animate without the
  `motion-safe:` guard.

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

- Compose from `components/ui/` before writing custom markup; add missing
  components via the CLI, do not hand-write them.
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`) - never
  raw palette values like `bg-purple-500`.
- `className` is for layout; use built-in variants (`variant="outline"`)
  for styling.
- Use `cn()` for conditional classes.
- Spacing: `flex` + `gap-*`, never `space-x-*`/`space-y-*`.
- Equal dimensions: `size-*`, not `w-* h-*`.
- Links styled as buttons: `<Button asChild><a …/></Button>`.
- Hairline grids: `grid gap-px border bg-border` with `bg-background` cells.

### Component Patterns

- Server components by default; `"use client"` only where state/events are
  needed (currently `site-header.tsx`, `menu-sheet.tsx` and `analytics.tsx`).
- Colocate section components and content data in `app/page.tsx` until a
  second consumer exists.
- Load interaction-only UI on demand: the mobile menu Sheet is imported via
  `next/dynamic` and preloaded on trigger hover/focus, so radix Dialog code
  never ships in the initial bundle (Vercel `bundle-conditional` rule).

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
- `next/image` optimization (config sets `unoptimized: true`)

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
