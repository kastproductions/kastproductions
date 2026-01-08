# AGENTS.md - Coding Agent Guidelines for KastProductions

## Project Overview

Personal portfolio website built with Next.js 16 App Router and Chakra UI v3.
Static site with `output: 'export'` - no server-side features.

## Tech Stack

- **Runtime**: Bun (NOT npm/yarn)
- **Framework**: Next.js 16 (App Router)
- **UI Library**: Chakra UI v3 (NOT v2 - API is different)
- **Language**: TypeScript (strict mode)
- **Styling**: Emotion (via Chakra)
- **3D**: React Three Fiber + Drei
- **Animation**: Framer Motion

## Commands

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Production build (static export to ./out)
bun run build

# Start production server
bun run start

# Lint
bun run lint
```

**IMPORTANT**: Always use `bun`, never `npm` or `yarn`.

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx           # Root layout (fonts, providers, metadata)
  page.tsx             # Home page
  about/page.tsx       # About page
  work/page.tsx        # Work/Portfolio page
  contact/page.tsx     # Contact page
components/
  ui/                  # Chakra UI primitives (provider, color-mode, etc.)
  analytics.tsx        # Google Analytics component
public/
  logos/               # Client company logos (PNG format)
```

## Code Style Guidelines

### Imports

Order imports as follows:

1. React/Next.js imports
2. Third-party libraries (@chakra-ui, framer-motion, etc.)
3. Local components/utils with `@/` alias
4. Types (if separate)

```tsx
// Good
import { useState, useEffect } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { VscQuote } from "react-icons/vsc";
import NextLink from "next/link";
import { Provider } from "@/components/ui/provider";
```

### TypeScript

- **Strict mode enabled** - no implicit any
- Use explicit return types for exported functions
- Prefer `interface` for object shapes, `type` for unions/primitives
- Use `React.ReactNode` for children props

```tsx
// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Chakra UI v3 (CRITICAL)

Chakra UI v3 has breaking changes from v2. **DO NOT use v2 API**:

| v2 (DON'T USE)           | v3 (USE THIS)                               |
| ------------------------ | ------------------------------------------- |
| `spacing={4}`            | `gap={4}`                                   |
| `colorScheme="blue"`     | `colorPalette="blue"`                       |
| `isExternal`             | `target="_blank" rel="noopener noreferrer"` |
| `useDisclosure().isOpen` | `useDisclosure().open`                      |
| `<Img>`                  | `<Image>`                                   |

### Component Patterns

- Use `"use client"` directive for client components
- Keep server components as default when possible
- Colocate component-specific types in the same file

```tsx
"use client";

import { Box } from "@chakra-ui/react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">{title}</Text>
      {children}
    </Box>
  );
}
```

### Responsive Design

Use Chakra's responsive object syntax:

```tsx
// Good
<Box p={{ base: 4, md: 8, lg: 12 }} />
<Text fontSize={{ base: "sm", md: "md", lg: "lg" }} />

// Also acceptable for simple cases
<Box p={[4, 8, 12]} />
```

### Naming Conventions

- **Components**: PascalCase (`EmailUs`, `ClientLogos`)
- **Files**: kebab-case for multi-word (`color-mode.tsx`)
- **Functions**: camelCase (`scrollIntoView`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **CSS variables**: kebab-case (`--font-poppins`)

### Error Handling

- Use early returns for guard clauses
- Handle null/undefined explicitly
- Use optional chaining (`?.`) appropriately

```tsx
// Good
if (!data) return null;
const value = obj?.nested?.property;
```

### Fonts

Fonts are loaded via `next/font/google` in `app/layout.tsx`:

- **Poppins**: Primary font (`--font-poppins`)
- **Cormorant Infant**: Accent font (`--font-cormorant`)

### Path Aliases

Use `@/` alias for imports from project root:

```tsx
import { Provider } from "@/components/ui/provider";
```

## Static Export Constraints

This is a static site (`output: 'export'`). **DO NOT use**:

- `getServerSideProps`
- API routes (`app/api/`)
- Server Actions
- Dynamic routes with `generateStaticParams` missing
- `next/image` optimization (use `unoptimized: true`)

## Git Workflow

- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- Always run `bun run build` before committing to verify static export works
- Keep commits atomic and focused

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

Only `NEXT_PUBLIC_` prefixed variables are available in the browser.
