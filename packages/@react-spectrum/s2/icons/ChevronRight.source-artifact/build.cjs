const fs = require('node:fs/promises');
const path = require('node:path');
const {createHash} = require('node:crypto');
const sourceTransformer = require('./generate.cjs');
const nativeTemplate = require('./native-template.cjs');
const {createRequire} = require('node:module');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');

async function build() {
  async function version(resolve, name) {
    let directory = path.dirname(resolve.resolve(name));
    while (!await fs.stat(path.join(directory, 'package.json')).then(() => true, () => false)) directory = path.dirname(directory);
    return JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')).version;
  }
  const svgoRequire = createRequire(require.resolve('@svgr/plugin-svgo'));
  const actualVersions = {};
  for (const name of ['@svgr/core', '@svgr/plugin-svgo', '@svgr/plugin-jsx', '@adobe/spectrum-tokens']) {
    actualVersions[name] = await version(require, name);
  }
  actualVersions.svgo = await version(svgoRequire, 'svgo');
  if (actualVersions.svgo !== '3.3.2') throw new Error('Frozen SVG generation requires plugin-scoped SVGO3.3.2; do not regenerate before root pin readiness.');
  for (const name of ['@svgr/core', '@svgr/plugin-svgo', '@svgr/plugin-jsx']) {
    if (actualVersions[name] !== '8.1.0') throw new Error('Wrong source SVGR version: ' + name);
  }
  if (actualVersions['@adobe/spectrum-tokens'] !== '14.15.0') throw new Error('Wrong source token version.');
  const filePath = path.join(__dirname, 'S2_Icon_ChevronRight_20_N.svg');
  const bytes = await fs.readFile(filePath);
  if (sha(bytes) !== '221f99c4fef47e88e1fa32c89cf4cd02b06f02537d1529f4790d9408480e709c') throw new Error('Frozen ChevronRight bytes changed.');
  const [generated] = await sourceTransformer.transform({asset: {filePath, getCode: async () => bytes.toString('utf8')}});
  const native = '/* Generated from frozen Adobe S2 ChevronRight; Apache-2.0. Source and transform evidence retained adjacent. */\n' +
    nativeTemplate(generated.content) + '\n';
  await fs.writeFile(path.join(__dirname, 'source-generated.tsx.txt'), generated.content);
  await fs.writeFile(path.join(__dirname, '../ChevronRight.tsx'), native);
  const manifestPath = path.join(__dirname, 'source-copy.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  manifest.generated = {sourceGenerated: 'source-generated.tsx.txt', sourceGeneratedSha256: sha(generated.content),
    actualVersions, frozenSvgoVersion: '3.3.2',
    svgoVersionDifference: actualVersions.svgo !== '3.3.2',
    nativeModule: '../ChevronRight.tsx', nativeSha256: sha(native),
    templatePath: 'native-template.cjs', templateSha256: sha(await fs.readFile(path.join(__dirname, 'native-template.cjs'))),
    pipelineAdapterPath: 'generate.cjs', pipelineAdapterSha256: sha(await fs.readFile(path.join(__dirname, 'generate.cjs'))),
    adaptation: 'Source SVGR/SVGO geometry, attributes and token colors unchanged; React imports/forwardRef replaced by canonical native createIcon callback with derived SVG props and props.ref.'};
  manifest.status = 'Actual source transform and native template emitted; qualification reported separately.';
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  return manifest.generated;
}
module.exports = build;
if (require.main === module) build().then(result => console.log(JSON.stringify(result, null, 2))).catch(error => {console.error(error); process.exitCode = 1;});
