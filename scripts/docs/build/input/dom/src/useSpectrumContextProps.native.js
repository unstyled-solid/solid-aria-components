/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { createMemo } from "solid-js";
import { useSlottedContext } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/src/utils.js";
import { mergeProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/mergeProps.js";
import { mergeRefs } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/mergeRefs.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/style/runtime.native.js";
import { attachRef, useObjectRef } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/useObjectRef.js";
export function useSpectrumContextProps(props, ref, context) {
    let ctx = createMemo(() => useSlottedContext(context, props.slot) || {});
    let contextProps = new Proxy({}, {
        ownKeys: () => Reflect.ownKeys(ctx()).filter(key => key !== 'ref'),
        has: (_, key) => key !== 'ref' && key in ctx(),
        getOwnPropertyDescriptor: (_, key) => key !== 'ref' && key in ctx() ? {
            enumerable: true,
            configurable: true
        } : undefined,
        get: (_, key) => key === 'ref' ? undefined : Reflect.get(ctx(), key)
    });
    let mergedRef = useObjectRef(mergeRefs(ref, (value) => {
        let contextRef = ctx().ref;
        return attachRef(typeof contextRef === 'function' ? contextRef : undefined, value);
    }));
    let mergedProps = mergeProps(contextProps, props);
    // mergeProps does not merge `UNSAFE_style`
    let result = new Proxy(mergedProps, {
        get(target, key) {
            if (key === 'UNSAFE_style' && 'UNSAFE_style' in contextProps && contextProps.UNSAFE_style && 'UNSAFE_style' in props && props.UNSAFE_style) {
                return {
                    ...contextProps.UNSAFE_style,
                    ...props.UNSAFE_style
                };
            }
            if (key === 'styles' && 'styles' in contextProps && contextProps.styles && 'styles' in props && props.styles) {
                return mergeStyles(contextProps.styles, props.styles);
            }
            return Reflect.get(target, key);
        }
    });
    return [result, mergedRef];
}
