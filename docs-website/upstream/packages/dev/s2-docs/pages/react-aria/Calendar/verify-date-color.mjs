import ts from 'typescript';
import path from 'node:path';
import fs from 'node:fs';
const root = path.resolve(import.meta.dirname, '../../../../../../../..');
const pages = path.resolve(import.meta.dirname, '..');
const names = 'Calendar RangeCalendar DateField TimeField DatePicker DateRangePicker ColorField ColorArea ColorSlider ColorWheel ColorSwatch Slider'.split(' ');
const config = ts.readConfigFile(path.join(root, 'tsconfig.wave.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
parsed.options.paths['solid-aria-components'] = ['packages/react-aria-components/exports/index.ts'];
parsed.options.noEmit = true;
if(process.argv.includes('--skipLibCheck')) parsed.options.skipLibCheck = true;
function files(directory) {return fs.readdirSync(directory,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(directory,e.name)):/\.tsx?$/.test(e.name)?[path.join(directory,e.name)]:[]);}
const program = ts.createProgram([path.join(root,'test/intl.d.ts'),...names.flatMap(n=>files(path.join(pages,n)))],parsed.options);
const diagnostics=ts.getPreEmitDiagnostics(program);
fs.writeFileSync(path.join(import.meta.dirname,process.argv.includes('--skipLibCheck')?'types-owned.json':'types.json'),JSON.stringify(diagnostics.map(d=>({file:d.file?.fileName,line:d.file?.getLineAndCharacterOfPosition(d.start).line+1,code:d.code,message:ts.flattenDiagnosticMessageText(d.messageText,' ')})),null,2));
console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>root,getNewLine:()=> '\n'}));
console.log(JSON.stringify({total:diagnostics.length,owned:diagnostics.filter(d=>d.file && names.some(n=>d.file.fileName.startsWith(path.join(pages,n)+'/'))).length}));
process.exitCode=diagnostics.length?1:0;
