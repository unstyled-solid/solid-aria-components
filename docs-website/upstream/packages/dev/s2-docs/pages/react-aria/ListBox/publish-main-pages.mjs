import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
for (const family of 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ')) {
  const dest = path.join(root, family + '.mdx');
  // The component page was terminal-copied before adaptation; promotion also uses cp.
  execFileSync('cp', [path.join(root, family, 'page.mdx'), dest]);
  let text = fs.readFileSync(dest, 'utf8');
  text = text.replace(/(['"])\.\.\/\.\.\/\.\.\/(src|tailwind)\//g, '$1../../$2/');
  text = text.replace(/(['"])\.\.\/ListBox\/native\//g, '$1./ListBox/native/');
  if (family === 'ListBox') text = text.replace(/(['"])\.\/native\//g, '$1./ListBox/native/');
  text = text.replace(/(['"])\.\.\/([^.'"][^'"]*)\1/g, '$1./$2$1');
  let index = 0;
  text = text.replace(/^([ \t]*```tsx)([^\n]*\brender\b[^\n]*)$/gm, (_, opening, header) => `${opening}${header} solidModule="./${family}/Demo${String(++index).padStart(2, '0')}.tsx"`);
  // Native components take refs directly rather than requiring a React forwardRef wrapper.
  text = text.replace(/const CustomTrigger = React\.forwardRef\(\(props, ref\) => \(\n\s*<button \{\.\.\.props\} ref=\{ref\} \/>\n\)\);/g, 'function CustomTrigger(props) {\n  return <button {...props} />;\n}');
  fs.writeFileSync(dest, text);
  console.log(`${family}: ${index} mapped native render examples`);
}
