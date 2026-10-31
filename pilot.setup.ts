import './scripts/setupTests.js';
import {cleanup} from '@solidjs/testing-library';
import {afterEach, vi} from 'vitest';

// Source DOM Testing Library detects its fake-clock branch through Jest's
// global timer API. The native runner uses the equivalent Vitest clock.
if (!('jest' in globalThis)) {
  Object.defineProperty(globalThis, 'jest', {value: vi, configurable: true, writable: true});
}

afterEach(() => cleanup());

// Original scripts/setupTests.js installs mock-match-media's polyfill. Keep
// this source fixture setup scoped to media-query and actual DnD source suites.
if (process.env.HARNESS_SOURCE_MATCHMEDIA === '1') {
  await import('mock-match-media/polyfill');
  const {cleanup: cleanupMatchMedia, matchMedia} = await import('mock-match-media');
  // The reused harness already provides a fallback; the source package's
  // polyfill intentionally does not replace existing matchMedia implementations.
  window.matchMedia = matchMedia;
  afterEach(() => cleanupMatchMedia());
}

if (process.env.HARNESS_DND_FILE_IO === '1') {
  // Keep jsdom's real FileReader I/O turns outside the fake clock. Preserve all
  // other installed Vitest default fake methods (except its already-excluded
  // nextTick/queueMicrotask), including source animation/timeout drains.
  const methods = ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval',
    'Date', 'hrtime', 'performance', 'requestAnimationFrame', 'cancelAnimationFrame',
    'requestIdleCallback', 'cancelIdleCallback', 'Intl'] as const;
  const fakeTimers = {
    toFake: methods.filter(method => method === 'hrtime'
      ? typeof process.hrtime === 'function' : method in globalThis)
  };
  // Installed timer runtime includes Intl in its default fake-method registry;
  // Vitest's narrower FakeMethod declaration omits this supported method.
  vi.setConfig({fakeTimers: fakeTimers as NonNullable<Parameters<typeof vi.setConfig>[0]['fakeTimers']>});
}
