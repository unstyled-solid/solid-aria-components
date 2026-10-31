import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {Parcel} from '@parcel/core';
import ts from 'typescript';
import {compile} from '../../distribution/build/compiler.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const owned = path.join(root, 'scripts/docs/macros');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export async function linkMacros() {
  const records = [];
  const linked = path.join(owned, process.env.DOCS_ENV ? 'linked-docs' : 'linked');
  for (const branch of ['dom', 'server']) {
    const inputDir = path.join(owned, 'parcel-input', branch);
    await fs.mkdir(inputDir, {recursive: true});
    const entries = [];
    for (const name of ['Provider', 'Divider']) {
      const source = `packages/@react-spectrum/s2/src/${name}.tsx`;
      const text = await fs.readFile(path.join(root, source), 'utf8');
      const input = path.join(inputDir, `${name}.native.js`);
      await fs.writeFile(input, compile(text, path.join(root, source), branch === 'dom' ? 'dom' : 'ssr').code);
      entries.push(input);
      records.push({branch, source, sourceSha256: hash(text), nativeInput: path.relative(root, input)});
    }
    const parcel = new Parcel({entries, config: path.join(owned, '.parcelrc'),
      mode: 'production', shouldDisableCache: true, shouldAutoInstall: false,
      defaultTargetOptions: {shouldScopeHoist: true, shouldOptimize: false},
      cacheDir: path.join(owned, '.parcel-cache'),
      targets: {native: {context: branch === 'dom' ? 'browser' : 'node', outputFormat: 'esmodule',
        isLibrary: true, includeNodeModules: false, optimize: false, scopeHoist: true,
        sourceMap: true, distDir: path.join(linked, branch)}},
      env: process.env.DOCS_ENV === undefined ? {} : {DOCS_ENV: process.env.DOCS_ENV},
      shouldPatchConsole: false});
    const {bundleGraph} = await parcel.run();
    for (const bundle of bundleGraph.getBundles()) {
      const bytes = await fs.readFile(bundle.filePath);
      const record = {branch, file: path.relative(root, bundle.filePath), type: bundle.type, bytes: bytes.length, sha256: hash(bytes)};
      if (bundle.type === 'js') {
        const code = bytes.toString('utf8');
        const ast = ts.createSourceFile(bundle.filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
        record.imports = ast.statements.filter(ts.isImportDeclaration).map(n => n.moduleSpecifier.text);
        record.exports = ast.statements.filter(ts.isExportDeclaration).flatMap(n =>
          n.exportClause && ts.isNamedExports(n.exportClause) ? n.exportClause.elements.map(e => e.name.text) : []);
        if (/\brequire\(|parcelRequire\w*\(|React\.createElement|react\/jsx-runtime/.test(code)) throw new Error('Non-native ESM output');
        record.unlinkedSourceImports = record.imports.filter(specifier => !['solid-js', '@solidjs/web'].includes(specifier) && !specifier.endsWith('.css'));
      }
      records.push(record);
    }
  }
  for (const branch of ['dom', 'server']) for (const name of ['Provider', 'Divider']) {
    const directory = path.join(linked, 'raw', branch, name);
    const files = await fs.readdir(directory);
    for (const file of files) {
      const bytes = await fs.readFile(path.join(directory, file));
      records.push({branch, file: path.relative(root, path.join(directory, file)), type: 'raw-css', bytes: bytes.length, sha256: hash(bytes)});
    }
  }
  await fs.writeFile(path.join(linked, 'linking.json'), JSON.stringify({docsEnv: process.env.DOCS_ENV ?? null, records}, null, 2) + '\n');
  return records;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(await linkMacros(), null, 2));
