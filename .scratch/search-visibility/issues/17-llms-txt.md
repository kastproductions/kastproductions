# The site publishes an llms.txt from its own page records

Status: done
Source: GitHub issue #24, opened on 2026-09-20.

## What to build

Answer engines read a site through a plain-text index when one exists. This one returns 404. With the page records in place the file is derived work: every indexable page already states its URL and its description.

Generate it, so a page added next month appears in it without anybody remembering.

## Acceptance criteria

- [x] The llms.txt URL answers 200 as plain text and lists every indexable page with its absolute URL and one-line description.
- [x] The file is generated from the page records, and adding a page needs no edit to it.
- [x] Nothing that must not be indexed appears in it.
- [x] The suite reads the built file and fails when a sitemap URL is missing from it.

## Blocked by

- `01-page-records.md`

## Comments

The generator is a route handler at `src/app/llms.txt/route.ts`, marked `dynamic = "force-static"`. That is how this framework writes a plain-text file at build time under a static export: it renders the handler once during `next build` and writes the body to a file named after the route, so the build emits `out/llms.txt` and no server is needed. The route reads `indexablePages`, the same list the sitemap walks and the same list whose records carry the metadata that asks a crawler to index a page, so a page we do not ask anyone to index is absent from this file without a second rule saying so. A page added next month appears here with no edit to the generator.

The built file after `bun run build`:

```
# KastProductions

> Software factory on demand in Vilnius, Lithuania. We build agents that work the way your company works, deploy them into your own accounts and keep them right.

## Pages

- [KastProductions: software factory on demand](https://www.kastproductions.com): Software factory on demand in Vilnius, Lithuania. We build agents that work the way your company works, deploy them into your own accounts and keep them right.
- [Custom agents](https://www.kastproductions.com/custom): No two companies work the same way, and the work you want taken over probably matches nothing on a shelf. Describe it. You get a short spec and a fixed price within one working day.
```

`file out/llms.txt` reports ASCII text.

Content type, measured rather than assumed. `next dev` answers `GET /llms.txt` with `200` and `content-type: text/plain; charset=utf-8`, which is the header the handler sets. A static host does not see that header, because the export writes bytes and not a response, so it reads the type off the file name. Serving `out/` and asking for the three files shows the rule: `/llms.txt` and `/robots.txt` both come back as `text/plain;charset=utf-8`, and `/opengraph-image`, which the framework writes with no extension, comes back as `application/octet-stream`. That is the fault `vercel.json` already fixes with a header, and `llms.txt` does not need one: it keeps its `.txt`. The README says so under `## Deployment`.

The suite is `tests/llms-txt.test.ts`, reading the built file at the one seam the suite has. It compares the URLs in `llms.txt` against the `<loc>` list in `sitemap.xml` as sets, so a page missing from either file fails, and it reads each line back against the description that page's record states. Proof that it binds: with the generator changed to `indexablePages.slice(0, 1)`, the rebuilt file lost `https://www.kastproductions.com/custom` and two of the three tests went red, naming that URL. Reverted, and `bun run test` passes with 55 tests. `bun run lint` is clean.

A two-axis review of the change against `defcb7e` raised no blocking finding. What it changed: the sitemap's URL list is read in three places now, so it became `sitemapUrls` in `tests/export.ts` and `tests/head.test.ts` calls it for the two sitemap tests it already had; the route handler is synchronous, the way `sitemap.ts` and `robots.ts` beside it are written. One finding was declined. The review read the H1 and summary assertions as pinning the generator's own template, while the convention is what they defend: a file with no heading and no sentence saying what the site is, is a file an answer engine has nothing to read the page list against, which this ticket asks for in as many words.

One term this change uses five times is not in `CONTEXT.md`: answer engine, the machine that reads this file. Ticket 10 uses it too. Nothing in the glossary contradicts it, and adding an entry is a `CONTEXT.md` edit that belongs to whoever owns the glossary rather than to this ticket.
