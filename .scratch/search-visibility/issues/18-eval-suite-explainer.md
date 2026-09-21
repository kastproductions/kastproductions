# The first explainer: what an eval suite is

Status: done
Source: GitHub issue #25, opened on 2026-09-20.

## What to build

Every competitor page found in the category SERP sells autonomous agents and says nothing about how anybody knows the agent is right. This site has the answer written into its mechanism: a written definition of correct, run on every change, and the honesty to say when correct cannot be written down. That is the one topic here with no competition on the search results page.

Write it as a page, not as a sales section.

## Acceptance criteria

- [x] A page explains what an eval suite is, how it runs on every change, and what happens when correct cannot be written down for a task.
- [x] It uses the vocabulary CONTEXT.md fixes, and invents no case study, metric or client.
- [x] Its title and description target the phrase a reader searches, and the heading reads in the site's voice.
- [x] It is linked from the mechanism section of the home page.
- [x] It is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.

## Blocked by

- `01-page-records.md`

## Comments

The page is `/eval-suite`, and the phrase it targets is **AI agent eval suite**. A buyer who
has been offered an autonomous agent and asks how anyone knows it is right types the word
the field uses for that answer, "eval", and every competing page in the category SERP sells
the agent and says nothing about it. "AI agent" is the category, so the phrase collides with
neither "AI agent development" (home) nor "custom AI agent development" (the custom door)
nor any job page. The title is "AI agent eval suite: what correct means", 57 characters with
the brand; the heading on the page is "How we know your agent is right", in the voice of
"How we keep it right" on the home page. `CONTEXT.md` avoids "tests", "benchmarks" and "QA"
for the suite, and the page uses none of them.

Decided, and the reasons:

- **The price-free page list lives in `content.ts`, as `explainerPages`.** It holds
  `evalSuitePage`, `writtenPages` spreads it after `legalPages`, and `statesNoOffer` in
  `tests/page-graph.test.ts` is `[...legalPages, ...explainerPages]`. The ticket named the
  alternative, `[...legalPages, evalSuitePage]` in the test, and it was not taken because the
  ticket calls this "the first explainer": a second one would then be a test edit as well as a
  record, which is the one thing the README says adding a page never is. The list is named
  for what the pages are, not for what the suite checks. `legalPages` was left alone: that
  list is the footer.
- **The words of the page are in the route file**, as on the three legal pages, and not in
  `content.ts`: the README keeps the content module for the doors, the jobs and the facts,
  and an explainer shares its prose with no other page. Only the words the home page links
  with, `mechanismIntro.more`, are in `content.ts`, because the home page prints them.
- **The link is a `.pull` after the five rows of the mechanism section**, as the stack
  section links the Flue documentation, rather than under the eval suite row. A row cannot
  carry the record: `mechanism` is evaluated before the page records at the foot of the
  file, so a reference from the row would read `evalSuitePage` before it exists. The path
  comes off the record in `page.tsx`, so it is still written once.
- **The page carries no call to action of its own** and no price band: it sells nothing, so
  its graph has a WebPage and a BreadcrumbList and no Service. Its one onward link leads to
  `/#mechanism`, the other four parts. The site footer's "Bring us a brief" band is shared
  chrome and stays.
- **The amber on the page is spent twice**, both on the meaning the design gives it: the
  gate note (`.note--gate`) marks the paragraph where the work stops for a named person, and
  the underline on the one link that leads somewhere. No mono, no card, no shadow.
- **`tests/links.test.ts` holds the link**: the explainer is linked from the home page's
  `#mechanism` section, read from the export. A home page edit that dropped the link would
  leave the page an orphan with nothing else saying so, which is the fault that file exists
  for.
- **Claims.** Every sentence on the page describes the mechanism the home page, the terms
  and the questions already state: one suite per agent, run on every change, a failing suite
  stops the change, changes approved inside the agent's own repository and deployment, the
  monthly report, the gate before every outward action, the spend cap, and the approval
  policy we write. The three examples of unwritten work (a reply's tone, a fair refund, a
  choice between two plans) are examples, not cases. One sentence was cut for reading as an
  outcome claim: "it seemed fine, until the day it did not", after "An agent judged on work
  like that is judged on nothing", because it implied a history of failures the site has no
  record of.
- **Verified against `out/`:** `/eval-suite` builds, the sitemap lists it with `2026-09-21`,
  `llms.txt` carries its line, the head states the canonical, the unfurl image and
  `index, follow`, and the graph carries WebPage (dated), BreadcrumbList, no Service. Looked
  at with `agent-browser` at 390 px and 1440 px: no horizontal overflow, layout shift 0 over
  2.5 s with fonts loaded, one hairline per divider. Sessions closed; `session list` empty.
