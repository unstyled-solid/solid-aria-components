import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
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
import { centerBaselineBefore } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/CenterBaseline.native.js";
import { createContext, createMemo, omit, untrack } from "solid-js";
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/filterDOMProps.js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { Image, ImageContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Image.native.js";
import { isDocsEnv } from "./macros" with { type: 'macro' };
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
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
    return _$createComponent(ImageContext, {
        value: {},
        get children() {
            return _$createComponent(Image, _$mergeProps(domProps, {
                ref: node => domRef(node),
                get slot() {
                    return props.slot ?? 'avatar';
                },
                get alt() {
                    return props.alt ?? '';
                },
                get UNSAFE_style() {
                    return {
                        ...props.UNSAFE_style,
                        width: sizeInfo().remSize,
                        height: sizeInfo().remSize
                    };
                },
                get UNSAFE_className() {
                    return (props.UNSAFE_className ?? '') + ' ' + centerBaselineBefore;
                },
                get styles() {
                    return imageStyles({
                        isOverBackground: props.isOverBackground,
                        isLarge: sizeInfo().isLarge,
                        isLH: sizeInfo().isLH
                    }, props.styles);
                },
                get src() {
                    return props.src;
                }
            }));
        }
    });
}
