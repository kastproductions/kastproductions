# Kast Productions

Personal portfolio website built with Next.js 16 App Router and Chakra UI v3.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **UI**: Chakra UI v3
- **Styling**: Emotion
- **3D**: React Three Fiber + Drei
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Runtime**: Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  layout.tsx      # Root layout with fonts and providers
  page.tsx        # Home page
  about/page.tsx  # About page
  work/page.tsx   # Work/Portfolio page
  contact/page.tsx # Contact page
components/
  ui/provider.tsx # Chakra UI provider setup
  analytics.tsx   # Google Analytics
public/
  logos/          # Client company logos
```

## Deployment

This is a static site configured with `output: 'export'` in `next.config.ts`. Deploy to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

```bash
bun run build
# Static files output to ./out
```
