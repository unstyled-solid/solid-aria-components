import { mergeProps as _$mergeProps } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { createContext, createMemo, omit, untrack } from "solid-js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/style/runtime.native.js";
import { SkeletonWrapper, useSkeletonIcon } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Skeleton.native.js";
import { style } from "../style" with { type: 'macro' };
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
import { mergeRefs } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/mergeRefs.js";
// Custom list of overrides, excluding width/height/flexGrow/flexShrink/flexBasis
const allowedOverrides = ['margin', 'marginStart', 'marginEnd', 'marginTop', 'marginBottom', 'marginX', 'marginY', 'justifySelf', 'alignSelf', 'order', 'gridArea', 'gridRowStart', 'gridRowEnd', 'gridColumnStart', 'gridColumnEnd', 'position', 'zIndex', 'top', 'bottom', 'inset', 'insetX', 'insetY', 'insetStart', 'insetEnd', 'rotate', '--iconPrimary', 'size'];
export const IconContext = createContext({});
export const IllustrationContext = createContext({});
const iconStyles = style({
    size: 20,
    flexShrink: 0
}, allowedOverrides);
export function createIcon(Component, context = IconContext) {
    return (props) => {
        let [ctx, ref] = untrack(() => useSpectrumContextProps(
        // TODO: remove this default once we release RAC and use DEFAULT_SLOT.
        {
            get slot() {
                return props.slot || 'icon';
            }
        }, undefined, context));
        let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'styles');
        // Allocate context-dependent style derivation outside the cleared skeleton provider.
        let skeletonStyles = createMemo(() => useSkeletonIcon(mergeStyles(iconStyles(null, props.styles), ctx.styles)));
        const Svg = () => _$createComponent(SkeletonWrapper, {
            children: overrides => (() => {
                var _ref$ = mergeRefs(ref, overrides.ref);
                return _$createComponent(Component, _$mergeProps(otherProps, {
                    "attr:focusable": "false",
                    ref(r$) {
                        (typeof _ref$ === "function" || Array.isArray(_ref$)) && _$applyRef(_ref$, r$);
                    },
                    get inert() {
                        return overrides.inert;
                    },
                    get "aria-label"() {
                        return props['aria-label'];
                    },
                    get "aria-hidden"() {
                        return _$memo(() => !!props['aria-label'])() ? _$memo(() => props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
                    },
                    role: "img",
                    get "data-slot"() {
                        return props.slot;
                    },
                    get "class"() {
                        return (props.UNSAFE_className ?? '') + ' ' + skeletonStyles() + (overrides.className ? ' ' + overrides.className : '');
                    },
                    get style() {
                        return props.UNSAFE_style;
                    }
                }));
            })()
        });
        return _$memo(() => _$memo(() => !!ctx.render)() ? ctx.render(_$createComponent(Svg, {})) : _$createComponent(Svg, {}));
    };
}
const illustrationStyles = style({
    size: {
        size: {
            S: 48,
            M: 96,
            L: 160
        }
    },
    flexShrink: 0
}, allowedOverrides);
export function createIllustration(Component) {
    return props => {
        let [ctx, ref] = untrack(() => useSpectrumContextProps({
            get slot() {
                return props.slot || 'icon';
            }
        }, undefined, IllustrationContext));
        let size = () => props.size ?? ctx.size ?? 'M';
        let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'size', 'styles', 'render');
        const Svg = () => _$createComponent(Component, _$mergeProps(otherProps, {
            ref(r$) {
                var _ref$2 = ref;
                typeof _ref$2 === "function" || Array.isArray(_ref$2) ? _$applyRef(_ref$2, r$) : ref = r$;
            },
            get size() {
                return size();
            },
            "attr:focusable": "false",
            get "aria-label"() {
                return props['aria-label'];
            },
            get "aria-hidden"() {
                return _$memo(() => !!props['aria-label'])() ? _$memo(() => props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
            },
            role: "img",
            get "data-slot"() {
                return props.slot;
            },
            get "class"() {
                return (props.UNSAFE_className ?? '') + ' ' + illustrationStyles({
                    size: size()
                }, props.styles) + (ctx.styles || '');
            },
            get style() {
                return props.UNSAFE_style;
            }
        }));
        return _$memo(() => _$memo(() => !!props.render)() ? props.render(_$createComponent(Svg, {})) : _$createComponent(Svg, {}));
    };
}
