import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import * as babel from '@babel/core';
const pages = path.resolve('docs-website/upstream/packages/dev/s2-docs/pages/react-aria');
const here = path.join(pages, 'ListBox/native-icons');
const source = path.join(here, 'source/package/dist/esm');
const families = 'ListBox Select ComboBox GridList Table Tree TagGroup Menu Tooltip Popover Modal Toolbar ToggleButtonGroup'.split(' ');
const names = new Set();
const files = [];
function visit(dir) { for (const f of fs.readdirSync(dir, {withFileTypes: true})) { const file = path.join(dir, f.name); if (f.isDirectory()) { if (f.name !== 'source') visit(file); } else if (file.endsWith('.tsx')) files.push(file); } }
for (const family of families) visit(path.join(pages, family));
for (const file of files) for (const m of fs.readFileSync(file, 'utf8').matchAll(/import \{([^}]+)\} from 'lucide-solid';/g)) for (const n of m[1].split(',').map(n => n.trim())) names.add(n);
if (!names.size && fs.existsSync(path.join(here, 'source-nodes.json'))) for (const icon of JSON.parse(fs.readFileSync(path.join(here, 'source-nodes.json'), 'utf8'))) names.add(icon.export);
const index = fs.readFileSync(path.join(source, 'lucide-react.js'), 'utf8');
fs.mkdirSync(path.join(here, 'original'), {recursive: true});
const copied = [];
for (const file of ['Icon.js', 'createLucideIcon.js', 'defaultAttributes.js', 'shared/src/utils.js']) {
  const dest = path.join(here, 'original', path.basename(file));
  execFileSync('cp', [path.join(source, file), dest]);
}
execFileSync('cp', [path.join(here, 'source/package/LICENSE'), path.join(here, 'LICENSE')]);
let output = `/** Native SVG adaptation of lucide-react 0.517.0; exact upstream icon nodes, ISC license. */\nimport {omit} from 'solid-js';\nimport type {JSX} from '@solidjs/web';\n\nexport type IconProps = Omit<JSX.IntrinsicElements['svg'], 'children' | 'class'> & {\n  size?: number | string; color?: string; strokeWidth?: number | string; absoluteStrokeWidth?: boolean; className?: string; class?: string; children?: JSX.Element;\n};\nconst toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();\nconst toCamelCase = (string: string) => string.replace(/^([A-Z])|[\\s-_]+(\\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());\nconst toPascalCase = (string: string) => { const camelCase = toCamelCase(string); return camelCase.charAt(0).toUpperCase() + camelCase.slice(1); };\nconst mergeClasses = (...classes: (string | undefined)[]) => classes.filter((className, index, array) => Boolean(className) && className!.trim() !== '' && array.indexOf(className) === index).join(' ').trim();\nconst hasA11yProp = (props: object) => { for (const prop in props) { if (prop.startsWith('aria-') || prop === 'role' || prop === 'title') return true; } };\nfunction NativeIcon(props: IconProps & {name: string; children: JSX.Element}) {\n  const rest = omit(props, 'size', 'color', 'strokeWidth', 'absoluteStrokeWidth', 'className', 'class', 'children', 'name');\n  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke={props.color ?? 'currentColor'} stroke-width={props.absoluteStrokeWidth ? Number(props.strokeWidth ?? 2) * 24 / Number(props.size ?? 24) : props.strokeWidth ?? 2} stroke-linecap="round" stroke-linejoin="round" class={mergeClasses('lucide', mergeClasses(\`lucide-\${toKebabCase(toPascalCase(props.name))}\`, \`lucide-\${props.name}\`, props.className ?? props.class))} aria-hidden={!hasA11yProp(rest) ? 'true' : undefined} {...rest}>{props.children}</svg>;\n}\n`;
for (const name of [...names].sort()) {
  const match = [...index.matchAll(/export \{([^}]+)\} from '\.\/([^']+)';/g)].find(m => m[1].split(',').some(n => n.trim() === `default as ${name}`));
  if (!match) throw new Error(`No frozen Lucide export ${name}`);
  const file = match[2].replace(/^icons\//, '');
  execFileSync('cp', [path.join(source, 'icons', file), path.join(here, 'original', file)]);
  const code = fs.readFileSync(path.join(source, 'icons', file), 'utf8');
  const ast = babel.parseSync(code, {configFile: false, babelrc: false});
  const declaration = ast.program.body.find(n => n.type === 'VariableDeclaration' && n.declarations[0].id.name === '__iconNode').declarations[0].init;
  const nodes = Function(`return (${code.slice(declaration.start, declaration.end)})`)();
  const iconName = code.match(/createLucideIcon\("([^"]+)"/)[1];
  const jsx = nodes.map(([tag, attributes]) => `<${tag} ${Object.entries(attributes).filter(([key]) => key !== 'key').map(([key, value]) => `${key.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}={${JSON.stringify(value)}}`).join(' ')} />`).join('');
  output += `\nexport function ${name}(props: IconProps) { return <NativeIcon {...props} name=${JSON.stringify(iconName)}><>${jsx}{props.children}</></NativeIcon>; }\n`;
  copied.push({export: name, file, iconName, nodes});
}
output = output.replace('name: string; children: JSX.Element', 'name: string; original: IconProps; children: JSX.Element').replace("'children', 'name');", "'children', 'name', 'original');").replace("aria-hidden={!hasA11yProp(rest)", "aria-hidden={!props.original.children && !hasA11yProp(rest)").replace(/<NativeIcon \{\.\.\.props\} name=/g, '<NativeIcon {...props} original={props} name=');
fs.writeFileSync(path.join(here, 'solid-icons.tsx'), output);
fs.writeFileSync(path.join(here, 'source-nodes.json'), JSON.stringify(copied, null, 2) + '\n');
for (const file of files) {
  if (file.includes('/native-icons/')) continue;
  const relative = './' + path.relative(path.dirname(file), path.join(here, 'solid-icons')).split(path.sep).join('/');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/from 'lucide-solid'/g, `from '${relative}'`));
}
console.log(`${copied.length} exact frozen Lucide SVG exports ported locally; no new dependency/manifest changes.`);
// Remove only redundant files from this lane's newly extracted archive; selected originals remain.
const selected = new Set(copied.map(icon => icon.file));
for (const file of fs.readdirSync(path.join(source, 'icons'))) if (/\.js(?:\.map)?$/.test(file) && !selected.has(file)) fs.unlinkSync(path.join(source, 'icons', file));
