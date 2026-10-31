// Copied consumer type mechanism, narrowed to the actual P43 public contract.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
const input = JSON.parse(await fs.readFile('input.json', 'utf8'));
const cwd = await fs.realpath('.');
const keys = Object.keys(input.contract).filter(key => ['runtime', 'generated-runtime'].includes(input.contract[key].kind) && !key.includes('*'));
const specifier = key => input.name + (key === '.' ? '' : key.slice(1));
const languages = input.inventory.filter(e => /^server\/i18n\/[\w-]+\.js$/.test(e.file) && !e.file.endsWith('/index.js')).map(e => e.file.slice(12, -3));
assert.equal(languages.length, 34, 'Actual packed locale dictionaries');
const entries = [...keys, ...languages.map(lang => `./i18n/${lang}`)];
await fs.writeFile('entrypoints.ts', entries.map((key, i) => `import type * as Entry${i} from ${JSON.stringify(specifier(key))};\nexport type Public${i} = typeof Entry${i};`).join('\n'));
const results = [];
for (const mode of ['Bundler', 'NodeNext']) {
  const options = {target: ts.ScriptTarget.ES2022, lib: ['lib.es2022.d.ts', 'lib.esnext.intl.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'], module: mode === 'NodeNext' ? ts.ModuleKind.NodeNext : ts.ModuleKind.ESNext, moduleResolution: mode === 'NodeNext' ? ts.ModuleResolutionKind.NodeNext : ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.Preserve, jsxImportSource: '@solidjs/web', strict: true, skipLibCheck: false, types: [], noEmit: true, verbatimModuleSyntax: true};
  const program = ts.createProgram(['entrypoints.ts', 'app.tsx'].map(f => path.join(cwd, f)), options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const sources = program.getSourceFiles().map(f => f.fileName);
  assert(sources.every(f => f.startsWith(`${cwd}/`)), 'Type consumer escaped isolated directory');
  assert(!sources.some(f => /node_modules\/(?:react|react-dom|@types\/react)(?:\/|$)/.test(f)), 'React ambient type leakage');
  for (const key of entries) {
    const wildcard = key.startsWith('./i18n/') ? input.exports['./i18n/*'] : input.exports[key];
    const expected = path.join(cwd, 'node_modules', input.name, wildcard.types);
    const resolved = ts.resolveModuleName(specifier(key), path.join(cwd, 'entrypoints.ts'), options, ts.sys).resolvedModule;
    assert.equal(resolved?.resolvedFileName, expected, `${mode}: installed declaration resolution ${key}`);
  }
  results.push({mode, sources, diagnostics: diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'))});
}
await fs.writeFile('types-result.json', JSON.stringify({keys: entries, modes: ['Bundler', 'NodeNext'], results}, null, 2));
assert(results.every(r => r.diagnostics.length === 0), 'Installed strict declaration diagnostics: types-result.json');
