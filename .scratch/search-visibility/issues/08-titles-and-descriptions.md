# Titles and descriptions use the words buyers type

Status: done
Source: GitHub issue #15, opened on 2026-09-20.

## What to build

The home page title leads with the brand and then a coined category, "software factory on demand", which nobody searches for. The custom page title is 31 characters and says "Custom agents". Neither page uses the word "AI" once, while every page competing for this category is titled "AI agent development company" or "custom AI agent development". The brand is also crowded in search by CAST AI and Kastel, so a brand-first title wins nothing.

Keep the hero copy. The heading and the lede are the voice of the site and they stay as written. Change what a search engine matches on: the title, the description, and one subheading per page.

## Acceptance criteria

- [x] The home title leads with the work a buyer searches for, keeps the brand at the end, and stays under 60 characters.
- [x] The custom page title names custom AI agent development and stays under 60 characters.
- [x] Both descriptions are unique and under 160 characters. The custom page description is currently 181.
- [x] The phrase each page targets appears in its title, its description and at least one subheading.
- [x] The hero heading and lede on both pages are unchanged, and the words CONTEXT.md forbids stay out.

## Blocked by

- `01-page-records.md`

## Comments

Done in the same commit as this note.

**The phrase each page targets.** The home page targets "AI agent development", and its
title carries the longer phrase a buyer types, "AI agent development company", which is how
every competing page in this category is titled. The brand follows the phrase: CAST AI and
Kastel crowd the name in search, so leading with it spends the first fifteen characters of a
result on the one word that only a reader who already knows us types. The custom page targets
"custom AI agent development", the second phrase the category's results are titled with.
Neither phrase is a job name, a channel name or an explainer topic, so tickets 14, 15, 16 and
18 have the whole of those to choose from.

"Software factory on demand" is still the promise, and `CONTEXT.md` still fixes it. It is no
longer what a title leads with, and after this change no page states it in words: the unfurl
image in `src/app/opengraph-image.tsx` draws it, and that is the only place it is written.

`CONTEXT.md` gained one entry for "AI agent development", under `## The offer`, beside the
promise. The glossary is binding, and a phrase carrying both titles, both descriptions and
both price subheadings has to be in it. The entry says what the term is, the buyer's own name
for the work we sell, and its `_Avoid_` line keeps the copy out of the near-synonyms the
category is full of: AI development services, agentic AI, AI automation agency.

**Where each phrase sits, and what it measures.** A search result prints about 60 characters
of a title and about 160 of a description.

| Page | Title | Description | Subheading |
| --- | --- | --- | --- |
| Home | `AI agent development company \| KastProductions`, 46 | `An AI agent development company in Vilnius, Lithuania. We build one standing agent for one company, deploy it into your own accounts and keep it right.`, 151 | `What AI agent development costs`, was "How to work with us" |
| Custom | `Custom AI agent development \| KastProductions`, 45 (27 on the record) | `Custom AI agent development for work that matches nothing on a shelf. Describe it and get a short spec and a fixed price within one working day.`, 144 | `What custom AI agent development costs`, was "What a custom build costs" |

The counts are measured on what the export emits, not on the source strings, and
`tests/head.test.ts` now measures them on every indexable route: a title under 60, a
description under 160, and no two routes stating the same title or the same description. That
test was written first and run against a build of `defcb7e`, where the 181-character custom
description failed it. That was the red this ticket started from.

**Splitting the description from the lede.** `customPage.description` is its own sentence now.
The lede the page prints is unchanged at 181 characters: it opens a page for a reader, and a
search result cuts it. One string could not do both jobs.

**The hero copy is untouched.** Both pages were built at `defcb7e` and again after the change,
and every text node of `out/index.html` and `out/custom.html` compared. Three differences per
page in what a reader sees: the title, the description and the one subheading in the table
above. The h1 and the lede are byte-identical on both pages.

Four machine-facing strings follow the two records, because the records are the one place a
page's title and description are written. Both pages now state the new title and description
in `og:title`, `twitter:title`, `og:description` and `twitter:description`; `og:image:alt` and
`twitter:image:alt` read the home title, as they always have, and so does `name` in
`manifest.webmanifest`, where `short_name` stays "KastProductions". The unfurl image itself is
unchanged, so its alt text no longer repeats a line drawn in the picture. Whoever redraws that
image next should decide whether the alt should describe the picture rather than name the
site; `src/app/head-directives.ts` is where that one line lives, and this ticket names it a
non-goal.

**Words CONTEXT.md forbids.** All 91 `_Avoid_` terms in `CONTEXT.md`, the three new ones
included, were matched whole word and case-insensitive against the six new strings. No hit.
The word "AI" itself is not forbidden; only "AI factory", "AI employee" and "the AI" are, and
none of them appears.

Both page records carry `date: "2026-09-21"`, the day this copy changed.
