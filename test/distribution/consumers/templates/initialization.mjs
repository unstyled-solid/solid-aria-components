// Installed-byte census. Unknown initialization is retained, not a false-purity failure.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import {createHash} from 'node:crypto';

const input = JSON.parse(await fs.readFile('input.json', 'utf8'));
const root = path.resolve('node_modules', input.name);
const records = [], files = [];
for (const entry of input.inventory.filter(entry => /^(dom|server)\/.*\.js$/.test(entry.file))) {
  const bytes = await fs.readFile(path.join(root, entry.file));
  const hash = createHash('sha256').update(bytes).digest('hex');
  files.push({file: entry.file, sha256: hash});
  const ast = ts.createSourceFile(entry.file, bytes.toString('utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const imports = new Map();
  for (const statement of ast.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) for (const item of bindings.elements) {
      imports.set(item.name.text, {module: statement.moduleSpecifier.text, name: (item.propertyName ?? item.name).text});
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
        else if (entry.file.endsWith('/interactions/useFocusVisible.js') && callee === 'addWindowFocusTracking') category = 'global-focus-prototype-and-listeners';
        else if (imported?.module === '@solidjs/web' && imported.name === 'delegateEvents') category = 'global-dom-event-delegation';
      } else if (ts.isNewExpression(node) && ['Map', 'Set', 'WeakMap', 'WeakSet'].includes(callee) && !imports.has(callee)) {
        category = 'local-cache-allocation';
      } else if (ts.isExpressionStatement(node) && /^_P\$\w*\.prototype = Object\.prototype$/.test(node.expression.getText(ast))) {
        category = 'compiler-local-class-prototype';
      }
      records.push({file: entry.file, line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1,
        kind: ts.SyntaxKind[node.kind], expression: node.getText(ast), category,
        effectful: category === 'unknown-conservative-effectful' || category.startsWith('global-')});
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const manifest = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
assert(manifest.sideEffects === true || Array.isArray(manifest.sideEffects), 'Initialization requires conservative or file-specific policy, not blanket false');
await fs.writeFile('initialization-result.json', JSON.stringify({files, records,
  unknowns: records.filter(r => r.category === 'unknown-conservative-effectful'),
  sideEffectsCandidate: [...new Set(records.filter(r => r.effectful).map(r => './' + r.file)), './**/*.css'],
  sideEffects: manifest.sideEffects,
  qualification: 'installed-byte syntactic inventory; no runtime purity assertion'}, null, 2) + '\n');
