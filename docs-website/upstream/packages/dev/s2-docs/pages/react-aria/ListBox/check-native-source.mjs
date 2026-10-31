import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as babel from '@babel/core';
const pages = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const source = path.resolve('upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const parse = code => babel.parseSync(code, {filename: 'demo.tsx', configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
function tags(code) {
  const result = {};
  babel.traverse(parse(code), {
    FunctionDeclaration(p) { if (p.node.id?.name === 'mount') p.skip(); },
    JSXOpeningElement(p) {
      const name = p.node.name.type === 'JSXIdentifier' ? p.node.name.name : `${p.node.name.object.name}.${p.node.name.property.name}`;
      result[name] = (result[name] ?? 0) + 1;
    }
  });
  return JSON.stringify(Object.fromEntries(Object.entries(result).sort()));
}
const errors = [];
let examples = 0;
let compiled = 0;
let css = 0;
let hookDocs = 0;
for (const family of families) {
  const original = fs.readFileSync(path.join(source, family + '.mdx'), 'utf8');
  const main = fs.readFileSync(path.join(pages, family + '.mdx'), 'utf8');
  const strip = text => text.replace(/(^[ \t]*```tsx[^\n]*\n)[\s\S]*?^[ \t]*```/gm, 'CODE');
  // Non-code page prose, API tables, shell imports and assets remain source faithful.
  if (strip(original) !== strip(main)) errors.push(`${family}: prose/shell outside TSX blocks differs`);
  const blocks = [...original.matchAll(/^[ \t]*```tsx([^\n]*)\n([\s\S]*?)^[ \t]*```/gm)].filter(m => m[1].split(/\s+/).includes('render'));
  for (let i = 0; i < blocks.length; i++) {
    const filename = path.join(pages, family, `solid-demo${String(i + 1).padStart(2, '0')}.tsx`);
    if (tags(blocks[i][2]) !== tags(fs.readFileSync(filename, 'utf8'))) errors.push(`${family}/${i + 1}: original JSX tag inventory differs`);
    examples++;
  }
  for (const file of fs.readdirSync(path.join(source, family))) {
    if (!file.endsWith('.mdx')) continue;
    if (!fs.readFileSync(path.join(source, family, file)).equals(fs.readFileSync(path.join(pages, family, file)))) errors.push(`${family}/${file}: original hook/testing documentation changed`);
    hookDocs++;
  }
  function visit(dir) {
    for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
      const filename = path.join(dir, item.name);
      if (item.isDirectory()) { visit(filename); continue; }
      if (!filename.endsWith('.tsx')) continue;
      try {
        babel.transformSync(fs.readFileSync(filename, 'utf8'), {filename, configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}, plugins: [['@solidjs/babel-plugin', {generate: 'dom', hydratable: true}]]});
        compiled++;
      } catch (e) { errors.push(`${filename}: ${e.message}`); }
    }
  }
  visit(path.join(pages, family));
}
for (const variant of ['vanilla', 'tailwind']) {
  const dir = path.join(pages, 'ListBox/native', variant);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.css'))) {
    const original = path.resolve(`upstream/react-spectrum/starters/${variant === 'vanilla' ? 'docs' : 'tailwind'}/src`, file);
    if (!fs.readFileSync(original).equals(fs.readFileSync(path.join(dir, file)))) errors.push(`${variant}/${file}: source CSS changed`);
    css++;
  }
}
const result = {sourceExamples: examples, compiledTSX: compiled, exactCSS: css, unchangedHookTestingDocs: hookDocs, errors};
fs.writeFileSync(path.join(pages, 'ListBox/source-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
