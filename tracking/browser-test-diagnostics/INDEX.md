# Library browser-test diagnostics

Snapshot: 2026-11-01T18:05:18.547Z. Exit: 0. Source freshness: SHA256 captured for every original suite before execution (raw backing snapshot).

Command:

```sh
node scripts/test-diagnostics/run.mjs
node scripts/test-diagnostics/report.mjs
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
| [TokenField](TokenField.md) | 351 | 0 | 0 |
| [Tree](Tree.md) | 3 | 0 | 0 |
| [NumberField](NumberField.md) | 3 | 0 | 0 |
| [Menu](Menu.md) | 3 | 0 | 0 |

## Run limitations / unhandled runner errors

[evidence 1](evidence/run-limitations-1.txt)

Unassigned captured runtime messages: 0. None.

Pinned Solid and signals: 2.0.0-rc.20; config defines NODE_ENV=development but explicitly sets resolve.conditions=[source,import,module,default]. A declared profile does not prove both diagnostic runtimes loaded. Actual runtime evidence: [evidence 1](evidence/runtime-profile-1.txt) Runtime probe: 6 passed, 0 failed, 0 skipped (6 total); exit 0. Actual Solid and signals development availability: 3/3 captured profiles confirm both development runtimes. Engine evidence: chromium, webkit, firefox (3 engines). This is diagnostic availability evidence, not whole-library clearance.

Not covered: all components without an existing core browser suite; S2 ButtonGroup peripheral suite deliberately not run. No jsdom/source unit-suite or whole-library coverage claim. Console errors continue to fail original tests; captured warnings are never suppressed.

## Executed outcome and freshness

Main run: 358 passed, 0 failed, 41 original skips (399 total), 33 engine/file instances. See component briefs above for exact failures, engine attribution and runtime diagnostics; run-limitations evidence includes runner errors and summary.

Post-run original test SHA256 verification: 11/11 unchanged. Working-tree library source was not commit-certified or frozen by this collector; results describe the executed snapshot, not concurrent/future edits. ShadowDOMFocus additionally exercises NumberField and Menu; these have no standalone existing browser suite, so no whole-component coverage claim. Composition remains Chromium-only: original Firefox/WebKit skips retained.
