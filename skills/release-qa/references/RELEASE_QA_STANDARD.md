# Release QA Standard

## Contract

Release QA evaluates:

```text
integrated release scope
+
one frozen candidate
->
release-candidate QA evidence
```

The gate passes only when the same immutable candidate satisfies the required integrated release scope and can move to downstream security evaluation.

This standard is standalone. It does not require ASPS.

## Governing principle

```text
SCOPE TRACEABILITY
+
EXACT CANDIDATE IDENTITY
+
CURRENT EVIDENCE
=
RELEASE QA DECISION
```

A green build, a passing unit suite, or a prior review is not by itself a release decision. Release QA asks whether the integrated release promise is satisfied by this exact candidate.

## Candidate rule

Before QA begins, identify the candidate with an immutable identity:

- Git commit SHA for a repository candidate;
- immutable revision or content digest for non-Git systems;
- artifact digest in addition to source identity when a prebuilt artifact is itself under QA.

Record the identity at the start and verify it again at the end.

If source, configuration, generated package content, or another in-scope candidate component changes during the attempt, the QA attempt cannot produce PASS. Start a new attempt on the new candidate identity.

## Read-only candidate policy

Release QA may execute the candidate and may create ephemeral test state outside the candidate, but it must not modify the candidate being judged.

When QA finds a defect:

1. record the failing scope item and reproduction evidence;
2. return `RELEASE_QA_FAIL` when the requirement is disproven;
3. fix the defect through the repository's normal development/integration flow;
4. freeze a new candidate;
5. run a new QA attempt.

## Result statuses

### RELEASE_QA_PASS

Allowed only when:

- candidate identity is exact and unchanged;
- every REQUIRED integrated-scope item is satisfied;
- activated CONDITIONAL items are satisfied;
- all proof used for candidate behavior is current for the exact candidate;
- no material required unknown or unavailable check remains;
- accepted exclusions are explicitly outside required scope;
- evidence is sufficient for audit/reproduction;
- the candidate is ready for security evaluation.

Ready for security evaluation does not mean security passed.

### RELEASE_QA_FAIL

Use when current candidate-bound evidence proves that a REQUIRED or activated CONDITIONAL obligation is not satisfied.

A known failing requirement cannot be downgraded to a warning to obtain PASS.

### BLOCKED

Use when a trustworthy decision cannot be made, including:

- candidate identity is missing or mutable;
- integrated scope is materially ambiguous;
- required evidence cannot be obtained;
- a required validation cannot be executed;
- a material result is unknown;
- candidate identity changed during the attempt.

## Accepted exclusions and residual risks

A non-gating issue may coexist with PASS only when all of the following are true:

- it is outside required integrated release scope or explicitly accepted by the responsible authority;
- the acceptance is recorded;
- the issue does not invalidate candidate-bound evidence;
- the residual risk is visible in the report.

Do not invent release authority. If acceptance is required but absent, return BLOCKED.

## Capability boundaries

Release QA may inspect evidence produced by testing, code review, integration, hygiene, build, or packaging, but it does not own those capabilities.

It does not:

- redesign the test strategy;
- perform a security approval;
- prepare release notes/version/tag/publication state as a release-preparation substitute;
- define observability or documentation policy;
- deploy or promote the candidate.

If another capability must change the candidate, Release QA stops until a new frozen candidate exists.
