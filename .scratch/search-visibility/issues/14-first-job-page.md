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
- **Deliberately not abstracted:** the job row markup, which the home page and the custom door
  still each write out. The duplication was already there, and the link follows the record, so
  adding four more pages does not widen it. There is no nav entry for a job page either: five
  of them would crowd a header that holds three links.
