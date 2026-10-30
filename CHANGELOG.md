# Changelog

## 0.2.1 — DSH compatibility target 0.2.1-rc.2

- Port the upstream self-learning reconstruction workflow to a native DSH skill bundle.
- Add DSH package metadata and runtime registration through `ctx.skills`.
- Preserve authorisation, safe examination, parity checklist, evidence-led review, iteration planning, fix recipes, staged learning, and four reusable templates.
- Add beginner README and project-local / DSH bundle installation instructions.
- Preserve MIT licensing and upstream attribution.

The workflow was ported from Speedrun AI Labs' MIT-licensed
`reverse-engineer-anything-self-learning-loop` v1.0.1.

## 0.2.1 — source-fidelity and audit update

- Inventoried the complete upstream Git tree at the recorded source commit (13 blobs; recursive tree not truncated).
- Preserved all 13 source files verbatim under `upstream/`; added `source-manifest.json` with source blob hashes, sizes, mappings, dispositions, and notes.
- Added the source reconciliation report and a local completeness validator.
- Documented four installation methods: DSH GitHub bundle, Git clone/project-local, ZIP/project-local, and manual copy to the configured skills root.
- Compared all 13 archived Git blob identifiers and byte lengths with the upstream tree: all match.
- Local npm tests, package dry-run, and DSH runtime boot remain unverified in this environment.
