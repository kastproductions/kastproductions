# Production counts visits

Status: ready-for-agent
Source: GitHub issue #11, opened on 2026-09-20.

## What to build

Production HTML carries no analytics at all. The analytics component renders only when its build variable is set, and the variable is not set on the deployment, so nothing measures organic traffic and no baseline exists to judge any of the work in this backlog against.

Every call to action on the site is a mailto link, so a click is the closest thing to a conversion the site can observe. Count those too.

Decide the tool before writing code. Cookieless analytics needs no consent banner. Google Analytics does, for an EU company serving EU visitors, and that banner is a second piece of work.

## Acceptance criteria

- [ ] The choice between cookieless analytics and Google Analytics is recorded on this issue, with the consent consequence stated.
- [ ] Production HTML loads the chosen tool, and a page view from a real visit appears in its dashboard.
- [ ] A click on each call to action is recorded as an event that names the door it came from.
- [ ] The tool loads after the page is interactive and does not change the Largest Contentful Paint of a cold mobile load.
- [ ] If Google Analytics is chosen, a consent banner gates it and no identifier is set before consent.

## Blocked by

- None (can start immediately).
