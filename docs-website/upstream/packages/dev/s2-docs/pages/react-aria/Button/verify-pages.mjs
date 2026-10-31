import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../../../../../../../../', import.meta.url));
const pages = fileURLToPath(new URL('../', import.meta.url));
const copied = path.join(root, 'docs-website/upstream');
const canonical = path.join(root, 'upstream/react-spectrum');
const names = ['Button', 'Link', 'ToggleButton', 'Switch', 'Checkbox', 'TextField', 'SearchField', 'NumberField'];
function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}
function prose(source) {
  return source.replace(/```[\s\S]*?```/g, '').replace(/<VisualExample[\s\S]*?\/>/g, '').trim();
}
let mainExamples = 0;
let hookExamples = 0;
let cssFiles = 0;
for (const name of names) {
  const page = path.join(pages, `${name}.mdx`);
  const text = fs.readFileSync(page, 'utf8');
  const original = fs.readFileSync(path.join(canonical, 'packages/dev/s2-docs/pages/react-aria', `${name}.mdx`), 'utf8');
  assert.equal(prose(text), prose(original), `${name}: prose/layout/API changed`);
  const expected = (original.match(/<VisualExample\b/g) ?? []).length + (original.match(/```tsx render\b/g) ?? []).length;
  const refs = [...text.matchAll(/solid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(refs.length, expected, `${name}: missing or duplicate island annotation`);
  for (const module of refs) assert(fs.existsSync(path.resolve(pages, module)), `Missing ${module}`);
  mainExamples += refs.length;
  for (const file of walk(path.join(pages, name))) {
    if (file.endsWith('.css')) {
      const kind = file.includes('/vanilla/') ? 'docs' : 'hooks';
      assert.equal(fs.readFileSync(file, 'utf8'), fs.readFileSync(path.join(canonical, 'starters', kind, 'src', path.basename(file)), 'utf8'), `CSS fidelity: ${file}`);
      cssFiles++;
    }
    if (file.endsWith('.mdx')) {
      const source = fs.readFileSync(file, 'utf8');
      const refs = [...source.matchAll(/solid="([^"]+)"/g)].map(match => match[1]);
      for (const module of refs) assert(fs.existsSync(path.resolve(path.dirname(file), module)), `Missing ${module}`);
      hookExamples += refs.length;
    }
    if (file.endsWith('.mdx') || file === page) {
      const source = fs.readFileSync(file, 'utf8');
      for (const match of source.matchAll(/"(packages\/dev\/s2-docs\/pages\/react-aria\/[^"\n]+\.(?:tsx|css))"/g)) assert(fs.existsSync(path.join(copied, match[1])), `Missing source drawer file ${match[1]}`);
    }
  }
  for (const match of text.matchAll(/"(packages\/dev\/s2-docs\/pages\/react-aria\/[^"\n]+\.(?:tsx|css))"/g)) assert(fs.existsSync(path.join(copied, match[1])), `Missing main source drawer file ${match[1]}`);
}
console.log(JSON.stringify({mainExamples, hookExamples, cssFiles, proseAndLayout: 'identical excluding adapted live-code/VisualExample declarations', islandReferences: 'all resolve', sourceDrawerReferences: 'all resolve'}));
