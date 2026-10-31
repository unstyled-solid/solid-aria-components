import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {transformSync} from '@babel/core';
import solid from '@solidjs/babel-plugin';
import transformer from './MDXTransformer.cjs';
import {expandExampleSwitcher} from '../expand-example-switcher.mjs';

const provider = fileURLToPath(new URL('./native-provider.tsx', import.meta.url));

export async function compileNativeMDX({source, filePath, projectRoot, version = '0.0.0-private'}) {
  const dependencies = new Set();
  let code = expandExampleSwitcher(source).code;
  const asset = {
    filePath, meta: {}, dependencies,
    async getCode() {return code;},
    setCode(value) {code = value;},
    invalidateOnFileChange(name) {dependencies.add(path.resolve(name));},
    addDependency(dependency) {
      if (dependency.specifierType !== 'url') throw new Error(`Unhandled MDX source dependency: ${dependency.specifier}`);
      const resolved = path.resolve(path.dirname(filePath), dependency.specifier);
      dependencies.add(resolved);
      return dependency.specifier;
    }
  };
  const result = await transformer.transform({asset, options: {projectRoot}, config: {version}});
  // Resolve the native provider independently of the caller's page location.
  const jsx = result.code.replace('from "./native-provider"', `from ${JSON.stringify(provider)}`) +
    `\nexport const tableOfContents = ${JSON.stringify(result.metadata.tableOfContents)};\n`;
  const outputs = {};
  for (const generate of ['dom', 'ssr']) {
    const lowered = transformSync(jsx, {
      filename: filePath + '.jsx', configFile: false, babelrc: false,
      parserOpts: {plugins: ['jsx', 'importAttributes']},
      plugins: [[solid, {moduleName: '@solidjs/web', generate, hydratable: true, dev: false}]]
    });
    if (!lowered?.code) throw new Error(`Native ${generate} lowering emitted no code: ${filePath}`);
    outputs[generate] = lowered.code;
  }
  return {jsx, dom: outputs.dom, server: outputs.ssr, metadata: result.metadata,
    dependencies: [...dependencies], sourcePath: filePath};
}

export async function compileNativeMDXFile(filePath, options = {}) {
  const source = await fs.readFile(filePath, 'utf8');
  return compileNativeMDX({source, filePath, projectRoot: options.projectRoot ?? process.cwd(), ...options});
}
