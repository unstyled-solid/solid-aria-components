# Source-cloned documentation website

Canonical website/source: `upstream/react-spectrum` at
`3bdef480e85ff135cd485e9f4511b98300127d4b`. The whole docs website, starters,
assets, styles and required source/tooling closure were terminal-copied under
`docs-website/upstream`; the original React layout/navigation are retained.

All installation, configuration, caches, logs and edits are confined here.
The native library is a read-only source dependency; no component repairs,
dependency patches, commits or publication are part of this work.

```sh
cd docs-website
node setup.mjs
cd upstream
npm install --cache ../.npm-cache --workspaces=false --ignore-scripts --legacy-peer-deps
npm run dev
```

Full RAC site is intended at `http://localhost:4340/react-aria/`.
`dev:button` and `dev:slice` use the same copied upstream shell/pipeline with
only Button or Slider as the initial entry. See `CHECKPOINT.md` for the actual
currently running command and qualification status, not a presumed green build.

Native page islands follow `ISLANDS.md`. `VisualExample solid="..."` and render
fence `solid="..."` annotations retain original controls and code/source drawers.
React owns the empty island host; native Solid owns descendants/lifecycle and
receives live external prop observations through a docs-local bridge.

The copied docs extractor registers the seven TS declaration kinds supplied by
upstream's real Babel patch, using the extractor's scope API rather than modifying
Babel. `provenance/` preserves the original patches for traceability. The separate
upstream Tailwind declaration patch is NOT applied; see `ISSUES.md`.

Page-local implementation/checks are in `page-results/`. They do not constitute
full website serving, browser interaction or underlying library qualification.
