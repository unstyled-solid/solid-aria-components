// Reference AST census adapted to D's authoritative closure, not a source scan.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import {root} from './index.mjs';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function inspect(text, file) {
  const records = [];
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const imports = new Map();
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node)) continue;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) for (const item of bindings.elements) {
      imports.set(item.name.text, {module: node.moduleSpecifier.text, name: (item.propertyName ?? item.name).text});
    }
  }
  function visit(node) {
    if (ts.isFunctionLike(node)) return;
    if (ts.isPropertyDeclaration(node) && !node.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)) return;
    if (ts.isCallExpression(node) || ts.isNewExpression(node) || ts.isExpressionStatement(node)) {
      const callee = ts.isCallExpression(node) || ts.isNewExpression(node) ? node.expression.getText(ast) : undefined;
      const imported = imports.get(callee);
      let category = 'unknown-conservative-effectful';
      if (ts.isCallExpression(node)) {
        if (imported?.module === 'solid-js' && imported.name === 'createContext') category = 'local-context-allocation';
        else if (imported?.module === '@solidjs/web' && imported.name === 'template') category = 'compiler-lazy-dom-template';
        else if (callee === 'Symbol' || callee === 'Symbol.for') category = 'local-symbol-or-registry-key';
        else if (file.endsWith('/interactions/useFocusVisible.js') && callee === 'addWindowFocusTracking') category = 'global-focus-prototype-and-listeners';
        else if (imported?.module === '@solidjs/web' && imported.name === 'delegateEvents') category = 'global-dom-event-delegation';
      } else if (ts.isNewExpression(node) && ['Map', 'Set', 'WeakMap', 'WeakSet'].includes(callee) && !imports.has(callee)) {
        category = 'local-cache-allocation';
      } else if (ts.isExpressionStatement(node) && /^_P\$\w*\.prototype = Object\.prototype$/.test(node.expression.getText(ast))) {
        category = 'compiler-local-class-prototype';
      }
      const effectful = category === 'unknown-conservative-effectful' || category.startsWith('global-');
      records.push({file, line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1,
        kind: ts.SyntaxKind[node.kind], callee, expression: node.getText(ast), category, effectful});
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return records;
}

export async function census(stage = path.join(root, 'distribution/staged')) {
  const bytes = await fs.readFile(path.join(stage, 'closure.json'));
  const graph = JSON.parse(bytes);
  if (graph.schemaVersion !== 1 || graph.sourceSha !== '3bdef480e85ff135cd485e9f4511b98300127d4b') throw new Error('Wrong D closure schema/source pin');
  const files = [], records = [];
  for (const branch of ['dom', 'server']) for (const module of graph.modules) {
    if (module.declarationOnly) continue;
    if (module.stem.includes('..') || path.isAbsolute(module.stem)) throw new Error('Unsafe closure stem');
    const file = `${branch}/${module.stem}.js`;
    const artifact = await fs.readFile(path.join(stage, file));
    const source = module.generated
      ? Buffer.from(JSON.parse(await fs.readFile(path.join(stage, file + '.map'), 'utf8')).sourcesContent[0])
      : await fs.readFile(path.join(root, module.source));
    files.push({file, source: module.source, sha256: sha256(artifact), sourceSha256: sha256(source)});
    records.push(...inspect(artifact.toString('utf8'), file));
  }
  const sideEffects = [...new Set(records.filter(r => r.effectful).map(r => './' + r.file))].sort();
  const styles = files.filter(f => /\.css$/.test(f.file)).map(f => './' + f.file);
  return {schemaVersion: 1, sourceSha: graph.sourceSha, graphSha256: sha256(bytes), closureModules: graph.modules.length,
    artifactCounts: Object.fromEntries(['dom', 'server'].map(b => [b, files.filter(f => f.file.startsWith(b + '/')).length])),
    reference: {commit: '905fd60bdf9fd5ff045722d21c456cf3634dab3c',
      censusSha256: '2a0d2928686c47d65363b61e59081cd80c08841ab36ca7ffa93a1380495ba0d4',
      templateSha256: 'd09d37a7ac9d3fec9d41ad244a999c8f56aed893a2d151c8d98e3a0000848bc0'},
    tooling: await Promise.all(['scripts/distribution/build/initialization-census.mjs',
      'test/distribution/consumers/templates/initialization.mjs'].map(async file => ({file, sha256: sha256(await fs.readFile(path.join(root, file)))}))),
    files, records, unknowns: records.filter(r => r.category === 'unknown-conservative-effectful'),
    sideEffectsCandidate: [...new Set([...sideEffects, ...styles, './**/*.css'])],
    sourceReview: {
      focusVisible: 'Import setup calls addWindowFocusTracking; patches HTMLElement.prototype.focus and installs document/window listeners. Preserve this module.',
      hover: 'useHover registers global touch listeners via owned onSettled(setupGlobalTouchEvents), not import-time registration.',
      focusScope: 'Context/tree allocations at module scope; focus containment/restoration listeners belong to mounted scopes, not import-time setup.',
      metadata: 'Source sideEffects:false/CSS patterns are evidence only, not proof. Unknown expressions retain their exact module.',
      limitations: 'Reference syntactic census skips function bodies; immediately invoked function bodies/defaults require separate review and remain conservatively retained. No runtime execution or full purity proof.'
    }};
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2), check = args.includes('--check');
  const output = path.join(root, 'distribution/initialization-classification.json');
  const result = JSON.stringify(await census(), null, 2) + '\n';
  if (check) {
    if (await fs.readFile(output, 'utf8') !== result) throw new Error('Stale census/artifact/source hashes');
  } else await fs.writeFile(output, result);
  const r = JSON.parse(result);
  console.log(JSON.stringify({closureModules: r.closureModules, artifacts: r.artifactCounts,
    records: r.records.length, unknowns: r.unknowns.length, candidateFiles: r.sideEffectsCandidate.length, check}));
}
