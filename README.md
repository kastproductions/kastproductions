# KastProductions

Website for KastProductions, a software agency in Vilnius, Lithuania. We build one standing agent for one company, deploy it into that company's own accounts, and keep it right after it is live.

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
  page.tsx             # Home: hero, clients, the two doors, fit, mechanism and stack,
                       #   reviewer, prices, questions; canonical URL
  custom/page.tsx      # The custom door: the jobs we take, channels, price
  content.ts           # Brand constants, search snippet copy, client list, founder
                       #   references, and every word of both doors
  globals.css          # Design tokens and component styles
  opengraph-image.tsx  # Open Graph image, rendered at build time
  manifest.ts          # Web app manifest
  robots.ts            # robots.txt
  sitemap.ts           # sitemap.xml, which follows the catalogue
  icon.svg             # Favicon
src/components/
  site-chrome.tsx      # Header, footer and brand mark, shared by every page
  product-page.tsx     # One ready-made product, on its own page
  run-record.tsx       # The example run, on a product page
  mention-card.tsx     # The example mention, in the home page hero
  analytics.tsx        # Google Analytics (NEXT_PUBLIC_GA_ID)
public/
  reviewers/           # Portraits for the reviewer section
vercel.json            # Redirects from retired URLs; content type for the Open Graph image
```

## Content

Every word of both doors lives in `src/app/content.ts`. The vocabulary is fixed in `CONTEXT.md`, and the decisions behind the offer are in `docs/adr/`: the stack in 0004, the shape of the offer in 0005, product naming in 0006, the default host in 0007.

The prices there are real: `prices` for the four ways to buy, and the `prices` field on each product and on `custom`. A build price is a floor, because the work follows the number of systems the agent touches. A monthly price buys the evals, the changes and the report that `mechanism` describes. Change a number here only when the business changes it.

`bookingUrl` is empty until a booking link exists. "Book a call" falls back to a `mailto:` with a subject line, which is the only analytics this page has.

## The catalogue

`products` holds only a product that runs today. A job we have not built yet belongs on the custom page. While the array is empty the home page shows one door, the ready-made prices stay off the price list, and no product appears in the nav or the sitemap.

Turning a product on takes two edits, because `output: "export"` refuses a dynamic route segment that generates no paths:

1. Add it to `products` in `src/app/content.ts`:

   ```ts
   export const products: Product[] = [issueToPullRequest];
   ```

2. Add its route, named after its `slug`, in `src/app/issue-to-pull-request/page.tsx`:

   ```tsx
   import { ProductPage, productMetadata } from "@/components/product-page";
   import { issueToPullRequest } from "../content";

   export const metadata = productMetadata(issueToPullRequest);

   export default function Page() {
     return <ProductPage product={issueToPullRequest} />;
   }
   ```

Nothing else moves. The door, the nav entry, the sitemap entry, the two ready-made prices and the product page all follow from the array.

## Claims

Every claim on the page is either verifiable or labelled as an example.

Real, and may be stated as fact: the 17 client companies, the 6 references with portraits, and the prices. All of them live in `src/app/content.ts`.

Also checkable, and worth keeping checkable: the channel lists in `channels` are the channels [Flue](https://flueframework.com/docs/ecosystem/) verifies, split into the chat channels a person addresses an agent in and the services that wake one with an event. The four items in `stack.ours` are the pieces Flue does not provide, so we write them. If Flue's ecosystem or its feature set moves, these lists move with it.

Synthetic, and labelled as an example wherever a visitor could read it as fact: the mention card in `src/components/mention-card.tsx`, the hero run record in `src/components/run-record.tsx`, and the `work` table on a product page. Each one carries a visible `.tag` label. There is no case study, metric, press mention or named client for any agent we have built. Do not invent one, and do not put an invented figure in a slot that reads as a statistic.

Other people's names belong to them. Flue is Apache-2.0, and §6 of that licence permits the descriptive use of the name, so we write "Flue" in text with a link, never as a logo, and never in a way that implies Flue endorses us. Never adopt a name from somebody else's repository as a KastProductions product name: products are named for the outcome they deliver, which is the rule in `docs/adr/0006`.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`). Deploy `./out` to any static host.

The site runs on Vercel, and `vercel.json` carries two settings the static export cannot express on its own:

- Permanent redirects from the retired `/about`, `/work`, `/contact`, `/standing-agents` and `/og.png` URLs to the matching page or section.
- A `Content-Type: image/png` header for `/opengraph-image`. Next.js writes that file without an extension, and a static host would otherwise serve it as a download.

On another host, port both settings to that host's configuration.

The Open Graph image fetches Bricolage Grotesque from Google Fonts during `bun run build`, so the build machine needs network access.

## Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)
