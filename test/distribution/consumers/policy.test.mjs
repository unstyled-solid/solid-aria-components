import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { parseArgs, conditionSets, selectCondition, inspectArchive, safeArchivePath, sha256, inside,
  pins, assertInventory } from '../../../scripts/distribution/consumers/policy.mjs';
import { isolatedEnvironment } from '../../../scripts/distribution/consumers/process.mjs';

// Synthetic archive bytes are unit inputs only. No package pack/build/install runs.
function tarEntry(name, body = '', type = '0') {
  const content = Buffer.from(body), header = Buffer.alloc(512);
  header.write(name, 0, 100); header.write('0000644\0', 100); header.write('0000000\0', 108); header.write('0000000\0', 116);
  header.write(`${content.length.toString(8).padStart(11, '0')}\0`, 124); header.write('00000000000\0', 136);
  header.fill(32, 148, 156); header.write(type, 156); header.write('ustar\0', 257); header.write('00', 263);
  const sum = header.reduce((total, byte) => total + byte, 0);
  header.write(`${sum.toString(8).padStart(6, '0')}\0 `, 148);
  return Buffer.concat([header, content, Buffer.alloc((512 - content.length % 512) % 512)]);
}
const archive = entries => gzipSync(Buffer.concat([...entries, Buffer.alloc(1024)]));
const metadata = () => tarEntry('package/package.json', '{"name":"example","version":"0.0.0"}');

test('CLI requires absolute explicit input/output and refuses ambiguous or unknown arguments', () => {
  assert.deepEqual(parseArgs(['--tarball', '/tmp/a.tgz', '--output', '/tmp/evidence']), { tarball: '/tmp/a.tgz', output: '/tmp/evidence' });
  for (const input of [[], ['--tarball', 'a.tgz', '--output', '/tmp/out'], ['--tarball', '/a'], ['--tarball', '/a', '--output', '/o', '--pack', '/b'], ['--tarball', '/a', '--output', '/o', '--output', '/another']]) assert.throws(() => parseArgs(input));
});
test('all 64 condition sets are distinct and export-object order controls selection', () => {
  const sets = conditionSets();
  assert.equal(new Set(sets.map(set => set.join(','))).size, 64);
  const runtime = { types: './types.d.ts', worker: './server.js', browser: './dom.js', deno: './server.js', node: './server.js', default: './server.js' };
  for (const conditions of sets) {
    const expected = conditions.includes('types') ? './types.d.ts' : conditions.includes('worker') ? './server.js' : conditions.includes('browser') ? './dom.js' : './server.js';
    assert.equal(selectCondition(runtime, conditions), expected);
    assert.equal(selectCondition({ types: './types.d.ts' }, conditions), conditions.includes('types') ? './types.d.ts' : undefined);
  }
  assert.equal(selectCondition({ worker: './server.js', browser: './dom.js' }, ['browser', 'worker']), './server.js');
});
test('archive inspection records checksum and actual file content hashes', () => {
  const bytes = archive([metadata(), tarEntry('package/dom/index.js', 'export const value = 1;')]);
  const result = inspectArchive(bytes);
  assert.equal(result.sha256, sha256(bytes));
  assert.equal(result.files.get('dom/index.js').toString(), 'export const value = 1;');
  assert.equal(result.inventory[1].sha256, sha256('export const value = 1;'));
});
test('malicious paths, links, duplicate entries and extraction collisions fail closed', () => {
  for (const name of ['outside/a', 'package/../a', 'package//a', 'package/a/./b', 'package/\\a', 'package/%2e%2e/a', 'package//absolute']) assert.throws(() => safeArchivePath(name));
  for (const entry of [tarEntry('package/link', '../elsewhere', '2'), tarEntry('package/hard', '', '1'), tarEntry('package/device', '', '3')]) assert.throws(() => inspectArchive(archive([metadata(), entry])), /links\/special/);
  assert.throws(() => inspectArchive(archive([metadata(), metadata()])), /Duplicate/);
  assert.throws(() => inspectArchive(archive([metadata(), tarEntry('package/dom', 'file'), tarEntry('package/dom/index.js', '')])), /file used as directory/);
  assert.throws(() => inspectArchive(archive([metadata(), tarEntry('package/dom/index.js', ''), tarEntry('package/dom', 'file')])), /directory replaced/);
});
test('truncated/corrupt tar headers and unreviewed PAX metadata cannot pass', () => {
  const broken = metadata(); broken[1] ^= 1;
  assert.throws(() => inspectArchive(archive([broken])), /checksum/);
  assert.throws(() => inspectArchive(gzipSync(metadata())), /terminator/);
  assert.throws(() => inspectArchive(archive([metadata(), tarEntry('package/pax', '21 linkpath=outside\n', 'x')])), /PAX/);
});
test('PAX long paths are read from actual metadata rather than the truncated header name', () => {
  const name = `package/dom/${'long'.repeat(30)}.js`;
  const value = `path=${name}\n`;
  let length = value.length + 3;
  while (`${length} ${value}`.length !== length) length = `${length} ${value}`.length;
  const result = inspectArchive(archive([metadata(), tarEntry('package/PaxHeader', `${length} ${value}`, 'x'), tarEntry('truncated-name', 'actual content')]));
  assert.equal(result.files.get(name.slice(8)).toString(), 'actual content');
});
test('packed inventory refuses metadata/peer leaks, omitted notices/docs and nonportable maps', () => {
  const manifest = { name: 'private-fixture', version: '0.0.0', private: true, license: 'Apache-2.0', type: 'module',
    peerDependencies: { 'solid-js': pins['solid-js'], '@solidjs/web': pins['@solidjs/web'] } };
  const contract = { identity: { workspaceName: manifest.name, version: manifest.version, publicationName: null },
    format: { domDirectory: 'dom', serverDirectory: 'server', declarationsDirectory: 'types' } };
  const files = new Map([['package.json', Buffer.from(JSON.stringify(manifest))], ['LICENSE', Buffer.from('Apache License Version 2.0')],
    ['NOTICE', Buffer.from('retained adopted-source notices')], ['README.md', Buffer.from('usage')], ['docs/v0.0.0/button.md', Buffer.from('current Markdown')],
    ['THIRD-PARTY-NOTICES.md', Buffer.from('actual inherited notices')], ['notices/donor-MIT.txt', Buffer.from('donor license')],
    ['notices/provenance.json', Buffer.from(JSON.stringify({notices: [{destination: 'notices/donor-MIT.txt', sha256: sha256('donor license')}]}))]]);
  assert.doesNotThrow(() => assertInventory({ files }, manifest, contract));
  for (const mutate of [value => value.dependencies = { react: '19.3.0' }, value => value.dependencies = { example: 'workspace:*' },
    value => value.peerDependencies['solid-js'] = '^2.0.0-rc.13', value => value.scripts = { postinstall: 'build' }]) {
    const altered = structuredClone(manifest); mutate(altered); assert.throws(() => assertInventory({ files }, altered, contract));
  }
  for (const file of ['LICENSE', 'NOTICE', 'README.md', 'THIRD-PARTY-NOTICES.md', 'notices/provenance.json', 'notices/donor-MIT.txt']) {
    const altered = new Map(files); altered.delete(file); assert.throws(() => assertInventory({ files: altered }, manifest, contract));
  }
  const changedNotice = new Map(files); changedNotice.set('notices/donor-MIT.txt', Buffer.from('changed license'));
  assert.throws(() => assertInventory({files: changedNotice}, manifest, contract), /Changed packed inherited notice/);
  for (const file of ['test/fixture.js', 'dom/fixtures/example.js', 'types/component.test.d.ts', 'src/index.ts', 'extra.js']) {
    const altered = new Map(files); altered.set(file, Buffer.from('leak')); assert.throws(() => assertInventory({ files: altered }, manifest, contract));
  }
  const altered = new Map(files); altered.set('dom/index.js', Buffer.from('export {}'));
  assert.throws(() => assertInventory({ files: altered }, manifest, contract), /sourcemap/);
  altered.set('dom/index.js.map', Buffer.from(JSON.stringify({ sources: ['/Users/owner/private.ts'], sourceRoot: '' })));
  assert.throws(() => assertInventory({ files: altered }, manifest, contract), /Nonportable/);
});
test('external directory containment does not accept sibling-prefix tricks', () => {
  assert(inside('/tmp/approved', '/tmp/approved/run'));
  assert(!inside('/tmp/approved', '/tmp/approved-other/run'));
  assert(!inside('/tmp/approved', '/tmp/approved/../workspace'));
});
test('exact supported backend/tool pins', () => {
  assert.equal(pins['@babel/core'], '7.29.7'); assert.equal(pins.vite, '8.3.2');
  assert.equal(pins.typescript, '5.9.3'); assert.equal(pins['@solidjs/compiler'], '2.0.0-rc.13');
  assert(Object.values(pins).every(version => !/^[~^]|workspace:|npm:|file:/.test(version)));
});
test('consumer environment excludes inherited Node/npm/workspace resolution controls', () => {
  const env = isolatedEnvironment('/tmp/isolated');
  for (const key of ['NODE_PATH', 'NODE_OPTIONS', 'INIT_CWD', 'PNPM_HOME', 'npm_config_prefix', 'npm_config_registry']) assert.equal(env[key], undefined);
  assert.equal(env.npm_config_workspaces, 'false'); assert.equal(env.npm_config_legacy_peer_deps, 'true');
  assert.equal(env.PLAYWRIGHT_BROWSERS_PATH, '/tmp/isolated/browsers');
});
// P43 explicitly excludes the donor qualification-paperwork/replay and
// optional-peer completion platform. Its three corresponding tests are not
// part of this selected runner scope; archive/isolation/source tests remain.
test('authored templates parse with pinned TS syntax parser and contain ordinary package imports', async () => {
  const ts = (await import('typescript')).default;
  const directory = new URL('./templates/', import.meta.url);
  for (const file of ['app.tsx', 'client.tsx', 'server.tsx']) {
    const content = await fs.readFile(new URL(file, directory), 'utf8');
    const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.deepEqual(source.parseDiagnostics, [], `${file}: syntax diagnostics`);
    assert.doesNotMatch(content, /(?:from\s+['"](?:.*\/packages\/solid|workspace:|file:)|resolve:\s*\{\s*alias)/);
  }
});
