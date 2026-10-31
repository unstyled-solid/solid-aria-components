import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import solid from '@solidjs/vite-plugin';
import {readFileSync} from 'node:fs';
import {intlJsonPlugin} from './scripts/test/intl-plugin.mjs';
import {spectrumCSSPlugin} from './scripts/test/spectrum-css-plugin.mjs';

// Also cover direct Vitest invocations before workers import date/Intl consumers.
process.env.TZ = 'UTC';
const maxWorkers = Number(process.env.HARNESS_MAX_WORKERS ?? 2);
// Explicit file selectors activate captured P02 suites without broadening test:pilot.
const p02Requested = process.env.P02_TESTS || process.argv.some(arg => /(?:useFocus(?:Within|Visible)?|useKeyboard|Focusable|focusSafely|PressResponder|Pressable|useObjectRef|useControlledState|useTextField|useFormReset|TextField|FieldError|useLink|Link|Group|useField|DOMFunctions)\.test\./.test(arg));
const spectrumPendingRequested = process.env.P02_SPECTRUM_PENDING || process.argv.some(arg => /(?:usePress|useHover)\.test\./.test(arg));
const sourceSSRRequested = process.env.P02_SSR || process.argv.some(arg => /SSRProvider(?:\.ssr)?\.test\./.test(arg));
const p03Requested = process.env.P03_TESTS || process.argv.some(arg => /(?:FocusScopeOwnerDocument|VisuallyHidden|DismissButton|useModal(?:\.ssr)?|useOverlay(?:\.shadow)?|ariaHideOutside|usePreventScroll|useInteractOutside(?:\.shadow)?|calculatePosition|useOverlayPosition|usePopover(?:\.shadow)?|useOverlayTrigger|useModalOverlay|FileTrigger|useButton|useDialog|useListData|useTreeData|useEvent)\.test\./.test(arg));
const p03FixturesPending = process.env.P03_FIXTURES_PENDING || process.argv.some(arg => /(?:FocusScope|Button)\.test\./.test(arg));
const p03SSRRequested = process.env.P03_SSR || process.argv.some(arg => /useModal\.ssr\.test\./.test(arg));
const spectrumFixtureRequested = process.env.P03_SPECTRUM_FIXTURES || process.argv.some(arg => /(?:mediaQueries|styleProps|Slots|Grid|Provider\.ssr|Text\.ssr)\.test\./.test(arg));
const spectrumFixtureSSRRequested = process.env.P03_SPECTRUM_SSR || process.argv.some(arg => /(?:Provider|Text|Grid)\.ssr\.test\./.test(arg));
const viewportSSRRequested = process.argv.some(arg => /useViewportSize\.ssr\.test\./.test(arg));
const spectrumOverlayRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/overlays/') && /(?:Overlay|Modal)\.test\./.test(arg));
const spectrumIconsRequested = process.argv.some(arg => /(?:ActionButton|UIIcon)\.test\./.test(arg));
const spectrumDialogRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Dialog|DialogTrigger|Popover|Tray)\.test\./.test(arg));
const spectrumDialogSSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Dialog|Heading|Header)\.ssr\.test\./.test(arg));
const keyboardUtilsRequested = process.argv.some(arg => /(?:runAfterKeyboard|keyboard)\.test\./.test(arg));
const p04Requested = process.argv.some(arg => /(?:useCheckboxGroupState|useCheckboxGroup|Checkbox|Switch)\.test\./.test(arg));
const p05Requested = process.argv.some(arg => /(?:ToggleButton|ToggleButtonGroup)\.test\./.test(arg));
const p06DisclosureRequested = process.argv.some(arg => /(?:useDisclosure|useDisclosureState|useDisclosureGroupState)\.test\./.test(arg));
const p06DisclosureSSRRequested = process.argv.some(arg => /Disclosure\.ssr\.test\./.test(arg));
const p06PendingRequested = process.argv.some(arg => /(?:RadioGroup|Disclosure)\.test\./.test(arg));
const p07Requested = process.argv.some(arg => /(?:useTreeState|useSelectableCollection|useMenu|useMenuTrigger)\.test\./.test(arg));
const p07LongPressRequested = process.argv.some(arg => /(?:useLongPress|useContextMenu)\.test\./.test(arg));
const p08Requested = process.argv.some(arg => /(?:Tooltip|useTooltip|useTooltipTriggerState|Breadcrumbs|useBreadcrumbs|useBreadcrumbItem)\.test\./.test(arg));
const p08BreadcrumbsSSRRequested = process.argv.some(arg => /Breadcrumbs\.ssr\.test\./.test(arg));
const p09Requested = process.argv.some(arg => /(?:useSliderState|useSlider|useSliderThumb|Slider|useMove|useNumberFieldState|useNumberField|useSpinButton|NumberField)\.test\./.test(arg));
const p10ToolbarRequested = process.argv.some(arg => /Toolbar\.test\.tsx$/.test(arg));
const p10TabsSSRRequested = process.argv.some(arg => /Tabs\.ssr\.test\./.test(arg));
const p11HiddenSelectRequested = process.argv.some(arg => /HiddenSelect\.test\.tsx$/.test(arg));
const p11SelectRequested = process.argv.some(arg => arg.includes('react-aria-components/test/') && /Select\.test\./.test(arg));
const p75ListBoxRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/ListBox\.test\.(?:js|jsx)$/.test(arg));
const p11SSRRequested = process.argv.some(arg => /(?:ListBox|Select)\.ssr\.test\./.test(arg));
const p12Requested = process.argv.some(arg => /(?:DropTargetKeyboardNavigation|dnd|useClipboard|useDraggableCollection|useDroppableCollection)\.test\./.test(arg));
const p12SSRRequested = process.argv.some(arg => /dnd\.ssr\.test\./.test(arg));
const p13Requested = process.argv.some(arg => /(?:LayoutInfo|ScrollAnchor|GridLayout)\.test\./.test(arg));
const p14Requested = process.argv.some(arg => /(?:useGrid|Icon)\.test\./.test(arg) || (arg.includes('@adobe/react-spectrum/test/switch/') && /Switch\.test\./.test(arg)));
const p14SwitchSSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/switch/') && /Switch\.ssr\.test\./.test(arg));
const p15Requested = process.argv.some(arg => /(?:useComboBoxState|useComboBox|useSearchFieldState|useSearchField|SearchField|useAsyncList|ComboBox)\.test\./.test(arg));
const p15SSRRequested = process.argv.some(arg => /ComboBox\.ssr\.test\./.test(arg));
const p17Requested = process.argv.some(arg => /(?:useColor|useColorFieldState|useColorField|ColorField|ColorArea)\.test\./.test(arg));
const p18Requested = process.argv.some(arg => /(?:useColorWheel|ColorSlider|ColorWheel)\.test\./.test(arg));
const p19Requested = process.argv.some(arg => /ColorSwatchPicker\.test\./.test(arg));
const p20Requested = process.argv.some(arg => /ColorPicker\.test\./.test(arg));
const p21Requested = process.argv.some(arg => /(?:DropZone|Autocomplete)\.test\./.test(arg));
const p22Requested = process.argv.some(arg => /(?:useTagGroup|GridList|TagGroup)\.test\./.test(arg));
const p22SSRRequested = process.argv.some(arg => /(?:GridList|TagGroup)\.ssr\.test\./.test(arg));
const p23Requested = process.argv.some(arg => /(?:useTable|useTableBackwardCompat|ariaTableResizing|TableUtils|Table)\.test\./.test(arg));
const p23SSRRequested = process.argv.some(arg => /Table\.ssr\.test\./.test(arg));
const p26Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Button|ProgressCircle)(?:\.ssr)?\.test\./.test(arg));
const p26SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Button|ProgressCircle)\.ssr\.test\./.test(arg));
const p42ServerRequested = process.argv.some(arg => arg.includes('react-aria/test/i18n/server.test.'));
const p52DictionaryRequested = process.argv.some(arg => arg.includes('packages/@internationalized/string/test/LocalizedStringDictionary.test.js'));
const p44HiddenDateInputRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/HiddenDateInput\.test\.(?:js|jsx)$/.test(arg));
const p44CheckboxGroupRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/CheckboxGroup\.test\.(?:js|jsx)$/.test(arg));
const p45DialogRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Dialog\.test\.(?:js|jsx)$/.test(arg));
const p45PopoverRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Popover\.test\.(?:js|jsx)$/.test(arg));
const p45DialogSSRRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Dialog\.ssr\.test\.(?:js|jsx)$/.test(arg));
const p46MenuRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Menu\.test\.tsx$/.test(arg));
const p46TabsRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Tabs\.test\.(?:js|jsx)$/.test(arg));
const p49FormRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Form\.test\.(?:js|jsx)$/.test(arg));
const p49VirtualizedMenuRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/VirtualizedMenu\.test\.tsx$/.test(arg));
const p51TreebleRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Treeble\.test\.(?:js|jsx)$/.test(arg));
const p59StylesRequested = process.argv.some(arg => /(?:^|\/)packages\/@react-spectrum\/s2\/style\/__tests__\/(?:mergeStyles\.test\.ts|style-macro\.test\.(?:js|jsx))$/.test(arg));
const p61ActionButtonGroupRequested = process.argv.some(arg => /(?:^|\/)packages\/@react-spectrum\/s2\/test\/ActionButtonGroup\.test\.tsx$/.test(arg));
const p61ImageRequested = process.argv.some(arg => /(?:^|\/)packages\/@react-spectrum\/s2\/test\/Image\.test\.tsx$/.test(arg));
const p68SpectrumFixturesRequested = process.argv.some(arg => /(?:^|\/)packages\/@adobe\/react-spectrum\/test\/(?:provider\/Provider\.test\.tsx|dialog\/DialogContainer\.test\.jsx)$/.test(arg));
// testSSR compiles the server copy in its existing physical runner. Its
// in-process fixture import must remain hydratable DOM code, even in Vitest.
const p45HydrationFixture = /\/test\/ssr-harness\/p45-dialog-[^/]*\.[jt]sx?(?:\?.*)?$/;
const p40Requested = process.argv.some(arg => arg.includes('react-aria-components/test/PreviewTrigger.test.'));
const p39Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Well|Badge)\.test\./.test(arg));
const p39SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Well|Badge)\.ssr\.test\./.test(arg));
const p38Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:StatusLight|Meter)\.test\./.test(arg));
const p38SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:StatusLight|Meter)\.ssr\.test\./.test(arg));
const p37Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:TagGroup|ProgressBar)\.test\./.test(arg));
const p37SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:TagGroup|ProgressBar)\.ssr\.test\./.test(arg));
const p36Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Radio|Breadcrumbs|BreadcrumbItem)\.test\./.test(arg));
const p36SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Radio|Breadcrumbs)\.ssr\.test\./.test(arg));
const p35Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:AlertDialog|IllustratedMessage|View)\.test\./.test(arg));
const p35SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:IllustratedMessage|View)\.ssr\.test\./.test(arg));
const p34Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Table|TableNestedRows|TableSizing|TableDnd|TreeGridTable|TestTableUtils|ButtonGroup|Divider)\.test\./.test(arg));
const p34SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Table|ButtonGroup|Divider)\.ssr\.test\./.test(arg));
const p33Requested = process.argv.some(arg => arg.includes('SubMenuTrigger.test.'));
const p33SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/text/Keyboard.ssr.test.'));
const p32Requested = process.argv.some(arg => /useActionGroup\.test\./.test(arg) || (arg.includes('@adobe/react-spectrum/test/') && /(?:ActionGroup|Menu|MenuTrigger|Tooltip|TooltipTrigger)\.test\./.test(arg)));
const p32SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:ActionGroup|Menu|MenuTrigger)\.ssr\.test\./.test(arg));
const p31Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:ContextualHelp|Link|Picker|TempUtilTest)\.test\./.test(arg));
const p31SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Content|Footer|Link|Picker)\.ssr\.test\./.test(arg));
const p29Requested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Checkbox|TextField|TextArea|SearchField|Field|Form)\.test\./.test(arg));
const p29SSRRequested = process.argv.some(arg => arg.includes('@adobe/react-spectrum/test/') && /(?:Checkbox|TextField|TextArea|SearchField|Form|Flex)\.ssr\.test\./.test(arg));
const p28Requested = process.argv.some(arg => /(?:useToastState|useToast|useLandmark|Toast|Sheet)\.test\./.test(arg));
const p28SSRRequested = process.argv.some(arg => /useLandmark\.ssr\.test\./.test(arg));
const p27Requested = process.argv.some(arg => /(?:TokenFieldValue|useDatePicker|DatePicker|DateRangePicker|TokenField)\.test\./.test(arg));
const p24Requested = process.argv.some(arg => /(?:Tree|NavigationTree)\.test\./.test(arg));
const p24SSRRequested = process.argv.some(arg => /Tree\.ssr\.test\./.test(arg));
const p25Requested = process.argv.some(arg => /(?:useCalendarState|useCalendar|DateField|TimeField|Calendar|RangeCalendar|RangeCalendar\.shadow)\.test\./.test(arg));
if (!Number.isInteger(maxWorkers) || maxWorkers < 1 || maxWorkers > 4) throw new Error('HARNESS_MAX_WORKERS must be an integer from 1 to 4');
export default defineConfig({
  // RC13 native SSR hoists type-only generic identifiers into runtime captures.
  // The pinned Babel backend preserves the same dev diagnostics without that defect.
  plugins: [solid({ compiler: 'babel', ssr: true, solid: { generate: 'dom', hydratable: true }, include: p45HydrationFixture }),
    solid({ compiler: 'babel', ssr: true, solid: { hydratable: true }, include: /\.[jt]sx?$/, exclude: p45HydrationFixture }), {
    name: 'pilot-ssr-artifact',
    resolveId(id) { if (id === 'virtual:harness-ssr') return '\0virtual:harness-ssr'; },
    load(id) {
      if (id === '\0virtual:harness-ssr') return `export default ${readFileSync(new URL('./test/ssr-harness/.generated/html.json', import.meta.url), 'utf8')}`;
    }
   }, intlJsonPlugin(), spectrumCSSPlugin()],
  resolve: {
    alias: {
      '@react-spectrum/s2/style': fileURLToPath(new URL('./packages/@react-spectrum/s2/style/index.ts', import.meta.url)),
      '@react-spectrum/s2/private': fileURLToPath(new URL('./packages/@react-spectrum/s2/src', import.meta.url)),
      '@react-spectrum/s2': fileURLToPath(new URL('./packages/@react-spectrum/s2/exports', import.meta.url)),
      'react-aria/private': fileURLToPath(new URL('./packages/react-aria/src', import.meta.url)),
      'react-aria/test': fileURLToPath(new URL('./packages/react-aria/test', import.meta.url)),
      'react-stately/private': fileURLToPath(new URL('./packages/react-stately/src', import.meta.url)),
      'react-stately/src/selection/Selection': fileURLToPath(new URL('./packages/react-stately/src/selection/Selection.ts', import.meta.url)),
      'react-stately': fileURLToPath(new URL('./packages/react-stately/exports', import.meta.url)),
      'react-aria': fileURLToPath(new URL('./packages/react-aria/exports', import.meta.url)),
      '@react-spectrum/test-utils-internal': fileURLToPath(new URL('./packages/dev/test-utils/src/renderOverride.tsx', import.meta.url)),
      '@react-stately/flags': fileURLToPath(new URL('./packages/@react-stately/flags/src/index.ts', import.meta.url)),
      '@adobe/spectrum-css-temp': fileURLToPath(new URL('./packages/@adobe/spectrum-css-temp', import.meta.url)),
      '@adobe/react-spectrum/private': fileURLToPath(new URL('./packages/@adobe/react-spectrum/src', import.meta.url)),
      '@adobe/react-spectrum': fileURLToPath(new URL('./packages/@adobe/react-spectrum/exports', import.meta.url)),
      '@spectrum-icons/ui/CornerTriangle': fileURLToPath(new URL('./packages/@spectrum-icons/ui/src/CornerTriangle.tsx', import.meta.url)),
      '@spectrum-icons/ui/CrossLarge': fileURLToPath(new URL('./packages/@spectrum-icons/ui/src/CrossLarge.tsx', import.meta.url)),
      '@adobe/react-spectrum-ui/dist/CornerTriangle.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-ui/src/CornerTriangle.jsx', import.meta.url)),
      '@adobe/react-spectrum-ui/dist/CrossLarge.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-ui/src/CrossLarge.jsx', import.meta.url)),
      '@spectrum-icons/workflow/Folder': fileURLToPath(new URL('./packages/@spectrum-icons/workflow/src/Folder.tsx', import.meta.url)),
      '@spectrum-icons/workflow/ShowMenu': fileURLToPath(new URL('./packages/@spectrum-icons/workflow/src/ShowMenu.tsx', import.meta.url)),
      '@adobe/react-spectrum-workflow/dist/Folder.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-workflow/src/Folder.jsx', import.meta.url)),
      '@adobe/react-spectrum-workflow/dist/ShowMenu.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-workflow/src/ShowMenu.jsx', import.meta.url)),
      'react-aria-components/Heading': fileURLToPath(new URL('./packages/react-aria-components/src/Heading.tsx', import.meta.url)),
      ...Object.fromEntries(['CheckmarkSmall', 'DashSmall', 'AlertMedium', 'CheckmarkMedium', 'Asterisk', 'Magnifier', 'CrossSmall'].flatMap(name => [
        [`@spectrum-icons/ui/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/ui/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-ui/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-ui/src/${name}.jsx`, import.meta.url))]
      ])),
      '@spectrum-icons/workflow/Checkmark': fileURLToPath(new URL('./packages/@spectrum-icons/workflow/src/Checkmark.tsx', import.meta.url)),
      ...Object.fromEntries(['HelpOutline', 'InfoOutline', 'AlignCenter', 'AlignLeft', 'AlignRight', 'Copy', 'Cut', 'Paste'].flatMap(name => [
        [`@spectrum-icons/workflow/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/workflow/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-workflow/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-workflow/src/${name}.jsx`, import.meta.url))]
      ])),
      '@spectrum-icons/ui/ChevronDownMedium': fileURLToPath(new URL('./packages/@spectrum-icons/ui/src/ChevronDownMedium.tsx', import.meta.url)),
      '@spectrum-icons/workflow/CheckmarkCircle': fileURLToPath(new URL('./packages/@spectrum-icons/workflow/src/CheckmarkCircle.tsx', import.meta.url)),
      '@adobe/react-spectrum-workflow/dist/CheckmarkCircle.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-workflow/src/CheckmarkCircle.jsx', import.meta.url)),
      ...Object.fromEntries(['FolderBreadcrumb', 'ChevronRightSmall'].flatMap(name => [
        [`@spectrum-icons/ui/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/ui/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-ui/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-ui/src/${name}.jsx`, import.meta.url))]
      ])),
      '@spectrum-icons/illustrations/NoSearchResults': fileURLToPath(new URL('./packages/@spectrum-icons/illustrations/src/NoSearchResults.tsx', import.meta.url)),
      ...Object.fromEntries(['Add', 'Delete'].flatMap(name => [
        [`@spectrum-icons/workflow/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/workflow/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-workflow/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-workflow/src/${name}.jsx`, import.meta.url))]
      ])),
      ...Object.fromEntries(['ChevronLeftMedium', 'ChevronRightMedium', 'ListGripper'].flatMap(name => [
        [`@spectrum-icons/ui/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/ui/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-ui/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-ui/src/${name}.jsx`, import.meta.url))]
      ])),
      ...Object.fromEntries(['AnnotatePen', 'TextIndentIncrease', 'TextItalic', 'Bell'].flatMap(name => [
        [`@spectrum-icons/workflow/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/workflow/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-workflow/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-workflow/src/${name}.jsx`, import.meta.url))]
      ])),
      '@spectrum-icons/ui/ArrowDownSmall': fileURLToPath(new URL('./packages/@spectrum-icons/ui/src/ArrowDownSmall.tsx', import.meta.url)),
      '@adobe/react-spectrum-ui/dist/ArrowDownSmall.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-ui/src/ArrowDownSmall.jsx', import.meta.url)),
      ...Object.fromEntries(['More', 'Edit', 'ChevronLeft', 'ChevronRight'].flatMap(name => [
        [`@spectrum-icons/workflow/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/workflow/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-workflow/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-workflow/src/${name}.jsx`, import.meta.url))]
      ])),
      ...Object.fromEntries(['AlertSmall', 'InfoSmall', 'SuccessSmall'].flatMap(name => [
        [`@spectrum-icons/ui/${name}`, fileURLToPath(new URL(`./packages/@spectrum-icons/ui/src/${name}.tsx`, import.meta.url))],
        [`@adobe/react-spectrum-ui/dist/${name}.js`, fileURLToPath(new URL(`./packages/@adobe/react-spectrum-ui/src/${name}.jsx`, import.meta.url))]
      ])),
      '@adobe/react-spectrum-ui/dist/ChevronDownMedium.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-ui/src/ChevronDownMedium.jsx', import.meta.url)),
      '@adobe/react-spectrum-workflow/dist/Checkmark.js': fileURLToPath(new URL('./packages/@adobe/react-spectrum-workflow/src/Checkmark.jsx', import.meta.url)),
      'react-aria-components/Checkbox': fileURLToPath(new URL('./packages/react-aria-components/src/Checkbox.tsx', import.meta.url)),
      'react-aria-components/PreviewTrigger': fileURLToPath(new URL('./packages/react-aria-components/exports/PreviewTrigger.ts', import.meta.url)),
      'react-aria-components/test/AriaMenu.test-util': fileURLToPath(new URL('./packages/react-aria-components/test/AriaMenu.test-util.tsx', import.meta.url)),
      'react-aria-components/slots': fileURLToPath(new URL('./packages/react-aria-components/src/utils.tsx', import.meta.url)),
      'react-aria-components/composeRenderProps': fileURLToPath(new URL('./packages/react-aria-components/src/utils.tsx', import.meta.url)),
      'react-aria-components/CollectionBuilder': fileURLToPath(new URL('./packages/react-aria-components/exports/CollectionBuilder.ts', import.meta.url)),
      ...Object.fromEntries(['Button', 'Link', 'Dialog', 'Form', 'Keyboard', 'Header', 'Text', 'ProgressBar', 'Toolbar', 'Popover', 'Breadcrumbs'].map(name => [
        `react-aria-components/${name}`, fileURLToPath(new URL(`./packages/react-aria-components/src/${name}.tsx`, import.meta.url))
      ])),
      '@react-aria/test-utils': fileURLToPath(new URL('./packages/@react-aria/test-utils/src/user.ts', import.meta.url)),
      '@internationalized/number': fileURLToPath(new URL('./packages/@internationalized/number/src/index.ts', import.meta.url)),
      '@internationalized/date/tests': fileURLToPath(new URL('./packages/@internationalized/date/tests', import.meta.url)),
      '@internationalized/date': fileURLToPath(new URL('./packages/@internationalized/date/src/index.ts', import.meta.url)),
      '@internationalized/string': fileURLToPath(new URL('./packages/@internationalized/string/src/index.ts', import.meta.url)),
    },
  },
  test: {
    name: 'solid2-pilot',
    environment: 'jsdom',
    globals: true,
    // Frozen Jest clears call history between cases without resetting implementations.
    clearMocks: true,
    isolate: true,
    pool: 'forks',
    maxWorkers,
    fileParallelism: true,
    // A file shares its DOM and diagnostic scope; files still run concurrently.
    maxConcurrency: 1,
    env: {
      TZ: 'UTC',
      HARNESS_SOURCE_MATCHMEDIA: process.argv.some(arg => /mediaQueries\.test\./.test(arg) || arg.includes('react-aria/test/dnd/')) ? '1' : '',
      HARNESS_DND_FILE_IO: process.argv.some(arg => /dnd\.test\./.test(arg)) ? '1' : ''
    },
    setupFiles: ['./pilot.setup.ts'],
    include: [
      ...(p46MenuRequested ? ['packages/react-aria-components/test/Menu.test.tsx'] : []),
      ...(p46TabsRequested ? ['packages/react-aria-components/test/Tabs.test.{js,jsx}'] : []),
      ...(p49FormRequested ? ['packages/react-aria-components/test/Form.test.{js,jsx}'] : []),
      ...(p49VirtualizedMenuRequested ? ['packages/react-aria-components/test/VirtualizedMenu.test.tsx'] : []),
      ...(p51TreebleRequested ? ['packages/react-aria-components/test/Treeble.test.{js,jsx}'] : []),
      ...(p59StylesRequested ? ['packages/@react-spectrum/s2/style/__tests__/mergeStyles.test.ts', 'packages/@react-spectrum/s2/style/__tests__/style-macro.test.{js,jsx}'] : []),
      ...(p61ActionButtonGroupRequested ? ['packages/@react-spectrum/s2/test/ActionButtonGroup.test.tsx'] : []),
      ...(p61ImageRequested ? ['packages/@react-spectrum/s2/test/Image.test.tsx'] : []),
      ...(p45DialogRequested ? ['packages/react-aria-components/test/Dialog.test.{js,jsx}'] : []),
      ...(p45PopoverRequested ? ['packages/react-aria-components/test/Popover.test.{js,jsx}'] : []),
      ...(p45DialogSSRRequested ? ['packages/react-aria-components/test/Dialog.ssr.test.{js,jsx}'] : []),
      ...(p44HiddenDateInputRequested ? ['packages/react-aria-components/test/HiddenDateInput.test.{js,jsx}'] : []),
      ...(p44CheckboxGroupRequested ? ['packages/react-aria-components/test/CheckboxGroup.test.{js,jsx}'] : []),
      ...(p42ServerRequested ? ['packages/react-aria/test/i18n/server.test.{js,jsx}'] : []),
      ...(p52DictionaryRequested ? ['packages/@internationalized/string/test/LocalizedStringDictionary.test.js'] : []),
      ...(p40Requested ? ['packages/react-aria-components/test/PreviewTrigger.test.{js,jsx}'] : []),
      ...(p39Requested ? ['packages/@adobe/react-spectrum/test/well/Well.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/badge/Badge.test.{js,jsx}'] : []),
      ...(p39SSRRequested ? ['packages/@adobe/react-spectrum/test/well/Well.ssr.test.js', 'packages/@adobe/react-spectrum/test/badge/Badge.ssr.test.js'] : []),
      ...(p38Requested ? ['packages/@adobe/react-spectrum/test/statuslight/StatusLight.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/meter/Meter.test.{js,jsx}'] : []),
      ...(p38SSRRequested ? ['packages/@adobe/react-spectrum/test/statuslight/StatusLight.ssr.test.js', 'packages/@adobe/react-spectrum/test/meter/Meter.ssr.test.js'] : []),
      ...(p37Requested ? ['packages/@adobe/react-spectrum/test/tag/TagGroup.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/progress/ProgressBar.test.{js,jsx}'] : []),
      ...(p37SSRRequested ? ['packages/@adobe/react-spectrum/test/tag/TagGroup.ssr.test.js', 'packages/@adobe/react-spectrum/test/progress/ProgressBar.ssr.test.js'] : []),
      ...(p36Requested ? ['packages/@adobe/react-spectrum/test/radio/Radio.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/breadcrumbs/{Breadcrumbs,BreadcrumbItem}.test.{js,jsx}'] : []),
      ...(p36SSRRequested ? ['packages/@adobe/react-spectrum/test/radio/Radio.ssr.test.js', 'packages/@adobe/react-spectrum/test/breadcrumbs/Breadcrumbs.ssr.test.js'] : []),
      ...(p35Requested ? ['packages/@adobe/react-spectrum/test/dialog/AlertDialog.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/illustratedmessage/IllustratedMessage.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/view/View.test.{js,jsx}'] : []),
      ...(p35SSRRequested ? ['packages/@adobe/react-spectrum/test/illustratedmessage/IllustratedMessage.ssr.test.js', 'packages/@adobe/react-spectrum/test/view/View.ssr.test.js'] : []),
      ...(p34Requested ? ['packages/@adobe/react-spectrum/test/table/{Table,TableNestedRows,TableSizing,TableDnd,TreeGridTable,TestTableUtils}.test.{js,jsx,ts,tsx}', 'packages/@adobe/react-spectrum/test/buttongroup/ButtonGroup.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/divider/Divider.test.{js,jsx}'] : []),
      ...(p34SSRRequested ? ['packages/@adobe/react-spectrum/test/table/Table.ssr.test.js', 'packages/@adobe/react-spectrum/test/buttongroup/ButtonGroup.ssr.test.js', 'packages/@adobe/react-spectrum/test/divider/Divider.ssr.test.js'] : []),
      ...(p33Requested ? ['packages/@adobe/react-spectrum/test/menu/SubMenuTrigger.test.tsx'] : []),
      ...(p33SSRRequested ? ['packages/@adobe/react-spectrum/test/text/Keyboard.ssr.test.js'] : []),
      ...(p32Requested ? ['packages/react-aria/test/actiongroup/useActionGroup.test.ts', 'packages/@adobe/react-spectrum/test/actiongroup/ActionGroup.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/menu/{Menu,MenuTrigger}.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/tooltip/{Tooltip,TooltipTrigger}.test.{js,jsx}'] : []),
      ...(p32SSRRequested ? ['packages/@adobe/react-spectrum/test/actiongroup/ActionGroup.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/menu/{Menu,MenuTrigger}.ssr.test.{js,jsx}'] : []),
      ...(p31Requested ? ['packages/@adobe/react-spectrum/test/contextualhelp/ContextualHelp.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/link/Link.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/picker/{Picker,TempUtilTest}.test.{js,jsx}'] : []),
      ...(p31SSRRequested ? ['packages/@adobe/react-spectrum/test/view/{Content,Footer}.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/link/Link.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/picker/Picker.ssr.test.{js,jsx}'] : []),
      ...(p29Requested ? ['packages/@adobe/react-spectrum/test/checkbox/Checkbox.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/textfield/{TextField,TextArea}.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/searchfield/SearchField.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/label/Field.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/form/Form.test.{js,jsx}'] : []),
      ...(p29SSRRequested ? ['packages/@adobe/react-spectrum/test/checkbox/Checkbox.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/textfield/{TextField,TextArea}.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/searchfield/SearchField.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/form/Form.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/layout/Flex.ssr.test.{js,jsx}'] : []),
      ...(p28Requested ? ['packages/react-stately/test/toast/useToastState.test.{js,jsx}', 'packages/react-aria/test/toast/useToast.test.{js,jsx}', 'packages/react-aria/test/landmark/useLandmark.test.tsx', 'packages/react-aria-components/test/{Toast,Sheet}.test.{js,jsx}'] : []),
      ...(p28SSRRequested ? ['packages/react-aria/test/landmark/useLandmark.ssr.test.{js,jsx}'] : []),
      ...(p27Requested ? ['packages/react-stately/test/tokenfield/TokenFieldValue.test.ts', 'packages/react-aria/test/datepicker/useDatePicker.test.tsx', 'packages/react-aria-components/test/{DatePicker,DateRangePicker,TokenField}.test.{js,jsx}'] : []),
      ...(p26Requested ? ['packages/@adobe/react-spectrum/test/button/Button.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/progress/ProgressCircle.test.{js,jsx}'] : []),
      ...(p26SSRRequested ? ['packages/@adobe/react-spectrum/test/button/Button.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/progress/ProgressCircle.ssr.test.{js,jsx}'] : []),
      'packages/react-aria-components/test/{ProgressBar,Meter}.test.jsx',
      'packages/react-aria-components/test/{ColorSwatch,Separator}.test.{js,jsx}',
      'packages/react-aria/test/collections/CollectionBuilder.test.{js,jsx}',
      'packages/react-stately/test/color/Color.test.tsx',
      'packages/react-aria/test/progress/useProgressBar.test.js',
      'packages/react-aria/test/label/useLabel.test.js',
      'packages/react-aria/test/i18n/languagechange.test.jsx',
      'packages/react-aria/test/utils/filterDOMProps.test.ts',
      'packages/react-aria/test/utils/{mergeRefs,mergeProps,useId}.test.{tsx,jsx}'
      ,...(p02Requested ? [
        'packages/react-aria/test/interactions/{useFocus,useFocusWithin,useFocusVisible,useKeyboard,Focusable,focusSafely,PressResponder,Pressable}.test.{js,jsx}',
        'packages/react-aria/test/utils/useObjectRef.test.{js,jsx}',
        'packages/react-stately/test/utils/useControlledState.test.tsx',
        'packages/react-aria/test/textfield/useTextField.test.{js,jsx}',
        'packages/react-aria/test/utils/useFormReset.test.tsx',
        'packages/react-aria-components/test/{TextField,FieldError,Link}.test.{js,jsx}',
        'packages/react-aria-components/test/Group.test.tsx',
        'packages/react-aria/test/link/useLink.test.{js,jsx}'
        ,'packages/react-aria/test/label/useField.test.{js,jsx}'
        ,'packages/react-aria/test/utils/DOMFunctions.test.tsx'
      ] : [])
      ,...(spectrumPendingRequested ? ['packages/react-aria/test/interactions/{usePress,useHover}.test.{js,jsx}'] : [])
      ,...(process.env.PILOT_HYDRATION ? ['test/harness/Hydration.test.tsx'] : [])
      ,...(sourceSSRRequested ? ['packages/react-aria/test/ssr/SSRProvider.test.{js,jsx}', 'packages/react-aria/test/ssr/SSRProvider.ssr.test.{js,jsx}'] : [])
      ,...(p03Requested ? [
        'packages/react-aria/test/focus/FocusScopeOwnerDocument.test.{js,jsx}',
        'packages/react-aria/test/visually-hidden/VisuallyHidden.test.tsx',
        'packages/react-aria/test/overlays/DismissButton.test.tsx',
        'packages/react-aria/test/overlays/{useModal,useOverlay,useOverlay.shadow,ariaHideOutside,usePreventScroll}.test.{js,jsx}',
        'packages/react-aria/test/interactions/{useInteractOutside,useInteractOutside.shadow}.test.{js,jsx}',
        'packages/react-aria/test/overlays/calculatePosition.test.ts',
        'packages/react-aria/test/overlays/{useOverlayPosition,usePopover,usePopover.shadow}.test.tsx',
        'packages/react-aria/test/overlays/{useOverlayTrigger,useModalOverlay}.test.{js,jsx}',
        'packages/react-aria-components/test/FileTrigger.test.{js,jsx}',
        'packages/react-aria/test/button/useButton.test.{js,jsx}',
        'packages/react-aria/test/dialog/useDialog.test.{js,jsx}',
        'packages/react-stately/test/data/{useListData,useTreeData}.test.{js,jsx}',
        'packages/react-aria/test/utils/useEvent.test.tsx'
      ] : [])
      ,...(p03FixturesPending ? ['packages/react-aria/test/focus/FocusScope.test.{js,jsx}', 'packages/react-aria-components/test/Button.test.{js,jsx}'] : [])
      ,...(p03SSRRequested ? ['packages/react-aria/test/overlays/useModal.ssr.test.{js,jsx}'] : [])
      ,...(spectrumFixtureRequested ? [
        'packages/@adobe/react-spectrum/test/provider/mediaQueries.test.ts',
        'packages/@adobe/react-spectrum/test/utils/{styleProps,Slots}.test.{js,jsx}',
        'packages/@adobe/react-spectrum/test/layout/Grid.test.{js,jsx}'
      ] : [])
      ,...(p68SpectrumFixturesRequested ? [
        'packages/@adobe/react-spectrum/test/provider/Provider.test.tsx',
        'packages/@adobe/react-spectrum/test/dialog/DialogContainer.test.jsx'
      ] : [])
      ,...(spectrumFixtureSSRRequested ? [
        'packages/@adobe/react-spectrum/test/provider/Provider.ssr.test.{js,jsx}',
        'packages/@adobe/react-spectrum/test/text/Text.ssr.test.{js,jsx}',
        'packages/@adobe/react-spectrum/test/layout/Grid.ssr.test.{js,jsx}'
      ] : [])
      ,...(viewportSSRRequested ? ['packages/react-aria/test/utils/useViewportSize.ssr.test.tsx'] : [])
      ,...(spectrumOverlayRequested ? ['packages/@adobe/react-spectrum/test/overlays/{Overlay,Modal}.test.{js,jsx}'] : [])
      ,...(spectrumIconsRequested ? ['packages/@adobe/react-spectrum/test/button/ActionButton.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/icon/UIIcon.test.{js,jsx}'] : [])
      ,...(spectrumDialogRequested ? ['packages/@adobe/react-spectrum/test/dialog/{Dialog,DialogTrigger}.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/overlays/{Popover,Tray}.test.{js,jsx}'] : [])
      ,...(spectrumDialogSSRRequested ? ['packages/@adobe/react-spectrum/test/dialog/Dialog.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/text/Heading.ssr.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/view/Header.ssr.test.{js,jsx}'] : [])
      ,...(keyboardUtilsRequested ? ['packages/react-aria/test/utils/{runAfterKeyboard,keyboard}.test.ts'] : [])
      ,...(p04Requested ? ['packages/react-stately/test/checkbox/useCheckboxGroupState.test.tsx', 'packages/react-aria/test/checkbox/useCheckboxGroup.test.tsx', 'packages/react-aria-components/test/{Checkbox,Switch}.test.{js,jsx}'] : [])
      ,...(p05Requested ? ['packages/react-aria-components/test/{ToggleButton,ToggleButtonGroup}.test.jsx'] : [])
      ,...(p06DisclosureRequested ? ['packages/react-aria/test/disclosure/useDisclosure.test.ts', 'packages/react-stately/test/disclosure/{useDisclosureState,useDisclosureGroupState}.test.ts'] : [])
      ,...(p06DisclosureSSRRequested ? ['packages/react-aria-components/test/Disclosure.ssr.test.{js,jsx}'] : [])
      // Explicitly retained complete suites: Radio is blocked; Disclosure awaits Menu/Popover.
      ,...(p06PendingRequested ? ['packages/react-aria-components/test/{RadioGroup,Disclosure}.test.{js,jsx}'] : [])
      ,...(p07Requested ? ['packages/react-stately/test/tree/useTreeState.test.{js,jsx}', 'packages/react-aria/test/selection/useSelectableCollection.test.{js,jsx}', 'packages/react-aria/test/menu/useMenu.test.tsx', 'packages/react-aria/test/menu/useMenuTrigger.test.{js,jsx}'] : [])
      ,...(p07LongPressRequested ? ['packages/react-aria/test/interactions/useLongPress.test.{js,jsx}', 'packages/react-aria/test/interactions/useContextMenu.test.tsx'] : [])
      ,...(p08Requested ? ['packages/react-aria-components/test/{Tooltip,Breadcrumbs}.test.{js,jsx}', 'packages/react-aria/test/tooltip/useTooltip.test.{js,jsx}', 'packages/react-stately/test/tooltip/useTooltipTriggerState.test.{js,jsx}', 'packages/react-aria/test/breadcrumbs/{useBreadcrumbs,useBreadcrumbItem}.test.{js,jsx}'] : [])
      ,...(p08BreadcrumbsSSRRequested ? ['packages/react-aria-components/test/Breadcrumbs.ssr.test.{js,jsx}'] : [])
      ,...(p09Requested ? ['packages/react-stately/test/slider/useSliderState.test.{js,jsx}', 'packages/react-aria/test/slider/{useSlider,useSliderThumb}.test.{js,jsx}', 'packages/react-aria-components/test/Slider.test.{js,jsx}', 'packages/react-aria/test/interactions/useMove.test.{js,jsx}', 'packages/react-stately/test/numberfield/useNumberFieldState.test.ts', 'packages/react-aria/test/numberfield/useNumberField.test.ts', 'packages/react-aria/test/spinbutton/useSpinButton.test.{js,jsx}', 'packages/react-aria-components/test/NumberField.test.{js,jsx}'] : [])
      ,...(p10ToolbarRequested ? ['packages/react-aria-components/test/Toolbar.test.tsx'] : [])
      ,...(p10TabsSSRRequested ? ['packages/react-aria-components/test/Tabs.ssr.test.{js,jsx}'] : [])
      ,...(p11HiddenSelectRequested ? ['packages/react-aria/test/select/HiddenSelect.test.tsx'] : [])
      ,...(p11SelectRequested ? ['packages/react-aria-components/test/Select.test.{js,jsx}'] : [])
      ,...(p75ListBoxRequested ? ['packages/react-aria-components/test/ListBox.test.{js,jsx}'] : [])
      ,...(p11SSRRequested ? ['packages/react-aria-components/test/{ListBox,Select}.ssr.test.{js,jsx}'] : [])
      ,...(p12Requested ? ['packages/react-aria/test/dnd/DropTargetKeyboardNavigation.test.tsx', 'packages/react-aria/test/dnd/{dnd,useClipboard,useDraggableCollection,useDroppableCollection}.test.{js,jsx}'] : [])
      ,...(p12SSRRequested ? ['packages/react-aria/test/dnd/dnd.ssr.test.{js,jsx}'] : [])
      ,...(p13Requested ? ['packages/react-stately/test/virtualizer/LayoutInfo.test.tsx', 'packages/react-stately/test/virtualizer/{ScrollAnchor,GridLayout}.test.ts'] : [])
      ,...(p14Requested ? ['packages/react-aria/test/grid/useGrid.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/icon/Icon.test.{js,jsx}', 'packages/@adobe/react-spectrum/test/switch/Switch.test.{js,jsx}'] : [])
      ,...(p14SwitchSSRRequested ? ['packages/@adobe/react-spectrum/test/switch/Switch.ssr.test.{js,jsx}'] : [])
      ,...(p15Requested ? ['packages/react-stately/test/combobox/useComboBoxState.test.{js,jsx}', 'packages/react-aria/test/combobox/useComboBox.test.{js,jsx}', 'packages/react-stately/test/searchfield/useSearchFieldState.test.{js,jsx}', 'packages/react-aria/test/searchfield/useSearchField.test.{js,jsx}', 'packages/react-aria-components/test/{SearchField,ComboBox}.test.{js,jsx}', 'packages/react-stately/test/data/useAsyncList.test.{js,jsx}'] : [])
      ,...(p15SSRRequested ? ['packages/react-aria-components/test/ComboBox.ssr.test.{js,jsx}'] : [])
      ,...(p17Requested ? ['packages/react-stately/test/color/{useColor,useColorFieldState}.test.{js,jsx}', 'packages/react-aria/test/color/useColorField.test.{js,jsx}', 'packages/react-aria-components/test/{ColorField,ColorArea}.test.{js,jsx}'] : [])
      ,...(p18Requested ? ['packages/react-aria/test/color/useColorWheel.test.tsx', 'packages/react-aria-components/test/{ColorSlider,ColorWheel}.test.{js,jsx}'] : [])
      ,...(p19Requested ? ['packages/react-aria-components/test/ColorSwatchPicker.test.{js,jsx}'] : [])
      ,...(p20Requested ? ['packages/react-aria-components/test/ColorPicker.test.{js,jsx}'] : [])
      ,...(p21Requested ? ['packages/react-aria-components/test/DropZone.test.{js,jsx}', 'packages/react-aria-components/test/Autocomplete.test.tsx'] : [])
      ,...(p22Requested ? ['packages/react-aria/test/tag/useTagGroup.test.{js,jsx}', 'packages/react-aria-components/test/{GridList,TagGroup}.test.{js,jsx}'] : [])
      ,...(p22SSRRequested ? ['packages/react-aria-components/test/{GridList,TagGroup}.ssr.test.{js,jsx}'] : [])
      ,...(p23Requested ? ['packages/react-aria/test/table/{useTable,useTableBackwardCompat,ariaTableResizing}.test.tsx', 'packages/react-stately/test/table/TableUtils.test.js', 'packages/react-aria-components/test/Table.test.{js,jsx}'] : [])
      ,...(p23SSRRequested ? ['packages/react-aria-components/test/Table.ssr.test.{js,jsx}'] : [])
      ,...(p24Requested ? ['packages/react-aria-components/test/{Tree,NavigationTree}.test.tsx'] : [])
      ,...(p24SSRRequested ? ['packages/react-aria-components/test/Tree.ssr.test.{js,jsx}'] : [])
      ,...(p25Requested ? ['packages/react-stately/test/calendar/useCalendarState.test.ts', 'packages/react-aria/test/calendar/useCalendar.test.{js,jsx}', 'packages/react-aria-components/test/{DateField,TimeField,Calendar}.test.{js,jsx}', 'packages/react-aria-components/test/{RangeCalendar,RangeCalendar.shadow}.test.tsx'] : [])
    ],
    exclude: [...(sourceSSRRequested || p03SSRRequested || spectrumFixtureSSRRequested || viewportSSRRequested || spectrumDialogSSRRequested || p06DisclosureSSRRequested || p08BreadcrumbsSSRRequested || p10TabsSSRRequested || p11SSRRequested || p12SSRRequested || p14SwitchSSRRequested || p15SSRRequested || p22SSRRequested || p23SSRRequested || p24SSRRequested || p26SSRRequested || p28SSRRequested || p29SSRRequested || p31SSRRequested || p32SSRRequested || p33SSRRequested || p34SSRRequested || p35SSRRequested || p36SSRRequested || p37SSRRequested || p38SSRRequested || p39SSRRequested ? [] : ['**/*.ssr.test.*']), '**/*.browser.test.*'],
    passWithNoTests: false,
    environmentOptions: { jsdom: { pretendToBeVisual: true, url: 'http://localhost/' } },
  },
});
