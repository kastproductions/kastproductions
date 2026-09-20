# The graph states dates, questions and the prices the home page prints

Status: ready-for-agent
Source: GitHub issue #17, opened on 2026-09-20.

## What to build

The graph is sound: the organisation, the founder, the site, a node per page, and a service with offers on the custom door. Four things are missing from it.

No page node says when its copy last changed, although the record already holds that date. The ten questions answered on the home page are not marked as questions, so no answer engine can lift them. The home page prints four price plans and offers none of them, while the custom page offers its two. And the home page's own node spells the site URL without the trailing slash that every other node uses.

## Acceptance criteria

- [ ] Every page node states the date its copy last changed, taken from the page record rather than the build clock.
- [ ] The ten first-call questions are marked up as questions and answers, word for word as the page prints them.
- [ ] The four price plans on the home page are offered as a service with an offer each, priced as floors, the way the custom page already does it.
- [ ] Every identifier in the graph spells the site URL one way.
- [ ] The Rich Results Test reports no error on the home page and the custom page.

## Blocked by

- `01-page-records.md`
