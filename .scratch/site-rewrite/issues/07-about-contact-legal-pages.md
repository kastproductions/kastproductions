# 07: The about, contact, legal and not-found pages in the new world

**What to build:** A buyer checking the person behind the company reads `/about` with the founder's story, the 17 clients and the six references quoted as written. `/contact` shows the two ways to reach us and what follows a message. The about and contact copy comes from the `copywriting` skill. The privacy, terms and imprint pages and the not-found page move to the Neo Mirai world with their facts unchanged word for word. See "Copy" in `../spec.md` and the Claims section of the README.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The six references are printed exactly as the content module holds them, with portraits that keep their alt text, width and height.
- [ ] The legal pages state the same facts as before. A diff of their text content shows layout and markup changes only.
- [ ] `/contact` keeps its own mailto subject, and every booking link reads the one booking source, as the contact test asserts.
- [ ] Copy changes on about and contact are edited against the humanizer checklist, and each changed record's copy date is the commit day.
- [ ] Checked with agent-browser at 390px and 1440px.
- [ ] `bun run test` passes.
