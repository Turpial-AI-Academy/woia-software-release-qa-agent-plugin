# Release QA Evidence Model

## Two evidence classes

### Scope evidence

Scope evidence defines what must be true:

- requirements;
- acceptance criteria;
- release plan;
- supported platform policy;
- public contract;
- explicit exclusions or approvals.

Scope evidence does not by itself prove candidate behavior.

### Candidate-bound execution evidence

Candidate-bound evidence proves what the exact candidate actually did:

- test/gate result;
- build/package validation;
- integration or compatibility result;
- installation/upgrade result;
- runtime smoke;
- reproduced defect result;
- archive or artifact identity check.

Candidate behavior can contribute to PASS only when the evidence is bound to the exact candidate under evaluation.

## Freshness states

Classify material execution evidence as:

```text
CURRENT
STALE
UNVERIFIED
```

### CURRENT

The evidence is demonstrably produced from the exact frozen candidate and remains relevant to the scope item.

Reuse CURRENT evidence. Do not rerun an expensive suite solely because Release QA started later.

### STALE

The evidence comes from another candidate identity or from before a material candidate mutation.

STALE evidence can guide risk selection but cannot prove the current candidate.

### UNVERIFIED

The claim cannot be tied to a trustworthy execution, source, or candidate identity.

Treat required UNVERIFIED proof as BLOCKED until verified.

## Evidence receipt

For every material execution record capture enough to answer:

- candidate identity;
- scope items covered;
- command/procedure or evidence source;
- environment/profile when relevant;
- observed result;
- timestamp or run identity when available;
- artifact digest when an artifact is in scope;
- whether the result is CURRENT, STALE, or UNVERIFIED.

Do not place secrets, credentials, personal tokens, or unnecessary volatile machine state in evidence.

## Candidate immutability receipt

Record:

```text
candidate_start
candidate_end
same_candidate = true | false
```

If `same_candidate = false`, overall PASS is forbidden.

## Reuse rules

Evidence may be reused without rerunning when:

- exact candidate identity matches;
- the evidence covers the required obligation;
- the relevant environment/profile is appropriate;
- no later event invalidated the result.

A summary from a previous agent is not enough unless the underlying evidence is accessible and trustworthy.

## Missing, skipped, and unavailable checks

For a REQUIRED scope item:

- FAIL means the candidate is shown not to satisfy it;
- skipped/unavailable/unknown evidence means BLOCKED;
- only sufficient CURRENT proof can produce PASS.

There is no `PASS_WITH_WARNINGS` escape hatch for missing required proof.

## Auditability

The final evidence should let another reviewer reconstruct:

1. what candidate was judged;
2. what release promise was in scope;
3. which proof was reused;
4. which QA was executed;
5. what failed or remained unknown;
6. whether the candidate changed;
7. why the final status follows from the evidence.
