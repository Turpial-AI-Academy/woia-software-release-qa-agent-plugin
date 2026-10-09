---
name: release-qa
description: Evaluates one frozen release candidate against integrated release scope and produces auditable QA evidence. Use for release-candidate acceptance, final regression or smoke selection, integrated-scope traceability, candidate immutability checks, or deciding whether the exact candidate is ready for downstream security evaluation.
license: MIT
compatibility: Works across repository types when an exact frozen candidate can be identified and the repository's relevant validation evidence or commands can be inspected.
metadata:
  author: Turpial AI Academy
  version: "0.5.6"
---

# release-qa

## Operating flow

```text
DISCOVER -> DECIDE -> EXECUTE -> VALIDATE -> REPORT
```

Release QA is an assessment capability. EXECUTE means run the QA plan against the candidate; it does not authorize product mutation.

## Purpose

Evaluate one frozen release candidate against its integrated release scope using current, candidate-bound evidence and proportionate release QA.

The standalone output is release-candidate QA evidence. When used as an ASPS provider, it satisfies `release-qa/v1`: the same immutable candidate must satisfy the integrated release scope and be ready for downstream security evaluation.

## Non-negotiable rules

- Identify the exact candidate before evaluating it.
- Keep the candidate immutable for the full QA attempt.
- Re-check candidate identity after validation.
- Build or reconcile an explicit integrated-scope matrix; do not infer release readiness from a green test suite alone.
- Distinguish scope sources from candidate-bound execution evidence.
- Reuse current evidence that already proves the exact candidate; do not rerun deep suites merely for ceremony.
- Evidence from another candidate may inform planning but cannot prove this candidate.
- A required item that is unknown, skipped, stale, or impossible to verify is not a PASS.
- If the candidate changes, stop the attempt and start a new QA evaluation on the new identity.
- Do not hide warnings, failures, skipped checks, or unresolved unknowns.
- Do not mutate the candidate to fix findings during the QA attempt.
- Do not claim security approval. A QA PASS means ready for security evaluation, not security passed.
- Do not tag, publish, deploy, or promote a release from this capability.

## Proportionate depth and evidence reuse

Use a bounded path only when a healthy existing scope matrix and durable execution evidence already describe the same frozen candidate, and the requested amendment affects only local report metadata or explanatory documentation outside the production candidate. Confirm that the amended material is not a source, configuration, package, or deployable documentation component of that candidate.

For that path, inspect the authoritative matrix and affected obligation, load only the supporting evidence needed to reconcile it, amend the smallest report unit, and verify candidate identity, scope coverage, evidence freshness, and required result semantics. Preserve unrelated valid scope rows and execution records. Do not rebuild the full report or rerun an expensive suite merely because a session restarted.

Use the deep path for a new candidate or scope matrix, candidate/source/artifact changes, missing durable required proof, contradictory scope, public API/event/schema or persisted-state/migration changes, auth/security boundaries, deployment/rollback risk, or cross-provider dependency changes. Expand only the relevant scope and references; deep review still reuses current proof when sufficient.

Release QA independently owns its gate. Inspect durable records of actual execution, their exact candidate binding, environment, and obligation coverage before reuse. Summaries, recollection, and assumptions are not execution evidence. Run the relevant validation when required proof cannot be independently established; if execution is unavailable, report BLOCKED.

Distinguish reusable CURRENT evidence, invalidated STALE evidence, fresh execution/observation still required, and assumptions. A changed candidate always ends the current attempt; a new evaluation is required, and evidence from another identity does not prove it. Changes confined outside the candidate invalidate only the affected report/scope conclusions. Report what was reused, invalidated, revalidated, and remains uncertain.

## Discover

Load [RELEASE_QA_STANDARD.md](references/RELEASE_QA_STANDARD.md) for a new evaluation, unclear gate semantics, or candidate-freeze questions. Load [SCOPE_MODEL.md](references/SCOPE_MODEL.md) when reconstructing scope or resolving an affected obligation; a healthy existing matrix can supply unaffected scope.

Establish:

- exact source candidate identity, normally an immutable commit SHA or equivalent;
- artifact identity when a prebuilt artifact is part of the integrated scope;
- clean/frozen state and any repository rule that defines release-candidate freeze;
- integrated release scope and its authoritative sources;
- supported platforms, compatibility promises, upgrade/install expectations, data or migration obligations, and critical user journeys when applicable;
- candidate-bound evidence already produced by review, testing, integration, hygiene, build, package, or smoke work;
- known accepted exclusions, deferred work, open defects, and release risks;
- commands or procedures that can validate remaining obligations without mutating the candidate.

Do not treat a previous agent's summary as proof. Inspect the underlying evidence.

## Decide

Create the smallest sufficient QA plan. Load [EVIDENCE_MODEL.md](references/EVIDENCE_MODEL.md) when evidence provenance, freshness, reuse, or missing proof needs a decision.

For each integrated-scope item record:

- requirement or obligation;
- classification: `REQUIRED`, `CONDITIONAL`, or `NOT_APPLICABLE`;
- authoritative scope source;
- affected surface or user journey;
- available candidate-bound evidence;
- additional validation needed;
- final result.

Prefer existing repository-owned checks. Add targeted regression, integration, package, installation, upgrade, compatibility, or smoke validation only when the release scope and risk justify it.

Do not duplicate Phase 16-style test work if exact-candidate evidence remains valid.

## Execute

Load [QA_PLAYBOOK.md](references/QA_PLAYBOOK.md) when selecting additional execution, reproducing a failure, or handling an unavailable check.

Run the planned validations against the frozen candidate. Keep temporary test data, external fixtures, logs, and reports outside the candidate unless the repository already treats them as ignored runtime output.

For every executed check record:

- exact candidate identity;
- command or procedure;
- relevant environment/profile;
- start/end outcome;
- evidence location or concise result;
- affected scope items;
- skipped/unavailable status when applicable.

If a check fails, collect enough reproduction evidence to explain the failure. Do not patch the candidate in the same QA attempt.

## Validate

Before deciding the result:

1. re-read the candidate identity;
2. verify it is the same candidate used throughout the attempt;
3. verify every `REQUIRED` scope item has current candidate-bound evidence;
4. verify every `CONDITIONAL` item is either activated and proven or explicitly not triggered;
5. verify no required failure, material unknown, or unavailable proof remains;
6. verify accepted exclusions are explicitly authorized and outside required integrated scope;
7. separate release-QA conclusions from downstream security, release preparation, observability, documentation, and deployment work.

Consult [EVIDENCE_MODEL.md](references/EVIDENCE_MODEL.md) if evidence freshness or result semantics remain uncertain.

## Report

Reuse the repository's existing report when it records the same obligations. Load [release-qa-report.template.md](assets/release-qa-report.template.md) for a new durable report and, when machine-readable handoff is useful, [release-qa-evidence.template.json](assets/release-qa-evidence.template.json).

Return exactly one overall status:

```text
RELEASE_QA_PASS
RELEASE_QA_FAIL
BLOCKED
```

`RELEASE_QA_PASS` means the same immutable candidate satisfies all required integrated release scope with current evidence and is ready for downstream security evaluation.

`RELEASE_QA_FAIL` means current evidence proves that one or more required obligations fail.

`BLOCKED` means a trustworthy decision cannot be made because candidate identity, required scope, required evidence, or required execution is unavailable or unresolved.

Never convert `FAIL` or `BLOCKED` into PASS by labeling the gap a warning.

## Detailed references

- [Release QA Standard](references/RELEASE_QA_STANDARD.md)
- [Scope Model](references/SCOPE_MODEL.md)
- [Evidence Model](references/EVIDENCE_MODEL.md)
- [QA Playbook](references/QA_PLAYBOOK.md)
