# Hold the crawler-visible layer of the static export correct

Status: done
Source: GitHub issue #1, published and closed on 2026-09-13.
Shipped: pull request #7, merged 2026-09-13.

Tickets: `issues/01-built-export-suite.md`, `issues/02-unfurl-image-and-robots.md`, `issues/03-sitemap-and-robots.md`, `issues/04-organization-node.md`, `issues/05-page-graph.md`

## Problem Statement

The site is two pages, and search engines hold a copy of neither. An audit of the live deployment and of the current working tree found that the crawler-visible layer of the site drifts silently, because nothing checks it.

Three faults sit behind that drift:

- A page that declares its own Open Graph metadata loses the site-wide Open Graph image. The custom door ships today with no `og:image` and no `twitter:image`. Next.js merges metadata shallowly, so a page-level `openGraph` object replaces the whole inherited object, image included. The home page keeps its image only because the image file sits in the same route segment. Any new page repeats the fault.
- The structured data graph states things a search engine discards. The Organization logo points at an SVG, which Google does not accept for structured data images, and the file is 32 by 32, below the 112 pixel minimum. The graph also declares `ProfessionalService`, a LocalBusiness subtype, while carrying no street address and no telephone. Every page serves the same site-wide graph, so no page describes itself, and the four real prices carry no machine-readable offer.
- The sitemap stamps every URL with the build time, so each deploy claims that every page changed. The robots file carries a `Host` directive that only Yandex reads. The not-found route emits two conflicting robots directives.

A reader cannot see any of this. A person sharing the custom door in Slack sees a bare link with no picture. A search engine reads a logo it cannot use. Nobody on the team gets a warning, because the repository has no test that reads what the build emits.

## Solution

Make the crawler-visible layer of the static export correct, and hold it correct with one test suite that reads the built output.

After this work:

- Every route emits an Open Graph image and a Twitter image, whatever else that route's metadata declares.
- The structured data graph states only what the company can support. Organization replaces the LocalBusiness claim, the logo is a raster image large enough to use, the company links to its own public profiles, and a contact point carries the address people already write to.
- Each page contributes its own nodes to the graph. The custom door describes itself as a page and as a service with the prices already printed on it. A product page does the same when the catalogue opens.
- The sitemap and the robots file state facts. A date changes when the page changes, and nothing else.
- One suite reads the emitted HTML, the sitemap and the robots file, and fails when any of the above stops being true.

## User Stories

1. As a person who shares the custom door in a Slack channel, I want the link to unfurl with the site's Open Graph image, so that my colleagues see the company rather than a bare URL.
2. As a person who shares the custom door on X, I want a summary card with a large image, so that the link reads as a real company.
3. As an engineer who adds a page to the site, I want that page to inherit the Open Graph image whatever metadata it declares, so that I cannot ship a page that unfurls blank.
4. As an engineer who adds a page to the site, I want a test to fail when the page is missing a canonical URL, a title, a description or an Open Graph image, so that I learn about it before the deploy and not from a search console report months later.
5. As a search engine crawler, I want a logo in a format I accept, at a size I accept, so that I can attach a picture to the company entity.
6. As a search engine crawler, I want the company to link to its own public profiles, so that I can corroborate that the entity exists outside its own website.
7. As a search engine crawler, I want a contact point for the company, so that I can offer a way to reach it.
8. As a search engine crawler, I want the company to claim only the entity types it can support, so that I do not weigh it against LocalBusiness requirements it cannot meet.
9. As a search engine crawler, I want each page to describe itself, so that I can tell the custom door from the home page beyond its URL.
10. As a search engine crawler, I want the prices on the custom door as machine-readable offers, so that I can present what the company charges.
11. As a search engine crawler, I want a breadcrumb trail on a page below the home page, so that I can show the reader where the page sits.
12. As a search engine crawler, I want a modification date that changes only when the page changes, so that I can trust it and recrawl on it.
13. As a search engine crawler, I want the sitemap to list every indexable route and nothing else, so that I spend no fetch on a page that does not exist.
14. As a search engine crawler, I want one robots directive on the not-found route, so that I need not resolve a contradiction.
15. As an AI assistant asked about the company, I want a structured graph that names the offer, the prices and the founder, so that I can answer from facts instead of from the marketing copy.
16. As a prospective client who found the company through a search result, I want the title and the description in the result to match the page I land on, so that I do not bounce.
17. As the site owner, I want a product page to enter the sitemap the moment the product enters the catalogue, so that I never publish a page a crawler cannot find.
18. As the site owner, I want a product page to carry its own offer data the moment it opens, so that turning a product on stays the two edits the README promises.
19. As the site owner, I want the test suite to read the built output rather than the source, so that it fails on what a crawler sees and not on how I wrote it.
20. As the site owner, I want the suite to run with the runtime the project already uses, so that the repository gains no dependency for it.
21. As a reviewer reading the diff, I want the emitted metadata asserted route by route, so that I can see which contract each assertion defends.
22. As a reviewer reading the diff, I want no test that asserts the shape of a metadata object, so that a later refactor of how we build metadata does not break the suite for no reason.
23. As an engineer who deletes a page, I want the suite to fail while the sitemap still lists it, so that the sitemap cannot outlive the route.

## Implementation Decisions

**A shared Open Graph fragment, spread into every page.**
The content module gains one exported fragment that holds the Open Graph image, and every page metadata object spreads it into its own `openGraph`. The product page component does the same inside its metadata factory. This is the fix that matches the cause: Next.js merges metadata shallowly, so the fragment has to be re-declared at each segment that declares `openGraph` at all. The home page also spreads it, though it works without it today, so that the next page cannot regress by copying the home page.

**Structured data splits into site-wide nodes and per-page nodes.**
The root layout keeps the nodes that are true everywhere: Organization, the founder as a Person, and WebSite. A new structured data module owns the graph and exports the site-wide nodes plus builders for the per-page nodes. Each page renders its own graph fragment. A page contributes:

- Home: nothing beyond the site-wide nodes and a WebPage node.
- Custom door: a WebPage node, a Service node carrying the two prices from the custom door's own price list, and a BreadcrumbList from the home page to the custom door.
- A product page: the same three, built from the product record, so that opening the catalogue needs no further edit.

**The Organization node states only what the company can support.**
Drop `ProfessionalService` and `priceRange`. The company has no walk-in premises, no street address and no telephone, so a LocalBusiness subtype invites validation it fails. Keep `Organization`, keep the city and country address, keep `areaServed`. Add `contactPoint` with the contact email and a `contactType` of sales. Add `sameAs` listing the company's own public profiles, starting with the GitHub organisation that hosts this repository. Personal profiles stay on the Person node, where they already are.

**The logo becomes a raster asset.**
Add a PNG logo of at least 512 by 512, drawn from the existing icon, served from a stable path, and referenced from the Organization node as an ImageObject with its width and height. The existing SVG icon stays as the favicon, where SVG is correct.

**The sitemap states real dates.**
Remove `changeFrequency` and `priority`, which Google ignores. Replace the build-time `lastModified` with a date owned by the content module: one date per route, and one date per product record, edited when the page copy changes. A page whose date nobody maintains carries no date at all, which is better than a wrong one.

**The robots file drops its Host directive.**
Only Yandex reads it. Keep the allow rule and the sitemap reference.

**The not-found route emits one robots directive.**
Today it emits `noindex` from the framework and `index, follow` from the site-wide defaults. Behaviour is correct by accident, because a crawler takes the most restrictive. Move the site-wide robots defaults out of the not-found path so that the route emits `noindex` alone.

**No new runtime dependency.**
The suite runs on `bun test`, which ships with the runtime the project already pins. A script runs the build and then the suite, so that the suite always reads fresh output.

## Testing Decisions

**One seam: the emitted static export.**
The suite reads the built output, meaning the HTML of each route, the sitemap and the robots file. It asserts what a crawler sees. It never imports a metadata object, a page component or a route handler.

This seam was chosen against the module seam for a decisive reason. The missing Open Graph image is invisible from our own modules, because our metadata objects are correct and the framework drops the inherited image during its merge. A unit test over the metadata factories passes while the built page unfurls blank. The build output is the only place where the fault is observable, so it is the only honest place to test.

**What a good test looks like here.**
Each assertion names a contract a crawler or a social platform relies on. Examples of assertions that earn their place:

- Every indexable route emits exactly one `h1`.
- Every indexable route emits a self-referencing canonical URL that matches its own path.
- Every indexable route emits a title, a description, an `og:image` and a `twitter:image`.
- Every indexable route emits structured data that parses as JSON, and whose graph holds the nodes that route promises.
- The Organization logo URL ends in a raster extension and resolves to a file in the export.
- The sitemap lists exactly the indexable routes, and each entry resolves to an emitted page.
- The robots file allows crawling and names the sitemap.
- The not-found route emits `noindex` and emits no conflicting robots directive.

Assertions that must not be written: the shape of a metadata object, the presence of a helper, the text of a source file, the count of nodes in the graph for its own sake, or a snapshot of a whole page. Page copy changes often, and a suite that pins copy gets deleted within a month.

**Route coverage comes from the same source as the sitemap.**
The suite derives its route list from the same catalogue the sitemap derives its entries from, so a product entering the catalogue is covered without a test edit. A route the suite cannot find in the export is a failure, not a skip.

**Prior art.**
None. This is the first test suite in the repository, and `bun test` is the first runner. The shape to follow is the throwaway script used during the audit: read the file from the export, parse the head, assert the tag. Keep that directness. The audit also proved the parsing is cheap, so no HTML library is needed for tag assertions, though a JSON parse of the structured data block is required.

**What stays a manual check.**
Rich Results Test and the Search Console coverage report stay manual. A local suite cannot tell you what Google accepted, only what the build emitted.

## Out of Scope

- **Committing and deploying the current working tree.** The custom door returns 404 in production because the redesign is uncommitted, not because of a code fault. Deploying is a prerequisite for this work to reach a crawler, and it is the owner's action.
- **Titles, descriptions and H1 copy.** The audit found that no page targets a query anybody types. Rewriting them needs a keyword map the owner has not decided yet. Copy changes belong in a separate spec, after that decision.
- **The legal and trust surface.** The privacy page and the registered company details in the footer are their own issue, as agreed. This spec does not touch them.
- **Opening the catalogue.** Turning `issue-to-pull-request` on is a business statement about whether the product runs today. The rule in CONTEXT.md governs it. This work only guarantees that the page carries correct metadata and offer data when the owner opens it.
- **A content layer.** Blog, glossary and comparison pages are a later roadmap item.
- **FAQPage structured data.** Google restricted FAQ rich results to health and government sites, so the markup buys no search feature. Revisit only if the aim is AI citation.
- **Search Console verification, Google Analytics, and the apex to www redirect.** All three live outside the repository. The apex currently answers with a temporary 307 and should be set to permanent in the Vercel domain settings.
- **Core Web Vitals work.** Measured on the new build at four times CPU throttling and 1.6 Mbps: LCP 928 ms, CLS 0.0104, total blocking time 29 ms. The 575 KB of JavaScript costs 29 ms of blocking, so touching it would buy nothing.
- **Image alt text and tap target sizes.** The reviewer portraits use empty alt with a figcaption that names each person, which is defensible. The 22 pixel client links are an accessibility nit with no search cost.

## Further Notes

The shallow merge behaviour is documented in the Next.js reference that ships with the project, under `generate-metadata`, in the section on ordering and merging. It states that metadata objects from multiple segments merge shallowly and that a nested field such as `openGraph` defined in an earlier segment is overwritten by the last segment to define it. The not-found route in the current build is the control case: it declares no `openGraph` of its own and it keeps the inherited image.

Audit evidence behind each finding, for the implementer who wants to reproduce it:

- `og:image` absent from the built custom door, present on the built home page and the built not-found page.
- The live apex answers 307, the live HTTP origin answers 308, and the live custom door answers 404 with a three-day-old cache age.
- The live robots file carries the `Host` directive. The live sitemap lists the retired standing agents URL, which still answers 200 with a self-referencing canonical.
- A brand search still returns a title from two rebrands ago, which is consistent with a site nothing has recrawled and nothing measures.

One process note. The triage label vocabulary never reached this session, and the repository carries only GitHub's default labels. The `ready-for-agent` label was created to publish this spec. Run `/setup-matt-pocock-skills` to install the rest of the vocabulary before the next spec.
