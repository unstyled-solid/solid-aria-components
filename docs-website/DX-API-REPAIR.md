# Repair user-facing lazy-child APIs

## Goal

Restore natural nested JSX for ordinary component composition. Consumers must not need arrays of zero-argument factories merely to get provider ownership, working refs, or correctly anchored overlays. Keep necessary deferred construction inside the implementation.

This is a future repair brief, not an implemented fix or a library-wide audit. Current authorization remains docs-only; changing the library requires separate authorization.

## Confirmed problem and evidence

The Autocomplete **Add tag...** dropdown appeared at the top-left rather than anchored to its button. The docs repair deferred trigger and popup construction into their appropriate contexts:

- `upstream/packages/dev/s2-docs/pages/react-aria/Autocomplete/solid-example-3.tsx`
- `upstream/packages/dev/s2-docs/pages/react-aria/Autocomplete/vanilla/Menu.solid.tsx`

Paths in this document are relative to `docs-website/`.

The user confirmed anchoring worked after that repair. The exact internal ref-overwrite mechanism was **not independently verified**. Do not describe a library defect or precise ref mechanism as proven.

The behavior repair exposed an unacceptable authoring workaround:

```tsx
<MenuTrigger children={[
  () => <Button>Add tag...</Button>,
  () => <Menu>{/* items */}</Menu>
]} />
```

Target authoring shape (not yet established as supported):

```tsx
<MenuTrigger>
  <Button>Add tag...</Button>
  <Menu>{/* items */}</Menu>
</MenuTrigger>
```

The wrapper must preserve its existing implicit Popover behavior and support an intervening container around Autocomplete/SearchField/Menu, as in the actual Tags demo.

## Known inventory — do not overstate it

- Two distinct wrapper APIs explicitly require factory tuples in ListBox's native Menu wrappers: `MenuTrigger` and `SubmenuTrigger`.
- A targeted text scan found **28 explicit lazy-child syntax occurrences**, including duplicated wrappers and demos. This is not 28 components, nor a complete inventory.
- The scan's earlier reported example/page counts were incomplete: it recognized `solid-example-*` but missed `solid-demo*`. Do not reuse those counts.
- No evidence establishes that most library components impose this API. Inspect public types and ordinary JSX behavior before assigning a library-wide count.

Start with these concrete files:

| Area | Files under `upstream/packages/dev/s2-docs/pages/react-aria/` |
| --- | --- |
| Explicit tuple types | `ListBox/native/vanilla/solid-Menu.tsx`, `ListBox/native/tailwind/solid-Menu.tsx` |
| Tags regression | `Autocomplete/solid-example-3.tsx`, `Autocomplete/vanilla/Menu.solid.tsx`, `Autocomplete/tailwind/Menu.solid.tsx` |
| Duplicated wrappers | `TokenField/vanilla/Menu.solid.tsx`; locate Menu-page wrappers through their imports |
| Affected callers | `Menu/solid-demo01.tsx` through `Menu/solid-demo16.tsx`, `Modal/solid-demo03.tsx` |

Do not assume every file in that range contains the workaround; inspect actual call sites.

## Investigation and repair sequence

1. Inventory public-facing factory requirements in docs wrappers and, with authorization, library exports. Classify each occurrence as a consumer requirement, an internal ownership mechanism, or a legitimate render prop.
2. Trace MenuTrigger/SubmenuTrigger from caller through wrapper to native provider, trigger ref registration, Popover and portal. Identify exactly where ordinary JSX is evaluated prematurely. Consult pinned Solid 2 documentation and declarations, not Solid 1 assumptions.
3. Design an implementation-owned deferred boundary. Prove natural JSX can cross it correctly before converting all duplicates. Do not simply remove factories and recreate the anchoring bug.
4. If the existing native API cannot preserve natural JSX, document the concrete limitation and smallest required library change. Obtain authorization before editing outside docs; do not invent an alternate public API as an unnoticed workaround.
5. Repair one coherent MenuTrigger/SubmenuTrigger family, then update duplicated wrappers, demos, displayed source and public types consistently. Preserve behavior, markup and styles.
6. Audit other provider-dependent families only for the same demonstrated authoring problem: Tabs, Checkbox/Radio, ComboBox, collections and overlays. Internal lazy children alone are not evidence of bad public DX.

## What is and is not a bad API

**Reject:** mandatory `children={[() => ..., () => ...]}`, caller-managed ownership plumbing, unexplained zero-argument factory requirements, manual trigger-ref workarounds for ordinary composition.

**Keep when meaningful:** item renderers receiving data, render props receiving selection/open state, and private implementation factories. These serve a semantic purpose beyond compensating for prematurely constructed children.

## Acceptance criteria

- Ordinary nested JSX works for both MenuTrigger and SubmenuTrigger, including the actual Autocomplete Tags composition.
- Public wrapper types accept that composition without factory tuples, casts or caller-supplied ownership machinery.
- The Tags popup anchors to its button after opening, closing and reopening; filtering and selection still work.
- Menu nesting, keyboard activation/navigation, Escape dismissal and focus restoration retain upstream behavior.
- Relevant existing Vanilla/Tailwind demos use the improved syntax and displayed source matches executable demos.
- No new missing-provider/ref errors, PressResponder warnings or strict reactive-read diagnostics attributable to the repair.
- Run the existing docs preflight (`npm run check:docs` from `docs-website/upstream`) and focused real-browser interaction checks. Compilation alone is not acceptance.
- Report the number of **distinct affected public APIs**, separately from duplicate wrappers and call sites; identify unverified families explicitly.

## Non-goals and guardrails

No console suppression, blanket untracking, manual positioning, scheduling hacks, React demo fallback, weakened assertions or replacement menu algorithms. Preserve legitimate render-prop APIs. Do not fix unrelated library bugs or expand into a general website rewrite.

Retain the working factory-based repair until the replacement meets behavioral acceptance. Apply repository blocker budgets and record an unresolved limitation rather than claiming a clean API without evidence.
