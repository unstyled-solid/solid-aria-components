import fs from 'node:fs';
import fg from 'fast-glob';
const base = 'packages/dev/s2-docs/pages/react-aria/';
const files = (await fg([base + '**/solid-*.tsx', base + '**/NativeDemo.tsx'])).filter(file => /export\s+(?:function\s+mount|const\s+mount|default)/.test(fs.readFileSync(file, 'utf8'))).sort();
const entries = files.map(file => {
  const key = file.slice(base.length);
  return `  ${JSON.stringify(key)}: () => import(${JSON.stringify('../pages/react-aria/' + key)}),`;
});
fs.writeFileSync('packages/dev/s2-docs/src/native-registry.ts', '// Generated from real page-local native modules. Browser-only lazy imports.\nexport const nativeModules = {\n' + entries.join('\n') + '\n};\n');
console.log(`Registered ${files.length} real native modules`);
