const {Transformer} = require('@parcel/plugin');
const babel = require('@babel/core');
const path = require('node:path');
const repository = path.resolve(__dirname, '../../../../..');
module.exports = new Transformer({
  async transform({asset}) {
    let code = await asset.getCode();
    if (process.env.DOCS_ISLAND_SCOPE && asset.filePath === path.join(__dirname, 'src/NativeDemo.tsx')) {
      code = code.replace('../pages/react-aria/**/solid-*.tsx', `../pages/react-aria/${process.env.DOCS_ISLAND_SCOPE}/solid-*.tsx`);
      code = code.replace("import defaults from '../pages/react-aria/**/NativeDemo.tsx';", 'const defaults = {};');
      asset.setCode(code);
    }
    const native = asset.filePath.startsWith(path.join(repository, 'packages') + path.sep) || /\/(?:solid-[^/]+|[^/]+\.solid)\.[jt]sx?$/.test(asset.filePath) || /\/pages\/react-aria\/.*(?:\/native\/|\/NativeDemo\.tsx$)/.test(asset.filePath) || (/\.[jt]sx?$/.test(asset.filePath) && /from\s+['"](?:solid-aria-components|solid-js|@solidjs\/web)['"]/.test(code));
    if (!native) return [asset];
    const result = await babel.transformAsync(code, {
      filename: asset.filePath, babelrc: false, configFile: false,
      parserOpts: {plugins: ['typescript', 'jsx']},
      plugins: [[require('@solidjs/babel-plugin'), {generate: 'dom', hydratable: false}]],
      sourceMaps: true
    });
    asset.setCode(result.code);
    return [asset];
  }
});
