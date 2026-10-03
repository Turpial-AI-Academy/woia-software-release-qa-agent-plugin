# Integrated Release Scope Model

## Why scope reconstruction matters

Release QA validates the integrated release promise, not merely "whatever tests currently exist."

Reconstruct that promise from repository and product evidence before selecting QA work.

## Scope sources

Use the repository's actual sources of truth, as applicable:

- release goal, issue, SPEC, requirements, acceptance criteria, or change request;
- merged change set and integration record;
- supported platform/runtime matrix;
- public APIs, schemas, CLI contracts, persisted formats, migrations, and compatibility promises;
- user journeys and operational flows materially changed by the release;
- defect/regression records tied to the release;
- packaging, install, upgrade, or distribution expectations when they are part of the candidate being evaluated;
- explicitly deferred or excluded work;
- repository-defined definition of done or release criteria.

Documentation can state intent. The exact candidate and candidate-bound execution evidence show whether that intent is met.

## Scope matrix

Create one row per material obligation.

Recommended fields:

| Field | Meaning |
|---|---|
| id | Stable local identifier for the QA report |
| obligation | What the release must satisfy |
| classification | REQUIRED, CONDITIONAL, or NOT_APPLICABLE |
| source | Authoritative source of the obligation |
| surface | Component, platform, contract, journey, migration, package, or other affected surface |
| risk | Why failure matters |
| evidence | Existing current candidate-bound proof |
| validation | Additional QA still needed |
| result | PASS, FAIL, BLOCKED, or NOT_APPLICABLE |
| notes | Explicit exclusions, conditions, or residual risk |

## Classification

### REQUIRED

The release promise depends on this obligation. A FAIL or material unknown prevents overall PASS.

### CONDITIONAL

The obligation becomes required only when its stated trigger applies. Record the trigger and whether it is active.

Do not silently mark an inconvenient obligation NOT_APPLICABLE.

### NOT_APPLICABLE

Use only when repository/release evidence shows the obligation does not apply to this candidate. Record the reason.

## Typical scope dimensions

Select only dimensions actually relevant to the release:

- primary behavior and acceptance criteria;
- regression-sensitive changed behavior;
- integration between changed components;
- public contract compatibility;
- supported runtime/platform compatibility;
- data/state/migration behavior;
- install, package, import, launch, or startup behavior;
- upgrade path from a supported prior version;
- critical user journey smoke;
- recovery or rollback preconditions when the release promise requires them;
- documentation or configuration examples when they are executable parts of the user experience.

Do not impose every dimension on every product.

## Deferred work and known issues

A deferred item is not automatically outside scope.

For each deferred item determine:

1. was it explicitly removed from this release's required scope by the responsible authority?
2. does it invalidate another required acceptance criterion?
3. does it create a material unknown in the candidate's supported behavior?

If release authority is ambiguous, report BLOCKED rather than inventing acceptance.

## Candidate changes invalidate the scope decision

The scope matrix may remain useful after a fix, but a new candidate requires a new candidate-bound QA decision. Previous results can inform the next plan; they do not prove the new candidate.
