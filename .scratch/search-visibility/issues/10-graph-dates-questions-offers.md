# The graph states dates, questions and the prices the home page prints

Status: done
Source: GitHub issue #17, opened on 2026-09-20.

## What to build

The graph is sound: the organisation, the founder, the site, a node per page, and a service with offers on the custom door. Four things are missing from it.

No page node says when its copy last changed, although the record already holds that date. The ten questions answered on the home page are not marked as questions, so no answer engine can lift them. The home page prints four price plans and offers none of them, while the custom page offers its two. And the home page's own node spells the site URL without the trailing slash that every other node uses.

## Acceptance criteria

- [x] Every page node states the date its copy last changed, taken from the page record rather than the build clock.
- [x] The ten first-call questions are marked up as questions and answers, word for word as the page prints them.
- [x] The four price plans on the home page are offered as a service with an offer each, priced as floors, the way the custom page already does it.
- [x] Every identifier in the graph spells the site URL one way.
- [x] No validator error on the home page or the custom page. The Rich Results Test refuses a code paste without a Google account, so this was validated with https://validator.schema.org/ instead: see the Comments.

## Blocked by

- `01-page-records.md`

## Comments

Done in `src/app/structured-data.ts`, with the smallest edits the graph needed in
`src/app/content.ts` and `src/app/page.tsx`.

What the graph now emits per page. The home page: one `WebPage` that is also an `FAQPage`,
carrying `dateModified` and the ten questions as `mainEntity`, one `Service` with an `Offer`
per plan the page prints, and no breadcrumb. Every other page: one `WebPage` with
`dateModified`, one `Service` where the page prints prices, and one `BreadcrumbList`. The
layout still renders the `Organization`, the `Person` and the `WebSite` on every route.

The date comes off `PageRecord.date` and nowhere else, so a route file states no date at all.
`src/app/page.tsx` passes the questions the page renders, `pageNodes(homePage, openPrices,
questions)`, so the graph and the copy are one list.

Two plans, not four. The home page prints the plans the catalogue leaves standing, and
`products` is empty today, so `openPrices` is Custom agent and Sprint: €10,000 and €4,000, both
as `minPrice`. Self-run and Managed print the moment a ready-made product runs, and the graph
offers them in the same breath. Offering a plan the page keeps back would be a claim no reader
can see.

One spelling. `nodeId` writes every `@id` in the graph, so the site URL carries its slash in
all of them: the home page's node was `https://www.kastproductions.com#webpage` beside an
organisation at `https://www.kastproductions.com/#organization`, which is one site keyed as
two. A `url` field still follows `pageUrl`, because a canonical tag names one address and that
address has no trailing slash; the suite holds the keys to one rule and the addresses to the
other.

Validation. Google's Rich Results Test refused the code paste: it answered "Something went
wrong. Log in and try again" on both attempts, so a code test now needs a Google account.
Validated with https://validator.schema.org/ instead, driving it with `agent-browser` and
pasting each built page's emitted JSON-LD:

- Home page: 0 errors, 0 warnings. Detected `WebPage / FAQPage` with `dateModified 2026-09-18`
  and ten `Question` items, and `Service` with its two offers. The `Organization`, `Person` and
  `WebSite` nodes resolve into them by `@id`, which is why the validator counts two items.
- Custom page: 0 errors, 0 warnings, three items: `WebPage`, `BreadcrumbList` and `Service`.

Every `agent-browser` session is closed; `agent-browser session list --json` reports none.

Tests. `tests/page-graph.test.ts` gained three guards, one per way this could rot: a page node
that loses its date or states a build stamp, a question list in the graph that drifts from the
copy the page prints, and an identifier spelled a second way. The home page now goes through
the offers test with the rest, so `pricesFor` answers for every route and the test that said
the home page offers nothing is gone. `bun run test` passes: 57 tests.
