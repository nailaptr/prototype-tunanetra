---
name: p0-start
description: Initialize or review the accessibility assistant project context before implementation.
---

Read only:
1. `.agents/rules/01-project-constitution.md`
2. `.agents/rules/02-accessibility-security.md`
3. `docs/PROJECT-CONTEXT.md`
4. `docs/PRD-SUMMARY.md`
5. `docs/STATUS.md`
6. `docs/DECISIONS.md`

Then inspect the repository surface only: package.json, top-level directories, config files, and existing source entry points.

Do not implement features.

Return:
1. 5-sentence understanding.
2. Current repository state.
3. Conflicts between repo and project context.
4. Proposed next stage.
5. Questions only if truly blocking.

If no blocking issue exists, do not ask unnecessary questions.
