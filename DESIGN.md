---
name: KastProductions
description: Signed off. A cool white page, blue-black ink and one signature blue, for a Vilnius agency that builds agents a named person approves.
colors:
  paper: "#fbfbfc"
  card: "#ffffff"
  panel: "#f0f2f6"
  accent: "#e8ecf3"
  ink: "#172033"
  prose: "#3e4757"
  muted: "#4e5869"
  faint: "#5b6475"
  input: "#7c8697"
  line: "#c9d0db"
  border: "#d6dbe4"
  hairline: "#e4e8ee"
  signature: "#2443b8"
  signature-hover: "#1b3394"
  pass: "#1f7a4d"
  destructive: "#b42318"
  ink-card: "#1f2a40"
  ink-signal: "#a9bbff"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.7rem + 2.5vw, 3.875rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 1.25rem + 1.1vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  quote:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 1.1rem + 0.7vw, 1.65rem)"
    fontWeight: 500
    lineHeight: 1.35
  lede:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontSize: "1.125rem"
    fontWeight: 600
  body:
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  note:
    fontSize: "0.9375rem"
  small:
    fontSize: "0.875rem"
  caption:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
  label:
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.35
  label-sm:
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "3.6px"
  md: "6px"
  lg: "9px"
  xl: "12px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  band: "clamp(3rem, 5.5vw, 5rem)"
  split: "clamp(2rem, 5vw, 5rem)"
  head-col: "19rem"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.signature}"
    textColor: "{colors.card}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.signature-hover}"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "44px"
  button-primary-ink:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  badge-example:
    textColor: "{colors.signature}"
    rounded: "{rounded.sm}"
---

# Design System: KastProductions

## Overview

**Creative North Star: "Signed off"**

The site sells agents whose every outward action waits for a named person. So the visual idea is the moment of approval: blue-black ink on a cool white page, and one fountain-pen blue for the place a person signs. ADR-0007 records why this replaced the Neo Mirai world.

The first thing a reader sees is the thing the agent makes. The home page hero shows an example approval message, built in HTML: the agent's handle, its channel, the exchange, and the "Approve and send" button that waits for a person. The product page shows a run record and the backlog page an example run, in the same form. The site has no drawn pictures and no ornaments.

The tone is calm and exact. Density is that of a well-set document: generous bands, a reading measure of 66ch, everything aligned to the left edge.

There is one theme, and it is light. A system that asks for dark mode gets the same page.

**Key Characteristics:**

- A cool white page, never cream. Ink is a blue-black, the colour of fountain-pen ink.
- One blue marks where a person acts. Green marks a check that passed.
- One family, Schibsted Grotesk, in sentence case. Mono is only for strings a machine wrote.
- A heading column and a body column under a rule. No section numbers, no eyebrow labels.
- The examples (console, run record, example run) sit a little above the page. Everything else is flat.

## Colors

The values live in `src/app/globals.css`. Components read them through the semantic tokens, never as a raw value. The export suite fails a page that states a colour in a class or a style.

### Primary

- **Signature Blue** (`#2443b8`): fills the primary button, marks the gate a standing agent stops at, sets a link that leads on, and colours the "Example" badge. White on it reads at 8.2:1, and it reads at 7.9:1 as type on the page. Tokens: `primary`, `ring`, `signal`, `signal-foreground`. **Signature Blue Hover** (`#1b3394`) is the pressed and hovered fill.

### Secondary

- **Pass Green** (`#1f7a4d`): a check that passed in a run record, a merged run. Never a button and never a link.

### Neutral

- **Paper** (`#fbfbfc`): the page. The viewport's theme colour and the manifest use it from `src/app/theme.ts`.
- **Card** (`#ffffff`): a card, a popover, the outline button's fill.
- **Panel** (`#f0f2f6`): a panel band and a muted fill. Tokens: `secondary`, `muted`.
- **Ink** (`#172033`, 15.7:1 on paper): headings and every word that must be read first.
- **Prose** (`#3e4757`, 9:1): body copy. Token: `prose`.
- **Muted** and **Faint** (`#4e5869`, `#5b6475`, 5.3:1 or better, on the page and on a panel): a note, a label, a caption. Tokens: `muted-foreground`, `faint`.
- **Line** (`#c9d0db`): the rule over a section. **Border** (`#d6dbe4`): a card's or a control's edge. **Hairline** (`#e4e8ee`): the rule between rows.
- **Input** (`#7c8697`, 3.6:1): the edge of a form field, and the outline button's edge on hover.

### The ink surface

The closing call to action, the footer and the plan a price list leads with are set in ink. The `inverse` utility turns the same variables over: light type, a white primary button with ink type, and links and the focus ring in a light blue (`#a9bbff`, 8.7:1 on ink). A component never states a colour for one background.

### Named Rules

**The Signature Rule.** Signature blue marks the place a person acts, and nothing else: the one action in a view, the approval gate, the link onward. A rule, a number or a table cell is never blue.

**The One Theme Rule.** There is no dark theme, no `dark` class and no rule that answers `prefers-color-scheme: dark`. `color-scheme` is `light`.

## Typography

**Text and display:** Schibsted Grotesk (with Helvetica Neue, Arial)
**Machine strings:** IBM Plex Mono (with ui-monospace)

**Character:** a sturdy grotesk with a newspaper's directness, set tight at display sizes and open at reading sizes. One family carries the whole page, so hierarchy comes from size and weight alone.

Both load through `next/font/google` in `src/app/layout.tsx`, so the export serves the files and no request goes to Google. Schibsted Grotesk loads as a variable font with Latin and Latin Extended, so a name such as "Povilas Nanevičius" renders in the one face.

### Hierarchy

The ramp is a set of `--text-*` tokens in `src/app/globals.css`, used as `text-display`, `text-note` and so on, on a classical scale from a 17px body. A size off the ramp is drift: take the nearest step. `src/lib/utils.ts` names every step for `cn`.

- **Display** (600, tracking -0.03em): the one h1 of a page (`HeroTitle`), and the heading of a closing ink band.
- **Headline** (600, tracking -0.02em): a section's h2 (`UnitHead`).
- **Figure** (600): the price on a plan card.
- **Quote** (500): the one reference the home page quotes.
- **Lede** (400): the paragraph under the h1.
- **Title** (600, 1.125rem): a point in the safety section, a reference on the about page.
- **Body** (400, 1.0625rem, line-height 1.65, max 66ch): prose and every answer. A row label, a card title and an accordion question take 600 at this size.
- **Note** (0.9375rem): a side remark, the paragraph beside a section's h2, a button's label, a footer link.
- **Small** (0.875rem): the header's links, the words inside a record or a plan's list.
- **Caption** (IBM Plex Mono, 0.8125rem): a machine string, such as a handle, a channel or an issue key.
- **Label** (500, 0.8125rem, sentence case): a price unit, a footer column's name, the reply time under a button. The `meta` utility sets it. **Label small** (0.75rem) is a badge.

### Named Rules

**The Sentence Case Rule.** No heading, button, label or badge is set in capitals. A heading carries no emphasis of its own: no italic word, no coloured word, no coloured full stop.

**The Machine String Rule.** Mono is for a string a machine wrote: a handle, a channel, a branch, a timestamp, a diff. A label a person wrote is in the text face.

## Layout

The page is a stack of `Band`s. A `Unit` splits a band into a heading column (19rem from `lg`, sticky) and a body column, under one `line` rule that runs the width of the content. Content sits in `wrap`: `min(100% - 2 * gutter, 74rem)`, centred, and every block in it is aligned to the left.

A page with words only opens with a `HeroFrame`: the hero column at reading width, with no picture beside it. A page with an example beside its words opens with a `HeroSplit`: the words, and the example in a slightly wider column from `lg` up. Below `lg`, the example goes under the words.

A number in front of a row means the rows are steps in order (`<Rows sequence>`). A section heading never carries a number.

Breakpoints replace Tailwind's: `sm` 35.0625rem (a button shares its row), `md` 55.0625rem (the header shows its links), `lg` 67.5625rem (the heading takes its own column).

Every page reads at 390px and 1440px wide with no sideways scroll.

## Elevation & Depth

The page is flat. The one shadow is `shadow-sheet`, a soft lift under the examples: the console, the run record and the example run. They are the things the agent makes, so they sit a little above the page. A plan card a reader compares stays flat, with one `border` edge. The sticky header is the page colour at 90% opacity with a backdrop blur and a hairline under it.

## Shapes

Radius follows hierarchy: a badge is 3.6px, a button 6px, a card and an example 12px. A portrait is round.

## Components

### Buttons

- **Primary:** signature blue fill, white label in the text face at 600, 44px tall (40px in the header). On the ink surface it turns white with ink type.
- **Hover / Focus:** the fill darkens to `primary-hover`; an icon inside moves up and right by 2px. Focus shows a 3px blue outline at a 4px offset.
- **Outline:** a white fill with a grey edge and an ink label. It sits beside the primary button: "Book a call" beside the brief in every hero (`HeroActions` in `src/components/section.tsx`).

### Links

A link that leads on (`PullLink`) is set in signature blue at 600 with a faint blue underline that turns solid on hover. A link in running text keeps an underline in a 45% tint of its own colour.

### Badges

- **Example** (`variant="signal"`): blue text on a faint blue wash with a blue edge. It labels anything synthetic. See "Claims" in `README.md`.
- **Outline** (`size="lg"`): a name in a list a reader can check, such as a channel.

### Cards

- **Background:** white on the page; ink for the plan a price list leads with.
- **Border:** one `border` edge.
- **Corner:** 12px.
- **Padding:** 16px, or 24px from `sm` up for the `lg` size.

### The gate

Where the agent stops for a named person, a block carries a 2px blue rule on its left and a faint blue wash (`gateClass`): the stop point on a product or job page, a `Note` with `gate`, the merge line of an example run, and the foot of the console.

### Navigation

The header holds the name as a word in bold, the page links in the text face at `text-small`, and two calls to action. The current page is ink with a blue underline. Below `md`, the links fold into a sheet.

### Footer

An ink surface: the name, then four link columns with quiet column names, and at the foot the legal name, the city and the registration code.

## Do's and Don'ts

### Do:

- **Do** read every colour through a token (`text-prose`, `bg-signal`, `border-hairline`, shadcn's own).
- **Do** set an ink surface with the `inverse` utility, never with hand-picked colours.
- **Do** keep body text at 4.5:1 or better and a control's edge at 3:1 or better against its surface.
- **Do** show what the agent makes, labelled "Example", where a page needs a picture.

### Don't:

- **Don't** draw an illustration, a scene or an ornament. The export suite fails a page that holds an SVG other than an icon.
- **Don't** add a dark theme, a `dark` class, or a rule for `prefers-color-scheme: dark`.
- **Don't** set a heading, a label or a button in capitals, or put a label above a heading.
- **Don't** number a section, or put a number in front of rows that are not steps in order.
- **Don't** put a shadow on a plan card, or use a cream page colour.
