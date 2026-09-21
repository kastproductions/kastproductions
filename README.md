# KastProductions

Website for KastProductions, a software agency in Vilnius, Lithuania. We build one standing agent for one company, deploy it into that company's own accounts, and keep it right after it is live.

Live at [www.kastproductions.com](https://www.kastproductions.com).

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: hand-written CSS in `src/app/globals.css`, no framework
- **Fonts**: Archivo (one family, variable `wght` and `wdth`), IBM Plex Mono
- **Language**: TypeScript (strict)
- **Runtime**: Bun

## The design

The page is drawn as the instrument sheet of the thing we sell: a machine that
runs unattended and stops at a gate. Three rules hold it together, and breaking
one is a bug rather than a variation.

1. **A hairline is the only divider.** No card, no shadow, no corner radius.
   Structure carries information: a rule separates two readings, the rule down
   the middle of a unit separates a label from its reading, and a band is one
   course of the sheet. Nothing is drawn for looks.
2. **`--signal` means someone must act.** The amber marks the gate the agent
   stops at, and the one action a reader can take in a view: the primary
   button, the underline on a link that leads somewhere, the marker on a
   question that opens. It is the approval gate in colour, so spending it on
   decoration spends the one signal the page has. A rule, a number or a table
   cell is never amber.
3. **`--font-mono` means a machine wrote this string.** A handle, a channel, a
   timestamp, a diff, a path. A label a person wrote is set in the text face,
   narrowed, never in mono and never in tracked capitals.

One family carries the voice through its width axis, so `font-stretch` is a
type token here and not a tweak: `--wide` (118%) for display, normal for prose,
`--narrow` (88%) for a spec label. The narrowing does the job a tracked
all-caps eyebrow would otherwise do, without shouting.

Motion is one orchestrated entrance per page, on load: the hero console rises
part by part and lands on the gate lamp, or the run record ticks in on a
product page. A page carries one or the other, never both, and nothing else on
the site moves unless a reader asks it to. `prefers-reduced-motion` gets the
end state immediately.

A number in front of a row means the rows are a sequence. Only the four
stations of a run earn `.rows--seq`, because only they are one.

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
  page.tsx             # Home: hero, clients, the work we take and the doors, fit,
                       #   channels, mechanism and stack, reviewer, prices, questions;
                       #   metadata and graph built from its page record
  custom/page.tsx      # The custom door: the jobs we take, channels, price; metadata
                       #   and graph built from its page record
  content.ts           # Brand constants, client list, founder references, every word
                       #   of both doors, and the page records: the path, title,
                       #   description and copy date of every page we write by hand
  head-directives.ts   # What a page tells a machine in its head. `pageMetadata` builds
                       #   all of it from a page record: title, description, canonical
                       #   URL, indexing directive and unfurl fields
  structured-data.ts   # The schema.org graph: the nodes true everywhere, and
                       #   `pageNodes`, which builds the page, service and breadcrumb
                       #   nodes a page adds from that same record
  globals.css          # The sheet: design tokens and component styles. Its header
                       #   states the three rules the design holds to
  opengraph-image.tsx  # Open Graph image, rendered at build time
  manifest.ts          # Web app manifest
  robots.ts            # robots.txt
  sitemap.ts           # sitemap.xml, one entry per page record, stating the date each
                       #   record holds
  llms.txt/route.ts    # llms.txt, the plain-text index an answer engine reads: one
                       #   Markdown link per page record, with its description
  not-found.tsx        # The page a wrong address lands on. Carries no canonical and
                       #   no robots directive of its own: the framework writes the
                       #   `noindex` there, and a second beside it is a contradiction
  icon.svg             # Favicon, drawn as the brand mark
src/components/
  site-chrome.tsx      # Header, footer and brand mark, shared by every page
  channels-section.tsx # Where a standing agent is reachable, and what wakes it
  product-page.tsx     # One ready-made product, on its own page
  run-record.tsx       # The example run, on a product page
  agent-console.tsx    # The example agent in the home page hero: its nameplate, the
                       #   exchange, and the gate it stops at
  analytics.tsx        # Vercel Web Analytics: the tracker this deployment serves,
                       #   and one event per call to action clicked
public/
  reviewers/           # Portraits for the reviewer section
  logo.png             # 512px raster logo, for the Organization node in the graph
tests/
  export.ts            # Shared helpers: the export root, a file reader, tag parsing,
                       #   a JSON-LD reader, and the indexable routes, which follow
                       #   the page records
  head.test.ts         # One h1, a self-referencing canonical, and the title and
                       #   description each record states, each unique and short
                       #   enough to print whole; the sitemap and robots file
  opengraph.test.ts    # An unfurl image, title and description per route, and one
                       #   robots directive on the 404
  sitemap.test.ts      # Real dates, no build time, and no Host directive
  llms-txt.test.ts     # The plain-text index lists the URLs the sitemap lists, with
                       #   the description each record states
  structured-data.test.ts  # The company states only what it can support
  page-graph.test.ts   # Each route describes itself, with the printed prices as offers
  analytics.test.ts    # Every page loads the tracker and counts a mailto click
vercel.json            # Redirects from retired URLs; content type for the Open Graph image
```

## Tests

`bun run test` builds the export and then reads it with `bun test`. The suite has one seam: the
files in `out/`. It asserts what a crawler sees and what the page tells the tracker, and it
imports no page component, no metadata object and no route handler.

That seam was chosen for a reason worth remembering. Next.js merges metadata shallowly, so a page
that declares its own `openGraph` object silently loses the inherited image. Our metadata objects
look correct while the built page unfurls blank, which means a test over the metadata objects
would have passed through the whole fault. Only the build output shows it.

The route list comes from `indexablePages`, the list of page records the sitemap walks, so a
page or a product added to the content module is covered with no test edit. A route the suite
cannot find in the export is a failure, never a skip.

What the suite is not for: the shape of a metadata object, the text of a source file, or a
snapshot of a page. Copy changes often, and a suite that pins copy gets deleted.

The Rich Results Test and the Search Console coverage report stay manual. A local suite tells you
what the build emitted, never what Google accepted.

## Content

Every word of both doors lives in `src/app/content.ts`, along with the facts the copy carries: the prices, the profiles, and the page records with the day each page's copy last changed. What a page tells a machine rather than a reader is not there. The metadata each page derives from its record, with the unfurl image and the indexing directive, lives in `src/app/head-directives.ts`, and the schema.org graph in `src/app/structured-data.ts`. The vocabulary is fixed in `CONTEXT.md`.

The prices there are real: `prices` for the four ways to buy, and the `prices` field on each product and on `custom`. A build price is a floor, because the work follows the number of systems the agent touches. A monthly price buys the evals, the changes and the report that `mechanism` describes. Change a number here only when the business changes it.

The printed price is also the only source for the machine-readable offer in the graph. `src/app/structured-data.ts` reads the number and the currency out of the string, so a price cannot say one thing to a reader and another to a crawler. Because every price we print is a floor, it requires the `From` and states a minimum, never a fixed price. A format it cannot read throws and fails the build, rather than emitting an empty offer nobody notices or calling a fixed price a floor.

`bookingUrl` is empty until a booking link exists. "Book a call" falls back to a `mailto:` with a subject line, so a click on it still names the door the reader came through.

## Adding a page

A page is one record and one route file. The record is the one place its path, title,
description and copy date are written, and everything a machine reads follows from it: the
canonical URL, the indexing directive, the unfurl fields, the sitemap entry with its date, the
line in `llms.txt`, the page's own graph nodes, and the suite's coverage of all of them.

1. Add the record in the page records section of `src/app/content.ts`, and put it in
   `writtenPages`:

   ```ts
   export const aboutPage: PageRecord = {
     path: "/about",
     title: "Who builds the agents",
     description: "The sentence a search result prints under the title, under 160 characters.",
     date: "2026-09-20",
   };

   export const writtenPages: PageRecord[] = [homePage, customPage, aboutPage];
   ```

2. Add the route file at the path the record states, here `src/app/about/page.tsx`:

   ```tsx
   import { SiteFooter, SiteHeader } from "@/components/site-chrome";
   import { aboutPage } from "../content";
   import { pageMetadata } from "../head-directives";
   import { graphHtml, pageNodes } from "../structured-data";

   export const metadata = pageMetadata(aboutPage);

   const graph = graphHtml(pageNodes(aboutPage));

   export default function About() {
     return (
       <>
         <SiteHeader route={aboutPage.path} />
         <main id="main">{/* the page */}</main>
         <SiteFooter route={aboutPage.path} />
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
       </>
     );
   }
   ```

Nothing else moves. A page that prints a price passes it, `pageNodes(aboutPage, prices)`, and
gets the service node with one offer per price; a page that prints none states no offer. The
title on the record is the page's own and `pageMetadata` puts the brand after it, so keep the
two together under about 60 characters. The date is the day the copy last changed, read with
`git log -1 --date=short -- <file>`, so editing the words on a page means editing its date in
the same commit.

## The catalogue

`products` holds only a product that runs today. A job we have not built yet belongs on the custom page. While the array is empty the home page shows one door, the ready-made prices stay off the price list, and no product appears in the nav or the sitemap.

Turning a product on takes two edits, because `output: "export"` refuses a dynamic route segment that generates no paths:

1. Add it to `products` in `src/app/content.ts`:

   ```ts
   export const products: Product[] = [issueToPullRequest];
   ```

2. Add its route, named after its `slug`, in `src/app/issue-to-pull-request/page.tsx`:

   ```tsx
   import { ProductPage } from "@/components/product-page";
   import { issueToPullRequest, productPage } from "../content";
   import { pageMetadata } from "../head-directives";

   export const metadata = pageMetadata(productPage(issueToPullRequest));

   export default function Page() {
     return <ProductPage product={issueToPullRequest} />;
   }
   ```

Nothing else moves. The door, the nav entry, the sitemap entry and its date, the two ready-made prices, the product page and its graph nodes all follow from the array. A product page keeps no record of its own: `productPage` reads one off the product, so the path, the title, the description and the date arrive with it.

## Claims

Every claim on the page is either verifiable or labelled as an example.

Real, and may be stated as fact: the 17 client companies, the 6 references with portraits, and the prices. All of them live in `src/app/content.ts`.

Also checkable, and worth keeping checkable: the channel lists in `channels` are the channels [Flue](https://flueframework.com/docs/ecosystem/) verifies, split into the chat channels a person addresses an agent in and the services that wake one with an event. The four items in `stack.ours` are the pieces Flue does not provide, so we write them. If Flue's ecosystem or its feature set moves, these lists move with it.

Synthetic, and labelled as an example wherever a visitor could read it as fact: the agent console in `src/components/agent-console.tsx`, the hero run record in `src/components/run-record.tsx`, and the `work` table on a product page. Each one carries a visible `.tag` label. There is no case study, metric, press mention or named client for any agent we have built. Do not invent one, and do not put an invented figure in a slot that reads as a statistic.

Other people's names belong to them. Flue is Apache-2.0, and §6 of that licence permits the descriptive use of the name, so we write "Flue" in text with a link, never as a logo, and never in a way that implies Flue endorses us. Never adopt a name from somebody else's repository as a KastProductions product name: a product is named for the outcome it delivers.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`). Deploy `./out` to any static host.

The site runs on Vercel, and `vercel.json` carries two settings the static export cannot express on its own:

- Permanent redirects from the retired `/about`, `/work`, `/contact`, `/standing-agents` and `/og.png` URLs to the matching page or section.
- A `Content-Type: image/png` header for `/opengraph-image`. Next.js writes that file without an extension, and a static host would otherwise serve it as a download.

`llms.txt` needs no such header. The build writes it under its own name, extension and all, so a static host reads the content type off the `.txt` the way it already does for `robots.txt`.

On another host, port both settings to that host's configuration, and expect the analytics tracker to stop working: `## Analytics` below explains why the path every page requests is one only a Vercel deployment serves.

The Open Graph image fetches Archivo from Google Fonts during `bun run build`, so the build machine needs network access. It is drawn from the same tokens as the page, and its URL in `src/app/head-directives.ts` carries a version query: a scraper caches an unfurl on the image URL for months, so redrawing the image means bumping that query in the same commit.

## Analytics

The site counts visits with Vercel Web Analytics. The processor is Vercel Inc., the company that already serves the site: the tracker sets no cookie and stores nothing on the visitor's device, a visitor is identified by a hash of the incoming request, and that hash is discarded 24 hours later. That is why the site carries no consent banner. The data points it keeps per visit are listed in [Vercel's privacy documentation](https://vercel.com/docs/analytics/privacy-policy), which is the source a privacy policy should state, rather than this file.

`src/components/analytics.tsx` writes two tags into every page the build emits: the queue stub Vercel documents for plain HTML, and a deferred `script` tag for `/_vercel/insights/script.js`. The deployment serves that path itself, so no third-party host is contacted, and the path exists only once Web Analytics is turned on for the project in the Vercel dashboard. A page view counts both on a fresh load and on a client-side move between pages. An ad blocker that blocks `/_vercel/insights/*` drops the visit: the per-deployment script path that works around this needs the `@vercel/analytics` package and a seed the package reads at build time, and we render the tags ourselves.

Every call to action on the site is a `mailto:` link, so a click on one is the nearest thing to a conversion the site can observe. One delegated listener counts them all as a `mailto` event. Its `door` is the mail subject the link carries, which is how this site names the door a reader came through, and its `page` is the path they clicked from. Custom events need a Vercel Pro plan. Page views do not, so a project on the Hobby plan counts visits and drops events.

## Environment Variables

None. The site reads no build variable, and analytics is turned on for the project in the Vercel dashboard rather than by a key in this repository.
