import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
const require = createRequire(import.meta.url);
const glob = require('glob').sync;
const fs = require('fs');
const {compileStrings} = require('@internationalized/string-compiler');
const {minifySync} = require('@swc/core');

function build(scope, dist, outputDir) {
  let languages = {};
  let deps = {};
  const inputs = glob([`packages/${scope}/intl/**/*.json`, `packages/${dist}/intl/**/*.json`]);
  for (let file of inputs) {
    let parts = file.split('/');
    let lang = parts.at(-1).slice(0, -5);
    let pkg;
    if (parts[1] === 'react-aria' || parts[1] === 'react-stately') {
      pkg = '@' + parts[1] + '/' + parts[3];
    } else if (parts[1] === '@adobe' && parts[2] === 'react-spectrum') {
      pkg = '@react-spectrum/' + parts[4];
    } else {
      pkg = parts[1];
    }
    if (pkg === '@react-spectrum/s2') {
      continue;
    }

    let compiled = compileStrings(JSON.parse(fs.readFileSync(file, 'utf8'))).replace(
      'module.exports = ',
      ''
    );
    let pkgJson = JSON.parse(fs.readFileSync(`packages/${dist}/package.json`, 'utf8'));

    if (!languages[lang]) {
      languages[lang] = {};
    }

    languages[lang][pkg] = compiled;
    deps[pkg] = Object.keys(pkgJson.dependencies);
  }

  for (let pkg in deps) {
    deps[pkg] = deps[pkg].filter(dep => !!deps[dep]);
  }

  if (dist === 'react-aria-components' && (inputs.length !== 782 || Object.keys(languages).length !== 34)) {
    throw new Error(`Assigned RAC localization closure changed: ${inputs.length} JSON inputs, ${Object.keys(languages).length} locales`);
  }
  for (let pkg in deps) {
    if (deps[pkg].length === 0) {
      delete deps[pkg];
    }
  }

  fs.mkdirSync(outputDir, {recursive: true});
  for (let lang in languages) {
    let serialized = '{\n';
    for (let pkg in languages[lang]) {
      serialized += `  "${pkg}": ${languages[lang][pkg]},\n`;
    }
    serialized += '};\n';

    fs.writeFileSync(
      `${outputDir}/${lang}.mjs`,
      minifySync(`export default ${serialized}`, {module: true}).code
    );
  }

  fs.writeFileSync(
    `${outputDir}/lang.d.ts`,
    `import type {LocalizedString} from '@internationalized/string';

type PackageLocalizedStrings = {
  [packageName: string]: Record<string, LocalizedString>
}

declare const strings: PackageLocalizedStrings;
export default strings;
`
  );

  // Generate index files.
  for (let ext of ['.mjs']) {
    let generateImport = (exports, from) =>
      ext === '.mjs' ? `import ${exports} from '${from}'` : `let ${exports} = require('${from}')`;
    let index =
      generateImport(
        '{PackageLocalizationProvider, getPackageLocalizationScript}',
        'react-aria/private/i18n/server'
      ) + ';\n';
    index += generateImport('{LocalizedStringDictionary}', '@internationalized/string') + ';\n';
    index += generateImport('{createComponent}', 'solid-js') + ';\n';
    for (let lang in languages) {
      index += generateImport(lang.replace('-', '_'), `./${lang}${ext}`) + ';\n';
    }

    index += '\nlet dictionary = new LocalizedStringDictionary({\n';
    for (let lang in languages) {
      index += `  "${lang}": ${lang.replace('-', '_')},\n`;
    }

    index += `});

function LocalizedStringProvider(props) {
  return createComponent(PackageLocalizationProvider, {
    get locale() { return props.locale; },
    get strings() { return (props.dictionary === undefined ? dictionary : props.dictionary).getStringsForLocale(props.locale); },
    get nonce() { return props.nonce; }
  });
}

function getLocalizationScript(locale, dict = dictionary) {
  let strings = dict.getStringsForLocale(locale);
  return getPackageLocalizationScript(locale, strings);
}

let deps = ${JSON.stringify(deps)};

function createLocalizedStringDictionary(packages) {
  let strings = {};
  let seen = new Set();
  let addPkg = (pkg) => {
    if (seen.has(pkg)) {
      return;
    }
    seen.add(pkg);

    for (let lang in dictionary.strings) {
      strings[lang] ??= {};
      strings[lang][pkg] = dictionary.strings[lang][pkg];
    }

    for (let dep of deps[pkg] || []) {
      addPkg(dep);
    }
  };

  ${dist === 'react-aria-components' ? "addPkg('react-aria-components');\n" : ''}
  for (let pkg of packages) {
    addPkg(pkg);
  }

  return new LocalizedStringDictionary(strings);
}
`;

    if (ext === '.mjs') {
      index +=
        'export {LocalizedStringProvider, getLocalizationScript, dictionary, createLocalizedStringDictionary};\n';
    } else {
      index += 'exports.LocalizedStringProvider = LocalizedStringProvider;\n';
      index += 'exports.getLocalizationScript = getLocalizationScript;\n';
      index += 'exports.dictionary = dictionary;\n';
      index += 'exports.createLocalizedStringDictionary = createLocalizedStringDictionary;\n';
    }

    fs.writeFileSync(`${outputDir}/index${ext}`, index);
  }

  fs.writeFileSync(
    `${outputDir}/index.d.ts`,
    `import type {JSX} from '@solidjs/web';
import type {LocalizedStringDictionary} from '@internationalized/string';

interface LocalizedStringProviderProps {
  locale: string,
  dictionary?: LocalizedStringDictionary,
  nonce?: string
}

export declare function LocalizedStringProvider(props: LocalizedStringProviderProps): JSX.Element;
export declare function getLocalizationScript(locale: string, dictionary?: LocalizedStringDictionary): string;
export declare const dictionary: LocalizedStringDictionary;
export declare function createLocalizedStringDictionary(packages: string[]): LocalizedStringDictionary;
`
  );

  const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  const outputs = [...Object.keys(languages).map(lang => `${lang}.mjs`), 'index.mjs', 'lang.d.ts', 'index.d.ts'];
  fs.writeFileSync(path.join(outputDir, 'provenance.json'), JSON.stringify({
    sourceSha: '3bdef480e85ff135cd485e9f4511b98300127d4b',
    sourcePath: 'scripts/buildI18n.js',
    sourceHash: '3b7bd321a6d11a2d234bc89f4393e2fa6de2018907eff02c2e4296d798a15273',
    adaptedHash: hash(fileURLToPath(import.meta.url)),
    distribution: dist,
    inputs: inputs.map(file => ({path: file, sha256: hash(file)})),
    packageManifest: {path: `packages/${dist}/package.json`, sha256: hash(`packages/${dist}/package.json`)},
    locales: Object.keys(languages),
    packageKeys: Object.keys(languages[Object.keys(languages)[0]]),
    dependencies: deps,
    outputs: outputs.map(file => ({path: file, sha256: hash(path.join(outputDir, file))}))
  }, null, 2) + '\n');
  console.log(`${dist}: ${inputs.length} JSON inputs, ${Object.keys(languages).length} locales, ${outputs.length} runtime/declaration outputs at ${outputDir}`);
}

// The wider source branches remain available, but only the assigned RAC
// closure is generated by default. Every destination is staged, never authored.
const scopes = {
  'react-aria-components': '{react-aria,react-stately}',
  '@adobe/react-spectrum': '{react-aria,react-stately,react-aria-components}',
  'react-aria': 'react-stately'
};
const dist = process.argv[2] || 'react-aria-components';
if (!(dist in scopes)) {
  throw new Error(`Unknown localization distribution: ${dist}`);
}
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const stageRoot = path.join(root, 'distribution/staging-i18n');
const outputDir = dist === 'react-aria-components' ? stageRoot : path.join(stageRoot, dist);
build(scopes[dist], dist, outputDir);
