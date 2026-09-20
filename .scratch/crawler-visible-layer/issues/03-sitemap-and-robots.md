# The sitemap and the robots file state facts

Status: done
Source: GitHub issue #4, published and closed on 2026-09-13.

## Parent

`../spec.md`

## What to build

The sitemap stamps every URL with the build time, so each deploy tells a crawler that every page changed. A crawler that learns the dates are worthless stops recrawling on them. The robots file also carries a `Host` directive, which only Yandex reads.

The sitemap starts stating facts. A date moves into the content module, one per route and one per product record, edited when the page copy changes. A route whose date nobody maintains carries no date at all, which beats a wrong one. `changeFrequency` and `priority` go, because Google ignores both.

A product record carries its own date, so a product that enters the catalogue brings its date and its sitemap entry with it.

The robots file drops `Host` and keeps the allow rule and the sitemap reference.

## Acceptance criteria

- [ ] Each sitemap entry carries a date owned by the content module, or carries no date.
- [ ] No sitemap entry carries the build time. Two builds of the same source emit the same sitemap.
- [ ] The sitemap emits no `changefreq` and no `priority`.
- [ ] A product record holds its own date, and a product added to the catalogue needs no sitemap edit.
- [ ] The robots file carries no `Host` directive, and still allows crawling and names the sitemap.
- [ ] The suite asserts the above against the emitted sitemap and robots file, in its own spec file.

## Blocked by

- `01-built-export-suite.md`
