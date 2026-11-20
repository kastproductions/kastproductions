# 03: Managed and Sprint get their own page

**What to build:** A buyer who wants our coding agents working on their repository, without owning an agent, can read the new `/backlog` page. Its search title is "AI coding agents for your backlog". The page explains Managed and Sprint: how a run goes from a brief to a draft pull request that our reviewer signs, what each plan includes, and its price. The copy comes from the `copywriting` skill in plain buyer language, and the page uses the Neo Mirai world. The page record puts it in the sitemap, in `llms.txt` and in the graph, and its graph carries the Managed and Sprint offers. The home page still prints all four plans until ticket 04 moves them. See "The offer and the page set" in `../spec.md`.

**Blocked by:** 01

**Status:** done

- [x] `/backlog` builds from one page record in the written pages list, with its prose in its own route file (ADR-0004).
- [x] The plans carry a field that says which page prints them. The backlog page prints Managed and Sprint from the content module, so the prices are written in one place.
- [x] The backlog page's graph carries the Managed and Sprint offers. A test in the structured data or page graph suite asserts that.
- [x] The title and description fit the lengths the head suite measures. The page is in the sitemap and in `llms.txt`, and the existing suites cover it with no new route list.
- [x] Every claim follows the Claims section of the README. A synthetic run on the page carries the "Example" label.
- [x] Copy is edited against the humanizer checklist, and the record's copy date is the commit day.
- [x] Checked with agent-browser at 390px and 1440px.
- [x] `bun run test` passes.
