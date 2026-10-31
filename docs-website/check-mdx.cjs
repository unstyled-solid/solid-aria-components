const fs = require('node:fs');
const path = require('node:path');
const r = require('./upstream/node_modules/@parcel/rust');
const root = path.join(__dirname, 'upstream/packages/dev/s2-docs/pages');
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : e.name.endsWith('.mdx') ? [path.join(dir,e.name)] : []); }
(async () => {
  const failures = [];
  const inputs = files(root);
  for (const filename of inputs) {
    try {
      const output = await r.transformAsync({filename,code:fs.readFileSync(filename),module_id:'123',project_root:process.cwd(),inline_fs:false,env:{},type:'mdx',context:'react-server',automatic_jsx_runtime:true,decorators:false,use_define_for_class_fields:false,is_development:false,react_refresh:false,source_maps:false,scope_hoist:false,source_type:'Module',supports_module_workers:true,is_library:false,is_esm_output:false,trace_bailouts:false,is_swc_helpers:false,standalone:false,inline_constants:false});
      if (output.diagnostics?.some(d => d.severity === 'error')) failures.push({filename, diagnostics:output.diagnostics});
    } catch (error) { failures.push({filename, error:String(error), stack:error.stack}); }
  }
  fs.writeFileSync(path.join(__dirname,'mdx-intake-errors.json'),JSON.stringify({total:inputs.length,failures},null,2));
  console.log(JSON.stringify({total:inputs.length,failures:failures.length}));
  process.exitCode = failures.length ? 1 : 0;
})();
