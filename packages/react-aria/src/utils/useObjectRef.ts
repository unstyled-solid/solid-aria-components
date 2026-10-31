/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action, createSignal, onCleanup, runWithOwner, untrack} from 'solid-js';

export type ObjectRef<T> = ((instance: T | null) => (() => void) | void) & {current: T | null};
export type Ref<T> = ((instance: T | null) => unknown) | {current: T | null} | ReadonlyArray<Ref<T> | null | undefined>;

/** Deliver an attachment; callers own the returned teardown. */
export function attachRef<T>(ref: Ref<T> | null | undefined, instance: T | null): () => void {
  if (Array.isArray(ref)) {
    let cleanups = ref.map(item => attachRef(item, instance));
    return () => { for (let cleanup of cleanups) { cleanup(); } };
  }
  if (typeof ref === 'function') {
    let cleanup = untrack(() => ref(instance));
    return typeof cleanup === 'function' ? cleanup as () => void : () => { untrack(() => ref(null)); };
  }
  if (ref) {
    let cell = ref as {current: T | null};
    cell.current = instance;
    return () => { if (cell.current === instance) { cell.current = null; } };
  }
  return () => {};
}

/**
 * Offers an object ref for a given callback ref or an object ref. Especially
 * helfpul when passing forwarded refs (created using `React.forwardRef`) to
 * React Aria hooks.
 *
 * @param ref The original ref intended to be used.
 * @returns An object ref that updates the given ref.
 * @see https://react.dev/reference/react/forwardRef
 */
export function useObjectRef<T>(
  ref?: Ref<T> | null
): ObjectRef<T> {
  let current: T | null = null;
  let [revision, setRevision] = createSignal(0);
  let cleanups: Array<() => void> = [];
  function deliver(ref: Ref<T> | null | undefined, instance: T) {
    cleanups.push(attachRef(ref, instance));
  }
  let attach = ((instance: T | null) => {
    if (instance === current) { return instance === null ? undefined : () => runWithOwner(null, () => detach(instance)); }
    for (let cleanup of cleanups) { cleanup(); }
    cleanups = [];
    current = instance;
    setRevision(n => n + 1);
    if (instance !== null) { deliver(ref, instance); }
    return instance === null ? undefined : () => runWithOwner(null, () => detach(instance));
  }) as ObjectRef<T>;
  // Detachment can run inside keyed-owner disposal. Keep forwarded teardown
  // synchronous, but give its reactive writes an explicit native transaction.
  let detach = action(function* (instance: T | null = current) {
    if (current === instance) { attach(null); }
  });
  Object.defineProperty(attach, 'current', {
    get() { revision(); return current; },
    set: attach
  });
  onCleanup(() => runWithOwner(null, detach));
  return attach;
}
