# Release QA Playbook

## Bounded reconciliation

For local report metadata or explanatory documentation outside an unchanged frozen candidate, start from the existing authoritative scope matrix and durable execution records. Reconcile only the affected obligation or report unit; preserve unrelated valid rows, records, and current proof.

Independently verify actual execution, exact candidate identity, relevant environment, coverage, and freshness before reuse. If a required record is missing or untrustworthy, execute the relevant check or report BLOCKED when that execution cannot be obtained. A previous agent's prose or an assumption cannot substitute for proof.

Re-check mandatory candidate immutability, required/conditional scope coverage, and result rules even on the bounded path. Classify evidence as reusable, invalidated, or requiring fresh execution, and keep assumptions separate. Only affected conclusions are invalidated by an external report amendment; changing candidate bytes ends the attempt and requires a new evaluation.

Use deeper scope discovery and validation for a new matrix/candidate, contradictory or missing evidence, public contracts, persisted state/migrations, security boundaries, deployment/recovery risk, or provider dependency changes. A document shipped as candidate content is a candidate change, not external report maintenance. Load the detailed reference for the triggered concern instead of replaying all references by default.

## 1. Freeze and identify

Confirm the exact frozen candidate before executing QA.

Capture source identity and, when relevant, artifact identity. Verify the repository's own freeze/clean rules rather than inventing new ones.

## 2. Build the scope matrix

Use [SCOPE_MODEL.md](SCOPE_MODEL.md).

Map every material integrated-release obligation and identify which items already have CURRENT candidate-bound evidence.

## 3. Reuse before rerun

Prefer valid evidence from the exact candidate.

Examples:

- exact-candidate unit/integration results from the testing phase;
- exact-candidate code-review or integration checks when they directly support a scope item;
- exact-candidate repository hygiene reconciliation;
- exact-candidate build/package checks.

Do not rerun a full suite merely to create a second green log.

## 4. Select targeted release QA

Add the smallest checks that close material release-level gaps.

Depending on the product and release scope, useful checks may include:

- a high-value end-to-end or cross-component journey;
- targeted regression for a changed or historically fragile behavior;
- public contract compatibility;
- supported platform/runtime compatibility;
- package/import/install/launch validation;
- supported-version upgrade behavior;
- state or migration behavior;
- critical startup/health/primary-action smoke.

These are examples, not a universal matrix.

## 5. Respect repository ownership

Use repository-owned commands, fixtures, environments, and acceptance procedures when healthy.

Do not require the consumer to adopt this plugin's authoring tools.

Do not silently install global dependencies or reconfigure the host to make QA pass.

## 6. Handle findings

### Required behavior fails

Return `RELEASE_QA_FAIL`.

Include:

- scope item;
- exact candidate;
- reproduction procedure;
- expected vs observed behavior;
- evidence/log location;
- affected surface.

Do not fix the candidate inside the same QA attempt.

### Required proof is unavailable

Return `BLOCKED`.

State exactly what proof is missing and what would unblock the decision.

### Non-gating issue

Record it as residual risk only if it is explicitly outside required scope or has recorded acceptance from the appropriate authority.

## 7. Re-check immutability

At the end, resolve the candidate identity again.

If it differs from the start identity, stop and return BLOCKED. A new QA attempt is required.

## 8. Handoff

A PASS handoff states that release QA is complete for the exact candidate and that it is ready for downstream security evaluation.

It must not say:

- security passed;
- release preparation passed;
- observability/documentation passed;
- deployment approved;
- publication authorized.

Those conclusions require their own capability evidence.
