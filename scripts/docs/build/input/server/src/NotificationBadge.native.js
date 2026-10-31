import { ssrElement as _$ssrElement } from "@solidjs/web";
import { ssrElementAttribute as _$ssrElementAttribute } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
var _sk$ = k => k === "role" || k === "aria-label" || k === "class" || k === "style";
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/filterDOMProps.js";
import { fontRelative, style } from "../style" with { type: 'macro' };
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import intlMessages from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/intl/dictionary.native.js";
import { NumberFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/@internationalized/number/src/index.js";
import { createContext, createMemo, omit, untrack } from "solid-js";
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/I18nProvider.js";
import { useLocalizedStringFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/useLocalizedStringFormatter.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const NotificationBadgeContext = createContext(null);
const badge = style({
    display: {
        default: 'flex',
        isDisabled: 'none'
    },
    font: 'ui',
    color: {
        default: 'white',
        isStaticColor: 'auto',
        forcedColors: 'ButtonText'
    },
    fontSize: {
        size: {
            S: 'ui-xs',
            M: 'ui-xs',
            L: 'ui-sm',
            XL: 'ui'
        }
    },
    borderStyle: {
        forcedColors: 'solid'
    },
    borderWidth: {
        forcedColors: '[1px]'
    },
    borderColor: {
        forcedColors: 'ButtonBorder'
    },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
        default: 'accent',
        isStaticColor: 'transparent-overlay-1000',
        forcedColors: 'ButtonFace'
    },
    height: {
        size: {
            S: {
                default: 12,
                isIndicatorOnly: 8
            },
            M: {
                default: '1lh',
                // sort of arbitrary? tried to get as close to the figma designs as possible
                isIndicatorOnly: 8
            },
            L: {
                default: 16,
                isIndicatorOnly: fontRelative(12)
            },
            XL: {
                default: 18,
                isIndicatorOnly: fontRelative(12)
            }
        }
    },
    aspectRatio: {
        isIndicatorOnly: 'square',
        isSingleDigit: 'square'
    },
    width: 'max',
    paddingX: {
        isDoubleDigit: 'edge-to-text'
    },
    borderRadius: 'pill'
}, getAllowedOverrides());
/**
 * Notification badges are used to indicate new or pending activity .
 */
export function NotificationBadge(inputProps) {
    let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
    let [input, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), NotificationBadgeContext);
    let props = input;
    let otherProps = omit(props, 'size', 'value', 'isDisabled', 'staticColor');
    let domRef = useDOMRef(ref);
    let locale = useLocale();
    let valueInfo = createMemo(() => {
        let value = props.value;
        let formattedValue = '';
        let isIndicatorOnly = false;
        let isSingleDigit = false;
        let isDoubleDigit = false;
        if (value == null) {
            isIndicatorOnly = true;
        }
        else if (value <= 0) {
            throw new Error('Value cannot be negative or zero');
        }
        else if (!Number.isInteger(value)) {
            throw new Error('Value must be a positive integer');
        }
        else {
            formattedValue = new NumberFormatter(locale.locale).format(Math.min(value, 99));
            let length = Math.log(value <= 99 ? value : 99) * Math.LOG10E + 1 | 0; // for positive integers (https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript)
            if (length === 1) {
                isSingleDigit = true;
            }
            else if (length === 2) {
                isDoubleDigit = true;
            }
            if (value > 99) {
                formattedValue = stringFormatter.format('notificationbadge.plus', {
                    notifications: formattedValue
                });
            }
        }
        return {
            formattedValue,
            isIndicatorOnly,
            isSingleDigit,
            isDoubleDigit
        };
    });
    let ariaLabel = () => props['aria-label'] || (valueInfo().isIndicatorOnly ? stringFormatter.format('notificationbadge.indicatorOnly') : undefined);
    return _$ssrElement("span", () => filterDOMProps(otherProps, {
        labelable: true
    }), () => _$scope(() => _$escape(valueInfo().formattedValue)), true, _sk$, () => _$ssrElementAttribute("role", ariaLabel() ? 'img' : undefined) + _$ssrElementAttribute("aria-label", ariaLabel()) + _$ssrElementAttribute("class", (props.UNSAFE_className || '') + badge({
        size: props.size ?? 'S',
        isIndicatorOnly: valueInfo().isIndicatorOnly,
        isSingleDigit: valueInfo().isSingleDigit,
        isDoubleDigit: valueInfo().isDoubleDigit,
        isDisabled: props.isDisabled ?? false,
        isStaticColor: !!props.staticColor
    }, props.styles)) + _$ssrElementAttribute("style", props.UNSAFE_style));
}
