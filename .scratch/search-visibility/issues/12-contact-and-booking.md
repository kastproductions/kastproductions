# A visitor can book without writing an email

Status: done
Source: GitHub issue #19, opened on 2026-09-20.

## What to build

Every call to action on the site opens a mail client. The booking URL is deliberately empty, because a dead link costs more than a mailto, and the contact URL redirects to an anchor. A visitor who wants a call has to compose an email, and nobody can tell how many decide not to.

Give them a page with a real booking link on it, and the company details a buyer checks before sending money.

## Acceptance criteria

- [ ] A contact page answers 200 with a working booking link, the mailbox, and the company's legal identity and location. (Open on the booking link only: see Comments.)
- [x] The booking URL is configured in one place, and every "Book a call" uses it. The mailto stays only as the fallback when no URL is set.
- [x] The redirect from the retired contact URL is removed.
- [x] The page is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.

## Blocked by

- `01-page-records.md`

## Comments

**Why the first box stays open.** There is no booking tool. The owner's answer was that none exists yet, and a link to a vendor nobody has signed up with is a dead link. The page ships with the mailto fallback in the "Book a call" button, exactly as every other route.

**What the owner has to do to close it.** Open a booking page with whichever tool they choose, then set one constant in `src/app/content.ts`:

```ts
export const bookingUrl = "https://<the booking page>";
```

Build and deploy. Nothing else changes by hand. What changes by itself: `callHref` becomes that URL; every "Book a call" on every route (home hero, custom door hero, each job page hero, the contact page hero, and the footer on every page including the 404) points at it; the `mailto` analytics event stops counting that button, because a click on it leaves the site instead of opening a mail client. Then tick the box.

**The one source, proven.** `callHref = bookingUrl || mailtoFor("First call")` in `content.ts`; every "Book a call" is `href={callHref}` and `tests/contact.test.ts` fails any route whose "Book a call" points elsewhere. The grep over the built export, `bookingUrl` empty:

```
out/404.html  1 mailto:hello@kastproductions.com?subject=First%20call
out/_not-found.html  1 mailto:hello@kastproductions.com?subject=First%20call
out/contact.html  2 mailto:hello@kastproductions.com?subject=First%20call
out/custom.html  2 mailto:hello@kastproductions.com?subject=First%20call
out/failed-payment-recovery.html  2 mailto:hello@kastproductions.com?subject=First%20call
out/imprint.html  1 mailto:hello@kastproductions.com?subject=First%20call
out/index.html  2 mailto:hello@kastproductions.com?subject=First%20call
out/privacy.html  1 mailto:hello@kastproductions.com?subject=First%20call
out/terms.html  1 mailto:hello@kastproductions.com?subject=First%20call
```

The same grep with `bookingUrl = "https://example.com/book"` set locally, rebuilt, then reverted before the commit:

```
out/404.html  1 https://example.com/book
out/_not-found.html  1 https://example.com/book
out/contact.html  2 https://example.com/book
out/custom.html  2 https://example.com/book
out/failed-payment-recovery.html  2 https://example.com/book
out/imprint.html  1 https://example.com/book
out/index.html  2 https://example.com/book
out/privacy.html  1 https://example.com/book
out/terms.html  1 https://example.com/book
```

`tests/contact.test.ts` passed in both states.

**The page.** `/contact` is `contactPage` in `content.ts` plus `src/app/contact/page.tsx`. It prints: the mailbox; "Book a call" and "Write to us"; what follows a message (a spec and a fixed price within one working day, the prerequisites the spec names, and `leadTime`), all facts the site already prints; and who the reader is writing to, read from `company` (legal name, registration code, VAT number, registered address) and `location` (the studio's city), with a link to the imprint for the rest of the register entry. No address, name or number is retyped. Verified in `out/`: the file exists, the sitemap lists it with `lastmod` 2026-09-21, `llms.txt` lists it with its description, the canonical is `https://www.kastproductions.com/contact`, `og:image` is the site unfurl, and the graph carries its WebPage (with `dateModified`) and BreadcrumbList nodes and no Service node.

**The mail subject.** The page's own mailto, in the lede, in the "Write to us" button and in the Email row, carries the subject `Contact page` (`contactSubject` in `content.ts`), so the analytics `door` for a mail written from here is "Contact page". The "Book a call" fallback keeps "First call", which is the door that button is everywhere.

**Phrase the page targets:** "contact KastProductions". Title `Contact | KastProductions`.

**Reachability.** The footer's mailbox sentence on every page now ends with a link to the contact page, so the page is one click from every route and from the 404. `tests/contact.test.ts` holds that, and `tests/page-graph.test.ts` lists `contactPage` beside `legalPages` as a page that states no offer.

**Looked at** with `agent-browser` at 390 px and 1440 px. Session closed; `agent-browser session list` shows none of mine.

**Decided:**
- A page that prints no price is appended to `statesNoOffer` in `tests/page-graph.test.ts` beside `legalPages`, additively, one record per ticket.
- The contact page is not a legal page: it stays out of `legalPages` and the footer's legal nav, and is linked from the footer's mailbox sentence instead.
- `main.contact-page` gets the legal pages' hairline link style through the same CSS rule, with `.btn` excluded, so a button on the page stays a button.
