// Use the existing stock Vitest/Playwright lane to run copied assertions.
import fs from 'node:fs/promises';
import {spawn} from 'node:child_process';
const input = JSON.parse(await fs.readFile('input.json', 'utf8'));
const mask = Number(process.argv[2]);
const conditions = input.conditionSets[mask];
if (!conditions?.includes('browser') || conditions.includes('worker') || conditions.includes('types')) throw new Error('Not a browser runtime condition set');
await fs.writeFile('vitest.config.mjs', `import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import solid from '@solidjs/vite-plugin';
export default defineConfig({resolve:{conditions:${JSON.stringify(conditions)}},plugins:[solid({compiler:'babel',solid:{hydratable:true}})],test:{include:['browser.test.tsx'],browser:{enabled:true,headless:true,provider:playwright(),instances:[{browser:'chromium'}]}}});`);
await fs.writeFile('browser.test.tsx', `import './hydration-assertions';
import {it,expect} from 'vitest';
import {isServer} from '@solidjs/web';
import {namespaces,imports} from './all-runtime.mjs';
import input from './input.json';
it('executes the actual generated DOM exports by symbol',()=>{
expect(isServer).toBe(false);
const keys=Object.keys(input.contract).filter(k=>input.contract[k].kind==='runtime');
expect(namespaces.length).toBe(83);
keys.forEach((key,i)=>expect(Object.keys(namespaces[i].value).sort()).toEqual(input.symbols[key]));
expect(imports().map(record=>record.key).sort()).toEqual(keys.sort());
});`);
const code = await new Promise((resolve,reject) => {
  const child = spawn(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', '--config', 'vitest.config.mjs'], {stdio:'inherit',env:process.env});
  child.on('error',reject); child.on('close',resolve);
});
if (code !== 0) throw new Error(`Packed browser runner exited ${code}`);
