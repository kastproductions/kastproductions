# Vercel Web Analytics as plain tags, rendered on every build

Production measured nothing for months because the tracker was rendered behind a build-time condition. The site now counts visits with Vercel Web Analytics, and `src/components/analytics.tsx` writes the two tags Vercel documents for plain HTML, the queue stub and a deferred script for the first-party path `/_vercel/insights/script.js`, into every page, unconditionally. We do not use the `@vercel/analytics` component: it appends the tracker from an effect, which leaves the tag out of the built HTML, adds a client chunk to a site that ships none, and puts the wiring beyond the export seam ADR-0001 relies on. The trade-off is lock-in: the path only a Vercel deployment serves means another host loses analytics, and an ad blocker that blocks `/_vercel/insights/*` drops the visit, because the per-deployment path that avoids that needs the package and its build-time seed.

## Consequences

One delegated listener counts every `mailto:` click as one `mailto` event with a `door` field, so a call to action needs no handler of its own. Custom events need a Vercel Pro plan; on Hobby, page views are counted and the events are dropped, which is the owner's call to change.
