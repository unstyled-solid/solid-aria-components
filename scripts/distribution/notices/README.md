# P42 actual-graph notice staging

`stage.mjs` is adapted from the terminal-copied reference notice copier.
Original bytes, MIT scaffold license, NOTICE and capture hashes remain in
`reference-originals/` and `source-copy.json`. Base UI's audit/docs imports are
not adopted. No separate graph framework or production source scan is required.

The sole build input is D's actual `distribution/staged/closure.json`, schema1:
`sourceSha`, `sourceEntries:83`, `exportKeys:87`, and `modules` with `source`,
`stem`, `generated`, `declarationOnly`, and resolved `imports`.

```sh
node scripts/distribution/notices/stage.mjs --graph distribution/staged/closure.json
node scripts/distribution/notices/stage.mjs --graph distribution/staged/closure.json --check
```

Import API: `await stageNotices({repository, graph, check})`, using the same
actual graph object. Hashes are derived from real source, generated dictionary
inputs/source-map content, and emitted DOM/server/declaration/map files.
The 34 language modules share the actual `types/i18n/lang.d.ts` wildcard
declaration; index runtime and declaration sources may share one type artifact.

Staging verifies the frozen pin, actual graph counts, current export contract,
complete source entry inclusion, resolved internal dependency inclusion, exact
emitted branch bytes, and private manifest identity. It refuses symlink staging
and unknown existing notice files, never deleting them. `--check` verifies
emitted notice bytes without writing. No unrelated tests/builds are run.

Staged `LICENSE` is the exact frozen Adobe root Apache-2.0 text. Generated
`NOTICE` identifies the original Adobe source and independent native changes,
without endorsement, publication or parity claims. The actual graph and
source-copy ledger hashes are retained in `notices/provenance.json`.

React-derived helpers trigger the genuine captured reference MIT notice with
its exact reference provenance; this is not an invented frozen Adobe NOTICE or
a React runtime dependency. Tooling's Base UI notices do not enter the package.

`isElementVisible.ts` triggers its real inherited MIT attributions. The Vue
source link resolves to `vuejs/test-utils`; `reference-originals/` retains the
genuine LICENSE bytes from the API's immutable Git blob and records the Git
blob/SHA256/source URL separately from the unknown original code-donor revision.
Installed jest-dom license/version is recorded without asserting that it is the
original donor version. Unknown donor code revisions remain explicit provenance
gaps, not missing license text or guessed revisions.

Unknown source origins are scoped gaps. A `staged-with-deferred-notice-gaps`
result does not certify a complete inherited-notice audit or release parity.
It does not block D's build or unrelated notice staging. Spectrum fixture/icon
notices are never swept in; Solid and other external dependencies retain their
own package licenses.
