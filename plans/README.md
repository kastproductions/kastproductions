# Implementation Plans

Written by the improve skill on 2026-09-13, against commit `ab8e0ff`. The audit
covered the sections and the copy of the two pages that build today, `/` and
`/custom`. It did not cover the structured-data layer, the test suite, the build
configuration, the dependencies or the stylesheet's architecture.

Each executor: read the plan fully before starting, honour its STOP conditions,
and update your row when done.

## Execution order and status

| Plan | Title | Priority | Effort | Depends on | Status |
|---|---|---|---|---|---|
| 001 | Re-cut the home page for one door | P1 | M | — | DONE |

## Dependency notes

Plan 001 stands alone. It leaves `products` empty on purpose, so it neither
blocks nor is blocked by a decision to publish the ready-made product.

## Findings recorded, not planned this round

These came out of the audit and the owner chose not to plan them yet. They are
listed so the next run does not spend effort finding them again.

- **The live pages print no lead time and no prerequisites.** `CONTEXT.md` says
  we print both next to a price. "five working days" (`src/app/content.ts:41`)
  reaches a reader only through the ready-made door and the Self-run price, both
  of which the empty catalogue hides, so the built pages contain the phrase zero
  times. Worse, the FAQ answer at `src/app/content.ts:495` tells the reader
  "Every product prints its prerequisites next to its price" while no product
  page exists and `/custom` prints none.
- **`/custom` is the only live door and carries no proof.** Four sections: hero,
  jobs, channels, price. No clients strip, no references, no mechanism, no
  questions (`src/app/custom/page.tsx:48-159`). Its hero is also the only hero
  on the site with nothing beside the headline, where the home page and the
  product page both pair one with a figure.
- **One action, four names.** "See the work we take", "Start with a brief",
  "Describe the work" and "Send us a brief" all open the same mailbox
  (`src/app/page.tsx:71`, `src/app/content.ts:436,481`,
  `src/components/site-chrome.tsx:64`).
- **"Fit is the promise" points at a word the page never uses.**
  `src/app/content.ts:194` opens the mechanism section with a term the copy
  never introduces; the section before it is headed "What we shape your agent
  around" and never says fit.
- **The clients strip credits the company with the founder's earlier work.**
  "Companies we have shipped for" (`src/app/page.tsx:81-83`) sits under a hero
  about standing agents. The attribution to the founder's career before this
  offer existed arrives six sections later at `src/app/page.tsx:186-188`.
- **Six full-length references about React work** under a heading about who
  signs a merge (`src/app/content.ts:65-108`, `src/app/page.tsx:194-218`). It is
  the longest section on the page. The quotes must not be edited, so the lever
  is selection and disclosure.
- **One control, three wordings.** An approval gate "waits for a named person"
  (`src/app/content.ts:204`), "waits for a name" (line 382) and "needs a
  signature" (line 397). The glossary reserves signing for the reviewer who
  signs a merge.
- **Two FAQ answers repeat sections the reader just read.**
  `src/app/content.ts:507` restates the stack block; line 499 restates the
  mechanism's spend-cap entry.

## Direction, for the owner rather than an executor

- **Publish `issueToPullRequest`.** The record is written in full and dated
  (`src/app/content.ts:290-335`) and `README.md` documents the two edits that
  turn it on. Doing so retires the one-door problem, the hidden lead time, the
  missing prerequisites and the two hidden prices at once. The gate is not code:
  `CONTEXT.md` says the catalogue holds only a product that runs today.
- **A "first week" section.** Both numbers exist and neither reaches a reader as
  a sequence: a spec and a fixed price within one working day
  (`src/app/content.ts:374`), live in five working days (line 41).
- **Print the prerequisites on `/custom`.** The who-and-what table at
  `src/components/product-page.tsx:152-167` is the most exact thing in the
  repository and no page shows it. `/custom` replaces it with "Which accounts
  you need depends on the systems your agent touches".

## Findings considered and rejected

- **Gloss "standing agent" for a first-time reader**: the hero lede defines it in
  the following clause, and the glossary bans every substitute the gloss would
  reach for.
- **Explain Flue**: `src/app/content.ts:225` already calls it "the open agent
  harness the Astro organisation publishes" and links it. Naming it and not
  explaining it further is a decision on record.
- **"ticket" and "tickets" as glossary breaches** (`src/app/content.ts:184,392`):
  the glossary bans "ticket" as a name for our Brief, not as a name for the
  client's own Zendesk ticket. Both uses are correct.
- **"the ceiling you agreed" as drift from "spend cap"**
  (`src/app/content.ts:229`): the glossary defines a spend cap as "the agreed
  ceiling on model cost", so the descriptive word matches the source.
- **`id="reviewer"` against the heading "Who puts their name on it"**: an anchor,
  not a sentence a reader meets.
- **Rename "Questions we get on the first call"**: it is specific, true, and the
  header offers a call on every page.
- **"across four continents" as agency filler**: it is a checkable fact about 17
  named companies. The problem in that line is the word "we", which is recorded
  above as its own finding.
- **Add references from standing-agent clients**: the Claims section of
  `README.md` forbids inventing client evidence, and none exists yet.
