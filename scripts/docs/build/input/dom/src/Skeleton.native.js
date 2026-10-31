import { template as _$template } from "@solidjs/web";
import { className as _$className } from "@solidjs/web";
import { setAttribute as _$setAttribute } from "@solidjs/web";
import { effect as _$effect } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { insert as _$insert } from "@solidjs/web";
import { ref as _$ref } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<span>`);
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
import { createContext, createEffect, createMemo, createSignal, onCleanup, useContext } from "solid-js";
import { color, style } from "../style" with { type: 'macro' };
import { css } from "../style/style-macro" with { type: 'macro' };
import { inertValue } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/inertValue.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/style/runtime.native.js";
import { useMediaQuery } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useMediaQuery.native.js";
export function useLoadingAnimation(isAnimating) {
    let animationRef = null;
    let [element, setElement] = createSignal(null);
    let reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    createEffect(() => ({
        element: element(),
        isAnimating: typeof isAnimating === 'function' ? isAnimating() : isAnimating,
        reduceMotion: reduceMotion()
    }), ({ element, isAnimating, reduceMotion }) => {
        if (isAnimating && !animationRef && element && !reduceMotion && typeof element.animate === 'function') {
            // Use web animation API instead of CSS animations so that we can
            // synchronize it between all loading elements on the page (via startTime).
            animationRef = element.animate([{
                    backgroundPosition: '100%'
                }, {
                    backgroundPosition: '0%'
                }], {
                duration: 2000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            animationRef.startTime = 0;
        }
        else if (!isAnimating && animationRef) {
            animationRef.cancel();
            animationRef = null;
        }
    });
    onCleanup(() => animationRef?.cancel());
    return element => {
        setElement(element);
    };
}
export const SkeletonContext = createContext(null);
export function useIsSkeleton() {
    return createMemo(() => useContext(SkeletonContext) || false);
}
/**
 * A Skeleton wraps around content to render it as a placeholder.
 */
export function Skeleton(props) {
    // Disable all form components inside a skeleton.
    return _$createComponent(SkeletonContext, {
        get value() {
            return props.isLoading;
        },
        get children() {
            return props.children;
        }
    });
}
export const loadingStyle = css(`
  background-image: linear-gradient(to right, ${color('gray-100')} 33%, light-dark(${color('gray-25')}, ${color('gray-300')}), ${color('gray-100')} 66%);
  background-size: 300%;
  * {
    visibility: hidden;
  }
`, 'L'); // add to a separate layer so it overrides default style macro styles
export function useSkeletonText(children, style) {
    let isSkeleton = useIsSkeleton();
    return [() => isSkeleton() ? _$createComponent(SkeletonText, {
            get children() {
                return children();
            }
        }) : children(), () => isSkeleton() ? {
            ...style(),
            // This ensures the ellipsis on truncated text is also hidden.
            // -webkit-text-fill-color overrides any `color` property that is also set.
            '-webkit-text-fill-color': 'transparent'
        } : style()];
}
// Rendered inside <Text> to create skeleton line boxes via box-decoration-break.
export function SkeletonText(props) {
    var _el$ = _$getNextElement(_tmpl$);
    var _ref$ = useLoadingAnimation(true);
    (typeof _ref$ === "function" || Array.isArray(_ref$)) && _$ref(() => _ref$, _el$);
    _$insert(_el$, _$scope(() => props.children));
    _$effect(() => ({
        e: inertValue(true),
        t: loadingStyle + style({
            color: 'transparent',
            boxDecorationBreak: 'clone',
            borderRadius: 'sm'
        })
    }), ({ e, t }, _p$) => {
        e !== _p$?.e && _$setAttribute(_el$, "inert", e);
        _$className(_el$, t, _p$?.t);
    });
    return _el$;
}
// Clones the child element and displays it with skeleton styling.
export function SkeletonWrapper(props) {
    let isLoading = createMemo(() => useContext(SkeletonContext));
    let animation = useLoadingAnimation(() => isLoading() || false);
    const overrides = {
        get ref() {
            return isLoading() ? animation : undefined;
        },
        get className() {
            return isLoading() ? loadingStyle : undefined;
        },
        get inert() {
            return isLoading() ? true : undefined;
        }
    };
    return _$createComponent(SkeletonContext, {
        value: null,
        get children() {
            return props.children(overrides);
        }
    });
}
// Adds default border radius around icons when displayed in a skeleton.
const skeletonIconStyle = style({
    borderRadius: 'sm'
});
export function useSkeletonIcon(styles) {
    return useContext(SkeletonContext) ? mergeStyles(skeletonIconStyle, styles) : styles || '';
}
