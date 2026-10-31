import { mergeProps as _$mergeProps } from "@solidjs/web";
var _m$ = Symbol(), _m$2 = Symbol(), _m$3 = Symbol(), _m$4 = Symbol(), _m$5 = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        return props.children;
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
var _d$2 = {
    get() {
        const props = this[_m$];
        return props.UNSAFE_style;
    },
    enumerable: true,
    configurable: true
}, _d$3 = {
    get() {
        const props = this[_m$];
        const size = this[_m$2];
        const density = this[_m$3];
        const orientation = this[_m$4];
        return (props.UNSAFE_className || '') + actionGroupStyle({
            size: size(),
            density: density(),
            orientation: orientation(),
            isJustified: props.isJustified
        }, props.styles);
    },
    enumerable: true,
    configurable: true
}, _d$4 = {
    get() {
        const props = this[_m$];
        const context = this[_m$5];
        return ActionButtonGroupContext(new _P$(props, context));
    },
    enumerable: true,
    configurable: true
};
function _P$2(_p3, _p4, _p5, _p6, _p7, _p8) {
    this[_m$] = _p3;
    this[_m$2] = _p4;
    this[_m$3] = _p5;
    this[_m$4] = _p6;
    this[_m$5] = _p7;
    this.ref = _p8;
    Object.defineProperty(this, "style", _d$2);
    Object.defineProperty(this, "className", _d$3);
    Object.defineProperty(this, "children", _d$4);
}
_P$2.prototype = Object.prototype;
import { createContext, untrack } from "solid-js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { style } from "../style" with { type: 'macro' };
import { Toolbar } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Toolbar.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const actionGroupStyle = style({
    display: 'flex',
    flexDirection: {
        orientation: {
            horizontal: 'row',
            vertical: 'column'
        }
    },
    gap: {
        density: {
            compact: 2,
            regular: {
                size: {
                    XS: 4,
                    S: 4,
                    M: 8,
                    L: 8,
                    XL: 8
                }
            }
        }
    }
}, getAllowedOverrides({
    height: true
}));
export const ActionButtonGroupContext = createContext(null);
/**
 * An ActionButtonGroup is a grouping of related ActionButtons.
 */
export function ActionButtonGroup(inputProps) {
    let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ActionButtonGroupContext);
    let density = () => props.density ?? 'regular';
    let size = () => props.size ?? 'M';
    let orientation = () => props.orientation ?? 'horizontal';
    // Make sure we get all the same defaults as the ActionButtonGroup
    let context = {
        get size() {
            return size();
        },
        get density() {
            return density();
        },
        get orientation() {
            return orientation();
        },
        get isJustified() {
            return props.isJustified;
        },
        get isQuiet() {
            return props.isQuiet;
        },
        get staticColor() {
            return props.staticColor;
        },
        get isDisabled() {
            return props.isDisabled;
        }
    };
    return Toolbar(_$mergeProps(props, new _P$2(props, size, density, orientation, context, value => {
        ref.current = value;
    })));
}
