---
status: accepted
date: 2026-09-13
---

# Cloudflare is the default host, and Node.js is the named alternative

A standing agent deploys into the client's own account, so the page has to say which account. We name Cloudflare as the default and Node.js as the alternative for a client whose platform requires it. Flue supports ten deploy targets, and naming one keeps the prerequisites list short enough to print beside a price.

## Considered options

On Cloudflare, every agent conversation is a Durable Object with its own SQLite storage. Nothing is configured, and Flue rejects a `db.ts` file at build time. Scheduled work uses the platform's own cron triggers. A client provisions an account and nothing else.

On Node.js, the built server keeps conversations in memory by default and loses them on restart, so durable work means provisioning a database and maintaining a `db.ts` adapter. The Node path also carries a constraint a buyer should not have to hear first: each agent conversation needs exactly one live owner at a time, so scaling out is not a matter of adding replicas.

Leaving the target to the client reads generous and costs us the short prerequisites list, a default migration path and any claim about what the deployment needs.

## Consequences

A database leaves the prerequisites for the ready-made product. What stays is a GitHub organisation, a tracker, a chat workspace, a sandbox provider account, a model provider key and the Cloudflare account.

State lives in Durable Objects, which is not a decision a client reverses cheaply. Moving a live agent to Node.js later means provisioning a database and migrating conversation state, and we quote that as its own work.

Sandboxes stay the client's account either way. Flue's adapters are thin by design: the application creates and deletes provider sandboxes, and Flue connects to what it is handed. So the sandbox provider is a prerequisite we print and a bill the client owns, on both targets.
