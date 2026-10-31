import { template as _$template } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { runHydrationEvents as _$runHydrationEvents } from "@solidjs/web";
import { insert as _$insert } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { ref as _$ref } from "@solidjs/web";
import { spread as _$spread } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<div>`);
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
import { ButtonContext, LinkButtonContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js";
import { Provider } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/src/utils.js";
import { createContext, createEffect, omit } from "solid-js";
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/filterDOMProps.js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useResizeObserver } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/useResizeObserver.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
import { useValueEffect } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/_native/packages/react-aria/src/utils/useValueEffect.native.js";
export const ButtonGroupContext = createContext({});
const buttongroup = style({
    display: 'inline-flex',
    position: 'relative',
    maxWidth: 'full',
    gap: {
        size: {
            S: 8,
            M: 12,
            L: 12,
            XL: 12
        }
    },
    flexDirection: {
        default: 'row',
        orientation: {
            vertical: 'column'
        }
    },
    alignItems: {
        default: 'center',
        orientation: {
            vertical: {
                default: 'start',
                align: {
                    end: 'end',
                    center: 'center'
                }
            }
        }
    },
    justifyContent: {
        orientation: {
            vertical: {
                default: 'start',
                align: {
                    end: 'end',
                    center: 'center'
                }
            }
        }
    }
}, getAllowedOverrides());
/**
 * ButtonGroup handles overflow for a grouping of buttons whose actions are related to each other.
 */
export function ButtonGroup(inputProps) {
    let [props, ref] = useSpectrumContextProps(inputProps, inputProps.ref, ButtonGroupContext);
    let domRef = useDOMRef(ref);
    let size = () => props.size ?? 'M';
    let orientation = () => props.orientation ?? 'horizontal';
    let align = () => props.align ?? 'start';
    let otherProps = omit(props, 'size', 'orientation', 'align', 'children', 'isDisabled');
    let [hasOverflow, setHasOverflow] = useValueEffect(false);
    // oxlint-disable react/react-compiler, react-hooks/exhaustive-deps
    let checkForOverflow = () => {
        let computeHasOverflow = () => {
            if (domRef.current && orientation() === 'horizontal') {
                let buttonGroupChildren = Array.from(domRef.current.children);
                let maxX = domRef.current.offsetWidth + 1; // + 1 to account for rounding errors
                // If any buttons have negative X positions (align="end") or extend beyond
                // the width of the button group (align="start"), then switch to vertical.
                if (buttonGroupChildren.some(child => child.offsetLeft < 0 || child.offsetLeft + child.offsetWidth > maxX)) {
                    return true;
                }
                return false;
            }
        };
        if (orientation() === 'horizontal') {
            setHasOverflow(function* () {
                // Force to horizontal for measurement.
                yield false;
                // Measure, and update if there is overflow.
                yield computeHasOverflow();
            });
        }
    };
    // oxlint-enable react/react-compiler, react-hooks/exhaustive-deps
    // There are two main reasons we need to remeasure:
    // 1. Internal changes: Check for initial overflow or when orientation/scale/children change (from checkForOverflow dep array)
    createEffect(() => ({
        orientation: orientation(),
        children: props.children,
        element: domRef.current
    }), () => {
        checkForOverflow();
    });
    // 2. External changes: buttongroup won't change size due to any parents changing size, so listen to its container for size changes to figure out if we should remeasure
    let parent = {
        get current() {
            return domRef.current?.parentElement ?? null;
        }
    };
    // oxlint-enable react/react-compiler, react-hooks/exhaustive-deps
    useResizeObserver({
        ref: parent,
        onResize: checkForOverflow
    });
    let context = {
        styles: style({
            flexShrink: 0
        }),
        get size() {
            return size();
        },
        get isDisabled() {
            return props.isDisabled;
        }
    };
    return _$memo(() => _$memo(() => !props.isHidden)() && (() => {
        var _el$ = _$getNextElement(_tmpl$);
        _$spread(_el$, [() => filterDOMProps(otherProps), {
                get style() {
                    return props.UNSAFE_style;
                },
                get "class"() {
                    return (props.UNSAFE_className || '') + buttongroup({
                        align: align(),
                        orientation: orientation() === 'vertical' || hasOverflow() ? 'vertical' : 'horizontal',
                        size: size()
                    }, props.styles);
                }
            }], true);
        _$ref(() => value => {
            domRef.current = value;
        }, _el$);
        _$insert(_el$, _$createComponent(Provider, {
            values: [[ButtonContext, context], [LinkButtonContext, context]],
            get children() {
                return props.children;
            }
        }));
        _$runHydrationEvents();
        return _el$;
    })());
}
