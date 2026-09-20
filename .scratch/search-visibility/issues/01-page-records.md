# A written page is one record

Status: ready-for-agent
Source: GitHub issue #8, opened on 2026-09-20.

## What to build

Adding a page to this site currently means writing the same block three times: the metadata with its canonical URL, robots directive and unfurl image; the entry that puts the page in the sitemap with the day its copy last changed; and the call that gives the page its own node in the graph. Five new pages are queued behind this ticket, so the repetition is about to be paid five times over.

Make a written page one record. The record states the path, the title, the description and the copy date. Everything a machine reads about that page is derived from it. A reader and a crawler see no change today; the next five pages each cost one record and one route file.

## Acceptance criteria

- [ ] A written page states its path, title, description and copy date in one place, and nothing else restates any of them.
- [ ] Canonical URL, indexing directive, unfurl image, Open Graph fields and Twitter fields are derived from that record for every written page.
- [ ] The sitemap entry and the page's own graph nodes read the same record.
- [ ] The home page and the custom page produce the same crawler-visible output as before the change, and the suite passes.
- [ ] Adding a page takes one record and one route file, and the README says so.

## Blocked by

- None (can start immediately).
