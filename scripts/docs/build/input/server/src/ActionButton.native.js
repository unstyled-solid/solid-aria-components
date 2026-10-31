import { ssr as _$ssr } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
import { ssrClassName as _$ssrClassName } from "@solidjs/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _tmpl$ = ["<div", " class=\"", "\">", "</div>"];
var _m$ = Symbol(), _m$2 = Symbol(), _m$3 = Symbol(), _m$4 = Symbol(), _m$5 = Symbol(), _m$6 = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        return props.children;
    },
    enumerable: true,
    configurable: true
};
function _P$(_p) {
    this[_m$] = _p;
    Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
    get() {
        const stringFormatter = this[_m$];
        return stringFormatter.format('actionbutton.pending');
    },
    enumerable: true,
    configurable: true
}, _d$3 = {
    get() {
        const staticColor = this[_m$2];
        return staticColor();
    },
    enumerable: true,
    configurable: true
}, _d$4 = {
    get() {
        return style({
            size: '1lh'
        });
    },
    enumerable: true,
    configurable: true
};
function _P$2(_p2, _p3, _p4, _p5) {
    this[_m$] = _p2;
    this[_m$2] = _p3;
    this.isIndeterminate = _p4;
    Object.defineProperty(this, "aria-label", _d$2);
    this.size = _p5;
    Object.defineProperty(this, "staticColor", _d$3);
    Object.defineProperty(this, "styles", _d$4);
}
_P$2.prototype = Object.prototype;
var _d$5 = {
    get() {
        const pendingState = this[_m$];
        const staticColor = this[_m$2];
        const props = this[_m$3];
        const renderProps = this[_m$4];
        return [[SkeletonContext, null], [TextContext, {
                    get styles() {
                        return style({
                            gridArea: 'text',
                            truncate: true,
                            visibility: {
                                isProgressVisible: 'hidden'
                            }
                        })({
                            isProgressVisible: pendingState.isProgressVisible
                        });
                    }
                }], [IconContext, {
                    render: centerBaseline({
                        slot: 'icon',
                        styles: style({
                            gridArea: 'icon'
                        })
                    }),
                    get styles() {
                        return style({
                            size: '1lh',
                            marginStart: '--iconMargin',
                            visibility: {
                                isProgressVisible: 'hidden'
                            }
                        })({
                            isProgressVisible: pendingState.isProgressVisible
                        });
                    }
                }], [AvatarContext, {
                    size: '1lh',
                    styles: style({
                        marginStart: '--iconMargin',
                        gridArea: 'icon'
                    })
                }], [ImageContext, {
                    get styles() {
                        return style({
                            visibility: {
                                isProgressVisible: 'hidden'
                            }
                        })({
                            isProgressVisible: pendingState.isProgressVisible
                        });
                    }
                }], [NotificationBadgeContext, {
                    get staticColor() {
                        return staticColor();
                    },
                    get size() {
                        return props.size === 'XS' ? undefined : props.size;
                    },
                    get isDisabled() {
                        return renderProps.isDisabled;
                    },
                    get styles() {
                        return style({
                            position: 'absolute',
                            top: '--badgeTop',
                            marginTop: 'calc((self(height) * -1)/2)',
                            marginStart: 'calc(var(--iconMargin) * 2 + (self(height) * -1)/4)',
                            gridColumnStart: 1,
                            insetStart: '--badgePosition',
                            visibility: {
                                isProgressVisible: 'hidden'
                            }
                        })({
                            isProgressVisible: pendingState.isProgressVisible
                        });
                    }
                }]];
    },
    enumerable: true,
    configurable: true
}, _d$6 = {
    get() {
        const props = this[_m$3];
        const isPending = this[_m$5];
        const pendingState = this[_m$];
        const stringFormatter = this[_m$6];
        const staticColor = this[_m$2];
        return [_$memo(() => _$memo(() => typeof props.children === 'string')() ? Text(new _P$(props)) : props.children), _$memo(() => {
                var _v$, _v$2, _v$3;
                return _$memo(() => !!isPending())() ? (_v$ = _$ssrHydrationKey(), _v$2 = () => _$ssrClassName(style({
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
                })), _v$3 = _$escape(ProgressCircle(new _P$2(stringFormatter, staticColor, true, "S"))), _$ssr(_tmpl$, _v$, _v$2, _v$3)) : isPending();
            })];
    },
    enumerable: true,
    configurable: true
};
function _P$3(_p6, _p7, _p8, _p9, _p0, _p1) {
    this[_m$] = _p6;
    this[_m$2] = _p7;
    this[_m$3] = _p8;
    this[_m$4] = _p9;
    this[_m$5] = _p0;
    this[_m$6] = _p1;
    Object.defineProperty(this, "values", _d$5);
    Object.defineProperty(this, "children", _d$6);
}
_P$3.prototype = Object.prototype;
var _d$7 = {
    get() {
        const size = this[_m$];
        return _$memo(() => size() === 'XS')() ? 'S' : size();
    },
    enumerable: true,
    configurable: true
}, _d$8 = {
    get() {
        const locale = this[_m$2];
        const size = this[_m$];
        return style({
            position: 'absolute',
            insetEnd: {
                size: {
                    XS: space(3),
                    S: space(3),
                    M: 4,
                    L: space(5),
                    XL: space(6)
                }
            },
            bottom: {
                size: {
                    XS: space(3),
                    S: space(3),
                    M: 4,
                    L: space(5),
                    XL: space(6)
                }
            },
            scaleX: {
                direction: {
                    rtl: -1
                }
            }
        })({
            direction: locale.direction,
            size: size()
        });
    },
    enumerable: true,
    configurable: true
};
function _P$4(_p10, _p11) {
    this[_m$] = _p10;
    this[_m$2] = _p11;
    Object.defineProperty(this, "size", _d$7);
    Object.defineProperty(this, "className", _d$8);
}
_P$4.prototype = Object.prototype;
var _d$9 = {
    get() {
        const props = this[_m$];
        const ctx = this[_m$2];
        return props.isDisabled ?? ctx()?.isDisabled;
    },
    enumerable: true,
    configurable: true
}, _d$0 = {
    get() {
        const domRef = this[_m$3];
        const props = this[_m$];
        return pressScale(domRef, props.UNSAFE_style);
    },
    enumerable: true,
    configurable: true
};
function _P$5(_p12, _p13, _p14, _p15, _p16, _p17) {
    this[_m$] = _p12;
    this[_m$2] = _p13;
    this[_m$3] = _p14;
    Object.defineProperty(this, "isDisabled", _d$9);
    this.ref = _p15;
    Object.defineProperty(this, "style", _d$0);
    this.className = _p16;
    this.children = _p17;
}
_P$5.prototype = Object.prototype;
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
import { ActionButtonGroupContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/ActionButtonGroup.native.js";
import { AvatarContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Avatar.native.js";
import { baseColor, focusRing, fontRelative, lightDark, space, style } from "../style" with { type: 'macro' };
import { Button as RACButton } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Button.js";
import { centerBaseline } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/CenterBaseline.native.js";
import { Provider, useSlottedContext } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/src/utils.js";
import { control, getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import CornerTriangle from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/ui-icons/CornerTriangle.native.js";
import { createContext, createMemo, untrack, useContext } from "solid-js";
import { IconContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Icon.native.js";
import { ImageContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Image.native.js";
import intlMessages from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/intl/dictionary.native.js";
import { NotificationBadgeContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/NotificationBadge.native.js";
import { OverlayTriggerStateContext } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Dialog.js";
import { pressScale } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/pressScale.native.js";
import { ProgressCircle } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/ProgressCircle.native.js";
import { SkeletonContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Skeleton.native.js";
import { Text, TextContext } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Content.native.js";
import { useFocusableRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useFormProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Form.native.js";
import { useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/I18nProvider.js";
import { useLocalizedStringFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/useLocalizedStringFormatter.js";
import { usePendingState } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Button.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
// These styles handle both ActionButton and ToggleButton
const iconOnly = ':has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))';
const avatarOnly = ':has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))';
const textOnly = ':has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))';
const controlStyle = control({
    shape: 'default',
    icon: true
});
export const btnStyles = style({
    ...focusRing(),
    ...staticColor(),
    ...controlStyle,
    display: 'grid',
    justifyContent: 'center',
    flexShrink: {
        default: 1,
        isInGroup: 0
    },
    flexGrow: {
        isJustified: 1
    },
    flexBasis: {
        isJustified: 0
    },
    fontWeight: 'medium',
    width: {
        default: 'fit',
        isInGroup: {
            orientation: {
                vertical: '100%'
            }
        }
    },
    userSelect: 'none',
    transition: 'default',
    forcedColorAdjust: 'none',
    position: 'relative',
    gridTemplateAreas: {
        default: ['icon text'],
        [iconOnly]: ['icon'],
        [textOnly]: ['text']
    },
    gridTemplateColumns: {
        default: ['auto', 'auto'],
        [iconOnly]: ['auto'],
        [textOnly]: ['auto']
    },
    backgroundColor: {
        default: {
            ...baseColor('gray-100'),
            default: {
                default: 'gray-100',
                isQuiet: 'transparent'
            }
        },
        isSelected: {
            default: baseColor('neutral'),
            isEmphasized: {
                default: lightDark('accent-900', 'accent-700'),
                isHovered: lightDark('accent-1000', 'accent-600'),
                isPressed: lightDark('accent-1000', 'accent-600'),
                isFocusVisible: lightDark('accent-1000', 'accent-600')
            },
            isDisabled: {
                default: 'gray-100',
                isQuiet: 'transparent'
            }
        },
        isStaticColor: {
            ...baseColor('transparent-overlay-100'),
            default: {
                default: 'transparent-overlay-100',
                isQuiet: 'transparent'
            },
            isSelected: {
                default: baseColor('transparent-overlay-800'),
                isDisabled: {
                    default: 'transparent-overlay-100',
                    isQuiet: 'transparent'
                }
            }
        },
        forcedColors: {
            default: 'ButtonFace',
            isSelected: {
                default: 'Highlight',
                isDisabled: 'ButtonFace'
            }
        }
    },
    color: {
        default: baseColor('neutral'),
        isSelected: {
            default: 'gray-25',
            isEmphasized: 'white'
        },
        isDisabled: 'disabled',
        isStaticColor: {
            default: 'transparent-overlay-1000',
            isSelected: 'auto',
            isDisabled: 'transparent-overlay-400'
        },
        forcedColors: {
            default: 'ButtonText',
            isSelected: 'HighlightText',
            isDisabled: {
                default: 'GrayText'
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
    borderStyle: 'none',
    borderTopStartRadius: {
        default: controlStyle.borderRadius,
        density: {
            compact: {
                default: 'none',
                ':first-child': controlStyle.borderRadius
            }
        }
    },
    borderTopEndRadius: {
        default: controlStyle.borderRadius,
        density: {
            compact: {
                default: 'none',
                orientation: {
                    horizontal: {
                        ':last-child': controlStyle.borderRadius
                    },
                    vertical: {
                        ':first-child': controlStyle.borderRadius
                    }
                }
            }
        }
    },
    borderBottomStartRadius: {
        default: controlStyle.borderRadius,
        density: {
            compact: {
                default: 'none',
                orientation: {
                    horizontal: {
                        ':first-child': controlStyle.borderRadius
                    },
                    vertical: {
                        ':last-child': controlStyle.borderRadius
                    }
                }
            }
        }
    },
    borderBottomEndRadius: {
        default: controlStyle.borderRadius,
        density: {
            compact: {
                default: 'none',
                ':last-child': controlStyle.borderRadius
            }
        }
    },
    zIndex: {
        isFocusVisible: 2
    },
    disableTapHighlight: true,
    '--badgeTop': {
        type: 'top',
        value: {
            default: 'calc(self(height)/2 - var(--iconWidth)/2)',
            [textOnly]: 0
        }
    },
    '--iconWidth': {
        type: 'width',
        value: '1lh'
    },
    '--badgePosition': {
        type: 'width',
        value: {
            default: '--iconWidth',
            [textOnly]: 'full'
        }
    },
    paddingX: {
        default: controlStyle.paddingX,
        [avatarOnly]: 0
    },
    // `control` sets this, but we need to override it for avatar only buttons.
    '--iconMargin': {
        type: 'marginStart',
        value: {
            default: fontRelative(-2),
            [iconOnly]: 0,
            [avatarOnly]: 0
        }
    }
}, getAllowedOverrides());
export const ActionButtonContext = createContext(null);
/**
 * ActionButtons allow users to perform an action. They're used for similar, task-based options
 * within a workflow, and are ideal for interfaces where buttons aren't meant to draw a lot of
 * attention.
 */
export function ActionButton(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [contextProps, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ActionButtonContext);
    let props = useFormProps(contextProps);
    let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
    let isPending = () => props.isPending ?? false;
    let holdAffordance = () => props.holdAffordance;
    let domRef = useFocusableRef(ref);
    let overlayTriggerState = useContext(OverlayTriggerStateContext);
    let ctx = createMemo(() => useSlottedContext(ActionButtonGroupContext));
    let density = () => ctx()?.density ?? 'regular';
    let orientation = () => ctx()?.orientation ?? 'horizontal';
    let staticColor = () => ctx()?.staticColor ?? props.staticColor;
    let isQuiet = () => ctx()?.isQuiet ?? props.isQuiet;
    let size = () => ctx()?.size ?? (props.size || 'M');
    let pendingState = usePendingState(isPending);
    let locale = useLocale();
    // oxlint-disable react/react-compiler
    return RACButton(_$mergeProps(props, new _P$5(props, ctx, domRef, value => {
        domRef.current = value;
    }, renderProps => (props.UNSAFE_className || '') + btnStyles({
        ...renderProps,
        // Retain hover styles when an overlay is open.
        isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
        isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
        staticColor: staticColor(),
        isStaticColor: !!staticColor(),
        size: size(),
        isQuiet: isQuiet(),
        density: density(),
        isJustified: ctx()?.isJustified,
        orientation: orientation(),
        isInGroup: !!ctx()
    }, props.styles), renderProps => [Provider(new _P$3(pendingState, staticColor, props, renderProps, isPending, stringFormatter)), _$memo(() => _$memo(() => !!holdAffordance())() ? CornerTriangle(new _P$4(size, locale)) : holdAffordance())])));
    // oxlint-enable react/react-compiler
}
