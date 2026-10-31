# React Aria Components → Solid 2: source-faithful migration plan

## 1. Objective and binding rules

Port React Aria Components and the complete supporting monorepo dependency subset to native Solid 2. Preserve upstream implementation structure, algorithms, observable behavior, component anatomy, accessibility, internationalization, and test coverage. Maintain the port through exact upstream deltas.

The governing order is:

**Pin source → establish source tracking → terminal-copy source and tests unchanged → verify copied bytes → adapt structural boundaries → port two primary component families and their dependencies → pass their complete upstream suites → repeat → qualify distribution → port the actual documentation site.**

1. Do not approximate the source structure.
2. Never start a component, hook, state implementation, or source test by writing an empty replacement file. Copy the actual file first using terminal `cp`, directly or through the skill's copy helper.
3. Bring every needed monorepo dependency, whether named React Aria, React Stately, shared types, internationalization, collection infrastructure, or test utilities. Names are not an inclusion filter.
4. The selected dependency closure, not the entire Spectrum product catalog, defines implementation scope.
5. Preserve source tests, parameters, fixtures, generated cases, actions, assertions, and snapshots. Renderer/lifecycle adaptation is permitted; weakening the behavioral contract is not.
6. A green batch means its entire selected source suite passes against native Solid code. A handful of replacement tests, successful compilation, or mocked dependencies is insufficient.
7. Two components means two primary families plus required supporting implementation. It does not mean a two-file limit or permission to ignore integrated source cases.
8. Source and target are separate. The canonical submodule is read-only to migration work; only the controlled updater changes its checkout.
9. Use the web/source implementation as the canonical reference. Use pinned Solid declarations/runtime as the authority for Solid semantics.
10. If exact parity is impossible at a seam, stop and document the blocker instead of inventing a substitute.
11. Documentation comes after the library. Copy and adapt the actual source site, including its host, styles, assets, navigation, and examples. Do not invent a new documentation website.

This document is a plan, not a report of completed migration. The commands and proposed local tooling below become available during execution; no tests or parity have been claimed here.

### Execution priority: bounded work, durable handoffs

Read `AGENTS.md` for binding execution limits and `HANDOFF.md` for the current checkpoint. These reflect the user's explicit preference: make migration progress, and ask when a seam becomes difficult instead of pursuing unlimited verification/debugging.

- Fix the batch's verification scope before implementation. Source suites remain the behavioral gate; do not invent extra gates as work proceeds.
- After three unsuccessful approaches to the SAME unresolved cause, or ten consecutive investigative calls without a diagnosis/fix, checkpoint and ask. Normal multi-file Solid adaptations and compiler errors being concretely reduced are productive work, not escalation events. The budget carries across chats; no silent reset.
- The first toolchain proof is once-only unless relevant inputs change. Comprehensive distribution/integration qualification happens in Phase F, not after every pair.
- Infrastructure is limited to what enables the next step and the explicitly requested source-maintenance guarantees. Direct test commands and compact existing records are sufficient; a generic orchestration/evidence platform is not a prerequisite.
- A blocked batch may remain blocked while the user decides. Do not weaken tests, claim green, or investigate indefinitely to avoid reporting a blocker.
- Hands-off execution is authorized across successive waves with any number of nonconflicting Migrator lanes. Prefer delegated implementation. Retain exhausted subsets as blocked and continue independent work without per-wave approval; ask only when a global decision/no runnable independent work requires it.
- Update the small checkpoint after meaningful work/results/failed attempts. A fresh chat reads it and the relevant source files instead of rediscovering the project.

The more detailed checks below are phase-specific guidance, not permission to expand every component batch into a universal audit. Where a broad checklist could suggest repeated verification, the cadence in `AGENTS.md` governs.

## 2. Context inspected for this plan

### Pilot result

ProgressBar + Meter pilot complete: **46 copied source tests + shared SSR/hydration proof + strict native types pass**. Use the established Vitest/Babel lane; do not rebuild a Jest adapter. Reusable native conventions and precise scope: `tracking/PILOT_P01.md`. Updater adaptation/full dependency inventory remain pending; user-authorized bounded waves may proceed using exact implementation and complete test-import closure. Parallel Migrator lanes require disjoint file ownership and one shared-code integrator; fewer lanes are appropriate when real dependencies prevent independence.

W01 ColorSwatch + Separator complete for its selected scope: **49 copied source tests** including CollectionBuilder/Color; strict wave and pilot types pass. One dependency-ready Migrator lane executed; interaction candidates' supporting Spectrum fixtures prevented three closed lanes. Ownership, source extractions, and actual results are in the existing P01 record's W01 section. Other families and full-library parity remain unverified.

### Workspace

- Workspace: `/Users/avi/avir-oss/solid-aria-components`.
- At inspection it was not a Git repository and contained an existing `patterns/` directory. Preserve that existing content.
- No existing implementation or project-specific README/AGENTS files were present at the root.
- Planning used immutable upstream HTTP source because GitHub CLI was unavailable. No source checkout, installation, or library migration was performed.

### Concrete upstream revision

Repository: `https://github.com/adobe/react-spectrum.git`

Branch: `main`

Inspected revision, resolved on 2026-10-09:

```text
3bdef480e85ff135cd485e9f4511b98300127d4b
```

[Immutable source tree](https://github.com/adobe/react-spectrum/tree/3bdef480e85ff135cd485e9f4511b98300127d4b).

Use this exact SHA for initial execution so this plan and the copied files correspond. A newer revision requires explicit re-inventory; do not silently substitute a moving `main`.

At this revision:

- `react-aria-components` is version `1.22.0`.
- `react-aria` is version `3.53.0`.
- `react-stately` is version `3.51.0`.
- Implementations are consolidated under `packages/react-aria/src/` and `packages/react-stately/src/`.
- Package public entrypoints are under `exports/`, not an assumed `src/index.ts`.
- Components import both public subpaths and `react-aria/private/*` / `react-stately/private/*` paths.
- The root package uses Yarn `4.18.0`; unit tests use Jest, while native browser tests use Vitest/Playwright.
- Upstream patches `@testing-library/user-event`. Its patch is part of test-environment provenance.
- Browser configuration includes Chromium, Firefox, and WebKit and has explicit IME/clipboard/pointer drivers.

### Files actually read

All upstream paths below refer to that SHA:

```text
README.md
package.json
jest.config.js
jest.ssr.config.js
vitest.browser.config.ts
scripts/setupTests.js
packages/react-aria-components/README.md
packages/react-aria-components/package.json
packages/react-aria-components/exports/index.ts
packages/react-aria-components/src/utils.tsx
packages/react-aria-components/src/Collection.tsx
packages/react-aria-components/src/Button.tsx
packages/react-aria-components/src/ProgressBar.tsx
packages/react-aria-components/src/Meter.tsx
packages/react-aria-components/test/Button.test.js
packages/react-aria-components/test/ProgressBar.test.js
packages/react-aria-components/test/Meter.test.js
packages/react-aria/package.json
packages/react-aria/src/progress/useProgressBar.ts
packages/react-aria/src/meter/useMeter.ts
packages/react-aria/src/collections/CollectionBuilder.tsx
packages/react-aria/test/progress/useProgressBar.test.js
packages/react-stately/package.json
packages/dev/test-utils/package.json
packages/dev/test-utils/src/index.ts
```

The test-helper package named `@react-spectrum/test-utils-internal` lives at `packages/dev/test-utils`; its name does not imply an identically named directory.

The migration skill was read at:

```text
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/SKILL.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/upstream.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/scaffolding.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/copy-and-adapt.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/solid-v2.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/testing.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/distribution.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/documentation.md
/Users/avi/.config/opencode/skills/react-to-solid-v2-port/references/mistakes.md
```

The complete local import graph and expanded source test inventory remain execution deliverables. This plan does not invent their counts or assume guessed test filenames exist.

## 3. Scope discovery: follow actual dependencies

### 3.1 Starting roots

Start with every public root/subpath entrypoint of `packages/react-aria-components`, including:

- Components and every associated part/context/type.
- Re-exported hooks, utilities, collection builders, providers, layouts, data helpers, and unstable exports.
- Locale entrypoints and message inputs.
- The complete component package test tree and the helpers/fixtures it executes.

Reading only component `.tsx` imports misses re-exported public capabilities. Reading only `package.json` dependencies misses private source paths and adds unnecessary package-wide scope.

### 3.2 Closure algorithm

1. Build the workspace package-name → directory map from pinned package manifests.
2. Read all RAC `exports/` files, its manifest export conditions, and its tests.
3. Resolve source imports/re-exports, relative modules, type-only imports, private paths, JSON/CSS/assets, dynamic imports, `require`, macro/glob inputs, and package aliases.
4. Follow edges to a fixed point. Inspect unresolved/computed edges manually; do not silently treat them as external.
5. Add the original tests of the selected supporting implementation and their fixtures/helpers. Follow those tests' executed dependencies too.
6. Repeat until runtime, public types, and the chosen verification suites are closed.
7. Record why each selected directory/file is included and the importing source that requires it.
8. Compute reverse consumers and strongly connected groups. Use these for batch prerequisites and shared-change impact, not alphabetical scheduling.

Use separate edge labels for runtime, type, test, fixture, build/locale, and deferred docs. They explain scope; all needed inputs still get copied.

### 3.3 Expected inclusions

| Area | Handling |
|---|---|
| `packages/react-aria-components/` | Copy the package tree; all public families and source suites are migration scope. |
| `packages/react-aria/` | Copy the needed source/export/test/locale subtrees with their existing paths. |
| `packages/react-stately/` | Copy needed state, collection, data, utility, layout, export, and test subtrees. |
| `packages/@react-types/shared/` | Copy needed shared declarations; adapt React-facing types without erasing generics or widening to `any`. |
| Required `packages/@internationalized/*/` | Bring the required local source/tests; retain framework-neutral algorithms. Resolve exact directories from manifests. |
| `packages/dev/test-utils/` | Copy source helpers, then adapt actual renderer/hook/SSR/lifecycle boundaries. |
| Package providing `@react-spectrum/test-utils` | Resolve its actual manifest location, copy imported drivers/helpers and their dependencies. |
| Root setup/resolver/mocks/browser helpers/patches | Copy the subset necessary to reproduce source test semantics. |
| Framework-neutral third-party dependencies | Retain pinned maintained dependencies; do not replace their algorithms with approximations. |

Copy coherent upstream directories where that preserves meaningful boundaries. Extra files physically captured in a selected directory must be labeled captured-only until selected for adaptation. They are not evidence of a completed larger library port.

A test-helper manifest has Spectrum theme/provider dependencies. Do not recursively port all development dependencies merely because they are listed. Trace used helper exports and actual side effects. If a selected assertion actually executes a Spectrum fixture, bring its required source or record the genuine blocking seam; do not mock away the assertion.

### 3.4 Non-goals

- A standalone complete port of every React Aria or React Stately export that RAC does not need or expose.
- A general port of React Spectrum, Spectrum 2, all Storybooks, release tools, or unrelated monorepo applications.
- A React compatibility renderer, React runtime hidden beneath Solid components, or a Solid 1 port.
- API redesign, new interactions, restyling, changing default classes, or replacing upstream algorithms.
- A documentation redesign or early documentation project.
- Publishing, committing, pushing, or creating a public package identity during the planning/bootstrap task.

## 4. Target layout and identity policy

Preserve upstream relative directory names in the owned target. A directory containing `react` in its historical name does not imply it still executes React.

```text
upstream/react-spectrum/                 # one canonical pinned Git submodule
packages/react-aria-components/           # copied, adapted in place
  exports/
  src/
  test/
  ...source assets retained from intake
packages/react-aria/                     # selected subtrees, original paths
packages/react-stately/
packages/@react-types/shared/
packages/@internationalized/<required>/
packages/dev/test-utils/
...other source-shaped dependency paths
scripts/upstream/                       # adapted skill transport + fixtures
scripts/migration/                      # narrow inventory/batch orchestration
test/harness/                           # adapted native seam checks
tracking/upstream/react-spectrum.json
tracking/upstream/reports/
tracking/source-map.json
tracking/test-map.json
tracking/batches.json
tracking/results/
distribution/                          # build/export contracts
MIGRATION_PLAN.md
```

Source structure takes precedence over the skill's illustrative `packages/solid/src` layout. Do not flatten hooks, state, components, or tests into a newly designed package.

For adapted framework-bound workspaces use collision-free private development identities such as `@solid-aria-port/components`, `@solid-aria-port/aria`, `@solid-aria-port/stately`, and `@solid-aria-port/types-shared`. Preserve paths and record package-name mappings. Final publish names remain a separate decision.

Rewrite module specifiers structurally, including private paths, types, tests, and exports. Do not globally replace prose, warning messages, default `react-aria-*` classes, `data-rac`, snapshots, or licensing text. Keep `useX` filenames/export names initially to maximize correspondence; native semantics matter more than a mass rename to `createX`.

Unadapted captured modules are not installed as fallback React implementations. During incremental work, build and typecheck an explicit closed verified entrypoint set. Retain the full original public entrypoint inventory so narrowing an interim build cannot erase remaining obligations. At completion the full mapped RAC public surface must build.

## 5. Phase A — pinned source and working update machinery

### A1. Establish the repository and source

Before execution read any newly added local instructions and inspect existing files. Initialize Git in the current project, preserving `patterns/` and this plan. Check parent paths before creating directories.

The essential source commands, after directory checks, are:

```sh
git init
git submodule add --branch main https://github.com/adobe/react-spectrum.git upstream/react-spectrum
git -C upstream/react-spectrum checkout --detach 3bdef480e85ff135cd485e9f4511b98300127d4b
git -C upstream/react-spectrum rev-parse HEAD
git -C upstream/react-spectrum status --porcelain=v1 --untracked-files=all
```

`submodule add` stages `.gitmodules`/the gitlink. Ensure the setup gitlink records the detached SHA rather than an incidental newer branch tip. Do not commit. Validate URL, branch, HEAD, gitlink, and absence of source modifications; include ignored files in the updater's stronger cleanliness validation.

Never install dependencies inside this canonical source tree. Use a separate exact-SHA disposable checkout for executing original React tests.

### A2. Copy/adapt the existing updater

Reuse actual files from the skill's `assets/baseui-reference/`:

```text
scripts/upstream/git/state.mjs
scripts/upstream/git/checkout.mjs
scripts/upstream/git/report.mjs
scripts/upstream/git/workflow.mjs
scripts/upstream/git/process.mjs
scripts/upstream/cli.mjs
tracking/upstream-state.schema.json
test/upstream/git/
```

Inspect their imports and copy their full tooling dependency closure. Use the materializer's dry-run first, or terminal-copy selected existing modules and their tests into absent destinations. Do not recreate the transport.

Adapt source registry/defaults, paths, URL, branch, ref namespace, CLI fixtures, and verification integration. Remove assumptions that the source is Base UI or a floating-UI donor. Preserve locks, journals, history validation, immutable reports, and recovery mechanics.

Use a single source record for the Adobe monorepo:

```json
{
  "repositoryUrl": "https://github.com/adobe/react-spectrum.git",
  "branch": "main",
  "submodulePath": "upstream/react-spectrum",
  "baselineSourceSha": "3bdef480e85ff135cd485e9f4511b98300127d4b",
  "fetchedCandidateSha": "3bdef480e85ff135cd485e9f4511b98300127d4b",
  "verifiedParitySha": null
}
```

All selected monorepo packages share this commit. Do not create separate drifting source pins for React Aria and React Stately.

**Initial migration freeze:** until initial full scoped verification, keep the active source at the baseline. An update request may fetch and queue a newer commit but must not advance the migration's working source. Implement and test this explicitly; do not assume the copied updater already models a long initial migration with a null verified pin.

**After initial completion:** the checkout follows the frozen candidate of one active update episode. A newer fetch queues the new tip while the current episode retains its from/to commits and report hash.

`verifiedParitySha` means the entire declared library scope has been verified at that revision. Partial batch passes belong in batch results, not this global field. Deferred documentation is explicitly outside this initial library claim.

### A3. Range reports and recovery

Every update report retains:

- Exact full from/to SHAs and ordered commits with a documented deterministic ordering.
- Raw full monorepo diff, including binary/mode/rename/delete changes, with exact bytes and hash.
- NUL-safe path metadata.
- Separate scope/impact classification; never rewrite the raw diff to contain only selected paths.
- State/report identifiers needed to resume after interruption.

Carry over and execute fixture tests for fresh initialization, no-op, queued updates, dirty source variants, invalid URL/gitlink/HEAD, rewritten history, fetch failure, locks, report tampering, interrupted writes/checkouts, replay/resume, and requested abandonment. Add a fixture for the initial migration freeze and scope-aware verification writer.

Retain these rules:

- Journal before mutation; atomic state publication and fsync.
- Resume an incomplete transaction before another fetch changes inputs.
- Read-only/offline status.
- No reset/clean/stash/force checkout to repair dirty source.
- Unlock only a proven dead local owner using its exact token.
- Never overwrite an existing report with different bytes.
- Preserve prior verified objects and abandoned episode evidence.

Adapt an explicit evidence-checked tested-state writer. Do not inherit Base UI's unrelated tracker approval system, and do not hand-edit the parity SHA to bypass validation.

**A done when:** one clean exact-SHA submodule exists; updater status is correct; transport/recovery fixtures pass; initial migration is frozen; verified parity is still null.

## 6. Phase B — inventory and byte-identical terminal intake

### B1. Establish the inventory before adaptation

Generate compact records for:

- Original repository-relative path, full source SHA, byte hash, and target path.
- Runtime/type/test/asset/helper category and inclusion reason.
- Package/export/subpath mapping.
- Family membership and reverse dependencies.
- Original test file, suite/case identity, parameters, source skip/todo modes, and runner lane.

Use the source's runtime collection where possible to enumerate expanded tests. Static counts are an inventory aid, not proof of execution. Retain original names and parameter domains even when framework wrappers change.

### B2. Perform the actual copy

Use the skill helper, which invokes terminal `cp -Rp` and verifies target bytes. For example, once `packages/` exists and the target package directory is absent:

```sh
node "$HOME/.config/opencode/skills/react-to-solid-v2-port/scripts/copy-first.mjs" \
  --source "$PWD/upstream/react-spectrum/packages/react-aria-components" \
  --target "$PWD/packages/react-aria-components" \
  --sha 3bdef480e85ff135cd485e9f4511b98300127d4b
```

Inspect its dry-run, then repeat exactly with `--apply`. The helper requires `rtk` to be available. Repeat for selected supporting directory roots, preserving relative layout. For a partial package, create only parent directories first and copy non-overlapping absent subtree destinations; do not accidentally precreate the destination the helper is supposed to create.

Copy individual required root configuration/license/mock files with terminal `cp` after checking destinations. Preserve notices, snapshots, fixtures, JSON messages, type specs, and helper generators. Copying an entire RAC package may capture docs/stories; mark them deferred, and do not execute/build their site yet.

If a source symlink exists, stop and inspect it rather than silently dereference it. If a destination exists, do not merge/overwrite; determine whether it is user work or an interrupted intake.

### B3. Intake checkpoint

Before changing any copied implementation or test:

1. Verify every copied file against source bytes/hashes.
2. Preserve the immutable intake manifest; later adapted hashes must not replace original hashes.
3. Record `copied-unadapted`, never `ported` or `passing`.
4. Recheck the canonical source is clean and at the same SHA.
5. Record all unresolved import and test-discovery edges as blockers to finishing inventory.

**B done when:** source-shaped target files and their source tests physically exist, provenance is complete for selected inputs, no component was synthesized, and the dependency/test graph can drive batches.

### B4. Establish the original React test baseline

Use a separate exact-SHA checkout outside the canonical submodule. Read its lockfile, Yarn configuration, patches, engines, and installation scripts before installing. Install using the recorded upstream package manager and immutable lockfile; retain the original source files and configuration. Any necessary environment-only workaround must be recorded rather than silently editing the behavioral oracle.

Run each batch's original tests before or alongside its Solid adaptation. For the first known unit files, the source-side command shape is:

```sh
env STRICT_MODE=1 VIRT_ON=1 yarn jest --ci --runInBand --runTestsByPath \
  packages/react-aria-components/test/ProgressBar.test.js \
  packages/react-aria-components/test/Meter.test.js \
  packages/react-aria/test/progress/useProgressBar.test.js
```

Expand this with the actual supporting-suite inventory. Run browser and SSR cases with upstream's own corresponding configuration and selectors. Preserve relevant `STRICT_MODE`, `VIRT_ON`, locale, timezone, development/production conditions, and source capability predicates rather than assuming default environments are equivalent.

Record expanded case identities, source skips/todos, outcomes, tool versions, and environment. An original failure must be distinguished from a migration failure. A missing installation prerequisite is a blocked baseline, not a passing test.

For ambiguous native behavior, mount the same source-derived fixture in separate React and Solid hosts/contexts and compare DOM/ARIA, focus, native form values, callbacks and ordering. Use this to diagnose discrepancies, not to replace the original assertions with whatever either renderer happens to produce.

## 7. Phase C — structural changes and one native test harness

### C1. Pinned Solid 2 profile

Start from the migration skill's coordinated profile, subject to one registry/peer/engine verification:

- `solid-js`, `@solidjs/web`, `@solidjs/signals`, `@solidjs/compiler`, `@solidjs/babel-plugin`: `2.0.0-rc.13`.
- `@solidjs/vite-plugin`: `3.0.0-next.47`.
- `@solidjs/testing-library`: `1.0.0-beta.3`.
- Use the skill's compatible Babel/Vite/Vitest/TypeScript versions as the initial target-tooling reference; lock all resolved versions and record actual Node/package-manager versions.

Do not mix an arbitrary newer runtime with the RC13 compiler. If another Solid 2 profile is deliberately selected, re-prove the profile and record why. Solid 1 guides and test packages are not applicable.

Keep the original React oracle on its own upstream Yarn lockfile/toolchain. The target may use the skill's pnpm tooling without silently changing the oracle environment.

### C2. Source-shaped structural adaptations

- Adapt copied package manifests to private identities and native peers; preserve entrypoint correspondence.
- Rewrite relevant package imports/exports using AST-aware module-specifier edits.
- Configure JSX/types from `@solidjs/web`, native runtime from `solid-js`, and exactly one coordinated runtime identity.
- Preserve private source import resolution without accidentally publishing private RAC APIs.
- Adapt locale/glob loading from actual source configuration. A missing locale must fail rather than return an empty message map.
- Remove React-only package boundaries such as RAC's `client-only` marker through a documented framework adaptation. Do not disable Solid SSR because of a React Server Components marker.
- Keep framework-neutral algorithm bodies unchanged unless source tests demonstrate a required integration adjustment.
- Do not rewrite all hook bodies mechanically as part of bootstrap.

### C3. Keep source testing semantics

Established unit-test strategy: use the pilot's native Vitest/Babel configuration and copied upstream setup. Preserve source Jest test semantics through explicit local fixture/mock adaptation; do not rebuild the runner or introduce a global React/Jest emulation layer.

The pilot must exercise a real mount, a live prop update, a stateful hook-equivalent, a mock/spy with restoration, fake timers plus an async user event, resource cleanup, and a copied source assertion. It must include upstream's `using` syntax support where relevant.

If the pinned Solid toolchain cannot operate correctly in Jest, document the concrete failure and adopt the skill's tested Vitest lane. In that case explicitly translate/audit `jest.fn`, spies, timer behavior, module isolation/reset, mock hoisting/factories, `requireActual`, and explicit resource disposal. A global `jest = vi` alias is not sufficient evidence of equivalence. This runner decision is closed during the pilot, before mass adaptation.

Browser suites retain the source Vitest/Playwright approach, adapted to Solid compilation and native rendering. Retain source browser projects and capability-specific drivers. SSR uses genuinely separately compiled server and client entries.

### C4. Renderer/helper responsibilities

Adapt copied `packages/dev/test-utils/src/renderOverride` and the helpers it actually imports. Reuse the skill's native renderer implementation at the Solid boundary, with source-specific API adaptation rather than an invented React emulation engine.

Required behavior:

- Render owned factories, e.g. `render(() => <Component />)`, instead of evaluating JSX outside the owner.
- Implement `rerender` through a live props host; do not rerun component setup or remount to simulate React.
- Implement `renderHook` through one owned setup with live inputs/outputs and genuine disposal.
- Adapt fixture `useState`, context providers, refs, and React composition locally while retaining test actions/assertions.
- Handle synchronous/async `act` scheduling at the adapter boundary. No production `flush()` additions to pass React tests.
- Bind queries to the correct document/base element, including portals and shadow roots where source tests use them.
- Preserve native event ordering and user-event patch semantics; copy applicable upstream patch bytes with provenance.
- Retain deliberate warning assertions. Unexpected warnings/errors/unhandled rejections fail tests.
- Preserve source fake-timer scope and cleanup. Do not indiscriminately fake RAF/observers to force timing.
- Retain source snapshots in read-only verification mode; do not regenerate expectations from current Solid output.
- Normalize only explicitly documented framework-generated markers, never meaningful DOM/ARIA/classes/events.

React StrictMode wrappers are framework lifecycle machinery, not a requirement to rerender every Solid component twice. Preserve the observable resource/idempotence invariants through native mount/dispose behavior and document that wrapper translation. Never quietly drop an assertion that relies on lifecycle behavior.

### C5. One toolchain proof

Before multiplying component work, prove:

1. Strict native TSX and one resolved runtime/signals identity.
2. A real DOM mount, reactive update, event, and cleanup.
3. A live update retains the original host node.
4. A server build runs in a fresh process without browser globals.
5. A separately built client hydrates the original SSR host and stable ID relationships.
6. Test selection fails on zero matches; worker crashes and unhandled errors fail the command.

Reuse the skill's existing harness/negative checks. Additional infrastructure diagnostics are not substitutes for source component tests and do not count toward source parity totals.

**C done when:** the harness works with native Solid, source testing semantics are preserved, copied tests can execute, and adapted production imports cannot fall back to React.

## 8. Phase D — first batch: ProgressBar + Meter

These are deliberately chosen from inspected source, not assumed to be the smallest named components.

### Read and adapt these copied files first

```text
packages/react-aria-components/src/ProgressBar.tsx
packages/react-aria-components/src/Meter.tsx
packages/react-aria-components/src/Label.tsx
packages/react-aria-components/src/utils.tsx
packages/react-aria/src/progress/useProgressBar.ts
packages/react-aria/src/meter/useMeter.ts
packages/react-aria/src/label/useLabel.ts
packages/react-aria/src/i18n/useNumberFormatter.ts
packages/react-aria/src/utils/filterDOMProps.ts
packages/react-aria/src/utils/mergeProps.ts
packages/react-stately/src/utils/number.ts
```

Follow actual imports for IDs, locale context, refs, effects, type declarations, and shared tests. The list above is a starting set, not a claim that dependency closure ends there. Confirm all not-yet-read paths against the checkout before editing.

### Source tests already verified to exist

```text
packages/react-aria-components/test/ProgressBar.test.js
packages/react-aria-components/test/Meter.test.js
packages/react-aria/test/progress/useProgressBar.test.js
```

Also include the original tests for every newly adapted supporting helper and the supporting Label behavior. Discover actual file names rather than inventing a `useMeter.test.js` path. Search helpers/generator calls as well as filename matches.

### Required adaptation sequence

1. Keep `clamp` and other neutral numerical algorithms unchanged.
2. Adapt shared DOM/type definitions, prop merging/filtering, refs, label IDs, and locale/formatter access.
3. Adapt `useProgressBar` to live Solid values while preserving defaults, clamping, empty-range handling, formatting, label behavior, and indeterminate behavior.
4. Adapt `useMeter` through the same source dependency, preserving the role override.
5. Adapt the existing `utils.tsx` functions used here: slotted context, context/style merging, render props, slot detection, and `dom` custom rendering/ref validation.
6. Adapt Label under its actual provider ownership.
7. Adapt ProgressBar and Meter in place, including their custom render functions and contexts.
8. Adapt source fixture rendering/provider syntax and execute the complete selected tests.
9. Build verified subpaths and mount one source-derived fixture through built output; perform the shared SSR/hydration proof with the real family.

### Preserve exactly

- Source default classes `react-aria-ProgressBar` and `react-aria-Meter`.
- `role`, ARIA values, ID/label association, global DOM props, and slots.
- `0%` for empty ranges, including the non-zero-bound ProgressBar case.
- Missing `aria-valuenow` and undefined percentage for indeterminate progress.
- Render-prop values, custom class/style functions, and custom host rendering.
- The source warning when required accessible labeling is absent.

**Batch D green only when:** all selected source cases and dependency suites pass, required types and actual native lifecycle/SSR checks pass, no tests were dropped or weakened, and all introduced dependency imports resolve to adapted or truly framework-neutral code.

## 9. Phase E — repeatable two-family batch protocol

### E1. Define each batch before editing it

Each entry in `tracking/batches.json` contains:

- Batch ID, frozen source SHA, and two primary families.
- Their public parts/contexts/types/exports.
- Actual runtime/type dependency closure and prerequisite verified batches.
- Every original test file plus generated/parameterized cases and test-only dependency closure.
- Required execution lanes and source skips/todos.
- Changed shared modules and previously verified reverse consumers.
- Concrete blockers, latest results, and next exact command on interruption.

Do not create dozens of empty component files or speculative interface stubs to represent this schedule.

### E2. Per-batch work order

1. Check source status/frozen pin and previous batch results.
2. Read original implementation AND entire source suite, including helper generators.
3. Confirm files were copied and retain their original provenance.
4. Adapt required state logic, then accessibility/interaction primitives, then component composition. Resolve cycles as a coherent source group.
5. Keep one implementation of each shared renderer, ref, event, focus, collection, state, form, or overlay boundary.
6. Adapt fixture ownership/rendering/scheduling; retain source actions and expected behavior.
7. Run focused failures, then the complete batch source suites, then affected previously green suites.
8. Run source browser/SSR/type lanes and shared-seam checks required by that batch.
9. Review source-to-target test differences for removed assertions, parameter changes, skips, timeout relaxation, snapshot rewriting, and new mocks.
10. Record exact passed scope and actual remaining failures. Only then select the next primary pair.

### E3. Cross-family dependencies are real

At the inspected revision, `Button.test.js` imports Dialog, DialogTrigger, Modal, Heading, Text, and ProgressBar. Its final pending-state case tests that a modal does not open while focus/blur still behave correctly.

Therefore Button cannot be declared green after only its standalone click tests. Bring the real dependency implementation into the batch or satisfy those prerequisites first. Do not replace Dialog/Modal with mocks or temporarily skip the integration case.

Supporting components implemented early are recorded as supporting implementation, not independently verified families unless their own complete assigned suites also pass. A strongly connected dependency cluster may exceed two families internally. Keep two primary targets, expose the larger required work honestly, and retain the same full-suite gate.

### E4. Provisional family queue

This is a coverage-oriented queue based on the inspected RAC public exports. Freeze the exact order only after the local dependency/test graph is available. Move prerequisite pairs earlier; never trim source cases to preserve this table's ordering.

All primary component files are under `packages/react-aria-components/src/`; filenames are shown without that prefix. Parts defined in the same file travel with the family.

| Candidate pair | Key implementation/test focus |
|---|---|
| `ProgressBar.tsx` + `Meter.tsx` | First working slice; labels, slots, formatter, shared rendering. |
| `Text.tsx` + `Heading.tsx` | Contexts, element/ref semantics, composition. |
| `Label.tsx` + `Separator.tsx` | Finish independent supporting-family verification. |
| `Header.tsx` + `Keyboard.tsx` | Structural parts and source DOM contract. |
| `Group.tsx` + `Toolbar.tsx` | Group focus and directional keyboard behavior. |
| `Button.tsx` + `Link.tsx` | Press/hover/focus, pending, forms, router behavior; requires integrated overlay closure. |
| `Dialog.tsx` + `Modal.tsx` | Trigger/state, focus scope/restoration, modal isolation and scroll locking. |
| `Popover.tsx` + `OverlayArrow.tsx` | Placement, dismissal, portal positioning/geometry. |
| `Tooltip.tsx` + `PreviewTrigger.tsx` | Timers, pointer/focus trigger policy, cleanup. |
| `ToggleButton.tsx` + `ToggleButtonGroup.tsx` | Controlled/uncontrolled toggle and group selection. |
| `Checkbox.tsx` + `Switch.tsx` | Include group/field/button variants exposed by these files. |
| `RadioGroup.tsx` + `Form.tsx` | Group state, native form values/reset, validation integration. |
| `Input.tsx` + `TextArea.tsx` | Native values, ref/context composition, input events. |
| `TextField.tsx` + `SearchField.tsx` | Input, validation, clear actions, IME and caret identity. |
| `FieldError.tsx` + `NumberField.tsx` | Error projection and locale-aware numerical editing. |
| `Slider.tsx` + `Disclosure.tsx` | All thumb/track/fill/output parts and disclosure/group state. |
| `Collection.tsx` + `ListBox.tsx` | Native collection bridge, dynamic keys, sections, selection. |
| `Menu.tsx` + `Select.tsx` | Submenus, triggers, hidden form controls, keyboard navigation. |
| `ComboBox.tsx` + `Autocomplete.tsx` | Filtering, editable input, async/controlled selection. |
| `Tabs.tsx` + `Breadcrumbs.tsx` | Selection/navigation and child collections. |
| `GridList.tsx` + `TagGroup.tsx` | Composite grid navigation, removal, drag/drop integration. |
| `Tree.tsx` + `NavigationTree.tsx` | Hierarchies, sections, expansion, item ownership. |
| `Table.tsx` + `Virtualizer.tsx` | Header/body/footer/resizing, scroll/layout; all required layouts included. |
| `DropZone.tsx` + `FileTrigger.tsx` | Native file/drag behavior and focus return. |
| `DateField.tsx` + `Calendar.tsx` | TimeField, segments, range calendar, month/year helpers and locale algorithms. |
| `DatePicker.tsx` + `TokenField.tsx` | DateRangePicker, composed overlays, token input and selection. |
| `ColorSwatch.tsx` + `ColorSwatchPicker.tsx` | Color model, selection, accessibility text. |
| `ColorField.tsx` + `ColorSlider.tsx` | Color parsing/editing/channel values and ColorThumb support. |
| `ColorArea.tsx` + `ColorWheel.tsx` | Pointer/keyboard geometry and track/thumb parts. |
| `ColorPicker.tsx` + `ColorThumb.tsx` | Composed picker and independent shared-part verification. |
| `Toast.tsx` + `Sheet.tsx` | Queues/live announcements, overlay motion and all exposed parts. |
| `SharedElementTransition.tsx` + `SelectionIndicator.tsx` | Motion, interruption, element identity and geometry. |

Do not treat the table as the complete export denominator. Run separate source-derived accounting for `useDragAndDrop.tsx`, `TableLayout.ts`, `GridLayout.ts`, all re-exported data/hooks/layouts/providers/utilities, all declaration exports, subpaths, and any source file not represented above. These attach to owning batches or a final public-utility verification unit. `Collection`, for example, also has public re-exports from React Aria that are not implemented solely in RAC's `Collection.tsx`.

If the actual file extension/location differs, use the pinned export mapping and update the queue before execution. Final coverage is generated from real exports and source tests, not this hand-maintained table.

## 10. Native seams requiring explicit source-grounded adaptation

### Shared props/rendering/context

RAC `utils.tsx` is central, not incidental glue. Preserve `DEFAULT_SLOT`, explicit `slot={null}`, invalid-slot diagnostics, context/local precedence, special style merging, default render values, native host/ref validation, and function-child ownership.

Use live props rather than destructured snapshots. Native Solid merge utilities alone do not implement Adobe's event/class/ID merge semantics. Keep those source rules.

Keep the source `className` capability if needed for fidelity through the shared boundary; map to native host class behavior centrally. Do not rewrite every test to expect different CSS classes. Any intentional native API spelling addition must preserve source capability and be documented, not silently redesign it.

### State transactions

Solid 2 staged writes mean a getter immediately after a setter may still return committed state. Port state algorithms using explicit proposed/accepted values, live callbacks, and controlled refusal/cancellation. Do not mistake requesting a value for the parent accepting it. Do not effect-copy all props into state.

### Events, focus, overlays, forms

Retain press event semantics, native event identity, callback order, touch/virtual-click handling, cancellation, focus-visible modality, and owner-document behavior. Translate React text change semantics to native input handling and bubbling focus to appropriate focusin/focusout behavior.

Refs record nodes; setup-owned effects/resources own cleanup. Preserve currentTarget during native dispatch. Test overlay logical ancestry rather than treating physical portal containment as the entire relationship. Keep native form value/defaultValue/validation/reset behavior and avoid identical text writes that move the caret.

### Collections: explicit architecture gate

The inspected `packages/react-aria/src/collections/CollectionBuilder.tsx` uses a mutable custom Document, immutable collection snapshots, a React portal into that Document, hidden/shallow rendering, and a separate SSR collection construction path.

This is not ordinary DOM Portal substitution. Before marking any collection family green:

1. Copy and inspect `CollectionBuilder.tsx`, `Document.ts`, `BaseCollection.ts`, `Hidden`, `useCachedChildren`, their actual imports, and all corresponding suites.
2. Preserve the collection data algorithms, node ordering/keys, snapshot semantics, text values, and cache invalidation.
3. Establish the native Solid bridge for building/registering collection nodes under real owners. Prove the pinned renderer supports the chosen integration; do not cast a custom Document to HTMLElement and assume compatibility.
4. Preserve contexts across hidden/visible paths and ensure item content is not executed/rendered twice in observable ways.
5. Prove add/remove/reorder/update, nested sections, dynamic dependencies, disabled/selected/focused keys, cleanup, and server-first collection content with copied source cases.
6. Verify client hydration uses existing hosts and correct collection/selection state.

A confirmed framework blocker keeps the family red. A simplified array renderer is not an acceptable fallback for Adobe's collection model.

### Locale/build boundaries

Preserve message dictionaries, locale fallback, number/date/collation behavior, calendar algorithms, RTL navigation, and any source macro inputs. Do not replace internationalized algorithms with browser-local shortcuts or lowercasing. Track required locale loaders/build helpers alongside runtime source.

## 11. Exact batch greenlight policy

Every batch report must distinguish copied, collected, executed, and passing.

| Gate | Required result |
|---|---|
| Provenance | Every adapted source/test/helper maps to the pinned original; intake hashes retained. |
| Test completeness | Every selected original case/parameter/helper-generated case accounted for; no new port skips or `only`. |
| Component suites | Entire suites for both primary families pass. |
| Lower-layer suites | Source suites for newly adapted hooks/state/shared helpers pass. |
| Integration | Actual source cross-family cases pass against real dependencies. |
| Regression | Previously verified consumers affected by shared changes pass. |
| Types | Relevant strict native types, copied type specs, and verified export declarations pass. |
| Browser/SSR | All assigned source browser/SSR cases execute in the correct lanes and pass. |
| Diagnostics | No unexplained errors/warnings or resource failures observed by the assigned checks; no speculative leak-audit project. |
| Built path | Run the native built-consumer proof for the first slice; repeat affected checks when build/export boundaries change. Full package qualification is Phase F. |
| Source safety | Canonical checkout remains clean, at the frozen revision. |

Source skips/todos stay visible and are not reported as passes. A source-active case that fails in both the pristine oracle and the port is a documented upstream failure, not an automatic waiver; the batch remains short of the strict green gate until resolved or the user explicitly accepts an exception. A React-specific lifecycle translation is recorded case-by-case; it cannot conceal lost behavioral coverage.

Native adapter/ownership/hydration checks are additional harness evidence. They never replace source behavior tests or inflate source coverage. Do not author an alternative component test suite and call it the source suite.

### Proposed command contract

Use direct commands for the chosen actual runners initially. Only add a small wrapper when repeated work justifies it; these are possible interfaces, not existing commands or prerequisites for beginning migration:

```sh
pnpm upstream:status --source react-spectrum
pnpm migration:check-copy
pnpm migration:inventory --check
pnpm migration:check-batch --batch B01
pnpm migration:test --batch B01 --lane unit
pnpm migration:test --batch B01 --lane browser
pnpm migration:test --batch B01 --lane ssr
pnpm migration:types --batch B01
pnpm migration:verify --batch B01
```

If introduced, the wrapper expands exact manifest paths, runs non-watch commands, preserves exit codes, rejects empty selections, and writes results only after completion. Until then record exact runner commands and outcomes in the current checkpoint/batch record. A genuinely empty browser lane is recorded as not applicable with an inventory basis, not as a passing run. Verification checks required lanes and whether results still apply; it does not infer a pass from status flags or require building a general evidence system.

Keep results keyed by source revision, target/dependency hashes, test/helper/config hashes, runtime/tool versions, lane, and relevant environment. A shared helper change invalidates dependent results. Do not rerun unrelated unchanged green suites just to recreate paperwork.

## 12. Phase F — integrated library and distribution qualification

After all primary batches:

1. Reconcile the entire RAC root/subpath/type export inventory with the target, including contexts, unstable APIs, re-exported utilities, and locale entries.
2. Verify all runtime/type/test closure edges resolve and all selected supporting modules are accounted for.
3. Run the complete selected source suite across unit/browser/SSR/type lanes in bounded processes. Resume checkpoints only when input fingerprints still match.
4. Build module-preserving DOM/server ESM and real declarations. Match actual pinned Solid condition precedence.
5. Audit imports and emitted declarations for React/ReactDOM/React ambient type leakage. React may exist in the separate oracle, never as an implementation fallback.
6. Audit import-time effects before setting package `sideEffects`; preserve actual registrations/styles where required.
7. Test root and subpath imports by exported symbol, not only entry counts.
8. Pack exact staged artifacts, retain hashes, and install them into independent consumers without workspace aliases, inherited node_modules, or local runtime patches.
9. Verify strict Bundler/NodeNext declarations, one stock Solid runtime, native mount/events, independent server render/hydration, disposal, and optimized tree-shaken behavior.
10. Preserve Adobe license headers/notices and applicable third-party attribution; exclude tests/tooling/fixtures from published runtime/type output.

Only after full declared library scope passes may the tested-state writer set `verifiedParitySha` to the baseline. Keep docs explicitly deferred; do not claim Adobe's entire historical device/assistive-technology testing from automated test success.

## 13. Phase G — maintenance by exact frozen delta

Once baseline parity exists:

1. Read offline status and inspect local target work, source cleanliness, lock/journal, and any active episode.
2. Fetch the recorded branch explicitly. Freeze the returned full candidate SHA.
3. If a migration/update is active, retain its source checkout and queue the newer candidate.
4. Produce the immutable full-range report from the last verified revision to the frozen candidate.
5. Classify every changed path: selected runtime/types/tests/helpers/locale/build/license, new dependency, docs-deferred, unrelated inspected no-op, or unresolved.
6. Recompute affected dependency/test closure, including added/deleted/renamed exports and imports. A previously excluded directory can become required.
7. Compare old React source, new React source, current Solid adaptation, and changed tests.
8. Port only the changed behavior into existing Solid files. Never copy the new React tree over adapted files.
9. Copy genuinely new source/test files first, then adapt them. Handle renames with provenance and retain historical mappings for deletions.
10. Run changed/impacted source suites and affected shared-consumer/browser/SSR/type/package checks.
11. Verify fingerprints/evidence and advance the global tested pin only when the complete scoped delta is reconciled. Retain still-applicable prior results for unchanged scope.
12. Close the active episode; queued work becomes a separate explicit update, not a silent checkout move beneath a worker.

An upstream test-only change can expose a real port defect. An unrelated Spectrum code change may be a no-op for this port, but it remains in the raw report with an explained classification. Initial adaptation and weekly maintenance use the same source map and test map.

## 14. Phase H — documentation, after library completion

This phase is intentionally deferred. Its invariant is already fixed: **copy the actual documentation application; adapt its rendering; retain its design and content structure.**

When beginning it:

1. Trace the RAC documentation routes to their actual host/build entrypoints at the selected source SHA. Do not assume the old docs root is still authoritative; this monorepo also contains `packages/dev/s2-docs`.
2. Copy exact content, demo source and dependencies, layout/navigation components, styles, fonts/assets with applicable licenses, route metadata, plugins, and build configuration inputs.
3. Adapt framework-specific renderer/MDX/host boundaries to Solid while preserving source page hierarchy, layout, route behavior, examples, and CSS pipeline.
4. If the real docs host uses Spectrum dependencies, those dependencies are legitimately part of the documentation closure; bring the needed source rather than inventing a replacement shell.
5. Show adapted demo source and generate API information from actual Solid declarations while preserving original explanatory content where accurate.
6. Verify production direct routes/refreshes, source content/ordering, mounted demos, interactions, responsive/light/dark states, styles/assets, and SSR/hydration where applicable.
7. Record docs parity separately from the already verified library scope.

No custom sidebar, new theme, reconstructed site shell, or pasted Markdown in a new design qualifies as a source-faithful documentation port.

## 15. Execution handoff and completion checklist

### First implementation session

1. Read this plan, migration skill, and its upstream/scaffolding/testing/Solid references.
2. Inspect local work; initialize Git and pin the monorepo at the recorded SHA.
3. Copy/adapt the existing updater and run its local fixture checks.
4. Inventory RAC exports and runtime/type/test dependencies from the actual checkout.
5. Terminal-copy the source-shaped subset and source tests; verify byte identity before edits.
6. Close the native renderer/runner pilot and coordinate versions.
7. Start ProgressBar + Meter and their actual supporting closure.

Finish bootstrap with a real working slice as soon as the required transport and harness are proven. Do not expand into months of speculative infrastructure before executing source tests.

### Updating this plan and handing off

- User execution preference: continue source-faithful native work autonomously, without per-file/helper/batch approval questions. Preserve existing failed-attempt history; only escalate substantial unresolved dead ends after roughly10–15 failed repair attempts. This does not authorize public-API changes, weakened source assertions, publishing/commits, source advancement, or framework/dependency patches.
- Keep `HANDOFF.md` around 20–40 lines: current status, working commands, next action, and active blockers only.
- On success, replace work-in-progress detail with a short result. Do not archive every edit, successful fix, or test invocation in prose.
- On a blocker, retain its exact failure, attempted approaches, and remaining budget so a new chat does not repeat them.
- Update this plan in place only when a lasting decision changes scope, ordering, native conventions, or acceptance. Ordinary code fixes do not need plan edits.
- Use existing source manifests and batch records; do not duplicate them or generate new evidence machinery. A completed batch summary should be a few bullets.
- A new chat reads the checkpoint and relevant code, then continues. It should not reconstruct the entire project's history.

### Project complete for the main-library phase when

- The product deliverable is the unstyled React Aria Components port, not the styled Spectrum library. Spectrum code is retained only as genuine dependency/fixture closure needed by scoped RAC source contracts; standalone Spectrum family qualification is not an independent product acceptance gate, and no public styled Spectrum distribution is requested.
- Every scoped public RAC capability is mapped and implemented natively.
- Every needed monorepo dependency is copied with provenance and adapted or retained framework-neutral.
- All selected original source tests pass without invented substitutes or undisclosed exclusions.
- Required strict types, browser, SSR/hydration, package, and independent-consumer checks pass.
- Source update, frozen-range, queue, and interruption recovery workflows work with fixture evidence.
- The global verified pin accurately records the completed library revision.
- The documentation phase remains separately tracked until its actual source site is ported.
