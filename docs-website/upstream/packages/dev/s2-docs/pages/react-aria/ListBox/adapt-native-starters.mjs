import fs from 'node:fs';
import path from 'node:path';
import * as babel from '@babel/core';
const root = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria/ListBox/native');
const parse = code => babel.parseSync(code, {filename: 'starter.tsx', configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
for (const variant of ['vanilla', 'tailwind']) for (const filename of fs.readdirSync(path.join(root, variant)).filter(f => /\.tsx?$/.test(f))) {
  const file = path.join(root, variant, filename);
  let code = fs.readFileSync(path.resolve(`upstream/react-spectrum/starters/${variant === 'vanilla' ? 'docs' : 'tailwind'}/src`, filename), 'utf8');
  code = code.replace(/^'use client';\n/, '');
  code = code.replace(/import (?:type )?React from 'react';\n/g, '');
  code = code.replace("import React, {createContext, useContext} from 'react';", "import {createContext, useContext} from 'solid-js';");
  code = code.replace("import type {ReactNode} from 'react';", "import type {JSX} from '@solidjs/web';");
  code = code.replace("import {type HTMLAttributes} from 'react';", "import type {JSX} from '@solidjs/web';");
  code = code.replace(/\bReact\.ReactNode\b|\bReact\.ReactElement\b|\bReactNode\b/g, 'JSX.Element');
  code = code.replace(/React\.ComponentProps/g, 'ComponentProps');
  code = code.replace(/React\.Ref/g, 'Ref');
  code = code.replace(/\bHTMLAttributes</g, 'JSX.HTMLAttributes<');
  code = code.replace(/from 'lucide-react'/g, "from 'lucide-solid'");
  code = code.replace(/from 'react-aria-components\//g, "from 'solid-aria-components/");
  code = code.replace(/ColorContext\.Provider/g, 'ColorContext');
  if (/\bJSX\./.test(code) && !code.includes("import type {JSX}")) code = "import type {JSX} from '@solidjs/web';\n" + code;
  if (/\bComponentProps</.test(code)) code = "import type {ComponentProps} from '@solidjs/web';\n" + code;
  if (/\bRef</.test(code)) code = "import type {Ref} from 'solid-js';\n" + code;
  if (filename === 'Menu.tsx') {
    code = code.replace(/  let \[trigger, menu\] = React\.Children\.toArray\(props\.children\) as \[[\s\S]*?\];\n/g, '');
    code = code.replace('props: MenuTriggerProps', "props: Omit<MenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}");
    code = code.replace('props: SubmenuTriggerProps', "props: Omit<SubmenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}");
    code = code.replace(/\{trigger\}/g, '{props.children[0]()}').replace(/\{menu\}/g, '{props.children[1]()}');
    // The library's existing native submenu API takes factories to preserve both providers.
    code = code.replace(/<AriaSubmenuTrigger \{\.\.\.props\}>([\s\S]*?)<\/AriaSubmenuTrigger>/g, (whole, children) => {
      const popover = children.match(/<Popover[\s\S]*<\/Popover>/)?.[0];
      if (!popover) throw new Error(`Missing source submenu Popover in ${file}`);
      return `<AriaSubmenuTrigger {...props} children={[props.children[0], () => (${popover})]} />`;
    });
  }
  let ast = parse(code);
  let edits = [];
  let usesOmit = false;
  babel.traverse(ast, {
    Function(p) {
      if (p.node.params[0]?.type !== 'ObjectPattern') return;
      const param = p.node.params[0];
      if (p.node.body.type !== 'BlockStatement') return; // render-prop lambdas keep call-time destructuring.
      const fields = param.properties.filter(n => n.type === 'ObjectProperty');
      if (fields.some(n => n.value.type !== 'Identifier' && n.value.type !== 'AssignmentPattern')) throw new Error(`Nested parameter in ${file}`);
      const rest = param.properties.find(n => n.type === 'RestElement');
      const input = 'inputProps';
      const annotation = param.typeAnnotation ? code.slice(param.typeAnnotation.start, param.typeAnnotation.end) : '';
      edits.push([param.start, param.end, input + annotation]);
      const keys = fields.map(n => n.key.name);
      if (rest) {
        usesOmit = true;
        edits.push([p.node.body.start + 1, p.node.body.start + 1, `\n  let ${rest.argument.name} = omit(${input}, ${keys.map(k => JSON.stringify(k)).join(', ')});`]);
      }
      for (const field of fields) {
        const local = field.value.type === 'AssignmentPattern' ? field.value.left : field.value;
        const binding = p.scope.getBinding(local.name);
        for (const ref of binding.referencePaths) {
          const read = `${input}.${field.key.name}`;
          const value = field.value.type === 'AssignmentPattern' ? `(${read} === undefined ? ${code.slice(field.value.right.start, field.value.right.end)} : ${read})` : read;
          const text = ref.parentPath.isObjectProperty() && ref.parent.shorthand ? `${local.name}: ${value}` : value;
          edits.push([ref.node.start, ref.node.end, text]);
        }
      }
    },
    VariableDeclarator(p) {
      if (p.node.id.type !== 'ObjectPattern' || p.node.init?.type !== 'CallExpression' || p.node.init.callee.name !== 'useTableOptions') return;
      const pattern = p.node.id;
      edits.push([pattern.start, pattern.end, 'tableOptions']);
      for (const field of pattern.properties) {
        const binding = p.scope.getBinding(field.value.name);
        for (const ref of binding.referencePaths) edits.push([ref.node.start, ref.node.end, `tableOptions.${field.key.name}`]);
      }
    }
  });
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + text + code.slice(end);
  if (usesOmit) code = "import {omit} from 'solid-js';\n" + code;
  // A text-value fallback is a cheap derivation and must not instantiate children in setup.
  ast = parse(code);
  edits = [];
  babel.traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.id.type !== 'Identifier' || p.node.id.name !== 'textValue') return;
      const init = p.node.init;
      edits.push([init.start, init.end, `() => (${code.slice(init.start, init.end)})`]);
      const binding = p.scope.getBinding('textValue');
      for (const ref of binding.referencePaths) edits.push([ref.node.end, ref.node.end, '()']);
    }
  });
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + text + code.slice(end);
  fs.writeFileSync(file, code);
}
console.log('Adapted source-copied native starter closure.');
