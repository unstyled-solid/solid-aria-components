import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
const pages=path.resolve(import.meta.dirname,'..');
const root=path.resolve(pages,'../../../../../../..');
const names='Calendar RangeCalendar DateField TimeField DatePicker DateRangePicker ColorField ColorArea ColorSlider ColorWheel ColorSwatch Slider'.split(' ');
function files(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):/\.tsx?$/.test(e.name)?[path.join(dir,e.name)]:[]);}
const hyphen=s=>s.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
for (const name of names) for (const file of files(path.join(pages,name))) {
  let text=fs.readFileSync(file,'utf8');
  text=text.replace(/aria-hidden(?=[\s/>])/g,'aria-hidden="true"').replace(/formatter\.(format(?:Range)?)/g,'formatter().$1').replace(/\b(date|range|time)\(\)\./g,'$1()!.').replace(/(currentValue|finalValue)\(\)\(\)/g,'$1()').replace("from './Slider/solid-Slider'","from './vanilla/Slider.solid'");
  if(file.endsWith('/Field.solid.tsx')) {execFileSync('cp',[path.join(pages,'Button/tailwind/Field.solid.tsx'),file]);continue;}
  if(file.endsWith('/Popover.solid.tsx')) text=text.replace('styles({...renderProps, className: live0.className})','styles({...renderProps, className})').replace('let offset = live0.showArrow ? 12 : 8;','let offset = () => live0.showArrow ? 12 : 8;').replace('offset={offset}','offset={offset()}');
  if(file.includes('solid-example-')) {
    text=text.replace('<I18nProvider/* PROPS */>','<I18nProvider {...props}/* PROPS */>');
    text=text.replace(/(<(?:DateField|TimeField|DatePicker|DateRangePicker)\s+)\/\* PROPS \*\//g,'$1{...props} /* PROPS */');
    text=text.replace('let isInvalid = range()!.end.compare(range()!.start) > 7;','let isInvalid = () => range()!.end.compare(range()!.start) > 7;').replace('isInvalid={isInvalid}','isInvalid={isInvalid()}').replace("errorMessage={isInvalid ?","errorMessage={isInvalid() ?");
    text=text.replace('let {locale} = useLocale();','let locale = useLocale();').replace('isWeekend(date, locale)','isWeekend(date, locale.locale)');
  }
  if(file.includes('solid-vanilla') || file.includes('solid-tailwind')) {
    if(name==='ColorSlider')text=text.replace('<ColorSlider {...props}', '<ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" {...props}');
  }
  if(file.endsWith('/icons.solid.tsx')) text=text.replaceAll('{className?: string}', '{className?: string; size?: number}').replaceAll('width="24" height="24"','width={props.size ?? 24} height={props.size ?? 24}');
  if(file.endsWith('/icons.solid.tsx')) text=text.replace(/export function (\w+)\(([\s\S]*?)class=\{props.className \?\? props.class\}/g,(_,icon,body)=>{
    const kebab=icon.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase().replace(/-icon$/,'');
    return `export function ${icon}(${body.replace('{...props}','aria-hidden="true" {...props}')}class={['lucide', 'lucide-${kebab}', props.className ?? props.class].filter(Boolean).join(' ')}`;
  });
  text=text.replace(/omit\((live\d+), \[([^\]]*)\]\)/g,'omit($1, $2)');
  if(text.includes('let months = live0.visibleDuration?.months || 1;')) text=text.replace('let months = live0.visibleDuration?.months || 1;','let months = () => live0.visibleDuration?.months || 1;').replace('length: months','length: months()').replace('i === months - 1','i === months() - 1');
  text=text.replace('let {direction} = useLocale();','let locale = useLocale();').replace(/(?<!\.)direction === 'rtl'/g,"locale.direction === 'rtl'").replaceAll('locale.locale.direction','locale.direction');
  // Retain React starter rest-prop exclusions using Solid native omit.
  if(file.includes('/vanilla/') || file.includes('/tailwind/')) {
    const kind=file.includes('/vanilla/')?'docs':'tailwind';
    const module=path.basename(file).replace('.solid.tsx','.tsx');
    const canonical=path.join(pages,'../../../../../starters',kind,'src',module);
    if(fs.existsSync(canonical)) {
      const original=ts.createSourceFile(module,fs.readFileSync(canonical,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
      const exclusions=new Map();
      function parameters(n) {if(ts.isFunctionDeclaration(n) && n.name) for(const p of n.parameters) if(ts.isObjectBindingPattern(p.name) && p.name.elements.some(e=>e.dotDotDotToken)) exclusions.set(n.name.text,p.name.elements.filter(e=>!e.dotDotDotToken).map(e=>(e.propertyName || e.name).getText(original)));ts.forEachChild(n,parameters);}
      parameters(original);
      for(const [fn,keys] of exclusions) {
        const match=text.match(new RegExp(`function ${fn}(?:<[^>]+>)?\\((live\\d+):`));
        if(match && text.includes(`{...${match[1]}}`)) {text=text.replaceAll(`{...${match[1]}}`,`{...omit(${match[1]}, ${keys.map(k=>JSON.stringify(k)).join(', ')})}`);if(!text.includes("import {omit}"))text="import {omit} from 'solid-js';\n"+text;}
      }
    }
  }
  const source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];
  function visit(node) {
    if (ts.isJsxAttribute(node)) {
      const parent=node.parent.parent;
      const tag=parent.tagName.getText(source);
      if (tag[0]===tag[0].toLowerCase() || ['Text','RACText','AriaText','Label','RACLabel','Description'].includes(tag)) {
        const key=node.name.getText(source);
        if (key==='className') edits.push([node.name.getStart(source),node.name.end,'class']);
        else if (['strokeWidth','strokeLinecap','strokeLinejoin','strokeDasharray','strokeDashoffset','fillRule','clipRule'].includes(key)) edits.push([node.name.getStart(source),node.name.end,hyphen(key)]);
      }
    }
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
      const key=node.name.text;
      if (['fontSize','marginBottom','marginTop','transformOrigin','backgroundColor','borderColor','borderWidth','borderRadius','minWidth','maxWidth','flexDirection','alignItems','justifyContent'].includes(key)) edits.push([node.name.getStart(source),node.name.end,JSON.stringify(hyphen(key))]);
      if (['fontSize','marginBottom','marginTop','gap','width','height'].includes(key) && ts.isNumericLiteral(node.initializer) && node.initializer.text!=='0') edits.push([node.initializer.getStart(source),node.initializer.end,JSON.stringify(node.initializer.text+'px')]);
    }
    if(ts.isPropertyAccessExpression(node) && node.name.text==='backgroundColor') edits.push([node.getStart(source),node.end,node.expression.getText(source)+"['background-color']"]);
    ts.forEachChild(node,visit);
  }
  visit(source);for(const [a,b,s] of edits.sort((a,b)=>b[0]-a[0])) text=text.slice(0,a)+s+text.slice(b);
  text=text.replace(/function Example\(props\)/g,'function Example(props: Record<string, unknown>)').replace(/width: props.size \|\| 16/g,"width: `${props.size || 16}px`").replace(/height: props.size \|\| 16/g,"height: `${props.size || 16}px`");
  if(text.includes('useDateFormatter')) {
    const native=path.relative(path.dirname(file),path.join(root,'packages/react-aria/src/i18n/useDateFormatter')).replaceAll('\\','/');
    text=text.replace("import {useDateFormatter} from 'solid-aria-components';",`import {useDateFormatter} from '${native}';`);
  }
  const icons=text.match(/import \{([^}]+)\} from '\.\/icons\.solid';/);
  if(icons) {
    const iconFile=path.join(path.dirname(file),'icons.solid.tsx');
    const existing=fs.existsSync(iconFile)?fs.readFileSync(iconFile,'utf8'):"import type {JSX} from '@solidjs/web';\n";
    let output=existing;
    for(const icon of icons[1].split(',').map(s=>s.trim())) {
      if(output.includes(`function ${icon}(`))continue;
      const kebab=icon.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase().replace(/-icon$/,'');
      const original=path.join(pages,'../../../../../node_modules/lucide-react/dist/esm/icons',kebab+'.js');
      const dest=path.join(path.dirname(file),'lucide-source');fs.mkdirSync(dest,{recursive:true});execFileSync('cp',[original,path.join(dest,kebab+'.js')]);
      const raw=fs.readFileSync(original,'utf8');const data=Function('return '+raw.match(/const __iconNode = (\[[\s\S]*?\]);/)[1])();
      const children=data.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>`${hyphen(key)}=${JSON.stringify(value)}`).join(' ')} />`).join('');
      output+=`/** lucide-react v0.517.0 ISC; original nodes in lucide-source/${kebab}.js. */\nexport function ${icon}(props: JSX.SvgSVGAttributes<SVGSVGElement> & {className?: string}) {return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props} class={props.className ?? props.class}>${children}</svg>;}\n`;
    }
    fs.writeFileSync(iconFile,output);
  }
  fs.writeFileSync(file,text);
}
