// Read-only capture of existing native fixtures; mount coverage is NOT interaction qualification.
const fs = require('node:fs');
const {chromium} = require('../node_modules/playwright');
const root = '/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/native-tooltip-reference';
const routes = fs.readdirSync(root, {withFileTypes: true}).flatMap(entry => {
  if (entry.isFile() && entry.name.endsWith('.html')) return [entry.name];
  if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules')
    return fs.readdirSync(root + '/' + entry.name).filter(name => name.endsWith('.html')).map(name => entry.name + '/' + name);
  return [];
});
(async () => {
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const route of routes) {
      const port = route.startsWith('tree-') || route.startsWith('grid-') || route.startsWith('listbox-') || route.startsWith('treeble-') ? 4328 : 4318;
      const page = await browser.newPage();
      const messages = [], errors = [];
      page.on('console', message => {if (['warning', 'error'].includes(message.type())) messages.push({type: message.type(), message: message.text()});});
      page.on('pageerror', error => errors.push(error.stack));
      let capture;
      try {
        await page.goto(`http://127.0.0.1:${port}/${route}`, {timeout: 10000});
        await page.waitForTimeout(350);
        capture = await page.evaluate(() => ({title: document.title, text: document.body.innerText.slice(0, 500), roles: [...document.querySelectorAll('[role]')].map(node => node.getAttribute('role')), resources: performance.getEntriesByType('resource').map(entry => entry.name)}));
      } catch (error) {errors.push(String(error));}
      results.push({route, port, phase: 'mount-only', messages, errors, capture});
      await page.close();
    }
  } finally {await browser.close(); fs.writeFileSync(root + '/../diagnostics-catalog-quickpass.json', JSON.stringify(results, null, 2));}
  console.log(JSON.stringify(results.map(({route, messages, errors}) => ({route, codes: messages.map(entry => entry.message.match(/^\[([^\]]+)/)?.[1] || entry.type), errors: errors.length})), null, 2));
})().catch(error => {console.error(error); process.exitCode = 1;});
