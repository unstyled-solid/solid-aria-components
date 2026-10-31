import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
const pages = path.resolve(import.meta.dirname, '..');
const upstream = path.resolve(pages, '../../../../..');
const names = 'Calendar RangeCalendar DateField TimeField DatePicker DateRangePicker ColorField ColorArea ColorSlider ColorWheel ColorSwatch Slider'.split(' ');
const inventory = [];
if (fs.existsSync(path.join(pages,'Calendar/date-color-inventory.json'))) throw Error('Initial source-copy generator already ran. Preserve subsequent native repairs; do not regenerate.');
function adapt(text) {
  text = text.replace(/import React(?:,\s*\{([^}]+)\})? from 'react';/g, (_, imports) => imports ? `import {${imports}} from 'solid-js';` : '').replace(/from 'react-aria-components(?:\/[^']+)?'/g, "from 'solid-aria-components'").replace(/from 'react-aria\/([^']+)'/g, "from 'solid-aria-components'").replace(/import \{useState\} from 'react';/g, "import {createSignal} from 'solid-js';").replace(/\buseState\b/g, 'createSignal').replace(/from 'lucide-react'/g, "from './icons.solid'").replace(/React\.ReactNode/g, 'JSX.Element').replace(/React\.CSSProperties/g, 'JSX.CSSProperties').replace(/React\.HTMLAttributes<[^>]+>/g, 'JSX.HTMLAttributes<HTMLElement>').replace(/React\.Ref<[^>]+>/g, '(element: HTMLElement) => void');
  const source = ts.createSourceFile('demo.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  let scopes = 0;
  const add = (node, value) => edits.push([node.getStart(source), node.end, value]);
  function visit(node, bindings = new Map()) {
    let local = new Map(bindings);
    if (ts.isFunctionLike(node)) {
      for (const param of node.parameters) if (ts.isObjectBindingPattern(param.name)) {
        const bag = `live${scopes++}`;
        add(param.name, bag);
        for (const element of param.name.elements) {
          const name = element.name.getText(source);
          if (element.dotDotDotToken) local.set(name, bag);
          else {
            const access = `${bag}.${element.propertyName?.getText(source) || name}`;
            local.set(name, element.initializer ? `(${access} ?? ${element.initializer.getText(source)})` : access);
          }
        }
      }
      if (node.body) {
        function states(child) {
          if (child !== node.body && ts.isFunctionLike(child)) return;
          if (ts.isVariableDeclaration(child) && ts.isArrayBindingPattern(child.name) && child.initializer && ts.isCallExpression(child.initializer) && child.initializer.expression.getText(source) === 'createSignal') {
            const first = child.name.elements[0]; local.set(first.name.getText(source), `${first.name.getText(source)}()`);
          }
          ts.forEachChild(child, states);
        }
        states(node.body);
      }
    }
    if (ts.isParameter(node) && ts.isObjectBindingPattern(node.name)) { if (node.type) visit(node.type, local); return; }
    if (ts.isIdentifier(node) && local.has(node.text)) {
      const p = node.parent;
      const declaration = (ts.isVariableDeclaration(p) || ts.isBindingElement(p) || ts.isParameter(p) || ts.isFunctionDeclaration(p)) && p.name === node;
      const key = (ts.isPropertyAccessExpression(p) && p.name === node) || (ts.isPropertyAssignment(p) && p.name === node) || ts.isJsxAttribute(p) || ts.isImportSpecifier(p) || ts.isTypeReferenceNode(p);
      if (!declaration && !key) add(node, ts.isShorthandPropertyAssignment(p) ? `${node.text}: ${local.get(node.text)}` : local.get(node.text));
    }
    ts.forEachChild(node, child => visit(child, local));
  }
  visit(source);
  for (const [start,end,value] of edits.sort((a,b) => b[0]-a[0])) text = text.slice(0,start)+value+text.slice(end);
  text = text.replace(/\skey=\{[^}]+\}/g, '').replace(/fontSize: 12/g, "'font-size': '12px'").replace(/fontSize: 14/g, "'font-size': '14px'");
  if (text.includes('JSX.')) text = "import type {JSX} from '@solidjs/web';\n"+text;
  return text;
}
function copyClosure(name, kind, module, seen = new Set()) {
  if (seen.has(module)) return; seen.add(module);
  const source = path.join(upstream, 'starters', kind === 'vanilla' ? 'docs' : 'tailwind', 'src', module+'.tsx');
  const targetDir = path.join(pages,name,kind);fs.mkdirSync(targetDir,{recursive:true});
  const actual = fs.existsSync(source) ? source : source.replace(/\.tsx$/, '.ts');
  const target = path.join(targetDir,module+(actual.endsWith('.tsx')?'.solid.tsx':'.ts'));
  execFileSync('cp',[actual,target]);
  let text = fs.readFileSync(target,'utf8');
  for (const match of text.matchAll(/(?:from |import )'\.\/([^']+)'/g)) {
    const dependency = match[1];
    if (dependency.endsWith('.css')) execFileSync('cp',[path.join(path.dirname(actual),dependency),path.join(targetDir,dependency)]);
    else {copyClosure(name,kind,dependency,seen); text=text.replaceAll(`'./${dependency}'`,`'./${dependency}${fs.existsSync(path.join(path.dirname(actual),dependency+'.tsx'))?'.solid':''}'`);}
  }
  text=adapt(text);fs.writeFileSync(target,text);
}
for (const name of names) {
  const file = path.join(pages,name+'.mdx'); let text = fs.readFileSync(file,'utf8');
  let number=0;
  text=text.replace(/<VisualExample\b([\s\S]*?)\/>/g,(whole,body)=>{
    const kind=body.includes('Tailwind')?'tailwind':'vanilla';const id=`solid-${kind}-${++number}`;
    copyClosure(name,kind,name);
    const module=path.join(pages,name,id+'.tsx');fs.writeFileSync(module,`import {render} from '@solidjs/web';\nimport {${name}} from './${kind}/${name}.solid';\nexport const title = '${name} ${kind}';\nexport function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <${name} {...props} />, element);}\n`);
    const sourcePath=`packages/dev/s2-docs/pages/react-aria/${name}/${kind}/${name}.solid.tsx`;
    body=body.replace(/files=\{\[[\s\S]*?\]\}/,`files={["${sourcePath}"]}`);
    inventory.push({name,id,kind});return `<VisualExample solid="./${name}/${id}.tsx"${body}/>`;
  });
  text=text.replace(/```tsx (render[^\n]*|nativeModule=[^\n]*)\n([\s\S]*?)\n```/g,(whole,metadata,code)=>{
    const id=`solid-example-${++number}`;
    code=code.replace(/from '(vanilla|tailwind)-starter\/([^']+)'/g,(_,kind,module)=>{copyClosure(name,kind,module);return `from './${kind}/${module}.solid'`;});
    code=adapt(code);
    const imports=[...code.matchAll(/^import[\s\S]*?;$/gm)].map(m=>m[0]).join('\n');
    let body=code.replace(/^import[\s\S]*?;$/gm,'').replace(/['"]use client['"];?/,'').trim();
    if (!/function Example\b/.test(body)) body=`function Example(props: Record<string, unknown>) {return (${body.replace(/;\s*$/,'')});}`;
    fs.writeFileSync(path.join(pages,name,id+'.tsx'),`import {render} from '@solidjs/web';\n${imports}\n${body}\nexport const title = '${name} example ${number}';\nexport function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}\n`);
    inventory.push({name,id,kind:'fence'});
    code=code.replace(/from '\.\/(vanilla|tailwind)\//g,`from './${name}/$1/`);
    return `\`\`\`tsx ${metadata.startsWith('nativeModule')?'render':metadata} solid="./${name}/${id}.tsx"\n${code}\n\`\`\``;
  });
  fs.writeFileSync(file,text);
}
fs.writeFileSync(path.join(pages,'Calendar/date-color-inventory.json'),JSON.stringify(inventory,null,2));
console.log(JSON.stringify({examples:inventory.length,pages:names.length}));
