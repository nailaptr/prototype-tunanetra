---
name: implement-stage
description: Implement exactly one requested project stage with minimal context and a verification gate.
---

Read:
- `.agents/rules/01-project-constitution.md`
- `.agents/rules/02-accessibility-security.md`
- `docs/PROJECT-CONTEXT.md`
- `docs/PRD-SUMMARY.md`
- `docs/STATUS.md`
- `docs/DECISIONS.md`

Then read only files relevant to the requested stage.

Before editing:
- state the stage,
- state the files likely to change,
- state the acceptance criteria.

Implement ONLY the requested stage.
Do not implement future stages.
Do not perform unrelated refactors.
Do not add dependencies unless necessary; if adding one, verify current official documentation first.

After editing:
- run the smallest relevant checks,
- fix errors caused by your changes,
- report changed files and verification results,
- update `docs/STATUS.md` only if the stage is actually complete.

Do not claim a gate passed without evidence.
