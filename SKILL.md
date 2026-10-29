---
name: reverse-engineer-anything-self-learning-loop
description: "Authorisation-gated, evidence-led software reconstruction: examine an authorised target safely, define parity, build an original implementation, review gaps, and stage reusable lessons for human approval."
license: MIT
compatibility: DeepSeek Harness (DSH) 0.2.1-rc.2. Requires host-provided shell and file tools, separate analysis/build workspaces, verified isolation for live analysis, and a human approver.
metadata:
  version: "0.2.1"
  upstream-version: "1.0.1"
  author: "DSH port by mulqizamzam; original method by Speedrun AI Labs"
  tags: reverse-engineering, reconstruction, parity-testing, self-learning-loop, dsh
---
# Reverse Engineer Anything with a Self-Learning Loop

Most reconstructions stop at "80% there". The agent examines a shipped product,
builds something that looks right, and nobody ever wrote down what 100% means,
so nobody can say what is missing. This skill closes that gap with two loops:

- **The completion loop, inside one run:** define 100% in writing before
  building, build, review the build against the original with evidence, plan
  the gaps, improve, and repeat until every must-have passes twice in a row.
- **The self-learning loop, across runs:** after every iteration the agent
  reviews what it learned (a route, a check, a fix, a pitfall) and saves it
  into this skill, staged for the operator, so the next product starts further
  along and the same mistake is never made twice.

It carries what it needs from two Speedrun AI Labs skills: the examination
method of **Reverse Engineer Anything** and the learning loop of **Hermes Agent
as a Skill File**. Neither has to be installed; both go deeper when they are
(see **Companions**). It is **agent-agnostic**: it names behaviours, never a
particular tool, hook or path.

This skill is for **authorised** work: software your organisation owns, ships,
licenses, or is explicitly cleared to examine and rebuild (a lost-source
product, interoperability, a replacement for a licensed tool, a port). It is not
for cloning a third party's product, defeating access controls, or lifting
protected assets. The reconstruction is **your own design, informed by
observed behaviour**, never a copy of protected expression. The first step is a
gate that makes that explicit.

