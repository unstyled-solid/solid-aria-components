# Native demo island contract

Keep MDX prose/examples and upstream layout intact. Add page-local `solid-demo.tsx`
(or named `solid-*.tsx`) beside copied MDX.

Export `mount(element: HTMLElement): () => void`, using `render` from `@solidjs/web`
and actual components from `solid-aria-components` (docs-local bundler aliases this
to repository package source). Use native Solid 2 composition; no React imports.
Return render's disposer. Export string `title` describing the upstream example.

Shared infrastructure owns React host/island mounting and compilation, exclusively
within an empty container, with disposal on unmount. Page records name module paths,
example provenance, CSS dependencies and observed library failures. No library edits.
This contract is not yet working serving/browser qualification.

## Bounded live-props bridge batch (Oct 13)
- Ownership: `src/solid-mount.ts` only plus this contract and the existing warning report; shell/compiler/library remain read-only.
- Frozen verification: `npm run check:docs` from `docs-website/upstream`; fresh existing no-HMR server4340 ColorField configured control update and date/internationalized spread, preserving original input/trigger/focus/caret; existing island disposal/remount contract when affected. No additional suites/build/server.
- Configured keys are dynamic: VisualExampleClient initializes controls, can delete Size props, and URL hydration adds keys. Do not freeze initial keys or narrow forwarding. Preserve getters/callbacks/refs/children and root-return-before-mount ownership.
- Implemented/verified: pinned native `merge(propsAccessor)` replaces foreign Proxy. Native merge-view metadata lets compiled forwarding retain its memo-backed dynamic source without setup enumeration. MCP Solid2 merge/reactivity/glossary + installed rc13 declarations/runtime checked. Root-return-before-mount unchanged; no key snapshot or value/getter copy. Hypothesis1 successful; failed hypotheses0/3.
- Checks PASS: docs preflight1.45s/107pages/670sources/0findings; fresh served bridge `solid-mount.2b2ff76e.js` contains native merge. ColorField configured label updates, original input/value/selection2–4 retained (focus intentionally moves to edited control). Calendar example6 spread advances October→November retaining original focused Next; no bridge/Example diagnostics. Calendar hero Vanilla→Tailwind→Vanilla disposes both old buttons, remounts native islands without unavailable state. Existing Calendar SelectValue/library STRICT and accessibility issues remain, not globally clean.

React host: `src/NativeDemo.tsx` exports `NativeDemo`. Native module names must
start `solid-` (or end `.solid.tsx`) so docs-local Parcel chooses the native compiler.
Imported repository package source is also compiled natively. React-shell imports
retain their original React dependencies. No root configuration changes are needed.

MDX integration (serializable across the original React server/client boundary):
`import {NativeDemo} from '../../src/NativeDemo'` in a main component page, then
`<NativeDemo module="Button/solid-demo.tsx" title="Native Solid example" />`.
Do not pass a server-authored loader function through React's client boundary.
