import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const transformer = require('./DocsTransformer.cjs');
const packager = require('./DocsPackager.cjs');

// Filesystem transport for the copied Parcel extractor/packager. TypeScript's
// real declaration emit supplies inferred native signatures, never ambient substitutes.
export async function extractAPI(entry, {config = 'tsconfig.wave.json'} = {}) {
  entry = path.resolve(entry);
  const configFile = ts.readConfigFile(path.resolve(config), ts.sys.readFile);
  if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(path.resolve(config)));
  const options = {...parsed.options, noEmit: false, declaration: true, emitDeclarationOnly: true, noEmitOnError: false, declarationMap: false};
  const program = ts.createProgram([entry], options);
  const declarations = new Map();
  const emit = program.emit(undefined, (_name, text, _bom, _err, sources) => {
    for (const source of sources ?? []) declarations.set(path.resolve(source.fileName), text);
  });
  if (emit.emitSkipped) throw new Error('Native declaration emit skipped');
  const assets = new Map();
  const dependencies = new Map();
  const unresolvedReferences = new Map();
  const resolvedBindings = new Map();
  async function load(file) {
    file = path.resolve(file);
    if (assets.has(file)) return assets.get(file);
    if (!declarations.has(file) && !file.endsWith('.d.ts') && /\.[cm]?tsx?$/.test(file)) {
      // Declaration imports can introduce source modules not visited by the
      // initial program. Resolve their inferred types with a real native emit.
      const dependencyProgram = ts.createProgram([file], options);
      const dependencyEmit = dependencyProgram.emit(undefined, (_name, text, _bom, _err, sources) => {
        for (const source of sources ?? []) declarations.set(path.resolve(source.fileName), text);
      });
      if (dependencyEmit.emitSkipped) throw new Error(`Native declaration emit skipped: ${file}`);
      emit.diagnostics.push(...dependencyEmit.diagnostics);
    }
    const symbols = new Map();
    symbols.ensure = () => {};
    const deps = [];
    const reexports = new Map();
    const asset = {id: file, filePath: file, type: 'ts', symbols, isDeclaration: declarations.has(file) || file.endsWith('.d.ts'),
      reexports,
      recordReexport(exported, specifier, imported) {reexports.set(exported, {specifier, imported});},
      getCode: () => declarations.has(file) ? declarations.get(file) : fs.readFile(file, 'utf8'),
      addDependency(dep) {
        const old = deps.find(d => d.specifier === dep.specifier);
        if (old) for (const [name, symbol] of dep.symbols) old.symbols.set(name, symbol);
        else deps.push(dep);
      },
      setBuffer(buffer) {this.buffer = buffer;},
      async getBuffer() {return this.buffer;}
    };
    assets.set(file, asset);
    dependencies.set(asset, deps);
    await transformer.transform({asset, options});
    for (const dep of deps) {
      const resolved = ts.resolveModuleName(dep.specifier, file, options, ts.sys).resolvedModule;
      if (!resolved) throw new Error(`Unresolved API dependency ${dep.specifier} from ${file}`);
      dep.asset = await load(resolved.resolvedFileName);
    }
    return asset;
  }
  const root = await load(entry);
  const bundle = {traverseAssets(fn) {for (const asset of assets.values()) fn(asset);}, getEntryAssets() {return [root];}};
  const bundleGraph = {
    getAssetById(id) {return assets.get(id);},
    beginReferenceResolutionPass() {unresolvedReferences.clear();},
    reportResolvedReference(asset, reference, target) {
      const record = {file: asset.filePath, specifier: reference.specifier, imported: reference.imported, target: target.filePath};
      resolvedBindings.set(JSON.stringify(record), record);
    },
    reportUnresolvedReference(asset, reference) {
      const record = {file: asset.filePath, specifier: reference.specifier, imported: reference.imported};
      unresolvedReferences.set(JSON.stringify(record), record);
    },
    getDependencies(asset) {return dependencies.get(asset);},
    getResolvedAsset(dep) {return dep?.asset;},
    isDependencySkipped() {return false;},
    getSymbolResolution(asset, exported) {
      const reexport = asset.reexports.get(exported);
      if (reexport) {
        const dep = dependencies.get(asset).find(d => d.specifier === reexport.specifier);
        return {asset: dep.asset, exportSymbol: reexport.imported};
      }
      const local = asset.symbols.get(exported);
      for (const dep of dependencies.get(asset)) {
        const symbol = dep.symbols.get(exported);
        if (symbol && symbol.local === local) {
          return {asset: dep.asset, exportSymbol: exported};
        }
        for (const [imported, info] of dep.symbols) {
          if (info.local === local) return {asset: dep.asset, exportSymbol: imported};
        }
      }
      return {asset, exportSymbol: exported};
    }
  };
  await packager.loadBundleConfig();
  const result = JSON.parse((await packager.package({bundle, bundleGraph, options})).contents);
  const missingLinks = [];
  const visit = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (obj.type === 'link' && !result.links[obj.id]) missingLinks.push(obj.id);
    for (const value of Object.values(obj)) visit(value);
  };
  visit(result);
  return {...result, diagnostics: {assets: assets.size, missingLinks: [...new Set(missingLinks)], unresolvedReferences: [...unresolvedReferences.values()], resolvedBindings: [...resolvedBindings.values()], declarationDiagnostics: emit.diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'))}};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const entry = process.argv[2];
  if (!entry) throw new Error('Usage: node scripts/docs/api/index.mjs <native source entry>');
  console.log(JSON.stringify(await extractAPI(entry), null, 2));
}
