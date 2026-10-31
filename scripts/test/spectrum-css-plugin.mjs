import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

// The source Parcel profile treats these .css imports as CSS modules. Route
// actual source files through Vite's standard CSS-module pipeline in both lanes.
export function spectrumCSSPlugin() {
  return {
    name: 'spectrum-source-css-modules',
    enforce: 'pre',
    async resolveId(id, importer) {
      if (id.startsWith('bundle-text:./') && importer) {
        return '\0spectrum-bundle-text:' + resolve(dirname(importer.split('?')[0]), id.slice('bundle-text:'.length));
      }
      if (!id.endsWith('.css') || id.endsWith('.module.css')) return;
      const resolved = await this.resolve(id, importer, {skipSelf: true});
      if (resolved?.id.includes('/packages/@adobe/')) return `${resolved.id}.module.css`;
    },
    load(id) {
      if (id.startsWith('\0spectrum-bundle-text:')) {
        return `export default ${JSON.stringify(readFileSync(id.slice('\0spectrum-bundle-text:'.length), 'utf8'))};`;
      }
      if (id.includes('/packages/@adobe/') && id.endsWith('.css.module.css')) {
        return readFileSync(id.slice(0, -'.module.css'.length), 'utf8');
      }
    }
  };
}
