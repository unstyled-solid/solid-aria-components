// Parcel callMacro host adaptation from reference/JSTransformer.2.16.3.js.
// RC13 owns JSX first: Parcel's real Config has no preserve-JSX option.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {transformAsync} from '@parcel/rust';
import {createServer} from 'vite';
import {compile} from '../../distribution/build/compiler.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const hash = value => createHash('sha256').update(value).digest('hex');
const sources = ['packages/@react-spectrum/s2/src/Provider.tsx', 'packages/@react-spectrum/s2/src/Divider.tsx'];

export async function buildMacros(output = path.join(root, 'scripts/docs/macros/output')) {
  const loader = await createServer({root, configFile: false, server: {middlewareMode: true},
    optimizeDeps: {noDiscovery: true, include: []}, appType: 'custom'});
  const results = [];
  const docsEnv = process.env.DOCS_ENV;
  try {
    const {createStyleAssetCollector} = await loader.ssrLoadModule('/packages/@react-spectrum/s2/style/index.ts');
    for (const source of sources) {
      const filename = path.join(root, source), text = await fs.readFile(filename, 'utf8');
      for (const generate of ['dom', 'ssr']) {
        const lowered = compile(text, filename, generate);
        const collector = createStyleAssetCollector();
        const calls = [], invalidations = [];
        const result = await transformAsync({
          filename, code: Buffer.from(lowered.code), module_id: source + ':' + generate, project_root: root,
          inline_fs: false, context: 'browser', env: {...(docsEnv === undefined ? {} : {DOCS_ENV: docsEnv})},
          type: 'js', automatic_jsx_runtime: false, decorators: false, use_define_for_class_fields: true,
          is_development: false, react_refresh: false, source_maps: true, scope_hoist: false,
          source_type: 'Module', supports_module_workers: false, is_library: true, is_esm_output: true,
          trace_bailouts: false, is_swc_helpers: false, standalone: false, inline_constants: false,
          async callMacro(err, specifier, exportName, args, loc) {
            if (err) throw err;
            const resolved = path.resolve(path.dirname(filename), specifier);
            const module = await loader.ssrLoadModule('/' + path.relative(root, resolved).split(path.sep).join('/'));
            if (typeof module[exportName] !== 'function') throw new Error(`${specifier}: missing actual macro ${exportName}`);
            const before = collector.assets.length;
            const context = {
              addAsset: collector.addAsset,
              loc: {filePath: filename, line: loc.line, col: loc.col},
              invalidateOnFileChange: value => invalidations.push({kind: 'file', value}),
              invalidateOnFileCreate: value => invalidations.push({kind: 'create', value}),
              invalidateOnEnvChange: value => invalidations.push({kind: 'env', value}),
              invalidateOnStartup: () => invalidations.push({kind: 'startup'}),
              invalidateOnBuild: () => invalidations.push({kind: 'build'})
            };
            const value = await module[exportName].apply(context, args);
            calls.push({specifier, exportName, loc, assets: collector.assets.length - before});
            return value;
          }
        });
        const errors = (result.diagnostics ?? []).filter(d => d.severity === 'Error' || d.severity === 'SourceError');
        if (errors.length) throw new Error(JSON.stringify(errors, null, 2));
        const code = Buffer.from(result.code).toString('utf8');
        if (/with\s*\{\s*type:\s*["']macro["']/.test(code) || /React\.createElement|react\/jsx-runtime/.test(code)) throw new Error('Unexpanded macros or React JSX output');
        if (!calls.length || !collector.assets.length) throw new Error('No genuine macro calls/assets');
        const branch = generate === 'ssr' ? 'server' : 'dom';
        const base = `${branch}/${path.basename(source, '.tsx')}`;
        await fs.mkdir(path.join(output, branch), {recursive: true});
        await fs.writeFile(path.join(output, base + '.js'), code);
        await fs.writeFile(path.join(output, base + '.js.map'), result.map ?? '{}');
        await fs.writeFile(path.join(output, base + '.native-input.js.map'), JSON.stringify(lowered.map));
        const assets = [];
        for (const [index, asset] of collector.assets.entries()) {
          if (asset.type !== 'css') throw new Error(`Unsupported actual macro asset: ${asset.type}`);
          const file = `${base}.${index}.css`;
          await fs.writeFile(path.join(output, file), asset.content);
          assets.push({file, bytes: Buffer.byteLength(asset.content), sha256: hash(asset.content)});
        }
        results.push({source, sourceSha256: hash(text), branch, output: base + '.js', outputSha256: hash(code),
          outputFormat: 'Parcel intermediate CommonJS; requires Parcel linking/esmodule-helpers, not standalone native ESM',
          nativeInputSha256: hash(lowered.code), calls, assets, invalidations});
      }
    }
    const report = {sourceSha: '3bdef480e85ff135cd485e9f4511b98300127d4b', docsEnv: docsEnv ?? null,
      macroCompiler: '@parcel/rust@2.16.3', nativeCompiler: 'RC13 before Parcel; Parcel receives JS, never TSX',
      referenceSha256: hash(await fs.readFile(path.join(root, 'scripts/docs/macros/reference/JSTransformer.2.16.3.js'))), results};
    await fs.writeFile(path.join(output, 'emission.json'), JSON.stringify(report, null, 2) + '\n');
    return report;
  } finally {
    await loader.close();
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await buildMacros(process.argv[2] ? path.resolve(process.argv[2]) : undefined);
  console.log(JSON.stringify(result.results.map(r => ({source: r.source, branch: r.branch,
    calls: r.calls.length, cssAssets: r.assets.length, cssBytes: r.assets.reduce((sum, a) => sum + a.bytes, 0)})), null, 2));
}
