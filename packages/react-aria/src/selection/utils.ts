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

import {Collection, Key} from '@react-types/shared';
import {isAppleDevice} from '../utils/platform';
import {RefObject} from '@react-types/shared';
import {Accessor, createEffect, onCleanup, untrack} from 'solid-js';
import {useId} from '../utils/useId';

interface Event {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

export function isNonContiguousSelectionModifier(e: Event): boolean {
  // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
  // On Windows and Ubuntu, Alt + Space has a system wide meaning.
  return isAppleDevice() ? e.altKey : e.ctrlKey;
}

export function getItemElement(
  collectionRef: RefObject<HTMLElement | null>,
  key: Key
): Element | null | undefined {
  let selector = `[data-key="${CSS.escape(String(key))}"]`;
  let collection = collectionRef.current?.dataset.collection;
  if (collection) {
    selector = `[data-collection="${CSS.escape(collection)}"]${selector}`;
  }
  return collectionRef.current?.querySelector(selector);
}

const collectionMap = new WeakMap<Collection<any>, Accessor<string>>();
export function useCollectionId(collection: Collection<any> | (() => Collection<any>)): Accessor<string> {
  let id = useId();
  let current = () => typeof collection === 'function' ? collection() : collection;
  // Register the live ID handle before descendant items resolve. Only the
  // collection identity is sampled here; never sample useId's reactive value.
  let registered = untrack(current);
  collectionMap.set(registered, id);
  createEffect(current, value => {
    if (value !== registered && collectionMap.get(registered) === id) {
      collectionMap.delete(registered);
    }
    registered = value;
    collectionMap.set(value, id);
  });
  onCleanup(() => {
    if (collectionMap.get(registered) === id) {
      collectionMap.delete(registered);
    }
  });
  return id;
}

export function getCollectionId(collection: Collection<any>): string {
  return collectionMap.get(collection)?.()!;
}
