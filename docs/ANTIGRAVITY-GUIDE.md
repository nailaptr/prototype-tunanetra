# Antigravity Usage Guide

## Recommended structure
Rules = always-on constraints.
Workflows = reusable prompts triggered with `/`.
Docs = persistent project memory.
Code = implementation.

## First session
Run `/p0-start`.
Confirm the repository/context summary.
Then use `/implement-stage` for one stage only.

## Typical cycle
1. `/implement-stage`
2. `/verify-stage`
3. If fail: `/fix`
4. For UI: `/a11y-review`
5. If pass: update STATUS and commit.
6. Start a new chat when the session becomes long.

## Token-saving rules
- Never paste the full PRD into every prompt.
- Do not ask the agent to "review the whole project" for a small bug.
- Point it to exact files.
- Keep STATUS short.
- Keep decision log stable.
- Use provider stub for tests.
- Separate planning, implementation, and verification.
- Start a fresh session after a gate is completed if the conversation has become long.
