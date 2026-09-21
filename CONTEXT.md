# KastProductions

KastProductions builds standing agents. A reader meets two kinds of agent on the page: the one we build for a client, and the ones we run ourselves. This glossary fixes the words, so no sentence leaves a reader guessing which kind it means.

## The offer

**Software factory on demand**:
The company's promise, covering everything KastProductions sells. It is not the name of a product.
_Avoid_: factory model, AI factory

**AI agent development**:
The buyer's own name for the work we sell: building a standing agent and deploying it into a company's systems. It is software factory on demand named from outside, so it leads a title and the heading that answers the search, and the custom door carries it as custom AI agent development.
_Avoid_: AI development services, agentic AI, AI automation agency

**Standing agent**:
An agent we build for a client. It runs unattended in the client's systems until someone turns it off. One standing agent is one deployment, addressed by one name.
_Avoid_: bot, assistant, AI employee

**Product**:
One thing we sell, named by the outcome it delivers. A product name never comes out of somebody else's repository.
_Avoid_: solution, package, offering, app, template

**Ready-made**:
The door for a client who takes a standing agent we have already built. We adapt it to that client's workflow and deploy it into that client's own accounts.
_Avoid_: template, boilerplate, SaaS, our platform

**Custom**:
The door for a client whose work matches nothing we have built. We take the workflow first and shape the standing agent around it.
_Avoid_: bespoke, enterprise, one-off

**Catalogue**:
The list of ready-made products. It holds only a product that runs today. A job we have not built yet belongs to the custom door.
_Avoid_: marketplace, store, library, gallery

**Brief**:
The client's issue stating the problem, the acceptance criteria and the constraints. It is the unit we price.
_Avoid_: requirement, ticket, story, scope document

**Prerequisite**:
What a client must already own before a product can work: an account, a workspace, a repository, a paid subscription to somebody else's tool. We print the prerequisites next to the price.
_Avoid_: requirements, dependencies, setup, onboarding

**Lead time**:
The working days from a signed order to the agent answering in the client's own channel. We print it next to the price.
_Avoid_: turnaround, ETA, delivery date, one click

## Products

**Issue to pull request**:
The product where a standing agent takes an issue from the client's tracker, works it through its stations, and opens a draft pull request for a named person to sign.
_Avoid_: software factory, Foreman, the factory

## What we build

**Channel**:
The place a standing agent is reachable, which is a place the client's team already works. A person addresses the agent there by name.
_Avoid_: integration, interface, front end, chat bot

**Session**:
One piece of work a standing agent does, from the message that starts it to the answer that ends it.
_Avoid_: run (a run is one feature on a backlog), conversation, thread, job

**Subagent**:
An agent that a standing agent delegates one piece of work to. It starts with no context of its own and hands back a result.
_Avoid_: worker, child agent, tool

**Authority**:
What a standing agent may do on its own. Every product states one of three: it reads and reports, it acts behind an approval gate, or it runs one whole function of the company through its subagents. Authority is a line inside a product, and never a ladder a client climbs.
_Avoid_: tier, level, plan, package, Reporter, Operator, Department

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

**Sandbox**:
The execution environment where a station reads a repository, runs commands and pushes a branch. The client provisions it from a sandbox provider, and it is a prerequisite we print.
_Avoid_: container, VM, environment, our infrastructure

**Demo instance**:
The one deployment we host in our own account, to show a standing agent on a call. It is never what a client buys.
_Avoid_: trial, sandbox, free tier, pilot

## Working a backlog

**Run**:
One feature, from approved brief to a draft pull request that a named person signs.
_Avoid_: task, ticket, sprint, engagement

**Station**:
One step of a run, worked by a subagent that does that step and nothing else. A run has four: triage, plan, implement and review.
_Avoid_: stage, phase, pipeline

**Review station**:
The last station of a run. It judges the whole diff against the brief and reports evidence for each verdict. It never signs a merge.
_Avoid_: reviewer (that is a person), QA, checker

**Reviewer**:
The named person who reads the whole diff and signs the merge. Managed, that is our engineer. Self-run, that is the client's.
_Avoid_: our team, the reviewers, QA

**Run record**:
The full log of one run: every tool call, test result, review comment and decision.
_Avoid_: audit log, transcript, report

**Coding agent**:
An agent that takes one run and stops.
_Avoid_: bot, the AI

## Ways to buy

**Self-run**:
The client runs the standing agent. We build it, deploy it into the client's own accounts and hand over the keys.

**Managed**:
We run the standing agent on the client's work. Our coding agents take the runs, and our reviewer signs every merge.

**Build**:
The fixed-price work of building one standing agent and deploying it into the client's own accounts.

**Operate**:
The monthly work of keeping one standing agent correct and current after it is live.

**Sprint**:
One brief, managed, two weeks, one fixed price.

**Embedded**:
Our coding agents and one of our engineers on the client's backlog, month to month.

## The stack

**Flue**:
The agent harness framework we build every standing agent on. The Astro organisation publishes it under Apache-2.0. We name it on the page and link it.
_Avoid_: our platform, our framework, our engine
