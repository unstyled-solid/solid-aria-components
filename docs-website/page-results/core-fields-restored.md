# Core fields: native restoration

Status: **implemented and compile-checked; browser qualification pending**. The coordinator stopped the docs server at the user's request while the native usage audit was underway. Do not mark these pages browser-qualified or complete from this record.

Only the seven main MDX pages and their same-name demo directories were edited, plus this record. No library, shared island infrastructure, root configuration, dependencies, upstream canonical source, commits, or publishing changes.

| Page / exact route on port 4340 | Native islands | Source examples retained |
| --- | ---: | --- |
| `/Autocomplete.html` | 10 | Vanilla/Tailwind command palettes; Menu, Select, ListBox, TagGroup, GridList, Table, async list, textarea mentions |
| `/TokenField.html` | 8 | Vanilla/Tailwind tokenization; controlled value, custom tokenization, mentions/commands, tags, structured search, ComboBox |
| `/Form.html` | 7 | Vanilla/Tailwind form; client action correspondence, native constraints, validation behavior, custom validation, error summary |
| `/Group.html` | 1 | Serial-number InputGroup and original controls |
| `/DisclosureGroup.html` | 3 | Vanilla/Tailwind accordion and controlled expanded keys |
| `/ColorPicker.html` | 7 | Vanilla/Tailwind picker; controlled color, channel sliders, wheel/area, channel fields, swatches |
| `/ColorSwatchPicker.html` | 3 | Vanilla/Tailwind swatches and controlled selected color |

All 39 source demo variants are wired through existing `solid`/`nativeModule` metadata. **No placeholders added.** Source prose, layout, options, labels, datasets, and styles retained. Wrapper/style panels point to the actual native variants; inline examples match their executable modules. Starter components/styles were terminal-copied before adaptation. Recursive local CSS imports and assets, including original theme/utilities stylesheets, were copied byte-for-byte into the owned directories.

Native adaptations:
- Live props via getters/`omit`; signal reads remain reactive, not component-setup snapshots. Token autocomplete and structured-search suggestions are computed memos. Model subclass algorithms remain source copies.
- Native providers and lazy render-prop children for stateful field/picker/disclosure ownership. No React runtime in owned native modules or displayed native examples.
- Autocomplete mention completion carries the next accepted text and caret request in its event. A two-phase `createEffect` synchronizes **only DOM selection** after that text commits. Closing the mention happens in the event; no signal writes in that effect, microtask scheduling, flush, or diagnostic suppression.
- Form's simple client action is a native submit/FormData handler with the source alert and successful-submit reset, not a claim of React Server Action support. Error-summary focus uses an owned `onSettled` lifecycle after connection, not an eager ref callback.
- Color channel lists preserve channel keys with pinned RC13 `For keyed={channel => channel}` accessor children. Installed declarations, rather than default-For assumptions, govern this usage.

Executed verification:
- `npm run check:docs` from `docs-website/upstream`: **PASS**, 107 pages / 393 native modules / 670 native sources / 283 stylesheets, 0 findings, 0.80 seconds (latest global counts include concurrent owners).
- Owned native type program: **0 owned diagnostics**, log `/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/core-fields-types.log`. Library diagnostics are outside this lane; this is not a whole-library type qualification.
- Actual docs native Babel plugin/options: **150 owned TS/TSX files compiled, 0 errors**; final affected Form submit/reset compile also PASS. No whole-site builds run.
- Fresh browser attempts at `/Group.html` on localhost and 127.0.0.1:4340: **connection refused** while server stopped. No mount, interaction, caret, geometry, source-panel, or warning-cleanliness passes claimed.

Remaining gate: coordinator restarts the actual server after readiness, then verify every island on these exact `.html` routes, both visual variants and prop controls/source panels. Especially exercise textarea `@` typing → completion → exact caret → continued typing; token mentions/structured search/ComboBox; form invalid/submit/reset/error-focus; expanded-key updates; color popover/channels/swatches. Fresh runtime failures must be diagnosed locally before any library-blocker classification. None is proven by this compile-only stage.
