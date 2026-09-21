# The other four jobs each have a page

Status: done
Source: GitHub issue #22, opened on 2026-09-20.

## What to build

With the pattern settled, give the remaining four jobs their pages: backlog work, support triage, store operations, and the fifth job the home page lists. Each names its own systems and answers a different search than the others.

The risk in this batch is two pages competing for one phrase. Each page states the phrase it targets, and no two state the same one.

## Acceptance criteria

- [x] Each of the four jobs has a page that answers 200 and follows the established pattern.
- [x] Each names the systems it touches, states the authority and the approval gate, and invents nothing.
- [x] Each page states the phrase it targets, and no two pages target the same phrase.
- [x] Each is linked from the work section of the home page and is in the sitemap with its copy date.
- [x] Each carries its canonical URL, unfurl image and graph nodes, and the suite passes.

## Blocked by

- `14-first-job-page.md`

## Comments

The four pages, the phrase each targets, and who types it:

- `/content-publishing` targets **content publishing agent**: a content or marketing lead
  who writes briefs in Notion and wants the draft to arrive in the CMS without a writer in
  between.
- `/social-scheduling` targets **social scheduling agent**: whoever owns the company's
  social accounts and already queues posts in Typefully by hand.
- `/support-ticket-triage` targets **support ticket triage agent**: a support lead in
  Zendesk or Intercom whose team reads every ticket before it can be routed.
- `/shopify-operations` targets **Shopify operations agent**: the person who runs a Shopify
  store and checks stock, prices and stalled orders by hand each morning.

With ticket 14's **failed payment recovery agent**, the five head phrases are content
publishing, social scheduling, support ticket triage, Shopify operations and failed payment
recovery. None is "AI agent development" (home) or "custom AI agent development" (the door),
and none shares a head phrase with another, with the Slack page's "AI agent for Slack", the
catalogue's "issue to pull request", the about page's founder name, or ticket 18's explainer.

Decided, and the reasons:

- **The ticket 14 pattern held unchanged.** Four records on the jobs in `content.ts`, four
  four-line route files, and no edit to `src/components/job-page.tsx`, `job-rows.tsx`,
  `tests/links.test.ts` or any other test: `jobPages` reads the pages off `jobs`, so the
  sitemap, `llms.txt`, canonical, unfurl, graph and every suite check followed. The component
  draws a page with one system (Shopify) and a page whose authority is reads-and-reports as
  well as it draws the first, so nothing wanted generalising and nothing was abstracted.
- **The Shopify page's authority is "it reads and reports"**, because its row says the
  exceptions are watched and "brought to a person", and a row that says nothing about the
  agent acting is not expanded into one that acts. Its gate line says where the gate sits
  for such an agent: in front of every change, all of which a person makes in Shopify. The
  other three act behind an approval gate, and the gate sits before the outward action their
  row names: a published page, a queued post, a reply to a customer.
- **The support page reads "answered where the answer is known" as a reply drafted in the
  ticket that waits for a name**, because `mechanism` says every outward action waits for a
  named person and a reply reaches a customer. Filing an issue in the client's own
  repository crosses no gate, and the page says so. The row's words were left as they are:
  changing them changes the home page and the door, whose record dates are outside this
  ticket.
- **Every claim about a system is what its row already states or a plain description of
  reading and writing in it**: a brief in Notion, a draft and a queue in Typefully, a ticket
  in Zendesk or Intercom, an issue in GitHub, inventory, prices and orders in Shopify. No page
  names a client, a number or a result. Where an exception or a threshold appears, the page
  says it is the client's, written in the spec.
- **Each record's date is 2026-09-21**, the day its copy was written. The four descriptions
  lead with the phrase and are 148 to 159 characters, under the 160 the head suite holds.
