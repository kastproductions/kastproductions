---
name: KastProductions
description: A mastering desk at night — anodised graphite chassis, ivory meter faces, printed label tape, and colour used only as functional hardware.
colors:
  desk: "#151413"
  panel-sunk: "#1c1a19"
  panel: "#232120"
  panel-raised: "#2c2a27"
  bevel: "#3d3936"
  rail: "#4a4641"
  rail-lit: "#5d564e"
  hairline: "#35322e"
  shadow-deep: "#0a0908"
  specular: "#ffffff"
  silk: "#d6d1c7"
  silk-dim: "#9b958a"
  face: "#efe9dc"
  face-2: "#e6dfcf"
  face-line: "#cfc6b2"
  ink: "#16150f"
  ink-dim: "#55524a"
  ink-faint: "#6b675c"
  wood: "#6d4526"
  wood-dark: "#452a15"
  brass: "#b39355"
  brass-dark: "#8a7845"
  signal: "#e8a020"
  cue: "#58b08a"
  over: "#d63a22"
typography:
  display:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(2.2rem, 5.2vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 92, \"wght\" 700"
  headline:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 92, \"wght\" 700"
  quote:
    fontFamily: "Anybody, sans-serif"
    fontSize: "clamp(1.55rem, 3.1vw, 2.8rem)"
    fontWeight: 620
    lineHeight: 1.14
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 94, \"wght\" 620"
  title:
    fontFamily: "Anybody, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 92, \"wght\" 700"
  title-lg:
    fontFamily: "Anybody, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 92, \"wght\" 700"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-dense:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.84375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Anybody, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.13em"
    fontVariation: "\"wdth\" 82, \"wght\" 600"
  label-sm:
    fontFamily: "Anybody, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.15em"
    fontVariation: "\"wdth\" 80, \"wght\" 600"
  action:
    fontFamily: "Anybody, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
    letterSpacing: "0.09em"
    fontVariation: "\"wdth\" 84, \"wght\" 650"
  action-sm:
    fontFamily: "Anybody, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 620
    letterSpacing: "0.1em"
    fontVariation: "\"wdth\" 84, \"wght\" 620"
  action-xs:
    fontFamily: "Anybody, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    letterSpacing: "0.12em"
    fontVariation: "\"wdth\" 84, \"wght\" 650"
rounded:
  sm: "2px"
  md: "3px"
  lg: "4px"
  full: "9999px"
spacing:
  score: "1px"
  tight: "12px"
  panel: "20px"
  gutter: "40px"
  section: "64px"
  section-lg: "96px"
components:
  button-commit:
    backgroundColor: "#332f2b"
    textColor: "{colors.silk}"
    typography: "{typography.action-xs}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  button-commit-lg:
    backgroundColor: "#332f2b"
    textColor: "{colors.silk}"
    typography: "{typography.action}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-commit-hover:
    backgroundColor: "#3c3833"
    textColor: "{colors.face}"
  button-panel:
    backgroundColor: "#2b2825"
    textColor: "{colors.silk}"
    typography: "{typography.action-sm}"
    rounded: "{rounded.sm}"
    padding: "16px 20px"
  button-panel-hover:
    backgroundColor: "#343029"
    textColor: "{colors.face}"
  card-channel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.silk-dim}"
    rounded: "0px"
    padding: "20px"
  card-rack:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.silk-dim}"
    rounded: "{rounded.sm}"
    padding: "28px 32px"
  card-blank:
    backgroundColor: "#1e1c1a"
    textColor: "{colors.silk-dim}"
    rounded: "0px"
    padding: "20px"
  bay-recessed:
    backgroundColor: "{colors.panel-sunk}"
    textColor: "{colors.silk-dim}"
    rounded: "{rounded.sm}"
    padding: "20px"
  tape:
    backgroundColor: "{colors.face}"
    textColor: "{colors.ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  rail:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.silk-dim}"
    typography: "{typography.label-sm}"
    rounded: "0px"
    padding: "10px 16px"
  nav-link:
    backgroundColor: "{colors.face}"
    textColor: "{colors.ink-dim}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  nav-link-active:
    backgroundColor: "{colors.face}"
    textColor: "{colors.ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: KastProductions

## Overview

**Creative North Star: "The Desk"**

The site is a mastering desk at night. The overhead lights are off. The room is
lit by the meter bridge and one desk lamp. The body is warm anodised graphite,
machined and bolted. The bright things are physical objects: ivory meter faces,
white label tape, brass screws, a walnut end cheek. Nothing on this desk glows.
Things are lit.

The world exists to state one claim as a physical fact. Two master movements sit
side by side, labelled SPEED and JUDGMENT, with a lit LINK lamp between them.
They are ganged, so they always read together. That is the studio's position
without an adjective. Everything else on the page follows signal flow, because
that is the order a desk is read in: master, sources, channels, outboard,
returns, out.

Density is high and even. A console has no hero space and no decorative
breathing room; it has panels packed with legible controls. Identity comes from
the chassis itself — rails, plate legends, bay headers, screws — never from a
label announcing a section. The build refuses the agency default it was measured
against: dark hero, bento capability cards, logo marquee, one neon accent. Two
rasters carry real material: walnut grain on the desk's end cheeks and brushed
aluminium with one raking key light on the master module. Both were authored
procedurally in a browser canvas, both ship as WebP, and both carry their full
generation record in a `.webp.json` sidecar — because no image model exists on
the build machine, and WebP has no text chunk to stamp provenance into.

**Key Characteristics:**

- Colour is functional hardware with exactly three roles: amber, green, red.
- Elevation is one machined bevel, declared once, never a border plus a shadow.
- Type is two faces: Anybody (variable `wdth` axis) and Archivo. No monospace.
- Section identity lives in the chassis. No eyebrows, no kickers.
- One motion system, driven by real visitor activity under VU ballistics.
- Corners are machined: 2–4px on panels, full round only on things that are
  round in life.

## Colors

The palette is a dark machined body, two paper tones, two material accents, and
three lamps.

### Primary

- **Signal Amber** (`#e8a020`): signal present. It marks the channels that run
  hot, the active section lamp on the bridge, the hover state of a legend, and
  the underline under the email address. It reads 7.2:1 on the panel face.
  This is the only colour allowed to mark "this one is live".

### Secondary

- **Cue Green** (`#58b08a`): routed, patched, available. It lights the LINK lamp
  between the two master movements, the plug tip inside a jack when its row is
  patched, the lower segments of the bridge peak ladder, and the focus ring. It
  reads 6.1:1 on the panel face.

### Tertiary

- **Over Red** (`#d63a22`): past 0 dB, and the one committing action. It marks
  the over-zone of the instrument — the arc from 0 VU to the right pin on a
  meter face, the peak lamp that lights only when a needle passes 0 VU, and the
  top two segments of the bridge peak ladder — plus the lamp on the record
  button. It is also the `--destructive` mapping, unused today. It is never used
  for text on the chassis; only white-on-red (4.7:1 reversed) or as a non-text
  mark.

### Neutral

- **Desk Shadow** (`#151413`): the shadow between bays. The page ground and the
  browser theme colour.
- **Recess Floor** (`#1c1a19`): the bottom of a recess, below the panel face.
  `panel-recessed` fills with it — the patchbay, the fader slots, the mobile
  menu rows.
- **Panel Face** (`#232120`): the main panel. Most surfaces are this.
- **Panel Raised** (`#2c2a27`): a module lifted off the panel — the bridge, rack
  units, rack ears, the footer plate.
- **Machined Bevel** (`#3d3936`): the lit top edge of a cut. It exists inside
  shadows, not as a fill.
- **Rack Rail** (`#4a4641`): rack rails, unlit dots, fader marks, the scrollbar
  thumb.
- **Lit Rail Edge** (`#5d564e`): the top edge of a ring or a rail where the key
  light catches it. The outer ring of a jack socket is drawn with it, one pixel
  above centre, so the ring reads as a machined lip rather than a flat circle.
- **Chassis Hairline** (`#35322e`): the default border and input stroke.
- **Bore Black** (`#0a0908`): the inside of a jack bore — the hole the plug goes
  into. It is a depth, not an ink; nothing is ever set in it.
- **Specular White** (`#ffffff`): white light on glass. The only pure white in
  the system, and it appears only at low opacity — the meter glass gradient
  peaks at 0.20 on the left movement and 0.075 on the right.
- **Silkscreen** (`#d6d1c7`): silkscreened ink on metal. All primary text on the
  chassis. 10.5:1 on panel, 6.7:1 on panel-raised.
- **Silkscreen Dim** (`#9b958a`): secondary legends and body copy on the
  chassis. 5.4:1 on panel, 4.8:1 on panel-raised.
- **Meter Ivory** (`#efe9dc`): meter faces, label tape, and the whole paper
  field of the references section.
- **Track Sheet** (`#e6dfcf`): the second paper tone, used for cards inside the
  paper field.
- **Ruled Line** (`#cfc6b2`): the ruled line on paper. Row dividers in the track
  sheet.
- **Working Ink** (`#16150f`): ink on paper. 15:1 on the ivory face.
- **Working Ink Dim** (`#55524a`): secondary ink on paper. 6.4:1 on the face.
- **Faint Print** (`#6b675c`): the faded print of a movement mark. It carries
  the `VU` stamp on the meter face and nothing else. Decorative print only,
  never a line a reader has to read.
- **Walnut** (`#6d4526`) and **Walnut Dark** (`#452a15`): the desk's end cheeks
  and the nameplate stripe. A material, not an accent.
- **Brass** (`#b39355`): a jack collar in full light. Drawn, never a text
  colour.
- **Brass Dark** (`#8a7845`): the same metal in the panel's own shade — screw
  heads across the chassis, the bezel screws on both meter faces, and the
  collar of a jack that sits back in the recess.

### Named Rules

**The Three Lamps Rule.** Colour on this desk is functional hardware with three
roles and no fourth: amber means signal present, green means routed or
available, red means past 0 dB and the one committing action. A new colour needs
a new physical function on the panel, or it does not ship.

**The Rationed Red Rule.** Red means one of two things and nothing else: the
over-zone of a meter (the arc past 0 VU, the peak lamp above it, the top two
segments of the peak ladder) or the single committing action. Red anywhere else
is wrong, including error text, badges, and hover states.

**The Lit, Not Glowing Rule.** Nothing emits light except a lamp. Colour arrives
on a lamp cap, a printed face, or a piece of tape. No page-level colour wash, no
neon, no gradient background.

**The Named Shade Rule.** A chassis shade used in more than one place is a
token with a stated role, not a hex repeated at two callsites. That is what
`--panel-sunk`, `--rail-lit`, `--shadow-deep`, `--specular`, `--ink-faint` and
`--brass-dark` are: each one names a physical condition — the floor of a recess,
an edge catching the key, the inside of a bore, light on glass, faded print,
metal in shade. Two of them carry a hard limit with the name: `--shadow-deep` is
never ink, and `--specular` is never opaque.

**The Paper Field Rule.** A region covered by paper flips the raw variables with
`[data-field="paper"]`, so every vendored component inside it inherits ink on
ivory. Never override paper colours per callsite.

## Typography

**Display Font:** Anybody (variable, with a real `wdth` axis; `sans-serif`
fallback)
**Body Font:** Archivo (`sans-serif` fallback)
**Label Font:** Anybody, condensed by the width axis
**Monospace Font:** none. There is no monospace family in this system.

**Character:** Anybody is the silkscreen and the badging. Its width axis does
the compressing, so a condensed legend is a real cut of the face rather than
type squeezed by a transform. Archivo carries running copy at a comfortable
reading width and stays out of the way. The pairing sounds like a panel and its
manual.

### Hierarchy

- **Display** (`wdth` 92 / `wght` 700, `clamp(2.2rem, 5.2vw, 4.2rem)`, 0.92,
  uppercase, `-0.03em`): the desk's own badging. One per page, on the master
  claim. Secondary pages use the same recipe at
  `clamp(2.1rem, 5vw, 3.8rem)`.
- **Headline** (`wdth` 92 / `wght` 700, `clamp(1.9rem, 3.6vw, 3.3rem)`, 0.92,
  uppercase): section headings. Capped at 16–24 characters so they stay one or
  two lines. The output-stage heading runs a shade smaller at
  `clamp(1.65rem, 3.4vw, 3rem)`, and the email address under it is set as
  display at `clamp(1.25rem, 4.2vw, 3.2rem)`.
- **Quote** (`wdth` 94 / `wght` 620, `clamp(1.55rem, 3.1vw, 2.8rem)`, 1.14,
  sentence case, `-0.02em`): the featured client reference only. Sentence case
  is deliberate; see Do's and Don'ts.
- **Title** (`wdth` 92 / `wght` 700, 21px, 0.92, uppercase, `-0.015em`): channel
  strip names and the mobile menu rows.
- **Title Large** (`wdth` 92 / `wght` 700, 30px from `md`, 0.92, uppercase,
  `-0.02em`): rack unit titles only. It starts at Title on small screens and
  steps up once, because a rack unit gets the full panel width at `md` and the
  channel strips never do.
- **Body** (400, 15px, 1.625): running copy. Held to 58–68ch on the chassis and
  46–72ch on paper. Rack copy starts at 14px and steps to 15px at `md`; the
  secondary track-sheet quotations run 14.5px; dense strip copy drops to 13.5px.
- **Label** (`wdth` 82 / `wght` 600, 12px, `0.13em`, uppercase): the
  silkscreened legend. `wdth` 80 / 11px / `0.15em` is the small cut, used for
  rails, plate legends, bay headers, and tape.
- **Action** (`wdth` 84 / `wght` 620–650, `0.09–0.12em`, uppercase): the legend
  on a machined button. 15px on the large commit, 13px on a panel link, 11px on
  the small commit. It is a wider cut than a plate legend because a button is
  pressed, not read across the room.

### Named Rules

**The No Monospace Rule.** This system has no monospace family. Monospace worn
as a costume for "technical" is out. Real measurements get
`data-numerals="tabular"`, which sets `font-variant-numeric: tabular-nums`, so
numbers never reflow between values while a needle moves.

**The Eleven Pixel Floor Rule.** Legend type never goes below 11px
(`0.6875rem`). Real silkscreen is smaller, but tracked uppercase at 10px stops
being comfortably readable in this face, and a legend nobody can read is
decoration. Character comes from the width axis and the tracking, not from
shrinking further.

**The Held Ramp Rule.** The fixed sizes on this desk are 30, 21, 15, 14.5, 14,
13.5, 13, 12 and 11px, and the fluid ones are the four display clamps listed
above. A new size snaps to the nearest existing step; it does not land between
two of them because a particular block looked a pixel tight. Every off-ramp
value in the first build — 24, 19, 17 and 16px — was a local decision that
never became a step, and each one made the panel read as assembled from
different machines.

**The Two-Line Title Floor Rule.** Channel-bank titles carry
`min-h-[1.84em]`: two lines at the `badge-type` line-height of 0.92. Some
titles wrap and their row-mates do not, so without the floor the copy blocks in
one bank row start at different heights and the bank stops looking like one
chassis. Do not delete it because the title above it happens to fit on one
line.

**The No Eyebrow Rule.** No eyebrows and no kickers anywhere. A small tracked
uppercase line above a large line is a kicker; if a section needs that line, the
line is the heading. Section identity belongs to the chassis: rails, plate
legends, and bay headers.

**The Width Axis Rule.** Condensed type comes from `font-variation-settings:
"wdth"`. Never `transform: scaleX()`, never a separate condensed family, never
`font-stretch` on a face without the axis.

## Layout

The page is an object, not a document with margins. The scrolling body carries
`desk-frame`, which paints the desk ground, reserves the fixed bridge height,
and — from `lg` (64rem) up — draws a 24px walnut cheek down both edges from
`/textures/walnut.webp`. The cheeks live on the body rather than pinned to the
viewport, so the desk scrolls as one piece.

Every section shares one shell: centred, `max-width: 86rem`, with gutters of
16px, then 24px at `sm`, then 40px at `md`. Vertical rhythm between sections is
64px, opening to 96px at `md`. Inside a panel, padding runs 12–20px; a rack unit
runs 28px by 32px at `md`.

The master section is the exception, and it is tuned rather than chosen. Its
movements are capped at 25rem each and its paddings are cut so the whole
instrument — meters, LINK lamp, both readout rails, the claim, and the red
commit button — lands inside 900px on a 1440×900 laptop. Loosening any of those
paddings breaks that promise. The module itself is faced with `chassis-face`,
which lays `/textures/chassis.webp` over the panel colour at
`background-size: 100% 100%` with no repeat: the raster carries one baked key
light, and stretching it to the module is what keeps that light single.

Grids stay honest about content. The channel bank is one chassis scored into
strips, not eight cards: a single `1px` score line over `#1b1918` divides them.
It goes to two columns at `sm` and four only at `xl` (80rem), because at 1024px
the strip titles wrap to three lines and crush the copy against the fader. Every
strip title reserves two lines whether it needs them or not, so the copy blocks
across a row start level.

Breakpoints in use: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem. The fixed
bridge is 59px tall, and 75px from `md`.

### Named Rules

**The Bridge Token Rule.** `--bridge` is the single source for the fixed header
height (the flex row plus the 1px rail it is bolted to). `desk-frame` consumes
it as `padding-top`; `under-bridge` consumes it as
`scroll-margin-top: calc(var(--bridge) + 1.5rem)` so in-page anchors land below
the bridge instead of behind it. Never hardcode the number, and never re-measure
it per route.

**The Score Line Rule.** Sibling modules that belong to the same bank share one
panel face and are divided by a 1px score line. Do not turn a bank into a row of
separate cards with their own backgrounds and gaps.

## Elevation & Depth

There is one elevation system: a machined bevel. A panel is lit from above by
inset lines — a bevel-coloured top edge and a near-black bottom edge — so depth
comes from how the metal is cut, not from a floating shadow. Only genuinely
lifted modules add a drop shadow, and then it carries a real offset and blur
like a real one. Recessed containers invert the same logic: the shadow falls
inside, from the top, and the surface underneath drops to the recess floor.

### Shadow Vocabulary

- **panel** (`inset 0 1px 0 bevel/70%, inset 0 -1px 0 #171514, inset 1px 0 0
  bevel/30%, inset -1px 0 0 #1b1918`): the default surface. Flush with the
  chassis. No drop shadow at all.
- **panel-raised** (`inset 0 1px 0 bevel/90%, inset 0 -1px 0 #171514, 0 2px 4px
  -1px rgb(0 0 0 / 0.5), 0 8px 20px -8px rgb(0 0 0 / 0.6)`): a module bolted on
  top of the panel — the bridge, rack units, the footer plate.
- **panel-recessed** (`inset 0 2px 5px rgb(0 0 0 / 0.55), inset 0 -1px 0
  bevel/55%`, on `--panel-sunk`): a bay cut into the chassis. The patchbay,
  fader slots, the mobile menu rows. The colour change is half the effect: a
  recess is darker than the face it is cut into, not just shadowed.
- **tape** (`inset 0 -1px 0 face-line/90%, 0 1px 2px rgb(0 0 0 / 0.45)`): a
  printed strip stuck onto metal. Sits barely above the surface.
- **paper field** (`inset 0 6px 14px -8px rgb(0 0 0 / 0.6)` top and bottom): the
  references section reads as a lid opened in the chassis.
- **engraved** (`text-shadow: 0 -1px 0 rgb(0 0 0 / 0.6), 0 1px 0 rgb(255 255 255
  / 0.055)`): type cut into the panel.

### Named Rules

**The One Bevel Rule.** Elevation is declared once, by `panel`, `panel-raised`,
or `panel-recessed`. Never a border plus a shadow on the same element; that pair
is the ghost card this world was built to avoid. If a surface needs a new depth,
it needs a new utility, not a local override.

**The Cut Above Rule.** Engraved text puts its dark edge *above* the glyph,
where light does not reach, and a faint lit lip below it. A single dark shadow
under a glyph reads as raised lettering, which is the opposite of a cut.

## Shapes

Corners are machined, not soft. Panels, buttons, tape, bays, and rack units all
sit at 2px, and the largest radius anywhere in the chassis is 4px. Full rounding
is reserved for things that are round in life: lamp bezels, lamp caps, jack
sockets, screws, and the pill of a fader slot.

Borders are not the depth system. Where a line appears it is doing a different
job: a hairline `#191817` under a top rail, `#3a3733` above a bottom rail, or
`face-line` ruling a row of the track sheet. Hardware is drawn as SVG geometry
rather than approximated with box shadows — screws have a real slot, knobs have
270° of travel with 11 index ticks and 24 knurl cuts, jacks have a lit outer
ring, a brass collar and a black bore, faders have nine marks with the unity
mark cut longer.

Surface is material where the object is large enough to show it. The master
module is faced with a real brushed-aluminium raster rather than a flat token,
because at that size a flat fill reads as an empty rectangle; everything smaller
keeps the token, because a 40px button has no room for grain.

Silhouettes come from function. The nameplate is a walnut stripe. A rack unit is
flanked by two ears with two screws each. Channel 8 of the bank is a blanking
plate: plain metal held by four screws, because that is what an empty slot looks
like, and it says the bank is not full.

## Components

### Buttons

- **Shape:** machined rectangle, 2px corners, always with a top bevel line and a
  1px dark bottom edge.
- **Commit (record button):** the one committing action. A transport button:
  dark body (`#332f2b`), a recessed dark-glass lamp with a red filament behind
  it, and its action named in plain words. Small is 10px by 14px with an 11px
  legend; large is 16px by 24px with a 15px legend, opening to 20px by 32px at
  `md`.
- **Hover / Focus:** body lifts to `#3c3833`, legend goes to ivory, the lamp
  goes to full opacity and picks up a tight red halo. Press translates the whole
  button down 1px. Focus is the global 2px green ring at 2px offset.
- **Panel link:** everything that is not the commit. Same body and same press,
  no lamp and no red. Body `#2b2825`, hover `#343029`, 16px by 20px with a 13px
  legend.

### Cards / Containers

- **Corner Style:** 2px.
- **Channel strip:** shares the bank's single panel face, divided by score
  lines. A fader on the left, then title, blurb, an "Enquire" legend, a two-digit
  index, and a tape label for its category. The title reserves two lines
  (`min-h-[1.84em]`) so every strip in a row starts its copy at the same height.
  The featured strips carry an amber dot; the rest carry a rail-coloured dot.
  Hover raises the fader cap from 12% to 66% of its slot over 550ms and turns
  the legend amber.
- **Rack unit:** `panel-raised`, flanked by rack ears, with a model number
  (`KP-01`) in tabular small legend beside the title and three knobs on the
  right. The title steps to 30px at `md`.
- **Recessed bay:** `panel-recessed` on the recess floor, with a legend header
  row (`Bay A · sources` and a tabular count), rows of content, and a screw at
  each bottom corner.
- **Internal Padding:** 12px, opening to 20px at `md`. Rack units run 28×32px.

### Navigation

The fixed header is the meter bridge, not a bar above the page. It reads the
page: a scroll-spy over a thin band across the middle of the viewport
(`rootMargin: -45% 0px -50% 0px`) lights exactly one amber lamp for the section
being read, and the lamp goes out when the reader leaves. The set of visible
sections is tracked rather than latched, so a lamp never claims a section the
reader has left.

- **Style:** channel legends printed on label tape (ink on ivory, 11px, tracked
  uppercase), each with a lamp above it. Left is the nameplate: walnut stripe,
  wordmark in Anybody at `wdth` 84 / `wght` 700, and the studio line in small
  legend. Right is the peak ladder, the small record button, and a brass screw
  at each end.
- **Active:** amber lamp with a soft 2px amber ring; tape text goes to full ink.
- **Default / hover:** rail-coloured lamp brightening to dim silkscreen; tape
  text from dim ink to full ink.
- **Mobile:** below `lg`, the legends collapse into a sheet — the bay pulled out
  of the rack. Same legends, stacked as recessed rows with a lamp each, the
  nameplate at the top and a full-width commit button at the bottom. The sheet
  loads on first pointer or focus of the trigger, not on page load.
- **Skip link:** an ivory tape strip in legend type, visible on focus.

### Signature: the VU movement

The two master meters are drawn from real face geometry, not a decorative arc.
Deflection follows voltage, not decibels, so the printed marks crowd towards the
left pin: a mark for `db` lands at `10^((db - 3) / 20)` of a 60° sweep
(`-30°` to `+30°`). That puts 0 VU at 71% of the arc, where a real face puts it.
The pivot sits below the viewBox at `154, 228`, because the pointer emerges from
behind the bottom bezel of a real movement, and the box is trimmed to the bezel
so the caller gets no invisible padding to fight. The needle tip stops at
`r = 184`, just past the scale arc; a pointer that overshoots its own scale reads
as a broken movement.

The face carries the scale and nothing else: eleven major marks, nine minor
marks, and numerals only on the seven marks with room around them, because the
`-3 / -2 / -1` cluster collides inside 20px of arc. Below `md` the numerals are
dropped and the marks carry the scale alone, which is what a small movement does
in life. The channel legend is engraved on the panel below the face, where the
needle cannot strike through it.

**The two movements are separately specified units.** `UNIT` in
`components/desk/vu-meter.tsx` is a table with an `l` entry and an `r` entry,
and each entry differs on four things: the glass gradient vector and its peak
opacity (0.20 across a shallow diagonal on the left, 0.075 across a steeper one
on the right), a three-stop face tone (the left cooler and fresher, the right an
older unit whose paper has gone warmer and a shade darker), four bezel screw
slot angles, and — through the level engine — its own resting deflection. A
matched pair on a real desk is two separately manufactured movements, fitted at
different times and aged by the same room at different rates. Differing the
glass alone was tried and it was not enough: it moved the rendered faces by
about one level, which nobody sees.

A future contributor must not collapse these two entries into one shared
definition, and must not "fix" the pair by making them match. Identical
movements make one object look duplicated instead of two objects looking lit,
and that is the single defect this component exists to avoid.

### Signature: the level engine

`components/desk/level-engine.tsx` is the only motion system on this site. It
publishes three custom properties on the document element — `--vu-l`, `--vu-r`
and `--vu-drive`, all registered with `@property` as `<number>` so they can be
pushed 60 times a second without re-parsing.

Two properties make it an instrument. It measures something real: the drive is
the visitor's own scroll speed and pointer speed, never synthetic audio, so the
meters never imply a measurement of the studio that nobody took. And it obeys VU
ballistics: a second-order system with damping ratio 0.8 and natural frequency
16.7 rad/s, which puts settling at about 300ms with about 1.5% overshoot, so the
needles have weight and never snap.

Rest is per channel. `REST_L` is `0.070` and `REST_R` is `0.098`, and the
`@property` initial values carry the same two numbers, so untouched needles show
room noise just above -20 before any script runs — which is also the reading
reduced-motion visitors keep. The two channels rest apart because no two moving
coils zero at the same place. Under signal the right channel follows the left
through a one-pole lag and the pair converges, which is what being ganged means.
Changing one of these four numbers without the other three puts the registered
initial value out of step with the engine, and the needles jump on hydration.

Cost is bounded at both ends. The loop never starts under
`prefers-reduced-motion`, stops when the tab is hidden, and stops again once the
needles are at rest with no input for 1100ms. On load the needles slam to full
scale for 320ms and fall back through the same ballistics: a power-on self-test,
not an entrance animation. The only CSS animations in the system cover what the
engine cannot — `lamp-warm` (1.4s opacity) and `plate-settle` (0.7s, 6px rise).

### Named Rules

**The One Motion System Rule.** Extend the level engine or add nothing. A new
moving thing reads `--vu-l`, `--vu-r` or `--vu-drive`; it does not start its own
timer, its own `requestAnimationFrame` loop, or its own keyframe loop.

**The Real Measurement Rule.** A meter, ladder or readout shows either the
visitor's own activity or a number the studio can stand behind. Never a fake
metric dressed as an instrument reading.

**The Two Units Rule.** Anything the desk carries a matched pair of is specified
twice, with real differences in the specification. A pair drawn from one
definition is one object rendered twice, and it looks like it.

## Do's and Don'ts

### Do:

- **Do** treat colour as hardware. Three roles only: amber `#e8a020` for signal
  present, green `#58b08a` for routed or available, red `#d63a22` for past 0 dB
  and the one committing action.
- **Do** declare elevation once, with `panel`, `panel-raised`, or
  `panel-recessed`.
- **Do** give a repeated chassis shade a name and a role instead of retyping the
  hex. `--panel-sunk`, `--rail-lit`, `--shadow-deep`, `--specular`,
  `--ink-faint` and `--brass-dark` each name a physical condition, and two of
  them state their own limit: `--shadow-deep` is a depth and never an ink,
  `--specular` is light and never opaque.
- **Do** use `data-numerals="tabular"` on every real measurement, count, and
  model number.
- **Do** put section identity in the chassis: a rail with a left and right
  legend, a plate legend, or a bay header.
- **Do** consume `--bridge` for anything that has to clear the fixed header, and
  add `under-bridge` to every section that is an in-page anchor target.
- **Do** flip whole paper regions with `[data-field="paper"]` rather than
  recolouring components one at a time.
- **Do** keep the two VU movements specified separately, with their own glass
  vector, face tone, screw angles and resting deflection. The pair is two units,
  not one unit drawn twice.
- **Do** keep `min-h-[1.84em]` on channel-bank titles. It is two lines at the
  0.92 badge line-height, and it is the only reason the copy blocks in a bank
  row start level when one title wraps and its neighbours do not.
- **Do** keep the recessed bay with tape strips inside it, even though a bay
  containing applied labels reads as three nested cards to a generic depth
  check. A patchbay is a recess in the chassis and it is labelled with printed
  tape stuck on top; the nesting is the object.
- **Do** keep credential and legend lines uppercase at 32–37 characters —
  "Volkswagen Financial Services", "Vilnius LT · 54.69°N 25.28°E". A generic
  uppercase-length limit assumes running prose; these are silkscreened panel
  legends, which are uppercase in life and are read as labels, not sentences.
- **Do** keep the featured blockquote at `line-height: 1.14`. It is display
  type at `clamp(1.55rem, 3.1vw, 2.8rem)`, where body-copy leading floors do not
  apply; the same line at 1.4 stops holding together as a display block.
- **Do** set the featured quote in sentence case even though the display recipe
  uppercases elsewhere. A 160-character quotation in caps becomes a shout and
  misrepresents how the referee wrote it. Display voice there comes from the
  face, the width axis, and the size.
- **Do** read `#000` and `#fff` in the built stylesheet as vendor baseline, not
  as system colour. Both come out of the vendored `shadcn/tailwind.css` and
  `tw-animate-css` imports, which this build does not author and does not fork.
  This system's own deepest value is `--shadow-deep` (`#0a0908`) and its own
  white is `--specular` (`#ffffff`), which appears only as light on glass at
  0.20 opacity or less.
- **Do** draw hardware as real SVG geometry with real travel and real marks.
- **Do** name every action in plain words. The console lives in the hardware,
  not in the vocabulary.
- **Do** stamp provenance beside any raster this build authors. Both shipped
  textures ship as WebP with a `.webp.json` sidecar, because WebP has no text
  chunk to stamp into. Each sidecar carries the full generation record —
  `public/textures/walnut.webp` (48×1024, lossless, 13.7KB, every along-length
  term periodic in the tile height so it repeats down the page with no seam) and
  `public/textures/chassis.webp` (1600×620, quality 90, 39.6KB, one baked raking
  key light, and the note that its grain amplitude was chosen by looking at the
  rendered page rather than by maximising the metric).
- **Do** keep `components/ui/` to what is actually used. It holds `button.tsx`
  and `sheet.tsx`, and `button.tsx` is there only because `sheet.tsx` uses it
  for the close control. A vendored component nobody renders is a second style
  vocabulary waiting to be picked up.

### Don't:

- **Don't** use red outside a meter's over-zone or the commit lamp. Not for
  errors, not for badges, not for emphasis.
- **Don't** put a border and a shadow on the same surface.
- **Don't** set anything in `--shadow-deep`, and don't use `--specular` at full
  opacity. One is a hole, the other is a highlight.
- **Don't** add a monospace family. There is none, and monospace as a costume
  for "technical" is out.
- **Don't** write an eyebrow, a kicker, or an "Our Services"-style tracked line
  above a heading. If the section needs that line, make it the heading.
- **Don't** take legend type below 11px.
- **Don't** introduce a type size off the ramp. The steps are 30, 21, 15, 14.5,
  14, 13.5, 13, 12 and 11px plus the four display clamps; snap to the nearest
  one.
- **Don't** condense type with `transform: scaleX()`. Use Anybody's `wdth` axis.
- **Don't** hardcode the header height. It is `--bridge`, at every breakpoint.
- **Don't** start a second animation loop, a timed keyframe loop, or a scroll
  library. Extend the level engine.
- **Don't** change `REST_L` or `REST_R` without changing the matching
  `@property` initial value in `app/globals.css`. The registered value is what
  the page shows before hydration and under reduced motion.
- **Don't** collapse the `UNIT` table in `components/desk/vu-meter.tsx` into one
  shared definition, and don't equalise the two rest values. The difference is
  the point.
- **Don't** feed a meter, ladder, or readout with invented data.
- **Don't** tile `public/textures/chassis.webp`. It carries one baked key light,
  so `chassis-face` stretches it to the module
  (`background-size: 100% 100%`, no repeat); tiling turns one light into many.
- **Don't** re-encode `public/textures/walnut.webp` lossily. It is lossless
  because artefacts at the tile boundary would put a seam in a texture whose
  whole point is not having one.
- **Don't** restore the 17 client logo rasters in `public/logos/` to the
  patchbay as they are. They are opaque 200×200 files with baked backgrounds,
  nine dark and eight light, so no single card colour holds them and the wall
  reads as mismatched tiles. The bay is name-led on printed tape instead. Marks
  return only when transparent, single-weight versions arrive.
- **Don't** turn the channel bank into separate cards. One chassis, scored by a
  1px line.
- **Don't** make an empty state apologise. An unfinished bay ships with its tape
  printed and nothing patched into it.
