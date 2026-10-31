// Source-copy/adaptation for this lane's eight MAIN component pages only.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {nativePatterns} from './adapt-native.mjs';
const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const here = path.dirname(new URL(import.meta.url).pathname);
const pages = path.dirname(here);
const originals = path.resolve(here, '../../../../../../../../upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria');
const names = ['ProgressBar','Meter','Separator','Breadcrumbs','Tabs','Disclosure','RadioGroup','CheckboxGroup'];
const panels = (modulePath, variant, component) => JSON.stringify([
  `docs-website/upstream/packages/dev/s2-docs/pages/react-aria/${modulePath}`,
  `docs-website/upstream/packages/dev/s2-docs/pages/react-aria/Tabs/${variant}/${component}.tsx`,
  ...(variant === 'vanilla' && fs.existsSync(path.join(here, variant, component + '.css')) ? [`docs-website/upstream/packages/dev/s2-docs/pages/react-aria/Tabs/${variant}/${component}.css`] : [])
]);
function adapt(code, page) {
  code = code.replace(/^\s*["']use client["'];\n/gm, '')
    .replace(/import \{useState\} from 'react';/g, "import {createSignal} from 'solid-js';")
    .replace(/\buseState\b/g, 'createSignal')
    .replace(/'react-aria-components\/[^']+'/g, "'solid-aria-components'")
    .replace(/'(vanilla|tailwind)-starter\/([^']+)'/g, (_, variant, component) => `'${page === 'Tabs' ? './' : '../Tabs/'}${variant}/${component}'`)
    .replace(/'lucide-react'/g, `'${page === 'Tabs' ? './' : '../Tabs/'}icons'`)
    .replace(/import (Home|Folder|Search|Settings) from '@react-spectrum\/s2\/illustrations\/[^']+';/g, (_, name) => `import {${name}} from '${page === 'Tabs' ? './' : '../Tabs/'}illustrations';`)
    .replace(/\/\* PROPS \*\//g, ' {...props}');
  if (!/function Example\(/.test(code)) {
    const imports = [];
    code = code.replace(/^import[\s\S]*?;\n/gm, line => {imports.push(line); return '';});
    code = imports.join('') + '\nfunction Example(props: Record<string, unknown>) {return (' + code.trim() + ');}\n';
  }
  // Controls inject into the same component, never into a replacement demo.
  code = code.replace('function Example()', 'function Example(props: Record<string, unknown>)');
  if (page === 'RadioGroup') code = code.replace('<RadioGroup {...props}>', '<RadioGroup label="Shipping options" {...props}>');
  if (page === 'CheckboxGroup') code = code.replace('<CheckboxGroup {...props}>', '<CheckboxGroup label="Email Notification Preferences" {...props}>');
  return babel.transformSync(code, {filename:'example.tsx',configFile:false,babelrc:false,parserOpts:{plugins:['typescript','jsx']},plugins:[nativePatterns()],generatorOpts:{comments:true}}).code;
}
const manifest = [];
for (const page of names) {
  let mdx = fs.readFileSync(path.join(originals,page + '.mdx'),'utf8');
  let index = 0;
  const rows = [];
  mdx = mdx.replace(/(^[ \t]*)```tsx([^\n]*\brender\b[^\n]*)\n([\s\S]*?)\n\1```/gm, (_, indent, meta, body) => {
    const name = `solid-example-${++index}.tsx`;
    const code = adapt(body.replace(new RegExp('^' + indent,'gm'),''), page);
    const modulePath = `${page}/${name}`;
    fs.writeFileSync(path.join(pages,modulePath), "import {render} from '@solidjs/web';\nimport {createSignal as createIslandProps} from 'solid-js';\n" + code + `\nexport const title = ${JSON.stringify(page + ' source example ' + index)};\nexport function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {\n  const [props, update] = createIslandProps(initialProps);\n  const dispose = render(() => <Example {...props()} />, element);\n  return Object.assign(dispose, {update});\n}\n`);
    rows.push(modulePath);
    // Keep upstream example metadata and controls; expose exact native display/mount correspondence.
    const variant = /type="tailwind"/.test(meta) ? 'tailwind' : 'vanilla';
    meta = meta.replace(/files=\{\[[^\]]*\]\}/g, `files={${panels(modulePath,variant,page)}}`);
    meta = meta.replace(/\brender\b/, '') + ` nativeModule="${modulePath}" solid="${modulePath}"`;
    const display = code.replace(/from '(?:\.\.\/Tabs\/|\.\/)(vanilla\/|tailwind\/|icons'|illustrations')/g, (_, specifier) => "from './Tabs/" + specifier);
    return indent + '```tsx' + meta + '\n' + display.split('\n').map(line => indent + line).join('\n') + '\n' + indent + '```';
  });
  // VisualExamples retain their original controls/doc descriptors. Infra consumes the module metadata.
  const visuals = [];
  mdx = mdx.replace(/<VisualExample\b([\s\S]*?)\/>/g, (_, attrs) => {
    const component = /component=\{([^}]+)\}/.exec(attrs)?.[1];
    const variant = component?.startsWith('Tailwind') ? 'tailwind' : 'vanilla';
    const exportName = component?.replace(/^(Vanilla|Tailwind)/,'');
    const initial = /initialProps=\{(\{[\s\S]*?\})\}/.exec(attrs)?.[1] ?? '{}';
    const name = `solid-visual-${visuals.length+1}.tsx`;
    const local = page === 'Tabs' ? './' : '../Tabs/';
    const modulePath = `${page}/${name}`;
    fs.writeFileSync(path.join(pages,modulePath), `import {render} from '@solidjs/web';\nimport {createSignal} from 'solid-js';\nimport {${exportName}} from '${local}${variant}/${exportName}';\nexport const title = '${page} ${variant} visual example';\nexport function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {\n  const [props, update] = createSignal(initialProps);\n  const dispose = render(() => <${exportName} {...${initial}} {...props()} />, element);\n  return Object.assign(dispose, {update});\n}\n`);
    visuals.push(modulePath);
    attrs = attrs.replace(/files=\{\[[^\]]*\]\}/g, `files={${panels(modulePath,variant,exportName)}}`);
    attrs = attrs.replace(/\s*component=\{[^}]+\}/, '');
    return '<VisualExample' + attrs + ` importSource="./Tabs/${variant}/${exportName}" solid="${modulePath}" />`;
  });
  manifest.push({page,modules:[...rows,...visuals]});
  mdx = mdx.replace(/^import \{[^\n]*\} from '(?:vanilla|tailwind)-starter\/[^']+';\n/gm, '');
  fs.writeFileSync(path.join(pages,page+'.mdx'), mdx);
  for (const name of fs.readdirSync(path.join(pages,page))) {
    if (!name.startsWith('use') || !name.endsWith('.mdx')) continue;
    const hookPath = path.join(pages,page,name);
    let hook = fs.readFileSync(hookPath,'utf8');
    hook = hook.replace(/^```tsx(?: render)?([^\n]*files=\{[^\n]*)/gm, (_, attrs) => '```tsx' + attrs.replace(/ (?:solidModule|nativeModule|solid)="[^"]*"/g,'') + ` nativeModule="${page}/NativeDemo.tsx"`);
    fs.writeFileSync(hookPath,hook);
  }
}
fs.writeFileSync(path.join(here,'native-examples.json'),JSON.stringify(manifest,null,2)+'\n');
