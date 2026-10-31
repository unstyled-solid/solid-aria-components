import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import {compile} from '../../distribution/build/compiler.mjs';

export const root = fileURLToPath(new URL('../../../', import.meta.url));
export const owned = path.join(root, 'scripts/docs/build');
const s2 = path.join(root, 'packages/@react-spectrum/s2');
const hash = value => createHash('sha256').update(value).digest('hex');
const {compileStrings} = createRequire(import.meta.url)('../../../packages/@internationalized/string-compiler/src/stringCompiler.js');
const names = ['Provider', 'Divider', 'Button', 'LinkButton', 'ButtonGroup', 'ActionButton', 'ActionButtonGroup',
  'ProgressCircle', 'Avatar', 'Image', 'NotificationBadge', 'Link', 'Tooltip'];

export async function prepare(branch) {
  const raw = ts.readConfigFile(path.join(root, 'tsconfig.wave.json'), ts.sys.readFile);
  const options = ts.parseJsonConfigFileContent(raw.config, ts.sys, root).options;
  const staged = JSON.parse(await fs.readFile(path.join(root, 'distribution/staged/closure.json'), 'utf8'));
  const stems = new Map(staged.modules.map(n => [path.join(root, n.source), n]));
  const directory = path.join(owned, 'input', branch);
  const nodes = new Map(), stageImports = [], assets = [];
  const targetFor = file => path.join(directory,
    (file.startsWith(s2 + path.sep) ? path.relative(s2, file) : '_native/' + path.relative(root, file))
      .replace(/\.(?:tsx?|jsx?|mjs)$/, '.native.js'));
  async function resolve(specifier, from) {
    if (specifier === 'solid-js' || specifier.startsWith('solid-js/') || specifier === '@solidjs/web') return specifier;
    const resolution = ts.resolveModuleName(specifier, from, options, ts.sys).resolvedModule;
    const file = resolution?.resolvedFileName && path.resolve(resolution.resolvedFileName);
    if (file && file.startsWith(s2 + path.sep)) {await visit(file); return targetFor(file);}
    if (file && stems.has(file)) {
      const node = stems.get(file);
      if (node.declarationOnly) throw new Error(`Declaration in runtime import: ${specifier}`);
      const target = path.join(root, 'distribution/staged', branch, node.stem + '.js');
      stageImports.push({from: path.relative(root, from), specifier, source: path.relative(root, file), target: path.relative(root, target)});
      return target;
    }
    if (file && /\/packages\/(?:react-aria|react-stately|react-aria-components)\//.test(file)) {
      await visit(file);return targetFor(file);
    }
    if (specifier === '../intl/*.json') {
      const intl = path.join(s2, 'intl');
      const files = (await fs.readdir(intl)).filter(f => f.endsWith('.json')).sort();
      const input = [];
      let code = 'export default {\n';
      for (const name of files) {
        const bytes = await fs.readFile(path.join(intl, name));
        input.push({source: path.relative(root, path.join(intl, name)), sha256: hash(bytes)});
        code += JSON.stringify(name.slice(0, -5)) + ':' + compileStrings(JSON.parse(bytes)).replace('module.exports = ', '') + ',\n';
      }
      code += '};\n';
      const target = path.join(directory, 'intl/dictionary.native.js');
      await fs.mkdir(path.dirname(target), {recursive: true});await fs.writeFile(target, code);
      nodes.set(target, {generated: true, target, inputs: input, sha256: hash(code)});
      return target;
    }
    if (specifier.startsWith('.') && /\.(css|svg)$/.test(specifier)) {
      const asset = path.resolve(path.dirname(from), specifier), bytes = await fs.readFile(asset);
      const target = path.join(directory, path.relative(s2, asset));
      await fs.mkdir(path.dirname(target), {recursive: true});await fs.writeFile(target, bytes);
      assets.push({source: path.relative(root, asset), target: path.relative(root, target), sha256: hash(bytes)});
      return target;
    }
    if (file && file.includes('/node_modules/') && !specifier.startsWith('react')) return specifier;
    throw new Error(`Unassigned/unresolved runtime module: ${path.relative(root, from)} -> ${specifier}${file ? ' (' + path.relative(root, file) + ')' : ''}`);
  }
  async function visit(file) {
    if (nodes.has(file)) return;
    if (file.endsWith('.d.ts')) throw new Error('Type-only runtime node: ' + file);
    const text = await fs.readFile(file, 'utf8');
    const target = targetFor(file);
    nodes.set(file, {source: path.relative(root, file), target, sourceSha256: hash(text)});
    const lowered = compile(text, file, branch === 'dom' ? 'dom' : 'ssr');
    const ast = ts.createSourceFile(file, lowered.code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const joins = new Map();
    for (const statement of ast.statements) {
      if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) || !statement.moduleSpecifier) continue;
      const specifier = statement.moduleSpecifier.text;
      if (/^react(?:-dom)?(?:\/|$)/.test(specifier)) throw new Error('Unported runtime source outside native closure: ' + path.relative(root, file));
      const macro = ts.isImportDeclaration(statement) && statement.attributes?.elements.some(e => e.name.text === 'type' && e.value.text === 'macro');
      if (!macro) joins.set(specifier, await resolve(specifier, file));
    }
    const result = compile(text, file, branch === 'dom' ? 'dom' : 'ssr', specifier => joins.get(specifier) ?? specifier);
    await fs.mkdir(path.dirname(target), {recursive: true});await fs.writeFile(target, result.code);
  }
  const entries = [];
  for (const name of names) {
    const file = name === 'LinkButton' ? path.join(s2, 'src/Button.tsx')
      : name === 'NotificationBadge' ? path.join(s2, 'src/NotificationBadge.tsx')
      : path.join(s2, 'exports', name + '.ts');
    await visit(file);entries.push(targetFor(file));
  }
  // Four actual SVG source inputs already transported by the native CornerTriangle.
  if ([...nodes.keys()].some(f => f.endsWith('/CornerTriangle.tsx'))) {
    for (const name of ['75', '100', '200', '300']) {
      const file = path.join(s2, 'ui-icons', `S2_CornerTriangleSize${name}.svg`), bytes = await fs.readFile(file);
      const target = path.join(directory, 'assets', path.basename(file));
      await fs.mkdir(path.dirname(target), {recursive: true});await fs.writeFile(target, bytes);
      assets.push({source: path.relative(root, file), target: path.relative(root, target), sha256: hash(bytes), transport: 'existing native CornerTriangle JSX'});
    }
  }
  const graph = {branch, entries, nodes: [...nodes.values()], stageImports, assets};
  // One library entry keeps shared contexts single-instance across the selected
  // native source barrels. Reexports are genuine source exports, not adapters.
  const selected = path.join(directory, 'selected.native.js');
  const seen = new Map(), declarations = [];
  async function identity(file, name) {
    const ast = ts.createSourceFile(file, await fs.readFile(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    for (const n of ast.statements) if (ts.isExportDeclaration(n) && n.moduleSpecifier && n.exportClause && ts.isNamedExports(n.exportClause)) {
      const e = n.exportClause.elements.find(e => e.name.text === name);
      if (e) return identity(path.resolve(path.dirname(file), n.moduleSpecifier.text), (e.propertyName ?? e.name).text);
    }
    return file + '#' + name;
  }
  for (const file of new Set(entries)) {
    const ast = ts.createSourceFile(file, await fs.readFile(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const exported = [];
    for (const n of ast.statements) {
      if (ts.isExportDeclaration(n) && n.exportClause && ts.isNamedExports(n.exportClause)) exported.push(...n.exportClause.elements.map(e => e.name.text));
      if (n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
        if (ts.isVariableStatement(n)) exported.push(...n.declarationList.declarations.map(d => d.name.getText(ast)));
        else if (n.name && (ts.isFunctionDeclaration(n) || ts.isClassDeclaration(n))) exported.push(n.name.text);
      }
    }
    const unique = [];
    for (const name of exported) {
      const origin = await identity(file, name);
      if (seen.has(name)) {if (seen.get(name) !== origin) throw new Error('Conflicting actual source exports: ' + name);}
      else {seen.set(name, origin);unique.push(name);}
    }
    if (unique.length) declarations.push(`export {${unique.join(', ')}} from ${JSON.stringify(file)};`);
  }
  graph.exportOrigins = Object.fromEntries(seen);
  await fs.writeFile(selected, declarations.join('\n') + '\n');
  graph.libraryEntry = selected;
  await fs.mkdir(directory, {recursive: true});await fs.writeFile(path.join(directory, 'graph.json'), JSON.stringify(graph, null, 2) + '\n');
  return graph;
}
