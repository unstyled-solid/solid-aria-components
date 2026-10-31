import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {Parcel} from '@parcel/core';
import ts from 'typescript';
import {root, owned, prepare} from './prepare.mjs';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export async function buildDocsGraph() {
  const output = path.join(owned, process.env.DOCS_ENV ? 'linked-docs' : 'linked');
  const results = [];
  for (const branch of ['dom', 'server']) {
    const graph = await prepare(branch);
    const parcel = new Parcel({entries: [graph.libraryEntry], config: path.join(owned, '.parcelrc'),
      mode: 'production', shouldDisableCache: true, shouldAutoInstall: false,
      defaultTargetOptions: {shouldScopeHoist: true, shouldOptimize: false},
      cacheDir: path.join(owned, '.parcel-cache'), shouldPatchConsole: false,
      targets: {native: {context: branch === 'dom' ? 'browser' : 'node', outputFormat: 'esmodule',
        isLibrary: true, includeNodeModules: false, optimize: false, scopeHoist: true,
        sourceMap: true, distDir: path.join(output, branch)}},
      env: process.env.DOCS_ENV === undefined ? {} : {DOCS_ENV: process.env.DOCS_ENV}});
    const {bundleGraph} = await parcel.run();
    const bundles = [];
    for (const bundle of bundleGraph.getBundles()) {
      const bytes = await fs.readFile(bundle.filePath);
      const record = {file: path.relative(root, bundle.filePath), type: bundle.type, sha256: hash(bytes), bytes: bytes.length};
      if (bundle.type === 'js') {
        const code = bytes.toString('utf8');
        if (/\brequire\(|react\/jsx-runtime|React\.createElement|from\s*['"]react(?:-dom)?['"]/.test(code)) throw new Error('Non-native closed graph: ' + record.file);
        const ast = ts.createSourceFile(record.file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
        record.imports = ast.statements.filter(ts.isImportDeclaration).map(n => n.moduleSpecifier.text);
        record.exports = ast.statements.filter(ts.isExportDeclaration).flatMap(n =>
          n.exportClause && ts.isNamedExports(n.exportClause) ? n.exportClause.elements.map(e => e.name.text) : []);
        for (const specifier of record.imports) if (specifier.startsWith('.')) {
          const target = path.resolve(path.dirname(bundle.filePath), specifier);
          if (!await fs.stat(target).then(s => s.isFile(), () => false)) throw new Error('Unclosed output import: ' + specifier);
        }
      }
      bundles.push(record);
    }
    results.push({branch, sourceGraph: path.relative(root, path.join(owned, 'input', branch, 'graph.json')), nativeSources: graph.nodes.length,
      stageJoins: graph.stageImports.length, assets: graph.assets, bundles});
  }
  await fs.writeFile(path.join(output, 'build.json'), JSON.stringify({docsEnv: process.env.DOCS_ENV ?? null, results}, null, 2) + '\n');
  return results;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(await buildDocsGraph(), null, 2));
