# Product

<!-- impeccable:product-schema 1 -->

The record of what the KastProductions site sells, to whom, and what it must never claim. It was written on 2026-11-19 by an agent from the repository and the site rewrite spec (`.scratch/site-rewrite/spec.md`), with no interview. A fact marked *(inferred)* comes from those documents and not from the owner; the owner can overturn any of them.

## Platform

web

## Users

The buyer is a person at a company who wants work taken off their team: a founder, a head of engineering, an operations or finance lead. They come to the site from a search for "AI agent development company", from a link a peer shared in Slack or on LinkedIn, or from the founder's own network. They read on a laptop at work or on a phone between meetings *(inferred)*. Their job on the site is to decide, in a few minutes, whether this company can build an agent for their work, what it costs, and who answers for it.

A second reader is a buyer who wants coding agents to work on their repository without owning an agent. The `/backlog` page serves them.

Crawlers, unfurl scrapers and answer engines are readers too. What they read from the built export is tested (ADR-0001).

## Product Purpose

KastProductions is a software agency in Vilnius, Lithuania, run by one founder. It builds one standing agent for one company, deploys it into that company's own accounts, and keeps it correct after it is live. The site exists to make a buyer write a brief. Success is a brief in the mailbox from a buyer who already knows what comes back: a spec and a fixed price within one working day.

## Positioning

The agent runs in the client's own accounts, with the client's keys, and the code belongs to the client. A named person at the client approves every outward action. A written definition of correct (the eval suite) runs on every change. The founder puts his name on the work and on every merge.

## Operating Context

A buyer takes a ready-made agent (issue to pull request) or has one built for their own work (custom). A build has a build price and a monthly price. The agent lives in the chat channels the team already uses, and systems such as GitHub, Stripe or Shopify can wake it. Calls to action are mailto links. There is no booking tool, and `bookingUrl` stays empty.

## Capabilities and Constraints

- The site is a Next.js 16 static export with Tailwind CSS v4 and shadcn/ui (ADR-0005). `bun run test` builds the site and tests the export.
- `src/app/content.ts` is the one source of every fact and of every word that more than one page prints (ADR-0004).
- Shipped copy is British English, in plain buyer language. The page says "agent". The internal terms in `CONTEXT.md` ("door", "standing agent", "station", "authority") stay off headings and calls to action.
- Every existing URL keeps working with the same canonical.

## Brand Commitments

- The name is KastProductions, written as one word. The legal name is in `company` in `content.ts`.
- The design is Signed off (ADR-0007): a white page, ink, and one signature blue for the places a person acts. Light only, and no drawn pictures: where a page needs one, it shows what the agent makes, labelled as an example. `DESIGN.md` records the system.
- Other people's names belong to them. Flue is named in text with a link, never as a logo.

## Evidence on Hand

- 17 client companies the founder shipped for, in `clients` in `content.ts`.
- 6 references with portraits, in `references` in `content.ts`, quoted as written.
- The prices, in `content.ts`.
- The channel lists, which are the channels Flue verifies.

There is no case study, metric, press mention or named client for any agent we have built. The agent console, the run record and the work table are synthetic and carry a visible "Example" label. Do not invent a figure, a testimonial or a case study, and do not put an invented number in a slot that reads as a statistic. See "Claims" in `README.md`.

## Product Principles

1. **A real person answers.** Every promise points to a named person: the approver at the client, the engineer who owns the agent, the founder who signs.
2. **State only what a reader can check.** Facts come from `content.ts`; examples say they are examples.
3. **The buyer's words, not ours.** A buyer must not have to learn a term before the argument makes sense.
4. **One offer at a time.** The home page sells the agent. Work on a backlog has its own page.

## Accessibility & Inclusion

WCAG AA: body text and controls meet AA contrast, focus is visible on every interactive element, every page has a skip link and a correct heading order, and every image has alt text. A reader whose system asks for dark mode gets the light page, fully legible. A reader who asks for reduced motion gets the end state at once.
