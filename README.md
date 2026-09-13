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

# Build the export, then read it with the test suite
bun run test

# Lint
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/app/
  layout.tsx           # Root layout: fonts, site-wide metadata, the site-wide graph,
                       #   analytics
  page.tsx             # Home: hero, clients, the two doors, fit, mechanism and stack,
                       #   reviewer, prices, questions; canonical URL and its own graph
  custom/page.tsx      # The custom door: the jobs we take, channels, price, own graph
  content.ts           # Brand constants, search snippet copy, client list, founder
                       #   references, the written pages and their dates, and every
                       #   word of both doors
  head-directives.ts   # What a page tells a machine in its head: the unfurl image
                       #   and the indexing directive every written page spreads in
  structured-data.ts   # The schema.org graph: the nodes true everywhere, and a builder
                       #   for the page, service and breadcrumb nodes a page adds
  globals.css          # Design tokens and component styles
  opengraph-image.tsx  # Open Graph image, rendered at build time
  manifest.ts          # Web app manifest
  robots.ts            # robots.txt
  sitemap.ts           # sitemap.xml, which follows the written pages and the
                       #   catalogue, and states the dates content.ts holds
  icon.svg             # Favicon
src/components/
  site-chrome.tsx      # Header, footer and brand mark, shared by every page
  product-page.tsx     # One ready-made product, on its own page
  run-record.tsx       # The example run, on a product page
  mention-card.tsx     # The example mention, in the home page hero
  analytics.tsx        # Google Analytics (NEXT_PUBLIC_GA_ID)
public/
  reviewers/           # Portraits for the reviewer section
  logo.png             # 512px raster logo, for the Organization node in the graph
tests/
  export.ts            # Shared helpers: the export root, a file reader, tag parsing,
                       #   a JSON-LD reader, and the indexable routes, which follow
                       #   the written pages and the catalogue
  head.test.ts         # One h1, a self-referencing canonical, a title and a
                       #   description per route; the sitemap and the robots file
  opengraph.test.ts    # An unfurl image per route, and one robots directive on the 404
  sitemap.test.ts      # Real dates, no build time, and no Host directive
  structured-data.test.ts  # The company states only what it can support
  page-graph.test.ts   # Each route describes itself, with the printed prices as offers
vercel.json            # Redirects from retired URLs; content type for the Open Graph image
```

## Tests

`bun run test` builds the export and then reads it with `bun test`. The suite has one seam: the
files in `out/`. It asserts what a crawler sees, and it imports no page component, no metadata
object and no route handler.

That seam was chosen for a reason worth remembering. Next.js merges metadata shallowly, so a page
that declares its own `openGraph` object silently loses the inherited image. Our metadata objects
look correct while the built page unfurls blank, which means a test over the metadata objects
would have passed through the whole fault. Only the build output shows it.

The route list comes from `writtenPages` and `products`, the two lists the sitemap walks, so a
page or a product added to the content module is covered with no test edit. A route the suite
cannot find in the export is a failure, never a skip.

What the suite is not for: the shape of a metadata object, the text of a source file, or a
snapshot of a page. Copy changes often, and a suite that pins copy gets deleted.

The Rich Results Test and the Search Console coverage report stay manual. A local suite tells you
what the build emitted, never what Google accepted.

## Content

Every word of both doors lives in `src/app/content.ts`, along with the facts the copy carries: the prices, the profiles, and the written pages with the day each one last changed. What a page tells a machine rather than a reader is not there. The unfurl image and the indexing directive live in `src/app/head-directives.ts`, and the schema.org graph in `src/app/structured-data.ts`. The vocabulary is fixed in `CONTEXT.md`, and the decisions behind the offer are in `docs/adr/`: the stack in 0004, the shape of the offer in 0005, product naming in 0006, the default host in 0007.

The prices there are real: `prices` for the four ways to buy, and the `prices` field on each product and on `custom`. A build price is a floor, because the work follows the number of systems the agent touches. A monthly price buys the evals, the changes and the report that `mechanism` describes. Change a number here only when the business changes it.

The printed price is also the only source for the machine-readable offer in the graph. `src/app/structured-data.ts` reads the number and the currency out of the string, so a price cannot say one thing to a reader and another to a crawler. Because every price we print is a floor, it requires the `From` and states a minimum, never a fixed price. A format it cannot read throws and fails the build, rather than emitting an empty offer nobody notices or calling a fixed price a floor.

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

Nothing else moves. The door, the nav entry, the sitemap entry and its date, the two ready-made prices, the product page and its graph nodes all follow from the array.

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
