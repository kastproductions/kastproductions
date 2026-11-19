# 06: The custom, Slack and eval suite pages read like the home page

**What to build:** A buyer whose work is not on the list reads `/custom` and learns how we take their workflow, write a spec with a fixed price within one working day, and build the agent around it, and what it costs. A buyer who thinks in tools reads `/slack` and sees how their team talks to the agent and where it stops for approval. A buyer who asks how anyone knows the agent is right reads `/eval-suite` and gets a plain answer. The copy on all three comes from the `copywriting` skill, in the Neo Mirai world. Every sentence on the Slack page about Slack or Teams stays one that Flue's documentation states, with the links kept. See "Copy" in `../spec.md` and the Claims section of the README.

**Blocked by:** 01, 04

**Status:** ready-for-agent

- [ ] All three pages keep their URLs, canonicals and titles. A description changes only where the page's subject changes.
- [ ] `/custom` prints the jobs list and the custom prices from the content module, in the same form the home page uses.
- [ ] Every Slack and Teams statement on `/slack` is one that the linked Flue documentation states.
- [ ] `/eval-suite` explains the eval suite with no internal jargon left unexplained, and it still prints no price.
- [ ] Copy is edited against the humanizer checklist, and each changed record's copy date is the commit day.
- [ ] Checked with agent-browser at 390px and 1440px.
- [ ] `bun run test` passes.
