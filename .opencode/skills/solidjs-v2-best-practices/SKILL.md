---
name: solidjs-v2-best-practices
description: Use for all Solid 2 components, docs demos, wrappers, reactive diagnostics, refs, contexts, render callbacks and React-to-Solid adaptations in this project. Requires version-checked documentation and idiomatic fine-grained repairs, not warning-silencing memo wrappers.
---

# SolidJS V2 best practices — this project

## Authority and scope

This skill governs code quality; it does not authorize library edits, dependency upgrades, architecture changes, new test matrices or delegation. Follow the active task's ownership and repository AGENTS.md. For docs work, read `docs-website/CHECKPOINT.md` and `docs-website/ISLANDS.md`; library and canonical upstream remain read-only unless separately authorized.

Before a reactive repair, **query docs-mcp-server with library `solidjs`, version `2`, for the actual affected semantics**. Read the relevant result, not just its title. Verify APIs against the installed package declarations/runtime and project pin. Online V2 docs can describe a newer implementation. Do not copy Solid 1 conventions, React lifecycle mechanics, or another repository's runtime profile.

Documentation sources consulted for this skill (2026-10-13):

- https://v2.solidjs.com/concepts/components-and-jsx — setup, live props, children, contexts, refs, lists and conditionals.
- https://v2.solidjs.com/migration/from-react — fine-grained execution versus component re-rendering.
- https://v2.solidjs.com/glossary — tracking, staged updates, split effects and ownership.

Additional targeted references to query when relevant:

- https://v2.solidjs.com/concepts/reactivity
- https://v2.solidjs.com/reference/solid-js/reactivity/create-memo
- https://v2.solidjs.com/guides/avoid-unnecessary-effects
- https://v2.solidjs.com/guides/debugging-reactivity
- https://v2.solidjs.com/concepts/async-reactivity
- https://v2.solidjs.com/concepts/rendering-and-ssr

The rules below combine documented semantics with project authoring policy. The prohibition on inline memo factories is a project style/quality requirement, not a claim that all such expressions are forbidden by Solid itself.

## Execution model: fix the read, not the warning

Components run once, untracked. JSX expressions, memo computations and effect compute functions track their reads. Keep reactive props intact and read them in those scopes.

```tsx
// Wrong: setup snapshots a live prop.
const text = props.label;
return <span>{text}</span>;

// Preferred: the expression tracks the prop.
return <span>{props.label}</span>;
```

- Avoid destructuring live props/state in setup or render callbacks when updates must remain live. Destructuring an intentionally static plain object is not inherently wrong.
- Keep forwarding live: use supported pinned prop utilities or getter-based forwarding; do not eagerly spread/enumerate a reactive object in ordinary setup and expect it to update.
- JSX spread semantics depend on the compiler and source object. Inspect the exact read before changing a spread merely because a warning names its surrounding component.
- Do not add blanket `createMemo(() => <entire example />)` wrappers to silence setup diagnostics. They do not establish correct ownership or identity.
- Do not hide real dependencies using blanket `untrack`, diagnostic filtering, suppression or fabricated registrations.

## Choose the smallest derivation

Use a signal/store for independent editable state. Use a plain accessor for a cheap single-reader derivation. Use a memo only for a justified cached/shared derivation or equality boundary. Keep computations pure: no setters, imperative callbacks or mutation of shared/previous values.

**Declare derivations above returned JSX, in the correct owned scope.** Prefer direct tracked JSX when it is sufficient:

```tsx
<SelectValue>
  {live => <span>{live.selectedText || live.defaultChildren}</span>}
</SelectValue>
```

If a memo is genuinely needed and this library callback is an owned setup boundary:

```tsx
<SelectValue>
  {live => {
    const selectedLabel = createMemo(
      () => live.selectedText || live.defaultChildren
    );
    return <span>{selectedLabel()}</span>;
  }}
</SelectValue>
```

These are illustrative callback shapes, not permission to add a span to source markup. Preserve the actual component's DOM contract. Verify that the callback is invoked with an owner before allocating a primitive; otherwise use an appropriate owned child component.

**Reject** `{live => createMemo(() => live.selectedText || live.defaultChildren)}` as a project authoring workaround. Naming and placing a memo correctly does not justify an unnecessary memo. Do not hoist a memo outside the callback if that loses access to live state or its provider.

## Children and provider ownership

- Ordinary wrappers should support natural nested JSX and render `props.children` directly when possible.
- Use the documented `children` helper only when resolution/inspection/iteration is required. Do not resolve children above the context they must consume.
- Defer JSX construction at the implementation boundary where its real owner/provider exists. Trigger content and portaled popup content can require different boundaries.
- A wrapper's metadata, comparator or source display must not instantiate its children prematurely.
- Mandatory arrays of zero-argument child factories are a **DX defect to track**, not the desired public contract. Legitimate render callbacks that provide item data or state are different.
- Preserve the working Tags anchoring repair until a natural-JSX replacement is behavior-proven. See `docs-website/DX-API-REPAIR.md`. Do not remove required laziness blindly or change read-only library APIs.
- V2 context is itself a provider component; defaultless context access throws. Do not swallow missing-provider errors or inject context through side channels.

## Effects, refs and external systems

- Use the pinned V2 split `createEffect(compute, effect)` contract: compute tracks inputs; effect performs terminal imperative work and returns cleanup/undefined.
- Do not copy derived state through signal-writing effects. Derive it directly. External DOM measurements are genuine external inputs, not automatically pure derivations.
- Ref callbacks are untracked and ownerless; returned cleanup is ignored. Create primitives/cleanup during owned setup. Ref callbacks record/apply the element only.
- For one-time settled DOM integration, consult `onSettled` and its pinned contract; for changing targets, use an owned lifecycle with replacement/removal cleanup.
- Use supported native ref composition rather than React `.current` assumptions. Preserve any explicit library null-detach/replacement contract.
- Never fix overlay anchoring with manual `(x, y)` styles, timeouts, microtasks or scheduling hacks instead of proper trigger ownership/ref wiring.

## Scheduling, lists and version differences

- V2 writes are staged. An immediate read after a setter can still see committed old state. Carry an accepted event value explicitly when the same-turn algorithm needs it.
- No `flushSync`, manual `queueMicrotask` or production `flush()` to emulate React behavior. Existing intentional test flushing is a separate contract.
- Preserve controlled acceptance/refusal, callback order and cancellation; do not interpret a parent's unaccepted proposal as committed state.
- Verify `For` callback arguments for the exact keyed mode and installed pin. Current online docs distinguish raw default-keyed items from accessor items with explicit key functions/position-based mapping. Never assert every V2 item is an accessor.
- Preserve row/host identity, focus, caret and selection. Do not reconstruct whole render trees to make tracking warnings disappear.
- Verify V2 stores, writable derivations and async APIs before using them. Function-form signal initialization, store draft setters and async boundaries must not be inferred from Solid 1 memory.
- DOM renderer types and APIs must follow installed `@solidjs/web` exports; reactive primitives follow installed `solid-js` exports. Do not introduce retired imports.

## Required repair workflow

1. Start from the supplied diagnostic and named component. Read the exact causal source and relevant docs; no redundant broad audit first.
2. Identify the reactive read, its tracking scope and its construction owner separately. A correct dependency does not prove correct provider ownership.
3. State why the proposed adaptation preserves source behavior and why any memo/effect is necessary.
4. Make a coherent minimal repair; review nearby copies only for that demonstrated cause. Keep shared-file ownership disjoint.
5. Run the existing focused checks. For docs, run `npm run check:docs` from `docs-website/upstream` after coherent changes; avoid repeated expensive builds.
6. Verify the actual affected browser interaction with fresh served code. Check diagnostic output separately from behavior. For inputs retain focus/caret/selection/DOM identity; for popups verify anchoring, reopen and focus restoration.
7. If the cause is proven library-only under docs-only authorization, record source path, exact failure and smallest next step in docs-local issues; continue independent repairs. Do not contort demos to hide it.

Respect repository blocker budgets. Never call compilation a behavior pass, a single demo a full-family qualification, or planned commands executed evidence.

## Final review checklist

### Rejected approaches from this migration — do not reintroduce

| Tempting workaround | Required alternative |
| --- | --- |
| `return createMemo(() => <I18nProvider ...>...</I18nProvider>)` around a whole example | Identify the eager read/prop forwarding seam. Preserve normal component setup and live configured props; do not rebuild the tree. |
| `{live => createMemo(() => live.selectedText || live.defaultChildren)}` | Direct tracked JSX, or a justified named derivation declared inside an owned callback before returned JSX. |
| `{() => predicate && <OverlayArrow />}` and `{() => props.children}` added everywhere | Prefer ordinary tracked JSX/`Show`; confirm compiled semantics and actual children contract before removing necessary deferred boundaries. |
| Destructuring `trigger`, `selectedItems` or state from a live render callback | Keep the live callback object and read its fields in tracked expressions. |
| Resolving trigger and popup children together above their providers | Resolve each at its correct construction owner; retain working ownership until a natural-JSX replacement is verified. |
| Eager spreading/enumerating a bridge Proxy, then hiding its warning with tree memos | Trace getter/key/descriptor reads and repair the authorized forwarding seam. Forwarding a subset is valid only if it preserves the entire configured source contract. |
| Wrapping native `render()` inside an owned props-root setup | Respect the integration's established ownership boundary; this docs bridge previously caused owned-write/HALTED cascades. Consult ISLANDS.md and checkpoint before changing it. |
| Quieting ListBox text warnings with invented labels | Supply actual source-corresponding `textValue` and preserve typeahead/filter behavior. |
| Adding `untrack`, `ownedWrite`, fake context defaults or swallowed errors | Fix the genuine read/ownership cause, or document a read-only library blocker. |
| Using flushes, microtasks, timers or absolute-position offsets to make demos work | Preserve native scheduling, refs, providers and positioning algorithms. |
| Crediting old browser passes after removing/reworking speculative memo repairs | Requalify the affected changed code; mark old experiments as historical, not current acceptance. |

Plain accessors are valid, not inherently hacks. For a cheap derived value, `const selectedText = () => live.selectedText || live.defaultChildren; return <>{selectedText()}</>;` expresses the read explicitly in tracked JSX. Do not replace every accessor with a memo, or blindly remove every function-valued child.

Before delegating, include this skill and these known rejected approaches in the brief. A successor must inherit unresolved causes and budgets, not restart warning-silencing experiments.

- [ ] Relevant V2 docs queried; installed API/semantics checked when unfamiliar or conflicting.
- [ ] No setup snapshots of values expected to update.
- [ ] No blanket tree-memo wrappers or inline memo-factory workarounds.
- [ ] Necessary named derivations declared before JSX in their proper owned scope.
- [ ] Natural composition preserved where supported; public factory requirements tracked explicitly.
- [ ] No hidden dependencies, scheduling hacks or read-only library edits.
- [ ] Original DOM, events, accessibility, focus/caret/state and cleanup retained.
- [ ] Actual passing checks distinguished from pending and blocked verification.
