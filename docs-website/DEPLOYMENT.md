# Netlify deployment

Import `unstyled-solid/solid-aria-components` into Netlify, keep the repository
root as the base directory, and deploy. The root `netlify.toml` supplies the
complete build command and publishes **`docs-website/dist-build`** (not a directory
inside `docs-website/upstream`). No dashboard environment variables, secrets,
paid resources, SSR adapter or npm publication are required.

## Installation and build

- Node 24.22.2 LTS and pnpm 11.8.0 are pinned. Netlify installs the root pnpm
  lockfile with `--frozen-lockfile`; native library sources use those dependencies.
- `node docs-website/netlify-build.mjs` initializes the recorded public
  `upstream/react-spectrum` submodule, never its latest branch tip.
- The committed docs snapshot omits four package manifests while retaining their
  source. The wrapper copies only those missing manifests from the pinned donor
  with no overwrites, allowing the existing API extractor to find `exports/index.ts`.
  It does not alter native library manifests, dependencies, lockfiles or components.
- The isolated website uses its **separate committed npm lockfile**:
  `npm ci --workspaces=false --ignore-scripts --legacy-peer-deps`. Do not run
  `setup.mjs`: it regenerates the captured manifest and changes its build scripts.
- The wrapper generates the native registry and invokes Parcel's `react-static`
  target over all public React Aria MDX entries, including nested hooks, testing,
  release, internationalization and example routes. Duplicate `source.mdx`
  snapshots keep their non-standalone original imports; their legacy navigation
  URLs and RSC requests redirect to the canonical adapted component pages.
  Parcel caching is disabled: reusing its resolver cache after a fresh dependency
  install produced a native resolver panic during clean-install validation.

GitHub and npm registry network access is required. There are no private
submodules or dependency credentials. The captured npm dependency tree currently
reports 10 audit findings (2 low, 7 moderate, 1 high); dependency upgrades are not
part of deployment configuration.

## URLs and routing

`DEPLOY_PRIME_URL` (or `URL`) supplied by Netlify determines the site's own
origin, including serialized navigation/RSC metadata. Asset URLs use `/`.
`DOCS_ENV=dev` selects the **copied source closure** in the donor's resolver; this
is still a production Parcel build, not the development server. Do not switch
it to `production`, which selects an absent donor staging directory.

Parcel emits static HTML, CSS, JavaScript, images and `.rsc` payloads. Publish the
entire output, including `server/` image assets; that directory is not an SSR
function. Netlify's static HTML routing handles extensionless deep links.
Unknown pages retain real 404 responses—there is no SPA fallback.

The build emits narrow redirects for the donor's Dialog alias, a relative
Button link and duplicate source snapshots. The separate S2 site stays on
`react-spectrum.adobe.com`. Blog articles, the donor release feed and its React `llms.txt` stay
on the real upstream `react-aria.adobe.com` host, since they are not captured here.
Starter downloads are ZIP archives of the **captured upstream React starters**,
not separately migrated Solid applications.
Per-page social-image URLs redirect to the captured React Aria brand card;
deployment does not fetch fonts to generate new image artwork.
The deployment-only `DOCS_STATIC_DEPLOY` routing seam makes redirected links use
normal document navigation rather than cross-origin RSC fetches. Ordinary local
development routing is unchanged.

## Local equivalent

With the configured Node and pnpm versions, from repository root:

```sh
pnpm install --frozen-lockfile
node docs-website/netlify-build.mjs
```

For local URL testing the wrapper defaults to `http://localhost:8888`; an optional
local `DOCS_ORIGIN` can select another serving origin. Netlify supplies its own
origin automatically. The site is published at `/`, not `/react-aria/`.

Local output validation is not proof of a hosted Netlify deployment. This work
does not requalify library interactions or claim a full source/visual parity audit.
