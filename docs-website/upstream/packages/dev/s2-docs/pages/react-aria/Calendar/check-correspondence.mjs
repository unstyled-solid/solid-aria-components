import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
import {transformSync} from '@babel/core';
import solid from '@solidjs/babel-plugin';
const pages=path.resolve(import.meta.dirname,'..');
const upstream=path.resolve(pages,'../../../../..');
const root=path.resolve(upstream,'../..');
const names='Calendar RangeCalendar DateField TimeField DatePicker DateRangePicker ColorField ColorArea ColorSlider ColorWheel ColorSwatch Slider'.split(' ');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
let css=0,compiled=0,examples=0;
function copyCSS(source,target,seen=new Set()) {if(seen.has(source))return;seen.add(source);execFileSync('cp',[source,target]);const text=fs.readFileSync(source,'utf8');for(const m of text.matchAll(/@import\s+["'](?:\.\/)?([^"']+\.css)["']/g))copyCSS(path.join(path.dirname(source),m[1]),path.join(path.dirname(target),m[1]),seen);}
for(const name of names) {
  for(const file of files(path.join(pages,name))) {
    if(file.endsWith('.css') && /\/(vanilla|tailwind)\//.test(file)) {const kind=file.includes('/vanilla/')?'docs':'tailwind';if(!fs.readFileSync(file).equals(fs.readFileSync(path.join(upstream,'starters',kind,'src',path.basename(file)))))throw Error('CSS mismatch: '+file);css++;}
    if(file.endsWith('.tsx')) {
      const code=fs.readFileSync(file,'utf8');if(/from ['"](?:react|lucide-react|react-aria-components)(?:\/|['"])/.test(code))throw Error('React demo import '+file);
      for(const m of code.matchAll(/(?:from |import )['"](\.\/[^'"]+)['"]/g)){const target=path.resolve(path.dirname(file),m[1]);if(![target,target+'.tsx',target+'.ts'].some(f=>fs.existsSync(f)))throw Error('Missing local import '+file+' '+m[1]);}
      const js=ts.transpileModule(code,{compilerOptions:{jsx:ts.JsxEmit.Preserve,target:ts.ScriptTarget.ESNext,module:ts.ModuleKind.ESNext}}).outputText;
      transformSync(js,{filename:file,configFile:false,babelrc:false,plugins:[[solid,{generate:'dom'}]]});compiled++;
    }
  }
  const mdx=fs.readFileSync(path.join(pages,name+'.mdx'),'utf8');const original=fs.readFileSync(path.join(root,'upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria',name+'.mdx'),'utf8');
  const expected=(original.match(/<VisualExample\b/g)||[]).length+(original.match(/```tsx render/g)||[]).length;
  const actual=(mdx.match(/solid="/g)||[]).length;if(expected!==actual)throw Error(name+' coverage '+expected+'/'+actual);examples+=actual;
  for(const m of mdx.matchAll(/solid="([^"]+)"/g))if(!fs.existsSync(path.join(pages,m[1])))throw Error('Missing island '+m[1]);
  for(const m of mdx.matchAll(/files=\{(\[[^\n]+\])\}/g))for(const source of JSON.parse(m[1]))if(!fs.existsSync(path.join(upstream,source)))throw Error('Missing source drawer '+source);
  const strip=s=>s.replace(/^import \{[^\n]* as (?:Vanilla|Tailwind)[^\n]*\n/gm,'').replace(/<VisualExample\b[\s\S]*?\/>/g,'<VisualExample />').replace(/```tsx[^\n]*\n[\s\S]*?\n```/g,'CODE');
  if(strip(mdx)!==strip(original))throw Error('Prose/layout mismatch '+name);
}
console.log(JSON.stringify({pages:names.length,examples,compiledTSX:compiled,identicalCSS:css}));
