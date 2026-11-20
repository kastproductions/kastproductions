# 04: The home page tells one story

**What to build:** A buyer who reads the home page from the top meets one offer in one order. First the hero, with one main call to action and the hero scene. Then the client strip, then one list of the work an agent can take off their team (the ready-made product first, then the five jobs, each with its systems and its page link, plus a way in for work not on the list). Then how a build goes in numbered steps, why it is safe in four points, and where the agent lives. Then pricing with only Self-run (ready-made) and Custom plus one line that links `/backlog`, then the founder with one quote, about six FAQ questions and the closing call to action. All copy comes from the `copywriting` skill. Internal terms ("door", "standing agent", "station", "authority") leave headings and calls to action. The `/work` redirect points at the new work section. See "The home page order" and "Copy" in `../spec.md`.

**Blocked by:** 01, 02, 03

**Status:** done

- [x] The home page's sections appear in the order the spec lists. The two lists of five ("what we shape it around", "how we keep it right") are replaced by the four-point safety section.
- [x] The pricing section prints only Self-run and Custom, with build and monthly prices, the prerequisites note and the lead time. It links `/backlog` once.
- [x] The home graph carries only the plans and the questions the page prints, and a test asserts that Managed and Sprint are absent from it.
- [x] The FAQ has about six questions, and the graph marks up the same list.
- [x] "Door", "standing agent", "station" and "authority" appear in no heading and no call to action on the page.
- [x] The `/work` redirect in the Vercel config targets the new work section's anchor, and the anchor exists in the export.
- [x] The hero scene is placed with its size set, so the layout does not shift.
- [x] The synthetic console keeps its "Example" label. No case study or figure is invented, and the quote is printed as written.
- [x] Copy is edited against the humanizer checklist, and the home record's copy date is the commit day.
- [x] Checked with agent-browser at 390px and 1440px.
- [x] `bun run test` passes.

## Notes from the build

- The hero heading stays as it was. The Open Graph image draws it, and ticket 08 redraws that image. The lede is new and drops "standing agent".
- The example console moved from the hero to the safety section, next to the rule it shows. Its "Authority" reading is now "May do alone".
- The founder section places the pull request scene beside the quote. The other room scenes are left for the job and product pages (ticket 05).
- The six questions kept: who owns the code, what we need already, the spend cap, what it is built on, uptime, and why not build it ourselves. Approval and the eval suite left the list, because the safety section answers them.
- Plan cards print one price line each, "From €7,500 to build, then from €1,500 a month", so the graph offers the same strings the cards print.
- The eval suite page now links `/#safety`, and its record's copy date moved with its link text.
- The paper strip between the closing band and the footer is in the shared footer, so ticket 09 owns it.
