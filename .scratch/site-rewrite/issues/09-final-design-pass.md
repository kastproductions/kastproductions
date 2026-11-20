# 09: One design and quality pass across the whole site

**What to build:** A visitor moving through every page finds one consistent site: the same spacing rhythm, type scale, section numbering, ornaments and voice, with nothing left over from the old design. Run the impeccable audit and polish steps across all routes. Check accessibility, responsive layout, image weight, font loading and first paint, and fix what they find. Read every page's copy once end to end against the humanizer checklist. See the whole of `../spec.md`.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08

**Status:** done

- [x] No token, class or font of the old design (Schibsted Grotesk, IBM Plex Mono, coral, the dark variant) remains in the source.
- [x] Every page reads at 390px, 768px and 1440px wide with no sideways scroll, checked with agent-browser.
- [x] Heading order is correct on every page. Every illustration has alt text, and decorative ornaments are hidden from assistive technology.
- [x] The hero paints its heading without waiting for an image or a late font swap that moves the layout.
- [x] Every existing URL resolves with the same canonical, and the `/work` redirect lands on the work section.
- [x] The README's sections on styling, claims and adding a page match the new design and page set.
- [x] `bun run test` passes.

## Notes from the build

- The footer has no top margin now. The last band's own padding is the gap, so a night closing band meets the night footer with no strip of paper, and a hairline marks the join.
- The footer stacks over the vertical rail. On the not-found page the band is at least 42rem tall where the rail shows, so the rail ends above the footer.
- The footer line no longer says "standing agent" or "approval gate". `tests/chrome.test.ts` holds the header and the footer of every page to no internal term. The product's prerequisite row says "The approval steps" in place of "The approval gates".
- The type ramp is a set of `--text-*` tokens in `globals.css`, documented in `DESIGN.md`. Every arbitrary rem size moved to the nearest step, and the detector reports no size off the ramp. `src/lib/utils.ts` names the steps for `cn`, because `cn("text-note text-prose")` otherwise drops the size as a second colour.
- The Self-run and Custom agent plans build their one price line from `issueToPullRequest.prices` and `custom.prices` (`buildThenMonthly`). The printed strings did not change, and the job pages still read `custom.prices`.
- Plan cards sit on a subgrid, so the prices of cards side by side start on one line.
- `tests/examples.test.ts` holds every `data-example` block to its "Example" badge, and the console handle and the work table briefs to sitting inside one. `tests/accessibility.test.ts` holds heading order and hidden drawings on every page.
- Left as they are: the page descriptions that say "standing agent" (the spec changes a description only when the page's subject changes), the terms page wording (legal text stays word for word), and three detector advisories in `globals.css` (the 112px grid and the grain and light colours, which ADR-0006 asks for).
- The hero check ran on a local server: the Chakra Petch files preload and have a size-adjusted fallback, and no page shifted more than 0.001 on load.
