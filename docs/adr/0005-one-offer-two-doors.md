---
status: accepted
date: 2026-09-13
---

# One offer, two doors, and no authority ladder

The site sold two service lines side by side, and a reader had to choose between them before learning what either one did. Both lines end in the same artefact: a standing agent that does work a company used to do by hand. The page now sells that one thing through two doors. Ready-made is a standing agent we have already built, adapted to the client and deployed into the client's accounts. Custom is a standing agent we shape from the client's workflow.

## Considered options

The authority ladder (Reporter, Operator, Department, Bespoke) sorted the offer by how much power a client hands over. It asks a reader to classify their own company before it shows them a price. A reader arrives with a job to get done, so products are organised by that job, and authority becomes one line inside each product.

Keeping the backlog work as its own service line was the other option. The software factory product does that same job, so the page would sell one outcome twice. The backlog work becomes a way to buy instead. Self-run means the client runs the agent. Managed means our coding agents take the runs and a named reviewer signs every merge.

Custom stops being the fourth rung and becomes an equal door. No two companies work the same way, and shaping an agent to one company is the work we are best at. It cannot sit at the bottom of a ladder, where it reads as the option for readers the ladder failed.

## Consequences

The four tier prices must re-attach to products, and `/standing-agents` retires behind a redirect.

ADR 0002 still holds, and it now covers both doors. One named agent is one deployment, whether we built it before this client arrived or after.

The 17 client companies and the 6 references describe work the founder shipped before this offer existed. They stay on the page as the reason to trust us, and never as evidence for a product.
