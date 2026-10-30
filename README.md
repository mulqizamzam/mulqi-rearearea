# Reverse Engineer Anything — Self-Learning Loop for DSH

**A DeepSeek Harness-native skill for authorised, evidence-led software reconstruction.** Define what “done” means, build an original implementation, compare it against written requirements and evidence, fix the highest-impact gaps, and retain reusable lessons only after human review.

[![DSH target](https://img.shields.io/badge/DeepSeek%20Harness-0.2.1--rc.2-444)](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.2)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Origin and attribution:** This is a DSH-native port of [Speedrunlab/reverse-engineer-anything-self-learning-loop](https://github.com/Speedrunlab/reverse-engineer-anything-self-learning-loop), originally written by Speedrun AI Labs and licensed under MIT. The source method acknowledges inspiration from REA by @morluto and a learning-loop lineage through Hermes Agent as a Skill File. This repository is an independent port and is not affiliated with or endorsed by those projects.

## What it does

- **Authorisation first:** require the target, authority record, approver, scope, data-handling decision, workspace, budget, and stop conditions before inspecting it.
- **Safe examination:** static-first, treat inspected content as untrusted data, hash read-only copies, constrain extraction, avoid displaying secrets, and never call the target's vendor backend.
- **Write the definition of done:** make a signed parity checklist with testable inputs/expected outputs, checks, evidence paths, and `must`, `should`, or `out-of-scope` tiers.
- **Build an original design:** build a walking skeleton from observed behaviour and the checklist, not from copied protected expression; use operator-owned fixtures and stubs.
- **Measure the gaps:** review all must-haves, attach evidence to pass/fail/not-testable states, conduct a fresh-eyes review, and sample regressions.
- **Improve methodically:** rank failures by impact and dependency, fix bounded batches, and rerun relevant and regression tests.
- **Learn without leaking:** stage generic, reusable rules as reviewable patches; do not save secrets, user data, target text, fixtures, or one-off product facts.
- **Stop honestly:** done requires every must-have to pass in two consecutive full reviews and operator acceptance. Never claim parity when requirements remain untestable.

## Beginner quick start

You do not need to understand reverse engineering before you start. Use the steps below as a project checklist.

1. **Install the skill in DSH** using the project-local method or the profile-bundle method below.
2. **Choose an authorised target.** Be concrete: name the exact file, package, firmware image, application tree, or capture you have permission to analyse.
3. **Prepare two separate workspaces:** `$W` for the original and examination output; `$B` for the new implementation. Never point `$B` at extracted target contents.
4. **Start with the intake gate.** Provide the authorisation basis, approval reference, scope boundaries, data-handling decision, analysis mode, budget, and stop conditions. If these are incomplete, the skill must stop before analysis.
5. **Create and sign the parity checklist** before implementation. Every must-have needs a concrete input, an expected result, a test method, and an evidence location.
6. **Build a walking skeleton**, implement small batches, and review each batch against the checklist.
7. **Keep the evidence.** Record results and gaps in the templates under `templates/`. A requirement that cannot be tested must stay marked as such; it is not a pass.
8. **Review lessons before saving them.** Let the skill propose a staged old/new patch. Inspect it and approve or reject it yourself.

### Example first prompt

```text
Use the Reverse Engineer Anything Self-Learning Loop skill.

Before doing any target inspection, conduct the authorisation and scope intake.
My purpose is [replacement / interoperability / port / lost-source recovery].
The exact target is [absolute path and artifact description].
Authority basis and reference: [ownership or permission, ticket/contract, date and expiry].
Approver and security contact: [roles/names or explicit availability].
Allowed scope: [features, formats, platforms].
Forbidden reuse: [code, text, branding, artwork, secrets, third-party assets].
Analysis mode: static by default; live analysis only if a separately approved disposable VM envelope exists.
Data-handling decision: [whether target data may be processed by the model provider].
Analysis workspace ($W): [absolute isolated path].
Build workspace ($B): [different absolute version-controlled path].
Budget and stop conditions: [iterations/time and blockers].
First deliverable: an inventory and proposed parity checklist for me to review—not implementation.
```

## Install in DeepSeek Harness (DSH)

This repository targets **DSH v0.2.1-rc.2**. The harness skill loader supports directory skills containing `SKILL.md`, with kebab-case names and YAML frontmatter. Choose either approach below.

### Option A — project-local skill (recommended for beginners)

This method avoids package installation. Make sure your DSH profile already includes the official filesystem skill loader and model-facing skill tool. In a typical profile composition, the relevant rows are:

```yaml
- name: '@deepseek-ai/dsh-skill'
- name: '@deepseek-ai/dsh-skill-filesystem'
- name: '@deepseek-ai/dsh-tool-skill'
```

From the root of the project where DSH will run:

```bash
git clone https://github.com/mulqizamzam/mulqi-rearearea.git
mkdir -p .dsh/skills/reverse-engineer-anything-self-learning-loop
cp mulqi-rearearea/SKILL.md .dsh/skills/reverse-engineer-anything-self-learning-loop/
cp -R mulqi-rearearea/references mulqi-rearearea/templates .dsh/skills/reverse-engineer-anything-self-learning-loop/
```

Then restart or refresh the DSH session if needed and invoke the skill using `/reverse-engineer-anything-self-learning-loop` or ask the model to use it by name. The full reference/template folders matter because the main skill points to them for safe examination, review, and learning rules.

### Option B — install as a DSH bundle

The repository also includes `package.json`, `index.js`, and `cordis.patch.yml` for direct DSH bundle installation. Before installing, confirm the profile includes the DSH skill registry and model-facing skill consumer:

```yaml
- name: '@deepseek-ai/dsh-skill'
- name: '@deepseek-ai/dsh-skill-filesystem'
- name: '@deepseek-ai/dsh-tool-skill'
```

From a DSH-supported shell, install into a configured profile:

```bash
dsh plugin --profile web add github:mulqizamzam/mulqi-rearearea#main
dsh --profile web --dump-config
dsh --profile web
```

The bundle declares compatibility with **exactly DSH 0.2.1-rc.2**. Review source before installation and pin a tag or commit for repeatable deployments. This package intentionally has no `prepare` or install-time build script. Because a Git-based package runs installed source, review the code and check that your DSH profile’s dependency resolver uses the host’s DSH packages rather than incompatible duplicate copies.

Remove it when no longer needed:

```bash
dsh plugin --profile web remove dsh-reverse-engineer-anything-self-learning-loop
```

Replace `web` with your profile name when you use a different DSH profile. Verify the effective composition with `--dump-config` before launching.

## Use in DSH

Once installed, invoke the skill by name or ask naturally:

- “Use the reverse-engineering self-learning loop on this authorised package; start with the intake gate.”
- “Create a must-have parity checklist from these observations. Do not implement yet.”
- “Review iteration 2, reproduce a sample of passing checks, identify regressions, and write a gap report.”
- “Stage a generic learning-rule patch from this review; do not activate it without approval.”

The workflow is intentionally staged. It must not inspect a target until the authority gate passes. The human operator owns approvals, scope changes, and any live-analysis permission.

## Repository map

```text
package.json                  DSH bundle metadata and compatibility gate
cordis.patch.yml              DSH configuration-layer contribution
index.js                      registers the skill with ctx.skills
SKILL.md                      main completion + self-learning workflow
references/
  examine.md                  safe handling, identification, examination and live envelope
  parity-checklist.md         checklist anatomy, product classes and scoring
  review.md                   evidence review, fresh-eyes and regression sampling
  learning-loop.md            reusable lessons, staged changes and never-capture rules
  fix-recipes.md              general fixes organised by cause
templates/
  parity-checklist.md         signed definition of done
  gap-report.md               review findings and score delta
  iteration-plan.md           bounded next batch
  run-ledger.md               append-only audit trail
```

## Safety and limitations

This is a methodology prompt/skill, not a sandbox, permission system, or automated malware-analysis environment. It does not magically provide isolation, access to tools, subagents, persistent memory, or a secure workspace. Verify capabilities in your DSH installation. If preflight cannot demonstrate isolation, do not improvise on a normal workstation: stop and arrange an appropriate environment.

Use only software you own or are explicitly authorised to analyse and rebuild. Do not defeat access controls, copy protected source/expression or branding, use recovered credentials, upload artifacts/extracts to external services, or contact a vendor's production backend. Reconstructed code should be an original design based on permitted behavioural evidence.

## Upstream source and licence

The port preserves the upstream workflow and template structure while adding DSH-specific skill metadata, runtime registration, installation guidance, and compatibility metadata.

- Upstream: [Speedrunlab/reverse-engineer-anything-self-learning-loop](https://github.com/Speedrunlab/reverse-engineer-anything-self-learning-loop)
- Upstream project: Speedrun AI Labs
- Upstream licence: MIT, included in this repository
- DSH compatibility target: [DeepSeek Harness v0.2.1-rc.2](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.2)
- This community port is not an official DeepSeek product and is not endorsed by the upstream authors.


## Repository description

Suggested GitHub About/Description text (copy into the repository settings):

> DeepSeek Harness (DSH) native plugin for authorised, evidence-led software reconstruction. Includes safe examination guidance, parity checklists, regression review, iterative gap-fixing, and operator-approved self-learning. Targets DSH 0.2.1-rc.2.


## Four installation methods

All four methods below deliver the DSH skill and its `references/` and `templates/`. The first installs the packaged DSH plugin; the other three install the skill files through the DSH skill filesystem loader. Confirm the profile has `@deepseek-ai/dsh-skill`, `@deepseek-ai/dsh-skill-filesystem`, and `@deepseek-ai/dsh-tool-skill` configured before using a filesystem-based method.

### Method 1 — DSH plugin CLI from GitHub (bundle)

Use this when you want the plugin registration and package metadata:

```bash
dsh plugin --profile web add github:mulqizamzam/mulqi-rearearea#main
dsh --profile web --dump-config
dsh --profile web
```

Replace `web` with your configured profile. Review the repository and pin a tag or commit for production/repeatable use.

### Method 2 — Clone with Git, then install project-locally

Use this when you want to inspect or modify the files before enabling the skill:

```bash
git clone https://github.com/mulqizamzam/mulqi-rearearea.git
mkdir -p .dsh/skills/reverse-engineer-anything-self-learning-loop
cp mulqi-rearearea/SKILL.md .dsh/skills/reverse-engineer-anything-self-learning-loop/
cp -R mulqi-rearearea/references mulqi-rearearea/templates .dsh/skills/reverse-engineer-anything-self-learning-loop/
```

Run DSH from that project using the profile's configured project-local skill directory.

### Method 3 — Download ZIP, then install project-locally

Use this if Git is unavailable. Download the repository ZIP from [GitHub](https://github.com/mulqizamzam/mulqi-rearearea/archive/refs/heads/main.zip), extract it, then run these commands from the project root (adjust the extracted folder name if needed):

```bash
mkdir -p .dsh/skills/reverse-engineer-anything-self-learning-loop
cp mulqi-rearearea-main/SKILL.md .dsh/skills/reverse-engineer-anything-self-learning-loop/
cp -R mulqi-rearearea-main/references mulqi-rearearea-main/templates .dsh/skills/reverse-engineer-anything-self-learning-loop/
```

### Method 4 — Manual copy into your configured DSH skills directory

Use this for managed workstations or an existing DSH skills directory. Find the skills root configured for `@deepseek-ai/dsh-skill-filesystem` in your own profile; do not assume a universal global path. Create a folder named `reverse-engineer-anything-self-learning-loop` there and copy these items from this repository:

- `SKILL.md`
- the complete `references/` directory
- the complete `templates/` directory

Restart/refresh the DSH session if your loader requires it. Invoke by asking DSH to use `reverse-engineer-anything-self-learning-loop`. Do not copy `upstream/` into the active skills directory: it is a preservation archive, not runtime instructions.

## Source preservation, audit and validation

This port now includes a complete source snapshot and a machine-readable reconciliation:

- `upstream/` — all 13 source files from the inspected upstream Git tree, preserved verbatim and kept out of the runtime skill path.
- `source-manifest.json` — source path, upstream Git blob SHA-1, byte length, archive path, target mapping, disposition, and transformation notes for every source item.
- `docs/SOURCE-RECONCILIATION.md` — coverage, activation boundaries, transformations, and explicit validation limitations.
- `scripts/validate-completeness.mjs` — verifies each archived file against the recorded Git blob SHA-1 and byte length, and checks required target/package files.

Run the reproducible checks from the repository root:

```bash
npm install
npm run validate:completeness
npm test
npm pack --dry-run
```

The source archive is intentionally non-executable. The adapted root `SKILL.md` is the active instruction surface and cannot override the DSH host's system/developer instructions, safety policies, or tool permissions. Preserving original text does not grant it authority. Compatibility is pinned to DSH `0.2.1-rc.2`; the pin and static package checks do not substitute for a real DSH boot/integration test. See [the reconciliation report](docs/SOURCE-RECONCILIATION.md) for exact status.
