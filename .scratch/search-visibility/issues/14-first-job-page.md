# One job page ranks for the work it names

Status: ready-for-agent
Source: GitHub issue #21, opened on 2026-09-20.

## What to build

The home page lists five jobs it takes, each naming the systems it touches, and each one is a phrase a buyer types into a search engine. None of them has a page. The whole site is two URLs, and a search engine has nothing to rank for anything but the brand.

Build the first one: failed-payment follow-up, which names Stripe and the outbox. This ticket settles the pattern as much as it ships the page, so the other four are mechanical after it.

## Acceptance criteria

- [ ] A page for failed-payment follow-up answers 200, names the systems it touches, states the authority the agent holds and where the approval gate sits.
- [ ] It prints no price the custom door does not already print, and invents no client or result.
- [ ] Its title and description target the phrase a buyer searches, while the heading reads in the site's own voice.
- [ ] It is linked from the work section of the home page and from the custom page, and it links back to the custom door.
- [ ] It is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.
- [ ] The pattern is one record plus one route file, and the README states it.

## Blocked by

- `01-page-records.md`
- `08-titles-and-descriptions.md`
