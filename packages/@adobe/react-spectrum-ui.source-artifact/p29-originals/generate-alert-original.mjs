import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

// Supply an isolated installation of generator-closure.json, never project upgrades.
const dependencies = process.argv[2];
if (!dependencies) throw new Error('Usage: node generate-alert-original.mjs <isolated-dependency-directory>');
const require = createRequire(path.resolve(dependencies, 'package.json'));
process.chdir(path.resolve(dependencies));
const {transform} = require('@svgr/core');
const output = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(output, '../../../..');
const evidence = JSON.parse(fs.readFileSync(path.join(output, 'p29-evidence.json'), 'utf8'));
function verified(relative, expected) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  if (crypto.createHash('sha256').update(source).digest('hex') !== expected) throw new Error(`Frozen hash mismatch: ${relative}`);
  return source;
}
const compilerPath = 'upstream/react-spectrum/packages/@spectrum-icons/build-tools/compileSVG.js';
const generatorPath = 'upstream/react-spectrum/packages/@spectrum-icons/ui/scripts/generateIcons.cjs';
const compiler = verified(compilerPath, evidence.generators[compilerPath]);
const generator = verified(generatorPath, evidence.generators[generatorPath]);
verified('upstream/react-spectrum/packages/@spectrum-icons/ui/express/SX_Alert_18_N.svg', '5bed518b7bc1edd7d8cec1b618a2e9d81d3737ad31fb840f42bdae54383ea7fe');

// Load the frozen function bodies without executing the generator's write-all driver.
// Imports are supplied explicitly; compiler options, SVG and wrapper template are untouched.
const compileSVG = vm.runInNewContext(
  compiler.slice(compiler.indexOf('export function compileSVG')).replace('export function', 'function') + '\ncompileSVG;',
  {fs, transform}
);
const template = vm.runInNewContext(
  generator.slice(generator.indexOf('const EXPRESS_ICON_MAPPING'), generator.lastIndexOf('\ngenerateIcons(')) + '\ntemplate;',
  {compileSVG, path, __dirname: path.dirname(path.join(root, generatorPath))}
);
const original = template('AlertMedium');
const target = path.join(output, 'AlertMedium.tsx');
if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') !== original) throw new Error('Preserve unfamiliar AlertMedium original');
fs.writeFileSync(target, original);
console.log(target);
console.log(crypto.createHash('sha256').update(original).digest('hex'));
