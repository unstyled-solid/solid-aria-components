// Adapted from the frozen reference declaration builder: check, emit, then stage.
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import {pathToFileURL} from 'node:url';
import {closure,root} from '../build/closure.mjs';
import {assertDiagnostics,portableDeclaration} from './shared.mjs';
// Inferred exported types can introduce import() references absent from source imports.
export async function declarationImports(file,text,node,nodes,resolve) {
  const imports=new Map(node?.imports);
  const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
  const inferred=new Set();
  function visit(n){
    if(ts.isImportTypeNode(n)&&ts.isLiteralTypeNode(n.argument)&&ts.isStringLiteral(n.argument.literal))inferred.add(n.argument.literal.text);
    ts.forEachChild(n,visit);
  }
  visit(ast);
  for(const specifier of inferred)if(!imports.has(specifier)&&node){
    const dependency=await resolve(specifier,node.file);
    if(dependency){
      if(!nodes.has(dependency))throw new Error(`${file}: inferred declaration dependency outside production closure ${specifier}`);
      imports.set(specifier,dependency);
    }
  }
  return imports;
}
export async function buildTypes() {
  const {nodes,policy,manifest,contract,resolve}=await closure();
  const config=ts.readConfigFile(path.join(root,'tsconfig.wave.json'),ts.sys.readFile);
  assertDiagnostics(config.error?[config.error]:[],'Declaration config');
  const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,root);
  const typesRoot=path.join(root,policy.paths.stagedDirectory,'types');
  const options={...parsed.options,noEmit:false,declaration:true,emitDeclarationOnly:true,skipLibCheck:false,allowJs:true,checkJs:false,rootDir:path.join(root,'packages'),outDir:typesRoot};
  const host=ts.createCompilerHost(options);
  const typeNodes=new Map([...nodes.values()].filter(n=>!n.file.endsWith('.mjs')).map(n=>[n.generated?n.file.replace(/\.js$/,'.d.ts'):n.file,n]));
  const originalGet=host.getSourceFile.bind(host);
  host.getSourceFile=(file,version,...rest)=>typeNodes.has(file)?ts.createSourceFile(file,typeNodes.get(file).declarationText??typeNodes.get(file).text,version,true):originalGet(file,version,...rest);
  host.resolveModuleNames=(names,containing)=>names.map(name=>{
    let dependency=typeNodes.get(containing)?.imports.get(name);
    if(nodes.get(dependency)?.generated)dependency=dependency.replace(/\.js$/,'.d.ts');
    return dependency?{resolvedFileName:dependency,extension:dependency.endsWith('.d.ts')?ts.Extension.Dts:dependency.endsWith('.tsx')?ts.Extension.Tsx:dependency.endsWith('.mjs')?ts.Extension.Mjs:ts.Extension.Ts}:ts.resolveModuleName(name,containing,options,host).resolvedModule;
  });
  // Generated dictionary functions are source compiler output, not fabricated declarations.
  const program=ts.createProgram([...typeNodes.keys(),'test/intl.d.ts'],options,host);
  assertDiagnostics(ts.getPreEmitDiagnostics(program),'Production declaration source check');
  const emitted=new Map();
  const result=program.emit(undefined,(file,text)=>emitted.set(path.resolve(file),text));
  assertDiagnostics(result.diagnostics,'Declaration emit');
  if(result.emitSkipped)throw new Error('Declaration emit skipped');
  for(const node of nodes.values())if(node.file.endsWith('.d.ts')||node.generated)emitted.set(path.join(typesRoot,node.stem+'.d.ts'),node.declarationText??node.text);
  const portable=new Map();
  const entryDeclarations=new Set(Object.values(contract.exports).filter(entry=>entry.kind==='runtime').map(entry=>path.join(typesRoot,entry.stem+'.d.ts')));
  for(const [file,text] of emitted){
    const node=[...nodes.values()].find(n=>path.join(typesRoot,n.stem+'.d.ts')===file);
    const imports=await declarationImports(file,text,node,nodes,resolve);
    const transformed=portableDeclaration(file,text,emitted,undefined,specifier=>{
      const dependency=imports.get(specifier);
      if(!dependency)return specifier;
      const target=nodes.get(dependency);
      let relative=path.relative(path.dirname(file),path.join(typesRoot,target.stem+'.d.ts')).split(path.sep).join('/').replace(/\.d\.ts$/,'.js');
      return relative.startsWith('.')?relative:'./'+relative;
    }, policy.native.omitClientOnlyMarker==='staged-entrypoints-only' && entryDeclarations.has(file));portable.set(file,transformed.text);
  }
  await fs.mkdir(typesRoot,{recursive:true});
  for(const [file,text] of portable){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,text);}
  for(const [key,entry] of Object.entries(manifest.exports))if(entry&&typeof entry==='object'&&!key.includes('*')){
    if(!portable.has(path.join(root,policy.paths.stagedDirectory,entry.types)))throw new Error(`${key}: missing emitted declaration ${entry.types}`);
  }
  console.log(`Emitted ${portable.size} actual declarations; complete explicit types targets for ${Object.keys(manifest.exports).length} contracted export keys.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)buildTypes().catch(e=>{console.error(e.message);process.exitCode=1;});
