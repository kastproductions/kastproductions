# The catalogue opens with issue to pull request

Status: done
Source: GitHub issue #16, opened on 2026-09-20.

## What to build

The issue to pull request product is written in full, stations and prerequisites and prices, and it ships to nobody: the catalogue is empty, so the ready-made door, its prices, its nav entry and its page are all switched off. It is the only page on this site with commercial search intent, and it is a third indexable URL sitting one edit away.

Open the catalogue with it.

## Acceptance criteria

- [x] The product page answers 200, and shows the promise, the authority, the four stations, the prerequisites and both prices.
- [x] The ready-made door is back on the home page, and the self-run and managed price plans are back in the price list.
- [x] The product appears in the header navigation and in the sitemap, with its own copy date.
- [x] The page carries its canonical URL, its unfurl image and its own graph nodes, including the service and its offers.
- [x] The example run table keeps its visible example label, and no run, metric or client is invented.
- [x] The suite passes against the built export.

## Blocked by

- `01-page-records.md`

## Comments

Done in the two edits README's catalogue section names: `products = [issueToPullRequest]` and `src/app/issue-to-pull-request/page.tsx`. Verified against `out/`: the page emits the promise, the authority line, the four stations, the eight prerequisites and both prices; the canonical, the unfurl image, one WebPage, one Service with two offers (7500 to build, 1500 a month to operate) and the breadcrumb; the sitemap entry carries `2026-09-13`, the day the product's words last changed, while the other pages carry `2026-09-21`; `llms.txt` lists it; the home page prints both doors and four plans; the header links it from every page. Looked at the product page and the home doors and price list at 390 px and 1440 px. At 390 px the header nav wraps to a second line, which is what its rule under 620 px is written for.

Search phrase: "issue to pull request". The title is the product name, which is also the phrase.

The catalogue judgement. `CONTEXT.md` says the catalogue holds only a product that runs today, and this ticket was queued by the owner, so the product is treated as running. What the site claims now that it did not before: that an agent we have already built takes an issue from a tracker to a draft pull request; that it goes live in a client's own accounts in five working days once the prerequisites are in place; that it costs from €7,500 to build and from €1,500 a month to operate; and that self-run and managed are ways to buy on offer today, on the home page, in its graph and on the terms. The example run table is still labelled as an example and names no client, metric or run as fact; nothing was invented to make the page.

Decisions:
- The product's copy date stays `2026-09-13`. Its words in `content.ts` last changed then; the component that draws the page was restructured on 2026-09-20 without changing the reader's words. The sitemap and the graph state that date, not the day the page went live.
- The home door's `href` stays written by hand; `tests/links.test.ts` now holds it to leading to every product in `products`, because the route follows the slug and a renamed slug would leave the door pointing at nothing.
- README's catalogue section was stale under tickets 13 and 17: the plans the catalogue keeps back also stay off the terms, and a product also appears in `llms.txt`. It now says so, describes the array as it stands, and points a job at the custom door or its own page (ticket 14) rather than at the custom page alone. The Project Structure and the test listing name the new route and the new check.
