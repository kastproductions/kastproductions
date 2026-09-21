# One job page ranks for the work it names

Status: done
Source: GitHub issue #21, opened on 2026-09-20.

## What to build

The home page lists five jobs it takes, each naming the systems it touches, and each one is a phrase a buyer types into a search engine. None of them has a page. The whole site is two URLs, and a search engine has nothing to rank for anything but the brand.

Build the first one: failed-payment follow-up, which names Stripe and the outbox. This ticket settles the pattern as much as it ships the page, so the other four are mechanical after it.

## Acceptance criteria

- [x] A page for failed-payment follow-up answers 200, names the systems it touches, states the authority the agent holds and where the approval gate sits.
- [x] It prints no price the custom door does not already print, and invents no client or result.
- [x] Its title and description target the phrase a buyer searches, while the heading reads in the site's own voice.
- [x] It is linked from the work section of the home page and from the custom page, and it links back to the custom door.
- [x] It is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.
- [x] The pattern is one record plus one route file, and the README states it.

## Blocked by

- `01-page-records.md`
- `08-titles-and-descriptions.md`

## Comments

The page is `/failed-payment-recovery`, and the phrase it targets is **failed payment
recovery agent**. The head phrase inside it, "failed payment recovery", is what a buyer types;
"agent" is the category we sell. It competes with neither "AI agent development" (home) nor
"custom AI agent development" (the custom door), and it leaves ticket 15 the same shape for
the other four jobs, each on its own systems: a content publishing agent for brief to
published post, a social scheduling agent for draft and schedule, a support ticket triage
agent for support triage, and a store operations agent for Shopify. No two of those share a
head phrase.

Decided, and the reasons:

- **A job page is the job's own record plus one route file.** `JobPage` is a `PageRecord` with
  the words the page prints added to it, and it hangs off the job in `jobs` as `page`. So the
  path, title, description and date are written once, `jobPages` reads them off `jobs`, and
  `indexablePages` carries them: the sitemap entry, the `llms.txt` line, the canonical, the
  unfurl and the graph nodes all followed with no further edit, exactly as they do for a page
  we write by hand. A job with no page is a row on the two lists and nothing more.
- **The markup is shared, in `src/components/job-page.tsx`.** The five jobs are one shape: a
  reader who arrives from a search asks the same questions in the same order. Five
  hand-written pages would drift a word at a time, which is the fault `ProductPage` already
  avoids for a product. Ticket 15 writes four records and four four-line route files, and no
  markup.
- **The page prints the custom door's prices, read from `custom.prices`.** A job we shape an
  agent around is custom work, so a price of its own would be a number the door does not
  state, and the graph states the same two floors the page prints.
- **Authority: it acts behind an approval gate**, and the gate sits before a message leaves the
  company, because a sent follow-up is an outward action.
- **The rows are shared too, in `src/components/job-rows.tsx`.** The home page and the custom
  door print one list, and the link to a job page is a condition inside a row, so the row
  markup stopped being written twice. `channels-section.tsx` is the precedent.
- **Deliberately not abstracted:** the pricing band's `.plan` markup, which the custom door
  also writes. It is the design's own instrument, and the two bands now say different things,
  so what is shared is `custom.prices` and nothing else. There is no nav entry for a job page
  either: five of them would crowd a header that holds three links. And `pricesFor` in
  `tests/page-graph.test.ts` keeps one branch per kind of page rather than reading a `prices`
  field off a record, because a job page has no price of its own to read.

The two-axis review of `af9893e...HEAD` ran after the first commit. What it found, and the
answer:

- **The description did not carry the phrase the page targets.** True, and now it does: it
  leads with "Failed payment recovery", the way a result is read left to right.
- **The README claimed every word of a job page lives in `content.ts`, while the component
  hard-codes the section headings and the prose the five pages share.** The claim was the part
  that was wrong. The README now says every word of both doors and of every job we take is in
  `content.ts`, and that the prose a shared component prints on every page of a kind is not.
- **The job page re-explained the floor and the month, which the custom door already
  explains.** Cut. The band now states which price list the job is on, prints the two floors,
  and hands the reader to the door for the rest.
- **CONTEXT.md fixed no meaning for "job", which only appeared as a word to avoid for a
  session.** A **Job** entry now fixes it, and says it is never one session's work.
- **`JobPage` names both the record and the component, which forces an alias in
  `job-page.tsx`.** Kept: the record is the job's page, and renaming it to fit the component
  would cost the name everywhere else. The alias is commented where it happens.
- **Comments pointed at the README's "Adding a page" section for a pattern the new "A job
  page" section describes.** Repointed.
