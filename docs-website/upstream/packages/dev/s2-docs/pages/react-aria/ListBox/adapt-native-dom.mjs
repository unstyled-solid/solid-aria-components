import fs from 'node:fs';
import path from 'node:path';
import * as babel from '@babel/core';
const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const parse = code => babel.parseSync(code, {filename: 'demo.tsx', configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
const unitless = new Set('animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth'.split(' '));
const nativeNames = new Map(Object.entries({className: 'class', tabIndex: 'tabindex', key: '$key', strokeWidth: 'stroke-width', strokeLinecap: 'stroke-linecap', strokeLinejoin: 'stroke-linejoin', strokeDasharray: 'stroke-dasharray', strokeDashoffset: 'stroke-dashoffset', fillRule: 'fill-rule', clipRule: 'clip-rule'}));
function adapt(code, filename) {
  code = code.replace(/([A-Za-z]+Context)\.Provider/g, '$1');
  code = code.replace(/function Demo\(props = \{\}\)/g, 'function Demo(props: Record<string, unknown> = {})');
  code = code.replace(/function Example\(props\)/g, 'function Example(props: Record<string, unknown>)');
  const ast = parse(code);
  const edits = [];
  babel.traverse(ast, {
    JSXAttribute(p) {
      const name = p.node.name.name;
      const opening = p.parent;
      const tag = opening.name.type === 'JSXIdentifier' ? opening.name.name : '';
      const native = /^[a-z]/.test(tag);
      const plain = ['Text', 'Label', 'RACLabel', 'Header', 'Heading'].includes(tag);
      if (name === 'aria-hidden' && p.node.value == null) edits.push([p.node.name.end, p.node.name.end, '="true"']);
      if (tag === 'Group' && name === 'class') edits.push([p.node.name.start, p.node.name.end, 'className']);
      if (nativeNames.has(name) && (native || plain || name === 'tabIndex')) {
        const replacement = name === 'key' ? '$key' : nativeNames.get(name);
        edits.push([p.node.name.start, p.node.name.end, replacement]);
      }
      if (name !== 'style' || p.node.value?.type !== 'JSXExpressionContainer') return;
      p.get('value').traverse({
        ObjectProperty(q) {
          if (q.parent.type !== 'ObjectExpression') return;
          if (q.node.computed || q.node.method) return;
          const key = q.node.key.type === 'Identifier' ? q.node.key.name : q.node.key.value;
          if (typeof key !== 'string' || key.startsWith('--')) return;
          if (/[A-Z]/.test(key)) edits.push([q.node.key.start, q.node.key.end, JSON.stringify(key.replace(/[A-Z]/g, c => '-' + c.toLowerCase()))]);
          if (q.node.value.type === 'NumericLiteral' && q.node.value.value !== 0 && !unitless.has(key)) edits.push([q.node.value.start, q.node.value.end, JSON.stringify(`${q.node.value.value}px`)]);
          else if (['width', 'height'].includes(key) && q.node.value.type === 'LogicalExpression') edits.push([q.node.value.start, q.node.value.end, `(${code.slice(q.node.value.start, q.node.value.end)}) + 'px'`]);
        }
      });
    },
    JSXElement(p) {
      const tag = p.node.openingElement.name;
      if (tag.type !== 'JSXIdentifier' || !['Pressable', 'Focusable'].includes(tag.name)) return;
      const child = p.node.children.find(n => n.type === 'JSXElement');
      if (!child) return;
      edits.push([child.start, child.start, '{forwardedProps => (']);
      edits.push([child.end, child.end, ')}']);
      edits.push([child.openingElement.name.end, child.openingElement.name.end, ' {...forwardedProps}']);
    }
  });
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + text + code.slice(end);
  if (/native\/tailwind\/(?:solid-)?GridList\.tsx$/.test(filename) && code.includes('inputProps: JSX.HTMLAttributes<HTMLElement>')) {
    code = "import type {ComponentProps} from '@solidjs/web';\n" + code.replace('inputProps: JSX.HTMLAttributes<HTMLElement>', 'inputProps: ComponentProps<typeof AriaGridListHeader>');
  }
  return code;
}
function visit(dir) {
  for (const f of fs.readdirSync(dir, {withFileTypes: true})) {
    const filename = path.join(dir, f.name);
    if (f.isDirectory()) visit(filename);
    else if (/\.tsx$/.test(f.name)) fs.writeFileSync(filename, adapt(fs.readFileSync(filename, 'utf8'), filename));
  }
}
for (const family of families) {
  visit(path.join(root, family));
  const main = path.join(root, family + '.mdx');
  let text = fs.readFileSync(main, 'utf8');
  text = text.replace(/(^[ \t]*```tsx[^\n]*\brender\b[^\n]*\n)([\s\S]*?)(^[ \t]*```)/gm, (_, opening, code, closing) => opening + adapt(code, main) + closing);
  fs.writeFileSync(main, text);
}
console.log('Native DOM spellings, exact CSS units, direct contexts and forwarded trigger callbacks adapted.');
