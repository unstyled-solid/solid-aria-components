# Collection compatibility completion

## Scope and fixed gates
- Frozen React source `3bdef480e85ff135cd485e9f4511b98300127d4b`, Solid `2.0.0-rc.13`. Own normal CollectionBuilder/Document/Collection/useCachedChildren functions; generic utils and Activity adapter readonly. No compiler/dependency patches, reconciliation/interception, DOM caches, key heuristics, markers or commits.
- Preserve qualified Tree browser3, composed SSR5, ListBox descendant, Combo initial/history, Select immediate FormData, Nav sections. Run exact source cases and corresponding existing types first; SSR5 and existing captured identity browser only for changed closure. No universal opaque-JSX guarantee or new test matrix.
- Delegation attempted as required; harness rejected at child depth limit. Work continues in this lane.

## Named contracts under investigation
1. Raw authored grouping: frozen ComboBox SSR `should point ref correctly after hydration`; native `test/ssr-harness/p15-combobox-ref.tsx` currently replaces the source raw div with FixtureGroup using createHideableComponent. Assertions unchanged, but this does not certify the raw spelling. Capture current raw spelling and pinned compiled first divergence before production changes; failed historical single-read/hidden-render candidates are not fixes.
2. Rendered-id-only immutable items: frozen useCachedChildren57–69 invokes a React element factory and obtains `rendered.props.id` before mount; explicit rendered id precedes item.key/item.id and scoping. Native factories execute components, not inert descriptors. Existing Table controlled resize uses uid-only objects and explicit MyColumn id; current native authored keyed For translation is qualified, old Collection items spelling is not. Map exact update/removal originals and reproduce current unchanged contract before proposing additive API.

## Status
- Current evidence collected, no new production/API changes. Restored DynamicTable's original `items` composition (removed prior authored For translation) after original row removal, column update, immutable row replacement/reorder all PASS. Retained this narrower, more source-faithful fixture; original assertions/actions/data remain unchanged. Controlled resize still uses its explicitly disclosed native keyed For; original old uid-only items spelling FAIL remains separate.
- Types p15-c/p23-p/p23-a PASS; final Table affected4/4 PASS (`compatibility-items-final.log`), restored adapted Combo SSR2/2 PASS (`compatibility-raw-adapter-restored.log`). No shared production input changed, therefore unchanged Tree3/TableTabsBreadcrumbSSR3/descendant/initial-value/physical green checks were not rerun. Full hashes: `compatibility-current-hashes.txt`. No temporary raw fixture, production instrumentation, or new API retained.

## 1. Raw grouping — exact current RED, explicit native route GREEN
- Frozen `upstream/react-spectrum/packages/react-aria-components/test/ComboBox.ssr.test.js:48–104`, specifically raw div68–71, is an actual source obligation, not an invented universal opaque-JSX test. Native original assertions at ComboBox.ssr.test.js37–60 are preserved. Temporary raw div translation (same ref/state/layout observation) reproduced FAIL `70000000`, `compatibility-raw-current.log`; types PASS first. Restored FixtureGroup afterward; both original SSR tests PASS. Thus source raw spelling is **not implemented**, native composition translation is **tested**.
- Current server HTML `compatibility-raw-server-html.json`: hidden template `_hk=6`, retained raw group `_hk=7000001`; complete visible group and selected Dog also rendered. Client FIRST requests `70000000` during ComboBox143's type-probe. This precedes any claim of the visible group: it is the discarded first getter construction, not metadata/readiness/context setup failure.
- Separately compiled pinned RC13 artifacts (before any production edit): approved temp `compatibility-raw-server/fixture.mjs`13188–13217 (`memo(() => typeof props.children === 'function')()` followed by second getter),13393–13405 (authored getter calls ssrHydrationKey before Label/Input); `compatibility-raw-client/fixture.mjs`17822 and18094–18101 (getter constructs/claims actual host and attaches ref). These current keys supersede older8000001 captures. Existing root scan in @solidjs/web gatherHydratable uses querySelectorAll and cannot enter template.content; merely single-reading children does not solve the second seam. Historical single-read For/setup and hidden ordinary-render proposals failed/reverted; not retried.
- **Supported explicit translation:** consumer defines `const Controls = createHideableComponent<HTMLDivElement, {children?: JSX.Element}>((props, ref) => <div ref={ref} role="group">{props.children}</div>)`, then uses `<Controls ref={ref}><Label>…</Label><Input /></Controls>`. This is exactly the qualified FixtureGroup, not a generic host transform or marker workaround. Visible literal markup/ref/hydration/assertions remain; inert discovery omits the non-collection control copy. It MUST NOT wrap a collection-bearing ListBox/Collection subtree: returning null would omit its items. Preserve collection children separately as in original Combo fixture. `Group` is not assumed equivalent: current Group.tsx105 is not hideable.
- **Runtime decision required:** accept this explicit native non-collection wrapper translation for the source raw grouping case, OR require literal raw-host compatibility. The latter cannot be claimed from current APIs; it needs a separately authorized discovery renderer/hydration design. There is no retained bypass/framework patch and no evidence that adjusting namespace counters is a solution. This is a concrete one-case decision, not a claim that all opaque JSX is impossible.

## 2. Items — narrowed exact contract and outcomes
- Frozen useCachedChildren57–69 reads inert React `rendered.props.id` before mounting; precedence is rendered id → data key → data id → positional React key. Native callbacks instead execute wrapper components beneath their providers. Reading arbitrary constructed DOM/ElementNode output for identity would be reconciliation/interception and is not proposed.
- **Actual rendered-id-only failing case:** frozen Table.test.js2159ff ControlledResizableTable creates new `{...column, width}` objects with uid but NO key/id, renders MyColumn with explicit id=uid. Restoring only this original Collection items spelling, keeping native signal/live state adaptations and all original assertions, FAILS original Height−50 at tableResizingTests226 (`onResizeEnd`0 versus1), `compatibility-items-rendered-id-current.log`. Original width/range assertions preceding it pass. Restored qualified authored For afterward. Earlier captures in COLLECTION_OWNERSHIP_DESIGN localize the changing hidden wrapper owner/callback; no need to repeat already proven failed raw-key/uid heuristics.
- **Not currently failing:** original DynamicTable source items path (data has id) now passes `supports removing rows`, `should support updating columns`, `should support updating and reordering a row at the same time`. Evidence `compatibility-items-{removal-current,update-current,final}.log`. Retained this source composition rather than silently adding ids/native For. Row replacement/reorder test replaces row0 object without adding fields; exact four text/order assertions retained. Do NOT generalize the rendered-id-only resize failure into all immutable-items/removal failures.

## Minimal additive API proposal — REVIEW REQUIRED, not implemented
Scope only the public `<Collection>` composition helper, not every root/section prop or Document. Existing `items + children(item:T)` contract and key precedence stay intact. Add an explicitly native alternative, mutually exclusive with children:

```ts
interface KeyedCollectionOptions<T> {
  items: Iterable<T>;
  getKey: (item: T) => Key;
  renderItem: (item: Accessor<T>) => JSX.Element;
  children?: never;
  dependencies?: ReadonlyArray<unknown>;
}
```

`getKey` controls **only native row lifetime**, never injected source id. `renderItem` is setup-owned and receives a live accessor; native For owns ordering/replacement/removal/cleanup. Actual callback reference replacement replaces its owned composition; changed dependencies retain the existing cache invalidation contract. Source node explicit id/value, item.key/item.id injection, idScope, duplicate-id validation and key/type visible rendering remain unchanged. No read/evaluation of renderItem to discover keys; no guessed uid or new registry. Same-key immutable input changes the accessor; meaningful callback/type/topology changes must be expressed with native reactive JSX/conditions, not promised for setup destructuring.

Exact rendered-id-only consumer translation, without modifying raw data:

```tsx
<Collection items={cols()} getKey={column => column.uid}
  renderItem={column => <MyColumn {...column()} id={column().uid}
    isRowHeader={column().uid === 'name'} allowsResizing>
    {column().name}
  </MyColumn>} />
```

MyTableHeader still supplies its original drag/selection columns/providers; only its nested Collection origin changes. This spells the currently qualified authored custom-keyed For/data accessor route as a reusable additive collection API. It does NOT make the old `(column:T) => JSX` spelling compatible by stealth and does not redefine rendered id precedence. Existing authored For remains available without API expansion.

Review decision: **approve this pair on Collection**, or explicitly document/retain authored keyed For as the supported native translation. If approved, implement pair dispatch in Collection/useCachedChildren, verify pinned declarations/types then the exact source Height−50 assertion set and existing immutable-removal/reorder cases, affected SSR5 and existing captured original-slider/Tabs/Combo flows only. No approval inferred from prior general native-adaptation authorization; no public API has been added in this evidence batch.
