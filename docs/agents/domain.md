# Domain docs

How the engineering skills consume this repo's domain documentation when they explore the
codebase. This repo is single-context: one `CONTEXT.md` and one `docs/adr/` at the root.

## Before exploring, read these

- `CONTEXT.md` at the repo root: the glossary of KastProductions terms.
- `docs/adr/`: read the ADRs that touch the area you are about to work in.

If a file does not exist, proceed silently. Do not flag its absence, and do not suggest
creating it upfront. The `/domain-modeling` skill, reached through `/grill-with-docs` and
`/improve-codebase-architecture`, creates these files when a term or a decision is
actually resolved.

## File structure

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-<decision>.md
│   └── 0002-<decision>.md
└── src/
```

A repo with several contexts uses a root `CONTEXT-MAP.md` that points at one `CONTEXT.md`
per context. This repo does not, so treat the root `CONTEXT.md` as the only glossary.

## Use the glossary's vocabulary

When your output names a domain concept, in an issue title, a refactor proposal, a
hypothesis or a test name, use the term as `CONTEXT.md` defines it. Each entry lists the
synonyms to avoid, so do not drift to them.

If the concept you need is missing from the glossary, that is a signal. Either you are
inventing language the project does not use, which you must reconsider, or there is a
real gap to note for `/domain-modeling`.

## Flag ADR conflicts

If your output contradicts an existing ADR, say so instead of overriding it silently:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
