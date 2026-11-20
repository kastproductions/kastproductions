# 08: The unfurl image matches the new design

**What to build:** A person who shares any page in Slack or on LinkedIn sees an unfurl image in the Neo Mirai world: gold paper, ink, the sun disc and the KP seal, set in the new display family. The build-time font fetch changes from Archivo to that family, and the version query on the image URL goes up in the same commit, so scrapers fetch the new image. See "Machine-readable layer" in `../spec.md` and the Deployment section of the README.

**Blocked by:** 01

**Status:** done

- [x] The Open Graph image draws from the same tokens as the page and uses the new display family.
- [x] The version query on the image URL is higher than before, in the same commit as the redraw.
- [x] The image is still served as `image/png` and resolves in the export, as the Open Graph test asserts.
- [x] `bun run test` passes.
