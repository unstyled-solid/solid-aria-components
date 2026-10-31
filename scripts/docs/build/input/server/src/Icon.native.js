import { mergeProps as _$mergeProps } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
var _m$ = Symbol(), _m$2 = Symbol(), _m$3 = Symbol(), _m$4 = Symbol();
var _d$ = {
    get() {
        const overrides = this[_m$2];
        return overrides.inert;
    },
    enumerable: true,
    configurable: true
}, _d$2 = {
    get() {
        const props = this[_m$3];
        return props['aria-label'];
    },
    enumerable: true,
    configurable: true
}, _d$3 = {
    get() {
        const props = this[_m$3];
        return _$memo(() => !!props['aria-label'])() ? _$memo(() => props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
    },
    enumerable: true,
    configurable: true
}, _d$4 = {
    get() {
        const props = this[_m$3];
        return props.slot;
    },
    enumerable: true,
    configurable: true
}, _d$5 = {
    get() {
        const props = this[_m$3];
        const skeletonStyles = this[_m$4];
        const overrides = this[_m$2];
        return (props.UNSAFE_className ?? '') + ' ' + skeletonStyles() + (overrides.className ? ' ' + overrides.className : '');
    },
    enumerable: true,
    configurable: true
}, _d$6 = {
    get() {
        const props = this[_m$3];
        return props.UNSAFE_style;
    },
    enumerable: true,
    configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5, _p6) {
    this[_m$] = _p;
    this[_m$2] = _p2;
    this[_m$3] = _p3;
    this[_m$4] = _p4;
    this["attr:focusable"] = _p5;
    this.ref = r$ => {
        const _ref$ = this[_m$];
        (typeof _ref$ === "function" || Array.isArray(_ref$)) && _$applyRef(_ref$, r$);
    };
    Object.defineProperty(this, "inert", _d$);
    Object.defineProperty(this, "aria-label", _d$2);
    Object.defineProperty(this, "aria-hidden", _d$3);
    this.role = _p6;
    Object.defineProperty(this, "data-slot", _d$4);
    Object.defineProperty(this, "class", _d$5);
    Object.defineProperty(this, "style", _d$6);
}
_P$.prototype = Object.prototype;
import { createContext, createMemo, omit, untrack } from "solid-js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/style/runtime.native.js";
import { SkeletonWrapper, useSkeletonIcon } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
import { style } from "../style" with { type: 'macro' };
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
import { mergeRefs } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/mergeRefs.js";
// Custom list of overrides, excluding width/height/flexGrow/flexShrink/flexBasis
const allowedOverrides = ['margin', 'marginStart', 'marginEnd', 'marginTop', 'marginBottom', 'marginX', 'marginY', 'justifySelf', 'alignSelf', 'order', 'gridArea', 'gridRowStart', 'gridRowEnd', 'gridColumnStart', 'gridColumnEnd', 'position', 'zIndex', 'top', 'bottom', 'inset', 'insetX', 'insetY', 'insetStart', 'insetEnd', 'rotate', '--iconPrimary', 'size'];
export const IconContext = createContext({});
export const IllustrationContext = createContext({});
const iconStyles = style({
    size: 20,
    flexShrink: 0
}, allowedOverrides);
export function createIcon(Component, context = IconContext) {
    return (props) => {
        let [ctx, ref] = untrack(() => useSpectrumContextProps(
        // TODO: remove this default once we release RAC and use DEFAULT_SLOT.
        {
            get slot() {
                return props.slot || 'icon';
            }
        }, undefined, context));
        let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'styles');
        // Allocate context-dependent style derivation outside the cleared skeleton provider.
        let skeletonStyles = createMemo(() => useSkeletonIcon(mergeStyles(iconStyles(null, props.styles), ctx.styles)));
        const Svg = () => SkeletonWrapper({
            children: overrides => (() => {
                var _ref$ = mergeRefs(ref, overrides.ref);
                return Component(_$mergeProps(otherProps, new _P$(_ref$, overrides, props, skeletonStyles, "false", "img")));
            })()
        });
        return _$memo(() => _$memo(() => !!ctx.render)() ? ctx.render(Svg({})) : Svg({}));
    };
}
const illustrationStyles = style({
    size: {
        size: {
            S: 48,
            M: 96,
            L: 160
        }
    },
    flexShrink: 0
}, allowedOverrides);
export function createIllustration(Component) {
    return props => {
        let [ctx, ref] = untrack(() => useSpectrumContextProps({
            get slot() {
                return props.slot || 'icon';
            }
        }, undefined, IllustrationContext));
        let size = () => props.size ?? ctx.size ?? 'M';
        let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'size', 'styles', 'render');
        const Svg = () => Component(_$mergeProps(otherProps, {
            ref(r$) {
                var _ref$2 = ref;
                typeof _ref$2 === "function" || Array.isArray(_ref$2) ? _$applyRef(_ref$2, r$) : ref = r$;
            },
            get size() {
                return size();
            },
            "attr:focusable": "false",
            get "aria-label"() {
                return props['aria-label'];
            },
            get "aria-hidden"() {
                return _$memo(() => !!props['aria-label'])() ? _$memo(() => props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
            },
            role: "img",
            get "data-slot"() {
                return props.slot;
            },
            get "class"() {
                return (props.UNSAFE_className ?? '') + ' ' + illustrationStyles({
                    size: size()
                }, props.styles) + (ctx.styles || '');
            },
            get style() {
                return props.UNSAFE_style;
            }
        }));
        return _$memo(() => _$memo(() => !!props.render)() ? props.render(Svg({})) : Svg({}));
    };
}
