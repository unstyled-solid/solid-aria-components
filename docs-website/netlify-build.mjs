import {copyFileSync, existsSync, constants, readdirSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
function run(command, args, cwd = root) {
  execFileSync(command, args, {cwd, stdio: 'inherit'});
}
run('git', ['submodule', 'update', '--init', '--recursive']);
// The captured website retains these packages' source but omits their manifests.
// Its API extractor needs the canonical `source` field (exports/index.ts), not
// the published npm package's dist/types path. Restore metadata only, never
// overwrite the adapted source or an existing manifest.
for (const name of ['react-aria-components', 'react-aria', 'react-stately', '@adobe/react-spectrum']) {
  const relative = `packages/${name}/package.json`;
  const destination = `${root}docs-website/upstream/${relative}`;
  if (!existsSync(destination)) {
    copyFileSync(`${root}upstream/react-spectrum/${relative}`, destination, constants.COPYFILE_EXCL);
  }
}
const website = `${root}docs-website/upstream`;
// Netlify provides these automatically for production and deploy previews.
const origin = new URL(process.env.DOCS_ORIGIN || process.env.DEPLOY_PRIME_URL || process.env.URL || 'http://localhost:8888');
if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash) {
  throw new Error('Documentation origin must be an HTTP(S) origin without a subpath');
}
run('npm', ['ci', '--workspaces=false', '--ignore-scripts', '--legacy-peer-deps'], website);
run('node', ['generate-native-registry.mjs'], website);
// Include nested hook/testing/example pages linked by the captured navigation.
const pages = `${website}/packages/dev/s2-docs/pages/react-aria`;
function entries(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return entries(file);
    // Duplicate source snapshots retain their original, non-standalone import
    // paths. Their legacy URLs redirect to the adapted canonical page below.
    return entry.name.endsWith('.mdx') && entry.name !== 'source.mdx' ? [file] : [];
  });
}
execFileSync(`${website}/node_modules/.bin/parcel`, [
  'build', ...entries(pages), '--target', 'react-static',
  '--config', '.parcelrc-s2-docs', '--dist-dir', '../../../../dist-build',
  // A fresh npm ci can leave Parcel 2's persisted resolver cache referring to
  // the prior dependency tree. Build without it rather than patch dependencies.
  '--no-cache', '--public-url', '/',
], {
  cwd: `${website}/packages/dev/s2-docs`, stdio: 'inherit',
  env: {...process.env, NODE_OPTIONS: '--max-old-space-size=8192', DOCS_ENV: 'dev', DOCS_STATIC_DEPLOY: 'true', DOCS_ORIGIN: origin.origin, PUBLIC_URL: '', LIBRARY: 'react-aria'},
});
const output = `${root}docs-website/dist-build`;
const revision = execFileSync('git', ['rev-parse', '--short', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
const redirects = [
  // These editorial resources are not part of the captured documentation site.
  '/blog https://react-aria.adobe.com/blog/ 302',
  '/blog/* https://react-aria.adobe.com/blog/:splat 302',
  '/llms.txt https://react-aria.adobe.com/llms.txt 302',
  '/releases.xml https://react-aria.adobe.com/releases.xml 302',
  // Preserve upstream aliases/relative links without a blanket SPA fallback.
  '/Dialog /Modal 301',
  '/Modal/Button /Button 301',
  '/NavigationTree/source /NavigationTree 302',
  '/NavigationTree/source.rsc /NavigationTree.rsc 302',
  '/Virtualizer/source /Virtualizer 302',
  '/Virtualizer/source.rsc /Virtualizer.rsc 302',
  // S2 is a separate donor library/site, not part of this React Aria build.
  '/s2 https://react-spectrum.adobe.com/ 302',
  '/s2/* https://react-spectrum.adobe.com/:splat 302',
];
// The captured layout advertises per-page OG PNGs, but its separate image
// generator is not run by this static target. Serve the existing donor brand
// card instead of publishing broken social-image URLs or fetching new fonts.
const socialCard = readdirSync(`${output}/server`).find(file => /^ReactAriaOpenGraph\..*\.webp$/.test(file));
if (!socialCard) throw new Error('Missing captured React Aria social card');
redirects.push(`/og/* /server/${socialCard} 302`);
for (const [name, directory] of [
  ['react-aria-starter', 'docs'],
  ['react-aria-tailwind-starter', 'tailwind'],
  ['react-aria-hooks-starter', 'hooks'],
]) {
  const archive = `${name}.${revision}.zip`;
  // Preserve the captured starter source; these are upstream React starters,
  // not a claim of separately migrated Solid starter applications.
  run('git', ['archive', '--format=zip', `--prefix=${name}/`, `--output=${output}/${archive}`, `HEAD:docs-website/upstream/starters/${directory}`]);
  redirects.push(`/${name} /${archive} 302`);
  redirects.push(`/${name}/ /${archive} 302`);
}
writeFileSync(`${output}/_redirects`, redirects.join('\n') + '\n');
run('node', ['docs-website/check-deployment.mjs']);
