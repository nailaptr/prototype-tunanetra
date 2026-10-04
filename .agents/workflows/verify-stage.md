---
name: verify-stage
description: Verify the current implementation stage without adding unrelated features.
---

Read `docs/STATUS.md`, the project rules, and only the files relevant to the current stage.

Run the appropriate checks:
- lint
- typecheck
- unit tests
- targeted Playwright/axe tests
- manual verification instructions where automation cannot verify screen-reader behavior

Return:
PASS or FAIL.

If FAIL:
- list exact symptom,
- likely cause,
- affected files,
- smallest recommended fix,
- exact command/manual step to reproduce.

Do not redesign the application during verification.
Do not silently fix unrelated issues.
