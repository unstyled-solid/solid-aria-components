// Adapted from the frozen Base UI reference module-preserving distribution builder.
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {closure, root} from './closure.mjs';
import {compile, moduleImports, packageName, verifyToolchain} from './compiler.mjs';
export {root};
export async function validateArtifacts(output, manifest) {
  const missing=[];
  for (const [key,branches] of Object.entries(manifest.exports)) {
    if (!branches) continue;
    for (const target of new Set(typeof branches==='string'?[branches]:Object.values(branches))) {
      if (target.includes('*')) {
        const directory=path.join(output,path.dirname(target));
        const suffix=path.basename(target).slice(1);
        const files=await fs.readdir(directory).catch(()=>[]);
        if(files.filter(f=>f.endsWith(suffix)&&f!=='index.js').length!==34)missing.push(`${key}: expected 34 dictionary artifacts for ${target}`);
        continue;
      }
      if (!await fs.stat(path.join(output,target)).then(s=>s.isFile(),()=>false)) missing.push(`${key}: ${target}`);
    }
  }
  return missing;
}
export async function buildPackage({validate=true}={}) {
  verifyToolchain();
  const {nodes,policy,manifest,contract}=await closure();
  const output=path.join(root,policy.paths.stagedDirectory);
  const external=new Set([...Object.keys(manifest.dependencies??{}),...Object.keys(manifest.peerDependencies??{})]);
  const branches=new Map();
  for (const generate of ['dom','ssr']) {
    const generated=new Map();
    for (const node of nodes.values()) {
      if (node.file.endsWith('.d.ts')) continue;
      const resolveImport=specifier=> {
        const dependency=node.imports.get(specifier);
        if (!dependency) return specifier;
        const target=nodes.get(dependency);
        if (dependency.endsWith('.d.ts')) throw new Error(`${node.file}: declaration-only module in runtime import ${specifier}`);
        let relative=path.posix.relative(path.posix.dirname(node.stem),target.stem+'.js');
        return relative.startsWith('.')?relative:'./'+relative;
      };
      const result=compile(node.text,node.stem+(node.file.endsWith('.tsx')?'.tsx':'.ts'),generate,resolveImport);
      for (const specifier of moduleImports(result.code,node.stem)) {
        if (!specifier.startsWith('.')&&!external.has(packageName(specifier))) throw new Error(`${node.file}: undeclared runtime external ${specifier}`);
      }
      generated.set(node.stem+'.js',result.code+`\n//# sourceMappingURL=${path.posix.basename(node.stem)}.js.map\n`);
      generated.set(node.stem+'.js.map',JSON.stringify(result.map));
    }
    for (const [file,code] of generated) if(file.endsWith('.js')) for(const specifier of moduleImports(code,file)) {
      if(specifier.startsWith('.')&&!generated.has(path.posix.normalize(path.posix.join(path.posix.dirname(file),specifier)))) throw new Error(`${file}: missing emitted runtime dependency ${specifier}`);
    }
    branches.set(generate==='dom'?'dom':'server',generated);
  }
  await fs.mkdir(output,{recursive:true});
  for (const [branch,files] of branches) {
    // Only clean this builder's dedicated output branches; preserve declarations.
    await fs.rm(path.join(output,branch),{recursive:true,force:true});
    for(const [file,text] of files){const target=path.join(output,branch,file);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,text);}
  }
  await fs.writeFile(path.join(output,'package.json'),JSON.stringify(manifest,null,2)+'\n');
  await fs.writeFile(path.join(output,'closure.json'),JSON.stringify({schemaVersion:1,sourceSha:contract.sourceSha,sourceEntries:contract.sourceEntryCount,exportKeys:Object.keys(manifest.exports).length,modules:[...nodes.values()].map(n=>({source:path.relative(root,n.file).split(path.sep).join('/'),stem:n.stem,generated:!!n.generated,declarationOnly:n.file.endsWith('.d.ts'),imports:[...n.imports].map(([specifier,target])=>({specifier,source:path.relative(root,target).split(path.sep).join('/')}))}))},null,2)+'\n');
  const missing=await validateArtifacts(output,manifest);
  console.log(`Runtime: ${nodes.size} closure modules; ${branches.get('dom').size/2} DOM and ${branches.get('server').size/2} server; ${Object.values(contract.exports).filter(e=>e.kind==='runtime').length} source entries / ${Object.keys(manifest.exports).length} export keys.`);
  if((validate?missing:missing.filter(s=>!s.includes('./types/'))).length)throw new Error('Missing artifacts:\n'+missing.join('\n'));
  return {output,missing};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)buildPackage({validate:!process.argv.includes('--runtime-only')}).catch(e=>{console.error(e.stack);process.exitCode=1;});
