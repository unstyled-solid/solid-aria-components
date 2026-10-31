// Adapted reference optimized browser execution; existing P43 assertions only.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {spawn} from 'node:child_process';
const original = await fs.readFile('hydration-assertions.tsx','utf8');
for (const variant of ['root','subpath']) {
  const file = `optimized-${variant}.test.tsx`;
  const source = original.replace("from './app.js'", `from './bundles/shake-${variant}/app.js'`).replace("from './ssr-result.json'", `from './ssr-optimized-${variant}.json'`);
  assert(source !== original, 'Missing qualified fixture import join');
  await fs.writeFile(file, source);
}
await fs.writeFile('optimized-control.test.tsx', `import {it,expect} from 'vitest';
import {packedEmpty as empty} from './bundles/shake-empty/app.js';
import {packedEmpty as unused} from './bundles/shake-unused/app.js';
it('executes optimized empty and unused controls without mounted content',()=>{
expect(empty).toBe(true);expect(unused).toBe(true);expect(document.querySelector('section')).toBeNull();
});`);
await fs.writeFile('vitest.optimized.config.mjs', `import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import solid from '@solidjs/vite-plugin';
export default defineConfig({resolve:{conditions:['browser']},plugins:[solid({compiler:'babel',solid:{hydratable:true}})],test:{include:['optimized-*.test.tsx'],browser:{enabled:true,headless:true,provider:playwright(),instances:[{browser:'chromium'}]}}});`);
const code = await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,['node_modules/vitest/vitest.mjs','run','--config','vitest.optimized.config.mjs'],{stdio:'inherit',env:process.env});
  child.on('error',reject);child.on('close',resolve);
});
if(code!==0)throw new Error(`Optimized packed browser assertions failed: ${code}`);
