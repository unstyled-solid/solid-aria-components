// Page-local, source-tracked demo extraction. Shared host infrastructure is not modified.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import * as babel from '@babel/core';

const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const source = path.resolve('upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const fence = /^([ \t]*)```tsx([^\n]*)\n(.*?)^[ \t]*```/gms;
const parse = code => babel.parseSync(code, {filename: 'demo.tsx', sourceType: 'module', parserOpts: {plugins: ['typescript', 'jsx']}, configFile: false, babelrc: false});

function adapt(input) {
  let code = input.replace(/^\s*"use client";?\s*\n/, '');
  code = code.replace(/from 'lucide-react'/g, "from 'lucide-solid'");
  code = code.replace(/from 'react';/g, "from 'solid-js';");
  code = code.replace(/\buseState\b/g, 'createSignal');
  code = code.replace(/import \{useRef\} from 'solid-js';/g, "import {useObjectRef} from 'react-aria/useObjectRef';");
  code = code.replace(/import \{createSignal, useRef\} from 'solid-js';/g, "import {createSignal} from 'solid-js';\nimport {useObjectRef} from 'react-aria/useObjectRef';");
  code = code.replace(/useRef<HTMLDivElement \| null>\(null\)/g, 'useObjectRef<HTMLDivElement>()');
  code = code.replace(/useRef\(null\)/g, 'useObjectRef<HTMLSpanElement>()');
  // The source's filter and sorting computations are derivations, not one-time setup snapshots.
  if (code.includes('let visibleColumns = columns.filter')) {
    code = "import {createMemo} from 'solid-js';\n" + code;
    code = code.replace('let visibleColumns = columns.filter(column => showColumns.includes(column.id));', 'let visibleColumns = createMemo(() => columns.filter(column => showColumns.includes(column.id)));');
  }
  if (code.includes('let sortedRows = rows;')) {
    code = "import {createMemo} from 'solid-js';\n" + code;
    code = code.replace('  let sortedRows = rows;\n', '  let sortedRows = createMemo(() => {\n    let sortedRows = rows;\n');
    code = code.replace('\n  return (\n    <Table', '\n    return sortedRows;\n  });\n\n  return (\n    <Table');
  }
  if (code.includes('useSyncExternalStore')) {
    code = code.replace("import {useSyncExternalStore} from 'solid-js';", "import {createSignal, onSettled} from 'solid-js';");
    code = code.replace('let columnWidths = useSyncExternalStore(subscribe, getColumnWidths, getInitialWidths);', 'let [columnWidths, updateColumnWidths] = createSignal(getInitialWidths());\n  onSettled(() => {\n    updateColumnWidths(getColumnWidths());\n    return subscribe(() => updateColumnWidths(getColumnWidths()));\n  });');
  }
  const ast = parse(code);
  const edits = [];
  babel.traverse(ast, {
    VariableDeclarator(p) {
      let id = p.node.id;
      const call = p.node.init;
      const signal = call?.type === 'CallExpression' && call.callee.type === 'Identifier' && call.callee.name === 'createSignal';
      const memo = call?.type === 'CallExpression' && call.callee.type === 'Identifier' && call.callee.name === 'createMemo';
      if (signal && id.type === 'ArrayPattern') id = id.elements[0];
      else if (!(memo && id.type === 'Identifier')) return;
      const binding = p.scope.getBinding(id.name);
      for (const ref of binding.referencePaths) {
        if (ref.parentPath.isObjectProperty() && ref.parent.shorthand) {
          edits.push([ref.node.start, ref.node.end, `${id.name}: ${id.name}()`]);
        } else edits.push([ref.node.end, ref.node.end, '()']);
      }
    }
  });
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + text + code.slice(end);
  // Local source imports move one directory down together with the copied page.
  code = code.replace(/(['"])\.\/([^'"]+)\1/g, '$1../$2$1');
  return code;
}

const counts = {};
for (const family of families) {
  const dir = path.join(root, family);
  const sourceFile = path.join(source, `${family}.mdx`);
  const original = fs.readFileSync(sourceFile, 'utf8');
  const entries = [];
  let adaptedPage = original.replace(fence, (whole, indent, header, body) => {
    if (!header.split(/\s+/).includes('render')) return whole;
    const number = entries.length + 1;
    const filename = `Demo${String(number).padStart(2, '0')}.tsx`;
    const displayed = adapt(body);
    let module = displayed;
    let ast = parse(module);
    const jsx = ast.program.body.filter(n => n.type === 'ExpressionStatement' && ['JSXElement', 'JSXFragment'].includes(n.expression.type));
    if (jsx.length) {
      const expression = jsx.at(-1);
      module = module.slice(0, expression.start) + `export default function Demo(props = {}) {\n  return (${module.slice(expression.expression.start, expression.expression.end)});\n}\n` + module.slice(expression.end);
    } else if (!ast.program.body.some(n => n.type === 'ExportDefaultDeclaration')) {
      const functions = ast.program.body.filter(n => n.type === 'FunctionDeclaration');
      const entry = functions.find(n => n.id.name === 'Example') ?? functions.find(n => /return[\s\S]*</.test(module.slice(n.start, n.end)));
      if (!entry) throw new Error(`${family}/${filename}: no source demo entry`);
      module += `\nexport default ${entry.id.name};\n`;
    }
    module = module.replace(/\/\* PROPS \*\//g, '{...props}');
    // Every module originates from a terminal copy of its full upstream source page.
    const output = path.join(dir, filename);
    if (fs.existsSync(output)) throw new Error(`Refusing to overwrite ${output}`);
    execFileSync('cp', [sourceFile, output]);
    fs.writeFileSync(output, `// Extracted from ${family}.mdx render example ${number}; source content and algorithms retained.\n${module}`);
    entries.push({id: `${family}-${number}`, module: `./${filename}`, export: 'default', source: `${family}.mdx`, ordinal: number, fence: header.trim()});
    return `${indent}\`\`\`tsx${header}\n${displayed}\n${indent}\`\`\``;
  });
  adaptedPage = adaptedPage.replace(/(['"])\.\.\/\.\.\/(src|tailwind)\//g, '$1../../../$2/');
  adaptedPage = adaptedPage.replace(/(['"])\.\/([^'"]+)\1/g, '$1../$2$1');
  fs.writeFileSync(path.join(dir, 'page.mdx'), adaptedPage);
  fs.writeFileSync(path.join(dir, 'demos.json'), JSON.stringify(entries, null, 2) + '\n');
  counts[family] = entries.length;
}
console.log(JSON.stringify(counts, null, 2));
