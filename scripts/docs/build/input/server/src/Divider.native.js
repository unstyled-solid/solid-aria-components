import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
import { createContext, untrack } from "solid-js";
import { getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import { Separator as RACSeparator } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/Separator.js";
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
export const DividerContext = createContext(null);
export const divider = style({
    ...staticColor(),
    alignSelf: 'stretch',
    backgroundColor: {
        default: 'gray-200',
        size: {
            L: 'gray-800'
        },
        isStaticColor: {
            default: 'transparent-overlay-200',
            size: {
                L: 'transparent-overlay-800'
            }
        },
        forcedColors: 'ButtonBorder'
    },
    borderStyle: 'none',
    borderRadius: 'full',
    margin: 0,
    flexGrow: 0,
    flexShrink: 0,
    height: {
        orientation: {
            horizontal: {
                // These should be px not rems, because we're emulating a border.
                default: '[2px]',
                size: {
                    S: '[1px]',
                    L: '[4px]'
                }
            }
        }
    },
    width: {
        orientation: {
            vertical: {
                default: '[2px]',
                size: {
                    S: '[1px]',
                    L: '[4px]'
                }
            }
        }
    }
}, getAllowedOverrides());
/**
 * Dividers bring clarity to a layout by grouping and dividing content in close proximity.
 * They can also be used to establish rhythm and hierarchy.
 */
export function Divider(inputProps) {
    let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), DividerContext);
    let domRef = useDOMRef(ref);
    return RACSeparator(_$mergeProps(props, {
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get style() {
            return props.UNSAFE_style;
        },
        get className() {
            return (props.UNSAFE_className || '') + divider({
                size: props.size || 'M',
                orientation: props.orientation || 'horizontal',
                staticColor: props.staticColor,
                isStaticColor: !!props.staticColor
            }, props.styles);
        }
    }));
}
