# Design and port notes

## Architecture
A DSH bundle registers one native skill through `ctx.skills.register()`. It adds no external service, MCP server, model API, or runtime network calls. The host composition must provide `@deepseek-ai/dsh-skill`.

## Compatibility
Target runtime: DeepSeek Harness `0.2.1-rc.2`. The `engines.dsh` range is exact. The package version `0.2.1` is distinct from the DSH runtime version.

## Preserved workflow
- authorisation and scope gate; static-first safe examination
- inventory, evidence ledger, and signed parity checklist
- clean-room implementation using operator-owned fixtures and stubs
- evidence-based verification, fresh-eyes review, regression sampling
- bounded improvement plans and explicit stop/done conditions
- staged learning patches with operator approval, audit history, rollback
- four templates and generic fix recipes organised by cause

## DSH adaptations
- DSH-native skill metadata, bundle manifest, patch row, Cordis entry module
- runtime skill registration via `ctx.skills`; model/user invocation enabled
- beginner installation guidance
- no install-time build script

## Safety
Target content remains untrusted data, never instructions. The skill is a methodology, not a sandbox. It requires verified isolation and an honest stop when isolation cannot be demonstrated. Lessons remain staged for human review. Upstream MIT attribution is retained.
