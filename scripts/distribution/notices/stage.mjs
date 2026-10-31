// Adapted from the frozen reference notice copier; no Base UI audit/docs dependencies.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const root = fileURLToPath(new URL('../../../', import.meta.url));
const frozen = '3bdef480e85ff135cd485e9f4511b98300127d4b';
const apacheHash = '7dfe6526888bac51759c99f9a51262ba2711a8c12a067f2181609dd9a4066b84';
const reactNoticeHash = '85bc9edafd1dcaa1760871a79226bf12738b0a31fb4f984b325f5d0c0304e49f';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');

async function safe(repository, name) {
  if (typeof name !== 'string' || !name || path.isAbsolute(name) || name.includes('\\') ||
      name.split('/').some(part => !part || part === '.' || part === '..')) {
    throw new Error(`Unsafe repository-relative notice path: ${name}`);
  }
  let current = repository;
  for (const part of name.split('/')) {
    current = path.join(current, part);
    const stat = await fs.lstat(current).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (stat?.isSymbolicLink()) throw new Error(`Symlink notice path: ${name}`);
  }
  return current;
}
async function read(repository, name) {
  return fs.readFile(await safe(repository, name));
}
async function hashedRead(repository, name, expected) {
  if (!/^[a-f0-9]{64}$/.test(expected)) throw new Error(`Missing exact hash: ${name}`);
  const bytes = await read(repository, name);
  if (digest(bytes) !== expected) throw new Error(`Notice/closure bytes changed: ${name}`);
  return bytes;
}
async function maybeRead(repository, name) {
  try { return await read(repository, name); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
async function walk(repository, directory) {
  const result = [];
  async function visit(name) {
    for (const entry of await fs.readdir(await safe(repository, name), {withFileTypes: true})) {
      const file = `${name}/${entry.name}`;
      if (entry.isSymbolicLink()) throw new Error(`Symlink staged notice: ${file}`);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) result.push(file);
    }
  }
  try { await visit(directory); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  return result.sort();
}

function production(name) {
  return !/(?:^|\/)(?:tests?|fixtures?|__fixtures__|proof|diagnostics?|scripts?|test-utils)(?:\/|$)|\.(?:test|spec|browser|typecheck|fixture|test-util)/i.test(name);
}

// Consume D's actual closure schema, deriving hashes from real sources/artifacts.
// Do not make the builder create another graph framework just for notice staging.
async function builtGraph(repository, supplied, destination, contractBytes, policy) {
  const graphPath = `${destination}/closure.json`;
  const raw = await read(repository, graphPath);
  const actual = JSON.parse(raw);
  if (supplied && JSON.stringify(supplied) !== JSON.stringify(actual)) throw new Error('Supplied graph differs from the actual staged closure.');
  if (actual.schemaVersion !== 1 || actual.sourceSha !== frozen || actual.sourceEntries !== 83 || actual.exportKeys !== 87) {
    throw new Error('Wrong actual built source graph/counts.');
  }
  const modules = [];
  for (const node of actual.modules) {
    const record = {path: node.source, stem: node.stem, generated: node.generated,
      declarationOnly: node.declarationOnly, imports: node.imports};
    if (node.generated) {
      const directory = path.posix.dirname(node.source);
      const names = (await fs.readdir(await safe(repository, directory))).filter(name => name.endsWith('.json')).sort();
      if (!names.length) throw new Error(`No actual dictionary inputs: ${node.source}`);
      const inputs = [...names.map(name => `${directory}/${name}`),
        'scripts/distribution/build/closure.mjs', 'packages/@internationalized/string-compiler/src/stringCompiler.js'];
      record.inputs = await Promise.all(inputs.map(async name => ({path: name, sha256: digest(await read(repository, name))})));
    } else record.sha256 = digest(await read(repository, node.source));
    const locale = node.source.startsWith(policy.paths.localizationDirectory + '/') &&
      node.source.endsWith('.mjs') && path.posix.basename(node.source) !== 'index.mjs';
    const typePath = locale ? 'types/i18n/lang.d.ts' : `types/${node.stem}.d.ts`;
    record.typeArtifact = typePath;
    const emitted = node.declarationOnly ? [typePath] : [`dom/${node.stem}.js`, `server/${node.stem}.js`, typePath];
    if (!node.declarationOnly) emitted.push(`dom/${node.stem}.js.map`, `server/${node.stem}.js.map`);
    record.artifacts = await Promise.all(emitted.map(async name => ({path: name,
      sha256: digest(await read(repository, `${destination}/${name}`))})));
    if (node.generated) {
      const map = JSON.parse(await read(repository, `${destination}/dom/${node.stem}.js.map`));
      if (!Array.isArray(map.sourcesContent) || map.sourcesContent.length !== 1 || typeof map.sourcesContent[0] !== 'string') {
        throw new Error(`Generated dictionary lacks its actual source-map content: ${node.source}`);
      }
      record.sha256 = digest(Buffer.from(map.sourcesContent[0]));
    }
    modules.push(record);
  }
  return {schemaVersion: 1, sourceSha: actual.sourceSha, contractSha256: digest(contractBytes),
    buildGraph: {path: graphPath, sha256: digest(raw)}, modules};
}

// Caller supplies the exact successful build graph, never a fresh guessed source scan.
async function verifiedGraph(repository, graph, destination, contractBytes) {
  if (graph?.schemaVersion !== 1 || graph.sourceSha !== frozen ||
      graph.contractSha256 !== digest(contractBytes) || !Array.isArray(graph.modules) || !graph.modules.length) {
    throw new Error('Exact built graph/source/contract required; do not stage notices before D is ready.');
  }
  const contract = JSON.parse(contractBytes);
  const sources = new Set();
  const outputPaths = new Map();
  for (const module of graph.modules) {
    if (sources.has(module.path) || !production(module.path) ||
        typeof module.stem !== 'string' || !module.stem || module.stem.includes('..')) {
      throw new Error(`Duplicate/nonproduction/unsafe closure module: ${module.path}`);
    }
    sources.add(module.path);
    await safe(repository, module.path);
    if (module.generated === true) {
      if (!Array.isArray(module.inputs) || !module.inputs.length) throw new Error(`Generated module needs genuine hashed inputs: ${module.path}`);
      for (const input of module.inputs) await hashedRead(repository, input.path, input.sha256);
    } else {
      await hashedRead(repository, module.path, module.sha256);
    }
    if (!Array.isArray(module.artifacts) || !module.artifacts.length) throw new Error(`No actual emitted artifacts: ${module.path}`);
    const expected = module.declarationOnly
      ? [module.typeArtifact]
      : [`dom/${module.stem}.js`, `server/${module.stem}.js`, module.typeArtifact];
    for (const required of expected) {
      if (!module.artifacts.some(item => item.path === required)) throw new Error(`Missing emitted closure branch: ${required}`);
    }
    for (const artifact of module.artifacts) {
      if (outputPaths.has(artifact.path) && outputPaths.get(artifact.path) !== artifact.sha256) throw new Error(`Conflicting shared declaration artifact: ${artifact.path}`);
      outputPaths.set(artifact.path, artifact.sha256);
      await hashedRead(repository, `${destination}/${artifact.path}`, artifact.sha256);
    }
  }
  for (const entry of Object.values(contract.exports)) {
    if (entry.kind === 'runtime' && !sources.has(entry.source)) throw new Error(`Source export omitted from built graph: ${entry.source}`);
  }
  for (const module of graph.modules) for (const dependency of module.imports ?? []) {
    if (dependency.source && !sources.has(dependency.source)) throw new Error(`Resolved internal import omitted from actual graph: ${dependency.source}`);
  }
  return graph.modules;
}

async function sourceOrigin(repository, name, ledgers) {
  const extractedOrigins = {
    'packages/@react-types/shared/src/pilot.d.ts': {
      sourcePath: 'upstream/react-spectrum/packages/@react-types/shared/src/index.d.ts',
      sourceSha256: 'ad548e7facb6e2121a5a77195b6787e2d4b523fa311cce4af574f377aa81a1e5',
      sourceRanges: [[1, 26]], evidence: 'tracking/PILOT_P01.md:25',
      nativeGlue: 'Selected/reordered source barrel exports; removable omitted; explicit CSSProperties type reexport added.'
    },
    'packages/react-aria/src/interactions/FocusableContext.ts': {
      sourcePath: 'upstream/react-spectrum/packages/react-aria/src/interactions/useFocusable.tsx',
      sourceSha256: '61435a722994d5e10bbfda2d07ef92d26c1f19543a7a5510624777d3093695ba',
      sourceRanges: [[1, 11], [46, 58]], evidence: 'tracking/PILOT_P01.md:49',
      nativeGlue: 'Extracted canonical source context; Solid createContext/children/ref typing and Omit<DOMAttributes, ref> are native adaptation, not independently authored context semantics.'
    },
    'packages/react-aria-components/src/FieldInputContext.ts': {
      sourcePath: 'upstream/react-spectrum/packages/react-aria-components/src/Autocomplete.tsx',
      sourceSha256: 'd83702547a385582a95913c27d37b15e643ef1e49e1d9e03403979f5c531eb14',
      sourceRanges: [[1, 10], [51, 66], [70, 71]], evidence: 'tracking/P02.md:34',
      nativeGlue: 'Source interface/context extracted with Solid createContext and native type import wiring; source field selection and null default retained.'
    }
  };
  if (extractedOrigins[name]) {
    const mapping = extractedOrigins[name];
    const bytes = await hashedRead(repository, mapping.sourcePath, mapping.sourceSha256);
    return {...mapping, sourceCommit: frozen, classification: 'modified-source-derived',
      sourceHashScope: 'whole-original-file; sourceRanges are inclusive 1-based lines, not hash scope',
      text: bytes.toString('utf8')};
  }
  if (!name.startsWith('packages/')) return null;
  const direct = `upstream/react-spectrum/${name}`;
  const original = await maybeRead(repository, direct);
  if (original) return {sourcePath: direct, sourceSha256: digest(original), sourceCommit: frozen, text: original.toString('utf8')};
  // Genuine type-only extractions retain their actual source, not a fake runtime module.
  for (const {packageRoot, ledgerPath, value} of ledgers) {
    for (const entry of value.files ?? []) {
      if (!entry.targetPath || path.posix.normalize(`${packageRoot}/${entry.targetPath}`) !== name) continue;
      const sourcePath = `upstream/react-spectrum/${packageRoot}/${entry.path}`;
      const bytes = await hashedRead(repository, sourcePath, entry.sha256);
      return {sourcePath, sourceSha256: digest(bytes), sourceCommit: frozen, ledgerPath, text: bytes.toString('utf8')};
    }
    for (const extraction of value.extractions ?? []) {
      const target = path.posix.normalize(`${packageRoot}/${extraction.targetPath}`);
      if (target !== name) continue;
      const sourcePath = `upstream/react-spectrum/${packageRoot}/${extraction.sourcePath}`;
      const bytes = await hashedRead(repository, sourcePath, extraction.sourceSha256);
      return {sourcePath, sourceSha256: digest(bytes), sourceCommit: frozen,
        sourceLines: extraction.sourceLines, ledgerPath, text: bytes.toString('utf8')};
    }
  }
  return null;
}

export async function stageNotices({repository = root, graph, destination, check = false} = {}) {
  repository = await fs.realpath(repository);
  const policy = JSON.parse(await read(repository, 'distribution/package-contract.json'));
  destination ??= policy.paths.stagedDirectory;
  if (destination !== policy.paths.stagedDirectory) throw new Error('Stage only into the actual private package directory.');
  const contractBytes = await read(repository, 'distribution/exports.json');
  const manifest = JSON.parse(await read(repository, `${destination}/package.json`));
  if (manifest.private !== true || manifest.name !== policy.identity.workspaceName || policy.identity.publicationName !== null) {
    throw new Error('Notice staging requires the approved private identity, not a publication claim.');
  }
  graph = await builtGraph(repository, graph, destination, contractBytes, policy);
  const modules = await verifiedGraph(repository, graph, destination, contractBytes);
  const files = new Map();
  files.set('LICENSE', await hashedRead(repository, 'upstream/react-spectrum/LICENSE', apacheHash));
  const gaps = [];
  const ledgers = [];
  const provenance = {sourceCommit: frozen, contractSha256: digest(contractBytes),
    graphSha256: digest(json(graph)), buildGraph: graph.buildGraph,
    qualifiedParity: false, sourceLedgers: [], modules: [], notices: [], gaps};
  for (const packageName of policy.native.internalizedPackageRoots) {
    const ledgerPath = `packages/${packageName}.source-copy.json`;
    const bytes = await maybeRead(repository, ledgerPath);
    if (bytes) {
      const value = JSON.parse(bytes);
      if (value.sourceSha !== frozen) throw new Error(`Wrong source pin in adopted-source ledger: ${ledgerPath}`);
      ledgers.push({packageRoot: `packages/${packageName}`, ledgerPath, value});
      provenance.sourceLedgers.push({path: ledgerPath, sha256: digest(bytes)});
    }
  }
  let reactDerived = false;
  let visibilityDerived = false;
  const modified = [];
  for (const module of modules) {
    const record = {path: module.path, sha256: module.sha256, stem: module.stem,
      generated: module.generated === true, inputs: module.inputs, artifacts: module.artifacts};
    const origin = await sourceOrigin(repository, module.path, ledgers);
    if (origin) {
      const {text, ...source} = origin;
      record.origin = source;
      record.modified = module.sha256 !== origin.sourceSha256;
      if (record.modified) modified.push(module.path);
      reactDerived ||= /facebook\/react|portions.*based on code from react/i.test(text);
      visibilityDerived ||= module.path === 'packages/react-aria/src/utils/isElementVisible.ts';
    } else if (module.path.startsWith(policy.paths.localizationDirectory + '/') || module.generated) {
      const generator = module.generated ? 'scripts/distribution/build/closure.mjs' : 'scripts/buildI18n.js';
      record.origin = {kind: 'native-generated-localization', generator,
        generatorSha256: digest(await read(repository, generator))};
    } else {
      gaps.push({kind: 'source-mapping', path: module.path, reason: 'No frozen original/type-extraction mapping; retain source headers and defer exact attribution.'});
    }
    provenance.modules.push(record);
  }
  if (reactDerived) {
    const sourcePath = 'scripts/distribution/notices/reference-originals/react-spectrum-React-NOTICE.txt';
    files.set('notices/react-interactions-MIT.txt', await hashedRead(repository, sourcePath, reactNoticeHash));
    provenance.notices.push({destination: 'notices/react-interactions-MIT.txt', sourcePath, sha256: reactNoticeHash,
      provenance: 'Genuine captured reference notice, not an absent frozen Adobe root NOTICE.',
      referenceAttributionCommit: 'b35d5c02fe900badccd0cf1a8f23bb593419f238',
      reactAttributionCommit: 'cc7c1aece46a6b69b41958d731e0fd27c94bfc6c',
      additionalSourceAttribution: 'isVirtualEvent cites 3c713d513195a53788b3f8bb4b70279d68b15bcc; original header retained.'});
  }
  if (visibilityDerived) {
    // Inspect real installed artifacts only; do not choose or download guessed donor versions.
    for (const [name, destinationName] of [['@testing-library/jest-dom', 'jest-dom-MIT.txt'], ['@vue/test-utils', 'vue-test-utils-MIT.txt']]) {
      if (name === '@vue/test-utils') {
        const originPath = 'scripts/distribution/notices/reference-originals/vue-test-utils-license-source.json';
        const originBytes = await maybeRead(repository, originPath);
        if (originBytes) {
          const origin = JSON.parse(originBytes);
          const sourcePath = 'scripts/distribution/notices/reference-originals/vue-test-utils-MIT.txt';
          const bytes = await hashedRead(repository, sourcePath, origin.sha256);
          const gitHash = createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex');
          if (origin.license !== 'MIT' || gitHash !== origin.gitBlobSha || !/\bMIT License\b/.test(bytes.toString('utf8'))) {
            throw new Error('Captured source-attributed Vue license/blob mismatch.');
          }
          files.set(`notices/${destinationName}`, bytes);
          provenance.notices.push({destination: `notices/${destinationName}`, sourcePath, sha256: digest(bytes),
            originPath, originSha256: digest(originBytes), ...origin});
          gaps.push({kind: 'donor-code-revision', path: 'packages/react-aria/src/utils/isElementVisible.ts', donor: name,
            licenseTextVerified: true, reason: 'Genuine attributed-repository MIT license/blob verified; original code donor revision remains unpinned in the frozen source header.'});
          continue;
        }
      }
      const sourcePath = `node_modules/${name}/LICENSE`;
      // node_modules package links are legitimate artifact origins, never stage destinations.
      let bytes, pkg;
      try {
        bytes = await fs.readFile(path.join(repository, sourcePath));
        pkg = JSON.parse(await fs.readFile(path.join(repository, `node_modules/${name}/package.json`)));
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      const retained = bytes && pkg?.name === name && pkg.license === 'MIT' && /\bMIT License\b/.test(bytes.toString('utf8'));
      if (retained) {
        files.set(`notices/${destinationName}`, bytes);
        provenance.notices.push({destination: `notices/${destinationName}`, sourcePath, sha256: digest(bytes),
          packageName: name, installedVersion: pkg.version,
          attributionSource: 'upstream/react-spectrum/packages/react-aria/src/utils/isElementVisible.ts:55-58',
          note: 'Installed genuine license text; the source header does not pin the original donor revision.'});
      }
      gaps.push({kind: 'donor-provenance', path: 'packages/react-aria/src/utils/isElementVisible.ts', donor: name,
        reason: retained ? 'Original donor revision unspecified in frozen attribution; installed license retained, exact mapping deferred.'
          : 'Frozen attribution names the MIT donor but no matching installed artifact/license is available; exact text/provenance deferred.'});
    }
  }
  files.set('NOTICE', Buffer.from([
    'Private native Solid port of React Aria Components and its actual internal dependency closure.',
    `Derived from Adobe React Spectrum, https://github.com/adobe/react-spectrum, commit ${frozen}.`,
    'Original Adobe copyright/license notices remain applicable and are retained in source and sourcemaps.',
    'Independent modifications adapt rendering, reactive ownership, refs, events and declarations to native Solid 2.',
    'Localization and staged entrypoint transformations are recorded in notices/provenance.json.',
    'This independent port is not an Adobe or Solid-authored product and implies no endorsement.',
    'No publication, complete runtime parity, or complete inherited-notice audit is claimed.',
    'Solid runtime/renderer remain external peers, not bundled runtime copies.',
    '', 'Modified source modules in this exact graph:', ...modified.sort().map(name => `- ${name}`), '',
  ].join('\n')));
  files.set('THIRD-PARTY-NOTICES.md', Buffer.from([
    '# Actual staged-closure notices', '',
    `Adobe-derived modules: Apache-2.0, frozen source ${frozen}; full text in LICENSE.`,
    ...provenance.notices.map(item => `- ${item.destination}: SHA256 ${item.sha256}; origin ${item.sourcePath}.`),
    '', 'No Spectrum fixture/icon notices are included without an actual imported source mapping.',
    'External dependencies retain their own package licenses; no React runtime is supplied.',
    '', 'Deferred notice gaps (these do not certify notice completeness):',
    ...gaps.map(gap => `- ${gap.path}: ${gap.donor ?? gap.kind}: ${gap.reason}`), '',
  ].join('\n')));
  files.set('notices/provenance.json', json(provenance));
  const readmeOriginalPath = 'scripts/distribution/notices/reference-originals/react-aria-components-README.md';
  const readmeSourcePath = 'upstream/react-spectrum/packages/react-aria-components/README.md';
  const readmeSourceHash = '654cbc0c1d8939a0bd808883ebf1a1cca965e86b9ff657dfdf4378592fcb2960';
  await hashedRead(repository, readmeOriginalPath, readmeSourceHash);
  await hashedRead(repository, readmeSourcePath, readmeSourceHash);
  const readmeTemplatePath = 'scripts/distribution/notices/README.package.md';
  const readmeTemplate = await read(repository, readmeTemplatePath);
  const replacements = {
    PACKAGE_NAME: manifest.name, PACKAGE_VERSION: manifest.version, SOURCE_SHA: frozen,
    EXTERNAL_PEERS: Object.entries(policy.native.externalPeers).map(([name, version]) => `\`${name}@${version}\``).join(', '),
    SOURCE_ENTRIES: Object.values(JSON.parse(contractBytes).exports).filter(entry => entry.kind === 'runtime').length,
    EXPORT_KEYS: Object.keys(manifest.exports).length,
    CONDITIONS: policy.resolution.conditionOrder.map(condition => `\`${condition}\``).join(' → ')
  };
  const readme = Buffer.from(readmeTemplate.toString('utf8').replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    if (!(key in replacements)) throw new Error(`Unknown package README placeholder: ${key}`);
    return String(replacements[key]);
  }));
  files.set('README.md', readme);
  provenance.packageReadme = {destination: 'README.md', sha256: digest(readme),
    classification: 'modified-source-derived', sourcePath: readmeSourcePath,
    sourceCommit: frozen, sourceSha256: readmeSourceHash, sourceHashScope: 'whole-original-file',
    originalCopyPath: readmeOriginalPath, templatePath: readmeTemplatePath,
    templateSha256: digest(readmeTemplate), adaptation: 'Independent private native description and contract-derived usage identity; upstream documentation labeled source references, no React install instructions or parity/publication claims.'};
  files.set('notices/provenance.json', json(provenance));
  // Preserve reference copier semantics: exact bytes, check-only mode, no unknown notice deletion.
  for (const file of await walk(repository, `${destination}/notices`)) {
    if (!files.has(file.slice(destination.length + 1))) throw new Error(`Unexpected staged notice; reconcile without deletion: ${file}`);
  }
  for (const [name, bytes] of files) {
    const file = `${destination}/${name}`;
    const current = await maybeRead(repository, file);
    if (current?.equals(bytes)) continue;
    if (check) throw new Error(`Missing/changed staged notice: ${name}`);
    const target = await safe(repository, file);
    await fs.mkdir(path.dirname(target), {recursive: true});
    await safe(repository, file);
    await fs.writeFile(target, bytes);
  }
  return {status: gaps.length ? 'staged-with-deferred-notice-gaps' : 'staged', files: [...files.keys()], gaps};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const graphIndex = args.indexOf('--graph');
    if (graphIndex < 0 || !args[graphIndex + 1] || args.some((arg, i) => arg !== '--check' && i !== graphIndex && i !== graphIndex + 1)) {
      throw new Error('Usage: stage.mjs --graph <exact D-built graph.json> [--check]');
    }
    const graph = JSON.parse(await read(root, args[graphIndex + 1]));
    console.log(JSON.stringify(await stageNotices({graph, check: args.includes('--check')}), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
