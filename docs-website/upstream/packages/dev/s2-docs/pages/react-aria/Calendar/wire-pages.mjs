import fs from 'node:fs';
import path from 'node:path';
const pages=path.resolve(import.meta.dirname,'..');
const root=path.resolve(pages,'../../../../../../..');
const names='Calendar RangeCalendar DateField TimeField DatePicker DateRangePicker ColorField ColorArea ColorSlider ColorWheel ColorSwatch Slider'.split(' ');
for(const name of names) {
  const file=path.join(pages,name+'.mdx');let text=fs.readFileSync(file,'utf8');
  text=text.replace(/^import \{[^\n]* as (?:Vanilla|Tailwind)[^\n]*\n/gm,'').replace(/\n\s*component=\{(?:Vanilla|Tailwind)\w+\}/g,'');
  const canonical=fs.readFileSync(path.join(root,'upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria',name+'.mdx'),'utf8');
  const originalVisuals=[...canonical.matchAll(/<VisualExample\b[\s\S]*?\/>/g)].map(m=>m[0]);let vi=0;
  text=text.replace(/<VisualExample\b[\s\S]*?\/>/g,whole=>{
    const original=originalVisuals[vi++];const kind=original.includes('Tailwind')?'tailwind':'vanilla';
    const sourceFiles=original.match(/files=\{(\[[\s\S]*?\])\}/);
    const originals=sourceFiles?JSON.parse(sourceFiles[1]):[`starters/docs/src/${name}.tsx`];
    const files=originals.map(f=>`packages/dev/s2-docs/pages/react-aria/${name}/${kind}/${path.basename(f).replace('.tsx','.solid.tsx')}`);
    return whole.replace(/files=\{\[[\s\S]*?\]\}/,`files={${JSON.stringify(files)}}`).replace(/solid="\.\//,'solid="');
  });
  text=text.replace(/```tsx ([^\n]*solid="(?:\.\/)?([^"\n]+)"[^\n]*)\n([\s\S]*?)\n```/g,(whole,meta,module)=>{
    const nativeFile=path.join(pages,module);let native=fs.readFileSync(nativeFile,'utf8');
    // Host metadata props target the same component as the original PROPS marker.
    if(meta.includes('props=') && !native.includes('{...props} /* PROPS */') && !native.includes('{...props}/* PROPS */') && !native.includes('{...props}\n')) {
      native=native.replace(/(<[A-Z]\w*)(?=\s|\/\*)/,'$1 {...props}');
      fs.writeFileSync(nativeFile,native);
    }
    let displayed=native.replace("import {render} from '@solidjs/web';\n",'').replace(/\nexport const title =[\s\S]*$/,'');
    // Original expressions stay expressions in the source drawer.
    if(displayed.includes('function Example(props: Record<string, unknown>) {return (')) displayed=displayed.replace('function Example(props: Record<string, unknown>) {return (','').replace(/\);}\s*$/,'');
    displayed=displayed.replace(/from '\.\/(vanilla|tailwind)\//g,`from './${name}/$1/`).replace("from './icons.solid'",`from './${name}/icons.solid'`);
    displayed=displayed.replace(/from '(\.\.\/)+packages\/react-aria\/src\/i18n\/useDateFormatter'/,"from '../../../../../../../packages/react-aria/src/i18n/useDateFormatter'");
    meta=meta.replace(/^render\s*/,'').replace(/nativeModule="[^"\n]+"\s*/,'').replace(/\s*solid="[^"\n]+"/,'').replace(/\s*files=\{\[[^\n]*\]\}/,'');
    return `\`\`\`tsx nativeModule="${module}" solid="${module}" ${meta} files={["packages/dev/s2-docs/pages/react-aria/${module}"]}\n${displayed.trim()}\n\`\`\``;
  });
  fs.writeFileSync(file,text);
}
