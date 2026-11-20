# 06: The custom, Slack and eval suite pages read like the home page

**What to build:** A buyer whose work is not on the list reads `/custom` and learns how we take their workflow, write a spec with a fixed price within one working day, and build the agent around it, and what it costs. A buyer who thinks in tools reads `/slack` and sees how their team talks to the agent and where it stops for approval. A buyer who asks how anyone knows the agent is right reads `/eval-suite` and gets a plain answer. The copy on all three comes from the `copywriting` skill, in the Neo Mirai world. Every sentence on the Slack page about Slack or Teams stays one that Flue's documentation states, with the links kept. See "Copy" in `../spec.md` and the Claims section of the README.

**Blocked by:** 01, 04

**Status:** done

- [x] All three pages keep their URLs, canonicals and titles. A description changes only where the page's subject changes.
- [x] `/custom` prints the jobs list and the custom prices from the content module, in the same form the home page uses.
- [x] Every Slack and Teams statement on `/slack` is one that the linked Flue documentation states.
- [x] `/eval-suite` explains the eval suite with no internal jargon left unexplained, and it still prints no price.
- [x] Copy is edited against the humanizer checklist, and each changed record's copy date is the commit day.
- [x] Checked with agent-browser at 390px and 1440px.
- [x] `bun run test` passes.

## Notes from the build

- `/custom` prints the custom plan from `prices`, the same card and the same one price line as the home page, and its graph offers that plan. `custom.prices` stays, because the job pages still read it (ticket 05). Ticket 09 can fold the two into one record.
- `/custom` gains two sections: how a custom build goes, in four steps, and what the spec settles. Both state only what the home page, the eval suite page and the plan already state.
- `/slack` places the example console in its hero, with its "Example" label. Each Slack and Teams sentence was checked against Flue's two channel pages on 2026-11-20. Two sentences went because the pages do not state them: that the agent is "added to" a channel, and that it verifies a request "before it reads a word of it".
- `/eval-suite` drops "standing agent", "authority" and "session". The four things the suite checks are now the result, what it may touch, where it stops and what it may spend.
- The three pages take section numbers. `/custom` uses the sun disc as its hero ornament and `/eval-suite` the eclipse.
- The shared footer still says "standing agent" and "approval gate". It is outside `<main>`, and ticket 09 owns it.
