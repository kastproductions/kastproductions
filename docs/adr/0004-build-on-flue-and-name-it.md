---
status: accepted
date: 2026-09-13
supersedes: 0001-name-the-agent-stack
---

# Build on Flue, and name it on the page

Every standing agent we build runs on Flue, the open agent framework published at `withastro/flue` under Apache-2.0. The page names it and links it, for the reason ADR 0001 named a stack at all: a reader cannot check "we keep your agent current" against a framework we refuse to name.

## Considered options

eve on Vercel, the choice in ADR 0001, ties a client's agent to one host. Flue deploys to Node.js, Cloudflare, AWS, Docker, Fly.io, Railway, Render, SST, GitHub Actions and GitLab CI. It takes verified events from Slack, Teams, Discord, GitHub, Linear, Notion, Stripe, Shopify, Twilio and WhatsApp, and it runs any model provider. The client keeps the host, the database and the model swappable, which is the rule we already hold ourselves to: the accounts, the keys and the code are the client's.

Saying nothing about the framework reads safer and gives a client nothing to hold us to.

## Consequences

Flue ships no agent templates and no deploy button. There is no catalogue to resell, so every ready-made product we sell is a product we build. Deployment is a target, a Vite build and an upload, which is why the page promises a lead time instead of a click.

Flue names no approval gate and no spend cap. Both are our own code, written for each agent, and the mechanism in ADR 0003 rests on them. The copy says whose work they are.

`@flue/runtime` is 2.0.5, and its harness core, `@earendil-works/pi-agent-core`, is 0.83. We take a public dependency on software that still moves. Holding a client's agent steady while it moves is the labour the monthly fee pays for, which is the trade ADR 0001 accepted for a different framework.

eve leaves the site: the stack section, the four `vercel-labs` starting-kit links, and every link to eve.dev. Where we read an MIT-licensed template while building a product of our own, the copyright notice travels with any source we copy into our repository. That rule governs our repositories and not the page.

Apache-2.0 §6 permits the descriptive use of the name. We write "Flue" in text, with a link. We do not use the logo, and we never imply that Flue endorses us.
