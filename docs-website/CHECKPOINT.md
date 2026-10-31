# Docs migration — current checkpoint, 2026-10-13

## Intent / boundaries
- Finish original copied React website shell with native Solid 2 demo islands; no shell/bundler rewrite. Preserve source content/assets/behavior and real demos.
- Native library and docs repairs, renewed bounded exhausted-case tracing, and incremental Virtualizer reconciliation are now explicitly authorized. No canonical/dependency/framework edits/upgrades, assertions weakened/deleted, hidden skips, commits or publishing.
- Mandatory local Solid2 skill and docs MCP `solidjs` version `2`, verified against installed rc13/compiler. No blanket tree memos, inline memo factories, snapshots, suppression, null guards or scheduling hacks.
- USER UPDATED: max7 unsuccessful approaches per root cause, including existing attempts; no history reset. Productive diagnosed/compiler fixes are not failures. Ten directionless calls escalates to coordinator code/trace guidance; persist evidence and continue independent work, no repeated permission/could-not-do-it loop.

## Current ownership
- Coordinator owns server/build infrastructure and checkpoints; `HANDOFF.md` is the finite work ledger and active session roster.
- Field/ref lane owns Token Users label, Autocomplete inline completion, Token trigger-Enter and Search7; sole interactive browser lease. Shared utils/ref/label/context exclusive to it.
- Collection lane owns incremental CollectionBuilder/Document/cached-child/Virtualizer reconciliation and affected consumers; shared utils readonly.
- Localization lane owns native ICU/color text causes and named remaining eager ref/slot callsites; generic helpers/collections readonly.
- Shared browser page remains exclusive to field lane; localization and dedicated DropZone transport lane may use genuinely isolated Playwright browsers/contexts. User explicitly encourages targeted automation/logs comparing expected versus actual ownership/events. No overlapping edits or shared-page navigation; background builds overlap independent source/test work.

## Retained implemented and qualified repairs
- `solid-mount.ts` uses native `merge(props)` with dynamic live values. Props root returns BEFORE imperative native mount; correct ownership/disposal retained.
- NativeDemo layout-transparent host fixes Separator geometry without width hacks; recorded natural Button/TextField layout also passes.
- Native stable Host/tracked leaf callbacks qualify pending Button repeat, TimeField/DateField repeated segment identity/focus, Tag removal, Tree expansion and real Table append.
- Owned overlay isOpen derivation qualifies Token5 mentions without HALTED; live Token slot forwarding qualifies controlled editable/model/caret and Users editable-keyboard selection/reopen; eager Token slot warning gone.
- Form Reset/Select multi-value, Switch freshness, FocusScope/FocusRing prose and their recorded flows qualify only stated variants. Source/preflight readiness is not full-site behavior qualification.
- Current authoritative library evidence: `tracking/DIAGNOSTICS_UNRESOLVED.md`. Docs page record retains historical failed experiments; older claims there do not override newer library proofs.

## Remaining finite scope
- Users8 real name/label-click focus/association FIXED; initial missing-label warning1 remains separately under investigation.
- Autocomplete inline10 original textarea/filter/caret now freshly pass warning/error-free after reverse membership/ref repair. Further options-merge repair restores keyboard selection in paired trace/source128/types; final uninstrumented action/repeat awaits sole server refresh (old served native merge confirmed stale).
- Token8 trigger-Enter FIXED with source committed-snapshot toggle/both handlers preserved; repeated fresh browser proof/source202/SSR2/types pass. Search7 exact alex typing/identity/caret passes. Categories6 uses original upstream positional keys; no key-model rewrite justified.
- Virtualizer incremental dynamic-list topology COMPLETE: fresh examples1/2 HUGE_FAN_IN5003 warnings2→0/errors0; scroll/selection/focus/root+surviving-row identity/virtual removal-remount pass. Existing source/SSR/types/browser18 gates pass; `tracking/COLLECTION_OWNERSHIP_DESIGN.md`.
- Localization literal ICU tokens and genuine residual library STRICT/relay findings require causal repair/classification; no fabricated labels or cosmetic warning removal.
- Localization actual absolute JSON transformer path + six eager-ref/slot callsites COMPLETE: source72/SSR2/types/docs+all named fresh browser flows pass, warnings/errors0. Users label association/trigger-Enter and Search7 typing identity/caret qualify; initial Users label warning1 remains. Autocomplete recreated inner TextArea is current coordinator-guided blocker,2/7 failed hypotheses; historical attempts retained.
- Transport scope COMPLETE: DropZone1/2 trusted text paste/native drag/identity/cleanup pass; FileTrigger trusted browser-request cancel/no-change/focus pass. PNG paste gets null webkitGetAsEntry and is discarded identically upstream/native; OS image-file drag/visible OS-dialog dismissal/some IME/unvisited variants remain unqualified, not migrated-defect claims.

## Commands and architecture
- From `docs-website/upstream`: `npm run check:docs` after coherent docs edits; exact bulk preflight107pages/393entries/670sources/283CSS last passed, not a behavior gate.
- Serve `npm run dev -- --no-cache` (configured no HMR), URL `http://localhost:4340/TokenField.html` etc. Existing server confirmed HTTP200 at continuation; do not duplicate. Verify fetched compiled CONTENTS after native changes; asset filenames can remain unchanged.
- `ISLANDS.md` documents bridge contract. Original top-level107 core MDX inputs selected; nested docs excluded, not deleted. Actual native imports/packager VM are covered by preflight.
- DocsStaticPackager uses original createContext VM initialization and React edge loader; installed dependencies untouched. NativeDemo unavailable marker is a visible failure, never a migrated pass.
- Final stable library changes require current integration/distribution qualification using established commands; older packed results are historical.
