import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const read = (p) => readFile(new URL(p, root), 'utf8');
const pkg = JSON.parse(await read('package.json'));
const skill = await read('SKILL.md');
const patch = await read('cordis.patch.yml');
const index = await read('index.js');
test('bundle targets DSH 0.2.1-rc.2', () => {
 assert.equal(pkg.engines.dsh, '=0.2.1-rc.2');
 assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml');
});
test('skill retains authority gate and completion criteria', () => {
 assert.match(skill, /## 0\. AUTHORISATION AND SCOPE GATE/);
 assert.match(skill, /two consecutive reviews/);
});
test('bundle registers with the DSH skill registry', () => {
 assert.match(patch, /dsh-reverse-engineer-anything-self-learning-loop/);
 assert.match(index, /ctx\.skills\.register/);
});
test('workflow resources exist', async () => {
 for (const p of ['references/examine.md','references/fix-recipes.md','references/learning-loop.md','references/parity-checklist.md','references/review.md','templates/gap-report.md','templates/iteration-plan.md','templates/parity-checklist.md','templates/run-ledger.md','README.md','LICENSE','DESIGN.md']) await read(p);
});
test('package includes a local test command and YAML parser', () => {
 assert.equal(pkg.scripts.test, 'node --test');
 assert.ok(pkg.dependencies.yaml);
});
