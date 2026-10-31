import { template as _$template } from "@solidjs/web";
import { runHydrationEvents as _$runHydrationEvents } from "@solidjs/web";
import { spread as _$spread } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { style as _$style } from "@solidjs/web";
import { getNextMarker as _$getNextMarker } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { insert as _$insert } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { className as _$className } from "@solidjs/web";
import { readShallow as _$readShallow } from "@solidjs/web";
import { setAttribute as _$setAttribute } from "@solidjs/web";
import { effect as _$effect } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { ref as _$ref } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<img>`, 1), _tmpl$2 = /*#__PURE__*/ _$template(`<div><!$><!/><!$><!/>`), _tmpl$3 = /*#__PURE__*/ _$template(`<picture><!$><!/><!$><!/>`), _tmpl$4 = /*#__PURE__*/ _$template(`<source>`);
import { ColorSchemeContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js";
import { createContext, createEffect, createMemo, createSignal, For, merge, omit, onSettled, onCleanup, untrack, useContext } from "solid-js";
import { useObjectRef } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/useObjectRef.js";
import { DefaultImageGroup } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ImageCoordinator.native.js";
import { loadingStyle, useIsSkeleton, useLoadingAnimation } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Skeleton.native.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/style/runtime.native.js";
import { style } from "../style" with { type: 'macro' };
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
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
    let renderImage = () => (() => {
        var _el$ = _$getNextElement(_tmpl$);
        _el$.addEventListener("error", onError);
        _el$.addEventListener("load", onLoad);
        var _ref$ = imgRef;
        typeof _ref$ === "function" || Array.isArray(_ref$) ? _$ref(() => _ref$, _el$) : imgRef = _el$;
        _$effect(() => ({
            e: props.fetchPriority,
            t: typeof srcProp() === 'string' && srcProp() ? srcProp() : undefined,
            a: props.alt,
            o: props.crossOrigin,
            i: props.decoding,
            n: props.loading,
            s: props.referrerPolicy,
            h: props.width,
            r: props.height,
            d: props.itemProp,
            l: _$readShallow(imgStyles({
                isRevealed: isRevealed(),
                isTransitioning: isTransitioning()
            }))
        }), ({ e, t, a, o, i, n, s, h, r, d, l }, _p$) => {
            e !== _p$?.e && _$setAttribute(_el$, "fetchpriority", e);
            t !== _p$?.t && _$setAttribute(_el$, "src", t);
            a !== _p$?.a && _$setAttribute(_el$, "alt", a);
            o !== _p$?.o && _$setAttribute(_el$, "crossorigin", o);
            i !== _p$?.i && _$setAttribute(_el$, "decoding", i);
            n !== _p$?.n && _$setAttribute(_el$, "loading", n);
            s !== _p$?.s && _$setAttribute(_el$, "referrerpolicy", s);
            h !== _p$?.h && _$setAttribute(_el$, "width", h);
            r !== _p$?.r && _$setAttribute(_el$, "height", r);
            d !== _p$?.d && _$setAttribute(_el$, "itemprop", d);
            _$className(_el$, l, _p$?.l);
        });
        return _el$;
    })();
    return _$memo(() => _$memo(() => !hidden())() && (() => {
        var _el$2 = _$getNextElement(_tmpl$2), _el$3 = _el$2.firstChild, [_el$4, _co$] = _$getNextMarker(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = _$getNextMarker(_el$5.nextSibling);
        var _ref$2 = domRef;
        typeof _ref$2 === "function" || Array.isArray(_ref$2) ? _$ref(() => _ref$2, _el$2) : domRef = _el$2;
        _$insert(_el$2, _$scope(() => errorState()), _el$4, _co$);
        _$insert(_el$2, _$scope((() => {
            var _c$ = _$memo(() => !errorState());
            return () => _c$() && (Array.isArray(srcProp()) ? (() => {
                var _el$7 = _$getNextElement(_tmpl$3), _el$8 = _el$7.firstChild, [_el$9, _co$3] = _$getNextMarker(_el$8.nextSibling), _el$0 = _el$9.nextSibling, [_el$1, _co$4] = _$getNextMarker(_el$0.nextSibling);
                _$insert(_el$7, _$createComponent(For, {
                    get each() {
                        return srcProp();
                    },
                    keyed: false,
                    children: source => {
                        let sourceProps = omit(merge(source), 'colorScheme', 'srcSet');
                        let sourceColorScheme = () => source().colorScheme;
                        return _$memo(() => _$memo(() => !!(!sourceColorScheme() || !colorScheme() || colorScheme() === 'light dark' || sourceColorScheme() === colorScheme()))() ? (() => {
                            var _el$10 = _$getNextElement(_tmpl$4);
                            _$spread(_el$10, [sourceProps, {
                                    get srcset() {
                                        return source().srcSet;
                                    },
                                    get media() {
                                        return sourceColorScheme() && (!colorScheme() || colorScheme() === 'light dark') ? `${source().media ? `${source().media} and ` : ''}(prefers-color-scheme: ${sourceColorScheme()})` : source().media;
                                    }
                                }], false);
                            _$runHydrationEvents();
                            return _el$10;
                        })() : null);
                    }
                }), _el$9, _co$3);
                _$insert(_el$7, _$scope(() => renderImage()), _el$1, _co$4);
                _$effect(() => _$readShallow(style({
                    objectFit: 'inherit',
                    objectPosition: 'inherit'
                })), (_v$, _$p) => {
                    _$className(_el$7, _v$, _$p);
                });
                return _el$7;
            })() : renderImage());
        })()), _el$6, _co$2);
        _$effect(() => ({
            e: props.slot || undefined,
            t: _$readShallow(props.UNSAFE_style),
            a: (props.UNSAFE_className ?? '') + mergeStyles(wrapperStyles, props.styles) + ' ' + (isAnimating() ? loadingStyle : '')
        }), ({ e, t, a }, _p$) => {
            e !== _p$?.e && _$setAttribute(_el$2, "slot", e);
            _$style(_el$2, t, _p$?.t);
            _$className(_el$2, a, _p$?.a);
        });
        return _el$2;
    })());
}
