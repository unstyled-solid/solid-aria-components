import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
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
import { baseColor, focusRing, style } from "../style" with { type: 'macro' };
import { createContext, createRenderEffect } from "solid-js";
import { getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import { Link as RACLink } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Link.js";
import { useIsSkeleton, useSkeletonText } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
import { useFocusableRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const LinkContext = createContext(null);
const link = style({
    ...focusRing(),
    ...staticColor(),
    borderRadius: 'sm',
    font: {
        isStandalone: 'ui'
    },
    color: {
        variant: {
            primary: baseColor('accent'),
            secondary: baseColor('neutral') // TODO: should there be an option to inherit from the paragraph? What about hover states?
        },
        isStaticColor: 'transparent-overlay-1000',
        forcedColors: 'LinkText'
    },
    transition: 'default',
    fontWeight: {
        isStandalone: 'medium'
    },
    textDecoration: {
        default: 'underline',
        isStandalone: {
            // Inline links must always have an underline for accessibility.
            isQuiet: {
                default: 'none',
                isHovered: 'underline',
                isFocusVisible: 'underline'
            }
        }
    },
    outlineColor: {
        default: 'focus-ring',
        isStaticColor: 'transparent-overlay-1000',
        forcedColors: 'Highlight'
    },
    disableTapHighlight: true
}, getAllowedOverrides());
/**
 * Links allow users to navigate to a different location.
 * They can be presented inline inside a paragraph or as standalone text.
 */
export function Link(inputProps) {
    let [props, ref] = useSpectrumContextProps(inputProps, inputProps.ref, LinkContext);
    let domRef = useFocusableRef(ref);
    let isSkeleton = useIsSkeleton();
    let [children, unsafeStyle] = useSkeletonText(() => props.children, () => props.UNSAFE_style);
    createRenderEffect(() => ({
        element: domRef.current,
        isSkeleton: isSkeleton()
    }), ({ element, isSkeleton }) => {
        if (element) {
            // TODO: should RAC Link pass through inert?
            element.inert = isSkeleton;
        }
    });
    return RACLink(_$mergeProps(props, {
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get style() {
            return unsafeStyle();
        },
        className: renderProps => (props.UNSAFE_className ?? '') + link({
            ...renderProps,
            variant: props.variant ?? 'primary',
            staticColor: props.staticColor,
            isStaticColor: !!props.staticColor,
            isQuiet: props.isQuiet,
            isStandalone: props.isStandalone,
            isSkeleton: isSkeleton()
        }, props.styles),
        get children() {
            return children();
        }
    }));
}
