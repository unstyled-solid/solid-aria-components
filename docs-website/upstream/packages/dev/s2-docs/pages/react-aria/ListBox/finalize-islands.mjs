import fs from 'node:fs';
import path from 'node:path';
import * as babel from '@babel/core';
const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const parse = code => babel.parseSync(code, {filename: 'demo.tsx', configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
function finalize(code, family) {
  code = code.replace(/from 'react-aria-components\//g, "from 'solid-aria-components/");
  code = code.replace(/((?:from |import )')(vanilla|tailwind)-starter\/([^']+)'/g, (_, prefix, variant, name) => `${prefix}${family === 'ListBox' ? './native' : '../ListBox/native'}/${variant}/${name}'`);
  code = code.replace("import {useObjectRef} from 'react-aria/useObjectRef';", "import {createSignal as createRefSignal} from 'solid-js';");
  code = code.replace(/let triggerRef = useObjectRef<(HTMLDivElement|HTMLSpanElement)>\(\);/g, (_, type) => `let [triggerElement, setTriggerElement] = createRefSignal<${type} | null>(null);\n  let triggerRef = {get current() { return triggerElement(); }};`);
  code = code.replace(/ref=\{triggerRef\}/g, 'ref={setTriggerElement}');
  const ast = parse(code);
  const edits = [];
  babel.traverse(ast, {
    JSXElement(p) {
      const opening = p.node.openingElement;
      if (opening.name.type !== 'JSXIdentifier' || !['MenuTrigger', 'SubmenuTrigger'].includes(opening.name.name)) return;
      if (opening.selfClosing) return;
      const children = p.node.children.filter(n => (n.type !== 'JSXText' || n.value.trim()) && !(n.type === 'JSXExpressionContainer' && n.expression.type === 'JSXEmptyExpression'));
      if (children.length !== 2) throw new Error(`${family}: ${opening.name.name} expected source pair, got ${children.length}`);
      const factories = children.map(n => `() => (${code.slice(n.start, n.end)})`).join(', ');
      edits.push([opening.end - 1, p.node.closingElement.end, ` children={[${factories}]} />`]);
    }
  });
  // Nested menu triggers are rewritten inside-out in separate passes.
  const outer = edits.filter(a => !edits.some(b => b !== a && a[0] < b[0] && a[1] > b[1]));
  for (const [start, end, text] of outer.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + text + code.slice(end);
  if (outer.length !== edits.length) return finalize(code, family);
  return code;
}
for (const family of families) {
  const dir = path.join(root, family);
  const entries = JSON.parse(fs.readFileSync(path.join(dir, 'demos.json'), 'utf8'));
  let page = fs.readFileSync(path.join(dir, 'page.mdx'), 'utf8');
  page = page.replace(/(^[ \t]*```tsx[^\n]*\brender\b[^\n]*\n)([\s\S]*?)(^[ \t]*```)/gm, (_, opening, body, closing) => opening + finalize(body, family) + closing);
  fs.writeFileSync(path.join(dir, 'page.mdx'), page);
  for (const item of entries) {
    const filename = path.join(dir, item.module);
    let code = finalize(fs.readFileSync(filename, 'utf8'), family);
    if (code.includes('export function mount(')) continue;
    const ast = parse(code);
    const def = ast.program.body.find(n => n.type === 'ExportDefaultDeclaration').declaration;
    const entry = def.type === 'Identifier' ? def.name : def.id.name;
    const initial = item.fence.match(/initialProps=\{(\{[^\n]*?\})\}/)?.[1] ?? '{}';
    code = `import {render} from '@solidjs/web';\n${code}\nexport const title = ${JSON.stringify(`${family}: upstream example ${item.ordinal}`)};\nexport function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {\n  return render(() => <${entry} {...${initial}} {...props} />, element);\n}\n`;
    fs.writeFileSync(filename, code);
    item.mount = 'mount';
    item.title = 'title';
  }
  fs.writeFileSync(path.join(dir, 'demos.json'), JSON.stringify(entries, null, 2) + '\n');
}
console.log('Native starter imports, provider-owned menu factories and 102 mount/title exports prepared.');
