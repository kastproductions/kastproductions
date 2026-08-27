---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/about/page.tsx","app/work/page.tsx","app/contact/page.tsx"]
---

## Scope

The home surface, `app/page.tsx`. Visitor mode: **Persuade**.

The interior routes (`/about`, `/work`, `/contact`) inherit this world and hold no
strategy of their own; each is one module of the same desk.

## Audience and job

A founder, product lead, or engineering manager who arrived from a referral, a
LinkedIn profile, or a marketplace listing. They are on a laptop mid-workday with
several agency tabs open, and they have one question: can one small senior team
ship this faster than my own hiring cycle, and do they have taste? They decide in
under two minutes.

## Action

One action: email `hello@kastproductions.com`. There is no form, no booking link,
no second funnel. Every control on the page resolves to that address, and the
committing control is the red record button.

## Proof

The proof is the only thing on this page a competitor cannot copy-paste:

- 17 named clients, presented as printed patchbay tape rather than logo tiles.
  Trustpilot, Volkswagen Financial Services, An Post, Irish Life, Rocket
  Software and Toptal lead the first strip because they carry the most
  recognition.
- 6 named references with roles, employers and portraits, printed as written.
- The instrument itself. A studio that builds interfaces is judged on the one it
  put in front of you.

Nothing else is claimed. No metrics, pricing, headcount, awards or press, because
none are on hand.

## Chosen direction

**The desk** — a mixing console, candidate 5 of 7 on the grounded list, assigned
by `concept-seed --scope direction --mode persuade`, seed key
`kastprod-redesign-01`.

The console is not a costume. The studio's claim is that speed and judgment are
not traded against each other, and a console is the instrument where many
parallel signals are balanced by one experienced pair of hands. Signal flow is
the page order, because that is how a desk is read: master, sources, channels,
outboard, returns, out.

## Memorable moment

The two master movements, labelled SPEED and JUDGMENT, with a lit LINK lamp
between them. They are ganged: they always read together, and that is the whole
positioning stated as a physical fact rather than an adjective.

They move because of the visitor. `components/desk/level-engine.tsx` drives every
needle, lamp and ladder segment on the page from scroll and pointer speed under
true VU ballistics — 300ms integration, ~1.5% overshoot — so the desk answers the
person reading it. It measures real input and never synthetic audio, because a
meter fed by fake audio would imply a measurement of the studio that nobody took.

On load the needles slam to full scale and fall back: a power-on self-test, which
is what real gear does when you switch it on. Under `prefers-reduced-motion` the
engine never starts.

## Constraints this surface must keep

- Static export. No API routes, no server actions, no image optimization.
- Red is rationed: the arc past 0 dB, the peak lamp, and the commit button. Never
  anywhere else.
- No eyebrows or kickers. Section identity lives in the chassis.
- One motion system. Extend the engine or add nothing.

## Unresolved

- The 17 client logo files are opaque 200×200 rasters with baked backgrounds,
  nine dark and eight light. Marks return to the bay only if transparent,
  single-weight versions arrive.
- `/work` has no case studies. It ships as an honest empty bay. It is the single
  highest-value addition to this surface's proof when the studio writes even one.
- Whether the studio is a team or a solo principal with collaborators is
  unconfirmed; copy says "we" and never states a headcount.
