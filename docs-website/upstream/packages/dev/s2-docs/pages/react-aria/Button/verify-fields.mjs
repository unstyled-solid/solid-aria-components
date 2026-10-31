import ts from 'typescript';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';

const root = fileURLToPath(new URL('../../../../../../../../', import.meta.url));
const pages = fileURLToPath(new URL('../', import.meta.url));
const names = ['Button', 'Link', 'ToggleButton', 'Switch', 'Checkbox', 'TextField', 'SearchField', 'NumberField'];
const config = ts.readConfigFile(path.join(root, 'tsconfig.wave.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
parsed.options.paths['solid-aria-components'] = ['packages/react-aria-components/exports/index.ts'];
parsed.options.noEmit = true;
function sourceFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? sourceFiles(path.join(directory, entry.name)) : /\.tsx?$/.test(entry.name) ? [path.join(directory, entry.name)] : []);
}
const files = [path.join(root, 'test/intl.d.ts'), ...names.flatMap(name => sourceFiles(path.join(pages, name)))];
const program = ts.createProgram(files, parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);
console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, {getCanonicalFileName: f => f, getCurrentDirectory: () => root, getNewLine: () => '\n'}));
console.log(JSON.stringify({total: diagnostics.length, owned: diagnostics.filter(d => d.file?.fileName.startsWith(pages)).length}));
process.exitCode = diagnostics.length ? 1 : 0;
