import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const input = JSON.parse(await fs.readFile('input.json', 'utf8'));
const mask = Number(process.argv[2]);
const conditions = input.conditionSets[mask];
assert(conditions, 'Unknown condition set');
const records = [], failures = [];
const active = new Set(['node', 'import', ...conditions]);
function select(entry) {
  if (entry == null) return undefined;
  if (typeof entry === 'string') return entry;
  for (const [key, value] of Object.entries(entry)) if (key === 'default' || active.has(key)) {
    const target = select(value); if (target) return target;
  }
}
const entries = Object.entries(input.contract).filter(([key, entry]) => !key.includes('*') && entry.kind !== 'manifest');
for (const file of input.inventory.filter(e => /^server\/i18n\/[\w-]+\.js$/.test(e.file) && !e.file.endsWith('/index.js'))) {
  const locale = file.file.slice(12, -3);
  const key = `./i18n/${locale}`;
  input.exports[key] = Object.fromEntries(Object.entries(input.exports['./i18n/*']).map(([condition,target]) => [condition, target.replace('*',locale)]));
  entries.push([key, input.contract['./i18n/*']]);
}
input.exports['./private/forbidden'] = null;
entries.push(['./private/forbidden', {kind:'denied'}]);
for (const [key, entry] of entries) {
  const name = input.name + (key === '.' ? '' : key.slice(1));
  const expected = select(input.exports[key]);
  const record = { key, kind: entry.kind, conditions, expected };
  try {
    record.resolved = fileURLToPath(import.meta.resolve(name));
    assert(expected, `${name}: unexpected runtime target`);
    assert.equal(record.resolved, path.resolve('node_modules', input.name, expected));
  } catch (error) {
    record.resolutionError = { code: error.code, message: error.message, stack: error.stack };
    if (expected || error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') failures.push(record);
  }
  // A declarations condition is resolution evidence only. Never execute a .d.ts.
  // DOM entrypoints execute in the real browser matrix, not a fake Node document.
  if (input.executeRuntime && !conditions.includes('types') && (!conditions.includes('browser') || conditions.includes('worker'))) {
    try {
      record.exports = Object.keys(await import(name));
      if (entry.kind === 'runtime') assert.deepEqual(record.exports.slice().sort(), input.symbols[key], `${key}: actual public symbol mismatch`);
      if (entry.kind === 'types-only') throw new Error('Type-only module unexpectedly executed');
      record.runtime = 'passed';
    } catch (error) {
      record.importError = { code: error.code, message: error.message, stack: error.stack };
      if (['types-only', 'denied'].includes(entry.kind) && error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') record.runtime = 'type-only-rejected';
      else { record.runtime = 'failed'; failures.push(record); }
    }
  }
  records.push(record);
}
const peers = Object.fromEntries(['solid-js', '@solidjs/web', '@solidjs/signals'].map(name => [name, import.meta.resolve(name)]));
if (!conditions.includes('types')) {
  const server = conditions.includes('worker') || !conditions.includes('browser');
  for (const name of ['solid-js', '@solidjs/web']) assert.equal(peers[name].includes('/dist/server'), server, `${name}: renderer/library condition mismatch`);
}
await fs.writeFile(`resolution-${mask}.json`, JSON.stringify({ conditions, peers, records, failures }, null, 2));
assert.deepEqual(failures, [], 'Condition/runtime failures retained in resolution JSON');
