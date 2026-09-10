# KastProductions

KastProductions sells two service lines from one web page. Both lines involve agents, so a reader has to be able to tell which kind of agent a sentence means. This glossary fixes the words.

## The offer

**Software factory on demand**:
The company's promise, covering everything KastProductions sells. It is not the name of a service line.
_Avoid_: Software Factory (as a service name), factory model, AI factory

**Backlog runs**:
The service line where our coding agents work the client's backlog and a named reviewer signs every merge.
_Avoid_: development as a service, dev shop, Sprint (Sprint is a way to buy this line, not the line itself)

**Standing agents**:
The service line where we build an agent, deploy it into the client's own accounts, and operate it month to month.
_Avoid_: Agent builds, AI agents (as a service name), agent as a service

**Brief**:
The client's issue stating the problem, the acceptance criteria and the constraints. It is the unit we price.
_Avoid_: requirement, ticket, story, scope document

## Backlog runs

**Run**:
One feature, from approved brief to merged pull request.
_Avoid_: task, ticket, sprint, engagement

**Run record**:
The full log of one run: every tool call, test result, review comment and decision.
_Avoid_: audit log, transcript, report

**Reviewer**:
The named engineer who reads the whole diff and signs the merge.
_Avoid_: our team, the reviewers, QA

**Coding agent**:
An agent we operate on the client's backlog. It works one run and stops.
_Avoid_: agent on its own (the other line sells agents to clients), bot, the AI

## Standing agents

**Standing agent**:
An agent we build for a client. It runs unattended in the client's systems until someone turns it off. One standing agent is one deployment, addressed by one name.
_Avoid_: bot, assistant, AI employee, coding agent (that one is ours, and it stops)

**Channel**:
The place a standing agent is reachable, which is a place the client's team already works. A person addresses the agent there by name.
_Avoid_: integration, interface, front end, chat bot

**Session**:
One piece of work a standing agent does, from the message that starts it to the answer that ends it.
_Avoid_: run (that word belongs to the other line), conversation, thread, job

**Subagent**:
An agent that a standing agent delegates one piece of work to. It starts with no context of its own and hands back a result.
_Avoid_: worker, child agent, tool

**Approval gate**:
The point where a standing agent stops and waits for a named person before it acts.
_Avoid_: human in the loop, confirmation step, guardrail

**Outward action**:
An action that reaches someone outside the client company: a sent email, a published page, a posted message, a payment. Only a named person at the client approves one.
_Avoid_: customer-facing action, external action, destructive action

**Spend cap**:
The agreed ceiling on model cost for one session. A session that reaches it stops and asks a person, or stops and reports when there is nobody to ask.
_Avoid_: budget, quota, limit, guardrail

**Eval suite**:
The written definition of correct for one standing agent. It runs on every change to that agent.
_Avoid_: tests, benchmarks, QA

**Starting kit**:
A public agent template we adapt for a client. It is where a build starts, and never what the client buys.
_Avoid_: boilerplate, scaffold, our platform, framework

## Tiers

**Tier**:
The authority a client hands to one standing agent. There are four: Reporter, Operator, Department and Bespoke.
_Avoid_: ladder, level, plan, package

**Reporter**:
The tier where a standing agent reads the client's systems and reports what it finds. It takes no outward actions.
_Avoid_: basic, starter, tier 1

**Operator**:
The tier where a standing agent does the tasks the team hands it, with an approval gate on every outward action.
_Avoid_: pro, standard, tier 2

**Department**:
The tier where a standing agent and its subagents run one whole function of the company.
_Avoid_: enterprise, premium, tier 3, agent team

**Bespoke**:
The door for a company whose need matches no tier. They describe the work and get a short spec and a fixed price within one working day.
_Avoid_: custom, enterprise, contact us, tier 4

## Ways to buy

**Sprint**:
One brief on the backlog runs line, two weeks, one fixed price.

**Embedded**:
Our coding agents and one of our engineers on the client's backlog, month to month.

**Build**:
The fixed-price work of building one standing agent and deploying it into the client's own accounts.

**Operate**:
The monthly work of keeping one standing agent correct and current after it is live.
