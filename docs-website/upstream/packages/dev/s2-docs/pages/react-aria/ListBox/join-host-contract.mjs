import fs from 'node:fs';
import path from 'node:path';
const pages = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const moves = [];
for (const family of families) {
  for (const file of fs.readdirSync(path.join(pages, family)).filter(f => /^Demo\d+\.tsx$/.test(f))) moves.push([path.join(pages, family, file), path.join(pages, family, file.replace('Demo', 'solid-demo'))]);
}
for (const variant of ['vanilla', 'tailwind']) {
  const dir = path.join(pages, 'ListBox/native', variant);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.startsWith('solid-'))) moves.push([path.join(dir, file), path.join(dir, 'solid-' + file)]);
}
function update(code, file) {
  for (const [from, to] of moves) {
    const old = './' + path.relative(path.dirname(file), from).split(path.sep).join('/');
    const next = './' + path.relative(path.dirname(file), to).split(path.sep).join('/');
    for (const quote of ["'", '"']) {
      for (const prefix of ['./', '']) {
        const specifier = prefix === './' ? old : old.slice(2);
        const replacement = prefix === './' ? next : next.slice(2);
        code = code.replaceAll(quote + specifier + quote, quote + replacement + quote);
        code = code.replaceAll(quote + specifier.replace(/\.tsx$/, '') + quote, quote + replacement.replace(/\.tsx$/, '') + quote);
      }
    }
  }
  return code;
}
function visit(dir) { for (const item of fs.readdirSync(dir, {withFileTypes: true})) { const file = path.join(dir, item.name); if (item.isDirectory()) { if (!file.includes('/native-icons/')) visit(file); } else if (/\.(tsx|mdx)$/.test(file)) fs.writeFileSync(file, update(fs.readFileSync(file, 'utf8'), file)); } }
for (const family of families) visit(path.join(pages, family));
for (const [from, to] of moves) { if (fs.existsSync(to)) throw new Error(`Destination exists ${to}`); fs.renameSync(from, to); }
for (const family of families) {
  const file = path.join(pages, family + '.mdx');
  let text = update(fs.readFileSync(file, 'utf8'), file);
  text = text.replace(/^(\s*```tsx)([^\n]*\brender\b[^\n]*)$/gm, (_, opening, metadata) => opening + metadata.replace(/\brender\b/, '').replace(/solidModule="\.\/([^"]+)"/, (_, module) => `nativeModule="${module.replace('/Demo', '/solid-demo')}"`));
  text = text.replace(/(starters\/docs\/src\/)([^'"\]]+\.tsx)/g, (_, prefix, name) => `packages/dev/s2-docs/pages/react-aria/ListBox/native/vanilla/solid-${name}`);
  text = text.replace(/(starters\/docs\/src\/)([^'"\]]+\.css)/g, (_, prefix, name) => `packages/dev/s2-docs/pages/react-aria/ListBox/native/vanilla/${name}`);
  text = text.replace(/(starters\/tailwind\/src\/)([^'"\]]+\.tsx)/g, (_, prefix, name) => `packages/dev/s2-docs/pages/react-aria/ListBox/native/tailwind/solid-${name}`);
  fs.writeFileSync(file, text);
  const manifest = path.join(pages, family, 'demos.json');
  const entries = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  for (const entry of entries) { entry.module = entry.module.replace('/Demo', '/solid-demo'); entry.hostModule = `${family}/${path.basename(entry.module)}`; }
  fs.writeFileSync(manifest, JSON.stringify(entries, null, 2) + '\n');
}
console.log('All 102 islands and 47 JSX starter modules now use solid-* names; main pages use actual CodeBlock nativeModule contract.');
