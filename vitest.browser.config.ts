import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import pilot from './vitest.config';
import {sourceBrowserCommands} from './test/browser/p27-commands';

// Source browser profile: original engines, desktop viewport and timeout.
// Reuse only native compiler/assets/aliases, never pilot jsdom setup or mocks.
const nativeAct = fileURLToPath(new URL('./test/browser/act.ts', import.meta.url));
const p53ModalRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Modal\.browser\.test\.tsx$/.test(arg));
const p53DialogRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/Dialog\.browser\.test\.tsx$/.test(arg));
const p53ShadowDOMFocusRequested = process.argv.some(arg => /(?:^|\/)packages\/react-aria-components\/test\/ShadowDOMFocus\.browser\.test\.tsx$/.test(arg));
const p61ButtonGroupRequested = process.argv.some(arg => /(?:^|\/)packages\/@react-spectrum\/s2\/test\/ButtonGroup\.browser\.test\.tsx$/.test(arg));
export default defineConfig({
  plugins: [...pilot.plugins!, {
    name: 'native-browser-tester-act',
    enforce: 'pre',
    resolveId(id, importer) {
      if (id === './act' && importer?.replaceAll('\\', '/').includes('/packages/@react-aria/test-utils/src/')) {
        return nativeAct;
      }
    }
  }],
  define: {'process.env.NODE_ENV': '"development"', 'process.env.CI': JSON.stringify(process.env.CI)},
  resolve: {
    ...pilot.resolve,
    conditions: ['source', 'import', 'module', 'default'],
    alias: {
      ...pilot.resolve!.alias,
      'vitest-browser-react': fileURLToPath(new URL('./test/browser/render.tsx', import.meta.url))
    }
  },
  test: {
    globals: true,
    pool: 'threads',
    setupFiles: ['./test/browser/setup.ts'],
    include: [
      'packages/react-aria-components/test/{ListBox,ComboBox,Tabs,GridList,Tree,TokenField,TokenField.scroll,TokenField.composition}.browser.test.tsx',
      ...(p53ModalRequested ? ['packages/react-aria-components/test/Modal.browser.test.tsx'] : []),
      ...(p53DialogRequested ? ['packages/react-aria-components/test/Dialog.browser.test.tsx'] : []),
      ...(p53ShadowDOMFocusRequested ? ['packages/react-aria-components/test/ShadowDOMFocus.browser.test.tsx'] : []),
      ...(p61ButtonGroupRequested ? ['packages/@react-spectrum/s2/test/ButtonGroup.browser.test.tsx'] : [])
    ],
    testTimeout: 20000,
    browser: {
      enabled: true,
      // Keep headless library runs out of the interactive UI, which disables the
      // real viewport and scales the tester iframe.
      ui: false,
      provider: playwright(),
      commands: sourceBrowserCommands,
      instances: [
        {browser: 'chromium', name: 'chromium-desktop', viewport: {width: 1280, height: 720}, headless: true},
        {browser: 'firefox', name: 'firefox-desktop', viewport: {width: 1280, height: 720}, headless: true},
        {browser: 'webkit', name: 'webkit-desktop', viewport: {width: 1280, height: 720}, headless: true}
      ]
    }
  }
});
