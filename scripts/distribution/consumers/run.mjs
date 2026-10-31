// Adapted from the frozen distribution consumer runner; P43 selected scope.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {contracts, assertExportMap} from '../types/shared.mjs';
import {command} from './process.mjs';
import {pins, temporaryRoot, sha256, parseArgs, inside, inspectArchive, assertInventory, conditionSets} from './policy.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const templates = path.join(root, 'test/distribution/consumers/templates');
const templateNames = ['installation.mjs', 'import-audit.mjs', 'initialization.mjs', 'types.mjs', 'resolution.mjs', 'bundle.mjs', 'browser.mjs', 'runtime-accounting.mjs', 'shaking-browser.mjs', 'app.tsx', 'client.tsx', 'server.tsx', 'hydration-assertions.tsx'];
const json = async file => JSON.parse(await fs.readFile(file, 'utf8'));

async function main(argv) {
  const args = parseArgs(argv);
  const approved = await fs.realpath(temporaryRoot);
  const parent = await fs.realpath(path.dirname(args.output));
  assert(inside(approved, parent) && !inside(root, parent), 'Output must be a fresh external approved directory');
  assert((await fs.lstat(args.tarball)).isFile(), 'Tarball must be a regular file, not a link');
  const {exports: contract, pkg: policy} = await contracts();
  const archive = inspectArchive(await fs.readFile(args.tarball));
  const manifest = JSON.parse(archive.files.get('package.json'));
  assertExportMap(manifest.exports, contract, policy);
  assertInventory(archive, manifest, policy);
  assert.equal(Object.keys(contract.exports).length, 87);
  assert.equal(Object.values(contract.exports).filter(e => e.kind === 'runtime').length, 83);
  const symbols = {};
  // Freeze the public source symbol oracle without changing or compiling source.
  const ts = (await import('typescript')).default;
  function packageImports(source, file) {
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const edits = [];
    function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const literal = node.moduleSpecifier;
        if (literal.text === 'react-aria-components' || literal.text.startsWith('react-aria-components/')) edits.push({start:literal.getStart(ast)+1,end:literal.getEnd()-1,text:manifest.name+literal.text.slice('react-aria-components'.length)});
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
    for (const edit of edits.sort((a,b)=>b.start-a.start)) source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
    return source;
  }
  const seen = new Map();
  function exported(file) {
    if (seen.has(file)) return seen.get(file);
    const names = new Set(); seen.set(file, names);
    const ast = ts.createSourceFile(file, requireText(file), ts.ScriptTarget.Latest, true);
    for (const node of ast.statements) {
      if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const item of node.exportClause.elements) if (!item.isTypeOnly) names.add(item.name.text);
      }
    }
    return [...names].sort();
  }
  const sourceTexts = new Map();
  for (const entry of Object.values(contract.exports)) if (entry.kind === 'runtime') {
    const file = path.join(root, entry.source); sourceTexts.set(file, await fs.readFile(file, 'utf8'));
  }
  function requireText(file) { assert(sourceTexts.has(file), `Missing public source oracle ${file}`); return sourceTexts.get(file); }
  for (const [key, entry] of Object.entries(contract.exports)) if (entry.kind === 'runtime') symbols[key] = exported(path.join(root, entry.source));
  await fs.mkdir(args.output);
  const output = await fs.realpath(args.output);
  const report = {status: 'running', scope: 'P48 condition matrix and optimized selected consumer, not full parity', archiveSha256: archive.sha256, commands: [], stages: {}, blockers: []};
  report.symbols = symbols;
  report.inventory = archive.inventory;
  report.fixtureHashes = {};
  const persist = () => fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  async function execute(directory, label, executable, parameters) {
    const record = await command(directory, path.join(output, 'logs'), label, executable, parameters, {allowFailure: true, timeout: 600000});
    report.commands.push(record); await persist();
    assert(record.code === 0 && !record.timedOut && !record.spawnError, `Failed ${label}; ${record.stdout}, ${record.stderr}`);
    report.stages[label] = 'passed'; await persist();
  }
  try {
    const work = await fs.realpath(await fs.mkdtemp(path.join(approved, 'rac-packed-')));
    report.consumer = work;
    for (let ancestor = path.dirname(work);; ancestor = path.dirname(ancestor)) {
      assert(!await fs.lstat(path.join(ancestor, 'node_modules')).then(() => true, e => {if (e.code === 'ENOENT') return false; throw e;}), `Ancestor node_modules: ${ancestor}`);
      if (path.dirname(ancestor) === ancestor) break;
    }
    await fs.mkdir(path.join(work, 'home'));
    await fs.writeFile(path.join(work, 'empty.npmrc'), '');
    await fs.writeFile(path.join(work, 'empty-global.npmrc'), '');
    const tarball = path.join(work, 'package.tgz');
    await fs.writeFile(tarball, await fs.readFile(args.tarball));
    assert.equal(sha256(await fs.readFile(tarball)), archive.sha256);
    for (const name of templateNames) {
      const source = await fs.readFile(path.join(templates, name), 'utf8');
      report.fixtureHashes[name] = sha256(source);
      await fs.writeFile(path.join(work, name), packageImports(source, name));
    }
    await fs.writeFile(path.join(work, 'package.json'), JSON.stringify({name: 'private-packed-consumer', private: true, type: 'module', dependencies: {...pins, [manifest.name]: tarball}, overrides: pins}, null, 2));
    const sets = conditionSets();
    const input = {name: manifest.name, version: manifest.version, exports: manifest.exports, contract: contract.exports, symbols, inventory: archive.inventory, pins, tarball, conditionSets: sets, executeRuntime: true};
    await fs.writeFile(path.join(work, 'input.json'), JSON.stringify(input, null, 2));
    await execute(work, 'install', 'npm', ['install', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund', '--install-strategy=hoisted']);
    for (const name of ['installation', 'import-audit', 'initialization', 'types']) await execute(work, name, process.execPath, [`${name}.mjs`]);
    for (const [mask, conditions] of sets.entries()) await execute(work, `resolution-${mask}`, process.execPath, [...conditions.map(c => `--conditions=${c}`), 'resolution.mjs', String(mask)]);
    await execute(work, 'bundle', process.execPath, ['bundle.mjs']);
    const serverSets = sets.map((conditions, mask) => ({conditions, mask})).filter(({conditions}) => !conditions.includes('types') && (conditions.includes('worker') || !conditions.includes('browser')));
    const browserSets = sets.map((conditions, mask) => ({conditions, mask})).filter(({conditions}) => !conditions.includes('types') && conditions.includes('browser') && !conditions.includes('worker'));
    const mixed = serverSets.filter(({conditions}) => conditions.includes('browser') && conditions.includes('worker'));
    assert.equal(serverSets.length, 24); assert.equal(browserSets.length, 8); assert.equal(mixed.length, 8);
    for (const {conditions,mask} of serverSets) await execute(work, `ssr-${mask}`, process.execPath, [...conditions.map(c => `--conditions=${c}`), 'server.js']);
    await execute(work, 'browser-install', process.execPath, ['node_modules/playwright/cli.js', 'install', 'chromium']);
    for (const {mask} of browserSets) await execute(work, `browser-${mask}`, process.execPath, ['browser.mjs', String(mask)]);
    for (const variant of ['root','subpath']) await execute(work, `optimized-ssr-${variant}`, process.execPath, [`server-optimized-${variant}.js`]);
    await execute(work, 'optimized', process.execPath, ['shaking-browser.mjs']);
    report.conditionCounts = {resolution: 64, server: 24, browser: 8, browserWorkerServer: 8};
    report.status = 'passed';
  } catch (error) {report.status = 'failed'; report.blockers.push(error.stack ?? String(error)); process.exitCode = 1;}
  await persist();
}
main(process.argv.slice(2)).catch(error => {console.error(error); process.exitCode = 1;});
