import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import * as babel from '@babel/core';
const base = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const source = path.resolve('upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria');
const parse = code => babel.parseSync(code, {filename:'demo.tsx', sourceType:'module', parserOpts:{plugins:['typescript','jsx']}, configFile:false, babelrc:false});
for (const family of ['NavigationTree','Virtualizer']) {
  const dir = path.join(base,family);
  fs.mkdirSync(dir,{recursive:true});
  execFileSync('cp',[path.join(source,family+'.mdx'),path.join(dir,'source.mdx')]);
  let ordinal=0;
  const entries=[];
  let page=fs.readFileSync(path.join(dir,'source.mdx'),'utf8').replace(/^([ \t]*)```tsx([^\n]*)\n(.*?)^[ \t]*```/gms,(whole,indent,header,body)=>{
    if(!header.split(/\s+/).includes('render')) return whole;
    const n=++ordinal, filename=`solid-demo${String(n).padStart(2,'0')}.tsx`;
    let code=body.replace(/^\s*"use client";?\s*\n/,'');
    code=code.replace(/from 'react-aria-components\//g,"from 'solid-aria-components/");
    code=code.replace(/from '(vanilla|tailwind)-starter\/([^']+)'/g,(_,variant,name)=>`from '${name==='NavigationTree' ? './native/'+variant+'/solid-'+name : '../ListBox/native/'+variant+'/solid-'+name}'`);
    code=code.replace(/from 'lucide-react'/g,"from '../ListBox/native-icons/solid-icons'");
    code=code.replace(/from '\.\/Router'/g,"from './solid-Router'");
    code=code.replace(/from 'react'/g,"from 'solid-js'").replace(/\buseState\b/g,'createSignal');
    const ast=parse(code), edits=[];
    babel.traverse(ast,{VariableDeclarator(p){
      if(p.node.init?.type!=='CallExpression'||p.node.init.callee.name!=='createSignal'||p.node.id.type!=='ArrayPattern')return;
      const id=p.node.id.elements[0], binding=p.scope.getBinding(id.name);
      for(const ref of binding.referencePaths) edits.push([ref.node.end,ref.node.end,'()']);
    }});
    for(const [a,b,s]of edits.sort((a,b)=>b[0]-a[0]))code=code.slice(0,a)+s+code.slice(b);
    const tree=parse(code), jsx=tree.program.body.filter(n=>n.type==='ExpressionStatement'&&['JSXElement','JSXFragment'].includes(n.expression.type));
    if(jsx.length){const node=jsx.at(-1);code=code.slice(0,node.start)+`export default function Demo(props: Record<string, unknown> = {}) { return (${code.slice(node.expression.start,node.expression.end)}); }\n`+code.slice(node.end);}
    else code+='\nconst Demo = Example;\nexport default Demo;\n';
    code=code.replace(/\/\* PROPS \*\//g,'{...props}');
    let initial='{}';
    if(family==='Virtualizer') initial=["{layoutOptions: {rowSize:32,gap:4,padding:4}}","{layoutOptions: {estimatedRowSize:75,gap:4,padding:4}}","{layoutOptions: {estimatedRowSize:100,gap:8,padding:8,orientation:'horizontal'}}","{layoutOptions: {minItemSize:{width:100,height:140},minSpace:{width:8,height:8}}}","{layoutOptions: {minItemSize:{width:150,height:150},minSpace:{width:8,height:8}}}","{layoutOptions: {rowHeight:32,headingHeight:32,padding:4,gap:4}}","{}"][n-1];
    execFileSync('cp',[path.join(dir,'source.mdx'),path.join(dir,filename)]);
    fs.writeFileSync(path.join(dir,filename),`import {render} from '@solidjs/web';\n// Terminal-copied upstream ${family}.mdx, render example ${n}.\n${code}\nexport const title = '${family}: upstream example ${n}';\nexport function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...${initial}} {...props} />, element); }\n`);
    entries.push({module:`${family}/${filename}`,ordinal:n,source:`${family}.mdx`,fence:header.trim()});
    return `${indent}\`\`\`tsx${header.replace(/\brender\b/,'')} nativeModule="${family}/${filename}"\n${body}${indent}\`\`\``;
  });
  execFileSync('cp',[path.join(dir,'source.mdx'),path.join(base,family+'.mdx')]);
  fs.writeFileSync(path.join(base,family+'.mdx'),page);
  fs.writeFileSync(path.join(dir,'demos.json'),JSON.stringify(entries,null,2)+'\n');
  console.log(family,ordinal);
}
