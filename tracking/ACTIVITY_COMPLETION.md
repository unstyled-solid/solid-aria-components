# Activity native contract

## Final user decision — React-only, not applicable

The user explicitly excluded these four React.Activity framework integration cases from this Solid port. **ListBox3/Tabs1 are NOT APPLICABLE, not passing, not skipped, and not unresolved contract blockers.** No other source case is excluded by this decision.

Implementation stopped immediately. Reversed only this lane's latest added imports/calls/context bridge and Tabs registration in the seven modified aria source files and two fixture suites. Deleted this lane's newly created `react-stately/src/utils/visibility.ts` and `react-aria-components/test/fixtures/native-visibility.tsx` after removing their references. `useTooltipTriggerState.ts` was never edited. **No implementation source/fixture edits from this lane remain.** No implementation types/tests were run, no pass recorded, and reserved source ownership is released.

Explicit runner exclusion completed: removed only the three ListBox Activity registrations and their now-unused createContext/useContext imports; complete frozen original blocks are preserved verbatim in adjacent `packages/react-aria-components/test/ListBox.Activity.source.txt`. Existing `Tabs.Activity.source.txt` remains unchanged, with no executable fourth registration. Test comments explicitly identify user-approved React-only N/A, not skips/passes. No other test body/assertion or production file changed. HANDOFF/other ledgers were not edited by this lane.

| React-only N/A original name | Frozen source positions | Preserved evidence |
|---|---|---|
| ListBox `supports Activity` | ListBox.test.js2365–2397 | ListBox.Activity.source.txt |
| ListBox `supports Activity into a portal` | ListBox.test.js2401–2446 | ListBox.Activity.source.txt |
| ListBox `should only treat visible items as duplicate keys across Activity boundaries` | ListBox.test.js2448–2487 | ListBox.Activity.source.txt |
| Tabs `supports Activity` | Tabs.test.js976–1010 | Tabs.Activity.source.txt |

Inventory: **ListBox3 + Tabs1 = four React-only N/A**; zero runnable Activity registrations, zero new skips, zero new passes. ListBox applicable named denominator104→101; its existing original skip remains separate and unchanged. Tabs existing42 applicable qualification is not incremented by this exclusion.

Exclusion verification executed: installed TypeScript `createSourceFile` JSX parsing reports **zero parse errors and zero executable Activity registrations** in both suites. Both `.source.txt` archives are byte-verbatim frozen source substrings: ListBox2364–2488, Tabs975–1011 (including framework guards). No broad suites rerun. Initial optional Babel parser command was unavailable (`ERR_MODULE_NOT_FOUND`), so verification used the already installed TypeScript parser; no dependency added.

The material below is **historical investigation evidence only**, not an active implementation plan or outstanding approval request. All earlier blocked/qualification/Option A/B wording is superseded by this user decision.

## Frozen source and fixed scope

Source: `upstream/react-spectrum` at `3bdef480e85ff135cd485e9f4511b98300127d4b`.

| Original case | Asserted observations | Retain / pause / exclude / resume contract |
|---|---|---|
| ListBox `supports Activity`, source ListBox.test.js2365–2397; native2333–2365 | Hidden0 → visible5 → hidden0 options | Retain the ListBox owner, DOM and editable state; deactivate external effects/resources when hidden; remove hidden options from accessible output; reactivate surviving owner on reveal. Source does not directly assert identity or effect counts. |
| ListBox `supports Activity into a portal`, source2401–2446; native2369–2412 | Visible5 → hidden route/context updates → visible5 | Retain Page/ListBox through hidden pathname/readiness changes; consume current contexts on reveal; hidden descendants must not leave active registration/resources. Despite its name, the test does not explicitly construct a web Portal. |
| ListBox `should only treat visible items as duplicate keys across Activity boundaries`, source2448–2487; native2414–2453 | First A/B → Second A/B → First A/B; reveal second simultaneously visible `a` throws original duplicate-key message | Retain both branch owners/state; hidden branch must not participate in the collection; resume exactly its existing branch when visible; still reject actually simultaneous visible duplicate keys. CSS visibility is insufficient. |
| Tabs `supports Activity`, source Tabs.test.js976ff; verbatim native `Tabs.Activity.source.txt` | Hidden0 → visible3 tabs | Retain Tabs/TabList/TooltipTrigger owners and selection state; hidden effect/resources inactive; resume live tab registrations on reveal. No additional hide/reveal/focus assertion is present. |

Confirmed **four distinct original cases**, three ListBox plus one Tabs; no separate Activity browser or SSR case was found in the inspected source cases. Do not inflate ListBox101/104+originalskip to104 or count Tabs as qualified.

Fixed implementation gates, if an authorized supported composition becomes available: the four names above only, original assertions intact; existing `tsconfig.p11-l.json`, `tsconfig.p11-c.json`, `tsconfig.p10-t.json` for affected implementation. No new matrix/harness. Commands are planned, not executed: `node node_modules/vitest/vitest.mjs run --config vitest.config.ts packages/react-aria-components/test/ListBox.test.jsx -t 'Activity'`; the Tabs body currently remains verbatim in a `.source.txt` file rather than an executable registration. A fake undefined-Activity failure run would add no contract evidence.

## Native grounding

- Both `solid-js/package.json` and `@solidjs/signals/package.json` report `2.0.0-rc.13`.
- Docs MCP **library solidjs / version2** queried for visibility/Show/Loading/Reveal, retained ownership, suspension and cleanup. Relevant returned pages: `/migration/from-react`, `/concepts/boundaries`, `/reference/solid-js/advanced/specialized-reactivity/on-cleanup`, `/guides/custom-primitives`. Docs describe retained async branches, not Activity-style mode-controlled cleanup/restart.
- Installed `solid-js/types/client/flow.d.ts273–277`: Loading accepts `fallback`, `on`, `children`; there is no visibility/deactivate policy. `Reveal` coordinates readiness/order, not resource lifecycle. `solid-js/dist/solid.js1407–1427`: Show selects owned memo branches; toggling disposes branch scopes, so retaining their DOM separately would cache nodes belonging to disposed scopes.
- Installed `@solidjs/signals/dist/dev.js10056–10099`: `createLoadingBoundary` collects **STATUS_PENDING**, and `on` only rearms pending sources. It explicitly keeps children alive. `CollectionQueue.run` at9737–9740 defers effect queue execution while disabled; `_rearm` at9752–9805 does **not** invoke previously installed effect cleanups. Blocking future effect application is not deactivating existing event listeners, subscriptions, observers, timers or imperative resources.
- Installed `@solidjs/signals/dist/types/index.d.ts` exports ownership/disposal and loading/reveal primitives but no retained-owner deactivate/reactivate API. Cleanup APIs are tied to disposal or effect replacement, neither of which a generic wrapper can selectively apply to arbitrary descendants while retaining their state/DOM.

## Actual runtime experiment

Executed with `rtk proxy node --conditions=development --input-type=module -e ...` against installed `@solidjs/signals`. A real createLoadingBoundary contains a real createEffect that installs an external resource and returns its cleanup. A createMemo reads a boolean and returns an unresolved promise only while hidden; boundary `on` reads that same boolean. A terminal effect observes boundary output. These are instrumentation of real resource setup/cleanup, not fabricated component setup counters, fixture hacks, or an acceptance suite.

```json
{"phase":"visible","output":"ready","starts":1,"stops":0}
{"phase":"hidden","output":"fallback","starts":1,"stops":0}
{"phase":"visible-again","output":"ready","starts":1,"stops":0}
{"phase":"disposed","output":"ready","starts":1,"stops":1}
```

This establishes the tempting Loading composition can retain and hide/reveal output but **leaves the already installed resource active throughout hiding**. Turning boolean visibility into artificial pending work does not repair that seam. No speculative production primitive was created.

## Collection seam and decision

`packages/react-aria/src/collections/CollectionBuilder.tsx194–199` installs fake-node props and removes the fake node only on owner cleanup; `renderCollectionChildren`204–219 reconciles ElementNode children into the Document. **Correction from renewed source inspection:** real-DOM CSS alone does not exclude fake collection nodes, but fake `ElementNode.style.display` is already a genuine source visibility mechanism; see below. A Document rewrite is not warranted.

The prior conclusion that *all* native retained-resource compositions need a framework change was too broad. Source-specific resources can be paused while retaining their state and DOM; the renewed analysis below establishes that distinction. Universal automatic effect deactivation is a separate requirement.

## Renewed analysis: cooperative resources are feasible

Docs MCP solidjs/version2 additionally returned `/reference/solid-js/advanced/owner-introspection/create-root`: roots created under an owner are owned children, not detached caches; disposal tears down all primitives in that root. Installed `@solidjs/signals/dist/types/core/owner.d.ts99–136` agrees. Installed `signals.d.ts317–384` explicitly guarantees effect-returned cleanup before replacement and on disposal, and returns **void**, not a suspend/resume handle. These provide a supported split:

1. Retained root owns editable state, JSX/DOM, and live context reads for the branch's entire lifetime.
2. A separate visibility-aware resource effect tracks `visible` in compute. It installs the real listener/subscription only while visible and returns its real cleanup. Hidden mode causes cleanup, not merely queued-effect suspension; reveal installs it again without reconstructing retained state/DOM.
3. Collection participation can use the existing source fake-node visibility setter rather than deleting its state owner; details below. Do not invent a requirement to cache independently disposed visible row owners.

Executed a **new** direct RC13 experiment (not a repeat of Show/CSS/Loading): `rtk proxy node --conditions=development --input-type=module -e ...`, using real `createRoot`, `createSignal`, `createRenderEffect`, `createEffect`, a jsdom input, a real EventTarget, and two real event listeners. One listener cooperates with visibility; the other is an ordinary descendant effect. An actual editable value changes7→42 before hiding; output withholding does not dispose its root. Dispatching real events produced:

```json
{"phase":"visible","visibleOutput":true,"state":7,"originalNode":true,"nodeValue":"7","cooperativeCalls":1,"ordinaryCalls":1}
{"phase":"hidden","visibleOutput":false,"state":42,"originalNode":true,"nodeValue":"42","cooperativeCalls":1,"ordinaryCalls":2}
{"phase":"revealed","visibleOutput":true,"state":42,"originalNode":true,"nodeValue":"42","cooperativeCalls":2,"ordinaryCalls":3}
{"phase":"disposed","cooperativeCalls":2,"ordinaryCalls":3}
```

Actual resource behavior establishes retained DOM/state **and** cleanup/reinstallation for cooperating resources. The ordinary listener deliberately contrasts what the wrapper cannot intercept: it still receives the hidden event. Counters instrument real listener invocations, not component setup or invented expected values. This experiment is neither the four source test gates nor browser qualification.

### Exact source-specific integration seams

These are causal integration sites, not authorization to edit shared files:

| Shared symbol/site | Existing resource | Native policy required |
|---|---|---|
| `collections/Document.ts` `ElementNode.style`405–441, `CollectionBuilder.tsx` `renderCollectionChildren`204–219 | Fake-node participation | Use the already ported source `style.display` visibility setter to exclude hidden nodes while retaining fake owners. No Document rewrite or new collection registration primitive is needed. Preserve ordering and original duplicate-key error on reveal. |
| `utils/useEvent.ts`28–35 | Effect-installed scroll, virtual-focus, clear-focus, restoration listeners used by useSelectableCollection | Include inherited activity visibility in compute; return existing addEvent cleanup on hide; reinstall against current target on reveal. |
| `selection/useSelectableCollection.ts`638–674,676–732 | Autofocus, imperative focus/scroll, scheduled RAF; cancellation currently owner-only | Suppress hidden imperative focus/scroll, cancel pending RAF on hide without resetting editable selection/focus state; preserve existing source transition history and replay current policy on reveal. |
| `interactions/useFocusVisible.ts`430–445 | Per-consumer `changeHandlers` subscription | Gate subscriber ownership on visibility. **Do not** tear down process-wide module focus tracking315; it is shared global infrastructure, not a boundary-owned resource. |
| `interactions/useHover.ts`103, `utils/useGlobalListeners.ts`49–75 | onSettled global-touch lease and event-installed global listeners | Replace the lease's owner-only lifecycle by a visibility-aware resource effect; release only that consumer's refcount; cancel that owner's active interaction listeners on hide, not listeners owned by other visible consumers. |
| `tooltip/useTooltipTrigger.ts`60–77; `react-stately/src/tooltip/useTooltipTriggerState.ts`186–196 | Open-tooltip Escape listener; close timer and registry entry | Gate real document listener and hidden-owner timer/registry leases without disposing TooltipTrigger state; preserve shared warmup/cooldown coordination for other visible owners. |

These resources are reached by the original ListBox/Tabs fixtures through the genuine source component/hook closure. A local adapter cannot modify their imported `solid-js` effects by providing context alone: each resource consumer must explicitly read that policy. Native context does not intercept `createEffect` or `onSettled`. A small policy helper is legitimate source adaptation; globally monkey-patching effects, owner internals or queues is not.

### Minimal actionable decision

**Option A — explicitly cooperative native composition:** authorize/coordinate the exact resource-consumer leases above and a native visibility resource helper. A local adapter can operate the existing fake-node visibility API, with no collection registry/renderer redesign. This can use pinned RC13 public primitives and retain all four original assertions; no framework patch is inherently required. Consumers authoring additional external effects must use the visibility policy/helper. That limitation must be disclosed rather than sold as automatic React.Activity equivalence. Original case qualification remains pending implementation and actual gates.

**Option B — universal React.Activity child semantics required:** RC13 public APIs do not expose effect handles or retained-owner lifecycle interception. The concrete ordinary-listener counterexample above survives any local boundary that retains its root. Full cleanup/restart of arbitrary `createEffect`/`onSettled` descendants then requires a supported framework lifecycle boundary (dependency/framework changes require user authorization). No claim that source-specific cooperation is impossible follows from this.

No silent choice of Option A's public consumer constraint, partial production Activity shim, or fabricated four-case pass is retained. No type/source/browser gate was executed because no implementation was retained; planned gates above remain fixed. Coordinator owns HANDOFF/P68/DEFERRED/Tabs records; this lane supplies this record without overwriting their concurrent work.

### Existing collection visibility mechanism (new causal finding)

Frozen source `react-aria/src/collections/Document.ts379–415` explicitly implements React Suspense/Activity fake-host hiding through `style.display='none'`: set `isHidden`, invalidate sibling/parent/self, retain the fake host in Document but omit it from Collection. Native `Document.ts405–441` already preserves this implementation. Its visible sibling/child traversal229–253 and collection filtering496/557/567 consume `isHidden`. Thus an adapter can distinguish real hosts and fake ElementNodes and drive **the same source-host visibility API**, rather than adding collection registration architecture or relying only on real DOM CSS.

Frozen visible `react-aria-components/src/Collection.tsx210–239` renders the active collection separately from the fake Activity tree. Native `Collection.tsx205–232` does likewise with For keyed by[type,key]. In the duplicate-key case the Activity boundary owns fake branches, not the independently rendered row scope. It is incorrect to impose a new gate that separately rendered inactive rows must remain mounted: the original source renders active collection entries. Retention concerns the boundary-owned branch and its state, not a fabricated cache of disposed visible scopes. This narrows the actual remaining producer work to resource-policy cooperation, not a new generic collection renderer.

## Latest reconciliation: actual API versus framework capability

- Rechecked installed RC13 declaration exports (`@solidjs/signals/dist/types/index.d.ts1–23`, `solid-js/types/client/flow.d.ts273–277`): no new retained-owner deactivate/reactivate primitive. No prior Loading/Show/CSS experiment was repeated.
- Exhaustive `Activity` lookup in frozen RAC `*.ts`, `*.tsx`, and `*.json` finds only an unrelated story string, not a public export, component, prop or implementation. The four frozen test bodies explicitly use **`React.Activity`**, supplied by React19. This is a framework compatibility precondition, not an Activity API shipped by RAC.
- All four source assertions concern hidden/visible roles, live route/context updates, and active-only duplicate-key participation. None installs a custom consumer effect/resource, asserts universal effect interception, or asserts a framework setup count. The only application-defined Page reads contexts and authors ordinary markup/ListBox items. Resource consumers in the actual authored closure are RAC/aria/stately hooks listed above, not arbitrary opaque user lifecycle code.
- Therefore universal pausing of arbitrary Solid consumer effects is **not required to qualify those exact four observations**. It remains a distinct unimplemented framework compatibility capability. A four-case pass must be explicitly reported as native source-case correspondence, never universal React.Activity support. Calling a private case-scoped visibility composition a public universal Activity replacement would be false; silently altering a published framework API would also be unauthorized.

### Concrete route to relay (no concurrent production edits)

Coordinator can give one integrator a disjoint lease to implement the existing source-case closure, rather than request a framework patch:

1. Add an **internal** inherited visibility policy and resource lifecycle helper under `packages/react-aria/src/utils/` (no RAC public Activity export). Its neutral default is visible; compute tracks current visibility and current resource inputs; apply installs the real resource and returns its original cleanup. On hide cleanup executes; on reveal current inputs reinstall resources. Retained state/memos and context reads stay in their original owner, never in a disposed cached branch.
2. Adapt the exact resource symbols in the table above to that internal policy. Per-instance subscriptions/listeners/RAF/timers pause; process-wide shared focus tracking remains operational for visible consumers. Source transition rules, callbacks, cleanup order and cancellation must remain intact. Do not claim the listed sites are a tested exhaustive runtime closure before actual fixture execution/capture; use failing owner paths to complete only this fixture's real dependencies.
3. Author a clearly documented **native fixture construction** using an owned retained branch and native real/fake-host visibility. Operate fake `ElementNode.style.display` through its existing setter, retaining fake nodes/branch state. Preserve real-host prior inline display values on hide/reveal; do not delete hosts, reset editable state, cache disposed scopes, or change collection identity policy. No Document registry rewrite. The precise flatten/provider/ownership composition is implementation work, not a result already verified by the isolated experiment.
4. Keep original ListBox3 assertions verbatim; copy/register the preserved Tabs Activity body with only explicit native construction syntax/context accessor adaptations. Do not register a fake React19 version or skip. Run only fixed types and these four existing named cases first. There is no additional source Activity browser/SSR suite to invent. Source-case success and unsupported arbitrary-effect framework semantics must be separately reported.

This route needs **production ownership coordination**, not user approval for ordinary helper edits. It does not impose a new cooperation requirement on any user effect present in these four source fixtures (there are none), and does not remove or narrow an existing exported RAC Activity API (there is none). If acceptance instead demands a generally usable framework-equivalent boundary for arbitrary consumer effects, that separate requirement still needs an explicit framework/contract decision. None has been assumed authorized.

Latest reported nonActivity Table177/Grid97/Tabs42/SSR13/publictypes passes are retained coordinator evidence, not rerun or reclassified here. Tabs42 does not include the unregistered preserved Activity body at current Tabs.test.jsx1021–1023. Four Activity cases remain **unqualified**, pending the above integrated implementation and actual existing-case gates.
