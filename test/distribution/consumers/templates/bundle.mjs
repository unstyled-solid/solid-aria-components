// Adapted reference Vite/compiler execution; stock peers, no source aliases.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {build} from 'vite';
import solid from '@solidjs/vite-plugin';
import {staticRuntimeSource} from './runtime-accounting.mjs';
const input = JSON.parse(await fs.readFile('input.json', 'utf8'));
await fs.writeFile('all-runtime.mjs', staticRuntimeSource(input));
await build({configFile: false, plugins: [solid({compiler: 'babel', solid: {hydratable: true}, ssr: true})], build: {ssr: 'server.tsx', outDir: '.', emptyOutDir: false, rollupOptions: {external: id => [input.name, 'solid-js', '@solidjs/web'].some(name => id === name || id.startsWith(`${name}/`)), output: {entryFileNames: 'server.js'}}}});

// Reference optimized graph accounting, using the already qualified fixture.
// Side-effect modules may remain in unused imports; no zero-retention demand.
const original = await fs.readFile('app.tsx', 'utf8');
const body = original.slice(original.indexOf('const RequestLabel'));
assert(body.startsWith('const RequestLabel'));
const coreImport = original.split('\n').find(line => line.includes("from 'solid-js'"));
const rootImports = `import {ProgressBar, Meter, Label} from ${JSON.stringify(input.name)};`;
const subImports = ['ProgressBar', 'Meter', 'Label'].map(name => `import {${name}} from ${JSON.stringify(`${input.name}/${name}`)};`).join('\n');
const fixtures = {
  empty: 'export const packedEmpty = true;',
  unused: `${rootImports}\nexport const packedEmpty = true;`,
  root: `${coreImport}\n${rootImports}\n${body}`,
  subpath: `${coreImport}\n${subImports}\n${body}`
};
const reports = [];
for (const [label,source] of Object.entries(fixtures)) {
  const file = `optimized-${label}.tsx`;
  await fs.writeFile(file, source);
  const report = {label, modules: [], bytes: 0, gzipBytes: 0};
  await build({configFile:false, resolve:{conditions:['browser']}, plugins:[solid({compiler:'babel',solid:{hydratable:true}}),{
    name:'packed-rendered-module-accounting',
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) if (output.type === 'chunk') {
        report.bytes += Buffer.byteLength(output.code); report.gzipBytes += gzipSync(output.code).length;
        for (const [id,metadata] of Object.entries(output.modules)) report.modules.push({id,renderedLength:metadata.renderedLength});
      }
    }
  }], build:{outDir:`bundles/shake-${label}`,emptyOutDir:true,minify:true,sourcemap:true,lib:{entry:file,formats:['es'],fileName:()=> 'app.js'},rollupOptions:{external:id=>['solid-js','@solidjs/web'].some(name=>id===name||id.startsWith(`${name}/`))}}});
  // Rolldown scope-hoists statements across module attribution regions. Keep
  // the actual emitted mappings alongside renderedLength rather than treating
  // a zero-length attribution as proof that an executed component disappeared.
  const map = JSON.parse(await fs.readFile(`bundles/shake-${label}/app.js.map`, 'utf8'));
  report.mappedSources = map.sources;
  assert(map.mappings.length > 0 || label === 'empty', 'Missing emitted source attribution');
  await fs.writeFile(`optimized-graph-${label}.json`,JSON.stringify(report,null,2));
  const retained = report.modules.filter(module => module.renderedLength > 0);
  for (const module of retained) {
    assert(typeof module.renderedLength === 'number');
    assert(!/node_modules\/(?:react|react-dom|@types\/react)(?:\/|$)/.test(module.id), 'React optimized bundle leakage');
    if (path.isAbsolute(module.id)) assert(module.id.startsWith(`${process.cwd()}/`), 'Optimized consumer escaped isolation');
  }
  for (const peer of ['solid-js','@solidjs/web','@solidjs/signals']) {
    const roots = new Set(retained.filter(m=>m.id.includes(`/node_modules/${peer}/`)).map(m=>m.id.split(`/node_modules/${peer}/`)[0]));
    assert(roots.size<=1, `Duplicate optimized stock runtime ${peer}`);
  }
  if (['root','subpath'].includes(label)) for (const component of ['ProgressBar','Meter','Label']) assert(report.mappedSources.some(source=>new RegExp(`/react-aria-components/src/${component}\\.(?:js|tsx)$`).test(source)), `${label}: actual ${component} eliminated`);
  reports.push(report);
  if (['root','subpath'].includes(label)) {
    await build({configFile:false,resolve:{conditions:['node']},plugins:[solid({compiler:'babel',ssr:true,solid:{hydratable:true}})],build:{ssr:file,outDir:`bundles/ssr-${label}`,emptyOutDir:true,minify:true,rollupOptions:{external:id=>['solid-js','@solidjs/web'].some(name=>id===name||id.startsWith(`${name}/`)),output:{entryFileNames:'app.js'}}}});
    const server = (await fs.readFile('server.tsx','utf8')).replace("from './app.js'", `from './bundles/ssr-${label}/app.js'`).replace("'ssr-result.json'", `'ssr-optimized-${label}.json'`);
    await fs.writeFile(`server-optimized-${label}.tsx`,server);
    await build({configFile:false,plugins:[solid({compiler:'babel',ssr:true,solid:{hydratable:true}})],build:{ssr:`server-optimized-${label}.tsx`,outDir:'.',emptyOutDir:false,minify:true,rollupOptions:{external:id=>['solid-js','@solidjs/web'].some(name=>id===name||id.startsWith(`${name}/`)),output:{entryFileNames:`server-optimized-${label}.js`}}}});
  }
}
const graph = label => reports.find(r=>r.label===label).modules.filter(m=>m.renderedLength>0&&m.id.includes(`/node_modules/${input.name}/`)).map(m=>path.relative(process.cwd(),m.id)).sort();
const rootGraph = graph('root'), subpathGraph = graph('subpath');
const comparison = {root:rootGraph,subpath:subpathGraph,rootOnly:rootGraph.filter(id=>!subpathGraph.includes(id)),subpathOnly:subpathGraph.filter(id=>!rootGraph.includes(id)),unused:graph('unused'),empty:graph('empty')};
await fs.writeFile('optimized-graphs.json', JSON.stringify({reports,comparison,policy:'preserve audited registrations; no zero-unused threshold'},null,2));
