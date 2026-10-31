import { mergeProps as _$mergeProps } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { createContext, untrack } from "solid-js";
import { getAllowedOverrides } from "./style-utils" with { type: 'macro' };
import { style } from "../style" with { type: 'macro' };
import { Toolbar } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/Toolbar.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
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
    return _$createComponent(Toolbar, _$mergeProps(props, {
        ref: value => {
            ref.current = value;
        },
        get style() {
            return props.UNSAFE_style;
        },
        get className() {
            return (props.UNSAFE_className || '') + actionGroupStyle({
                size: size(),
                density: density(),
                orientation: orientation(),
                isJustified: props.isJustified
            }, props.styles);
        },
        get children() {
            return _$createComponent(ActionButtonGroupContext, {
                value: context,
                get children() {
                    return props.children;
                }
            });
        }
    }));
}
