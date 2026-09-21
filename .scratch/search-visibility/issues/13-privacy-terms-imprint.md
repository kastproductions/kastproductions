# The site states how it handles data

Status: done
Source: GitHub issue #20, opened on 2026-09-20.

## What to build

The site publishes no privacy policy, no terms and no imprint. It is an EU company, it collects an email address through every call to action, and it is about to start measuring visits. A buyer of a ten thousand euro build looks for these pages before a first call, and a search engine reads their absence as a trust signal.

## Acceptance criteria

- [x] A privacy page names the analytics processor chosen, the mailbox, what is collected, the lawful basis, and how a visitor asks for deletion.
- [x] Terms of service are published, stating what a build buys and what the monthly work covers, consistent with the prices the site prints.
- [x] The imprint details an EU buyer expects are published: legal name, registered address, registration number, and VAT number where one applies.
- [x] The footer links every one of them.
- [x] Each page is in the sitemap with its copy date, and carries its canonical URL and graph nodes.

## Blocked by

- `01-page-records.md`
- `04-production-analytics.md`

## Comments

Three pages, three records, one route file each: `/privacy`, `/terms`, `/imprint`, all dated
`2026-09-21`. They are in `writtenPages`, so the sitemap, the canonical, the unfurl fields and
the graph nodes follow with no further edit, and the suite walks them. They stay out of the
header, because the header carries doors and these sell nothing; `SiteFooter` links all three
from every page, the 404 included.

**Where each fact on the imprint came from.** All six live in `company` in
`src/app/content.ts`, which cites the register entry the owner pointed at:

| Line | Source |
| --- | --- |
| Legal name, `Kast productions, MB` | The register entry at https://rekvizitai.vz.lt/en/company/kast_productions/ |
| Legal form, `mažoji bendrija, a Lithuanian small partnership` | The gloss the ticket gives for the `MB` in the legal name |
| Registration code, `305830693` | The same register entry |
| VAT number, `LT100020218411` | The same register entry |
| Registered address, `Mokyklos g. 13, Verstaminų k., Lazdijų r., Lithuania` | The same register entry |
| Director, `Karolis Stulgys` | The same register entry, and already in `content.ts` as `founder`, so the imprint reads `founder` rather than holding a second copy of the name |
| Email, `hello@kastproductions.com` | `contactEmail` in `content.ts`, the mailbox the whole site already uses |

**Vilnius against the registered address.** The copy says the studio is in Vilnius and the
register holds an address in the Lazdijai district. The imprint states the registered address
only and never mentions Vilnius, the marketing copy was left alone, and `company` carries the
comment explaining why the two differ. The footer sentence "Software development agency in
Vilnius, Lithuania." in `src/components/site-chrome.tsx` is the one a later ticket changes if
the owner wants the two to agree.

**What was deliberately left off.** A named supervisory authority, a governing law, a fixed
retention period for mail, and the name of whoever runs the mailbox. Each is a legal fact the
register does not hold and the repository does not state, and the ticket's rule is that
inventing one is worse than omitting it. The privacy page states the retention it can state:
the analytics hash dies after 24 hours, a mail thread is deleted on request, and what the host
keeps of a request is left to Vercel's own privacy notice, which the page links rather than
summarises. Each of the four is the owner's to decide before the site states it.

**Analytics, as the deployment stands.** The privacy page names Vercel Inc. as the processor
and as the host, says the tracker sets no cookie and stores nothing on the device, links
Vercel's privacy documentation as the list of what a visit keeps, and says a click on a mail
link reports an event that the plan this project runs on does not retain. It names no plan:
the plan changes, and the sentence stays true either way.

**Terms.** They read the prices, not a copy of them. `openPrices` moved into `content.ts` from
`src/app/page.tsx`, so the home page and the terms page print the same list and a way to buy
that waits on the catalogue stays off both. The lead time comes from `leadTime`. Build,
Operate, Self-run, Managed and Sprint are used as `CONTEXT.md` fixes them. Self-run and
Managed are given as the two words an order uses, not as two things to buy, because neither
is priced on the site while the catalogue is empty.

**Tests.** `tests/legal.test.ts`, at the export seam: every emitted page links all three from
its footer, the imprint prints every field `company` holds, and the privacy page gives the
mailbox. `pricesFor` in `tests/page-graph.test.ts` reads `statesNoOffer`, so a page that
prints a price list without selling the one thing is answered for rather than throwing.

**What the review changed.** `legalPages` is exported from `content.ts` and read by the
footer, `writtenPages` and both suites, rather than rebuilt in each. `.legal a` gives the
prose links on these pages the treatment every other prose link on the site has, since the
browser default was neither documented colour. Three sentences went because nobody can point
at a source for them: a fixed price that "does not move unless you change the brief", a
prerequisite list printed beside a price that prints none, and "We pass it to nobody" about
mail that a provider necessarily holds. An assertion on the literal string "Vercel" went too:
it pinned copy, which `README.md` says a suite is not for.
