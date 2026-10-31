import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {renderToString, generateHydrationScript, isServer} from '@solidjs/web';
import {HydrationFixture} from './app.js';
assert.equal(isServer, true);
assert.equal(typeof document, 'undefined');
assert.equal(typeof window, 'undefined');
const records = ['First', 'Second'].map((label, index) => {
  const renderId = `packed-${index}-`;
  const errors: string[] = [];
  const html = renderToString(() => <HydrationFixture label={label} />, {renderId, onError: error => errors.push(String(error))});
  assert.deepEqual(errors, []);
  return {label, renderId, html};
});
await fs.writeFile('ssr-result.json', JSON.stringify({records, bootstrap: generateHydrationScript(), isServer}));
