import {mkdirSync, writeFileSync, readFileSync, readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

const out = resolve(process.argv[2] || 'tracking/browser-test-diagnostics');
mkdirSync(out + '/raw', {recursive: true});
const files = readdirSync('packages/react-aria-components/test').filter(f => f.endsWith('.browser.test.tsx')).map(f => 'packages/react-aria-components/test/' + f);
const command = ['exec', 'vitest', 'run', '--config', 'vitest.browser.config.ts', ...files,
  '--reporter=default', '--reporter=json', '--reporter=./scripts/test-diagnostics/reporter.mjs', '--outputFile.json=' + out + '/raw/results.json'];
writeFileSync(out + '/raw/console.jsonl', '');
writeFileSync(out + '/raw/snapshot.json', JSON.stringify({date: new Date().toISOString(), command: 'pnpm ' + command.join(' '), files: Object.fromEntries(files.map(f => [f, createHash('sha256').update(readFileSync(f)).digest('hex')]))}, null, 2));
const result = spawnSync('pnpm', command, {env: {...process.env, VITE_TEST_DIAGNOSTICS: '1', TEST_DIAGNOSTICS_LOG: out + '/raw/console.jsonl'}, encoding: 'utf8', maxBuffer: 100 * 1024 * 1024, timeout: 900000});
writeFileSync(out + '/raw/terminal.log', (result.stdout || '') + (result.stderr || ''));
writeFileSync(out + '/raw/exit.json', JSON.stringify({status: result.status, error: result.error?.message}));
const profileCommand = ['exec', 'vitest', 'run', '--config', 'scripts/test-diagnostics/profile.config.ts',
  'packages/react-aria-components/test/Tabs.browser.test.tsx', '--reporter=default', '--reporter=json',
  '--reporter=./scripts/test-diagnostics/reporter.mjs', '--outputFile.json=' + out + '/raw/profile2-results.json'];
writeFileSync(out + '/raw/profile2-console.jsonl', '');
const profile = spawnSync('pnpm', profileCommand, {env: {...process.env, VITE_TEST_DIAGNOSTICS: '1', TEST_DIAGNOSTICS_LOG: out + '/raw/profile2-console.jsonl'}, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 120000});
writeFileSync(out + '/raw/profile2-terminal.log', (profile.stdout || '') + (profile.stderr || ''));
writeFileSync(out + '/raw/profile2-exit.json', JSON.stringify({status: profile.status, error: profile.error?.message}));
console.log(`Existing library browser tests exit ${result.status}; raw evidence: ${out}/raw`);
process.exitCode = result.status || profile.status || 0;
