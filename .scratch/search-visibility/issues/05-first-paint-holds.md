# The first paint does not move

Status: ready-for-agent
Source: GitHub issue #12, opened on 2026-09-20.

## What to build

A cold mobile load shifts once, 546 ms in, for a Cumulative Layout Shift of 0.0937. The hero lede drops 40 pixels, the buttons under it follow, and the console moves up to meet them. The cause is the web font replacing a fallback whose metrics do not match.

0.0937 passes, but the threshold is 0.1 and there is no margin left for a slower device or a longer heading. Take the shift to zero.

## Acceptance criteria

- [ ] A cold mobile load at a 390 pixel viewport, with the cache cleared, reports a Cumulative Layout Shift of 0.
- [ ] The hero lede, the buttons under it and the console hold their position from first paint through the font swap.
- [ ] Largest Contentful Paint on that load stays under 1.2 seconds.
- [ ] The fix survives a copy edit: it does not depend on a height hard-coded for one wording at one breakpoint.
- [ ] The measurement, before and after, is recorded on this issue.

## Blocked by

- None (can start immediately).
