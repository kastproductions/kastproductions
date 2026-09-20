# The site publishes an llms.txt from its own page records

Status: ready-for-agent
Source: GitHub issue #24, opened on 2026-09-20.

## What to build

Answer engines read a site through a plain-text index when one exists. This one returns 404. With the page records in place the file is derived work: every indexable page already states its URL and its description.

Generate it, so a page added next month appears in it without anybody remembering.

## Acceptance criteria

- [ ] The llms.txt URL answers 200 as plain text and lists every indexable page with its absolute URL and one-line description.
- [ ] The file is generated from the page records, and adding a page needs no edit to it.
- [ ] Nothing that must not be indexed appears in it.
- [ ] The suite reads the built file and fails when a sitemap URL is missing from it.

## Blocked by

- `01-page-records.md`
