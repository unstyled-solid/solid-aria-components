/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {createEffect, createSignal, onSettled, untrack, type Accessor} from 'solid-js';
import {useId} from './useId';
import {useObjectRef} from './useObjectRef';

type RefCallback<T> = (element: T | null) => void;

export function useSlot(
  initialState: boolean | (() => boolean) = true
): [RefCallback<Element>, Accessor<boolean>] {
  // Initial state is typically based on the parent having an aria-label or aria-labelledby.
  // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
  let [hasSlot, setHasSlot] = createSignal(untrack(() => typeof initialState === 'function' ? initialState() : initialState));
  let hasRun = false;

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  let ref = useObjectRef<Element>(el => {
    hasRun = true;
    setHasSlot(!!el);
  });

  // If the callback hasn't been called, then reset to false.
  onSettled(() => {
    if (!hasRun) {
      setHasSlot(false);
    }
  });

  // Native renderer callback refs do not receive React's removal notification.
  // Setup owns observation; a connected portal reparent is not a removal.
  createEffect(() => ref.current, element => {
    if (!element) return;
    const observer = new element.ownerDocument.defaultView!.MutationObserver(() => {
      if (!element.isConnected && untrack(() => ref.current) === element) ref(null);
    });
    observer.observe(element.getRootNode(), {childList: true, subtree: true});
    return () => observer.disconnect();
  });

  return [ref, hasSlot];
}

type SlotAria = {
  id: string | undefined;
  ref: RefCallback<any>;
}

export function useSlotId2(initialState: boolean | (() => boolean) = true): SlotAria {
  let id = useId();
  let [ref, hasSlot] = useSlot(initialState);

  return {
    get id() { return hasSlot() ? id() : undefined; },
    ref
  };
}
