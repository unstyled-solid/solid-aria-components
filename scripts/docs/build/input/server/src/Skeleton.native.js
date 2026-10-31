import { ssr as _$ssr } from "@solidjs/web";
import { ssrGroup as _$ssrGroup } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { ssrClassName as _$ssrClassName } from "@solidjs/web";
import { ssrAttribute as _$ssrAttribute } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "@solidjs/web";
var _tmpl$ = ["<span", "", " class=\"", "\">", "</span>"];
var _m$ = Symbol(), _m$2 = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        return props.isLoading;
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
var _d$3 = {
    get() {
        const children = this[_m$];
        return children();
    },
    enumerable: true,
    configurable: true
};
function _P$2(_p2) {
    this[_m$] = _p2;
    Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
var _d$4 = {
    get() {
        const props = this[_m$];
        const overrides = this[_m$2];
        return props.children(overrides);
    },
    enumerable: true,
    configurable: true
};
function _P$3(_p3, _p4, _p5) {
    this[_m$] = _p3;
    this[_m$2] = _p4;
    this.value = _p5;
    Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
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
import { inertValue } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/src/utils/inertValue.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/style/runtime.native.js";
import { useMediaQuery } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useMediaQuery.native.js";
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
    return SkeletonContext(new _P$(props));
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
    return [() => isSkeleton() ? SkeletonText(new _P$2(children)) : children(), () => isSkeleton() ? {
            ...style(),
            // This ensures the ellipsis on truncated text is also hidden.
            // -webkit-text-fill-color overrides any `color` property that is also set.
            '-webkit-text-fill-color': 'transparent'
        } : style()];
}
// Rendered inside <Text> to create skeleton line boxes via box-decoration-break.
export function SkeletonText(props) {
    var _v$ = _$ssrHydrationKey(), _g$ = _$ssrGroup(() => [_$ssrAttribute("inert", _$escape(inertValue(true), true)), _$ssrClassName(loadingStyle + style({
            color: 'transparent',
            boxDecorationBreak: 'clone',
            borderRadius: 'sm'
        }))], 2), _ref$ = useLoadingAnimation(true), _v$4 = _$scope(() => _$escape(props.children));
    return _$ssr(_tmpl$, _v$, _g$, _g$, _v$4);
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
    return SkeletonContext(new _P$3(props, overrides, null));
}
// Adds default border radius around icons when displayed in a skeleton.
const skeletonIconStyle = style({
    borderRadius: 'sm'
});
export function useSkeletonIcon(styles) {
    return useContext(SkeletonContext) ? mergeStyles(skeletonIconStyle, styles) : styles || '';
}
