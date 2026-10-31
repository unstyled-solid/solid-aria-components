import { template as _$template } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { runHydrationEvents as _$runHydrationEvents } from "@solidjs/web";
import { ref as _$ref } from "@solidjs/web";
import { spread as _$spread } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<div>`), _tmpl$2 = /*#__PURE__*/ _$template(`<footer>`);
import { createContext, createMemo, omit, untrack, useContext } from "solid-js";
import { inertValue } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/inertValue.js";
import { Keyboard as KeyboardAria } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Keyboard.js";
import { Header as RACHeader } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Header.js";
import { Heading as RACHeading } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/src/Heading.js";
import { TextContext as RACTextContext, Text as TextAria } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Text.js";
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useIsSkeleton, useSkeletonText } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Skeleton.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
export const HeadingContext = createContext(null);
export const Heading = 
// Wrapper around RAC Heading to unmount when hidden.
function Heading(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, HeadingContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && _$createComponent(RACHeading, _$mergeProps(otherProps, {
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get className() {
            return (props.UNSAFE_className ?? '') + (props.styles ?? '');
        },
        get style() {
            return props.UNSAFE_style;
        },
        get slot() {
            return props.slot || undefined;
        }
    })));
};
export const HeaderContext = createContext(null);
export function Header(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, HeaderContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && _$createComponent(RACHeader, _$mergeProps(otherProps, {
        ref(r$) {
            var _ref$2 = domRef;
            typeof _ref$2 === "function" || Array.isArray(_ref$2) ? _$applyRef(_ref$2, r$) : domRef = r$;
        },
        get "class"() {
            return (props.UNSAFE_className ?? '') + (props.styles ?? '');
        },
        get style() {
            return props.UNSAFE_style;
        },
        get slot() {
            return props.slot || undefined;
        }
    })));
}
export const ContentContext = createContext(null);
export function Content(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, ContentContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && (() => {
        var _el$ = _$getNextElement(_tmpl$);
        _$spread(_el$, [otherProps, {
                get "class"() {
                    return (props.UNSAFE_className ?? '') + (props.styles ?? '');
                },
                get style() {
                    return props.UNSAFE_style;
                },
                get slot() {
                    return props.slot || undefined;
                }
            }], false);
        var _ref$3 = domRef;
        typeof _ref$3 === "function" || Array.isArray(_ref$3) ? _$ref(() => _ref$3, _el$) : domRef = _el$;
        _$runHydrationEvents();
        return _el$;
    })());
}
export const TextContext = createContext(null);
export function Text(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, TextContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'children', 'ref');
    let racContext = createMemo(() => useContext(RACTextContext));
    let isSkeleton = useIsSkeleton();
    let [children, skeletonStyle] = useSkeletonText(() => props.children, () => props.UNSAFE_style);
    const RenderText = () => _$createComponent(TextAria, _$mergeProps(otherProps, {
        ref(r$) {
            var _ref$4 = domRef;
            typeof _ref$4 === "function" || Array.isArray(_ref$4) ? _$applyRef(_ref$4, r$) : domRef = r$;
        },
        get inert() {
            return inertValue(isSkeleton());
        },
        get "class"() {
            return (props.UNSAFE_className ?? '') + (props.styles ?? '');
        },
        get style() {
            return skeletonStyle();
        },
        get slot() {
            return props.slot || undefined;
        },
        "data-rsp-slot": "text",
        get children() {
            return children();
        }
    }));
    const clearContext = () => {
        const ctx = racContext();
        return props.slot && ctx && 'slots' in ctx && !ctx.slots?.[props.slot];
    };
    return _$memo(() => _$memo(() => !props.isHidden)() && (clearContext() ? _$createComponent(RACTextContext, {
        value: null,
        get children() {
            return _$createComponent(RenderText, {});
        }
    }) : _$createComponent(RenderText, {})));
}
export const KeyboardContext = createContext({});
export function Keyboard(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, KeyboardContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && _$createComponent(KeyboardAria, _$mergeProps(otherProps, {
        ref(r$) {
            var _ref$5 = domRef;
            typeof _ref$5 === "function" || Array.isArray(_ref$5) ? _$applyRef(_ref$5, r$) : domRef = r$;
        },
        get className() {
            return (props.UNSAFE_className ?? '') + (props.styles ?? '');
        },
        get style() {
            return props.UNSAFE_style;
        },
        get slot() {
            return props.slot || undefined;
        }
    })));
}
export const FooterContext = createContext({});
export function Footer(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, FooterContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && (() => {
        var _el$2 = _$getNextElement(_tmpl$2);
        _$spread(_el$2, [otherProps, {
                get "class"() {
                    return (props.UNSAFE_className ?? '') + (props.styles ?? '');
                },
                get style() {
                    return props.UNSAFE_style;
                },
                get slot() {
                    return props.slot || undefined;
                }
            }], false);
        var _ref$6 = domRef;
        typeof _ref$6 === "function" || Array.isArray(_ref$6) ? _$ref(() => _ref$6, _el$2) : domRef = _el$2;
        _$runHydrationEvents();
        return _el$2;
    })());
}
