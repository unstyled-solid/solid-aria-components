# Button/link/field website lane

## Current status
- **Native implementation prepared; shared wiring + browser qualification NOT complete.** Main 35 live demos and 8 existing hook demos have native mount modules. No native-browser success or library behavior success claimed.
- Authorized ownership: sibling main `pages/react-aria/{Button,Link,ToggleButton,Switch,Checkbox,TextField,SearchField,NumberField}.mdx`, those eight directories, and this record. All changes under `docs-website`; no shared infra/library/root/test/tracking/manifests/lockfile edits, installs, commits or publishing.
- Terminal-copied real `starters/docs/src` and `starters/tailwind/src` components/helpers into owned page-local `vanilla/` and `tailwind/` directories before adapting. Original hook starter modules/CSS also terminal-copied and retained.
- All component behavior comes from existing workspace native source exports via docs-local `solid-aria-components`. Native helpers use `.solid.tsx` suffix per latest ISLANDS compiler contract; mounts use `solid-*.tsx`. Renderprops retain live state objects rather than React destructured snapshots; editable state uses native `createSignal` accessors.
- Exact original CSS/class strings, indicator geometry, Lucide icon geometry/classes, starter Form/Field helpers and ProgressCircle retained. Pending timer is 5000ms as upstream, with native unmount cleanup. Displayed source paths/imports match native modules.

## Shared infrastructure coordination — owner ses_ece65ed4affel90w0I2pjpZd9q
- **Critical remaining seam:** ISLANDS now provides React `<NativeDemo module="Button/solid-demo.tsx" />`, but not native replacement inside existing VisualExample/render-fence containers with original controls/source tabs. Replacing each VisualExample with a bare NativeDemo would lose source fidelity and has NOT been done.
- Every owned main VisualExample/render fence (and hook fence) now carries additive `solid="./<Name>/solid-<example>.tsx"` metadata. Shared owner must consume this metadata and route only its live output to the native island, retaining all existing CodePlatter/source/controls/layout behavior; or provide a source-faithful alternative syntax for this lane to apply.
- Existing hero React `component` imports remain pending this shared override; they must not be mistaken for native demo success. Native full code in render fences must **not** be compiled/rendered by React. No fallback/native qualification conflation.
- Main mounts accept optional second `props` bag so original VisualExample/fence controls can supply current values. Keep the island owner/control identity across prop updates (reactive bag/native update boundary), not unconditional remounts that reset selection/input. The one-argument mount/disposer contract still works for defaults.
- Module names below resolve relative to `pages/react-aria/` for NativeDemo registry. Proposed metadata paths are relative to originating MDX. Displayed `files` resolve under copied `docs-website/upstream`.
- Direct owner-session coordination tool was rejected by harness subagent depth limit; this record is the docs-local coordination channel. Shared owner must not edit owned main pages/directories.

## Exact native module coverage (all within `<Name>/`)
| Main page | Modules (all `solid-<suffix>.tsx`) |
|---|---|
| Button | vanilla, tailwind, events, pending, link |
| Link | vanilla, tailwind, events |
| ToggleButton | vanilla, tailwind, selection |
| Switch | vanilla, tailwind, selection, forms |
| Checkbox | vanilla, tailwind, selection, forms |
| TextField | vanilla, tailwind, value, forms, textarea |
| SearchField | vanilla, tailwind, value, forms |
| NumberField | vanilla, tailwind, value, format, scale, numbering, forms |
- Eight hook subpages each use `<Name>/solid-demo.tsx` and preserve their exact original label/action/defaults. Main coverage = 16 hero variants + 2 NumberField additional VisualExamples + 17 rendered fences = **35**.
- Original nonlive anatomy code and Link's explicitly React-framework Next.js/React Router reference-only fences remain intact with source prose; no fabricated Solid-compatible React-router claim. These are not mounted demos.

## Executed checks
- Solidjs v2 docs MCP consulted; installed `@solidjs/web` declarations and actual native exports/source read. No framework/dependency upgrades.
- `rtk proxy node docs-website/upstream/packages/dev/s2-docs/pages/react-aria/Button/verify-pages.mjs` **PASS** → `{mainExamples:35,hookExamples:8,cssFiles:60}`; all native island/source-drawer paths exist; every original main live demo has exactly one island annotation; 60 CSS files byte-identical to their canonical starter sources; upstream main prose/layout/API identical excluding adapted code/VisualExample declarations.
- `rtk proxy node docs-website/upstream/packages/dev/s2-docs/pages/react-aria/Button/verify-fields.mjs` **RED dependency declarations / owned source clean** → `{total:2,owned:0}` for every owned native TS/TSX module and its real native dependency closure. Initial local DOM/Label/Text `class` and ARIA pseudo-boolean spellings corrected, no production changes.
- Remaining two TS2307 errors are docs-local `tailwind-variants/dist/transformer.d.ts` importing nonexistent Tailwind4 `tailwindcss/types/config` and `tailwindcss/types/generated/default-theme`. Shared dependency owner notified here; no skips/suppressions/declaration stubs/manifests edited.
- `rtk curl -I --max-time 10 http://localhost:4340/react-aria/Button` **connection refused**, exit 7. Shared checkpoint still lacked serving/browser qualification at that probe. No browser run/pass claimed.

## Browser acceptance still required once real shared server responds
- All eight main routes: nav/heading/prose/anatomy/API/source tabs preserved, both Vanilla CSS/Tailwind heroes physically mounted natively, prop controls actually change native demo output.
- Button press-start/end and 5000ms pending; Link attributes + press callback; ToggleButton controlled Star; Switch/Checkbox controlled selection, indeterminate control and required form validity/error association.
- TextField controlled name/email validation/textarea; SearchField controlled value+Enter submission+clear/form validity; NumberField controlled step+format/scale/Devanagari locale/form raw value.
- Verify island disposal/unmount and repeated route navigation; record wiring errors separately from underlying native-library behavior bugs. **No library repairs authorized.** No library bug discovered yet because real website browser checks have not run.
