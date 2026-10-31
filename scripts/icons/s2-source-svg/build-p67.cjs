const fs = require('node:fs/promises');
const path = require('node:path');
const {createRequire} = require('node:module');
const {createHash} = require('node:crypto');
const uiTransformer = require('./ui-transformer.cjs').default;
const workflowTransformer = require('../../../packages/@react-spectrum/s2/icons/ChevronRight.source-artifact/generate.cjs');
const nativeTemplate = require('./native-template.cjs');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

async function build() {
  const svgoRequire = createRequire(require.resolve('@svgr/plugin-svgo'));
  let directory = path.dirname(svgoRequire.resolve('svgo'));
  while (!await fs.stat(path.join(directory, 'package.json')).then(() => true, () => false)) directory = path.dirname(directory);
  const svgoVersion = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')).version;
  if (svgoVersion !== '3.3.2') throw new Error('Actual plugin-scoped SVGO3.3.2 required before generation.');
  const svgo = svgoRequire('svgo');
  const manifestPath = path.join(__dirname, 'source-copy.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const uiConfig = JSON.parse(await fs.readFile(path.join(__dirname, 'source-originals/svgo.config.json'), 'utf8'));
  const outputs = [];
  for (const input of manifest.files.filter(file => file.sourcePath.endsWith('.svg'))) {
    const raw = await fs.readFile(path.join(__dirname, input.capturePath));
    if (hash(raw) !== input.sha256 || hash(await fs.readFile(input.sourcePath)) !== input.sha256) throw new Error('Frozen source asset changed: ' + input.sourcePath);
    const name = path.basename(input.sourcePath, '.svg');
    const kind = input.sourcePath.includes('/ui-icons/') ? 'ui' : 'workflow';
    const filePath = path.resolve(input.sourcePath.replace('upstream/react-spectrum/', ''));
    let generated;
    if (kind === 'ui') {
      let code = raw.toString('utf8');
      await uiTransformer.transform({asset: {filePath, getCode: async () => code, setCode: value => {code = value;}},
        config: {svgo: uiConfig, svgoVersion: 3}, options: {projectRoot: process.cwd(), shouldAutoInstall: false,
          packageManager: {require: async module => {if (module !== 'svgo') throw new Error('Unexpected source dependency: ' + module); return svgo;}}}});
      generated = code;
    } else {
      const [result] = await workflowTransformer.transform({asset: {filePath, getCode: async () => raw.toString('utf8')}});
      generated = result.content;
    }
    const destination = kind === 'ui'
      ? `packages/@react-spectrum/s2/ui-icons/generated/${name}.tsx`
      : 'packages/@react-spectrum/s2/icons/FolderBreadcrumb.tsx';
    const native = '/* Generated from frozen Adobe S2 SVG; source/config/license evidence retained in scripts/icons/s2-source-svg. */\n' + nativeTemplate(generated, kind) + '\n';
    const generatedPath = path.join(__dirname, 'source-generated', name + '.tsx.txt');
    await fs.mkdir(path.dirname(generatedPath), {recursive: true});
    await fs.writeFile(generatedPath, generated);
    await fs.mkdir(path.dirname(destination), {recursive: true});
    await fs.writeFile(destination, native);
    outputs.push({name, kind, inputSha256: input.sha256, sourceGeneratedPath: path.relative(__dirname, generatedPath),
      sourceGeneratedSha256: hash(generated), nativeModule: destination, nativeSha256: hash(native),
      wrapper: kind === 'workflow' ? 'canonical native createIcon(callbackComponent)' : 'plain native SVG component; no createIcon sizing/color wrapper'});
  }
  manifest.outputs = outputs;
  manifest.actualSvgoVersion = svgoVersion;
  manifest.uiPipeline = 'Frozen .parcelrc-build generic SVG -> published @parcel/transformer-svg-react2.16.3 source transform with frozen root svgo.config.json';
  manifest.workflowPipeline = 'Frozen .parcelrc-build workflow rule -> source IconTransformer SVGR8.1.0 with tokens14.15.0 and canonical native P61createIcon';
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify(outputs, null, 2));
}
module.exports = build;
if (require.main === module) build().catch(error => {console.error(error); process.exitCode = 1;});
