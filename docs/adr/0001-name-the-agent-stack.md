---
status: accepted
date: 2026-09-10
---

# Name eve on Vercel as the default stack for agents we build

The agent line sells correctness and operation, and a reader cannot check either claim unless the page says what the agent is built on. We name eve on Vercel as the default, and we name one alternative for clients who do not run on Vercel: the plain AI SDK path, as in `vercel-labs/open-agents`. Self-hosted eve stays off the page, because the only artefact in the org is `vercel-labs/steve`, which Vercel itself calls a proof of concept.

## Considered options

Naming the stack with no alternative narrows the buyer to companies already on Vercel. Staying stack-agnostic in the copy reads safer, but then "we keep your agent current" names nothing a client can hold us to, and the monthly tier has no content.

## Consequences

We take a public dependency on pre-1.0 software from one vendor. Across the four templates read on 2026-09-10, `eve` spans 0.31.3 to 0.47.3 and `@vercel/connect` spans 0.6.1 to 2.0.1, and three sibling templates in `vercel-labs` are already archived. Keeping a client's agent current is ongoing labour, and that labour is what the monthly tier pays for.

Everything the stack assumes (state, credentials, model spend, sandboxes, durable sessions and scheduled work) sits inside the client's own vendor account. Ownership stays with the client, which is the same rule that governs work on a client's backlog.
