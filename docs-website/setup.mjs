import fs from 'node:fs';
import path from 'node:path';

const root = new URL('./upstream/', import.meta.url);
const original = JSON.parse(fs.readFileSync(new URL('package.upstream.json', root)));
const docs = JSON.parse(fs.readFileSync(new URL('packages/dev/s2-docs/package.json', root)));
const dependencies = {...docs.dependencies};
for (const name of ['parcel', '@parcel/config-default', '@parcel/resolver-glob', '@parcel/transformer-inline', '@parcel/transformer-inline-string', '@parcel/transformer-svg-react', '@parcel/packager-react-static', '@parcel/transformer-react-static', '@parcel/optimizer-terser', '@parcel/rust', '@tailwindcss/postcss', 'postcss', 'tailwindcss', '@adobe/spectrum-tokens', 'clsx', 'color-space', 'delta-e', 'tailwind-variants']) {
  dependencies[name] = original.devDependencies[name];
}
dependencies['tailwind-variants'] = '0.3.1';
dependencies['@adobe/spectrum-tokens'] = '14.15.0';
dependencies['tw-animate-css'] = '^1.4.0';
dependencies['tailwindcss-react-aria-components'] = '^2.0.1';
dependencies['lucide-react'] = '^0.517.0';
dependencies.process = '0.11.10';
dependencies.react = '19.3.0';
dependencies['react-dom'] = '19.3.0';
dependencies['react-server-dom-parcel'] = '19.3.0';
dependencies['@parcel/rsc'] = '2.16.3';
dependencies['solid-js'] = '2.0.0-rc.20';
dependencies['@solidjs/web'] = '2.0.0-rc.20';
dependencies['@solidjs/babel-plugin'] = '2.0.0-rc.20';
dependencies['@solidjs/signals'] = '2.0.0-rc.20';
dependencies['@solidjs/compiler'] = '2.0.0-rc.20';
dependencies['@babel/core'] = '7.29.7';
for (const directory of fs.readdirSync(new URL('packages/dev/', root))) {
  const manifest = new URL(`packages/dev/${directory}/package.json`, root);
  if (!fs.existsSync(manifest) || directory === 's2-docs') continue;
  const pkg = JSON.parse(fs.readFileSync(manifest));
  dependencies[pkg.name] = `file:packages/dev/${directory}`;
}
dependencies['@react-spectrum/s2'] = 'file:packages/@react-spectrum/s2';
dependencies['@react-spectrum/ai'] = 'file:packages/@react-spectrum/ai';
dependencies['@adobe/spectrum-css-temp'] = 'file:packages/@adobe/spectrum-css-temp';
// Local file packages retain source/exports, but their upstream test-only Yarn
// patch dependencies are not part of this isolated website installation.
for (const dependency of Object.values(dependencies)) {
  if (typeof dependency !== 'string' || !dependency.startsWith('file:')) continue;
  const manifest = new URL(`${dependency.slice(5)}/package.json`, root);
  const pkg = JSON.parse(fs.readFileSync(manifest));
  delete pkg.devDependencies;
  delete pkg.workspaces;
  fs.writeFileSync(manifest, JSON.stringify(pkg, null, 2) + '\n');
}
fs.writeFileSync(new URL('package.json', root), JSON.stringify({
  name: 'solid-aria-docs-website', private: true,
  scripts: {
    'dev:button': "cd packages/dev/s2-docs && DOCS_ISLAND_SCOPE=Button DOCS_ENV=dev LIBRARY=react-aria parcel pages/react-aria/Button.mdx -p 4340 --target react-static --config .parcelrc-s2-docs --dist-dir ../../../../dist-button --cache-dir ../../../../.parcel-cache-button",
    'dev:slice': "cd packages/dev/s2-docs && DOCS_ISLAND_SCOPE=Slider DOCS_ENV=dev LIBRARY=react-aria parcel pages/react-aria/Slider.mdx -p 4340 --target react-static --config .parcelrc-s2-docs --dist-dir ../../../../dist-slice --cache-dir ../../../../.parcel-cache-slice",
    dev: "cd packages/dev/s2-docs && DOCS_ENV=dev LIBRARY=react-aria parcel 'pages/react-aria/**/*.mdx' -p 4340 --target react-static --config .parcelrc-s2-docs --dist-dir ../../../../dist --cache-dir ../../../../.parcel-cache",
    build: "cd packages/dev/s2-docs && LIBRARY=react-aria parcel build 'pages/react-aria/**/*.mdx' --target react-static --config .parcelrc-s2-docs --dist-dir ../../../../dist --cache-dir ../../../../.parcel-cache"
  }, dependencies,
  '@parcel/resolver-default': original['@parcel/resolver-default'],
  '@parcel/transformer-css': original['@parcel/transformer-css'],
  overrides: {'@mdx-js/react': '2.0.0-rc.2', '@mdx-js/mdx': '2.0.0-rc.2'}
}, null, 2) + '\n');
