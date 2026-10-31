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

import {DOMRef, DOMRefValue, FocusableRef, FocusableRefValue, RefObject} from '@react-types/shared';
import {onSettled} from 'solid-js';
import {attachRef, useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';

export function createDOMRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>
): DOMRefValue<T> {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    }
  };
}

export function createFocusableRef<T extends HTMLElement = HTMLElement, D extends HTMLElement = T>(
  domRef: RefObject<D | null>,
  focusableRef?: RefObject<T | null>
): FocusableRefValue<T, D> {
  let resolvedFocusableRef = focusableRef || domRef;
  return {
    ...createDOMRef(domRef),
    focus() {
      if (resolvedFocusableRef.current) {
        resolvedFocusableRef.current.focus();
      }
    }
  };
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref: DOMRef<T> | ObjectRef<DOMRefValue<T>>
): ObjectRef<T> {
  let domRef = useObjectRef<T>();
  onSettled(() => attachRef(typeof ref === 'function' ? ref as (value: DOMRefValue<T> | null) => unknown : undefined, createDOMRef(domRef)));
  return domRef;
}

export function useFocusableRef<T extends HTMLElement = HTMLElement, D extends HTMLElement = T>(
  ref: FocusableRef<T, D> | ObjectRef<FocusableRefValue<T, D>>,
  focusableRef?: RefObject<T | null>
): ObjectRef<D> {
  let domRef = useObjectRef<D>();
  onSettled(() => attachRef(typeof ref === 'function' ? ref as (value: FocusableRefValue<T, D> | null) => unknown : undefined, createFocusableRef<T, D>(domRef, focusableRef)));
  return domRef;
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
