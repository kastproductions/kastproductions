# 02: A matching set of golden-hour illustrations

**What to build:** The site gets about five generated scenes in the Neo Mirai style, ready for the page tickets to place. One is a hero scene of a golden-hour future Vilnius skyline with old-town spires, a red sun disc and small figures. Three or four are section scenes of teams at work with an agent: a support desk, a finance desk at night, an engineer reviewing a pull request, a shop floor. Generate them with GPT Image through HeyGen, using the `media-use` skill and `HEYGEN_API_KEY` from the Agents vault, and give every scene one shared style prompt. A new export test holds every image on the site to alt text, a width, a height and a file that resolves. See the Illustrations section of `../spec.md`.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] About five scenes are committed as compressed webp at the sizes they render at. The hero scene is no more than about 250 KB, and each section scene is no more than about 150 KB.
- [ ] The scenes read as one set: the same palette, the same line and the same paper texture as the Neo Mirai reference. None shows Japanese text, Japanese landmarks or a ray motif.
- [ ] A text file next to the images holds the shared style prompt and each scene's prompt.
- [ ] The content module holds alt text for each scene, written as a description of what the scene shows.
- [ ] A new export test asserts that every `img` in `out/` has non-empty alt text, a width and a height, and a `src` that resolves to a file in the export. The test covers the existing portraits too.
- [ ] `bun run test` passes.
