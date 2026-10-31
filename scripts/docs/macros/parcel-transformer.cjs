// Genuine Parcel JS transformer, with only its macro module loader adapted to
// the owned TS source engine. All symbol collection/asset/linking rules remain Parcel's.
const path = require('node:path');
const fs = require('node:fs/promises');
const {createRequire} = require('node:module');
const configRequire = createRequire(require.resolve('@parcel/config-default'));
const {Transformer} = configRequire('@parcel/plugin');
const original = configRequire('@parcel/transformer-js').default[Symbol.for('parcel-plugin-config')];

module.exports = new Transformer({
  async transform({asset, options, logger}) {
    const {createServer} = await import('vite');
    const root = path.resolve(__dirname, '../../..');
    const loader = await createServer({root, configFile: false, server: {middlewareMode: true, watch: null, hmr: {port: 0}},
      optimizeDeps: {noDiscovery: true, include: []}, appType: 'custom'});
    const packageManager = new Proxy(options.packageManager, {
      get(target, key) {
        if (key === 'require') return async (specifier, from, ...rest) => {
          if (specifier.startsWith('.')) {
            let origin = path.join(root, 'packages/@react-spectrum/s2/src/Provider.tsx');
            const match = from.match(/\/scripts\/docs\/build\/input\/(dom|server)\//);
            if (match) {
              const graph = JSON.parse(await fs.readFile(path.join(root, 'scripts/docs/build/input', match[1], 'graph.json'), 'utf8'));
              const node = graph.nodes.find(node => node.target === from);
              if (!node?.source) throw new Error('Missing actual macro source origin: ' + from);
              origin = path.join(root, node.source);
            }
            const source = path.resolve(path.dirname(origin), specifier);
            return loader.ssrLoadModule('/' + path.relative(root, source).split(path.sep).join('/'));
          }
          return target.require(specifier, from, ...rest);
        };
        const value = Reflect.get(target, key);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
    try {
      const nativeOptions = new Proxy(options, {
        get(target, key) {return key === 'packageManager' ? packageManager : Reflect.get(target, key, target);}
      });
      const result = await original.transform({asset, logger, options: nativeOptions,
        config: {inlineFS: false, inlineEnvironment: false, inlineConstants: false,
          isJSX: false, automaticJSXRuntime: false, reactRefresh: false, useDefineForClassFields: true}});
      // Retain every genuine raw CSS asset before Parcel's CSS packager merges it.
      const buildMatch = asset.filePath.match(/\/scripts\/docs\/build\/input\/(dom|server)\/(.*)$/);
      const directory = buildMatch
        ? path.join(root, 'scripts/docs/build', options.env.DOCS_ENV ? 'linked-docs' : 'linked',
          'raw', buildMatch[1], buildMatch[2])
        : path.join(__dirname, options.env.DOCS_ENV ? 'linked-docs' : 'linked',
          'raw', path.basename(path.dirname(asset.filePath)), path.basename(asset.filePath, '.native.js'));
      await fs.mkdir(directory, {recursive: true});
      for (const [index, emitted] of result.slice(1).entries()) {
        if (emitted.type !== 'css') throw new Error(`Unexpected actual macro asset type: ${emitted.type}`);
        await fs.writeFile(path.join(directory, index + '.css'), emitted.content);
      }
      return result;
    } finally {await loader.close();}
  }
});
