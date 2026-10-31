import { template as _$template } from "@solidjs/web";
import { setStyleProperty as _$setStyleProperty } from "@solidjs/web";
import { className as _$className } from "@solidjs/web";
import { readShallow as _$readShallow } from "@solidjs/web";
import { setAttribute as _$setAttribute } from "@solidjs/web";
import { effect as _$effect } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { applyRef as _$applyRef } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<svg fill=none width=100% height=100% style=display:block><circle cx=50% cy=50%></circle><circle cx=50% cy=50%></circle><circle cx=50% cy=50% pathLength=100 stroke-dasharray="100 200"stroke-linecap=round>`);
import { createContext, untrack } from "solid-js";
import { getAllowedOverrides, staticColor } from "./style-utils" with { type: 'macro' };
import { keyframes } from "../style/style-macro" with { type: 'macro' };
import { pxToRem } from "./progress-utils" with { type: 'macro' };
import { ProgressBar as RACProgressBar } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria-components/exports/ProgressBar.js";
import { style } from "../style" with { type: 'macro' };
import { useDOMRef } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useDOMRef.native.js";
import { useSpectrumContextProps } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/useSpectrumContextProps.native.js";
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
    return _$createComponent(RACProgressBar, _$mergeProps(props, {
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
        children: renderProps => (() => {
            var _el$ = _$getNextElement(_tmpl$), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
            _$effect(() => ({
                e: radius(),
                t: _$readShallow(hcmStroke({
                    size: size()
                })),
                a: radius(),
                o: _$readShallow(track({
                    isStaticColor: isStaticColor(),
                    size: size()
                })),
                i: radius(),
                n: _$readShallow(fill({
                    isStaticColor: isStaticColor(),
                    size: size()
                })),
                s: renderProps.isIndeterminate ? `${rotationAnimation} 1s cubic-bezier(.6, .1, .3, .9) infinite, ${dashoffsetAnimation} 1s cubic-bezier(.25, .1, .25, 1.3) infinite` : undefined,
                h: renderProps.isIndeterminate || renderProps.percentage == null ? undefined : 100 - renderProps.percentage
            }), ({ e, t, a, o, i, n, s, h }, _p$) => {
                e !== _p$?.e && _$setAttribute(_el$2, "r", e);
                _$className(_el$2, t, _p$?.t);
                a !== _p$?.a && _$setAttribute(_el$3, "r", a);
                _$className(_el$3, o, _p$?.o);
                i !== _p$?.i && _$setAttribute(_el$4, "r", i);
                _$className(_el$4, n, _p$?.n);
                s !== _p$?.s && _$setStyleProperty(_el$4, "animation", s);
                h !== _p$?.h && _$setAttribute(_el$4, "stroke-dashoffset", h);
            });
            return _el$;
        })()
    }));
}
