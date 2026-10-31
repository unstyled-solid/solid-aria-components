# Unavailable executable-demo audit

Read-only source audit for sole implementer `ses_ece322e65ffem1C2LVYG6aYICI`. Only this record was written. No builds, framework experiments, source changes, or index mutation. Read `ISLANDS.md` and `CHECKPOINT.md`; semantic search used without refreshing the root index. This is evidence, **not whole-site completion or runtime qualification**. Counts are a live source snapshot while implementation may continue.

## Inventory

Paths below are relative to `docs-website/upstream/packages/dev/s2-docs/pages/` unless otherwise stated.

- 336 copied MDX pages scanned, all namespaces (including home, guides, releases, blogs, examples, hooks and S2).
- 580 fences still carrying a `render` metadata token: 256 under `react-aria`, 324 under `s2`.
- 555 lack an explicit `solid=` override or `./NativeDemo` import. This is a **candidate count**, not proof all 555 execute React: some hook fences can be auto-routed by shared infrastructure. Check routing before neutralizing.
- 167 fences already carry `nativeModule=`; these are additional native fences, often with `render` removed. Do not blanket-disable these.
- 96 `<VisualExample>` occurrences; 36 pages contain `solid=` metadata. 28 of those still have candidate React-demo bindings outside fences (listed below).
- A fence-aware scan found **no callable exports or React hook invocations outside fences**. `export function AddForm` in both `forms.mdx`, and `export function horizontalStack` in `s2/styling.mdx`, are displayed fence content, not top-level MDX callable exports. Preserve page metadata/default Layout exports. Do not confuse raw text grep hits with executable MDX.

## Concrete missing dependency / execution cases

| File / source line | Finding | Action for unavailable native equivalent |
|---|---|---|
| `react-aria/examples/ios-list.mdx:17–23` | Executable `tsx render` imports type and runtime APIs from `motion/react`, plus React hooks; `motion/package.json` absent in isolated `upstream/node_modules`. | Remove executable render path/import extraction; preserve full inert source and show exact `TO BE DONE LATER`. Installing motion merely restores a forbidden React demo. |
| `react-aria/examples/emoji-picker.mdx:16,24` | Executable React demo imports `emojibase-data/en/compact.json`. Dependency exists locally; still not native Solid. | Native island or unavailable placeholder, not dependency-based approval. |
| `react-aria/Autocomplete.mdx:1123` | Render-example source imports `textarea-caret`; package exists locally. | Verify native routing for this specific example; otherwise neutralize. |
| `react-aria/customization.mdx:21–33` | `motion/react` import is in an **inert** fence, no render metadata. | Preserve displayed source; do not add it to the executable graph. |
| `react-aria/styling.mdx:400,468` | Motion imports in displayed example source. | Inspect fence metadata, leave inert source inert. |
| `react-aria/examples/photos.mdx:4,18` | Direct `import App from './photos/App'` and `<App />`, outside fences. | Fence-only fix misses this; comment/remove executable import and mount, retain `ExampleApp` source viewer if safe, add exact placeholder. |
| `react-aria/index.mdx:4–20` | Home imports `KanbanExample`, `ListBoxExample`, `FocusExample`, `I18n`, `SwitchAnimation`, and starter TextField/Popover/Button. | Distinguish navigation/presentation from showcased component demos; unavailable home showcases also need placeholders. |
| `s2/index.mdx` | Home/local examples and all S2 render fences remain a separate React execution surface. | If included in “whole docs”, no exemption for demos merely because they use Spectrum rather than React Aria. Preserve React shell. |

Other observed package availability: `react-hook-form` and `zod` absent locally, but imports found in displayed documentation are not automatically build dependencies. Do not chase inert-example dependencies.

## Solid metadata with retained React demo bindings

`react-aria/{Meter,RangeCalendar,SearchField,DateRangePicker,ColorWheel,ColorSlider,ProgressBar,NumberField,ColorField,Breadcrumbs,Link,Disclosure,DatePicker,Tabs,Slider,Button,ColorArea,TimeField,Separator,DateField,RadioGroup,Checkbox,ToggleButton,TextField,Calendar,Switch,ColorSwatch,CheckboxGroup}.mdx`.

Concrete example: `Button.mdx:24–25` and `:33–34` retain `component={VanillaButton}` / `component={TailwindButton}` while adding `solid="./Button/solid-vanilla.tsx"` / tailwind. A live-output override does **not** erase those MDX imports or component expressions from compilation. Remove or neutralize unavailable React demo bindings without breaking docs/API imports, source drawers, or native island controls. `Tabs.mdx` demonstrates already-converted fences (`nativeModule=` with no `render`), which should remain native.

Other retained direct starter/local-demo import candidates: `react-aria/{ComboBox,GridList,ListBox,Tree,TagGroup,ColorPicker,ColorSwatchPicker}.mdx`; inspect top-level imported bindings and `<VisualExample component=...>` individually.

## Remaining render-fence inventory (all matching page paths)

Every path in these groups still contains at least one `render` fence at audit time. Names without suffix mean `.mdx`. This is exhaustive for the snapshot, not a list of confirmed failures.

- `react-aria/`: Sheet, FileTrigger, FocusScope, TokenField, selection, dnd, Group, DropZone, NavigationTree, FocusRing, Tabs, Toast, forms, ColorSwatchPicker, getting-started, Autocomplete, Form, collections, ColorPicker, DisclosureGroup, PortalProvider, Menu, Virtualizer, PreviewTrigger.
- `react-aria/` utility hooks: useDateFormatter, useObjectRef, useCollator, useFocusWithin, useDraggableCollection, usePress, useMove, useContextMenu, useDrag, useHover, useFocusRing, useKeyboard, useLongPress, useNumberFormatter, useClipboard, useLandmark, useDrop, useListFormatter, useFocus, useFilter, useField, useFocusVisible, useLabel, useDroppableCollection.
- `react-aria/` nested hooks: TagGroup/useTagGroup, Tooltip/useTooltipTrigger, TimeField/useTimeField, ToggleButtonGroup/useToggleButtonGroup, Calendar/useCalendar, DatePicker/useDatePicker, Toast/useToast, Toolbar/useToolbar, ListBox/useListBox, Slider/useSlider, ComboBox/useComboBox, ColorField/useColorField, RangeCalendar/useRangeCalendar, Popover/usePopover, DateRangePicker/useDateRangePicker, GridList/useGridList, DateField/useDateField, ColorWheel/useColorWheel, Table/useTable, ColorSwatch/useColorSwatch, Menu/useMenu, ColorArea/useColorArea, Select/useSelect, Modal/useModalOverlay, ColorSlider/useColorSlider.
- `react-aria/examples/`: ios-list, kanban, swipeable-tabs, emoji-picker, ripple-button. Direct photos/App is additional to this list.
- `react-aria/blog/`: sheet, introducing-react-spectrum, how-we-internationalized-our-numberfield. `react-aria/releases/`: v1-21-0, v1-22-0, v1-20-0.
- `s2/`: ai-components, illustrations, RangeCalendar, SearchField, DateRangePicker, ColorWheel, ColorSlider, ComboBox, ActionMenu, ActionButtonGroup, Tooltip, NumberField, InlineAlert, ActionBar, ColorField, Breadcrumbs, Accordion, ContextualHelp, Link, SideNav, selection, dnd, ButtonGroup, DropZone, Disclosure, IllustratedMessage, DatePicker, Tabs, TableView, Popover, Slider, Card, Button, ListView, ColorArea, Toast, forms, TimeField, Image, ColorSwatchPicker, AvatarGroup, DateField, Skeleton, Form, SideNavPanel, collections, ToggleButtonGroup, Provider, RadioGroup, Checkbox, TextArea, SegmentedControl, ToggleButton, TextField, CardView, Calendar, Switch, ActionButton, TreeView, ColorSwatch, Picker, RangeSlider, icons, CheckboxGroup, Menu, Dialog, TagGroup, LabeledValue, SelectBoxGroup.
- `s2/releases/`: v1-8-0, v1-6-0, v1-7-0.

## Suggested shared seam (implementer owns changes)

1. `docs-website/upstream/packages/dev/s2-docs/MDXTransformer.mjs:13–34` is the origin-aware pre-compilation fence seam. It already removes `render` for native islands. For unfinishable execution, stop extraction **before** Parcel compiles the fence; retain its code body as an inert source block and insert exact visible `TO BE DONE LATER`. A runtime CodeBlock fallback alone is too late for missing imports/build errors.
2. Native routing and unavailable classification must be explicit: do not silently React-render unmatched fences; do not route every hook to an unrelated page-level default demo.
3. `src/CodeBlock.tsx:108–133` replaces live output but also resolves source/download dependencies via `getExampleFiles`. Keep unavailable source inert so an absent demo import does not get resolved by this source-panel path either. Preserve source text/layout rather than deleting examples.
4. `src/VisualExample.tsx` and page MDX hero imports need the corresponding unavailable branch; a native `solid` prop alone cannot prevent top-level React imports being bundled. Direct `<App />` / home showcases need explicit page-level neutralization too.
5. `upstream/packages/dev/parcel-transformer-mdx-extract/MDXExtractTransformer.mjs:19–27` extracts imports from **all** TSX fences, not just executable ones, when the extract pipeline is invoked. Keep this caveat in mind for source-extraction consumers; removing `render` is sufficient only when that pipeline is not invoked for the inert sample.

Allowed React: copied MDX/React website Layout, navigation, controls, source tabs, API/prose presentation and empty NativeDemo host. Not allowed React: showcased component demos, starter demos, hook examples, directly mounted sample apps or home demos. Preserve inert original React source for reading. Commenting execution must not leave compiled imports, JSX references, or hooks that still throw. Visible unavailable output must be exactly **TO BE DONE LATER** (not alternate wording).

## Qualification boundary

No routes/builds/browser interactions were run by this audit. The checkpoint's 336-page metadata parse pass is not executable-demo compilation or full-site qualification. Implementer should use this record as source evidence for neutralization, not as a completion claim.
