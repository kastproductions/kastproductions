# 09: One design and quality pass across the whole site

**What to build:** A visitor moving through every page finds one consistent site: the same spacing rhythm, type scale, section numbering, ornaments and voice, with nothing left over from the old design. Run the impeccable audit and polish steps across all routes. Check accessibility, responsive layout, image weight, font loading and first paint, and fix what they find. Read every page's copy once end to end against the humanizer checklist. See the whole of `../spec.md`.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08

**Status:** ready-for-agent

- [ ] No token, class or font of the old design (Schibsted Grotesk, IBM Plex Mono, coral, the dark variant) remains in the source.
- [ ] Every page reads at 390px, 768px and 1440px wide with no sideways scroll, checked with agent-browser.
- [ ] Heading order is correct on every page. Every illustration has alt text, and decorative ornaments are hidden from assistive technology.
- [ ] The hero paints its heading without waiting for an image or a late font swap that moves the layout.
- [ ] Every existing URL resolves with the same canonical, and the `/work` redirect lands on the work section.
- [ ] The README's sections on styling, claims and adding a page match the new design and page set.
- [ ] `bun run test` passes.
