# 04: The home page tells one story

**What to build:** A buyer who reads the home page from the top meets one offer in one order. First the hero, with one main call to action and the hero scene. Then the client strip, then one list of the work an agent can take off their team (the ready-made product first, then the five jobs, each with its systems and its page link, plus a way in for work not on the list). Then how a build goes in numbered steps, why it is safe in four points, and where the agent lives. Then pricing with only Self-run (ready-made) and Custom plus one line that links `/backlog`, then the founder with one quote, about six FAQ questions and the closing call to action. All copy comes from the `copywriting` skill. Internal terms ("door", "standing agent", "station", "authority") leave headings and calls to action. The `/work` redirect points at the new work section. See "The home page order" and "Copy" in `../spec.md`.

**Blocked by:** 01, 02, 03

**Status:** ready-for-agent

- [ ] The home page's sections appear in the order the spec lists. The two lists of five ("what we shape it around", "how we keep it right") are replaced by the four-point safety section.
- [ ] The pricing section prints only Self-run and Custom, with build and monthly prices, the prerequisites note and the lead time. It links `/backlog` once.
- [ ] The home graph carries only the plans and the questions the page prints, and a test asserts that Managed and Sprint are absent from it.
- [ ] The FAQ has about six questions, and the graph marks up the same list.
- [ ] "Door", "standing agent", "station" and "authority" appear in no heading and no call to action on the page.
- [ ] The `/work` redirect in the Vercel config targets the new work section's anchor, and the anchor exists in the export.
- [ ] The hero scene loads eagerly with its size set. Section scenes load lazily.
- [ ] The synthetic console keeps its "Example" label. No case study or figure is invented, and the quote is printed as written.
- [ ] Copy is edited against the humanizer checklist, and the home record's copy date is the commit day.
- [ ] Checked with agent-browser at 390px and 1440px.
- [ ] `bun run test` passes.
