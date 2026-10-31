# Library browser-test diagnostics

Snapshot: 2026-10-13T11:31:22.954Z. Exit: 1. Source freshness: SHA256 captured for every original suite before execution (raw backing snapshot).

Command:

```sh
node scripts/test-diagnostics/run.mjs tracking/browser-test-diagnostics/rerun-20261013
node scripts/test-diagnostics/report.mjs tracking/browser-test-diagnostics/rerun-20261013
```

Runner executes root `pnpm exec vitest run --config vitest.browser.config.ts` with all eleven existing core browser files explicitly selected (including Modal/Dialog/ShadowDOMFocus). No docs/build/server collection.

| Component | cases | failed | unique runtime groups |
|---|---:|---:|---:|
| [ComboBox](ComboBox.md) | 9 | 0 | 0 |
| [Dialog](Dialog.md) | 6 | 0 | 0 |
| [GridList](GridList.md) | 9 | 0 | 0 |
| [ListBox](ListBox.md) | 6 | 0 | 0 |
| [Modal](Modal.md) | 3 | 0 | 0 |
| [Tabs](Tabs.md) | 6 | 0 | 0 |
| [TokenField](TokenField.md) | 351 | 1 | 0 |
| [Tree](Tree.md) | 3 | 0 | 0 |
| [NumberField](NumberField.md) | 3 | 0 | 0 |
| [Menu](Menu.md) | 3 | 0 | 0 |

## Run limitations / unhandled runner errors

[evidence 1](evidence/run-limitations-1.txt)

Unassigned captured runtime messages: 0. None.

Pinned Solid and signals: 2.0.0-rc.13; config defines NODE_ENV=development but explicitly sets resolve.conditions=[source,import,module,default]. A declared profile does not prove both diagnostic runtimes loaded. Actual runtime evidence: [evidence 1](evidence/runtime-profile-1.txt) The separate unchanged Tabs suite runtime probe reports solidDevelopment=true and signalsDevelopment=true on all three engines; 6/6 cases pass. This verifies actual diagnostic availability with the unchanged resolver, not whole-library clearance.

Not covered: all components without an existing core browser suite; S2 ButtonGroup peripheral suite deliberately not run. No jsdom/source unit-suite or whole-library coverage claim. Console errors continue to fail original tests; captured warnings are never suppressed.

## Executed outcome and freshness

Main run: 357 passed, 1 failed, 41 original skips (399 total), 33 engine/file instances across Chromium/Firefox/WebKit. One Firefox TokenField LTR scrolling test timed out after 20 seconds. No captured console warnings/errors in the main run; no unhandled runtime errors reported there.

Post-run original test SHA256 verification: 11/11 unchanged. Working-tree library source was not commit-certified or frozen by this collector; results describe the executed snapshot, not concurrent/future edits. ShadowDOMFocus additionally exercises NumberField and Menu; these have no standalone existing browser suite, so no whole-component coverage claim. Composition remains Chromium-only: original Firefox/WebKit skips retained.

## Runtime probe

The current runtime probe passed 6/6 cases. See the runtime-profile evidence above for actual development-runtime availability. No historical collection incidents are included in this result.

Runtime probe command executed after the main run (also included by the repeatable runner):

```sh
VITE_TEST_DIAGNOSTICS=1 TEST_DIAGNOSTICS_LOG="$PWD/tracking/browser-test-diagnostics/raw/profile2-console.jsonl" pnpm exec vitest run --config scripts/test-diagnostics/profile.config.ts packages/react-aria-components/test/Tabs.browser.test.tsx --reporter=default --reporter=json --reporter=./scripts/test-diagnostics/reporter.mjs --outputFile.json=tracking/browser-test-diagnostics/raw/profile2-results.json
```
