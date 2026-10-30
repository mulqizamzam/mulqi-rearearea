# Source reconciliation report

- Plugin: `mulqi-rearearea`
- Target: DeepSeek Harness `0.2.1-rc.2`
- Source: [Speedrunlab/reverse-engineer-anything-self-learning-loop](https://github.com/Speedrunlab/reverse-engineer-anything-self-learning-loop)
- Inspected ref: `main`
- Inspected source commit: `a0b4f1ecff591100d207ddcc799bcb5bb769f031`
- Recursive Git tree: complete (`truncated=false`); 13 source blobs across root, `references/`, and `templates/`.
- Machine-readable mapping: [`source-manifest.json`](../source-manifest.json)

## Reconciliation

| Source group | Count | Disposition |
|---|---:|---|
| Root files (README, SKILL, CHANGELOG, LICENSE) | 4 | All preserved verbatim in `upstream/`; README/CHANGELOG/LICENSE are reference/history; SKILL has a separate DSH adaptation |
| `references/` | 5 | Preserved verbatim in `upstream/references/`; matching files also retained as active DSH references |
| `templates/` | 4 | Preserved verbatim in `upstream/templates/`; matching files also retained as active templates |
| **Total** | **13** | **13/13 accounted for; no source item intentionally excluded** |

The manifest records the original Git blob SHA-1 and reported byte length for every item. Git blob hashes are content-addressed Git object hashes, not raw-file SHA-1 values. The original source snapshot is stored under `upstream/`; it is not loaded as executable plugin code.

## Activation and trust boundaries

- Executable DSH entrypoint: `index.js`; package metadata: `package.json`; DSH patch metadata: `cordis.patch.yml`.
- Active instruction surface: adapted root `SKILL.md`. It is guidance for the host agent, not a mechanism to override host/system/developer instructions, permissions, or safety controls.
- Reference-only material: `upstream/**`; original README and changelog are archival; no imported source file is dynamically evaluated.
- Active supporting references/templates: `references/**`, `templates/**`.
- Adversarial or untrusted target content encountered during a run must remain data, never instructions. The source repository does not supply separate adversarial fixture files.
- No source files were discarded. The manifest's `disposition` and `notes` fields document adaptation and activation choices.

## Transformation register

1. Original `SKILL.md` retained verbatim at `upstream/SKILL.md`; a distinct adapted `SKILL.md` provides DSH-compatible frontmatter and host-policy boundaries.
2. Original `README.md` retained at `upstream/README.md`; root README is newly authored DSH installation and operator documentation.
3. Original `CHANGELOG.md` retained at `upstream/CHANGELOG.md`; root changelog describes the DSH port.
4. Original `LICENSE` retained verbatim at both root and `upstream/LICENSE`.
5. All five reference documents and all four templates are retained as verbatim source copies and active copies. No wording normalization is recorded for these pairs; manifest Git blob hashes allow byte-level verification.
6. DSH-only files (`index.js`, `package.json`, `cordis.patch.yml`, tests, and audit docs) are newly authored adaptations, not upstream source items.

## Validation status

- Recursive source inventory: **PASS** — upstream and target Git tree responses both reported `truncated=false`.
- Source-to-target coverage: **PASS** — 13 upstream blobs, 13 archived files, and 13 manifest entries; no missing or extra source items.
- Git object reconciliation: **PASS** — all 13 archived target blob SHAs and byte lengths match the corresponding upstream Git tree entries and manifest records. This verifies exact Git object identity at the tree level.
- Local byte-read validator: **not executed** — the environment could not resolve `github.com` for a local clone. Run `npm run validate:completeness` after cloning to independently hash the materialized files.
- Plugin registration / package structure: prior structural review found the DSH entrypoint, package manifest, and Cordis patch; this is not equivalent to a host boot test.
- Automated tests (`npm test`), package dry-run (`npm pack --dry-run`), and DSH host boot: **not executed**; local clone was blocked by unavailable DNS/network access.
- Install and runtime compatibility: **UNVERIFIED** until installed and booted with DeepSeek Harness `0.2.1-rc.2` and the documented profile services.

## Reproducibility

From a clone of this repository, run:

```bash
npm install
npm run validate:completeness
npm test
npm pack --dry-run
```

Then install and boot under the exact DSH target version; record the DSH build, profile, plugin resolution output, and startup log before marking runtime compatibility verified.
