import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const pages = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const copied = new Set();
function copy(variant, name) {
  const sourceRoot = path.resolve(`upstream/react-spectrum/starters/${variant === 'vanilla' ? 'docs' : 'tailwind'}/src`);
  let file = path.join(sourceRoot, name);
  if (!fs.existsSync(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
  if (!fs.existsSync(file)) throw new Error(`Missing source ${file}`);
  const relative = path.relative(sourceRoot, file);
  const key = `${variant}/${relative}`;
  if (copied.has(key)) return;
  copied.add(key);
  const dest = path.join(pages, 'ListBox/native', key);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  if (fs.existsSync(dest)) throw new Error(`Refusing to overwrite ${dest}`);
  execFileSync('cp', [file, dest]);
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:from\s+|import\s+|@import\s+|url\()['"]?(\.\/[^'"\s;)]+)/g)) {
    copy(variant, path.join(path.dirname(relative), m[1]));
  }
}
for (const family of families) for (const demo of fs.readdirSync(path.join(pages, family)).filter(f => /^Demo\d+\.tsx$/.test(f))) {
  for (const m of fs.readFileSync(path.join(pages, family, demo), 'utf8').matchAll(/(?:from |import )'(vanilla|tailwind)-starter\/([^']+)'/g)) copy(m[1], m[2]);
}
console.log([...copied].sort().join('\n'));
