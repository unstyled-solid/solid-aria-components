import { template as _$template } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { runHydrationEvents as _$runHydrationEvents } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { insert as _$insert } from "@solidjs/web";
import { ref as _$ref } from "@solidjs/web";
import { spread as _$spread } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<span>`);
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/filterDOMProps.js";
import { fontRelative, style } from "../style" with { type: 'macro' };
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import intlMessages from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/intl/dictionary.native.js";
import { NumberFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/@internationalized/number/src/index.js";
import { createContext, createMemo, omit, untrack } from "solid-js";
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/I18nProvider.js";
import { useLocalizedStringFormatter } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/useLocalizedStringFormatter.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
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
    var _el$ = _$getNextElement(_tmpl$);
    _$spread(_el$, [() => filterDOMProps(otherProps, {
            labelable: true
        }), {
            get role() {
                return ariaLabel() ? 'img' : undefined;
            },
            get "aria-label"() {
                return ariaLabel();
            },
            get "class"() {
                return (props.UNSAFE_className || '') + badge({
                    size: props.size ?? 'S',
                    isIndicatorOnly: valueInfo().isIndicatorOnly,
                    isSingleDigit: valueInfo().isSingleDigit,
                    isDoubleDigit: valueInfo().isDoubleDigit,
                    isDisabled: props.isDisabled ?? false,
                    isStaticColor: !!props.staticColor
                }, props.styles);
            },
            get style() {
                return props.UNSAFE_style;
            }
        }], true);
    _$ref(() => node => domRef(node), _el$);
    _$insert(_el$, _$scope(() => valueInfo().formattedValue));
    _$runHydrationEvents();
    return _el$;
}
