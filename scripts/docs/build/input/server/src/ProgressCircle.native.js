import { ssr as _$ssr } from "@solidjs/web";
import { ssrGroup as _$ssrGroup } from "@solidjs/web";
import { ssrClassName as _$ssrClassName } from "@solidjs/web";
import { ssrAttribute as _$ssrAttribute } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
import { ssrStyleProperty as _$ssrStyleProperty } from "@solidjs/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
var _tmpl$ = ["<svg", " fill=\"none\" width=\"100%\" height=\"100%\" style=\"", "\"><circle cx=\"50%\" cy=\"50%\"", " class=\"", "\"></circle><circle cx=\"50%\" cy=\"50%\"", " class=\"", "\"></circle><circle cx=\"50%\" cy=\"50%\"", " class=\"", "\" style=\"", "\" pathLength=\"100\" stroke-dasharray=\"100 200\"", " stroke-linecap=\"round\"></circle></svg>"];
import { createContext, untrack } from "solid-js";
import { getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import { keyframes } from "../style/style-macro" with { type: 'macro' };
import { pxToRem } from "./progress-utils" with { type: 'macro' };
import { ProgressBar as RACProgressBar } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria-components/exports/ProgressBar.js";
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/useSpectrumContextProps.native.js";
const pxToRemDynamic = (px) => px / 16 + 'rem';
export const ProgressCircleContext = createContext(null);
// Double check the types passed to each style, may not need all for each
const wrapper = style({
    ...staticColor(),
    size: {
        default: 32,
        size: {
            S: 16,
            L: 64
        }
    },
    aspectRatio: 'square'
}, getAllowedOverrides({
    height: true
}));
const track = style({
    stroke: {
        default: 'gray-300',
        isStaticColor: 'transparent-overlay-300',
        forcedColors: 'Background'
    },
    strokeWidth: {
        default: `[${pxToRem(3)}]`,
        size: {
            S: `[${pxToRem(2)}]`,
            L: `[${pxToRem(4)}]`
        },
        forcedColors: {
            default: `[${pxToRem(2)}]`,
            size: {
                S: `[${pxToRem(1)}]`,
                L: `[${pxToRem(3)}]`
            }
        }
    }
});
const fill = style({
    stroke: {
        default: 'blue-900',
        isStaticColor: 'transparent-overlay-900',
        forcedColors: 'ButtonText'
    },
    rotate: -90,
    transformOrigin: 'center',
    strokeWidth: {
        default: `[${pxToRem(3)}]`,
        size: {
            S: `[${pxToRem(2)}]`,
            L: `[${pxToRem(4)}]`
        }
    }
});
const hcmStroke = style({
    stroke: {
        default: 'transparent',
        forcedColors: 'ButtonText'
    },
    strokeWidth: {
        default: `[${pxToRem(3)}]`,
        size: {
            S: `[${pxToRem(2)}]`,
            L: `[${pxToRem(4)}]`
        }
    }
});
const rotationAnimation = keyframes(`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`);
// stroke-dashoffset represents `100 - percentage`. See below for how this works.
const dashoffsetAnimation = keyframes(`
  0%, 100% {
    stroke-dashoffset: 75;
  }

  30% {
    stroke-dashoffset: 20;
  }
`);
/**
 * ProgressCircles show the progression of a system operation such as downloading, uploading, or
 * processing, in a visual way. They can represent determinate or indeterminate progress.
 */
export function ProgressCircle(props) {
    let { ref: forwardedRef } = props;
    // oxlint-disable-next-line react/react-compiler
    let [contextProps, ref] = untrack(() => useSpectrumContextProps(props, forwardedRef, ProgressCircleContext));
    props = contextProps;
    let size = () => props.size ?? 'M';
    let domRef = useDOMRef(ref);
    let strokeWidth = () => size() === 'S' ? 2 : size() === 'L' ? 4 : 3;
    // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
    let radius = () => `calc(50% - ${pxToRemDynamic(strokeWidth() / 2)})`;
    let isStaticColor = () => !!props.staticColor;
    return RACProgressBar(_$mergeProps(props, {
        ref(r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? _$applyRef(_ref$, r$) : domRef = r$;
        },
        get style() {
            return props.UNSAFE_style;
        },
        className: renderProps => (props.UNSAFE_className ?? '') + wrapper({
            ...renderProps,
            size: size(),
            staticColor: props.staticColor
        }, props.styles),
        children: renderProps => {
            var _v$, _g$;
            return _v$ = _$ssrHydrationKey(), _g$ = _$ssrGroup(() => [_$ssrAttribute("r", _$escape(radius(), true)), _$ssrClassName(hcmStroke({
                    size: size()
                })), _$ssrAttribute("r", _$escape(radius(), true)), _$ssrClassName(track({
                    isStaticColor: isStaticColor(),
                    size: size()
                })), _$ssrAttribute("r", _$escape(radius(), true)), _$ssrClassName(fill({
                    isStaticColor: isStaticColor(),
                    size: size()
                })), _$ssrStyleProperty("animation:", renderProps.isIndeterminate ? `${_$escape(rotationAnimation, true)} 1s cubic-bezier(.6, .1, .3, .9) infinite, ${_$escape(dashoffsetAnimation, true)} 1s cubic-bezier(.25, .1, .25, 1.3) infinite` : _$escape(undefined, true)), _$ssrAttribute("stroke-dashoffset", renderProps.isIndeterminate || renderProps.percentage == null ? _$escape(undefined, true) : 100 - _$escape(renderProps.percentage, true))], 8), _$ssr(_tmpl$, _v$, _$ssrStyleProperty("display:", "block"), _g$, _g$, _g$, _g$, _g$, _g$, _g$, _g$);
        }
    }));
}
