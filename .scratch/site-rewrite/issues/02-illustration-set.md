# 02: A matching set of golden-hour illustrations

**What to build:** The site gets about five scenes in the Neo Mirai style, drawn by hand as inline SVG, ready for the page tickets to place. One is a hero scene of a golden-hour future Vilnius skyline with old-town spires, a red sun disc and small figures. Three or four are section scenes of teams at work with an agent: a support desk, a finance desk at night, an engineer reviewing a pull request, a shop floor. Each scene is a React component that draws with the theme tokens. The owner chose drawn SVG on 2026-11-20, in place of images generated through HeyGen. A new export test holds every image on the site to an accessible name and a set size. See the Illustrations section of `../spec.md`.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] About five scene components exist. Each draws with the gold, sun, night, ink and paper tokens and uses no literal colour.
- [ ] The scenes read as one set: the same palette, the same line weight and the same flat style as the Neo Mirai reference. None shows Japanese text, Japanese landmarks or a ray motif.
- [ ] Each scene carries `role="img"` and an accessible name. The content module holds that alt text, written as a description of what the scene shows.
- [ ] Each scene sets a `viewBox` and scales to its container with no layout shift.
- [ ] A new export test asserts that every `img` in `out/` has non-empty alt text, a width and a height, and a `src` that resolves to a file in the export, and that every `svg` with `role="img"` has a non-empty accessible name. The test covers the existing portraits too.
- [ ] No generated image and no prompt file ships in `public/`.
- [ ] `bun run test` passes.
