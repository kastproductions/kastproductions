# 05: The product page and the five job pages read like the home page

**What to build:** A buyer who clicks an item in the home page's work list lands on a page in the same voice and the same world. Issue to pull request and the five job pages (content publishing, social scheduling, support ticket triage, failed payment recovery, Shopify operations) each say what the agent does, in steps, where it stops for a named person, and which systems it touches. The product page also shows the prerequisites with who owns each one, and the price. The copy comes from the `copywriting` skill. The shared job page and product page components carry the new section structure, and the five job records carry the new words. A section scene from ticket 02 goes where it helps the page. See "Copy" in `../spec.md`.

**Blocked by:** 01, 02, 04

**Status:** done

- [x] All six pages keep their URLs, canonicals and titles. A description changes only where the page's subject changes, and it stays within the measured lengths.
- [x] Each page states the steps, the approval point and the systems in buyer words. No heading uses "station" or "authority".
- [x] The product page prints its prerequisites with "You" or "We" against each line, its price and its lead time, from the content module.
- [x] The example run table keeps its "Example" label.
- [x] Copy is edited against the humanizer checklist, and each changed record's copy date is the commit day.
- [x] Checked with agent-browser at 390px and 1440px.
- [x] `bun run test` passes.

## Notes from the build

- All six pages read in one order: the first screen, then numbered steps with "Where it stops for a person" under them, then the systems, the channels and the price. Each section carries its number, as on the home page.
- The gate block is `src/components/stop-point.tsx`, shared by the product page and the job page component.
- Scenes: support triage opens on the support desk, failed payment recovery on the finance desk, Shopify operations on the shop floor. Content publishing and social scheduling have no matching scene, so they open on the sun disc. The product page keeps the example run record in its hero and places the pull request scene beside the stop block.
- The product page's prerequisites section is now "What it touches" (id `systems`), because the prerequisites are the systems it touches, each with You or We. The lead time is printed there and under the price card.
- The main call to action on these pages is "Get a spec and a fixed price", as on the home page. The string moved to `briefCta` in `content.ts`, because three pages print it now.
- Descriptions did not change: no page's subject changed. They still say "standing agent", which the ticket left in place.
- The example run table keeps its "Example" label and its rows as they were.
