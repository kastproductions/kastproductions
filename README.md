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
  failed-payment-recovery/page.tsx
                       # One job on its own page. The route is four lines; the record
                       #   and every word it prints live on the job in content.ts
  privacy/page.tsx     # What the site collects, who processes it, how long it is kept
  terms/page.tsx       # What a build buys and what the monthly work covers, from the
                       #   prices and the lead time the content module holds
  imprint/page.tsx     # The register entry: legal name, legal form, code, VAT number,
                       #   registered address, director. It prints `company` and the
                       #   mailbox under it, and nothing else
  content.ts           # Brand constants, client list, founder references, every word
                       #   of both doors and of every job page, and the page records:
                       #   the path, title, description and copy date of every page we
                       #   write by hand
  head-directives.ts   # What a page tells a machine in its head. `pageMetadata` builds
                       #   all of it from a page record: title, description, canonical
                       #   URL, indexing directive and unfurl fields
  structured-data.ts   # The schema.org graph: the nodes true everywhere, and
                       #   `pageNodes`, which builds what a page adds from that same
                       #   record: the page with the date its copy changed and the
                       #   questions it answers, the service it sells, the breadcrumb
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
  site-chrome.tsx      # Header, footer and brand mark, shared by every page. The
                       #   footer links privacy, terms and the imprint from every page
  channels-section.tsx # Where a standing agent is reachable, and what wakes it
  product-page.tsx     # One ready-made product, on its own page
  job-page.tsx         # One job we take, on its own page
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
  page-graph.test.ts   # Each route describes itself: the date its copy changed, the
                       #   printed prices as offers, the questions the home page
                       #   answers, and one spelling of the site URL in every identifier
  analytics.test.ts    # Every page loads the tracker and counts a mailto click
  legal.test.ts        # Every page links privacy, terms and the imprint, and the
                       #   imprint prints every register fact `company` holds
  links.test.ts        # No job page is an orphan: both job lists lead to it, and it
                       #   leads on to the custom door
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

Every word of both doors and of every job page lives in `src/app/content.ts`, along with the facts the copy carries: the prices, the profiles, and the page records with the day each page's copy last changed. What a page tells a machine rather than a reader is not there. The metadata each page derives from its record, with the unfurl image and the indexing directive, lives in `src/app/head-directives.ts`, and the schema.org graph in `src/app/structured-data.ts`. The vocabulary is fixed in `CONTEXT.md`.

The prices there are real: `prices` for the four ways to buy, and the `prices` field on each product and on `custom`. A build price is a floor, because the work follows the number of systems the agent touches. A monthly price buys the evals, the changes and the report that `mechanism` describes. Change a number here only when the business changes it.

The printed price is also the only source for the machine-readable offer in the graph. `src/app/structured-data.ts` reads the number and the currency out of the string, so a price cannot say one thing to a reader and another to a crawler. Because every price we print is a floor, it requires the `From` and states a minimum, never a fixed price. A format it cannot read throws and fails the build, rather than emitting an empty offer nobody notices or calling a fixed price a floor. A page offers the prices it prints and no others: the home page offers `openPrices`, which is the plans the catalogue leaves standing, so a plan the page keeps back is a plan the graph does not claim. One offer states one number, which is the `amount`, so a way to buy whose `per` words carry a second figure ("to build, then from €1,500 a month") offers its build floor and leaves the monthly one in prose. `custom.prices` and a product's prices avoid that by holding the build and the monthly price as two prices, and a way to buy would have to print them as two lines to do the same.

`company` holds what the Lithuanian register of legal entities holds: the legal name, the legal form, the registration code, the VAT number, the registered address and the director. The imprint prints those six, and `contactEmail` under them so a reader who has finished checking can write; nothing else goes on that page. `tests/legal.test.ts` fails if one of the six stops appearing there. A reader is on that page to check us against the register, so a detail we cannot point at in the register does not go in. Note that `company.registeredAddress` is not `location`: the copy says Vilnius, where the studio works, and the register holds an address in the Lazdijai district.

`legalPages` is privacy, terms and the imprint, in the order the footer prints them. It is one list because four things read it: `writtenPages`, the footer, the suite's footer check, and the graph suite's list of pages that state no offer. A fourth page of this kind is a record and a route file, as any page is.

`openPrices` is `prices` with the catalogue rule applied: a way to buy that depends on a ready-made product stays off every page until one runs. The home page and the terms page both print that list, so neither can print a price the other does not.

`bookingUrl` is empty until a booking link exists. "Book a call" falls back to a `mailto:` with a subject line, so a click on it still names the door the reader came through. `contactEmail` is the mailbox the whole site uses, the privacy page included: it is the route by which a visitor's own words reach us.

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

Nothing else moves. The second argument is what the page prints, and a page passes only what it
has. A page that prints a price passes `pageNodes(aboutPage, { prices })` and gets the service
node with one offer per price; a page that prints none states no offer. A page that answers
questions passes `pageNodes(aboutPage, { questions })`, or both keys together, and its node says
it is an FAQ page and carries every question with its answer. Pass the same array the page
renders, because a second list drifts from the copy on the first edit. The title on the record
is the page's own and `pageMetadata` puts the brand after it, so keep the two together under
about 60 characters. The date is the day the copy last changed, read with
`git log -1 --date=short -- <file>`, so editing the words on a page means editing its date in
the same commit; the route file states the date nowhere, because the graph and the sitemap both
read it off the record.

## A job page

The home page lists the five jobs we take, and a job is also the phrase a buyer types into a
search engine, so a job earns a page of its own. That page is still one record and one route
file, and the record is the `page` field on the job in `src/app/content.ts`: a `JobPage` is a
page record with the words the page prints added to it, so nothing about the job is written
twice.

1. Write the page on the job, in the jobs section of `src/app/content.ts`:

   ```ts
   export const failedPaymentRecovery: JobPage = {
     path: "/failed-payment-recovery",
     title: "Failed payment recovery agent", // written for a search result
     description: "...",
     date: "2026-09-21",
     heading: "An agent that works last night's failed payments.", // written for the reader
     lede: "...",
     authority: "It acts behind an approval gate. ...", // one of the three in CONTEXT.md
     gate: "The gate sits before a message leaves your company. ...",
     steps: [{ title: "Reads the night's failures", body: "..." }],
     systems: [{ name: "Stripe", role: "..." }],
     subject: "Failed payment recovery", // the mail subject, and the door in an event
     more: "How the follow-up works", // the words the two job lists link with
   };
   ```

   Then hang it off the job: `{ title: "Failed-payment follow-up", ..., page: failedPaymentRecovery }`.

2. Add the route file at the path the record states, here
   `src/app/failed-payment-recovery/page.tsx`:

   ```tsx
   import { JobPage } from "@/components/job-page";
   import { failedPaymentRecovery } from "../content";
   import { pageMetadata } from "../head-directives";

   export const metadata = pageMetadata(failedPaymentRecovery);

   export default function Page() {
     return <JobPage page={failedPaymentRecovery} />;
   }
   ```

Nothing else moves. `jobPages` reads the pages off `jobs` and `indexablePages` carries them, so
the sitemap entry, the `llms.txt` line, the canonical, the unfurl and the graph nodes follow;
the rows on the home page and on the custom door link the page because the job holds it; and
`src/components/job-page.tsx` draws every job page, so five of them stay one page in five
voices rather than five pages drifting apart.

A job page prints the custom door's prices, read from `custom.prices`, and no number of its
own: a job we shape an agent around is custom work, and the door is where it is priced. It
states one of the three authorities in `CONTEXT.md` and the gate that authority stops at.
`tests/links.test.ts` holds it to being reachable: both job lists link to it and it leads on to
the door.

## The catalogue

`products` holds only a product that runs today. A job we have not built yet belongs on the custom page. While the array is empty the home page shows one door, the ready-made prices stay off the price list and out of the offers in its graph, and no product appears in the nav or the sitemap.

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

The strictest case is `company`, which the imprint prints: every line of it is in the Lithuanian register of legal entities, and the reader is there to check one against the other. A legal page that states a fact the register does not hold is worse than no legal page, so nothing goes on the imprint, the privacy page or the terms that is not already in `content.ts` or in the register. That rule kept four things off those pages: a named supervisory authority, a governing law, a fixed retention period for mail, and the name of whoever runs the mailbox. The privacy page states the retention it can state, which is the 24 hours the analytics hash lives and a deletion on request, and it points at Vercel's own privacy notice for what the host keeps rather than summarising a document we do not control. Each of the four is the owner's to decide before the site states it.

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
