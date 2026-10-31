const {chromium} = require('../node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => {
    const warn = console.warn;
    console.warn = function (...args) {
      warn.apply(this, args);
      if (typeof args[0] === 'string' && /EFFECT_RELAY_TEAR|EFFECT_WRITES_OWN_SOURCE/.test(args[0]))
        console.log('DIAGNOSTIC_STACK', new Error().stack);
    };
  });
  page.on('console', message => {if (message.text().includes('DIAGNOSTIC_STACK')) console.log(message.text());});
  await page.goto(process.argv[2] || 'http://127.0.0.1:4318/combobox/');
  await page.waitForTimeout(500);
  await browser.close();
})().catch(error => {console.error(error); process.exitCode = 1;});
