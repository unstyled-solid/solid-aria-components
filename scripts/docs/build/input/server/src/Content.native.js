import { ssrElement as _$ssrElement } from "@solidjs/web";
import { ssrElementAttribute as _$ssrElementAttribute } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _sk$ = k => k === "class" || k === "style" || k === "slot";
var _m$ = Symbol();
var _d$ = {
    get() {
        const RenderText = this[_m$];
        return RenderText({});
    },
    enumerable: true,
    configurable: true
};
function _P$(_p, _p2) {
    this[_m$] = _p;
    this.value = _p2;
    Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
import { createContext, createMemo, omit, untrack, useContext } from "solid-js";
import { inertValue } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/src/utils/inertValue.js";
import { Keyboard as KeyboardAria } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Keyboard.js";
import { Header as RACHeader } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Header.js";
import { Heading as RACHeading } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/src/Heading.js";
import { TextContext as RACTextContext, Text as TextAria } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Text.js";
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useIsSkeleton, useSkeletonText } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const HeadingContext = createContext(null);
export const Heading = 
// Wrapper around RAC Heading to unmount when hidden.
function Heading(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, HeadingContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && RACHeading(_$mergeProps(otherProps, {
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
    return _$memo(() => _$memo(() => !props.isHidden)() && RACHeader(_$mergeProps(otherProps, {
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
    return _$memo(() => _$memo(() => !props.isHidden)() && _$ssrElement("div", otherProps, undefined, true, _sk$, () => _$ssrElementAttribute("class", (props.UNSAFE_className ?? '') + (props.styles ?? '')) + _$ssrElementAttribute("style", props.UNSAFE_style) + _$ssrElementAttribute("slot", props.slot || undefined)));
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
    const RenderText = () => TextAria(_$mergeProps(otherProps, {
        ref(r$) {
            var _ref$3 = domRef;
            typeof _ref$3 === "function" || Array.isArray(_ref$3) ? _$applyRef(_ref$3, r$) : domRef = r$;
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
    return _$memo(() => _$memo(() => !props.isHidden)() && (clearContext() ? RACTextContext(new _P$(RenderText, null)) : RenderText({})));
}
export const KeyboardContext = createContext({});
export function Keyboard(props) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, KeyboardContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return _$memo(() => _$memo(() => !props.isHidden)() && KeyboardAria(_$mergeProps(otherProps, {
        ref(r$) {
            var _ref$4 = domRef;
            typeof _ref$4 === "function" || Array.isArray(_ref$4) ? _$applyRef(_ref$4, r$) : domRef = r$;
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
    return _$memo(() => _$memo(() => !props.isHidden)() && _$ssrElement("footer", otherProps, undefined, true, _sk$, () => _$ssrElementAttribute("class", (props.UNSAFE_className ?? '') + (props.styles ?? '')) + _$ssrElementAttribute("style", props.UNSAFE_style) + _$ssrElementAttribute("slot", props.slot || undefined)));
}
