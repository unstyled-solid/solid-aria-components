import {chromium} from 'playwright';
import fs from 'node:fs';
import fg from 'fast-glob';

const base = 'packages/dev/s2-docs/pages/react-aria/';
const pages = (await fg(base + '**/*.mdx')).filter(file => /nativeModule=|solid=|from ['"]\.\/NativeDemo/.test(fs.readFileSync(file, 'utf8'))).map(file => file.slice(base.length, -4));
pages.push('index', 'examples/ios-list', 'examples/photos', 'Form');
const browser = await chromium.launch({headless: true});
const results = [];
for (const route of [...new Set(pages)]) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => {if (message.type() === 'error') errors.push(message.text());});
  try {
    const response = await page.goto(`http://localhost:4340/${route}.html`, {waitUntil: 'load', timeout: 60000});
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => ({title: document.title, islands: [...document.querySelectorAll('[data-native-solid-demo]')].map(x => ({module: x.getAttribute('data-native-module'), text: x.textContent.slice(0, 150), mounted: x.childElementCount > 0})), placeholders: document.querySelectorAll('[data-unavailable-demo]').length}));
    results.push({route, status: response.status(), ...state, errors});
  } catch (error) {results.push({route, errors: [...errors, error.message]});}
  await page.close();
}
await browser.close();
fs.writeFileSync('../fullsite-browser.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({pages: results.length, errors: results.filter(r => r.errors.length), empty: results.flatMap(r => (r.islands || []).filter(i => !i.mounted).map(i => ({route: r.route, ...i})))}, null, 2));
