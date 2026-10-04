# Architecture Decision Log

## ADR-001 — TypeScript stack
Decision: TypeScript strict + Next.js App Router.
Reason: one language can support future web extension/mobile/desktop layers.

## ADR-002 — Supabase without ORM
Decision: Supabase JS + SQL migrations; no ORM initially.
Reason: fewer layers and direct RLS visibility.

## ADR-003 — AI abstraction
Decision: `AiProvider` interface with Gemini and stub implementations.
Reason: production provider can change without rewriting UI/core.

## ADR-004 — No image persistence
Decision: image is transient input only.
Reason: privacy and prototype simplicity.

## ADR-005 — Accessibility-first
Decision: WCAG 2.2 AA and screen-reader testing are acceptance criteria.
Reason: accessibility is the core purpose of the product.

## ADR-006 — Automated tests use stub provider
Decision: CI/e2e must not call real Gemini.
Reason: deterministic tests and protection of AI quota.

## Change policy
If a new decision contradicts one of these, update this file before coding.
