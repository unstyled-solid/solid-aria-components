import {readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const out = resolve(process.argv[2] || 'tracking/browser-test-diagnostics');
const snapshot = JSON.parse(readFileSync(out + '/raw/snapshot.json'));
const changedTests = Object.entries(snapshot.files).filter(([file, hash]) => createHash('sha256').update(readFileSync(file)).digest('hex') !== hash).map(([file]) => file);
const result = existsSync(out + '/raw/results.json') ? JSON.parse(readFileSync(out + '/raw/results.json')) : {testResults: []};
const terminal = readFileSync(out + '/raw/terminal.log', 'utf8');
const failureHeaders = terminal.split('\n').filter(l => / FAIL\s+\|/.test(l));
function failureMessage(test) {
  const lines = terminal.split('\n');
  const index = lines.findIndex(l => / FAIL\s+\|/.test(l) && l.replaceAll(' > ', ' ').includes(test.fullName));
  return index < 0 ? test.failureMessages[0]?.split('\n')[0] :
    lines.slice(index + 1, index + 5).find(l => /^Error:/.test(l)) || test.failureMessages[0]?.split('\n')[0];
}
const logs = readFileSync(out + '/raw/console.jsonl', 'utf8').trim().split('\n').filter(Boolean).map(s => JSON.parse(s));
const attribution = new Map(logs.filter(l => l.attribution).map(l => [l.id, l]));
const unassigned = logs.filter(l => !l.attribution && l.content?.includes('__TEST_DIAGNOSTIC__') && !attribution.has(l.taskId));
const components = [...new Set([...Object.keys(snapshot.files).map(f => f.split('/').at(-1).split('.')[0]).filter(c => c !== 'ShadowDOMFocus'), 'NumberField', 'Menu'])];
mkdirSync(out + '/evidence', {recursive: true});
const evidence = (name, text) => {
  const chunks = []; let part = '';
  for (const line of text.split('\n')) {
    // Split even a single unusually large assertion/console argument without losing bytes.
    for (let i = 0; i < line.length || i === 0; i += 1500) {
      const piece = line.slice(i, i + 1500) + '\n';
      if (Buffer.byteLength(part + piece) > 7800) {chunks.push(part); part = '';}
      part += piece;
    }
  }
  if (part) chunks.push(part);
  return chunks.map((s, i) => {const file = `evidence/${name}-${i + 1}.txt`; writeFileSync(out + '/' + file, s); return `[evidence ${i + 1}](${file})`;}).join(', ');
};
const summary = [];
for (const component of components) {
  const suites = result.testResults.flatMap(t => {
    if (t.name?.includes('/' + component + '.')) return [t];
    if (t.name?.includes('/ShadowDOMFocus.') && ['ComboBox', 'NumberField', 'Menu'].includes(component)) {
      const assertions = t.assertionResults.filter(a => a.fullName.startsWith(component + ' '));
      return assertions.length ? [{...t, assertionResults: assertions}] : [];
    }
    return [];
  });
  const tests = suites.flatMap(t => t.assertionResults || []);
  const groups = new Map();
  for (const log of logs.filter(l => !l.attribution)) {
    const pos = log.content?.indexOf('__TEST_DIAGNOSTIC__');
    if (pos == null || pos < 0) continue;
    let diagnostic; try {diagnostic = JSON.parse(log.content.slice(pos + 19).trim());} catch {continue;}
    const at = attribution.get(log.taskId);
    const source = at?.file || diagnostic.stack || '';
    if (!source.includes('/' + component + '.') && !(source.includes('/ShadowDOMFocus.') && at?.name?.startsWith(component + ' '))) continue;
    const stack = diagnostic.stack?.split('\n').filter(s => !s.includes('/test/browser/setup.ts') && !s.includes('console capture')).join('\n');
    const normalize = s => s.replace(/https?:\/\/[^/]+/g, '<origin>').replace(/\?[^\s)]+/g, '');
    const meaningfulStack = normalize(stack || '').split('\n').filter(s => !s.includes('/test/') && !s.includes('vitest') && !s.includes('node_modules/.vite')).join('\n');
    const key = JSON.stringify([diagnostic.level, diagnostic.args.map(a => typeof a === 'string' ? normalize(a) : {name: a.name, message: normalize(a.message || ''), stack: normalize(a.stack || '').split('\n').filter(s => !s.includes('/test/') && !s.includes('vitest')).join('\n')}), meaningfulStack]);
    if (!groups.has(key)) groups.set(key, {diagnostic, stack, occurrences: []});
    groups.get(key).occurrences.push({test: at?.name || 'test attribution unavailable', browser: at?.browser || log.browser || 'engine unavailable', taskId: log.taskId});
  }
  const engineLines = terminal.split('\n').filter(l => /\|(?:chromium|firefox|webkit)-desktop\|/.test(l) && (l.includes('/' + component + '.') || (['ComboBox', 'NumberField', 'Menu'].includes(component) && l.includes('/ShadowDOMFocus.'))) && /\(\d+ tests?/.test(l));
  let text = `# ${component} — existing library browser tests\n\nSnapshot: ${snapshot.date}. Original tests and assertions unchanged.\n\nResults: ${tests.filter(t => t.status === 'passed').length} passed, ${tests.filter(t => t.status === 'failed').length} failed, ${tests.filter(t => t.status === 'pending' || t.status === 'skipped').length} skipped. ${suites.length} engine/file results.\n\nEngine/file coverage: ${evidence(`${component}-coverage`, engineLines.join('\n'))}\n\n## Runtime diagnostics\n\n`;
    if (!groups.size) text += tests.length ? `No attributed captured warnings/errors. ${unassigned.length} run-wide captured messages lack test attribution; see INDEX. This is limited to executed tests, not whole-component clearance.\n` : 'Unavailable: no test cases executed; not a clean diagnostic result.\n';
  let n = 0;
  for (const g of groups.values()) {
    n++;
    text += `### ${g.diagnostic.level} ${n} (${g.occurrences.length} occurrences)\n\n` + '```text\n' + g.diagnostic.args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join('\n').slice(0, 2000) + '\n```\n\n' + evidence(`${component}-runtime-${n}`, JSON.stringify(g, null, 2)) + '\n\n';
  }
  text += '\n## Test failures (not automatically component defects)\n\n';
  const failed = tests.filter(t => t.status === 'failed');
  if (!failed.length) text += 'None reported for executed cases.\n';
  const failureGroups = new Map();
  for (const t of failed) {
    const key = JSON.stringify([t.fullName, t.location, failureMessage(t)]);
    if (!failureGroups.has(key)) failureGroups.set(key, {test: t, count: 0, occurrences: []});
    failureGroups.get(key).count++;
    failureGroups.get(key).occurrences.push(t);
  }
  let failureNumber = 0;
  for (const {test: t, count, occurrences} of failureGroups.values()) {
    const headers = failureHeaders.filter(l => l.includes('/' + component + '.') && l.replaceAll(' > ', ' ').includes(t.fullName));
    const engines = [...new Set(headers.map(l => l.match(/\|([^|]+)\|/)?.[1]).filter(Boolean))];
    text += `- **${t.fullName}** — ${count} occurrences (${engines.join(', ') || 'engine unavailable'}), source line ${t.location?.line ?? 'unavailable'}. Exact error: \`${failureMessage(t)}\`. ${evidence(`${component}-assertion-${++failureNumber}`, headers.join('\n') + '\n' + failureMessage(t) + '\n' + JSON.stringify(occurrences, null, 2))}\n`;
  }
  text += '\n## Coverage\n\nExisting suite only; no new tests, mocks, or docs flows. Engines configured: Chromium, Firefox, WebKit. Engine/file attribution and unavailable execution must be read with the run limitations in [INDEX](INDEX.md).\n';
  if (['ComboBox', 'NumberField', 'Menu'].includes(component)) text += '\nShared ShadowDOMFocus suite cases are attributed by original test name to this component; engine/file evidence lists the whole shared file. NumberField/Menu have only this shared-suite coverage, not dedicated browser suites.\n';
  writeFileSync(out + '/' + component + '.md', text);
  summary.push(`| [${component}](${component}.md) | ${tests.length} | ${failed.length} | ${groups.size} |`);
}
const exit = JSON.parse(readFileSync(out + '/raw/exit.json'));
const blockers = terminal.split('\n').filter(l => /Error:|Cannot find|Executable doesn't exist|failed to|FAIL |Test Files|Tests |Unhandled|solid[./-].*(dev|prod)|signals.*(dev|prod)/i.test(l));
const links = evidence('run-limitations', blockers.join('\n') || terminal.slice(-6000));
const unattributedLinks = unassigned.length ? evidence('unattributed-runtime', unassigned.map(l => l.content).join('\n')) : 'None.';
const profileTerminal = existsSync(out + '/raw/profile2-terminal.log') ? readFileSync(out + '/raw/profile2-terminal.log', 'utf8') : '';
const profileLines = profileTerminal.split('\n').filter(l => /__RUNTIME_PROFILE__|\|.*-desktop\||Test Files|Tests |Duration/.test(l));
const runtimeLinks = evidence('runtime-profile', profileLines.join('\n') || 'No actual browser runtime profile captured.');
const profileFirst = existsSync(out + '/raw/profile-terminal.log') ? readFileSync(out + '/raw/profile-terminal.log', 'utf8') : '';
const profileFirstLines = profileFirst.split('\n').filter(l => /__TEST_DIAGNOSTIC__|__RUNTIME_PROFILE__|unexpectedly reloaded|dependency optimized|optimized dependencies changed|this.ctx.*getTask|DiagnosticReporter.onUserConsoleLog/.test(l));
const collectorLinks = profileFirstLines.length ? evidence('collection-probe-failure', profileFirstLines.slice(0, 15).join('\n')) : 'None.';
writeFileSync(out + '/INDEX.md', `# Library browser-test diagnostics\n\nSnapshot: ${snapshot.date}. Exit: ${exit.status}. Source freshness: SHA256 captured for every original suite before execution (raw backing snapshot).\n\nCommand:\n\n\`\`\`sh\nnode scripts/test-diagnostics/run.mjs\nnode scripts/test-diagnostics/report.mjs\n\`\`\`\n\nRunner executes root \`pnpm exec vitest run --config vitest.browser.config.ts\` with all eleven existing core browser files explicitly selected (including Modal/Dialog/ShadowDOMFocus). No docs/build/server collection.\n\n| Component | cases | failed | unique runtime groups |\n|---|---:|---:|---:|\n${summary.join('\n')}\n\n## Run limitations / unhandled runner errors\n\n${links}\n\nUnassigned captured runtime messages: ${unassigned.length}. ${unattributedLinks}\n\nPinned Solid and signals: 2.0.0-rc.13; config defines NODE_ENV=development but explicitly sets resolve.conditions=[source,import,module,default]. A declared profile does not prove both diagnostic runtimes loaded. Actual runtime evidence: ${runtimeLinks} Do not claim diagnostic clearance without actual dev module/runtime evidence.\n\nNot covered: all components without an existing core browser suite; S2 ButtonGroup peripheral suite deliberately not run. No jsdom/source unit-suite or whole-library coverage claim. Console errors continue to fail original tests; captured warnings are never suppressed.\n`);
let index = readFileSync(out + '/INDEX.md', 'utf8');
const profileResult = existsSync(out + '/raw/profile2-results.json') ? JSON.parse(readFileSync(out + '/raw/profile2-results.json')) : null;
const profileExit = existsSync(out + '/raw/profile2-exit.json') ? JSON.parse(readFileSync(out + '/raw/profile2-exit.json')) : null;
const runtimeProfiles = profileTerminal.split('\n').flatMap(line => {
  const pos = line.indexOf('__RUNTIME_PROFILE__');
  if (pos < 0) return [];
  try {return [JSON.parse(line.slice(pos + '__RUNTIME_PROFILE__'.length).trim())];} catch {return [];}
});
const engineNames = [...new Set([...profileTerminal.matchAll(/\|(chromium|firefox|webkit)-desktop\|/g)].map(match => match[1]))];
const devProfiles = runtimeProfiles.filter(p => p.solidDevelopment === true && p.signalsDevelopment === true).length;
const runtimeSummary = `Runtime probe: ${profileResult ? `${profileResult.numPassedTests} passed, ${profileResult.numFailedTests} failed, ${profileResult.numPendingTests} skipped (${profileResult.numTotalTests} total)` : 'results unavailable'}; exit ${profileExit?.status ?? 'unavailable'}. Actual Solid and signals development availability: ${runtimeProfiles.length ? `${devProfiles}/${runtimeProfiles.length} captured profiles confirm both development runtimes` : 'unavailable: no actual runtime profiles captured'}. Engine evidence: ${engineNames.join(', ') || 'unavailable'} (${engineNames.length} engines). This is diagnostic availability evidence, not whole-library clearance.`;
index = index.replace('Do not claim diagnostic clearance without actual dev module/runtime evidence.', runtimeSummary);
index += `\n## Executed outcome and freshness\n\nMain run: ${result.numPassedTests ?? 'unavailable'} passed, ${result.numFailedTests ?? 'unavailable'} failed, ${result.numPendingTests ?? 'unavailable'} original skips (${result.numTotalTests ?? 'unavailable'} total), ${result.testResults.length} engine/file instances. See component briefs above for exact failures, engine attribution and runtime diagnostics; run-limitations evidence includes runner errors and summary.\n\nPost-run original test SHA256 verification: ${changedTests.length ? 'CHANGED: ' + changedTests.join(', ') : `${Object.keys(snapshot.files).length}/${Object.keys(snapshot.files).length} unchanged`}. Working-tree library source was not commit-certified or frozen by this collector; results describe the executed snapshot, not concurrent/future edits. ShadowDOMFocus additionally exercises NumberField and Menu; these have no standalone existing browser suite, so no whole-component coverage claim. Composition remains Chromium-only: original Firefox/WebKit skips retained.\n`;
if (profileFirstLines.length) index += `\n## Separate collection-probe evidence\n\nCurrent raw/profile-terminal.log contains setup/runtime messages. These are separate from main-run component diagnostics; no causal ownership is inferred. ${collectorLinks}\n`;
writeFileSync(out + '/INDEX.md', index);
for (const f of readdirSync(out + '/evidence')) if (statSync(out + '/evidence/' + f).size > 8192) throw Error('Oversized evidence: ' + f);
for (const f of ['INDEX.md', ...components.map(c => c + '.md')]) for (const match of readFileSync(out + '/' + f, 'utf8').matchAll(/\]\(([^)]+)\)/g)) if (!existsSync(out + '/' + match[1])) throw Error('Broken link: ' + match[1]);
console.log('Reports generated; links and <=8192-byte evidence validated.');
