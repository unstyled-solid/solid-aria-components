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
import { onSettled } from "solid-js";
import { attachRef, useObjectRef } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/useObjectRef.js";
export function createDOMRef(ref) {
    return {
        UNSAFE_getDOMNode() {
            return ref.current;
        }
    };
}
export function createFocusableRef(domRef, focusableRef) {
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
export function useDOMRef(ref) {
    let domRef = useObjectRef();
    onSettled(() => attachRef(typeof ref === 'function' ? ref : undefined, createDOMRef(domRef)));
    return domRef;
}
export function useFocusableRef(ref, focusableRef) {
    let domRef = useObjectRef();
    onSettled(() => attachRef(typeof ref === 'function' ? ref : undefined, createFocusableRef(domRef, focusableRef)));
    return domRef;
}
export function unwrapDOMRef(ref) {
    return {
        get current() {
            return ref.current && ref.current.UNSAFE_getDOMNode();
        }
    };
}
export function useUnwrapDOMRef(ref) {
    return unwrapDOMRef(ref);
}
