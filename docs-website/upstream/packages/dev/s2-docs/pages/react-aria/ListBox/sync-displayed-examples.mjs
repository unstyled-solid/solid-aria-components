import fs from 'node:fs';
import path from 'node:path';
import * as babel from '@babel/core';
const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
for (const family of 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ')) {
  const main = path.join(root, family + '.mdx');
  let index = 0;
  const page = fs.readFileSync(main, 'utf8').replace(/(^[ \t]*```tsx[^\n]*\bnativeModule=[^\n]*\n)([\s\S]*?)(^[ \t]*```)/gm, (_, opening, old, closing) => {
    let code = fs.readFileSync(path.join(root, family, `solid-demo${String(++index).padStart(2, '0')}.tsx`), 'utf8');
    const ast = babel.parseSync(code, {filename: 'demo.tsx', configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
    const title = ast.program.body.find(n => n.type === 'ExportNamedDeclaration' && n.declaration?.type === 'VariableDeclaration' && n.declaration.declarations.some(d => d.id.name === 'title'));
    code = code.slice(0, title.start);
    const def = ast.program.body.find(n => n.type === 'ExportDefaultDeclaration');
    if (def.declaration.type === 'FunctionDeclaration' && def.declaration.id.name === 'Demo') {
      const value = def.declaration.body.body.find(n => n.type === 'ReturnStatement').argument;
      code = code.slice(0, def.start) + code.slice(value.start, value.end) + '\n' + code.slice(def.end);
    } else if (def.declaration.type === 'Identifier') code = code.slice(0, def.start) + code.slice(def.end);
    code = code.replace("import {render} from '@solidjs/web';\n", '');
    code = code.replace(/^\/\/ Extracted from .*\n/m, '');
    code = code.replace(/(['"])\.\.\/ListBox\/native\//g, '$1./ListBox/native/');
    if (family === 'ListBox') code = code.replace(/(['"])\.\/native\//g, '$1./ListBox/native/');
    code = code.replace(/(['"])\.\.\/([^.'"][^'"]*)\1/g, '$1./$2$1');
    return opening + code.trim() + '\n' + closing;
  });
  fs.writeFileSync(main, page);
}
console.log('Displayed main-page examples synchronized to native module bodies; source prose and fence metadata retained.');
