import { template as _$template } from "@solidjs/web";
import { className as _$className } from "@solidjs/web";
import { readShallow as _$readShallow } from "@solidjs/web";
import { effect as _$effect } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<svg viewBox="0 0 10 5"><path d="M4.29289 4.29289L0 0H10L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z">`), _tmpl$2 = /*#__PURE__*/ _$template(`<div>`);
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
import { Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger, OverlayArrow } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Tooltip.js";
import { centerPadding, setColorScheme, style } from "../style" with { type: 'macro' };
import { ColorSchemeContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js";
import { createContext, createEffect, createMemo, createSignal, omit, untrack, useContext } from "solid-js";
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/I18nProvider.js";
const tooltip = style({
    ...setColorScheme(),
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 160,
    minHeight: 24,
    boxSizing: 'border-box',
    font: 'ui-sm',
    color: {
        default: 'gray-25',
        forcedColors: 'ButtonText'
    },
    borderWidth: {
        forcedColors: 1
    },
    borderStyle: {
        forcedColors: 'solid'
    },
    borderColor: {
        forcedColors: 'transparent'
    },
    backgroundColor: 'neutral',
    borderRadius: 'default',
    paddingX: 'edge-to-text',
    paddingY: centerPadding(),
    transition: 'default',
    transitionDuration: 200,
    transitionTimingFunction: {
        isExiting: 'in'
    },
    translateX: {
        placement: {
            left: {
                isEntering: 4,
                isExiting: 4
            },
            right: {
                isEntering: -4,
                isExiting: -4
            }
        }
    },
    translateY: {
        placement: {
            top: {
                isEntering: 4,
                isExiting: 4
            },
            bottom: {
                isEntering: -4,
                isExiting: -4
            }
        }
    },
    opacity: {
        isEntering: 0,
        isExiting: 0
    },
    overflowWrap: {
        default: 'break-word'
    }
});
const arrowStyles = style({
    display: 'block',
    fill: 'gray-800',
    width: 10,
    height: 5,
    rotate: {
        placement: {
            top: 0,
            bottom: '180deg',
            left: '-90deg',
            right: '90deg'
        }
    },
    translateX: {
        placement: {
            left: '-25%',
            right: '25%'
        }
    }
});
let InternalTooltipTriggerContext = createContext({});
/**
 * Display container for Tooltip content. Has a directional arrow dependent on its placement.
 */
export function Tooltip(props) {
    let domRef = useDOMRef(untrack(() => props.ref));
    let triggerContext = useContext(InternalTooltipTriggerContext);
    let colorScheme = createMemo(() => useContext(ColorSchemeContext));
    let locale = useLocale();
    let [borderRadius, setBorderRadius] = createSignal(0);
    // TODO: should we pass through lang and dir props in RAC?
    createEffect(() => ({
        el: domRef.current,
        locale: locale.locale,
        direction: locale.direction
    }), ({ el, locale, direction }) => {
        if (el) {
            el.lang = locale;
            el.dir = direction;
            let spectrumBorderRadius = typeof window !== 'undefined' ? window.getComputedStyle(el).borderRadius : '';
            if (spectrumBorderRadius !== '') {
                setBorderRadius(parseInt(spectrumBorderRadius, 10));
            }
        }
    });
    return _$createComponent(AriaTooltip, _$mergeProps(() => omit(props, 'ref'), {
        get arrowBoundaryOffset() {
            return borderRadius();
        },
        get containerPadding() {
            return triggerContext.containerPadding;
        },
        get crossOffset() {
            return triggerContext.crossOffset;
        },
        offset: 4 + 5,
        get placement() {
            return triggerContext.placement ?? 'top';
        },
        get shouldFlip() {
            return triggerContext.shouldFlip;
        },
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get style() {
            return props.UNSAFE_style;
        },
        className: renderProps => (props.UNSAFE_className ?? '') + tooltip({
            ...renderProps,
            colorScheme: colorScheme()
        }),
        children: renderProps => [_$createComponent(OverlayArrow, {
                className: "",
                get children() {
                    var _el$ = _$getNextElement(_tmpl$);
                    _$effect(() => _$readShallow(arrowStyles(renderProps)), (_v$, _$p) => {
                        _$className(_el$, _v$, _$p);
                    });
                    return _el$;
                }
            }), _$memo(() => props.children)]
    }));
}
/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
export function TooltipTrigger(props) {
    let triggerProps = omit(props, 'containerPadding', 'crossOffset', 'placement', 'shouldFlip');
    let value = {
        get containerPadding() {
            return props.containerPadding;
        },
        get crossOffset() {
            return props.crossOffset;
        },
        get placement() {
            return props.placement;
        },
        get shouldFlip() {
            return props.shouldFlip;
        }
    };
    return _$createComponent(AriaTooltipTrigger, _$mergeProps(triggerProps, {
        get children() {
            return _$createComponent(InternalTooltipTriggerContext, {
                value: value,
                get children() {
                    return props.children;
                }
            });
        }
    }));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CombinedTooltip(props) {
    return _$getNextElement(_tmpl$2);
}
