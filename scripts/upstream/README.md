# Adobe source updater

Source registry: `react-spectrum`, using the existing
`tracking/upstream/react-spectrum.json` and `upstream/react-spectrum` gitlink.
All packages share that monorepo SHA. No separate donor pins are installed.

`node scripts/upstream/cli.mjs status` is read-only/offline. Do not invoke
`init`, `update`, `abandon` or advancing verification on the canonical source
without explicit authorization. Fixture qualification does not advance it.

## Checkout policy

With null `verifiedParitySha`, HEAD remains at `baselineSourceSha`. Fetch may
freeze one immutable range/report and queue later candidates, but cannot change
the migration checkout. After complete initial verification, HEAD follows the
frozen candidate of the active episode, never its queued successor.

The copied transport retains source locks, durable journals, atomic/fsynced
publication, immutable artifacts, ancestry/URL/gitlink/HEAD checks and explicit
dead-owner recovery. A repeated mutation finishes the recorded journal before
fetching. Report commits use reverse topological order. Reports retain the full
binary Git diff and NUL-delimited raw metadata as base64, each hashed over its
original bytes; classifications remain separate.

## Evidence-checked writer

`verify --evidence-path <relative-file> --evidence-hash <sha256>` is check-only.
`--advance` uses the same source lock/journal/recovery protocol. It does not run
tests or manufacture receipts. Supply actual previously executed passing checks.

An explicit `tracking/upstream/library-scope.json` declaration is required:

```json
{"source":"react-spectrum","scopes":[{"id":"<declared family>","requiredChecks":["<original suite>","<strict profile>"]}]}
```

No declaration is created for the unfinished canonical migration. Establish the
entire intended library scope, not only green batches; documentation exclusions
must be explicit in that declaration. Do not hand-edit the parity pin.

The evidence bundle has `schemaVersion:1`, `source`, `scope:"library"`,
`kind:"initial"|"update"`, exact `fromSha`/`toSha`, `reportHash` (null for
initial), the declaration's exact `scopeHash`, empty `blockers`, and one
`results` entry per declared scope. Each result must be `status:"passed"` with
exactly the required `checks`. Each check includes `id`, `status:"passed"`,
`command`, repository-relative receipt `path`, and its exact `sha256`.

Receipts must record matching `scopeId`, `checkId`, `sourceSha`, `command`,
`status:"passed"`, and `exitCode:0`. Partial, blocked, stale or duplicated
scope results cannot promote global parity. Journal replay revalidates the
declaration, bundle and receipts before mutation. Verified artifacts and prior
Git objects are retained; Base UI's Beads approval platform is not inherited.

## Qualification

Only local disposable Git fixtures:

```sh
rtk proxy node --test test/upstream/git/workflow.test.mjs test/upstream/git/verification.test.mjs
```

Originals, their hashes and scaffold notices are retained in
`tracking/upstream/reference-originals/`. Executed results are in
`tracking/upstream/updater-qualification.json`, distinct from parity evidence.
