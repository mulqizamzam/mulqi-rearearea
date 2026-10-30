#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(await readFile(join(root, 'source-manifest.json'), 'utf8'));
const failures = [];
let checked = 0;
for (const item of manifest.entries) {
  const path = join(root, item.archive_path);
  try {
    const bytes = await readFile(path);
    const header = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
    const actual = createHash('sha1').update(Buffer.concat([header, bytes])).digest('hex');
    checked++;
    if (bytes.length !== item.size_bytes) failures.push(`${item.archive_path}: size ${bytes.length} != ${item.size_bytes}`);
    if (actual !== item.git_blob_sha1) failures.push(`${item.archive_path}: Git blob SHA-1 ${actual} != ${item.git_blob_sha1}`);
  } catch (error) {
    failures.push(`${item.archive_path}: missing/unreadable (${error.message})`);
  }
}
for (const required of ['SKILL.md','index.js','package.json','cordis.patch.yml','references/examine.md','templates/parity-checklist.md','docs/SOURCE-RECONCILIATION.md']) {
  try { await access(join(root, required)); } catch { failures.push(`required target file missing: ${required}`); }
}
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (pkg.name !== 'dsh-reverse-engineer-anything-self-learning-loop') failures.push('unexpected package name');
if (pkg.engines?.dsh !== '=0.2.1-rc.2') failures.push('DSH engine pin is not exactly =0.2.1-rc.2');
if (!pkg.files?.includes('upstream/')) failures.push('package allowlist does not include upstream/');
if (!pkg.files?.includes('source-manifest.json')) failures.push('package allowlist does not include source-manifest.json');
if (manifest.entries.length !== manifest.source_item_count) failures.push('manifest source_item_count does not match entries');
if (manifest.inventory_complete !== true) failures.push('manifest inventory_complete is not true');
if (failures.length) {
  console.error(`Completeness validation FAILED: ${failures.length} issue(s); verified ${checked}/${manifest.entries.length} source snapshots.`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Completeness validation PASSED: ${checked}/${manifest.entries.length} upstream files match their recorded Git blob SHA-1 and byte lengths; required DSH files and package declarations are present.`);
}
