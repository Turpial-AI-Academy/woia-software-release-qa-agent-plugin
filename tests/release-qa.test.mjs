import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "release-qa");

test("skill binds QA to integrated scope and one immutable candidate", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /integrated release scope/i);
  assert.match(skill, /same immutable candidate/i);
  assert.match(skill, /Re-check candidate identity after validation/i);
  assert.match(skill, /If the candidate changes, stop the attempt/i);
});

test("result model rejects pass with missing required proof", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "RELEASE_QA_STANDARD.md"), "utf8");
  const evidence = await readFile(path.join(skillRoot, "references", "EVIDENCE_MODEL.md"), "utf8");
  for (const status of ["RELEASE_QA_PASS", "RELEASE_QA_FAIL", "BLOCKED"]) {
    assert.match(standard, new RegExp(status));
  }
  assert.match(standard, /candidate identity changed during the attempt/);
  assert.match(evidence, /There is no .*PASS_WITH_WARNINGS.* escape hatch/i);
  assert.match(evidence, /skipped\/unavailable\/unknown evidence means BLOCKED/i);
});

test("scope model traces authoritative obligations instead of equating tests with readiness", async () => {
  const scope = await readFile(path.join(skillRoot, "references", "SCOPE_MODEL.md"), "utf8");
  assert.match(scope, /validates the integrated release promise/i);
  assert.match(scope, /not merely "whatever tests currently exist/i);
  for (const term of ["REQUIRED", "CONDITIONAL", "NOT_APPLICABLE"]) assert.match(scope, new RegExp(term));
  assert.match(scope, /requirements, acceptance criteria, or change request/i);
  assert.match(scope, /public APIs, schemas, CLI contracts/i);
  assert.match(scope, /install, package, import, launch, or startup behavior/i);
});

test("evidence model separates scope intent from exact-candidate execution proof", async () => {
  const evidence = await readFile(path.join(skillRoot, "references", "EVIDENCE_MODEL.md"), "utf8");
  assert.match(evidence, /Scope evidence does not by itself prove candidate behavior/i);
  assert.match(evidence, /exact frozen candidate/i);
  for (const freshness of ["CURRENT", "STALE", "UNVERIFIED"]) assert.match(evidence, new RegExp(freshness));
  assert.match(evidence, /candidate_start/);
  assert.match(evidence, /candidate_end/);
  assert.match(evidence, /same_candidate = true \| false/);
});

test("playbook reuses valid evidence and adds only targeted release QA", async () => {
  const playbook = await readFile(path.join(skillRoot, "references", "QA_PLAYBOOK.md"), "utf8");
  assert.match(playbook, /Reuse before rerun/);
  assert.match(playbook, /Do not rerun a full suite merely to create a second green log/i);
  assert.match(playbook, /smallest checks that close material release-level gaps/i);
  assert.match(playbook, /Do not fix the candidate inside the same QA attempt/i);
});

test("release QA stays separate from downstream release phases", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const playbook = await readFile(path.join(skillRoot, "references", "QA_PLAYBOOK.md"), "utf8");
  assert.match(skill, /Do not claim security approval/i);
  assert.match(skill, /Do not tag, publish, deploy, or promote/i);
  assert.match(playbook, /security passed/);
  assert.match(playbook, /release preparation passed/);
  assert.match(playbook, /deployment approved/);
});

test("report template makes candidate immutability, scope, gaps and handoff explicit", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "release-qa-report.template.md"), "utf8");
  const candidate = report.indexOf("## 2. Candidate identity");
  const scope = report.indexOf("## 3. Integrated scope matrix");
  const executed = report.indexOf("## 5. QA executed");
  const findings = report.indexOf("## 6. Findings");
  const result = report.indexOf("## 9. Result");
  const handoff = report.indexOf("## 10. Handoff");
  assert.ok(candidate >= 0 && scope > candidate && executed > scope && findings > executed && result > findings && handoff > result);
  assert.match(report, /Same immutable candidate: yes\/no/);
  assert.match(report, /Ready for downstream security evaluation: yes\/no/);
});

test("machine-readable evidence records exact candidate and avoids downstream approval claims", async () => {
  const evidence = JSON.parse(await readFile(path.join(skillRoot, "assets", "release-qa-evidence.template.json"), "utf8"));
  assert.equal(evidence.schema, "com.turpial.release-qa-evidence/v1");
  assert.equal(evidence.candidate.same_candidate, true);
  assert.equal(evidence.result, "RELEASE_QA_PASS | RELEASE_QA_FAIL | BLOCKED");
  assert.equal(evidence.ready_for_security_evaluation, false);
  assert.deepEqual(evidence.claims_not_made, [
    "security approval",
    "release preparation approval",
    "publication authorization",
    "deployment approval",
  ]);
});

test("bounded release QA reconciles external metadata while preserving mandatory candidate and scope invariants", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  for (const obligation of [
    /bounded[\s\S]*(healthy|valid)[\s\S]*(existing|current) scope matrix[\s\S]*(same|unchanged) frozen candidate/i,
    /metadata[\s\S]*documentation[\s\S]*outside[\s\S]*(production|frozen) candidate/i,
    /affected obligation[\s\S]*(smallest|targeted|bounded)[\s\S]*(report|matrix)/i,
    /verify[\s\S]*candidate identity[\s\S]*scope coverage[\s\S]*(freshness|current evidence)/i,
    /preserv\w*[\s\S]*(unrelated|unaffected)[\s\S]*scope[\s\S]*(execution|evidence) records/i,
    /(changed|mutated) candidate[\s\S]*(ends|stops)[\s\S]*attempt[\s\S]*new evaluation/i,
  ]) assert.match(skill, obligation);
});

test("deep release QA remains required for candidate changes, missing proof and release risk", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const triggers = skill.match(/Use the deep path[^\n]+/i)?.[0] ?? "";
  for (const trigger of [
    /new candidate|scope matrix/i,
    /candidate[\s\S]*source[\s\S]*artifact[\s\S]*changes/i,
    /missing[\s\S]*durable[\s\S]*(proof|evidence)/i,
    /contradict\w*[\s\S]*scope/i,
    /API[\s\S]*event[\s\S]*schema/i,
    /persisted[\s\S]*migration/i,
    /auth[\s\S]*security/i,
    /deployment[\s\S]*(rollback|recovery)/i,
    /provider[\s\S]*dependency/i,
  ]) assert.match(triggers, trigger);
});

test("reuse requires independently inspected durable execution and exposes the evidence lifecycle", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const playbook = await readFile(path.join(skillRoot, "references", "QA_PLAYBOOK.md"), "utf8");
  for (const obligation of [
    /independent\w*[\s\S]*(owns|ownership)[\s\S]*gate/i,
    /durable[\s\S]*actual execution[\s\S]*candidate[\s\S]*environment[\s\S]*coverage/i,
    /summaries[\s\S]*recollection[\s\S]*assumptions[\s\S]*not[\s\S]*execution evidence/i,
    /(run|execute)[\s\S]*relevant validation[\s\S]*cannot[\s\S]*independent\w*[\s\S]*BLOCKED/i,
    /reusable[\s\S]*CURRENT[\s\S]*invalidated[\s\S]*STALE[\s\S]*fresh[\s\S]*assumptions/i,
    /load[\s\S]*when[\s\S]*(reuse|existing) report/i,
  ]) assert.match(skill, obligation);
  assert.match(playbook, /only affected[\s\S]*invalidated[\s\S]*external report/i);
  assert.match(playbook, /document[\s\S]*(shipped|packaged)[\s\S]*candidate[\s\S]*candidate change/i);
});
