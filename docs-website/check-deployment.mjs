import {readdirSync, readFileSync, statSync, existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('./dist-build/', import.meta.url));
function files(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const redirects = readFileSync(path.join(root, '_redirects'), 'utf8').trim().split('\n').map(line => line.split(/\s+/)[0]);
const failures = new Set();
const origin = new URL(process.env.DOCS_ORIGIN || process.env.DEPLOY_PRIME_URL || process.env.URL || 'http://localhost:8888').origin;
function check(file, value) {
  value = value.replaceAll('&amp;', '&');
  if (!value || value.startsWith('#')) return;
  const url = new URL(value, origin + '/' + path.relative(root, file));
  if (url.origin !== origin) return;
  const pathname = decodeURIComponent(url.pathname);
  const target = path.join(root, pathname);
  if ([target, `${target}.html`, path.join(target, 'index.html')].some(candidate => existsSync(candidate) && statSync(candidate).isFile())) return;
  if (redirects.some(route => route.endsWith('*') ? pathname.startsWith(route.slice(0, -1)) : pathname === route)) return;
  failures.add(`${path.relative(root, file)} -> ${value}`);
}
const output = files(root);
const html = output.filter(file => file.endsWith('.html'));
for (const file of output.filter(file => /\.(html|css)$/.test(file))) {
  const text = readFileSync(file, 'utf8');
  const pattern = file.endsWith('.html') ? /\b(?:href|src)=["']([^"']+)["']/g : /url\(\s*["']?([^\s"')]+)["']?\s*\)/g;
  for (const match of text.matchAll(pattern)) check(file, match[1]);
  if (file.endsWith('.html')) {
    for (const match of text.matchAll(/<meta (?:name|property)="(?:og:image|twitter:image)" content="([^"]+)"/g)) check(file, match[1]);
  }
}
for (const route of ['index.html', 'Button.html', 'Button/useButton.html', 'Select/testing.html', 'examples/crud.html', 'internationalized/date/index.html', 'releases/index.html', 'index.rsc']) {
  if (!existsSync(path.join(root, route))) failures.add(`Missing expected output: ${route}`);
}
if (failures.size) throw new Error([...failures].join('\n'));
console.log(`PASS: ${html.length} static pages, local HTML/CSS links and assets, explicit redirects, nested docs and RSC output`);
