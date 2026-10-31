import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
var _m$ = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        return {
            labelPosition: props.labelPosition ?? 'top',
            labelAlign: props.labelAlign,
            necessityIndicator: props.necessityIndicator,
            isRequired: props.isRequired,
            isDisabled: props.isDisabled,
            isEmphasized: props.isEmphasized,
            size: props.size ?? 'M'
        };
    },
    enumerable: true,
    configurable: true
}, _d$2 = {
    get() {
        const props = this[_m$];
        return props.children;
    },
    enumerable: true,
    configurable: true
};
function _P$(_p) {
    this[_m$] = _p;
    Object.defineProperty(this, "value", _d$);
    Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
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
import { createContext, createMemo, omit, useContext } from "solid-js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { Form as RACForm } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Form.js";
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useIsSkeleton } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
export const FormContext = createContext(null);
export function useFormProps(props) {
    let context = createMemo(() => useContext(FormContext));
    let isSkeleton = useIsSkeleton();
    let result = createMemo(() => {
        let ctx = context();
        let result = props;
        if (ctx || isSkeleton()) {
            result = {
                ...props
            };
        }
        if (ctx) {
            // This is a subset of mergeProps. We just need to merge non-undefined values.
            for (let key of Object.keys(ctx)) {
                if (result[key] === undefined) {
                    // oxlint-disable-next-line react/react-compiler
                    Object.assign(result, {
                        [key]: ctx[key]
                    });
                }
            }
        }
        // Skeleton always wins over local props.
        if (isSkeleton()) {
            // oxlint-disable-next-line react/react-compiler
            result.isDisabled = true;
        }
        return result;
    });
    return new Proxy({}, {
        get: (_, key) => Reflect.get(result(), key),
        has: (_, key) => key in result(),
        ownKeys: () => Reflect.ownKeys(result()),
        getOwnPropertyDescriptor: (_, key) => key in result() ? {
            enumerable: true,
            configurable: true
        } : undefined
    });
}
/**
 * Forms allow users to enter data that can be submitted while providing alignment and styling for
 * form fields.
 */
export function Form(props) {
    let formProps = omit(props, 'labelPosition', 'labelAlign', 'necessityIndicator', 'isRequired', 'isDisabled', 'isEmphasized', 'size', 'UNSAFE_style', 'UNSAFE_className', 'ref');
    let domRef = useDOMRef(props.ref);
    return RACForm(_$mergeProps(formProps, {
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get style() {
            return props.UNSAFE_style;
        },
        get className() {
            return (props.UNSAFE_className ?? '') + style({
                display: 'grid',
                gridTemplateColumns: {
                    labelPosition: {
                        top: ['[field] 1fr'],
                        side: ['[label] auto', '[field] 1fr']
                    }
                },
                // TODO: confirm when we have tokens
                rowGap: {
                    size: {
                        XS: 16,
                        S: 20,
                        M: 24,
                        L: 32,
                        XL: 40
                    }
                },
                columnGap: 'text-to-control'
            }, getAllowedOverrides())({
                labelPosition: props.labelPosition ?? 'top',
                size: props.size ?? 'M'
            }, props.styles);
        },
        get children() {
            return FormContext(new _P$(props));
        }
    }));
}
