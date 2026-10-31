import { mergeProps as _$mergeProps } from "@solidjs/web";
var _m$ = Symbol(), _m$2 = Symbol(), _m$3 = Symbol(), _m$4 = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        return props.slot ?? 'avatar';
    },
    enumerable: true,
    configurable: true
}, _d$2 = {
    get() {
        const props = this[_m$];
        return props.alt ?? '';
    },
    enumerable: true,
    configurable: true
}, _d$3 = {
    get() {
        const props = this[_m$];
        const sizeInfo = this[_m$2];
        return {
            ...props.UNSAFE_style,
            width: sizeInfo().remSize,
            height: sizeInfo().remSize
        };
    },
    enumerable: true,
    configurable: true
}, _d$4 = {
    get() {
        const props = this[_m$];
        return (props.UNSAFE_className ?? '') + ' ' + centerBaselineBefore;
    },
    enumerable: true,
    configurable: true
}, _d$5 = {
    get() {
        const props = this[_m$];
        const sizeInfo = this[_m$2];
        return imageStyles({
            isOverBackground: props.isOverBackground,
            isLarge: sizeInfo().isLarge,
            isLH: sizeInfo().isLH
        }, props.styles);
    },
    enumerable: true,
    configurable: true
}, _d$6 = {
    get() {
        const props = this[_m$];
        return props.src;
    },
    enumerable: true,
    configurable: true
};
function _P$(_p, _p2, _p3) {
    this[_m$] = _p;
    this[_m$2] = _p2;
    this.ref = _p3;
    Object.defineProperty(this, "slot", _d$);
    Object.defineProperty(this, "alt", _d$2);
    Object.defineProperty(this, "UNSAFE_style", _d$3);
    Object.defineProperty(this, "UNSAFE_className", _d$4);
    Object.defineProperty(this, "styles", _d$5);
    Object.defineProperty(this, "src", _d$6);
}
_P$.prototype = Object.prototype;
var _d$7 = {
    get() {
        const domProps = this[_m$];
        const props = this[_m$2];
        const sizeInfo = this[_m$3];
        const domRef = this[_m$4];
        return Image(_$mergeProps(domProps, new _P$(props, sizeInfo, node => domRef(node))));
    },
    enumerable: true,
    configurable: true
};
function _P$2(_p4, _p5, _p6, _p7, _p8) {
    this[_m$] = _p4;
    this[_m$2] = _p5;
    this[_m$3] = _p6;
    this[_m$4] = _p7;
    this.value = _p8;
    Object.defineProperty(this, "children", _d$7);
}
_P$2.prototype = Object.prototype;
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
import { centerBaselineBefore } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/CenterBaseline.native.js";
import { createContext, createMemo, omit, untrack } from "solid-js";
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/filterDOMProps.js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { Image, ImageContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Image.native.js";
import { isDocsEnv } from "./macros" with { type: 'macro' };
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
const imageStyles = style({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'full',
    size: 20,
    flexShrink: 0,
    flexGrow: 0,
    disableTapHighlight: true,
    outlineStyle: {
        default: 'none',
        isOverBackground: 'solid'
    },
    outlineColor: '--s2-container-bg',
    outlineWidth: {
        default: 1,
        isLarge: 2,
        // if bigger than 64px, use 2px outline, otherwise use 1px outline
        isLH: 'min(2px, max(1px, calc((((1lh / 64) - 1px) * 9999) + 1px)))'
    }
}, getAllowedOverrides({
    width: false
}));
export const AvatarContext = createContext(null);
/**
 * An avatar is a thumbnail representation of an entity, such as a user or an organization.
 */
export function Avatar(inputProps) {
    let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), AvatarContext);
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'alt', 'src', 'UNSAFE_style', 'UNSAFE_className', 'size', 'isOverBackground', 'slot', 'ref');
    const domProps = filterDOMProps(otherProps);
    // In the docs build, we need to be able to simulate font scaling.
    let sizeInfo = createMemo(() => {
        let size = props.size ?? 24;
        let remSize;
        let isLarge = false;
        let isLH = false;
        if (typeof size === 'string') {
            remSize = size;
            isLH = size.endsWith('lh');
        }
        else {
            remSize = isDocsEnv() ? `calc(${size / 16} * var(--rem, 1rem))` : `${size / 16}rem`;
            isLarge = size >= 64;
        }
        return {
            remSize,
            isLarge,
            isLH
        };
    });
    return ImageContext(new _P$2(domProps, props, sizeInfo, domRef, {}));
}
