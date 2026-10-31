import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

export const root = fileURLToPath(new URL('../../../', import.meta.url));
export const packageRoot = path.join(root, 'packages/react-aria-components');
export const typesRoot = path.join(root, 'distribution/staged/types');
export const fixtureRoot = path.join(root, 'test/distribution/types');
export const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));

export async function contracts() {
  const exports = await readJson(path.join(root, 'distribution/exports.json'));
  const pkg = await readJson(path.join(root, 'distribution/package-contract.json'));
  const sourceDirectory = path.dirname(path.join(root, exports.sourceManifest));
  const manifestBytes = await fs.readFile(path.join(root, exports.sourceManifest));
  const digest = bytes => createHash('sha256').update(bytes).digest('hex');
  assert.equal(digest(manifestBytes), exports.sourceManifestSha256, 'Pinned source manifest hash');
  const upstream = JSON.parse(manifestBytes.toString('utf8'));
  const expectedRuntime = new Map();
  const explicitSources = new Set();
  const expectedKinds = new Map();
  // Explicit source entries take precedence over wildcard aliases of the same
  // file: the source index.ts is represented by '.', not a second './index'.
  for (const [key, entry] of Object.entries(upstream.exports)) {
    if (entry?.source && !entry.source.includes('*')) {
      expectedRuntime.set(key, entry.source);
      explicitSources.add(entry.source);
    } else if (!entry?.source) {
      expectedKinds.set(key, entry === null ? 'denied' : typeof entry === 'string' ? 'manifest' : 'generated-runtime');
    }
  }
  for (const [key, entry] of Object.entries(upstream.exports)) {
    if (!entry?.source?.includes('*')) continue;
    const directory = path.posix.dirname(entry.source);
    const pattern = path.posix.basename(entry.source);
    assert(!directory.includes('*') && pattern.split('*').length === 2 && key.split('*').length === 2,
      `Unsupported pinned source export pattern: ${key} -> ${entry.source}`);
    const [prefix, suffix] = pattern.split('*');
    for (const file of await fs.readdir(path.join(sourceDirectory, directory), {withFileTypes: true})) {
      if (!file.isFile() || !file.name.startsWith(prefix) || !file.name.endsWith(suffix) || file.name.length < prefix.length + suffix.length) continue;
      const target = `${directory}/${file.name}`;
      if (explicitSources.has(target)) continue;
      const expandedKey = key.replace('*', file.name.slice(prefix.length, suffix ? -suffix.length : undefined));
      assert(!expectedRuntime.has(expandedKey), `Duplicate pinned source export: ${expandedKey}`);
      expectedRuntime.set(expandedKey, target);
    }
  }
  const runtime = Object.entries(exports.exports).filter(([, entry]) => entry.kind === 'runtime');
  assert.equal(exports.sourceEntryCount, expectedRuntime.size, 'Pinned expanded source entry count');
  assert.deepEqual(runtime.map(([key]) => key).sort(), [...expectedRuntime.keys()].sort(),
    'Declaration contract must match exact pinned expanded runtime export keys');
  for (const [key, entry] of runtime) {
    const target = expectedRuntime.get(key);
    assert.equal(entry.target, target, `${key}: pinned source target`);
    assert.equal(entry.source, path.posix.join(pkg.paths.packageDirectory, target), `${key}: public source oracle`);
    assert.equal(digest(await fs.readFile(path.join(sourceDirectory, target))), entry.sourceSha256, `${key}: pinned source hash`);
  }
  assert.deepEqual(Object.entries(exports.exports).filter(([, entry]) => entry.kind !== 'runtime').map(([key, entry]) => [key, entry.kind]).sort(),
    [...expectedKinds].sort(), 'Generated i18n, package manifest and private denial remain separate export kinds');
  for (const [key, kind] of expectedKinds) {
    if (kind === 'manifest') assert.equal(exports.exports[key].target, upstream.exports[key], `${key}: source manifest target`);
  }
  return { exports, pkg };
}

export function typeTarget(entry) {
  if (!entry.stem || entry.stem.includes('..')) {
    throw new Error(`Unsafe source stem: ${entry.stem}`);
  }
  return `./types/${entry.stem}.d.ts`;
}

export function conditionalExports(contract, pkg) {
  return Object.fromEntries(Object.entries(contract.exports).map(([key, entry]) => {
    return [key, entry.kind==='denied'?null:entry.kind==='manifest'?entry.target:entry.conditions];
  }));
}

export function assertExportMap(actual, contract, pkg) {
  const expected = conditionalExports(contract, pkg);
  assert.deepEqual(actual, expected, 'Staged manifest must match actual conditional targets');
  for (const key of Object.keys(expected)) {
    if(expected[key]&&typeof expected[key]==='object')assert.deepEqual(Object.keys(actual[key]), Object.keys(expected[key]), `${key}: types-first condition order`);
  }
}

export function assertDiagnostics(diagnostics, context) {
  if (diagnostics.length) {
    throw new Error(`${context}\n${ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: (file) => file,
      getNewLine: () => '\n',
    })}`);
  }
}

// Edit only module literal spans; preserve all emitted signatures, namespaces and JSDoc verbatim.
export function portableDeclaration(file, text, files, identity, resolveInternal, omitClientOnly = false) {
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const edits = [];
  const modules = [];
  function visit(node) {
    if (omitClientOnly && ts.isImportDeclaration(node) && !node.importClause && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text === 'client-only') {
      edits.push({start: node.getStart(ast), end: node.getEnd(), text: ''});
      return;
    }
    let literal;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) literal = node.moduleSpecifier;
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) literal = node.argument.literal;
    else if (ts.isExternalModuleReference(node)) literal = node.expression;
    else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) literal = node.name;
    if (literal && ts.isStringLiteral(literal)) {
      const specifier = resolveInternal?.(literal.text) ?? literal.text;
      if (specifier.startsWith('.')) {
        const base = path.resolve(path.dirname(file), specifier.replace(/\.(?:js|jsx|ts|tsx|d\.ts)$/, ''));
        const target = [`${base}.d.ts`, path.join(base, 'index.d.ts')].find((candidate) => files.has(candidate));
        if (!target) throw new Error(`${file}: unresolved declaration module ${specifier}`);
        let relative = path.relative(path.dirname(file), target).split(path.sep).join('/').replace(/\.d\.ts$/, '.js');
        if (!relative.startsWith('.')) relative = `./${relative}`;
        edits.push({ start: literal.getStart(ast) + 1, end: literal.getEnd() - 1, text: relative });
        modules.push(relative);
      } else {
        if (specifier.startsWith('#') || path.isAbsolute(specifier) || /^(?:react(?:-dom)?(?:\/|$)|@types\/react|@base-ui\/|vitest(?:\/|$)|@vitest\/|@testing-library\/)/.test(specifier)) {
          throw new Error(`${file}: forbidden published declaration reference ${specifier}`);
        }
        const published = identity && (specifier === identity.from || specifier.startsWith(`${identity.from}/`))
          ? identity.to + specifier.slice(identity.from.length) : specifier;
        if (published !== specifier) edits.push({ start: literal.getStart(ast) + 1, end: literal.getEnd() - 1, text: published });
        modules.push(published);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  if (ast.referencedFiles.length || ast.typeReferenceDirectives.some((ref) => /react/.test(ref.fileName))) {
    throw new Error(`${file}: nonportable triple-slash declaration reference`);
  }
  for (const edit of edits.sort((a, b) => b.start - a.start)) text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
  return { text, modules };
}
