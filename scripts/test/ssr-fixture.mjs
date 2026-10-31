import { build } from 'vite';
import solid from '@solidjs/vite-plugin';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../../vitest.config.ts';
import {spectrumCSSPlugin} from './spectrum-css-plugin.mjs';
import {intlJsonPlugin} from './intl-plugin.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const output = fileURLToPath(new URL('../../test/ssr-harness/.generated/', import.meta.url));
mkdirSync(output, { recursive: true });
// Keep each compiler and its fresh server process in an exclusive directory.
// Never empty the shared artifact directory while another runner is using it.
const buildOutput = mkdtempSync(join(output, 'run-'));
try {
const sourceFixture = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;
let entry = 'test/ssr-harness/emit.tsx';
if (sourceFixture) {
  entry = join(buildOutput, 'emit.tsx');
  writeFileSync(entry, `import {renderToString, generateHydrationScript, isServer} from '@solidjs/web';
import {${sourceFixture.exportName} as Fixture} from ${JSON.stringify(sourceFixture.filename)};
if (!isServer || typeof document !== 'undefined') throw new Error('HARNESS_SERVER_CONDITIONS');
process.stdout.write(JSON.stringify({isServer, bootstrap: generateHydrationScript({eventNames: []}), html: renderToString(() => <Fixture />)}));`);
}
await build({
  root, configFile: false, logLevel: 'error', resolve: config.resolve,
   plugins: [solid({ compiler: 'babel', ssr: true }), spectrumCSSPlugin(), intlJsonPlugin()],
  build: { ssr: entry, outDir: buildOutput, emptyOutDir: !sourceFixture, minify: false, rollupOptions: { output: { entryFileNames: 'server.mjs' } } },
});
// A fresh Node process resolves server conditions. Only serialized HTML crosses into the client.
const result = spawnSync(process.execPath, [join(buildOutput, 'server.mjs')], { cwd: root, encoding: 'utf8' });
if (result.status !== 0 || result.stderr) throw new Error(`SSR fixture failed: ${result.stderr || result.stdout}`);
const artifact = JSON.parse(result.stdout);
if (artifact.isServer !== true) throw new Error('HARNESS_SERVER_CONDITIONS');
if (sourceFixture) {
  process.stdout.write(JSON.stringify(artifact));
} else {
// The fixture is deterministic across invocations. Publish the complete JSON
// atomically so existing hydration consumers cannot read a partial write.
const temporaryArtifact = join(buildOutput, 'html.json');
writeFileSync(temporaryArtifact, JSON.stringify(artifact, null, 2));
renameSync(temporaryArtifact, process.env.HARNESS_SSR_ARTIFACT ?? join(output, 'html.json'));
console.log('PASS: isolated production SSR compilation and HTML artifact');
}
} finally {
  rmSync(buildOutput, { recursive: true, force: true });
}
