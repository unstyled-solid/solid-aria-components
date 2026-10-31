const {Resolver} = require('@parcel/plugin');
const fs = require('node:fs');
const path = require('node:path');
const repository = path.resolve(__dirname, '../../../../..');
const website = path.resolve(repository, 'docs-website');
const extensions = ['', '.ts', '.tsx', '.d.ts', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.d.ts'];
function existing(base) {
  return extensions.map(extension => base + extension).find(file => fs.existsSync(file) && fs.statSync(file).isFile());
}
module.exports = new Resolver({
  resolve({specifier, dependency, options}) {
    if (specifier.startsWith('@react-spectrum/s2-docs/')) {
      const filePath = existing(path.join(__dirname, specifier.slice('@react-spectrum/s2-docs/'.length)));
      if (filePath) return {filePath};
    }
    if (['docs', 'docs-json', 'apiCheck'].includes(dependency.pipeline) || /^(docs|docs-json|apiCheck):/.test(dependency.specifier)) {
      const clean = specifier.replace(/^(docs|docs-json|apiCheck):/, '');
      if (clean.startsWith('.') && clean.endsWith('.js')) {
        const base = path.resolve(path.dirname(dependency.resolveFrom), clean.slice(0, -3));
        const filePath = existing(base);
        if (filePath) return {filePath};
      }
      if (clean === 'solid-js' || clean === '@solidjs/web') {
        return {filePath: path.resolve(path.dirname(require.resolve(clean)), '../types/index.d.ts')};
      }
      if (clean === 'react') {
        return {filePath: path.join(path.dirname(require.resolve('@types/react/package.json')), 'index.d.ts')};
      }
      if (clean.startsWith('solid-js/') || clean.startsWith('@solidjs/')) return;
      const parts = clean.split('/');
      const count = clean.startsWith('@') ? 2 : 1;
      const packageName = parts.slice(0, count).join('/');
      const copied = path.resolve(__dirname, '../../', packageName);
      const manifest = path.join(copied, 'package.json');
      if (fs.existsSync(manifest)) {
        const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
        const subpath = parts.slice(count).join('/');
        const filePath = existing(path.join(copied, subpath ? `exports/${subpath}` : pkg.source || 'src/index.ts')) || (subpath && existing(path.join(copied, subpath)));
        if (filePath) return {filePath};
      }
    }
    const source = dependency.resolveFrom || dependency.sourcePath || '';
    // A copied main-page render fence may retain its originating MDX-relative
    // import after extraction into Page/solid-example-N.tsx. Prefer ordinary
    // module-relative resolution; use the real sibling Page.mdx origin only
    // when the extracted file's relative target does not exist.
    if (specifier.startsWith('.') && /\/solid-example-\d+\.tsx$/.test(source)) {
      const directory = path.dirname(source);
      if (fs.existsSync(`${directory}.mdx`) && !existing(path.resolve(directory, specifier))) {
        const filePath = existing(path.resolve(directory, '..', specifier));
        if (filePath) return {filePath};
      }
    }
    const native = source.startsWith(path.join(repository, 'packages') + path.sep) || /\/(?:solid-[^/]+|[^/]+\.solid)\.[jt]sx?$/.test(source) || /\/pages\/react-aria\/.*(?:\/native\/|\/NativeDemo\.tsx$)/.test(source) || (/\.[jt]sx?$/.test(source) && fs.existsSync(source) && /from\s+['"](?:solid-aria-components|solid-js|@solidjs\/web)['"]/.test(fs.readFileSync(source, 'utf8')));
    if (specifier === 'solid-aria-components') return {filePath: path.join(repository, 'packages/react-aria-components/exports/index.ts')};
    if (specifier.startsWith('solid-aria-components/')) {
      const filePath = existing(path.join(repository, 'packages/react-aria-components/exports', specifier.slice('solid-aria-components/'.length)));
      if (filePath) return {filePath};
    }
    if (!native) return;
    if (specifier === 'react-aria-components') return {filePath: path.join(repository, 'packages/react-aria-components/exports/index.ts')};
    if (specifier.startsWith('react-aria-components/')) {
      const filePath = existing(path.join(repository, 'packages/react-aria-components/exports', specifier.slice('react-aria-components/'.length)));
      if (filePath) return {filePath};
    }
    if (specifier === 'client-only' || specifier === 'tslib' || specifier === 'clsx') {
      return {filePath: require.resolve(specifier)};
    }
    if (specifier === 'solid-js' || specifier === '@solidjs/web') {
      const packageRoot = path.resolve(path.dirname(require.resolve(specifier)), '..');
      const production = options.mode === 'production' && process.env.DOCS_DIAGNOSTICS !== '1';
      return {filePath: path.join(packageRoot, 'dist', (specifier === 'solid-js' ? 'solid' : 'web') + (production ? '.js' : '.dev.js'))};
    }
    if (specifier.startsWith('solid-js/') || specifier.startsWith('@solidjs/')) {
      return {filePath: require.resolve(specifier)};
    }
    for (const [prefix, directory] of [
      ['react-aria/private/', 'react-aria/src/'],
      ['react-stately/private/', 'react-stately/src/'],
      ['react-aria/', 'react-aria/exports/'],
      ['react-stately/', 'react-stately/exports/']
    ]) {
      if (specifier.startsWith(prefix)) {
        const filePath = existing(path.join(repository, 'packages', directory, specifier.slice(prefix.length)));
        if (filePath) return {filePath};
      }
    }
    if (['react-aria', 'react-stately'].includes(specifier)) {
      return {filePath: path.join(repository, 'packages', specifier, 'exports/index.ts')};
    }
    if (/^@(react-aria|react-stately|react-types|internationalized)\//.test(specifier)) {
      const [scope, name, ...rest] = specifier.split('/');
      const packageRoot = path.join(repository, 'packages', scope, name);
      const manifest = path.join(packageRoot, 'package.json');
      const sourceField = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, 'utf8')).source : undefined;
      const filePath = existing(path.join(packageRoot, rest.length ? rest.join('/') : sourceField || 'src/index'));
      if (filePath) return {filePath};
    }
  }
});
