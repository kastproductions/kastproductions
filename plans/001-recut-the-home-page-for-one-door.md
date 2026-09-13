# Plan 001: Re-cut the home page so one door reads as a choice made, not a grid that failed to fill

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**:
> `git diff --stat ab8e0ff..HEAD -- src/app/content.ts src/app/page.tsx src/app/custom/page.tsx src/app/globals.css src/components/product-page.tsx README.md`
> If any of those files changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. On a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `ab8e0ff`, 2026-09-13

## Why this matters

The home page has a section headed "Where your agent starts". It promises a
choice of doors, and the hero sends the reader to it with a button that says
"See where your agent starts". Today the section renders one card, because the
ready-made door waits on a product catalogue that is empty. A reader meets a
heading about choice, one option, and half a row of empty space, and reads a
page that is broken rather than a company that has made a decision.

The same empty catalogue hides two other things. The home page never names a
job an agent can take, and it never names a channel an agent lives in. Both
lists exist in the content module and both render only on `/custom`, which is
one click further in. The price list also leads with Sprint, whose own body
says "Nothing is deployed and nothing is connected", so the first price a
reader meets is the one that does not deliver what the page sells.

After this plan the home page answers the reader's question in order: what this
is, whether we take work like theirs, what we shape the agent around, where it
lives, how we keep it right, who stands behind it, what it costs. The single
door closes the work section instead of standing in for it.

## Current state

### Files

- `src/app/content.ts` — every user-visible word. The catalogue flag lives here.
- `src/app/page.tsx` — the home page markup and its section order.
- `src/app/custom/page.tsx` — the custom door page.
- `src/components/product-page.tsx` — a ready-made product page. No route file
  calls it today, so it does not build into a page. It is in scope only because
  step 2 removes a block it duplicates.
- `src/app/globals.css` — every style. Hand-written, no framework.
- `README.md` — describes the project structure; two lines of it go stale here.

### Why one door renders

`src/app/content.ts:337`:

```ts
export const products: Product[] = [];
```

`src/app/page.tsx:46-49`:

```tsx
/* A door and a price that depend on a ready-made product stay off the page
 * until one runs. See the Catalogue entry in CONTEXT.md. */
const openDoors = doors.filter((door) => !door.catalogue || products.length > 0);
const openPrices = prices.filter((plan) => !plan.catalogue || products.length > 0);
```

`doors[0]` carries `catalogue: true` (`src/app/content.ts:140`), so only
`doors[1]`, the custom door, survives the filter.

**This plan does not change that rule and does not add a product.** Both are
correct. `CONTEXT.md` states the catalogue "holds only a product that runs
today", and the filter is what keeps that true. The plan changes what the page
reads like while the catalogue is empty, and leaves the two-door layout intact
for the day a product enters it.

### The section being replaced

`src/app/page.tsx:96-119`:

```tsx
<section className="section" id="doors" aria-labelledby="doors-title">
  <div className="wrap">
    <div className="section__head">
      <h2 id="doors-title">Where your agent starts</h2>
      <p>
        Every build ends the same way: one standing agent, deployed
        into your own accounts, answering to one name in a channel your
        team already has open.
      </p>
    </div>
    <ul className="doors">
      {openDoors.map((door) => (
        <li className="door" key={door.name}>
          <h3>{door.name}</h3>
          <p className="door__promise">{door.promise}</p>
          <p>{door.body}</p>
          <Link className="door__more" href={door.href}>
            {door.more}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</section>
```

### The hero button that points at it

`src/app/page.tsx:70-72`:

```tsx
<a className="button button--ghost" href="#doors">
  See where your agent starts
</a>
```

### The five jobs, currently reachable only from `/custom`

`src/app/content.ts:375-404`, inside the `custom` object:

```ts
  jobsHeading: "Work we take",
  jobsLede:
    "Five jobs we take, to measure your own against. Each one names the systems it touches. None of them is a product you can buy today, and none carries a price until we have read your workflow.",
  jobs: [
    {
      title: "Brief to published post",
      systems: "Notion, your CMS",
      body: "A brief goes in, a drafted and edited page comes back, and publishing waits for a name.",
    },
    ... four more ...
  ],
```

### The channels block, written once and pasted three times

The same 31 lines of JSX appear at `src/app/custom/page.tsx:84-114` and
`src/components/product-page.tsx:171-201`. Here is the first:

```tsx
<section className="section" id="channels" aria-labelledby="channels-title">
  <div className="wrap">
    <div className="section__head">
      <h2 id="channels-title">{channels.heading}</h2>
      <p>{channels.lede}</p>
    </div>
    <div className="split">
      <div className="pair">
        <h3>Reachable in</h3>
        <ul className="chips">
          {channels.reachable.map((channel) => (
            <li className="chip chip--strong" key={channel}>
              {channel}
            </li>
          ))}
        </ul>
        <p className="note">{channels.teamsNote}</p>
      </div>
      <div className="pair">
        <h3>Woken by events from</h3>
        <ul className="chips">
          {channels.events.map((source) => (
            <li className="chip" key={source}>
              {source}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
```

The two copies are identical apart from whitespace. Confirm that before step 2.

### The price list

`src/app/content.ts:420-423`:

```ts
export const pricingIntro = {
  heading: "How to work with us",
  lede: "Add it up before you call. A build price is a floor, because the work follows the number of systems your agent touches. Every monthly price buys the evals, the changes and the report.",
};
```

`prices` (`src/app/content.ts:425-486`) holds four plans in this order: Sprint,
Self-run, Managed, Custom agent. Self-run and Managed carry `catalogue: true`
(lines 454 and 469), so the live list is Sprint then Custom agent. Sprint's
body, `src/app/content.ts:428`:

```ts
    body: "One brief, two weeks, one fixed price. Our own agents work it on your repository, and our reviewer signs the merge. Nothing is deployed and nothing is connected, so there is nothing for you to own yet.",
```

### Styles you will reuse

`src/app/globals.css:336-341` — the two-column label and body rows used by the
fit section, the mechanism section and the jobs on `/custom`:

```css
.specs { display: grid; gap: 1.75rem; }
.spec { display: grid; gap: .4rem; align-content: start; }
.spec p { color: var(--ink-2); }
.spec__meta { font-family: var(--font-mono); font-size: .85rem; color: var(--ink-2); }
```

At 720px and wider (`src/app/globals.css:656-657`) a `.spec` becomes
`grid-template-columns: 14rem minmax(0, 1fr)`, so its first child sits in the
label column and its second child in the body column.

`src/app/globals.css:574-582`:

```css
/* The doors, in short, on the home page */
.doors {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}
```

### Conventions to match

- **Copy lives in `src/app/content.ts`.** A page file holds markup. Strings that
  a reader sees go in the content module, except short connecting sentences
  already written inline in a page file. Follow what each file already does.
- **Comment style.** Block comments above an export say why the thing exists,
  not what the code does. Read `src/app/content.ts:110-124` and
  `src/app/page.tsx:46-49` for the register. Match it. Write nothing that
  restates the code.
- **Components.** A block shared by more than one page becomes a named export in
  `src/components/`. `src/components/mention-card.tsx` is the shortest example:
  a file-level block comment, one exported function, no props.
- **British spelling**, sentence case in headings, no title case, no exclamation
  marks, no em dashes in copy.

### Vocabulary you must honour

These come from `CONTEXT.md`, the project's glossary. The executor has not read
it, so the lines that bind this plan are quoted here.

- **Standing agent**: "An agent we build for a client. It runs unattended in the
  client's systems until someone turns it off." Avoid: bot, assistant, AI
  employee.
- **Custom**: "The door for a client whose work matches nothing we have built."
  Avoid: bespoke, enterprise, one-off.
- **Catalogue**: "The list of ready-made products. It holds only a product that
  runs today. A job we have not built yet belongs to the custom door." Avoid:
  marketplace, store, library, gallery.
- **Channel**: "The place a standing agent is reachable, which is a place the
  client's team already works." Avoid: integration, interface, front end, chat
  bot.
- **Product**: "One thing we sell, named by the outcome it delivers." Avoid:
  solution, package, offering, app, template.

Two settled decisions also bind this plan. Do not reopen either.

1. **The claim order is fit, then convenience, then correctness.** Fit is the
   promise, convenience is where the agent is reachable, correctness is the
   mechanism that proves the promise. This is why step 5 puts the channels
   section between the fit section and the mechanism section, and not anywhere
   else.
2. **Nothing on the page may imply a product exists when it does not.** The
   five jobs are work we take, never items in a catalogue. Any new sentence
   about them must keep that distinction, as `custom.jobsLede` already does.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `bun install` | exit 0 |
| Lint | `bun run lint` | exit 0, no warnings |
| Typecheck | `bunx tsc --noEmit` | exit 0, no output |
| Build and test | `bun run test` | build succeeds, all tests pass |
| Look at the page | `bun run dev`, then open `http://localhost:3000` | page renders |

`bun run test` runs `next build && bun test`. The build renders the Open Graph
image, which fetches a font from Google Fonts, so the machine needs network
access. A build that fails on a font fetch is an environment problem, not your
change.

## Scope

**In scope** (the only files you may modify):

- `src/app/content.ts`
- `src/app/page.tsx`
- `src/app/custom/page.tsx`
- `src/components/product-page.tsx`
- `src/components/channels-section.tsx` (create)
- `src/app/globals.css`
- `README.md`
- `plans/README.md` (status row only)

**Out of scope** (do not touch, however related they look):

- `src/app/structured-data.ts`, `src/app/head-directives.ts`,
  `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`,
  `src/app/opengraph-image.tsx`, `src/app/layout.tsx`. This plan changes what a
  reader sees. It changes nothing a crawler is told, beyond the two dates in
  step 7.
- `tests/`. The suite reads the built export and asserts what a crawler sees. It
  pins no copy on purpose, so correct work here needs no test edit. If a test
  fails, that is a signal, not a thing to edit.
- `products` at `src/app/content.ts:337`. Leave the array empty. Publishing the
  ready-made product is a business decision and a separate piece of work.
- The six reference quotes at `src/app/content.ts:65-108`. They are quoted as
  written from third parties and must not be edited, reordered or trimmed.
- Any price number. The numbers are real and the structured-data graph reads
  them back out of these strings. Step 6 reorders plans and rewrites one body
  sentence. It changes no digit and no currency.
- `vercel.json`. See the hard constraint below.

**Hard constraint.** `vercel.json:5` holds a permanent redirect from `/work` to
`/#doors`. The section you rewrite in step 3 must keep `id="doors"` and
`aria-labelledby="doors-title"`, and the hero button must keep `href="#doors"`.
Only the text changes. If you believe the id must change, that is a STOP
condition.

## Git workflow

- Branch: `advisor/001-recut-home-one-door`
- Conventional commits, lower case after the type, present tense. Recent
  examples from this repo: `feat: replace the standing agents page with two
  doors`, `copy: lead with the offer and rescale the prices`, `refactor: state
  each crawler fact once`. A `copy:` type is in use here for copy-only changes.
- One commit per step is fine. Do not push and do not open a pull request
  unless the operator asked for it.

## Steps

### Step 1: Lift the five jobs out of the custom door

The five jobs become an index on the home page and stay as a detailed list on
`/custom`, so the array must live at the top level of the content module rather
than inside the `custom` object.

In `src/app/content.ts`, directly above the `/* ----- The custom door -----` comment
block at line 368, add:

```ts
/* The five jobs. The home page indexes them by title and systems; the custom
 * door describes each one. None of them is in the catalogue: each is work we
 * shape an agent around once we have read the client's workflow. */
export type Job = { title: string; systems: string; body: string };

export const jobs: Job[] = [
```

Move the five job objects from `custom.jobs` into this array, unchanged. Every
title, every `systems` string and every `body` string stays exactly as written.

Then delete the `jobs:` field from the `custom` object. Keep `jobsHeading` and
`jobsLede` where they are: those are the custom page's framing of the list, not
the list.

In `src/app/custom/page.tsx`, add `jobs` to the import from `"../content"` and
change the map at line 71 from `custom.jobs.map(...)` to `jobs.map(...)`. Change
nothing else in that file in this step.

**Verify**: `bunx tsc --noEmit` → exit 0, no output.

**Verify**: `grep -n "custom.jobs\b" -r src/` → no matches.

### Step 2: Make the channels block one component

Create `src/components/channels-section.tsx`:

```tsx
import { channels } from "@/app/content";

/*
 * Where a standing agent is reachable, and what wakes it. Both lists are what
 * Flue verifies, so a reader can check them, which is the reason the section
 * prints names rather than a count. Every page that describes an agent shows
 * it, so it lives here rather than in three page files.
 */
export function ChannelsSection() {
  return (
    // the section element exactly as it stands in src/app/custom/page.tsx:84-114
  );
}
```

Paste the markup from `src/app/custom/page.tsx:84-114` into the return, with no
change to the elements, the class names, the `id` or the `aria-labelledby`.

Then replace the inline block with `<ChannelsSection />` in both
`src/app/custom/page.tsx` and `src/components/product-page.tsx`, and remove the
now-unused `channels` import from each of those two files.

**Verify**: `bunx tsc --noEmit` → exit 0.

**Verify**: `bun run lint` → exit 0, and in particular no unused-import warning.

**Verify**: `grep -c "channels-title" src/app/custom/page.tsx src/components/product-page.tsx`
→ `0` for both files.

### Step 3: Rewrite the doors section as the work section

Add to `src/app/content.ts`, directly above the `jobs` array you created in step
1:

```ts
export const jobsIntro = {
  heading: "Work we take off your team",
  lede: "Five jobs, with the systems each one touches. None is a product on a shelf: we build the agent for the company that asks. Your work does not have to be on this list.",
};
```

In `src/app/page.tsx`, import `jobs` and `jobsIntro` from `"./content"`, keeping
the import list alphabetical as it already is, and replace lines 96-119 with:

```tsx
<section className="section" id="doors" aria-labelledby="doors-title">
  <div className="wrap">
    <div className="section__head">
      <h2 id="doors-title">{jobsIntro.heading}</h2>
      <p>{jobsIntro.lede}</p>
    </div>
    <div className="specs">
      {jobs.map((job) => (
        <div className="spec" key={job.title}>
          <h3>{job.title}</h3>
          <p>{job.systems}</p>
        </div>
      ))}
    </div>
    <ul className="doors">
      {openDoors.map((door) => (
        <li className="door" key={door.name}>
          <h3>{door.name}</h3>
          <p className="door__promise">{door.promise}</p>
          <p>{door.body}</p>
          <Link className="door__more" href={door.href}>
            {door.more}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</section>
```

Two things are deliberate and must not be changed.

The job rows put the title in the label column and the systems in the body
column, as plain text. They do not use `.spec__meta`. The mono face on
`/custom` sits under a title inside a wrapper element; here the systems stand
alone in the body column, where the page's normal text face is what reads.

The `openDoors` list stays exactly as it was. When the catalogue fills, this
section shows a job index and two doors, and nothing about it needs rewriting.

Then give the doors list room to sit under the index. In
`src/app/globals.css:578`, inside the `.doors` rule, change:

```css
  margin: 0;
```

to:

```css
  margin: clamp(2.25rem, 5vw, 3.5rem) 0 0;
```

**Verify**: `bun run lint` → exit 0.

**Verify**: `bun run dev` and open `http://localhost:3000`. The section headed
"Work we take off your team" shows five rows, each a title on the left and its
systems on the right, then the "Custom agent" block below them with clear space
above it. At a narrow window the rows stack with the systems under the title.

### Step 4: Point the hero button at what the section now holds

In `src/app/page.tsx:70-72`, change the button text from "See where your agent
starts" to "See the work we take". Keep `className` and keep `href="#doors"`.

**Verify**: `grep -n "See where your agent starts" -r src/` → no matches.

**Verify**: `grep -n 'href="#doors"' src/app/page.tsx` → one match.

### Step 5: Put the channels section on the home page

In `src/app/page.tsx`, import `ChannelsSection` from
`"@/components/channels-section"` and render `<ChannelsSection />` between the
fit section (the one with `id="fit"`) and the mechanism section (the one with
`id="mechanism"`).

That position is fixed by the claim order quoted under "Vocabulary you must
honour": fit is the promise, the channels are the convenience, the mechanism is
the proof. Do not place it anywhere else.

**Verify**: `bun run dev`, then at `http://localhost:3000` the section order
reads: hero, clients, "Work we take off your team", "What we shape your agent
around", "Where your agent lives", "How we keep it right", "Who puts their name
on it", "How to work with us", "Questions we get on the first call".

**Verify**: `bun run test`, then
`grep -c "Microsoft Teams" out/index.html` → `1` or more, where it was `0`
before this step.

### Step 6: Let the price list lead with what the page sells

Two edits in `src/app/content.ts`.

First, `pricingIntro.lede` at line 422. Delete the opening sentence "Add it up
before you call." and keep the rest of the string as written. The two sentences
that remain say what a reader needs.

Second, reorder the `prices` array to: Self-run, Managed, Custom agent, Sprint.
Move whole objects. Change no field inside them except the one below. Self-run
and Managed keep `catalogue: true`, so the live list becomes Custom agent then
Sprint, and the order still holds when the catalogue fills.

Then rewrite Sprint's `body` to:

```ts
    body: "One brief, two weeks, one fixed price. Our own agents work it on your repository, and our reviewer signs the merge. Nothing is deployed and nothing is connected, so this buys one piece of finished work rather than an agent.",
```

The old sentence ended "so there is nothing for you to own yet", which tells a
reader what the card is missing and never what it is for.

**Verify**: `bun run test` → build succeeds and every test passes. The graph
tests read prices out of the printed strings, so a broken price string fails the
build rather than the suite.

**Verify**: `bun run dev`, then under "How to work with us" the first card is
"Custom agent" and the second is "Sprint".

### Step 7: Restate the dates and the structure the docs claim

The sitemap states the day each page's copy last changed, and the content module
is the only place that date lives. You changed the copy on both live pages, so
both dates move.

In `src/app/content.ts:553-556`, set the `date` on `/` and on `/custom` to the
day you make the commit. Get it with `date +%F`. Write it `YYYY-MM-DD`.

Then update `README.md`, which describes a structure this plan changed:

- Lines 42-43 describe the home page as "hero, clients, the two doors, fit,
  mechanism and stack, reviewer, prices, questions". Restate it to match the
  order in step 5.
- The `src/components/` list at lines 59-64 has no entry for
  `channels-section.tsx`. Add one line, in the style of its neighbours: what the
  file is, not how it works.

**Verify**: `bun run test` → all tests pass, including the sitemap test that
compares every stated date against the content module.

**Verify**: `grep -n "channels-section.tsx" README.md` → one match.

## Test plan

Write no new tests.

The suite has one seam, the files in `out/`, and it asserts what a crawler sees:
one `h1` per route, a self-referencing canonical, a title, a description, an
unfurl image, real sitemap dates, and a graph whose offers match the printed
prices. `README.md` states plainly that the suite is not for the text of a page,
because copy changes often and a suite that pins copy gets deleted. This plan is
a copy and section change. A new test here would be the kind the repo has
already decided to reject.

The gate is the existing suite, unedited:

`bun run test` → build succeeds, every test passes.

If a test fails, read it before touching anything. The likely cause is a real
fault: a date in `writtenPages` that no page states, or a price string the graph
builder cannot read.

## Done criteria

All must hold.

- [ ] `bunx tsc --noEmit` exits 0 with no output
- [ ] `bun run lint` exits 0 with no warnings
- [ ] `bun run test` exits 0, every test passes, no test file changed
- [ ] `grep -rn "custom.jobs\b" src/` returns no matches
- [ ] `grep -rn "See where your agent starts" src/` returns no matches
- [ ] `grep -c 'id="doors"' src/app/page.tsx` returns `1`
- [ ] `grep -c 'href="#doors"' src/app/page.tsx` returns `1`
- [ ] `grep -c "channels-title" src/app/custom/page.tsx src/components/product-page.tsx` returns `0` for both
- [ ] `grep -c "Microsoft Teams" out/index.html` returns `1` or more
- [ ] `grep -c "Add it up before you call" src/app/content.ts` returns `0`
- [ ] `git status --porcelain` lists only the files in the "In scope" list
- [ ] No price moved: `git show ab8e0ff:src/app/content.ts | grep -o '€[0-9,]*' | sort | uniq -c` and the same pipeline run against the working copy print identical output. It counts every figure, including the ones inside a `per` string such as "then from €1,500 a month"
- [ ] No test edited: `git diff --name-only ab8e0ff..HEAD -- tests/` prints nothing
- [ ] The status row for plan 001 in `plans/README.md` is updated

## STOP conditions

Stop and report. Do not improvise.

- The code at any location in "Current state" does not match the excerpt. The
  repository has moved since this plan was written, and the plan's judgments
  may no longer hold.
- `src/app/content.ts:337` is not `export const products: Product[] = [];`. A
  product has entered the catalogue, which changes what the home page should
  say, and the whole plan needs rereading.
- The channels block at `src/app/custom/page.tsx:84-114` and the one at
  `src/components/product-page.tsx:171-201` are not identical apart from
  whitespace. One of them has been edited on purpose and step 2 would erase
  that.
- You conclude the section `id` must change from `doors`. A permanent redirect
  at `vercel.json:5` points at it.
- A verification fails twice after one reasonable fix.
- A step appears to need a file outside the "In scope" list.

## Maintenance notes

- **The day a product enters the catalogue**, this section needs one read and
  probably no edit. The job index stays true, and `openDoors` renders both doors
  under it. What does need attention then is `jobsIntro.lede`: "None is a
  product on a shelf" is exactly right while the catalogue is empty and becomes
  half-wrong the moment it is not.
- **Sprint moved to the bottom of the price list.** That is a judgment about
  which price should meet a reader first, and it is one array move to reverse.
  If enquiries from small buyers fall, that is the line to look at.
- **What a reviewer should check**: that no price digit changed; that the five
  job titles, `systems` strings and `body` strings are byte-identical to their
  old text; that `id="doors"` and `href="#doors"` survived; and that the
  channels section on the home page sits between fit and mechanism rather than
  wherever it fitted most easily.
- **Deliberately left out of this plan**: the calls to action still carry four
  different names for one action ("See the work we take", "Start with a brief",
  "Describe the work", "Send us a brief"), the live pages still print no lead
  time and no prerequisites, `/custom` still carries no proof section and no
  questions, and the clients strip still credits the company with work the
  founder shipped before the company had this offer. Each is its own change and
  none of them blocks this one.
