# Production counts visits

Status: done
Source: GitHub issue #11, opened on 2026-09-20.

## What to build

Production HTML carries no analytics at all. The analytics component renders only when its build variable is set, and the variable is not set on the deployment, so nothing measures organic traffic and no baseline exists to judge any of the work in this backlog against.

Every call to action on the site is a mailto link, so a click is the closest thing to a conversion the site can observe. Count those too.

Decide the tool before writing code. Cookieless analytics needs no consent banner. Google Analytics does, for an EU company serving EU visitors, and that banner is a second piece of work.

## Acceptance criteria

- [x] The choice between cookieless analytics and Google Analytics is recorded on this issue, with the consent consequence stated.
- [ ] Production HTML loads the chosen tool, and a page view from a real visit appears in its dashboard. The HTML half is done and shown below. The dashboard half is the owner's to confirm: the tracker refuses to run under automation, and only a deployment serves it.
- [x] A click on each call to action is recorded as an event that names the door it came from. Read the plan note below before judging the dashboard.
- [x] The tool loads after the page is interactive and does not change the Largest Contentful Paint of a cold mobile load.
- [ ] If Google Analytics is chosen, a consent banner gates it and no identifier is set before consent. Not applicable: Google Analytics was not chosen.

## Blocked by

- None (can start immediately).

## Comments

### The tool, and what it means for consent

Vercel Web Analytics, cookieless. The owner chose it because the site already deploys on Vercel, so the tracker is served by the deployment itself rather than by a third-party host.

The consent consequence: none. The tracker sets no cookie and stores nothing on the visitor's device, a visitor is identified by a hash of the incoming request, and the session that hash belongs to is discarded after 24 hours, so the site needs no consent banner and the banner work never starts. Google Analytics would have needed one, and the banner would have had to gate the script and set no identifier before consent. The facts a privacy policy has to state, and the Vercel page they come from, are written once in `README.md` under `## Analytics`, which is where ticket 13 should read them.

### What ships

`src/components/analytics.tsx` writes two tags into every emitted page: the queue stub Vercel documents for plain HTML, and a deferred `script` tag for `/_vercel/insights/script.js`. The Google Analytics path is gone, along with `NEXT_PUBLIC_GA_ID` and its README entry; the repository now reads no build variable at all.

The `@vercel/analytics` component was tried and rejected. It appends the tracker from an effect, which leaves the tag out of the HTML the build writes, adds a client chunk to a site that ships none, and puts the wiring beyond the reach of the suite, whose one seam is the export.

`src/app/layout.tsx` is unchanged: the component keeps its name and its import path.

The one change to `src/app/content.ts` is the three-line comment above `mailtoFor`, which claimed the mail subject was "our only analytics on this page". Nothing else in that file moved.

### The script tag, in every built page

```
$ grep -c 'insights/script.js' out/*.html
index.html: 1
custom.html: 1
404.html: 1
_not-found.html: 1

$ grep -o '<script defer[^>]*>' out/index.html
<script defer="" src="/_vercel/insights/script.js"></script>
```

`tests/analytics.test.ts` asserts the same thing per page, plus the click wiring, at the export seam.

### The events

One delegated click listener counts every `mailto:` link, rather than a handler at each of the six call sites. One event name, `mailto`, carrying `door` (the mail subject, which is how this site names the door a reader came through) and `page` (the path clicked from).

Clicked through the served export at a 390 px viewport, home page, one real mouse click on the header call to action and then every link in turn:

```
door "New brief"         page "/"   header and footer, Send us a brief
door "First call"        page "/"   hero and footer, Book a call
door "Custom agent"      page "/"   the custom price row, Describe the work
door "Sprint: one brief" page "/"   the Sprint price row, Start with a brief
door "address"           page "/"   the bare hello@ link in the footer
```

Seven links on the home page, five doors. The custom door in the home page's
door section is a `next/link` to `/custom` rather than a mailto, so it counts
nothing here and the page view on `/custom` records the move instead.

The custom page gives four of those doors with `page "/custom"`: New brief,
Custom agent (twice, the hero and the closing call), First call and address.
`Sprint: one brief` is a price row the home page alone prints. A click on any
other link, a nav link or a client's website, queues nothing.

Plan note: Vercel bills custom events to the Pro plan. Page views are counted on Hobby; events are not. The wiring is correct either way, and the owner's plan decides whether the dashboard shows the events.

### Largest Contentful Paint, cold mobile load

390 x 844 viewport, home page from the built export served locally, a fresh browser session per run so nothing is cached, five runs each, `agent-browser vitals`. The "after" runs were served the real tracker's bytes, so the download and parse are real.

```
before  192  208  256  272  284 ms   median 256
after   160  196  200  216  228 ms   median 200
```

The tool does not move it: the after runs sit inside the before band, the Largest Contentful Paint element is the hero lede in every run, and Cumulative Layout Shift is 0 with no shift entries. Deferred means the tracker is fetched alongside the document and executed only once the whole page is parsed, so it competes with nothing a reader waits for. `FirstPaintHolds` measured the same baseline band on the same page: 228 ms with no font delay, inside the band above.

### For the owner, in the Vercel dashboard

1. Turn Web Analytics on for the project. Until then `/_vercel/insights/script.js` is not served and nothing is counted.
2. Deploy, visit the site in a normal browser, and confirm the page view. This cannot be checked from here: the tracker reads `navigator.webdriver` and the user agent and refuses to run under automation, so no driven browser can produce a real page view.
3. Decide on Pro if the `mailto` events are wanted in the dashboard.

`Status: done` covers the code. These three steps need the owner's Vercel
account, and the second acceptance box stays unticked until step 2 is done. A
reader who wants that box ticked should run step 2 and tick it here, rather
than reopen the ticket.
