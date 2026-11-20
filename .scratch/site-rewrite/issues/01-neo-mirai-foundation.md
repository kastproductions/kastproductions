# 01: Every page wears the Neo Mirai world

**What to build:** A visitor who opens any page today sees the Neo Mirai world, while the copy stays the same. That means gold paper with grain and the 112px grid, ink text, Chakra Petch headings, Zen Old Mincho body text, Azeret Mono labels, a header and footer redrawn with a KP stamp seal, a vertical rail, and the sun and eclipse ornaments. Buttons, cards, badges, the accordion, the mobile menu sheet and tables are rethemed through tokens. Dark mode is removed. `PRODUCT.md` and `DESIGN.md` are written through the impeccable init and document steps, so every later ticket reads one brief and one system. See ADR-0006 and the Design section of `../spec.md`.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] `PRODUCT.md` and `DESIGN.md` exist at the repo root and describe the Neo Mirai world as ADR-0006 adapts it (no Japanese text, light only).
- [x] The theme tokens hold the Neo Mirai palette, and no component hard-codes a colour that a token holds.
- [x] The three families load self-hosted through the framework's font loader. A name with Latin Extended glyphs (for example "Povilas Nanevičius") renders in a matching serif fallback, not a system font.
- [x] The dark class, its variables and its custom variant are gone. A system set to dark mode gets the light page, fully legible.
- [x] The header, footer and skip link are redrawn. The KP seal and the sun and eclipse ornaments are hand-drawn SVG with no ray motif.
- [x] Focus is visible on every interactive element, and colour contrast meets WCAG AA for body text and controls.
- [x] Every page reads at 390px and 1440px wide with no sideways scroll, checked with agent-browser screenshots.
- [x] `bun run test` passes.
