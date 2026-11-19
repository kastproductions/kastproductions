# 05: The product page and the five job pages read like the home page

**What to build:** A buyer who clicks an item in the home page's work list lands on a page in the same voice and the same world. Issue to pull request and the five job pages (content publishing, social scheduling, support ticket triage, failed payment recovery, Shopify operations) each say what the agent does, in steps, where it stops for a named person, and which systems it touches. The product page also shows the prerequisites with who owns each one, and the price. The copy comes from the `copywriting` skill. The shared job page and product page components carry the new section structure, and the five job records carry the new words. A section scene from ticket 02 goes where it helps the page. See "Copy" in `../spec.md`.

**Blocked by:** 01, 02, 04

**Status:** ready-for-agent

- [ ] All six pages keep their URLs, canonicals and titles. A description changes only where the page's subject changes, and it stays within the measured lengths.
- [ ] Each page states the steps, the approval point and the systems in buyer words. No heading uses "station" or "authority".
- [ ] The product page prints its prerequisites with "You" or "We" against each line, its price and its lead time, from the content module.
- [ ] The example run table keeps its "Example" label.
- [ ] Copy is edited against the humanizer checklist, and each changed record's copy date is the commit day.
- [ ] Checked with agent-browser at 390px and 1440px.
- [ ] `bun run test` passes.
