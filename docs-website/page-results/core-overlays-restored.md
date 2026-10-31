# Core overlays and utilities — restoration checkpoint

## Implemented, not browser-qualified

Ownership: only main MDX and same-name demo directories for Sheet, Toast,
PreviewTrigger, DropZone, FileTrigger, PortalProvider, FocusScope and FocusRing.
No library, shared mounting/registry/policy, dependency or root edits.

| Main page | Native render examples |
| --- | ---: |
| Sheet | 6 |
| Toast | 8 |
| PreviewTrigger | 4 |
| DropZone | 3 |
| FileTrigger | 2 |
| PortalProvider | 1 |
| FocusScope | 2 |
| FocusRing | 1 |

All 27 original render fences have native modules; no new placeholder or
unattempted-demo substitution. Original prose, variant switchers, controls,
initialProps and API tables retained. Code panels show the actual native example
and page-local wrapper/style dependencies. Source wrappers/styles, map SVG and
exact installed Lucide icon sources were terminal-copied before adaptation.
Reused existing native starter wrappers remain read-only.

Native adaptations retain source algorithms: signal accessors and derived cart
totals, keyed cart row identity, lazy FocusScope visibility, live wrapper props,
native ref forwarding, CSS pixel units and native SVG icon nodes. Toast's original
view-transition update uses native `flush` in the external transition callback,
not React flushSync. PortalProvider uses the source custom-container composition.

## Executed verification

- Actual pinned Solid 2 DOM Babel compilation: **38 owned TSX files, errors 0**.
- Latest `cd docs-website/upstream && npm run check:docs`: **PASS**, 107 main
  pages / 378 native modules / 655 source-closure modules / 280 stylesheets;
  errors 0, 0.82 seconds. Earlier independent-lane import errors are superseded.
- Solid 2 docs MCP React-migration/state-management references and installed
  `solid-js/types/client/flow.d.ts` keyed For accessor declarations consulted.

## Browser integration blocked — coordinator action required

The existing server was not listening: both `curl -I
http://localhost:4340/Sheet.html` and the later FocusScope.html request failed
with connection refused. No browser mount/interaction pass is claimed.
The coordinator owns native-registry generation and the docs server. Refresh
the registry and restore port 4340, then resume this lane for real `.html`
mount/error counts plus Sheet/cart, Toast/dismissal, preview hover/focus,
DropZone/file selection, custom portal and focus-management interactions.
This is **not completed end-to-end** and is not a proven component/library
failure. No placeholder exception has been requested or justified.

## Finite actual transport coverage — Oct13 isolated Playwright lane

- Scope fixed before implementation: DropZone original examples1/2 text/image drag/paste and FileTrigger native cancel only where real transport exists. Gates: actual trusted native event/payload → original callback result; original zone/label/button identity and focus; variant disposal; unfiltered diagnostics and fetched compiled contents. If a demonstrated docs-root change is needed, run existing `npm run check:docs` plus these affected original flows only. No implementation change has been made, so no ceremonial preflight/build/server or passing reselection rerun.
- Source parity inspected: frozen `upstream/react-spectrum/packages/dev/s2-docs/pages/react-aria/DropZone.mdx:16–92` and docs `DropZone/solid-example-{1,2}.tsx`. Existing metadata-owned Show retained; original accepted-type distinction (`image.gif` vanilla vs `image/gif` Tailwind), first-accepted-item/getText/getFile callback semantics preserved. Revised USER budget is7 failed methods per root cause, counting inherited2 unqualified clipboard methods (no reset); selector role mismatch is a diagnosed automation selector correction, not a reactive fix.
- **Executed vanilla TEXT PASTE pass, source freshness/other transports still pending:** own new Playwright Chromium process/context with clipboard-read/write permissions, platform MacIntel, original native hidden DropZone button focused; real `Meta+V` after `navigator.clipboard.writeText('Native Vanilla CSS clipboard transport')` delivered `paste.isTrusted=true`, target BUTTON inside original zone, exact `text/plain` payload and no files. Original label displayed that exact string; captured original zone/button/label remained connected and button retained focus. No dispatched DataTransfer/event or replaced callback. Temporary script: `/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/dropzone-transport.cjs`.
- Follow-up Tailwind click initially used wrong role selector (hydrated switcher is not role button); exact existing button/text selector corrected. Subsequent isolated run failed at navigation with `net::ERR_CONNECTION_REFUSED` on sole coordinator-owned4340. This is infrastructure interruption, not a component defect or failed payload hypothesis. First run did not reach final asset/diagnostic print, so those are explicitly **not yet qualified**, nor are image paste/native drag/Tailwind/disposal. Own contexts/processes closed in `finally`; shared Chrome/page1 untouched; no duplicate server/build.
- Cancellation capability established **source/protocol only, runtime pending**: installed Playwright1.57 FileChooser exposes only `setFiles`; however its bundled Chromium `types/protocol.d.ts:15623–15635` explicitly supports `Page.setInterceptFileChooserDialog({enabled:true,cancel:true})`, cancelling a request by emitting relevant events while not showing the OS chooser. This is a genuine browser-supported cancellation transport to investigate, not an empty-list upload/synthetic cancel. Native FileTrigger source `packages/react-aria-components/src/FileTrigger.tsx:64–80` clicks/reset-values and forwards only change to onSelect; original hero maps selected filenames. Planned proof is trusted native input cancel, zero change, unchanged empty selection/output and retained original input/button/focus; manual visible OS-dialog dismissal would remain separately unqualified.
- **Final executed text-transport qualification (both original variants):** following coordinator readiness, own isolated Playwright Chromium with clipboard permissions delivered exact `Native Vanilla CSS clipboard transport` / `Native Tailwind clipboard transport` through actual MacIntel `Meta+V`, native trusted paste targeted the original hidden button, `text/plain` matched displayed original label. Zone/button/label stayed connected and identical, original button stayed focused. Actual mouse drag from the existing unmodified `useDrop` anchor (bounding box1048,388,180×32) to each original zone delivered trusted `dragstart`→`dragenter`→`drop`→`dragend`; drop contained `text/plain`, `text/uri-list`, `text/html`, exact `http://localhost:4340/useDrop`, and original label displayed that URL. No synthetic event/DataTransfer/draggable mutation/callback override. Original zone/button/label retained; mouse gesture moved focus to an A (not credited as DropZone focus retention). Settled `data-drop-target` absent. Vanilla→Tailwind and Tailwind→Vanilla both disconnected captured original zone and original hidden button, qualifying actual variant cleanup.
- **Actual image clipboard delivery observed, image callback result NOT qualified; exact inherited browser seam:** native trusted paste into BOTH original buttons carried `Files`, one file item `image.png`/`image/png`/88bytes from a real browser clipboard PNG write, `getAsFile()` valid but `webkitGetAsEntry()` null. Both labels remained original prompt (or prior text in first replay), no image appeared; original nodes/button focus retained. `packages/react-aria/src/dnd/useClipboard.ts:126–135` forwards `readFromDataTransfer`; native `dnd/utils.ts:255–269` skips every file item with null entry. Frozen upstream `upstream/react-spectrum/packages/react-aria/src/dnd/utils.ts:253–267` has the SAME skip, so this is a source-inherited Chromium clipboard-entry limitation, **not a docs-root ownership defect or migration-only attribution**. Preserve the metadata-owned Show; no docs/native/dependency patch. One actual image-clipboard method plus inherited2 input-method attempts retained (3 methods total, revised limit7; diagnostic replay is not a new unsuccessful fix). No need to burn remaining methods on this diagnosed same seam. Actual OS/file image drag remains unqualified: proven DOM-anchor drag has string representations, not file payload; no synthetic CDP drag invented as a native file-drop proof.
- **FileTrigger hero browser-native request cancellation PASS, visible OS chooser dismissal still unqualified:** actual source trigger mouse click under supported CDP `Page.setInterceptFileChooserDialog({enabled:true,cancel:true})` produced original input programmatic click (`isTrusted=false`, expected from source `input.click()`) followed by actual browser `cancel.isTrusted=true`, **zero change events**, empty input value/FileList. Original captured input/button remained connected and button focused. Source forwards onSelect only from change, so no cancellation selection callback inferred/invented; original filename output stays empty. Interception disabled and own CDP session detached afterward. This proves browser-native chooser-request cancellation, not a shown OS-dialog Escape/dismissal, and is not `setFiles([])` or a dispatched cancel. Chooser unfiltered diagnostic counts were not printed in that replay; no warning-free chooser claim.
- **Fetched CONTENTS freshness:** HTTP200 DropZone `solid-example-1.fd42f267.js` and `solid-example-2.c3611f82.js` explicitly contain `setContent({url,name:item.name})` metadata plus compiled native `createComponent(...Show...)`; vanilla accepted list retains source `image.gif`, Tailwind `image/gif`. HTTP200 FileTrigger `solid-example-1.2343b5dc.js` explicitly contains source `onSelect`→Array.from→filename mapping→setFiles and `files().join(', ')`, original Select a file button. Filename alone was not the proof. The final DropZone replay's unfiltered console warnings/errors/pageerrors are0 (not a whole-site/chooser diagnostic claim).
- Evidence scripts executed: temporary `dropzone-transport.cjs` (text/image/native request cancel) and `dropzone-native-remainder.cjs` (exact image entry evidence, original DOM mouse drag, variant cleanup) in approved temp path above. Own context/process closure executed via finally after every run; passive native-event logging removed before final variant disposal. No installed apps/processes/CCC touched, no shared Chrome page1, extra docs server/build, unrelated page audit or implementation/preflight edits. Lane complete at this finite qualification boundary; coordinator owns checkpoint reconciliation and any decision on inherited null-entry behavior.
