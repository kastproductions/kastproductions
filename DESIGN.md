---
name: KastProductions
description: The Neo Mirai world on gold paper, light only, for a Vilnius agency that builds agents.
colors:
  paper: "oklch(94% 0.035 78)"
  paper-soft: "oklch(91% 0.045 78)"
  rice: "oklch(97% 0.02 82)"
  ink: "oklch(18% 0.035 82)"
  ink-soft: "oklch(32% 0.045 80)"
  muted-ink: "oklch(38% 0.045 79)"
  faint-ink: "oklch(44% 0.045 78)"
  ash: "oklch(54% 0.04 80)"
  line: "oklch(73% 0.055 77)"
  gold: "oklch(68% 0.145 74)"
  gold-bright: "oklch(76% 0.165 80)"
  sun: "oklch(64% 0.19 43)"
  sun-deep: "oklch(52% 0.17 38)"
  sun-text: "oklch(48% 0.16 38)"
  sun-hover: "oklch(44% 0.15 36)"
  focus: "oklch(58% 0.18 42)"
  night: "oklch(17% 0.035 185)"
  night-soft: "oklch(24% 0.04 170)"
  pass: "oklch(45% 0.11 150)"
  destructive: "oklch(50% 0.17 30)"
typography:
  display:
    fontFamily: "Chakra Petch, Noto Sans, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.2rem + 3.6vw, 4.6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "0em"
  headline:
    fontFamily: "Chakra Petch, Noto Sans, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.1rem + 1.5vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "0em"
  title:
    fontFamily: "Chakra Petch, Noto Sans, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Zen Old Mincho, Noto Serif, Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Azeret Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "1px"
  md: "2px"
  seal: "9999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  band: "clamp(3rem, 5.5vw, 5rem)"
  split: "clamp(2rem, 5vw, 5rem)"
  head-col: "21rem"
  measure: "66ch"
  grid: "112px"
components:
  button-primary:
    backgroundColor: "{colors.sun-deep}"
    textColor: "{colors.rice}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.sun-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "44px"
  button-primary-night:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.rice}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  card-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.rice}"
  badge-example:
    textColor: "{colors.sun-text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
  skip-link:
    backgroundColor: "{colors.night}"
    textColor: "{colors.rice}"
    typography: "{typography.label}"
  seal:
    backgroundColor: "{colors.sun-deep}"
    textColor: "{colors.rice}"
    rounded: "{rounded.seal}"
---

# Design System: KastProductions

## Overview

**Creative North Star: "Golden hour in a future Vilnius"**

The site takes its world from Impeccable's Neo Mirai reference, as ADR-0006 adapts it. We took the system and left the place. The page is warm gold paper with a faint 112px grid and a fine grain. Ink type sits on it. A red sun, a gold light and night teal are the only other colours. Headings speak in Chakra Petch caps, the reading text is Zen Old Mincho, and labels are Azeret Mono caps. A stamp seal with a KP monogram is the nameplate, and a sun disc and an eclipse are the ornaments. Five scenes, drawn by hand as SVG, show a future Vilnius at golden hour and teams at work with an agent.

The tone is warm and optimistic, and also exact: an agency that signs its work. Density is that of a well-set document, with generous bands and a reading measure of 66ch.

There is one theme, and it is light. A system that asks for dark mode gets the same paper. There is no Japanese text, no kanji, no Mount Fuji and no Tokyo scenery: a Vilnius company that shows Tokyo gives the reader a new question to ask.

**Key Characteristics:**

- Gold paper with a 112px grid, a grain overlay and a gold light high on the page.
- Ink type. The stamp red marks where a person acts.
- Night teal bands give contrast where a section needs it.
- Display caps, a serif for reading, mono caps for labels.
- Square corners. The seal is the one round thing, apart from the sun and the eclipse.
- Ornaments are hand-drawn SVG in neutral forms, with no rays.

## Colors

A warm, low-chroma paper and ink palette with two hot accents (the red sun and the gold light) and one cool surface (night teal). The values are OKLCH and live in `src/app/globals.css`. Components read them only through the semantic tokens, never as a raw value.

### Primary

- **Stamp Red** (`sun-deep`, oklch(52% 0.17 38)): the colour of the seal. It fills the primary button, marks the gate a standing agent stops at, underlines a link that leads somewhere, and colours the "Example" label. Rice type on it reads at 5.5:1. Token: `primary`, `signal`.
- **Stamp Red Text** (`sun-text`, oklch(48% 0.16 38)): the red set as type on paper, at 5.9:1. Token: `signal-foreground`.

### Secondary

- **Gold Light** (`gold-bright`, oklch(76% 0.165 80)): the light on the paper. It starts the sun's gradient, draws the eclipse's ring, and is the action colour on a night surface, with ink type on it at 8.6:1. Never the colour of a word on paper: on paper it fails contrast.
- **Gold** (`gold`, oklch(68% 0.145 74)): the eclipse's disc and the seal on night teal.
- **Sun** (`sun`, oklch(64% 0.19 43)): the foot of the sun disc's gradient. An ornament colour only.

### Tertiary

- **Night Teal** (`night`, oklch(17% 0.035 185)): the one other surface. The footer, the closing band and the plan a price list leads with are set on it. **Night Teal Soft** (`night-soft`) is a card on a night surface.

### Neutral

- **Paper** (`paper`, oklch(94% 0.035 78), #f8e9d2): the page. The viewport's theme colour and the manifest use its hex value from `src/app/theme.ts`.
- **Paper Soft** (`paper-soft`): a panel band and a muted fill. Tokens: `secondary`, `muted`, `accent`.
- **Rice** (`rice`): a card, which is a slip of lighter paper on the gold, and type on stamp red or night teal.
- **Ink** (`ink`, 15.8:1 on paper): headings and every word that must be read first.
- **Ink Soft** (`ink-soft`, 10.7:1): body prose. Token: `prose`.
- **Muted Ink** and **Faint Ink** (`muted-ink`, `faint-ink`, 6.5:1 or better): a note, a label, a caption. Tokens: `muted-foreground`, `faint`.
- **Line** (`line`): a decorative rule, a card's edge, the horizon lines. Token: `border`, `line`. It is not used for a control's edge, which is ink.
- **Ash** (`ash`): the edge of a form field, at 4.25:1. Token: `input`.

### Named Rules

**The Stamp Rule.** Stamp red marks the place a person acts, and nothing else: the one action in a view, the approval gate, the link onward, the seal. A rule, a number or a table cell is never red.

**The Night Rule.** A surface set in night teal carries the `night` utility, which turns the same variables over: rice type, gold action, a gold focus ring. A component never states a colour for one background.

**The One Paper Rule.** There is no dark theme, no `dark` class and no rule that answers `prefers-color-scheme: dark`. `color-scheme` is `light`.

## Typography

**Display Font:** Chakra Petch (with Noto Sans, system-ui)
**Body Font:** Zen Old Mincho (with Noto Serif, Georgia, serif)
**Label/Mono Font:** Azeret Mono (with ui-monospace)

**Character:** A squared, engineered display face in caps against a calm, old-style serif. The mono caps carry dates, prices, labels and machine strings, as the reference's ticket and agenda labels do.

All three load through `next/font/google` in `src/app/layout.tsx`, so the export serves the files and no request goes to Google. Zen Old Mincho carries Latin Extended, so a name such as "Povilas Nanevičius" renders in the one face. Its regular weight preloads the Latin and Latin Extended files. Its bold weight is a second loader call with no preload, because Google's stylesheet marks the bold weight's Japanese files as Latin.

### Hierarchy

- **Display** (Chakra Petch 300, caps, `clamp(2.3rem, 1.2rem + 3.6vw, 4.6rem)`, line-height 0.98): the one h1 of a page (`HeroTitle`).
- **Headline** (Chakra Petch 400, caps, `clamp(1.6rem, 1.1rem + 1.5vw, 2.4rem)`, line-height 1.04): a section's h2 (`UnitHead`).
- **Title** (Chakra Petch 500 to 600, sentence case, 1.05rem to 1.65rem): a card title, a row label, an accordion question, a price.
- **Body** (Zen Old Mincho 400, 1.05rem, line-height 1.65, max 66ch): prose and every answer.
- **Label** (Azeret Mono 500, caps, 0.66rem to 0.76rem, tracking 0.08em): buttons, navigation, badges, column titles in the footer, the price unit, the registration line. The `label-mono` utility sets it.

### Named Rules

**The Loaded Weights Rule.** Chakra Petch loads 300 to 600 and Zen Old Mincho loads 400 and 700. Never ask for a weight that is not loaded: the browser fakes it.

**The No Negative Tracking Rule.** Chakra Petch caps set at their natural spacing. Labels track out to 0.08em.

## Layout

The page is a stack of `Band`s. A `Unit` splits a band into a heading column (21rem from the `lg` breakpoint, sticky) and a body column under one ink rule that runs the width of the content. Content sits in `wrap`: `min(100% - 2 * gutter, 78rem)`, centred. The band rhythm is `clamp(3rem, 5.5vw, 5rem)`.

A `UnitHead` takes an `index`, which sets the section's number over its heading in mono caps (`01`, then a short line rule). The number is hidden from a screen reader, because the heading already names the section. A page with one section has no number. A page with no scene opens with a `HeroFrame`: the hero column, and one ornament beside it from `md` up (the seal on the about page, the eclipse on the contact, legal and not-found pages).

Breakpoints replace Tailwind's: `sm` 35.0625rem (a button shares its row), `md` 55.0625rem (the header shows its links), `lg` 67.5625rem (the heading takes its own column), and `rail` 86rem (the margin is wide enough for the vertical rail).

The body carries the 112px grid in two linear gradients, a gold radial light at 66% across and 7% down, and the paper colour under them. A fixed grain overlay (three fine dot fields, multiplied, `pointer-events: none`) sits over the content and under the sticky header.

Every page reads at 390px and 1440px wide with no sideways scroll.

## Elevation & Depth

The system is flat. Depth comes from tone: rice cards on gold paper, night bands on paper, and the grain. The sticky header is paper at 92% opacity with a 14px backdrop blur and a hairline under it, so content reads as passing beneath it. The mobile menu sheet carries the one shadow, because it covers the page.

### Named Rules

**The Paper Slip Rule.** A card is one drawn edge and a lighter fill. It never has a shadow as well.

## Shapes

Paper is cut, not moulded: every radius token resolves to 2px or less, so a corner reads square. The round things are the seal, the sun disc, the eclipse and the dot under the current navigation link. The horizon lines under the sun have round caps.

## Components

### Buttons

- **Shape:** square (2px).
- **Primary:** stamp red fill, rice label in Azeret Mono caps, 44px tall (40px in the header). On night teal it turns gold with ink type.
- **Hover / Focus:** the fill darkens to `primary-hover`; an icon inside moves up and right by 2px. Focus shows the 3px sun-coloured outline at a 4px offset, gold on night.
- **Outline:** a transparent fill with an ink edge and an ink label. It sits beside the primary button.

### Badges

- **Example** (`variant="signal"`): stamp red text in mono caps on a faint red wash with a red edge. It labels anything synthetic. See "Claims" in `README.md`.
- **Panel / Outline** (`size="lg"`): a name in a list a reader can check, in the display face at reading size.

### Cards / Containers

- **Corner Style:** 2px.
- **Background:** rice on paper; night teal for the plan a price list leads with.
- **Shadow Strategy:** none.
- **Border:** one `line` edge.
- **Internal Padding:** 16px, 20px, or 24px from `sm` up for the `lg` size.

### Navigation

The header holds the seal nameplate, the page links in mono caps (0.68rem, 44px tall), and two calls to action. A dot in stamp red rises under a link on hover and stays under the current page. Below `md`, the links fold into a sheet that drops from the top; its links are display caps on hairlines, and the current page is set in stamp red.

### Skip Link

The first stop of the Tab key on every page: a night slip in mono caps that drops in from above the viewport when it takes focus.

### Footer

A night teal surface. The seal nameplate and the sun disc sit on one hairline rule, the sun setting on it. Under the rule are the four link columns with mono column titles, and at the foot a mono line with the eclipse, the legal name, the city and the registration code.

### Ornaments

`src/components/ornaments.tsx` holds the three, each a hand-drawn SVG that paints with theme tokens, is hidden from a screen reader, and carries a `data-ornament` name.

- **Seal:** a round stamp in the action colour with a fine inner ring, and K and P cut in straight strokes, so the monogram never waits on a font.
- **Sun disc:** a disc that runs from gold light to sun, cut by the horizon, with three horizon lines under it that shorten towards the viewer.
- **Eclipse:** a gold disc with a thin ring of light, crossed by a disc in the `eclipse` token (ink on paper, night on night teal).

### Scenes

`src/components/scenes.tsx` holds the illustration set: `HeroScene` (Vilnius at golden hour, 16:9) and four room scenes at 4:3, `SupportDeskScene`, `FinanceDeskScene`, `PullRequestScene` and `ShopFloorScene`. Each is inline SVG, so a scene adds no request. The rules that make them one set:

- **Palette:** paper, rice, gold, gold light, sun, stamp red, night teal and ink, through the raw palette classes (`fill-paper`, `fill-night`, `fill-ink` and the rest) that `globals.css` maps for the scenes alone. A scene is a picture, so it keeps its colours on a night surface. Distance is the same colours at a lower opacity, with a gold haze laid over the far rows.
- **Line:** one ink line, 2 units in the hero and 2 to 3 units in a room scene, so it renders near 1.5px at the size each scene is placed. Shadow is fine diagonal ink hatching, never a blur.
- **Sun:** a plain disc cut by bands of haze. Window light on a floor is a set of flat gold patches with the mullions as gaps. Never a ray.
- **Figures:** small flat silhouettes with a fine light line for the arms. In a room, the people sit with their backs to the viewer and face their screens, as the people on the hero's terrace face the city.
- **The agent:** the same mark in every room, a small eclipse (a gold disc and ring crossed by a dark moon), with thin dashed gold lines to the work it does.
- **The city:** every room has a window onto the old town skyline, by day with the red sun and by night with the moon and lit windows.

Each scene carries `role="img"`, takes its accessible name from `scenes` in `src/app/content.ts` through a `<title>` that `aria-labelledby` points at, sets a viewBox, a width and a height, and fills the width of its container at its own ratio. Screens show bars, never words, so no scene carries text.

### Vertical Rail

From the `rail` breakpoint, the margin beside the first screen holds the eclipse, a line, and the brand and the city set down the page in mono caps. It scrolls away with the first screen, so it never crosses a night band.

## Do's and Don'ts

### Do:

- **Do** read every colour through a token (`text-prose`, `bg-signal`, `border-hairline`, shadcn's own). The export suite fails a page that states a colour in a class or a style.
- **Do** set a night surface with the `night` utility, never with hand-picked colours.
- **Do** keep body text at 4.5:1 or better and a control's edge at 3:1 or better against its surface.
- **Do** keep each ornament in a neutral form: a disc, a ring, an eclipse, a horizon line, a seal.
- **Do** give every scene alt text from the content module, a viewBox, a width and a height.

### Don't:

- **Don't** add a dark theme, a `dark` class, or a rule for `prefers-color-scheme: dark`.
- **Don't** put Japanese text, kanji, Mount Fuji or Tokyo scenery on the page.
- **Don't** draw rays, a sunburst or a rising-sun pattern around any sun or seal.
- **Don't** set a word in gold on paper; it fails contrast.
- **Don't** put a shadow on a card, or round a corner past 2px.
- **Don't** ask for a font weight the loader does not load.
