/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {renderHook as originalRenderHook, render} from '@solidjs/testing-library';
import {configure, getQueriesForElement} from '@testing-library/dom';
import {flush, onCleanup, type Component} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {vi} from 'vitest';
export {createShadowRoot} from './shadowDOM';
export {installMouseEvent, installPointerEvent} from './testSetup';
export {pointerMap} from './userEventMaps';
export {triggerLongPress} from '../../../@react-aria/test-utils/src/utils';
export {testSSR} from './testSSR';
export {simulateDesktop, simulateMobile} from '../../../@react-spectrum/test-utils/src/testSetup';
export {mockClickDefault} from './events';
export {setupIntersectionObserverMock} from './mockIntersectionObserver';
export type {AriaBaseTestProps} from './types';

export {
  fireEvent,
  within,
  screen,
  waitFor,
  getAllByRole,
  createEvent,
  waitForElementToBeRemoved
} from '@solidjs/testing-library';

const processedAutofocusHosts = new WeakSet<Element>();
const autofocusProcessors = new Set<() => void>();

function observeAutofocus() {
  const observers = new Map<Document, MutationObserver>();
  const scan = (root: Document, initial = false) => {
    if (!observers.has(root)) {
      const observer = new MutationObserver(() => scan(root));
      observer.observe(root, {childList: true, subtree: true});
      observers.set(root, observer);
    }
    for (const element of root.querySelectorAll<HTMLElement>('*')) {
      if (!element.isConnected || processedAutofocusHosts.has(element)) continue;
      processedAutofocusHosts.add(element);
      // Adding the attribute to an already mounted host does not autofocus it.
      if (!initial && element.hasAttribute('autofocus') && typeof element.focus === 'function') element.focus();
    }
    for (const iframe of root.querySelectorAll<HTMLIFrameElement>('iframe')) {
      if (iframe.contentDocument) scan(iframe.contentDocument, initial);
    }
  };
  // Hosts present before this render are not newly mounted by its fixture.
  scan(document, true);
  const process = () => scan(document);
  autofocusProcessors.add(process);
  return {
    process,
    dispose() {
      autofocusProcessors.delete(process);
      for (const observer of observers.values()) observer.disconnect();
      observers.clear();
    }
  };
}

let flushingFixture = false;
let pendingInteractions = 0;
// Match the frozen source's RTL 16.3 asyncWrapper microtask-drain contract:
// one task boundary, advancing only zero elapsed time under fake timers.
function settlePromiseContinuations(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
    if (vi.isFakeTimers()) vi.advanceTimersByTime(0);
  });
}
function flushFixture() {
  // A native focus effect can dispatch a DOM event that enters Testing
  // Library's act wrapper again. Its writes are already part of this drain;
  // the outer native flush processes them in its continuation.
  if (flushingFixture || pendingInteractions > 0) return;
  flushingFixture = true;
  try {
    for (const process of autofocusProcessors) process();
    flush();
    // Signal updates may mount autofocus hosts during the native flush. Process
    // those hosts once, then settle any focus handlers they dispatched.
    for (const process of autofocusProcessors) process();
    flush();
  } finally {
    flushingFixture = false;
  }
}

function customRender(
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1] | undefined
): ReturnType<typeof render> {
  // jsdom omits browser autofocus processing. Mutation observation covers later
  // user-event mounts, while fixture flushes cover synchronous act boundaries.
  const autofocus = observeAutofocus();
  let view;
  try {
    view = render(() => {
      onCleanup(() => autofocus.dispose());
      return ui();
    }, options);
    flushFixture();
  } catch (error) {
    autofocus.dispose();
    throw error;
  }
  // Source RTL binds returned queries to baseElement (body by default), not
  // only the render container. Preserve native render's selected baseElement,
  // including explicit roots/custom containers and their owner documents.
  return {...view, ...getQueriesForElement(view.baseElement, options?.queries)};
}

export function renderHook<T, P = undefined>(hook: (props: P) => T, options?: {initialProps?: P; wrapper?: Component<{children: JSX.Element}>}) {
  // Props may be a signal-backed live object. Hook setup executes exactly once.
  let view = originalRenderHook(() => hook(options?.initialProps as P), {wrapper: options?.wrapper});
  flushFixture();
  return {...view, result: {get current() { return view.result; }}};
}

export function act<T>(fn: () => T): T extends PromiseLike<infer U> ? Promise<U> : T;
export function act(fn: () => unknown): unknown {
  let result = fn();
  if (result && (typeof result === 'object' || typeof result === 'function') && 'then' in result && typeof result.then === 'function') {
    pendingInteractions++;
    return (async () => {
      let completed = false;
      try {
        let value = await result;
        await settlePromiseContinuations();
        completed = true;
        return value;
      } finally {
        pendingInteractions--;
        if (completed) flushFixture();
      }
    })();
  }
  flushFixture();
  return result;
}
export function actHook<T>(fn: () => T): T extends PromiseLike<infer U> ? Promise<U> : T;
export function actHook(fn: () => unknown): unknown {
  let result = fn();
  if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
    return Promise.resolve(result).then(value => {
      flushFixture();
      return value;
    });
  }
  flushFixture();
  return result;
}

// Source Testing Library fireEvent dispatches inside act. Use the library's own
// wrapper hook so the full callable API, event construction and dispatch return
// values remain unchanged while native fixture updates settle synchronously.
configure({
  eventWrapper: callback => act(callback),
  asyncWrapper: async callback => {
    pendingInteractions++;
    let completed = false;
    try {
      let result = await callback();
      await settlePromiseContinuations();
      completed = true;
      return result;
    } finally {
      pendingInteractions--;
      // Nested interactions join the outer operation. Only its completion
      // observes and drains the native writes, outside effect callbacks.
      if (completed) flushFixture();
    }
  }
});

// override render method with
export {customRender as render};

// Spectrum-v3's themed renderv3 is outside this RAC pilot's selected helper exports.
