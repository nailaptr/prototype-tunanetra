---
name: handoff
description: Prepare a compact project handoff for a new Antigravity session.
---

Read `docs/STATUS.md`, `docs/DECISIONS.md`, and the current git diff/log.

Do not change code.

Update `docs/STATUS.md` only if the status is stale.

Return a compact handoff:
- completed gates
- current stage
- files changed recently
- tests last run
- known failures
- important decisions
- next exact task

Keep it concise so it can be reused in a new session.
