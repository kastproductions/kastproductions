# The company has a LinkedIn page the graph can cite

Status: ready-for-human
Source: GitHub issue #14, opened on 2026-09-20.

## What to build

The graph gives a search engine one way to corroborate that the company exists off this website: a GitHub organisation. For a company selling builds that start at ten thousand euro, that is thin. LinkedIn is the profile both a buyer and a crawler check, and it is the one missing.

Creating the page needs an account, so this one carries no agent label. The code change is one entry in the company profiles the graph cites, plus a footer link.

## Acceptance criteria

- [ ] A LinkedIn company page exists, names Vilnius, and links back to the site.
- [ ] Its URL is listed among the company profiles the organisation node cites.
- [ ] The footer links to it.
- [ ] The Rich Results Test reports the organisation node valid with both profiles present.

## Blocked by

- None (can start immediately).
