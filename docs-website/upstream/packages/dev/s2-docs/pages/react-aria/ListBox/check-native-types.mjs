import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root = path.resolve('.');
const pages = path.join(root, 'docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const config = ts.readConfigFile(path.join(root, 'tsconfig.wave.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const paths = {...parsed.options.paths};
for (const [key, value] of Object.entries(paths)) if (key.startsWith('react-aria-components')) paths[key.replace('react-aria-components', 'solid-aria-components')] = value;
paths['solid-aria-components/Checkbox'] = ['packages/react-aria-components/exports/Checkbox.ts'];
const files = [];
function collect(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (/\.tsx?$/.test(entry.name)) files.push(file);
  }
}
for (const family of 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ')) collect(path.join(pages, family));
const program = ts.createProgram([...files, path.join(root, 'test/intl.d.ts')], {...parsed.options, paths, noEmit: true});
const diagnostics = ts.getPreEmitDiagnostics(program).map(d => ({file: d.file ? path.relative(root, d.file.fileName) : null, line: d.file && d.start != null ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : null, code: d.code, message: ts.flattenDiagnosticMessageText(d.messageText, '\n')}));
const relativePages = path.relative(root, pages).split(path.sep).join('/') + '/';
const owned = diagnostics.filter(d => d.file?.startsWith(relativePages));
const external = diagnostics.filter(d => !d.file?.startsWith(relativePages));
const result = {files: files.length, owned, external};
fs.writeFileSync(path.join(pages, 'ListBox/type-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({files: files.length, ownedErrors: owned.length, externalErrors: external.length, owned, external}, null, 2));
if (diagnostics.length) process.exitCode = 1;
