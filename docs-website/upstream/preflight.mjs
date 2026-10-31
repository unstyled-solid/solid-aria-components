import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import fg from 'fast-glob';
import {compile} from '@mdx-js/mdx';
import {parse} from '@babel/parser';
import {neutralizeDemos} from './packages/dev/s2-docs/demo-policy.mjs';

const root = process.cwd();
const host = path.join(root, 'packages/dev/s2-docs');
const pages = path.join(host, 'pages/react-aria');
const errors = [];
const started = performance.now();
const record = (file, stage, error) => errors.push({file: path.relative(root, file), stage, message: error.message || String(error)});
const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.svg', '/index.ts', '/index.tsx', '/index.js'];
const existing = base => extensions.map(ext => base + ext).find(file => fs.existsSync(file) && fs.statSync(file).isFile());
const repository = path.resolve(root, '../..');
function resolve(specifier, file, native = false) {
  if (specifier.startsWith('docs:') || specifier.startsWith('docs-json:') || specifier.startsWith('url:')) specifier = specifier.slice(specifier.indexOf(':') + 1);
  if (specifier.startsWith('/packages/')) {
    const resolved = existing(path.join(root, specifier));
    if (!resolved) throw new Error(`Missing website asset ${specifier}`);
    return resolved;
  }
  if (specifier.startsWith('.')) {
    let resolved = existing(path.resolve(path.dirname(file), specifier));
    if (!resolved && /\/solid-example-\d+\.tsx$/.test(file) && fs.existsSync(path.dirname(file) + '.mdx')) resolved = existing(path.resolve(path.dirname(file), '..', specifier));
    if (!resolved) throw new Error(`Missing local import ${specifier}`);
    return resolved;
  }
  if (specifier.startsWith('solid-aria-components')) {
    const name = specifier.slice('solid-aria-components'.length).replace(/^\//, '') || 'index';
    const resolved = existing(path.join(repository, 'packages/react-aria-components/exports', name));
    if (!resolved) throw new Error(`Missing native export ${specifier}`);
    return resolved;
  }
  if (native && /^(react-aria|react-stately)(?:\/|$)/.test(specifier)) {
    const [name, ...parts] = specifier.split('/');
    const privatePath = parts[0] === 'private';
    const subpath = privatePath ? parts.slice(1).join('/') : parts.join('/') || 'index';
    const resolved = existing(path.join(repository, 'packages', name, privatePath ? 'src' : 'exports', subpath));
    if (!resolved) throw new Error(`Missing native library import ${specifier}`);
    return resolved;
  }
  if (native && /^@react-(aria|stately|types)\//.test(specifier)) {
    const parts = specifier.split('/');
    const nativePackage = path.join(repository, 'packages', parts.slice(0, 2).join('/'));
    if (!fs.existsSync(path.join(nativePackage, 'package.json'))) throw new Error(`Retired React package import ${specifier}; use the existing native react-aria/react-stately export`);
  }
  if (specifier.startsWith('@react-spectrum/s2-docs/')) {
    const resolved = existing(path.join(host, specifier.slice('@react-spectrum/s2-docs/'.length)));
    if (!resolved) throw new Error(`Missing shell import ${specifier}`);
    return resolved;
  }
  // These are real Parcel aliases/pipelines, not Node resolution.
  if (/^(?:tailwind-starter|vanilla-starter|hooks-starter)(?:\/|$)/.test(specifier)) return;
  const parts = specifier.split('/');
  const count = specifier.startsWith('@') ? 2 : 1;
  const packageName = parts.slice(0, count).join('/');
  const copied = path.join(root, 'packages', packageName);
  const manifest = path.join(copied, 'package.json');
  if (fs.existsSync(manifest)) {
    const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    const subpath = parts.slice(count).join('/');
    const resolved = subpath ? existing(path.join(copied, subpath)) || existing(path.join(copied, 'exports', subpath)) : existing(path.join(copied, pkg.source || 'src/index.ts'));
    if (resolved) return resolved;
  }
  createRequire(file).resolve(specifier);
}
const pageFiles = await fg('packages/dev/s2-docs/pages/react-aria/*.mdx', {absolute: true});
for (const file of pageFiles) {
  try {
    const source = fs.readFileSync(file, 'utf8');
    const neutral = neutralizeDemos(source, file);
    const output = String(await compile({value: neutral, path: file}, {jsx: true}));
    const ast = parse(output, {sourceType: 'module', plugins: ['jsx']});
    for (const node of ast.program.body) if (node.type === 'ImportDeclaration') {
      try { resolve(node.source.value, file); } catch (error) { record(file, 'page-import', error); }
    }
    for (const match of source.matchAll(/\b(?:solid|nativeModule)=["']([^"']+)["']/g)) {
      const module = match[1].startsWith('.') ? path.resolve(path.dirname(file), match[1]) : path.resolve(pages, match[1]);
      if (!existing(module)) record(file, 'island-path', new Error(`Missing island ${match[1]}`));
    }
  } catch (error) { record(file, 'mdx', error); }
}
const modules = await fg(['packages/dev/s2-docs/pages/react-aria/**/solid-*.tsx', 'packages/dev/s2-docs/pages/react-aria/**/NativeDemo.tsx'], {absolute: true});
const nativeClosure = new Set(modules);
const stylesheets = new Set();
for (const file of nativeClosure) {
  try {
    const ast = parse(fs.readFileSync(file, 'utf8'), {sourceType: 'module', plugins: ['typescript', 'jsx']});
    for (const node of ast.program.body) if (node.type === 'ImportDeclaration' && node.importKind !== 'type') {
      if (node.source.value === 'react' || /^react-dom(?:\/|$)/.test(node.source.value)) record(file, 'native-react-import', new Error(`Native demo imports React runtime: ${node.source.value}`));
      try {
        const resolved = resolve(node.source.value, file, true);
        if (resolved?.startsWith(pages + path.sep) && /\.[jt]sx?$/.test(resolved)) nativeClosure.add(resolved);
        if (resolved?.endsWith('.css')) stylesheets.add(resolved);
      } catch (error) { record(file, 'native-import', error); }
    }
    const visit = node => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'CallExpression' && node.callee?.type === 'Identifier' && ['queueMicrotask', 'flushSync'].includes(node.callee.name)) record(file, 'native-scheduling', new Error(`Manual ${node.callee.name} workaround at line ${node.loc.start.line}; use native state/DOM lifecycle`));
      for (const [key, value] of Object.entries(node)) {
        if (['loc', 'start', 'end', 'comments', 'leadingComments', 'trailingComments', 'extra'].includes(key)) continue;
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === 'object') visit(value);
      }
    };
    visit(ast.program);
  } catch (error) { record(file, 'native-syntax', error); }
}
for (const file of stylesheets) {
  const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const imports = [...css.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/g)].map(match => match[1]);
  const assets = [...css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)].map(match => match[1]);
  for (const specifier of new Set([...imports, ...assets])) {
    if (/^(?:data:|https?:|#|\/)/.test(specifier)) continue;
    try {
      const clean = specifier.split(/[?#]/)[0];
      const resolved = imports.includes(specifier) && !clean.startsWith('.') ? resolve(clean, file) : resolve(clean.startsWith('.') ? clean : './' + clean, file);
      if (resolved?.endsWith('.css')) stylesheets.add(resolved);
    } catch (error) { record(file, 'stylesheet-import', error); }
  }
}
// Execute the actual copied packager's initial worker context, including the
// cached-config path where loadConfig hasn't run in this worker.
try {
  const packagerFile = path.join(host, 'DocsStaticPackager.cjs');
  const exports = {};
  const context = vm.compileFunction(fs.readFileSync(packagerFile, 'utf8') + '\nreturn context;', ['exports', 'require', 'module', '__filename', '__dirname'])(exports, createRequire(packagerFile), {exports}, packagerFile, path.dirname(packagerFile));
  vm.runInContext('new TextEncoder().encode("docs"); new TextDecoder(); new ReadableStream();', context);
  const require = createRequire(import.meta.url);
  const serverFile = path.join(path.dirname(require.resolve('react-server-dom-parcel/package.json')), 'cjs/react-server-dom-parcel-server.edge.development.js');
  const module = {exports: {}};
  vm.compileFunction(fs.readFileSync(serverFile, 'utf8'), ['exports', 'require', 'module'], {filename: serverFile, parsingContext: context})(module.exports, createRequire(serverFile), module);
} catch (error) { record(host, 'ssr-vm', error); }
const report = {pages: pageFiles.length, nativeModules: modules.length, nativeSourceClosure: nativeClosure.size, stylesheets: stylesheets.size, seconds: Number(((performance.now() - started) / 1000).toFixed(2)), errors};
fs.writeFileSync('../preflight-errors.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({...report, errors: errors.slice(0, 30), totalErrors: errors.length, report: '../preflight-errors.json'}, null, 2));
process.exitCode = errors.length ? 1 : 0;
