import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import {createRequire} from 'node:module';
const {compileStrings}=createRequire(import.meta.url)('../../../packages/@internationalized/string-compiler/src/stringCompiler.js');
export const root = path.resolve(new URL('../../../', import.meta.url).pathname);
export const readJson = async file => JSON.parse(await fs.readFile(file, 'utf8'));
export async function configuration() {
  return {contract: await readJson(path.join(root, 'distribution/exports.json')), policy: await readJson(path.join(root, 'distribution/package-contract.json')), manifest: await readJson(path.join(root, 'distribution/staged-manifest.json'))};
}
export const production = file => !/(?:^|\/)(?:tests?|fixtures?|__fixtures__|proof|diagnostics?|scripts?|test-utils)(?:\/|$)|\.(?:test|spec|browser|typecheck|fixture|test-util)/i.test(file);
export async function closure() {
  const configurationValue = await configuration();
  const {contract, policy} = configurationValue;
  const nodes = new Map();
  async function resolve(specifier, from) {
    let base;
    if (specifier.startsWith('.')) base = path.resolve(path.dirname(from), specifier);
    else {
      for (const [alias, target] of Object.entries(policy.native.internalModuleAliases).sort((a,b) => b[0].length-a[0].length)) {
        if (alias.endsWith('*') && specifier.startsWith(alias.slice(0,-1))) {base = path.join(root, target.replace('*',specifier.slice(alias.length-1)));break;}
        if (specifier === alias) {base = path.join(root,target);break;}
      }
    }
    if (!base) return null;
    const bare = base.replace(/\.(?:mjs|js|jsx|ts|tsx)$/, '');
    for (const candidate of [base,...['.ts','.tsx','.js','.jsx','.mjs','.d.ts','/index.ts','/index.tsx'].map(ext=>bare+ext)]) {
      if (await fs.stat(candidate).then(s=>s.isFile(),()=>false)) return candidate;
    }
    throw new Error(`${path.relative(root,from)}: missing internal source ${specifier}`);
  }
  async function visit(file) {
    if (nodes.has(file)) return;
    if (!production(file)) throw new Error(`Fixture entered production graph: ${file}`);
    const text = await fs.readFile(file,'utf8');
    const node = {file,text,imports:new Map(),stem:path.relative(path.join(root,'packages'),file).replace(/\.(?:d\.ts|tsx?|jsx?|mjs)$/,'')};
    if (file.startsWith(path.join(root,policy.paths.localizationDirectory)+path.sep)) node.stem='i18n/'+path.basename(file).replace(/\.(?:d\.ts|mjs)$/,'');
    nodes.set(file,node);
    const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
    const literals=[];
    function walk(n) {
      if ((ts.isImportDeclaration(n)||ts.isExportDeclaration(n))&&n.moduleSpecifier&&ts.isStringLiteral(n.moduleSpecifier)) literals.push(n.moduleSpecifier.text);
      if (ts.isImportTypeNode(n)&&ts.isLiteralTypeNode(n.argument)&&ts.isStringLiteral(n.argument.literal)) literals.push(n.argument.literal.text);
      ts.forEachChild(n,walk);
    }
    walk(ast);
    for (const specifier of literals) {
      if (specifier.endsWith('*.json')) {
        const directory=path.resolve(path.dirname(file),specifier.replace('*.json',''));
        const virtual=path.join(directory,'dictionary.js');
        const messages=[];
        for (const name of (await fs.readdir(directory)).filter(n=>n.endsWith('.json')).sort()) {
          const compiled=compileStrings(JSON.parse(await fs.readFile(path.join(directory,name),'utf8')),{format:'esm'});
          messages.push(`${JSON.stringify(name.slice(0,-5))}: ${compiled.replace(/^export default /,'')}`);
        }
        const dictionaryType=await resolve('@internationalized/string',file);
        nodes.set(virtual,{file:virtual,text:`export default {${messages.join(',\n')}};`,declarationText:`import type {LocalizedStrings, LocalizedString} from '@internationalized/string';\ndeclare const messages: LocalizedStrings<string, LocalizedString>;\nexport default messages;`,imports:new Map([['@internationalized/string',dictionaryType]]),stem:path.relative(path.join(root,'packages'),virtual).replace(/\.js$/,''),generated:true});
        node.imports.set(specifier,virtual);
        continue;
      }
      const dependency=await resolve(specifier,file);
      if (dependency) {node.imports.set(specifier,dependency);await visit(dependency);}
      else if (/^(react(?:\/|$)|react-dom|vitest|@testing-library)/.test(specifier)) throw new Error(`${file}: forbidden production dependency ${specifier}`);
    }
  }
  for (const entry of Object.values(contract.exports)) if (entry.kind==='runtime') await visit(path.join(root,entry.source));
  const locales=path.join(root,policy.paths.localizationDirectory);
  for (const name of await fs.readdir(locales)) if (/\.(?:mjs|d\.ts)$/.test(name)) await visit(path.join(locales,name));
  return {...configurationValue,nodes,resolve};
}
