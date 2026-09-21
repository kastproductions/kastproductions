# The first paint does not move

Status: done
Source: GitHub issue #12, opened on 2026-09-20.

## What to build

A cold mobile load shifts once, 546 ms in, for a Cumulative Layout Shift of 0.0937. The hero lede drops 40 pixels, the buttons under it follow, and the console moves up to meet them. The cause is the web font replacing a fallback whose metrics do not match.

0.0937 passes, but the threshold is 0.1 and there is no margin left for a slower device or a longer heading. Take the shift to zero.

## Acceptance criteria

- [x] A cold mobile load at a 390 pixel viewport, with the cache cleared, reports a Cumulative Layout Shift of 0.
- [x] The hero lede, the buttons under it and the console hold their position from first paint through the font swap.
- [x] Largest Contentful Paint on that load stays under 1.2 seconds.
- [x] The fix survives a copy edit: it does not depend on a height hard-coded for one wording at one breakpoint.
- [x] The measurement, before and after, is recorded on this issue.

## Blocked by

- None (can start immediately).

## Comments

The shift reproduces as reported: one event, 0.0937, the hero lede down 40 pixels. Every
time below is from this measurement, so the shift lands at 570 ms here against the 546 ms
on the issue. The delay the harness puts on the font sets when the swap lands, not whether
it lands. Both font families now load `display: "optional"` in `src/app/layout.tsx`, which
is the whole change.

### How it was measured

`bun run build`, then the export in `out/` served from a local Bun server that holds every
`.woff2` response back by a set number of milliseconds. That delay is what a cold mobile
connection does to a 90 kB font, and without it a load from disk is too fast to show the
fault at all. The browser is `agent-browser`: a new named session per load, so the cache
starts empty; viewport 390 by 844 at device pixel ratio 3; a `PerformanceObserver` for
`layout-shift` and `largest-contentful-paint` registered before the first navigation with
`open --init-script`. Every session was closed at the end of its run, and
`agent-browser session list` reports none.

### Before, at a 500 ms font delay

Cumulative Layout Shift 0.0937, from one shift 570 ms in. Largest Contentful Paint 380 ms,
on the hero lede. The shift moves, in one frame: the lede down 40 pixels, from y 299 to
y 339; the buttons from y 531 to y 571, their block shrinking from 108 pixels to 48 as they
stop wrapping; the console up from y 682 to y 662.

### After

Cumulative Layout Shift 0, with no shift recorded at all, at every font delay tried: 0, 60,
150, 300, 500 and 800 ms. Largest Contentful Paint runs from 228 ms with no delay to 488 ms
at 800 ms, and is 336 ms at the 500 ms delay that reproduces the reported swap. The custom
page reads the same: Cumulative Layout Shift 0, Largest Contentful Paint 280 ms.

A load that gets the font in time still draws in Archivo, checked by measuring a string in
`var(--font-text)` against the same string in `"Archivo"`. A load that does not keeps the
fallback for that pageview and draws it once.

### Why not a metric-matched fallback on its own

Next.js already generates one, and it is already switched on: `--font-archivo` resolves to
`"Archivo", "Archivo Fallback"`, and `Archivo Fallback` carries `size-adjust: 98.7%` with
ascent and descent overrides. It cannot hold the position here, for two reasons.

The first is the width axis. Archivo carries the display sizes at `font-stretch: 118%`. No
fallback has a width axis, so the heading is set narrow until the swap lands and then
rewraps wider, one line taller. That extra line is the 40 pixels, and it follows the
wording: a copy edit moves where it happens rather than removing it. The prose runs the
other way, the fallback being the wider of the two, which is why the buttons unwrap.

The second is that the generated face is not reachable everywhere. Its source is
`local("Arial")`, so on a machine with no face of that name it fails outright:
`document.fonts` reports `Archivo Fallback: error` in the browser used for this
measurement, and the stack falls through to the unadjusted system sans. The overrides are
worth keeping for the platforms that do have Arial, but they cannot be the guarantee.

`optional` removes the swap instead of trying to survive it. The browser uses the web font
if it has it when it draws, and otherwise keeps the fallback for that pageview. The page is
laid out once either way, so nothing can move, whatever the copy says. The preload stays
on: it gives the font its chance to arrive before the paint, and it puts the font in the
cache for the next page.

The cost is worth stating, and it has two parts. A first-time reader on a slow connection
now sees the fallback face for that whole pageview, where before they saw it for 570 ms and
then the swap. The width axis, which the design leans on, is absent in that state. Both
screenshots were checked at 390 pixels and the fallback page is coherent: the heading is
one line shorter and the two buttons stack. Every later page in the session draws in
Archivo from cache. The second part is that `optional` has a block period of about 100 ms
that `swap` did not have, in which text set in either family is laid out but not drawn. It
costs the measured Largest Contentful Paint nothing at this size, but it is the reason a
load can paint its rules before its words.
