import { template as _$template } from "@solidjs/web";
import { insert as _$insert } from "@solidjs/web";
import { className as _$className } from "@solidjs/web";
import { readShallow as _$readShallow } from "@solidjs/web";
import { effect as _$effect } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<span>`), _tmpl$2 = /*#__PURE__*/ _$template(`<div>`);
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
import { baseColor, focusRing, lightDark, style } from "../style" with { type: 'macro' };
import { Button as RACButton } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Button.js";
import { centerBaseline } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/CenterBaseline.native.js";
import { Provider } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/src/utils.js";
import { control, getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import { createContext, useContext, createEffect, createSignal, onCleanup } from "solid-js";
import { IconContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Icon.native.js";
import intlMessages from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/intl/dictionary.native.js";
import { linearGradient } from "../style/spectrum-theme" with { type: 'macro' };
import { Link } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Link.js";
import { OverlayTriggerStateContext } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Dialog.js";
import { pressScale } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/pressScale.native.js";
import { ProgressCircle } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js";
import { SkeletonContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Skeleton.native.js";
import { Text, TextContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Content.native.js";
import { useFocusableRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useFormProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Form.native.js";
import { useLocalizedStringFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/useLocalizedStringFormatter.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
export const ButtonContext = createContext(null);
export const LinkButtonContext = createContext(null);
const button = style({
    ...focusRing(),
    ...staticColor(),
    ...control({
        shape: 'pill',
        wrap: true,
        icon: true
    }),
    position: 'relative',
    justifyContent: 'center',
    textAlign: 'start',
    fontWeight: 'bold',
    userSelect: 'none',
    width: 'fit',
    textDecoration: 'none',
    // for link buttons
    transition: 'default',
    borderStyle: 'solid',
    borderWidth: {
        fillStyle: {
            fill: 0,
            outline: 2
        },
        variant: {
            premium: 0,
            genai: 0
        }
    },
    borderColor: {
        variant: {
            primary: baseColor('gray-800'),
            secondary: baseColor('gray-300')
        },
        isDisabled: 'disabled',
        isStaticColor: {
            variant: {
                primary: baseColor('transparent-overlay-800'),
                secondary: baseColor('transparent-overlay-300')
            },
            isDisabled: 'transparent-overlay-300'
        },
        forcedColors: {
            default: 'ButtonBorder',
            isHovered: 'Highlight',
            isDisabled: 'GrayText'
        }
    },
    backgroundColor: {
        fillStyle: {
            fill: {
                variant: {
                    primary: baseColor('neutral'),
                    secondary: baseColor('gray-100'),
                    accent: {
                        default: lightDark('accent-900', 'accent-700'),
                        isHovered: lightDark('accent-1000', 'accent-600'),
                        isPressed: lightDark('accent-1000', 'accent-600'),
                        isFocusVisible: lightDark('accent-1000', 'accent-600')
                    },
                    negative: {
                        default: lightDark('negative-900', 'negative-700'),
                        isHovered: lightDark('negative-1000', 'negative-600'),
                        isPressed: lightDark('negative-1000', 'negative-600'),
                        isFocusVisible: lightDark('negative-1000', 'negative-600')
                    },
                    premium: 'gray-100',
                    genai: 'gray-100'
                },
                isDisabled: 'disabled'
            },
            outline: {
                variant: {
                    premium: 'gray-100',
                    genai: 'gray-100'
                },
                default: 'transparent',
                isHovered: 'gray-100',
                isPressed: 'gray-100',
                isFocusVisible: 'gray-100',
                isDisabled: {
                    default: 'transparent',
                    variant: {
                        premium: 'gray-100',
                        genai: 'gray-100'
                    }
                }
            }
        },
        isStaticColor: {
            fillStyle: {
                fill: {
                    variant: {
                        primary: baseColor('transparent-overlay-800'),
                        secondary: baseColor('transparent-overlay-100'),
                        premium: 'transparent-overlay-100',
                        genai: 'transparent-overlay-100'
                    },
                    isDisabled: 'transparent-overlay-100'
                },
                outline: {
                    variant: {
                        premium: 'transparent-overlay-100',
                        genai: 'transparent-overlay-100'
                    },
                    default: 'transparent',
                    isHovered: 'transparent-overlay-100',
                    isPressed: 'transparent-overlay-100',
                    isFocusVisible: 'transparent-overlay-100',
                    isDisabled: {
                        default: 'transparent',
                        variant: {
                            premium: 'transparent-overlay-100',
                            genai: 'transparent-overlay-100'
                        }
                    }
                }
            }
        },
        forcedColors: {
            fillStyle: {
                fill: {
                    default: 'ButtonText',
                    isHovered: 'Highlight',
                    isDisabled: 'GrayText'
                },
                outline: 'ButtonFace'
            }
        }
    },
    color: {
        fillStyle: {
            fill: {
                variant: {
                    primary: 'gray-25',
                    secondary: baseColor('neutral'),
                    accent: 'white',
                    negative: 'white',
                    premium: 'white',
                    genai: 'white'
                },
                isDisabled: 'disabled'
            },
            outline: {
                default: baseColor('neutral'),
                variant: {
                    premium: 'white',
                    genai: 'white'
                },
                isDisabled: 'disabled'
            }
        },
        isStaticColor: {
            fillStyle: {
                fill: {
                    variant: {
                        primary: 'auto',
                        secondary: {
                            default: 'transparent-overlay-1000',
                            isHovered: 'transparent-overlay-1000',
                            isFocusVisible: 'transparent-overlay-1000',
                            isPressed: 'transparent-overlay-1000'
                        },
                        premium: 'white',
                        genai: 'white'
                    }
                },
                outline: {
                    variant: {
                        premium: 'white',
                        genai: 'white'
                    },
                    default: {
                        default: 'transparent-overlay-1000',
                        isHovered: 'transparent-overlay-1000',
                        isFocusVisible: 'transparent-overlay-1000',
                        isPressed: 'transparent-overlay-1000'
                    }
                }
            },
            isDisabled: 'transparent-overlay-400'
        },
        forcedColors: {
            fillStyle: {
                fill: {
                    default: 'ButtonFace',
                    isDisabled: 'HighlightText'
                },
                outline: {
                    default: 'ButtonText',
                    isDisabled: 'GrayText'
                }
            }
        }
    },
    '--iconPrimary': {
        type: 'fill',
        value: 'currentColor'
    },
    outlineColor: {
        default: 'focus-ring',
        isStaticColor: 'transparent-overlay-1000',
        forcedColors: 'Highlight'
    },
    forcedColorAdjust: 'none',
    disableTapHighlight: true
}, getAllowedOverrides());
// Put the gradient background on a separate element from the button to work around a Safari
// bug where transitions of custom properties cause layout flickering if any properties use rems. 🤣
// https://bugs.webkit.org/show_bug.cgi?id=285622
const gradient = style({
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    transition: 'default',
    borderRadius: 'inherit',
    backgroundImage: {
        variant: {
            premium: {
                default: linearGradient('to bottom right', ['fuchsia-900', 0], ['indigo-900', 66], ['blue-900', 100]),
                isHovered: linearGradient('to bottom right', ['fuchsia-1000', 0], ['indigo-1000', 66], ['blue-1000', 100]),
                isPressed: linearGradient('to bottom right', ['fuchsia-1000', 0], ['indigo-1000', 66], ['blue-1000', 100]),
                isFocusVisible: linearGradient('to bottom right', ['fuchsia-1000', 0], ['indigo-1000', 66], ['blue-1000', 100])
            },
            genai: {
                default: linearGradient('to bottom right', ['red-900', 0], ['magenta-900', 33], ['indigo-900', 100]),
                isHovered: linearGradient('to bottom right', ['red-1000', 0], ['magenta-1000', 33], ['indigo-1000', 100]),
                isPressed: linearGradient('to bottom right', ['red-1000', 0], ['magenta-1000', 33], ['indigo-1000', 100]),
                isFocusVisible: linearGradient('to bottom right', ['red-1000', 0], ['magenta-1000', 33], ['indigo-1000', 100])
            }
        },
        isDisabled: 'none',
        forcedColors: 'none'
    },
    // Force gradient colors to remain static between light and dark theme.
    colorScheme: {
        variant: {
            premium: 'light',
            genai: 'light'
        }
    }
});
export function usePendingState(isPending) {
    let [isProgressVisible, setIsProgressVisible] = createSignal(false);
    createEffect(() => typeof isPending === 'function' ? isPending() : isPending, pending => {
        let timeout;
        if (pending) {
            timeout = setTimeout(() => {
                setIsProgressVisible(true);
            }, 1000);
        }
        else {
            // oxlint-disable-next-line react/react-compiler
            setIsProgressVisible(false);
        }
        onCleanup(() => {
            clearTimeout(timeout);
        });
    });
    return {
        get isProgressVisible() {
            return isProgressVisible();
        }
    };
}
/**
 * Buttons allow users to perform an action.
 * They have multiple styles for various needs, and are ideal for calling attention to
 * where a user needs to do something in order to move forward in a flow.
 */
export function Button(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [props, ref] = useSpectrumContextProps(inputProps, inputProps.ref, ButtonContext);
    props = useFormProps(props);
    let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
    let isPending = () => props.isPending ?? false;
    let variant = () => props.variant ?? 'primary';
    let fillStyle = () => props.fillStyle ?? 'fill';
    let size = () => props.size ?? 'M';
    let domRef = useFocusableRef(ref);
    let overlayTriggerState = useContext(OverlayTriggerStateContext);
    let pendingState = usePendingState(isPending);
    // oxlint-disable react/react-compiler
    return _$createComponent(RACButton, _$mergeProps(props, {
        ref: value => {
            domRef.current = value;
        },
        get style() {
            return pressScale(domRef, props.UNSAFE_style);
        },
        className: renderProps => (props.UNSAFE_className || '') + button({
            ...renderProps,
            // Retain hover styles when an overlay is open.
            isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
            isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
            variant: variant(),
            fillStyle: fillStyle(),
            size: size(),
            staticColor: props.staticColor,
            isStaticColor: !!props.staticColor
        }, props.styles),
        children: renderProps => [_$memo(() => _$memo(() => !!(variant() === 'genai' || variant() === 'premium'))() ? (() => {
                var _el$ = _$getNextElement(_tmpl$);
                _$effect(() => _$readShallow(gradient({
                    ...renderProps,
                    // Retain hover styles when an overlay is open.
                    isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                    isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
                    variant: variant()
                })), (_v$, _$p) => {
                    _$className(_el$, _v$, _$p);
                });
                return _el$;
            })() : null), _$createComponent(Provider, {
                get values() {
                    return [[SkeletonContext, null], [TextContext, {
                                styles: style({
                                    paddingY: '--labelPadding',
                                    order: 1,
                                    visibility: {
                                        isProgressVisible: 'hidden'
                                    }
                                })({
                                    isProgressVisible: pendingState.isProgressVisible
                                }),
                                ...{
                                    'data-rsp-slot': 'text'
                                }
                            }], [IconContext, {
                                render: centerBaseline({
                                    slot: 'icon',
                                    styles: style({
                                        order: 0
                                    })
                                }),
                                styles: style({
                                    size: '1lh',
                                    marginStart: '--iconMargin',
                                    flexShrink: 0,
                                    visibility: {
                                        isProgressVisible: 'hidden'
                                    }
                                })({
                                    isProgressVisible: pendingState.isProgressVisible
                                })
                            }]];
                },
                get children() {
                    return [_$memo(() => _$memo(() => typeof props.children === 'string')() ? _$createComponent(Text, {
                            get children() {
                                return props.children;
                            }
                        }) : props.children), _$memo(() => _$memo(() => !!isPending())() ? (() => {
                            var _el$2 = _$getNextElement(_tmpl$2);
                            _$insert(_el$2, _$createComponent(ProgressCircle, {
                                isIndeterminate: true,
                                get "aria-label"() {
                                    return stringFormatter.format('button.pending');
                                },
                                size: "S",
                                get staticColor() {
                                    return props.staticColor;
                                },
                                get styles() {
                                    return style({
                                        size: {
                                            size: {
                                                S: 14,
                                                M: 18,
                                                L: 20,
                                                XL: 24
                                            }
                                        }
                                    })({
                                        size: size()
                                    });
                                }
                            }));
                            _$effect(() => _$readShallow(style({
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                visibility: {
                                    default: 'hidden',
                                    isProgressVisible: 'visible'
                                }
                            })({
                                isProgressVisible: pendingState.isProgressVisible,
                                isPending: isPending()
                            })), (_v$, _$p) => {
                                _$className(_el$2, _v$, _$p);
                            });
                            return _el$2;
                        })() : isPending())];
                }
            })]
    }));
    // oxlint-enable react/react-compiler
}
/**
 * A LinkButton combines the functionality of a link with the appearance of a button. Useful for
 * allowing users to navigate to another page.
 */
export function LinkButton(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [props, ref] = useSpectrumContextProps(inputProps, inputProps.ref, LinkButtonContext);
    props = useFormProps(props);
    let domRef = useFocusableRef(ref);
    let overlayTriggerState = useContext(OverlayTriggerStateContext);
    let fillStyle = () => props.fillStyle ?? 'fill';
    let size = () => props.size ?? 'M';
    let variant = () => props.variant ?? 'primary';
    // oxlint-disable react/react-compiler
    return _$createComponent(Link, _$mergeProps(props, {
        ref: value => {
            domRef.current = value;
        },
        get style() {
            return pressScale(domRef, props.UNSAFE_style);
        },
        className: renderProps => (props.UNSAFE_className || '') + button({
            ...renderProps,
            // Retain hover styles when an overlay is open.
            isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
            variant: variant(),
            fillStyle: fillStyle(),
            size: size(),
            staticColor: props.staticColor,
            isStaticColor: !!props.staticColor,
            isPending: false
        }, props.styles),
        children: renderProps => [_$memo(() => _$memo(() => !!(variant() === 'genai' || variant() === 'premium'))() ? (() => {
                var _el$3 = _$getNextElement(_tmpl$);
                _$effect(() => _$readShallow(gradient({
                    ...renderProps,
                    // Retain hover styles when an overlay is open.
                    isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                    variant: variant()
                })), (_v$, _$p) => {
                    _$className(_el$3, _v$, _$p);
                });
                return _el$3;
            })() : null), _$createComponent(Provider, {
                get values() {
                    return [[SkeletonContext, null], [TextContext, {
                                styles: style({
                                    paddingY: '--labelPadding',
                                    order: 1
                                }),
                                ...{
                                    'data-rsp-slot': 'text'
                                }
                            }], [IconContext, {
                                render: centerBaseline({
                                    slot: 'icon',
                                    styles: style({
                                        order: 0
                                    })
                                }),
                                styles: style({
                                    size: '1lh',
                                    marginStart: '--iconMargin',
                                    flexShrink: 0
                                })
                            }]];
                },
                get children() {
                    return _$memo(() => typeof props.children === 'string')() ? _$createComponent(Text, {
                        get children() {
                            return props.children;
                        }
                    }) : props.children;
                }
            })]
    }));
    // oxlint-enable react/react-compiler
}
