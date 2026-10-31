import { ssrElement as _$ssrElement } from "@solidjs/web";
import { ssrElementAttribute as _$ssrElementAttribute } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { ssrStyle as _$ssrStyle } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { ssr as _$ssr } from "@solidjs/web";
import { ssrGroup as _$ssrGroup } from "@solidjs/web";
import { ssrClassName as _$ssrClassName } from "@solidjs/web";
import { ssrAttribute as _$ssrAttribute } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "@solidjs/web";
var _tmpl$ = ["<img", "", "", "", "", "", "", "", "", "", "", " class=\"", "\">"], _tmpl$2 = ["<div", "", " style=\"", "\" class=\"", "\"><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$3 = ["<picture", " class=\"", "\"><!--$-->", "<!--/--><!--$-->", "<!--/--></picture>"];
var _sk$ = k => k === "srcset" || k === "media";
var _m$ = Symbol();
var _d$ = {
    get() {
        const srcProp = this[_m$];
        return srcProp();
    },
    enumerable: true,
    configurable: true
};
function _P$(_p, _p2, _p3) {
    this[_m$] = _p;
    Object.defineProperty(this, "each", _d$);
    this.keyed = _p2;
    this.children = _p3;
}
_P$.prototype = Object.prototype;
import { ColorSchemeContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Provider.native.js";
import { createContext, createEffect, createMemo, createSignal, For, merge, omit, onSettled, onCleanup, untrack, useContext } from "solid-js";
import { useObjectRef } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/src/utils/useObjectRef.js";
import { DefaultImageGroup } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/ImageCoordinator.native.js";
import { loadingStyle, useIsSkeleton, useLoadingAnimation } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/style/runtime.native.js";
import { style } from "../style" with { type: 'macro' };
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const ImageContext = createContext(null);
function createState(src) {
    return {
        state: 'loading',
        src,
        startTime: Date.now(),
        loadTime: 0
    };
}
function reducer(state, action) {
    switch (action.type) {
        case 'update':
            {
                return {
                    state: 'loading',
                    src: action.src,
                    startTime: Date.now(),
                    loadTime: 0
                };
            }
        case 'loaded':
        case 'error':
            {
                return {
                    ...state,
                    state: action.type
                };
            }
        case 'revealed':
            {
                return {
                    ...state,
                    state: 'revealed',
                    loadTime: Date.now() - state.startTime
                };
            }
        default:
            return state;
    }
}
const wrapperStyles = style({
    backgroundColor: 'gray-100',
    overflow: 'hidden'
});
const imgStyles = style({
    display: 'block',
    width: 'full',
    height: 'full',
    objectFit: 'inherit',
    objectPosition: 'inherit',
    opacity: {
        default: 0,
        isRevealed: 1
    },
    transition: {
        default: 'none',
        isTransitioning: 'opacity'
    },
    transitionDuration: 500
});
/**
 * An image with support for skeleton loading and custom error states.
 */
export function Image(inputProps) {
    let [props, domRef] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ImageContext);
    let hidden = () => props.hidden;
    let srcProp = () => props.src ?? '';
    let colorScheme = createMemo(() => useContext(ColorSchemeContext));
    let cacheKey = createMemo(() => {
        let src = srcProp();
        return typeof src === 'object' ? JSON.stringify(src) : src;
    });
    let group = createMemo(() => useContext(props.group ?? DefaultImageGroup));
    let [state, setState] = createSignal(untrack(() => createState(cacheKey())));
    let dispatch = (action) => setState(previous => reducer(previous, action));
    createEffect(() => ({
        key: cacheKey(),
        hidden: hidden()
    }), ({ key, hidden }) => {
        if (!hidden && key !== untrack(state).src) {
            dispatch({
                type: 'update',
                src: key
            });
        }
    });
    createEffect(() => ({
        state: state().state,
        revealAll: group().revealAll,
        hidden: hidden()
    }), value => {
        if (value.state === 'loaded' && value.revealAll && !value.hidden) {
            dispatch({
                type: 'revealed'
            });
        }
    });
    let imgRef = useObjectRef();
    createEffect(() => ({
        key: cacheKey(),
        hidden: hidden(),
        group: group()
    }), value => {
        if (value.hidden) {
            return;
        }
        value.group.register(value.key);
        return () => value.group.unregister(value.key);
    });
    let onLoad = () => {
        group().load(cacheKey());
        dispatch({
            type: 'loaded'
        });
    };
    let onError = () => {
        dispatch({
            type: 'error'
        });
        group().unregister(cacheKey());
    };
    let isSkeleton = useIsSkeleton();
    let isAnimating = () => isSkeleton() || state().state === 'loading' || state().state === 'loaded';
    let animation = useLoadingAnimation(isAnimating);
    let disposed = false;
    onCleanup(() => {
        disposed = true;
    });
    createEffect(() => ({
        hidden: hidden(),
        img: imgRef.current,
        node: domRef.current,
        state: state().state,
        key: cacheKey(),
        animating: isAnimating()
    }), value => {
        if (value.hidden) {
            return;
        }
        onSettled(() => {
            // Cached-image checks run after native host attachment, under this owner.
            // Source's queued production check is retained without React act globals.
            if (value.state === 'loading' && value.img?.complete) {
                queueMicrotask(() => {
                    if (disposed || imgRef.current !== value.img || hidden() || cacheKey() !== value.key) {
                        return;
                    }
                    if (value.img.naturalWidth === 0 && value.img.naturalHeight === 0) {
                        onError();
                    }
                    else {
                        onLoad();
                    }
                });
            }
            animation(value.node);
        });
    });
    createEffect(() => props.alt, alt => {
        if (alt == null && "production" !== 'production') {
            console.warn('The `alt` prop was not provided to an image. ' + 'Add `alt` text for screen readers, or set `alt=""` prop to indicate that the image ' + 'is decorative or redundant with displayed text and should not be announced by screen readers.');
        }
    });
    let errorState = createMemo(() => !isSkeleton() && state().state === 'error' && props.renderError?.());
    let isRevealed = () => state().state === 'revealed' && !isSkeleton();
    let isTransitioning = () => isRevealed() && state().loadTime > 200;
    let renderImage = () => {
        var _v$, _g$, _ref$;
        return _v$ = _$ssrHydrationKey(), _g$ = _$ssrGroup(() => [_$ssrAttribute("fetchpriority", _$escape(props.fetchPriority, true)), _$ssrAttribute("src", typeof srcProp() === 'string' && srcProp() ? _$escape(srcProp(), true) : _$escape(undefined, true)), _$ssrAttribute("alt", _$escape(props.alt, true)), _$ssrAttribute("crossorigin", _$escape(props.crossOrigin, true)), _$ssrAttribute("decoding", _$escape(props.decoding, true)), _$ssrAttribute("loading", _$escape(props.loading, true)), _$ssrAttribute("referrerpolicy", _$escape(props.referrerPolicy, true)), _$ssrAttribute("width", _$escape(props.width, true)), _$ssrAttribute("height", _$escape(props.height, true)), _$ssrAttribute("itemprop", _$escape(props.itemProp, true)), _$ssrClassName(imgStyles({
                isRevealed: isRevealed(),
                isTransitioning: isTransitioning()
            }))], 11), _ref$ = imgRef, _$ssr(_tmpl$, _v$, _g$, _g$, _g$, _g$, _g$, _g$, _g$, _g$, _g$, _g$, _g$);
    };
    return _$memo(() => {
        var _v$11, _ref$2, _g$2, _v$15, _v$16;
        return _$memo(() => !hidden())() && (_v$11 = _$ssrHydrationKey(), _ref$2 = domRef, _g$2 = _$ssrGroup(() => [_$ssrAttribute("slot", _$escape(props.slot || undefined, true)), _$ssrStyle(props.UNSAFE_style), _$ssrClassName((props.UNSAFE_className ?? '') + mergeStyles(wrapperStyles, props.styles) + ' ' + (isAnimating() ? loadingStyle : ''))], 3), _v$15 = _$scope(() => _$escape(errorState())), _v$16 = _$scope((() => {
            var _c$ = _$memo(() => !errorState());
            return () => {
                var _v$17, _v$18, _v$19, _v$20;
                return _c$() && (Array.isArray(srcProp()) ? (_v$17 = _$ssrHydrationKey(), _v$18 = () => _$ssrClassName(style({
                    objectFit: 'inherit',
                    objectPosition: 'inherit'
                })), _v$19 = _$escape(For(new _P$(srcProp, false, source => {
                    let sourceProps = omit(merge(source), 'colorScheme', 'srcSet');
                    let sourceColorScheme = () => source().colorScheme;
                    return _$memo(() => _$memo(() => !!(!sourceColorScheme() || !colorScheme() || colorScheme() === 'light dark' || sourceColorScheme() === colorScheme()))() ? _$ssrElement("source", sourceProps, undefined, true, _sk$, () => _$ssrElementAttribute("srcset", source().srcSet) + _$ssrElementAttribute("media", sourceColorScheme() && (!colorScheme() || colorScheme() === 'light dark') ? `${source().media ? `${source().media} and ` : ''}(prefers-color-scheme: ${sourceColorScheme()})` : source().media)) : null);
                }))), _v$20 = _$scope(() => _$escape(renderImage())), _$ssr(_tmpl$3, _v$17, _v$18, _v$19, _v$20)) : _$escape(renderImage()));
            };
        })()), _$ssr(_tmpl$2, _v$11, _g$2, _g$2, _g$2, _v$15, _v$16));
    });
}
