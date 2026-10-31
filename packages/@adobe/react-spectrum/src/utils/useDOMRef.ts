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

import {
  DOMRefValue,
  FocusableElement,
  FocusableRefValue,
  RefObject
} from '@react-types/shared';
import {useObjectRef, attachRef, type ObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {onCleanup, untrack} from 'solid-js';
export type DOMRef<T extends HTMLElement = HTMLElement> = Ref<DOMRefValue<T>> | null;
export type FocusableRef<T extends HTMLElement = HTMLElement> = Ref<FocusableRefValue<T>> | null;

export function createDOMRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>
): DOMRefValue<T> {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    }
  };
}

export function createFocusableRef<T extends HTMLElement = HTMLElement>(
  domRef: RefObject<T | null>,
  focusableRef: RefObject<FocusableElement | null> = domRef
): FocusableRefValue<T> {
  return {
    ...createDOMRef(domRef),
    focus() {
      if (focusableRef.current) {
        focusableRef.current.focus();
      }
    }
  };
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: DOMRef<T>
): ObjectRef<T> {
  return useSpectrumRef(ref, createDOMRef);
}

export function useFocusableRef<T extends HTMLElement = HTMLElement>(
  ref?: FocusableRef<T>,
  focusableRef?: RefObject<FocusableElement | null>
): ObjectRef<T> {
  return useSpectrumRef(ref, domRef => createFocusableRef(domRef, focusableRef));
}

function useSpectrumRef<T extends HTMLElement, H>(ref: Ref<H> | null | undefined, makeHandle: (ref: ObjectRef<T>) => H): ObjectRef<T> {
  let domRef = useObjectRef<T>();
  let handle = makeHandle(domRef);
  let detach = () => {};
  let attach = ((node: T | null) => {
    // Renderer attachment is imperative and ownerless, not a reactive reader.
    if (node === untrack(() => domRef.current)) {return;}
    detach();
    domRef(node);
    detach = node ? attachRef(ref, handle) : () => {};
  }) as ObjectRef<T>;
  Object.defineProperty(attach, 'current', {get: () => domRef.current, set: attach});
  onCleanup(() => {detach();});
  return attach;
}

export function unwrapDOMRef<T extends HTMLElement>(
  ref: RefObject<DOMRefValue<T> | null>
): RefObject<T | null> {
  return {
    get current() {
      return ref.current && ref.current.UNSAFE_getDOMNode();
    }
  };
}

export function useUnwrapDOMRef<T extends HTMLElement>(
  ref: RefObject<DOMRefValue<T> | null>
): RefObject<T | null> {
  return unwrapDOMRef(ref);
}
