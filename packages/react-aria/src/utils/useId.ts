/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {Accessor, createEffect, createSignal, createUniqueId, isHydrating, onCleanup, onSettled, untrack} from 'solid-js';
import {isServer} from '@solidjs/web';

// Preserve the modern source branch's client-only collision prefix. SSR/hydration
// and tests use the deterministic prefix; native createUniqueId supplies root ownership.
const clientPrefix = String(Math.round(Math.random() * 10000000000));

// copied from SSRProvider.tsx to reduce exports, if needed again, consider sharing
let canUseDOM = Boolean(
  typeof window !== 'undefined' && window.document && window.document.createElement
);

export let idsUpdaterMap: Map<string, {current: string | null}[]> = new Map();
// This allows us to clean up the idsUpdaterMap when the id is no longer used.
// Map is a strong reference, so unused ids wouldn't be cleaned up otherwise.
// This can happen in suspended components where mount/unmount is not called.
let registry: FinalizationRegistry<string> | undefined;
if (typeof FinalizationRegistry !== 'undefined') {
  registry = new FinalizationRegistry<string>(heldValue => {
    idsUpdaterMap.delete(heldValue);
  });
}
let registeredIds = new WeakMap<object, string>();

/**
 * If a default is not provided, generate an id.
 *
 * @param defaultId - Default component id.
 */
export function useId(defaultId?: string | Accessor<string | undefined>): Accessor<string> {
  const prefix = isServer || isHydrating() || process.env.NODE_ENV === 'test' ? 'react-aria' : `react-aria${clientPrefix}`;
  const generated = `${prefix}-${createUniqueId()}`;
  // Adobe negotiates IDs while composing props. This internal signal deliberately
  // accepts those in-scope requests; ordinary component state does not opt in.
  const [value, setValue] = createSignal<string | undefined>(undefined, {ownedWrite: true});
  const res = () => value() || (typeof defaultId === 'function' ? defaultId() : defaultId) || generated;
  const cleanupRef = {};
  let pending: string | null = null;
  const nextId = {
    get current() { return pending; },
    set current(id: string | null) {
      pending = id;
      if (id) setValue(id);
    }
  };
  let registered: string | undefined;
  function unregister() {
    if (!registered) return;
    registry?.unregister(cleanupRef);
    registeredIds.delete(cleanupRef);
    const refs = idsUpdaterMap.get(registered)?.filter(ref => ref !== nextId);
    if (refs?.length) idsUpdaterMap.set(registered, refs);
    else idsUpdaterMap.delete(registered);
    registered = undefined;
  }
  function register(id: string) {
    if (id === registered) return;
    unregister();
    registered = id;
    if (registry) {
      registry.register(cleanupRef, id, cleanupRef);
      registeredIds.set(cleanupRef, id);
    }
    if (canUseDOM) idsUpdaterMap.set(id, [...(idsUpdaterMap.get(id) || []), nextId]);
  }
  // Initial registration must precede mergeProps in the same setup turn.
  register(untrack(res));
  createEffect(res, register);
  onCleanup(unregister);
  return res;
}

/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA;
  }

  let setIdsA = idsUpdaterMap.get(idA);
  if (setIdsA) {
    setIdsA.forEach(ref => (ref.current = idB));
    return idB;
  }

  let setIdsB = idsUpdaterMap.get(idB);
  if (setIdsB) {
    setIdsB.forEach(ref => (ref.current = idA));
    return idA;
  }

  return idB;
}

/**
 * Used to generate an id, and after render, check if that id is rendered so we know
 * if we can use it in places such as labelledby.
 *
 * @param depArray - When to recalculate if the id is in the DOM.
 */
export function useSlotId(depArray: ReadonlyArray<any> | Accessor<ReadonlyArray<any>> = []): Accessor<string | undefined> {
  let id = useId();
  let [resolvedId, setResolvedId] = createSignal<string | undefined>(untrack(id));
  let [publication, setPublication] = createSignal(0);
  onSettled(() => { const currentId = untrack(id); setResolvedId(document.getElementById(currentId) ? currentId : undefined); });
  createEffect(() => [id(), ...(typeof depArray === 'function' ? depArray() : depArray)] as const, ([currentId]) => {
    // Source useValueEffect first yields the generated ID, allowing new slot hosts
    // to receive it, then checks the DOM after that publication commits.
    setResolvedId(currentId);
    setPublication(value => value + 1);
  });
  createEffect(() => { publication(); return id(); }, currentId => {
    setResolvedId(document.getElementById(currentId) ? currentId : undefined);
  });
  return resolvedId;
}
