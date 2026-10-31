const fs = require('node:fs');
const {chromium} = require('../node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const messages = [];
  await page.route('**/useComboBoxState.ts', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace('setInputValue(selectedItemText);', 'console.log("INPUT_WRITER", "selected-text-discovery", {selectedItemText, previousText: lastSelectedKeyText.current, isFocused, selectedKey, controlledInput});setInputValue(selectedItemText);');
    await route.fulfill({response, body});
  });
  await page.route('**/useObjectRef.ts', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace('setRevision((n) => n + 1)', '(console.log("ATTACH_WRITER", new Error().stack), setRevision((n) => n + 1))');
    await route.fulfill({response, body});
  });
  page.on('console', async message => {if (['warning', 'error'].includes(message.type()) || /^(ATTACH_WRITER|INPUT_WRITER)/.test(message.text())) messages.push(message.text());});
  await page.route('**/*main.jsx', async route => {
    const response = await route.fetch();
    const body = await response.text();
    // Use the exact attribution URL from the current app fingerprint, never an
    // absolute unoptimized second runtime. Imported before this fixture's setup.
    await route.fulfill({response, body: 'import {attribution as diagnosticAttribution, costs as diagnosticCosts} from "/.vite/deps/solid-js_attribution.js?v=86f30a21";window.diagnosticAttribution=diagnosticAttribution;window.diagnosticCosts=diagnosticCosts;window.releaseDiagnosticCapture=diagnosticAttribution.enable({historyLimit:2000});\n' + body});
  });
  await page.goto('http://127.0.0.1:4318/' + (process.argv[2] || 'combobox/'));
  await page.waitForTimeout(500);
  const capture = await page.evaluate(() => ({runs: window.diagnosticAttribution.history('rerun'), costs: window.diagnosticCosts()}));
  const output = '/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/diagnostics-initial-' + (process.argv[3] || 'combo') + '.json';
  fs.writeFileSync(output, JSON.stringify({messages, capture}, null, 2));
  console.log(output, capture.runs.length);
  await browser.close();
})().catch(error => {console.error(error); process.exitCode = 1;});
