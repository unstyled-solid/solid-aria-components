import "./ProgressCircle.native.css";
import {template as $38evH$template, createComponent as $38evH$createComponent, mergeProps as $38evH$mergeProps, applyRef as $38evH$applyRef, getNextElement as $38evH$getNextElement, effect as $38evH$effect, readShallow as $38evH$readShallow, setAttribute as $38evH$setAttribute, className as $38evH$className, setStyleProperty as $38evH$setStyleProperty, isServer as $38evH$isServer, memo as $38evH$memo, dynamic as $38evH$dynamic, insert as $38evH$insert} from "@solidjs/web";
import {createContext as $38evH$createContext, untrack as $38evH$untrack, merge as $38evH$merge, $PROXY as $38evH$$PROXY, isHydrating as $38evH$isHydrating, createUniqueId as $38evH$createUniqueId, createSignal as $38evH$createSignal, createEffect as $38evH$createEffect, onCleanup as $38evH$onCleanup, onSettled as $38evH$onSettled, createMemo as $38evH$createMemo, useContext as $38evH$useContext, omit as $38evH$omit, action as $38evH$action, runWithOwner as $38evH$runWithOwner} from "solid-js";
import $38evH$clsx from "clsx";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire90fa"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire90fa"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("gPqiz", function(module, exports) {

$parcel$export(module.exports, "ProgressCircleContext", function () { return $c405cf1fa9bf4fd5$export$afffa1e5edf12209; });
$parcel$export(module.exports, "ProgressCircle", function () { return $c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7; });


parcelRequire("8HZqa");
var $broa7 = parcelRequire("broa7");

var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
var $c405cf1fa9bf4fd5$var$_tmpl$ = /*#__PURE__*/ (0, $38evH$template)(`<svg fill=none width=100% height=100% style=display:block><circle cx=50% cy=50%></circle><circle cx=50% cy=50%></circle><circle cx=50% cy=50% pathLength=100 stroke-dasharray="100 200"stroke-linecap=round>`);
const $c405cf1fa9bf4fd5$var$pxToRemDynamic = (px)=>px / 16 + 'rem';
const $c405cf1fa9bf4fd5$export$afffa1e5edf12209 = (0, $38evH$createContext)(null);
// Double check the types passed to each style, may not need all for each
const $c405cf1fa9bf4fd5$var$wrapper = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let height = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|F|M|K|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        if (p[1] === "F") height = true;
        rules += p[0];
    }
    if (props.staticColor === "white") {
        rules += ' -Ovbhqd-gcwrnr18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["staticColor === \"white\""] = "black";
    } else if (props.staticColor === "black") {
        rules += ' -Ovbhqd-g4hn3s18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["staticColor === \"black\""] = "white";
    }
    if (props.size === "L") {
        if (!width) rules += ' Z86Xkgc18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"L\""] = 64;
    } else if (props.size === "S") {
        if (!width) rules += ' ZxhYlec18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"S\""] = 16;
    } else {
        if (!width) rules += ' Z4dY0ec18';
        currentRules["width"] = 32;
    }
    if (props.size === "L") {
        if (!height) rules += ' F86Xkgc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"L\""] = 64;
    } else if (props.size === "S") {
        if (!height) rules += ' FxhYlec18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"S\""] = 16;
    } else {
        if (!height) rules += ' F4dY0ec18';
        currentRules["height"] = 32;
    }
    rules += ' fa18';
    currentRules["aspectRatio"] = "square";
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:23:16";
    let hash = 5381;
    for(let i = 0; i < targetRules.length; i++)hash = (hash << 5) + hash + targetRules.charCodeAt(i) >>> 0;
    let hashStr = hash.toString(36);
    rules += " -macro-dynamic-" + hashStr;
    if (typeof window !== "undefined") {
        let g = window.__styleMacroDynamic__;
        if (!g) {
            g = window.__styleMacroDynamic__ = {
                map: {},
                _timer: null
            };
            g._timer = setInterval(function() {
                for(let k in g.map)try {
                    if (!document.querySelector("." + CSS.escape(k))) delete g.map[k];
                } catch (e) {}
            }, 300000);
        }
        g.map["-macro-dynamic-" + hashStr] = {
            style: currentRules,
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:23:16"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$track = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.isStaticColor) {
        rules += ' Vd18';
        currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
            "default": currentRules["stroke"]
        };
        currentRules["stroke"]["isStaticColor"] = "transparent-overlay-300";
    } else {
        rules += ' Vf18';
        currentRules["stroke"] = "gray-300";
    }
    rules += ' VlOVIhfcceMNLe18';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "Background";
    rules += ' VlOVIhfcceMNLe18';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "Background";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    if (props.size === "L") {
        rules += ' _VlOVIhfcwtfhvc18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors && size === \"L\""] = "[0.1875rem]";
    } else if (props.size === "S") {
        rules += ' _VlOVIhfcai5a018';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors && size === \"S\""] = "[0.0625rem]";
    } else {
        rules += ' _VlOVIhfc7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors"] = "[0.125rem]";
    }
    if (props.size === "L") {
        rules += ' _VlOVIhfcwtfhvc18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\" && :is([data-hcm], [data-hcm] *)"] = "[0.1875rem]";
    } else if (props.size === "S") {
        rules += ' _VlOVIhfcai5a018';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\" && :is([data-hcm], [data-hcm] *)"] = "[0.0625rem]";
    } else {
        rules += ' _VlOVIhfc7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"][":is([data-hcm], [data-hcm] *)"] = "[0.125rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:36:14";
    let hash = 5381;
    for(let i = 0; i < targetRules.length; i++)hash = (hash << 5) + hash + targetRules.charCodeAt(i) >>> 0;
    let hashStr = hash.toString(36);
    rules += " -macro-dynamic-" + hashStr;
    if (typeof window !== "undefined") {
        let g = window.__styleMacroDynamic__;
        if (!g) {
            g = window.__styleMacroDynamic__ = {
                map: {},
                _timer: null
            };
            g._timer = setInterval(function() {
                for(let k in g.map)try {
                    if (!document.querySelector("." + CSS.escape(k))) delete g.map[k];
                } catch (e) {}
            }, 300000);
        }
        g.map["-macro-dynamic-" + hashStr] = {
            style: currentRules,
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:36:14"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$fill = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.isStaticColor) {
        rules += ' Ve18';
        currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
            "default": currentRules["stroke"]
        };
        currentRules["stroke"]["isStaticColor"] = "transparent-overlay-900";
    } else {
        rules += ' Vh18';
        currentRules["stroke"] = "blue-900";
    }
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "ButtonText";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    rules += ' _Sa18';
    currentRules["rotate"] = -90;
    rules += ' _0d18';
    currentRules["transformOrigin"] = "center";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:57:13";
    let hash = 5381;
    for(let i = 0; i < targetRules.length; i++)hash = (hash << 5) + hash + targetRules.charCodeAt(i) >>> 0;
    let hashStr = hash.toString(36);
    rules += " -macro-dynamic-" + hashStr;
    if (typeof window !== "undefined") {
        let g = window.__styleMacroDynamic__;
        if (!g) {
            g = window.__styleMacroDynamic__ = {
                map: {},
                _timer: null
            };
            g._timer = setInterval(function() {
                for(let k in g.map)try {
                    if (!document.querySelector("." + CSS.escape(k))) delete g.map[k];
                } catch (e) {}
            }, 300000);
        }
        g.map["-macro-dynamic-" + hashStr] = {
            style: currentRules,
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:57:13"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$hcmStroke = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' VRWHrbc18';
    currentRules["stroke"] = "transparent";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "ButtonText";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:73:18";
    let hash = 5381;
    for(let i = 0; i < targetRules.length; i++)hash = (hash << 5) + hash + targetRules.charCodeAt(i) >>> 0;
    let hashStr = hash.toString(36);
    rules += " -macro-dynamic-" + hashStr;
    if (typeof window !== "undefined") {
        let g = window.__styleMacroDynamic__;
        if (!g) {
            g = window.__styleMacroDynamic__ = {
                map: {},
                _timer: null
            };
            g._timer = setInterval(function() {
                for(let k in g.map)try {
                    if (!document.querySelector("." + CSS.escape(k))) delete g.map[k];
                } catch (e) {}
            }, 300000);
        }
        g.map["-macro-dynamic-" + hashStr] = {
            style: currentRules,
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:73:18"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$rotationAnimation = "Z8Un9b";
// stroke-dashoffset represents `100 - percentage`. See below for how this works.
const $c405cf1fa9bf4fd5$var$dashoffsetAnimation = "uw9JJd";
function $c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7(props) {
    let { ref: forwardedRef } = props;
    // oxlint-disable-next-line react/react-compiler
    let [contextProps, ref] = (0, $38evH$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, forwardedRef, $c405cf1fa9bf4fd5$export$afffa1e5edf12209));
    props = contextProps;
    let size = ()=>props.size ?? 'M';
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let strokeWidth = ()=>size() === 'S' ? 2 : size() === 'L' ? 4 : 3;
    // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
    let radius = ()=>`calc(50% - ${$c405cf1fa9bf4fd5$var$pxToRemDynamic(strokeWidth() / 2)})`;
    let isStaticColor = ()=>!!props.staticColor;
    return (0, $38evH$createComponent)((0, $broa7.ProgressBar), (0, $38evH$mergeProps)(props, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $38evH$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        className: (renderProps)=>(props.UNSAFE_className ?? '') + $c405cf1fa9bf4fd5$var$wrapper({
                ...renderProps,
                size: size(),
                staticColor: props.staticColor
            }, props.styles),
        children: (renderProps)=>(()=>{
                var _el$ = (0, $38evH$getNextElement)($c405cf1fa9bf4fd5$var$_tmpl$), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
                (0, $38evH$effect)(()=>({
                        e: radius(),
                        t: (0, $38evH$readShallow)($c405cf1fa9bf4fd5$var$hcmStroke({
                            size: size()
                        })),
                        a: radius(),
                        o: (0, $38evH$readShallow)($c405cf1fa9bf4fd5$var$track({
                            isStaticColor: isStaticColor(),
                            size: size()
                        })),
                        i: radius(),
                        n: (0, $38evH$readShallow)($c405cf1fa9bf4fd5$var$fill({
                            isStaticColor: isStaticColor(),
                            size: size()
                        })),
                        s: renderProps.isIndeterminate ? `${$c405cf1fa9bf4fd5$var$rotationAnimation} 1s cubic-bezier(.6, .1, .3, .9) infinite, ${$c405cf1fa9bf4fd5$var$dashoffsetAnimation} 1s cubic-bezier(.25, .1, .25, 1.3) infinite` : undefined,
                        h: renderProps.isIndeterminate || renderProps.percentage == null ? undefined : 100 - renderProps.percentage
                    }), ({ e: e, t: t, a: a, o: o, i: i, n: n, s: s, h: h }, _p$)=>{
                    e !== _p$?.e && (0, $38evH$setAttribute)(_el$2, "r", e);
                    (0, $38evH$className)(_el$2, t, _p$?.t);
                    a !== _p$?.a && (0, $38evH$setAttribute)(_el$3, "r", a);
                    (0, $38evH$className)(_el$3, o, _p$?.o);
                    i !== _p$?.i && (0, $38evH$setAttribute)(_el$4, "r", i);
                    (0, $38evH$className)(_el$4, n, _p$?.n);
                    s !== _p$?.s && (0, $38evH$setStyleProperty)(_el$4, "animation", s);
                    h !== _p$?.h && (0, $38evH$setAttribute)(_el$4, "stroke-dashoffset", h);
                });
                return _el$;
            })()
    }));
}

});
parcelRegister("8HZqa", function(module, exports) {

$parcel$export(module.exports, "ProgressBar", function () { return (parcelRequire("broa7")).ProgressBar; });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $broa7 = parcelRequire("broa7");


});
parcelRegister("broa7", function(module, exports) {

$parcel$export(module.exports, "ProgressBarContext", function () { return $8544f5739652ef94$export$e9f3bf65a26ce129; });
$parcel$export(module.exports, "ProgressBar", function () { return $8544f5739652ef94$export$c17561cb55d4db30; });


var $1ex1R = parcelRequire("1ex1R");

var $h2cIl = parcelRequire("h2cIl");

var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $eIZqF = parcelRequire("eIZqF");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

const $8544f5739652ef94$export$e9f3bf65a26ce129 = (0, $38evH$createContext)(null);
function $8544f5739652ef94$export$c17561cb55d4db30(props) {
    let ref = props.ref;
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $8544f5739652ef94$export$e9f3bf65a26ce129);
    const minValue = ()=>props.minValue ?? 0;
    const maxValue = ()=>props.maxValue ?? 100;
    const value = ()=>(0, $h2cIl.clamp)(props.value ?? 0, minValue(), maxValue());
    const isIndeterminate = ()=>props.isIndeterminate ?? false;
    let [labelRef, label] = (0, $2A4az.useSlot)(!props['aria-label'] && !props['aria-labelledby']);
    let { progressBarProps: progressBarProps, labelProps: labelProps } = (0, $1ex1R.useProgressBar)((0, $38evH$merge)(props, {
        get label () {
            return label();
        }
    }));
    let range = ()=>maxValue() - minValue();
    // Calculate the width of the progress bar as a percentage
    let percentage = ()=>isIndeterminate() ? undefined : range() === 0 ? 0 : (value() - minValue()) / range() * 100;
    let renderProps = (0, $2A4az.useRenderProps)((0, $38evH$merge)(props, {
        defaultClassName: 'react-aria-ProgressBar',
        values: {
            get percentage () {
                return percentage();
            },
            get valueText () {
                return progressBarProps['aria-valuetext'];
            },
            get isIndeterminate () {
                return isIndeterminate();
            }
        }
    }));
    let DOMProps = (0, $5gAIA.filterDOMProps)(props, {
        global: true
    });
    let hostProps = (0, $7boJ2.mergeProps)(DOMProps, renderProps, progressBarProps);
    let labelContext = (0, $38evH$merge)(labelProps, {
        ref: labelRef,
        elementType: 'span'
    });
    return (0, $38evH$createComponent)((0, $2A4az.dom).div, (0, $38evH$mergeProps)(hostProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $38evH$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        },
        get children () {
            return (0, $38evH$createComponent)((0, $eIZqF.LabelContext), {
                value: labelContext,
                get children () {
                    return renderProps.children;
                }
            });
        }
    }));
}

});
parcelRegister("1ex1R", function(module, exports) {

$parcel$export(module.exports, "useProgressBar", function () { return $0e60b81bd883b833$export$ed5abd763a836edc; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $h2cIl = parcelRequire("h2cIl");

var $5gAIA = parcelRequire("5gAIA");

var $7boJ2 = parcelRequire("7boJ2");

var $bqsTN = parcelRequire("bqsTN");

var $eTmjo = parcelRequire("eTmjo");

function $0e60b81bd883b833$export$ed5abd763a836edc(props) {
    const minValue = ()=>props.minValue ?? 0;
    const maxValue = ()=>props.maxValue ?? 100;
    const formatOptions = ()=>props.formatOptions ?? {
            style: 'percent'
        };
    let domProps = (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    });
    let { labelProps: labelProps, fieldProps: fieldProps } = (0, $bqsTN.useLabel)((0, $38evH$merge)(props, {
        // Progress bar is not an HTML input element so it
        // shouldn't be labeled by a <label> element.
        labelElementType: 'span'
    }));
    let value = ()=>(0, $h2cIl.clamp)(props.value ?? 0, minValue(), maxValue());
    let range = ()=>maxValue() - minValue();
    let percentage = ()=>range() === 0 ? 0 : (value() - minValue()) / range();
    let formatter = (0, $eTmjo.useNumberFormatter)(formatOptions);
    let valueLabel = ()=>props.valueLabel || formatter().format(formatOptions().style === 'percent' ? percentage() : value());
    return {
        progressBarProps: (0, $7boJ2.mergeProps)(domProps, {
            get id () {
                return fieldProps.id;
            },
            get 'aria-label' () {
                return fieldProps['aria-label'];
            },
            get 'aria-labelledby' () {
                return fieldProps['aria-labelledby'];
            },
            get 'aria-valuenow' () {
                return props.isIndeterminate ? undefined : value();
            },
            get 'aria-valuemin' () {
                return minValue();
            },
            get 'aria-valuemax' () {
                return maxValue();
            },
            get 'aria-valuetext' () {
                return props.isIndeterminate ? undefined : valueLabel();
            },
            role: 'progressbar'
        }),
        labelProps: labelProps
    };
}

});
parcelRegister("h2cIl", function(module, exports) {

$parcel$export(module.exports, "clamp", function () { return $c66c7c584a75e6dd$export$7d15b64cf5a3a4c4; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest
 * valid step.
 */ function $c66c7c584a75e6dd$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
    let newValue = Math.min(Math.max(value, min), max);
    return newValue;
}
function $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(value, step) {
    let roundedValue = value;
    let precision = 0;
    let stepString = step.toString();
    // Handle negative exponents in exponential notation (e.g., "1e-7" → precision 8)
    let eIndex = stepString.toLowerCase().indexOf('e-');
    if (eIndex > 0) precision = Math.abs(Math.floor(Math.log10(Math.abs(step)))) + eIndex;
    else {
        let pointIndex = stepString.indexOf('.');
        if (pointIndex >= 0) precision = stepString.length - pointIndex;
    }
    if (precision > 0) {
        let pow = Math.pow(10, precision);
        roundedValue = Math.round(roundedValue * pow) / pow;
    }
    return roundedValue;
}
function $c66c7c584a75e6dd$export$cb6e0bb50bc19463(value, min, max, step) {
    min = Number(min);
    max = Number(max);
    let remainder = (value - (isNaN(min) ? 0 : min)) % step;
    let snappedValue = $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
    if (!isNaN(min)) {
        if (snappedValue < min) snappedValue = min;
        else if (!isNaN(max) && snappedValue > max) snappedValue = min + Math.floor($c66c7c584a75e6dd$export$e1a7b8e69ef6c52f((max - min) / step, step)) * step;
    } else if (!isNaN(max) && snappedValue > max) snappedValue = Math.floor($c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(max / step, step)) * step;
    // correct floating point behavior by rounding to step precision
    snappedValue = $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(snappedValue, step);
    return snappedValue;
}
function $c66c7c584a75e6dd$export$b6268554fba451f(value, digits, base = 10) {
    const pow = Math.pow(base, digits);
    return Math.round(value * pow) / pow;
}

});

parcelRegister("5gAIA", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return $3d5aedd7cf5e55dc$export$457c3d6518dd4c6f; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $3d5aedd7cf5e55dc$var$DOMPropNames = new Set([
    'id'
]);
const $3d5aedd7cf5e55dc$var$labelablePropNames = new Set([
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-details'
]);
// See LinkDOMProps in dom.d.ts.
const $3d5aedd7cf5e55dc$var$linkPropNames = new Set([
    'href',
    'hrefLang',
    'target',
    'rel',
    'download',
    'ping',
    'referrerPolicy'
]);
const $3d5aedd7cf5e55dc$var$globalAttrs = new Set([
    'dir',
    'lang',
    'hidden',
    'inert',
    'translate',
    'suppressHydrationWarning'
]);
const $3d5aedd7cf5e55dc$var$globalEvents = new Set([
    'onClick',
    'onAuxClick',
    'onContextMenu',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onScroll',
    'onWheel',
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
    'onTransitionCancel',
    'onTransitionEnd',
    'onTransitionRun',
    'onTransitionStart'
]);
const $3d5aedd7cf5e55dc$var$propRe = /^(data-.*)$/;
function $3d5aedd7cf5e55dc$export$457c3d6518dd4c6f(props, opts = {}) {
    let { labelable: labelable, isLink: isLink, global: global, events: events = global, propNames: propNames } = opts;
    const allowed = (prop)=>typeof prop === 'string' && ($3d5aedd7cf5e55dc$var$DOMPropNames.has(prop) || labelable && $3d5aedd7cf5e55dc$var$labelablePropNames.has(prop) || isLink && $3d5aedd7cf5e55dc$var$linkPropNames.has(prop) || global && $3d5aedd7cf5e55dc$var$globalAttrs.has(prop) || events && ($3d5aedd7cf5e55dc$var$globalEvents.has(prop) || prop.endsWith('Capture') && $3d5aedd7cf5e55dc$var$globalEvents.has(prop.slice(0, -7))) || propNames?.has(prop) || $3d5aedd7cf5e55dc$var$propRe.test(prop));
    const present = (prop)=>allowed(prop) && Object.getOwnPropertyDescriptor(props, prop)?.enumerable === true;
    // Native props may have reactive key membership (e.g. merge/omit views).
    // Build the filter once, but enumerate/read its source only when a consumer
    // does so in its own tracking scope. Omission and present-undefined differ.
    return new Proxy({}, {
        get (_target, prop) {
            return present(prop) ? props[prop] : undefined;
        },
        has (_target, prop) {
            return present(prop);
        },
        ownKeys () {
            return Reflect.ownKeys(props).filter(present);
        },
        getOwnPropertyDescriptor (_target, prop) {
            if (!present(prop)) return undefined;
            return {
                enumerable: true,
                configurable: true,
                get: ()=>props[prop]
            };
        }
    });
}

});

parcelRegister("7boJ2", function(module, exports) {

$parcel$export(module.exports, "mergeProps", function () { return $53acbd7400b441e9$export$9d1611c77c2fe928; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $fZRjG = parcelRequire("fZRjG");


var $dyxC2 = parcelRequire("dyxC2");

var $hp4AJ = parcelRequire("hp4AJ");

function $53acbd7400b441e9$export$9d1611c77c2fe928(...args) {
    // Preserve source merge rules per property, without evaluating lazy children or
    // freezing reactive props while the component is being set up.
    return new Proxy({}, {
        ownKeys: ()=>[
                ...new Set(args.flatMap((props)=>props ? Reflect.ownKeys(props) : []))
            ],
        // This is an Adobe merge view, not one of Solid's own flattenable views.
        // Forwarding a source's $PROXY marker also forwards its internal view record,
        // causing native merge to flatten that one source and discard our merge rules.
        has: (_, key)=>key !== (0, $38evH$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $38evH$$PROXY) ? undefined : mergeProperty(key)
    });
    function mergeProperty(key) {
        // Start with a base clone of the first argument. This is a lot faster than starting
        // with an empty object and adding properties as we go.
        let result = {
            [key]: args[0]?.[key]
        };
        for(let i = 1; i < args.length; i++){
            let props = args[i];
            if (props && key in props) {
                let a = result[key];
                let b = props[key];
                // Chain events
                if (typeof a === 'function' && typeof b === 'function' && // This is a lot faster than a regex.
                typeof key === 'string' && key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) >= /* 'A' */ 65 && key.charCodeAt(2) <= /* 'Z' */ 90) result[key] = (0, $fZRjG.chain)(a, b);
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $38evH$clsx)(a, b);
                else if (key === 'id' && a && b) result.id = (0, $dyxC2.mergeIds)(a, b);
                else if (key === 'ref' && a && b) result.ref = (0, $hp4AJ.mergeRefs)(a, b);
                else result[key] = b !== undefined ? b : a;
            }
        }
        return result[key];
    }
}

});
parcelRegister("fZRjG", function(module, exports) {

$parcel$export(module.exports, "chain", function () { return $ba55e90e7f40fcb4$export$e08e3b67e392101e; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Calls all functions in the order they were chained with the same arguments.
 */ function $ba55e90e7f40fcb4$export$e08e3b67e392101e(...callbacks) {
    return (...args)=>{
        for (let callback of callbacks)if (typeof callback === 'function') callback(...args);
    };
}

});

parcelRegister("dyxC2", function(module, exports) {

$parcel$export(module.exports, "useId", function () { return $9de886171f524ac8$export$f680877a34711e37; });
$parcel$export(module.exports, "mergeIds", function () { return $9de886171f524ac8$export$cd8c9cb68f842629; });
$parcel$export(module.exports, "useSlotId", function () { return $9de886171f524ac8$export$b4cc09c592e8fdb8; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

// Preserve the modern source branch's client-only collision prefix. SSR/hydration
// and tests use the deterministic prefix; native createUniqueId supplies root ownership.
const $9de886171f524ac8$var$clientPrefix = String(Math.round(Math.random() * 10000000000));
// copied from SSRProvider.tsx to reduce exports, if needed again, consider sharing
let $9de886171f524ac8$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $9de886171f524ac8$export$d41a04c74483c6ef = new Map();
// This allows us to clean up the idsUpdaterMap when the id is no longer used.
// Map is a strong reference, so unused ids wouldn't be cleaned up otherwise.
// This can happen in suspended components where mount/unmount is not called.
let $9de886171f524ac8$var$registry;
if (typeof FinalizationRegistry !== 'undefined') $9de886171f524ac8$var$registry = new FinalizationRegistry((heldValue)=>{
    $9de886171f524ac8$export$d41a04c74483c6ef.delete(heldValue);
});
let $9de886171f524ac8$var$registeredIds = new WeakMap();
function $9de886171f524ac8$export$f680877a34711e37(defaultId) {
    const prefix = (0, $38evH$isServer) || (0, $38evH$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $38evH$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $38evH$createSignal)(undefined, {
        ownedWrite: true
    });
    const res = ()=>value() || (typeof defaultId === 'function' ? defaultId() : defaultId) || generated;
    const cleanupRef = {};
    let pending = null;
    const nextId = {
        get current () {
            return pending;
        },
        set current (id){
            pending = id;
            if (id) setValue(id);
        }
    };
    let registered;
    function unregister() {
        if (!registered) return;
        $9de886171f524ac8$var$registry?.unregister(cleanupRef);
        $9de886171f524ac8$var$registeredIds.delete(cleanupRef);
        const refs = $9de886171f524ac8$export$d41a04c74483c6ef.get(registered)?.filter((ref)=>ref !== nextId);
        if (refs?.length) $9de886171f524ac8$export$d41a04c74483c6ef.set(registered, refs);
        else $9de886171f524ac8$export$d41a04c74483c6ef.delete(registered);
        registered = undefined;
    }
    function register(id1) {
        if (id1 === registered) return;
        unregister();
        registered = id1;
        if ($9de886171f524ac8$var$registry) {
            $9de886171f524ac8$var$registry.register(cleanupRef, id1, cleanupRef);
            $9de886171f524ac8$var$registeredIds.set(cleanupRef, id1);
        }
        if ($9de886171f524ac8$var$canUseDOM) $9de886171f524ac8$export$d41a04c74483c6ef.set(id1, [
            ...$9de886171f524ac8$export$d41a04c74483c6ef.get(id1) || [],
            nextId
        ]);
    }
    // Initial registration must precede mergeProps in the same setup turn.
    register((0, $38evH$untrack)(res));
    (0, $38evH$createEffect)(res, register);
    (0, $38evH$onCleanup)(unregister);
    return res;
}
function $9de886171f524ac8$export$cd8c9cb68f842629(idA, idB) {
    if (idA === idB) return idA;
    let setIdsA = $9de886171f524ac8$export$d41a04c74483c6ef.get(idA);
    if (setIdsA) {
        setIdsA.forEach((ref)=>ref.current = idB);
        return idB;
    }
    let setIdsB = $9de886171f524ac8$export$d41a04c74483c6ef.get(idB);
    if (setIdsB) {
        setIdsB.forEach((ref)=>ref.current = idA);
        return idA;
    }
    return idB;
}
function $9de886171f524ac8$export$b4cc09c592e8fdb8(depArray = []) {
    let id1 = $9de886171f524ac8$export$f680877a34711e37();
    let [resolvedId, setResolvedId] = (0, $38evH$createSignal)((0, $38evH$untrack)(id1));
    let [publication, setPublication] = (0, $38evH$createSignal)(0);
    (0, $38evH$onSettled)(()=>{
        const currentId = (0, $38evH$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $38evH$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $38evH$createEffect)(()=>{
        publication();
        return id1();
    }, (currentId)=>{
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    return resolvedId;
}

});

parcelRegister("hp4AJ", function(module, exports) {

$parcel$export(module.exports, "mergeRefs", function () { return $cab85537f21dacdb$export$c9058316764c140e; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Merges multiple refs into one. Works with either callback or object refs.
 */ function $cab85537f21dacdb$export$c9058316764c140e(...refs) {
    if (refs.length === 1 && typeof refs[0] === 'function') return refs[0];
    return (value)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = $cab85537f21dacdb$var$setRef(ref, value);
            hasCleanup ||= typeof cleanup == 'function';
            return cleanup;
        });
        if (hasCleanup) return ()=>{
            cleanups.forEach((cleanup, i)=>{
                if (typeof cleanup === 'function') cleanup();
                else $cab85537f21dacdb$var$setRef(refs[i], null);
            });
        };
    };
}
function $cab85537f21dacdb$var$setRef(ref, value) {
    if (Array.isArray(ref)) return $cab85537f21dacdb$export$c9058316764c140e(...ref)(value);
    if (typeof ref === 'function') return ref(value);
    else if (ref != null && typeof ref === 'object' && 'current' in ref) ref.current = value;
}

});


parcelRegister("bqsTN", function(module, exports) {

$parcel$export(module.exports, "useLabel", function () { return $85188a27f2b2691e$export$8467354a121f1b9f; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $dyxC2 = parcelRequire("dyxC2");

var $62s3i = parcelRequire("62s3i");

function $85188a27f2b2691e$export$8467354a121f1b9f(props) {
    let id = (0, $dyxC2.useId)(()=>props.id);
    let labelId = (0, $dyxC2.useId)();
    let labelProps = {
        get id () {
            return props.label ? labelId() : undefined;
        },
        get htmlFor () {
            return props.label && (props.labelElementType ?? 'label') === 'label' ? id() : undefined;
        }
    };
    (0, $38evH$createEffect)(()=>!props.label && !props['aria-labelledby'] && !props['aria-label'], (missing)=>{});
    let fieldProps = (0, $62s3i.useLabels)({
        get id () {
            return id();
        },
        get 'aria-label' () {
            return props['aria-label'];
        },
        get 'aria-labelledby' () {
            let labelledBy = props['aria-labelledby'];
            return props.label ? labelledBy ? `${labelId()} ${labelledBy}` : labelId() : labelledBy;
        }
    });
    return {
        labelProps: labelProps,
        fieldProps: fieldProps
    };
}

});
parcelRegister("62s3i", function(module, exports) {

$parcel$export(module.exports, "useLabels", function () { return $4658b08851968062$export$d6875122194c7b44; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $dyxC2 = parcelRequire("dyxC2");
function $4658b08851968062$export$d6875122194c7b44(props, defaultLabel) {
    const id = (0, $dyxC2.useId)(()=>props.id);
    return {
        get id () {
            return id();
        },
        get 'aria-label' () {
            return !props['aria-label'] && !props['aria-labelledby'] && defaultLabel ? defaultLabel : props['aria-label'];
        },
        get 'aria-labelledby' () {
            let labelledBy = props['aria-labelledby'];
            if (labelledBy && props['aria-label']) return [
                ...new Set([
                    id(),
                    ...labelledBy.trim().split(/\s+/)
                ])
            ].join(' ');
            return labelledBy ? labelledBy.trim().split(/\s+/).join(' ') : labelledBy;
        }
    };
}

});


parcelRegister("eTmjo", function(module, exports) {

$parcel$export(module.exports, "useNumberFormatter", function () { return $ad778265343530ec$export$b7a616150fdb9f44; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $81zYK = parcelRequire("81zYK");

var $dnlDG = parcelRequire("dnlDG");

function $ad778265343530ec$export$b7a616150fdb9f44(options = {}) {
    let locale = (0, $dnlDG.useLocale)();
    return (0, $38evH$createMemo)(()=>new (0, $81zYK.NumberFormatter)(locale.locale, typeof options === 'function' ? options() : options));
}

});
parcelRegister("81zYK", function(module, exports) {

$parcel$export(module.exports, "NumberFormatter", function () { return $5d7a535e5a5ee7e3$export$cc77c4ff7e8673c5; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ let $5d7a535e5a5ee7e3$var$formatterCache = new Map();
let $5d7a535e5a5ee7e3$var$supportsSignDisplay = false;
try {
    $5d7a535e5a5ee7e3$var$supportsSignDisplay = new Intl.NumberFormat('de-DE', {
        signDisplay: 'exceptZero'
    }).resolvedOptions().signDisplay === 'exceptZero';
// eslint-disable-next-line no-empty
} catch  {}
class $5d7a535e5a5ee7e3$export$cc77c4ff7e8673c5 {
    numberFormatter;
    options;
    constructor(locale, options = {}){
        this.numberFormatter = $5d7a535e5a5ee7e3$var$getCachedNumberFormatter(locale, options);
        this.options = options;
    }
    /**
     * Formats a number value as a string, according to the locale and options provided to the
     * constructor.
     */ format(value) {
        let res = '';
        if (!$5d7a535e5a5ee7e3$var$supportsSignDisplay && this.options.signDisplay != null) res = $5d7a535e5a5ee7e3$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
        else res = this.numberFormatter.format(value);
        return res;
    }
    /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
        // TODO: implement signDisplay for formatToParts
        return this.numberFormatter.formatToParts(value);
    }
    /** Formats a number range as a string. */ formatRange(start, end) {
        if (typeof this.numberFormatter.formatRange === 'function') return this.numberFormatter.formatRange(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        // Very basic fallback for old browsers.
        return `${this.format(start)} \u{2013} ${this.format(end)}`;
    }
    /** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
        if (typeof this.numberFormatter.formatRangeToParts === 'function') return this.numberFormatter.formatRangeToParts(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        let startParts = this.numberFormatter.formatToParts(start);
        let endParts = this.numberFormatter.formatToParts(end);
        return [
            ...startParts.map((p)=>({
                    ...p,
                    source: 'startRange'
                })),
            {
                type: 'literal',
                value: " \u2013 ",
                source: 'shared'
            },
            ...endParts.map((p)=>({
                    ...p,
                    source: 'endRange'
                }))
        ];
    }
    /** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
        let options = this.numberFormatter.resolvedOptions();
        if (!$5d7a535e5a5ee7e3$var$supportsSignDisplay && this.options.signDisplay != null) options = {
            ...options,
            signDisplay: this.options.signDisplay
        };
        return options;
    }
}
function $5d7a535e5a5ee7e3$var$getCachedNumberFormatter(locale, options = {}) {
    let { numberingSystem: numberingSystem } = options;
    if (numberingSystem && locale.includes('-nu-')) {
        if (!locale.includes('-u-')) locale += '-u-';
        locale += `-nu-${numberingSystem}`;
    }
    let cacheKey = locale + (options ? Object.entries(options).sort((a, b)=>a[0] < b[0] ? -1 : 1).join() : '');
    if ($5d7a535e5a5ee7e3$var$formatterCache.has(cacheKey)) return $5d7a535e5a5ee7e3$var$formatterCache.get(cacheKey);
    let numberFormatter = new Intl.NumberFormat(locale, options);
    $5d7a535e5a5ee7e3$var$formatterCache.set(cacheKey, numberFormatter);
    return numberFormatter;
}
function $5d7a535e5a5ee7e3$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
    if (signDisplay === 'auto') return numberFormat.format(num);
    else if (signDisplay === 'never') return numberFormat.format(Math.abs(num));
    else {
        let needsPositiveSign = false;
        if (signDisplay === 'always') needsPositiveSign = num > 0 || Object.is(num, 0);
        else if (signDisplay === 'exceptZero') {
            if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
            else needsPositiveSign = num > 0;
        }
        if (needsPositiveSign) {
            let negative = numberFormat.format(-num);
            let noSign = numberFormat.format(num);
            // ignore RTL/LTR marker character
            let minus = negative.replace(noSign, '').replace(/\u200e|\u061C/, '');
            if ([
                ...minus
            ].length !== 1) console.warn('@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case');
            let positive = negative.replace(noSign, '!!!').replace(minus, '+').replace('!!!', noSign);
            return positive;
        } else return numberFormat.format(num);
    }
}

});

parcelRegister("dnlDG", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return $9bce356509de5990$export$a54013f0d02a8f82; });
$parcel$export(module.exports, "useLocale", function () { return $9bce356509de5990$export$43bb16f9c6d9e3f7; });


var $fWxcB = parcelRequire("fWxcB");


var $kIyoO = parcelRequire("kIyoO");
const $9bce356509de5990$var$I18nContext = (0, $38evH$createContext)(null);
/**
 * Internal component that handles the case when locale is provided.
 */ function $9bce356509de5990$var$I18nProviderWithLocale(props) {
    let value = {
        get locale () {
            return props.locale;
        },
        get direction () {
            return (0, $fWxcB.isRTL)(props.locale) ? 'rtl' : 'ltr';
        }
    };
    return (0, $38evH$createComponent)($9bce356509de5990$var$I18nContext, {
        value: value,
        get children () {
            return props.children;
        }
    });
}
/**
 * Internal component that handles the case when no locale is provided.
 */ function $9bce356509de5990$var$I18nProviderWithDefaultLocale(props) {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    return (0, $38evH$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $38evH$memo)(()=>(0, $38evH$memo)(()=>!!props.locale)() ? (0, $38evH$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $38evH$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $38evH$useContext)($9bce356509de5990$var$I18nContext);
    return context || defaultLocale;
}

});
parcelRegister("fWxcB", function(module, exports) {

$parcel$export(module.exports, "isRTL", function () { return $b9b60714bf7cb967$export$702d680b21cbd764; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // https://en.wikipedia.org/wiki/Right-to-left
const $b9b60714bf7cb967$var$RTL_SCRIPTS = new Set([
    'Arab',
    'Syrc',
    'Samr',
    'Mand',
    'Thaa',
    'Mend',
    'Nkoo',
    'Adlm',
    'Rohg',
    'Hebr'
]);
const $b9b60714bf7cb967$var$RTL_LANGS = new Set([
    'ae',
    'ar',
    'arc',
    'bcc',
    'bqi',
    'ckb',
    'dv',
    'fa',
    'glk',
    'he',
    'ku',
    'mzn',
    'nqo',
    'pnb',
    'ps',
    'sd',
    'ug',
    'ur',
    'yi'
]);
function $b9b60714bf7cb967$export$702d680b21cbd764(localeString) {
    // If the Intl.Locale API is available, use it to get the locale's text direction.
    if (Intl.Locale) {
        let locale = new Intl.Locale(localeString).maximize();
        // Use the text info object to get the direction if possible.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo
        let textInfo = // @ts-ignore - this was implemented as a property by some browsers before it was standardized as a function.
        typeof locale.getTextInfo === 'function' ? locale.getTextInfo() : locale.textInfo;
        if (textInfo) return textInfo.direction === 'rtl';
        // Fallback: guess using the script.
        // This is more accurate than guessing by language, since languages can be written in multiple scripts.
        if (locale.script) return $b9b60714bf7cb967$var$RTL_SCRIPTS.has(locale.script);
    }
    // If not, just guess by the language (first part of the locale)
    let lang = localeString.split('-')[0];
    return $b9b60714bf7cb967$var$RTL_LANGS.has(lang);
}

});

parcelRegister("kIyoO", function(module, exports) {

$parcel$export(module.exports, "useDefaultLocale", function () { return $f15299abd09b0542$export$188ec29ebc2bdc3a; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $fWxcB = parcelRequire("fWxcB");


// Locale passed from server by PackageLocalizationProvider.
const $f15299abd09b0542$var$localeSymbol = Symbol.for('react-aria.i18n.locale');
function $f15299abd09b0542$export$f09106e7c6677ec5() {
    let locale = typeof window !== 'undefined' && window[$f15299abd09b0542$var$localeSymbol] || // @ts-ignore
    typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage) || 'en-US';
    try {
        Intl.DateTimeFormat.supportedLocalesOf([
            locale
        ]);
    } catch  {
        locale = 'en-US';
    }
    return {
        locale: locale,
        direction: (0, $fWxcB.isRTL)(locale) ? 'rtl' : 'ltr'
    };
}
let $f15299abd09b0542$var$currentLocale = $f15299abd09b0542$export$f09106e7c6677ec5();
let $f15299abd09b0542$var$listeners = new Set();
function $f15299abd09b0542$var$updateLocale() {
    $f15299abd09b0542$var$currentLocale = $f15299abd09b0542$export$f09106e7c6677ec5();
    for (let listener of $f15299abd09b0542$var$listeners)listener($f15299abd09b0542$var$currentLocale);
}
function $f15299abd09b0542$export$188ec29ebc2bdc3a() {
    let [isSSR, setSSR] = (0, $38evH$createSignal)((0, $38evH$isServer) || (0, $38evH$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $38evH$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $38evH$onSettled)(()=>{
        setSSR(false);
        if ($f15299abd09b0542$var$listeners.size === 0) window.addEventListener('languagechange', $f15299abd09b0542$var$updateLocale);
        $f15299abd09b0542$var$listeners.add(setDefaultLocale);
        return ()=>{
            $f15299abd09b0542$var$listeners.delete(setDefaultLocale);
            if ($f15299abd09b0542$var$listeners.size === 0) window.removeEventListener('languagechange', $f15299abd09b0542$var$updateLocale);
        };
    });
    // We cannot determine the browser's language on the server, so default to
    // en-US. This will be updated after hydration on the client to the correct value.
    return {
        get locale () {
            return isSSR() ? typeof window !== 'undefined' && window[$f15299abd09b0542$var$localeSymbol] || 'en-US' : defaultLocale().locale;
        },
        get direction () {
            return isSSR() ? 'ltr' : defaultLocale().direction;
        }
    };
}

});




parcelRegister("2A4az", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_SLOT", function () { return $1e122d8834d59736$export$c62b8e45d58ddad9; });
$parcel$export(module.exports, "Provider", function () { return $1e122d8834d59736$export$2881499e37b75b9a; });
$parcel$export(module.exports, "useRenderProps", function () { return $1e122d8834d59736$export$4d86445c2cf5e3; });
$parcel$export(module.exports, "composeRenderProps", function () { return $1e122d8834d59736$export$c245e6201fed2f75; });
$parcel$export(module.exports, "useSlottedContext", function () { return $1e122d8834d59736$export$fabf2dc03a41866e; });
$parcel$export(module.exports, "useContextProps", function () { return $1e122d8834d59736$export$29f1550f4b0d4415; });
$parcel$export(module.exports, "useSlot", function () { return $1e122d8834d59736$export$9d4c57ee4c6ffdd8; });
$parcel$export(module.exports, "dom", function () { return $1e122d8834d59736$export$df3a06d6289f983e; });

parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $hp4AJ = parcelRequire("hp4AJ");


var $6p9dH = parcelRequire("6p9dH");
const $1e122d8834d59736$export$c62b8e45d58ddad9 = Symbol('default');
function $1e122d8834d59736$export$2881499e37b75b9a(props) {
    function nest(index) {
        if (index < 0) return props.children;
        let [Context, value] = props.values[index];
        // Each tuple associates its own Context<T> and T; indexing a heterogeneous
        // tuple union loses that association in TypeScript (also present upstream).
        // @ts-expect-error correlated provider/value tuple
        return (0, $38evH$createComponent)(Context, {
            value: value,
            get children () {
                return nest(index - 1);
            }
        });
    }
    return nest(props.values.length - 1);
}
function $1e122d8834d59736$export$4d86445c2cf5e3(props) {
    return {
        get className () {
            let value = props.className;
            return (typeof value === 'function' ? value({
                ...props.values,
                defaultClassName: props.defaultClassName
            }) : value) ?? props.defaultClassName;
        },
        get style () {
            let value = props.style;
            let computed = typeof value === 'function' ? value({
                ...props.values,
                defaultStyle: props.defaultStyle || {}
            }) : value;
            return computed || props.defaultStyle ? {
                ...props.defaultStyle,
                ...computed
            } : undefined;
        },
        get children () {
            // Resolve content here, under the consuming provider/row owner, never in an outer memo.
            let value = props.children;
            return (typeof value === 'function' ? value((0, $38evH$merge)(props.values, {
                get defaultChildren () {
                    return props.defaultChildren;
                }
            })) : value) ?? props.defaultChildren;
        },
        'data-rac': '',
        get render () {
            return props.render ? (domProps)=>props.render(domProps, props.values) : undefined;
        }
    };
}
function $1e122d8834d59736$export$c245e6201fed2f75(// https://stackoverflow.com/questions/60898079/typescript-type-t-or-function-t-usage
value, wrap) {
    return (renderProps)=>wrap(typeof value === 'function' ? value(renderProps) : value, renderProps);
}
function $1e122d8834d59736$export$fabf2dc03a41866e(context, slot) {
    let ctx = (0, $38evH$useContext)(context);
    return $1e122d8834d59736$var$selectSlot(ctx, slot);
}
function $1e122d8834d59736$var$selectSlot(ctx, slot) {
    if (slot === null) // An explicit `null` slot means don't use context.
    return null;
    if (ctx && typeof ctx === 'object' && 'slots' in ctx && ctx.slots) {
        let slotKey = slot || $1e122d8834d59736$export$c62b8e45d58ddad9;
        if (!ctx.slots[slotKey]) {
            let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p)=>`"${p}"`));
            let errorMessage = slot ? `Invalid slot "${slot}".` : 'A slot prop is required.';
            throw new Error(`${errorMessage} Valid slot names are ${availableSlots}.`);
        }
        return ctx.slots[slotKey];
    }
    // @ts-ignore
    return ctx;
}
function $1e122d8834d59736$export$29f1550f4b0d4415(props, ref, context) {
    let ctx = $1e122d8834d59736$export$fabf2dc03a41866e(context, props.slot) || {};
    let contextProps = (0, $38evH$omit)(ctx, 'ref');
    let mergedRef = (0, $hp4AJ.mergeRefs)(ref, ctx.ref);
    let mergedProps = (0, $7boJ2.mergeProps)(contextProps, props);
    let styleOverride = {};
    if ('style' in contextProps && contextProps.style && 'style' in props && props.style) {
        if (typeof contextProps.style === 'function' || typeof props.style === 'function') styleOverride.style = (renderProps)=>{
            let contextStyle = typeof contextProps.style === 'function' ? contextProps.style(renderProps) : contextProps.style;
            let defaultStyle = {
                ...renderProps.defaultStyle,
                ...contextStyle
            };
            let style = typeof props.style === 'function' ? props.style({
                ...renderProps,
                defaultStyle: defaultStyle
            }) : props.style;
            return {
                ...defaultStyle,
                ...style
            };
        };
        else Object.defineProperty(styleOverride, 'style', {
            enumerable: true,
            get: ()=>({
                    ...contextProps.style,
                    ...props.style
                })
        });
    }
    let finalProps = (0, $38evH$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $38evH$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $38evH$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $38evH$omit)(props, (key)=>key === (0, $38evH$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
}
function $1e122d8834d59736$var$DOMElement(ElementType, props, forwardedRef) {
    let deliveredRef;
    let ref = (0, $6p9dH.useObjectRef)((node)=>{
        // Native attachment is synchronous: source slot refs must run before onSettled.
        // A's attachment bridge owns this callback's cleanup and isolates its reads.
        deliveredRef = props.ref;
        return (0, $6p9dH.attachRef)([
            forwardedRef,
            deliveredRef
        ], node);
    });
    (0, $38evH$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $38evH$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $38evH$createEffect)(()=>({
            node: ref.current,
            captures: Object.keys(props).filter((key)=>/^on[A-Z].*Capture$/.test(key)).map((key)=>[
                    key,
                    props[key]
                ])
        }), ({ node: node, captures: captures })=>{
        if (!node) return;
        let cleanups = captures.map(([key, handler])=>{
            if (!handler) return ()=>{};
            let eventName = key.slice(2, -7).toLowerCase();
            const listener = (event)=>{
                if (Array.isArray(handler)) handler[0](handler[1], event);
                else handler(event);
            };
            node.addEventListener(eventName, listener, true);
            return ()=>node.removeEventListener(eventName, listener, true);
        });
        return ()=>{
            for (let cleanup of cleanups)cleanup();
        };
    });
    (0, $38evH$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $38evH$untrack)(()=>ref.current);
    });
    let domProps = (0, $38evH$merge)((0, $38evH$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $38evH$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $38evH$createComponent)(Host, domProps);
}
const $1e122d8834d59736$var$domComponentCache = {};
const $1e122d8834d59736$export$df3a06d6289f983e = new Proxy({}, {
    get (target, elementType) {
        if (typeof elementType !== 'string') return undefined;
        let res = $1e122d8834d59736$var$domComponentCache[elementType];
        if (!res) {
            res = (props)=>$1e122d8834d59736$var$DOMElement(elementType, props, undefined);
            $1e122d8834d59736$var$domComponentCache[elementType] = res;
        }
        return res;
    }
});

});
parcelRegister("2iotZ", function(module, exports) {

$parcel$export(module.exports, "mergeProps", function () { return (parcelRequire("7boJ2")).mergeProps; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $7boJ2 = parcelRequire("7boJ2");

});

parcelRegister("6p9dH", function(module, exports) {

$parcel$export(module.exports, "attachRef", function () { return $4a9c3aca7d29f30f$export$ffee5bd706a2135a; });
$parcel$export(module.exports, "useObjectRef", function () { return $4a9c3aca7d29f30f$export$4338b53315abf666; });
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
function $4a9c3aca7d29f30f$export$ffee5bd706a2135a(ref, instance) {
    if (Array.isArray(ref)) {
        let cleanups = ref.map((item)=>$4a9c3aca7d29f30f$export$ffee5bd706a2135a(item, instance));
        return ()=>{
            for (let cleanup of cleanups)cleanup();
        };
    }
    if (typeof ref === 'function') {
        let cleanup = (0, $38evH$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $38evH$untrack)(()=>ref(null));
        };
    }
    if (ref) {
        let cell = ref;
        cell.current = instance;
        return ()=>{
            if (cell.current === instance) cell.current = null;
        };
    }
    return ()=>{};
}
function $4a9c3aca7d29f30f$export$4338b53315abf666(ref) {
    let current = null;
    let [revision, setRevision] = (0, $38evH$createSignal)(0);
    let cleanups = [];
    function deliver(ref, instance) {
        cleanups.push($4a9c3aca7d29f30f$export$ffee5bd706a2135a(ref, instance));
    }
    let attach = (instance)=>{
        if (instance === current) return;
        for (let cleanup of cleanups)cleanup();
        cleanups = [];
        current = instance;
        setRevision((n)=>n + 1);
        if (instance !== null) deliver(ref, instance);
    };
    // Detachment can run inside keyed-owner disposal. Keep forwarded teardown
    // synchronous, but give its reactive writes an explicit native transaction.
    let detach = (0, $38evH$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $38evH$onCleanup)(()=>(0, $38evH$runWithOwner)(null, detach));
    return attach;
}

});


parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

});

parcelRegister("eIZqF", function(module, exports) {

$parcel$export(module.exports, "LabelContext", function () { return $ab84d34872d750ee$export$75b6ee27786ba447; });


var $2A4az = parcelRequire("2A4az");

var $7A3TT = parcelRequire("7A3TT");

const $ab84d34872d750ee$export$75b6ee27786ba447 = (0, $38evH$createContext)({});
const $ab84d34872d750ee$export$b04be29aa201d4f5 = /*#__PURE__*/ (0, $7A3TT.createHideableComponent)(function Label(props, ref) {
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $ab84d34872d750ee$export$75b6ee27786ba447);
    let labelProps = (0, $38evH$omit)(props, 'elementType');
    let ElementType = (0, $38evH$dynamic)(()=>(0, $2A4az.dom)[props.elementType ?? 'label']);
    // @ts-ignore
    return (0, $38evH$createComponent)(ElementType, (0, $38evH$mergeProps)({
        className: "react-aria-Label"
    }, labelProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $38evH$applyRef)(_ref$, r$) : ref = r$;
        }
    }));
});

});
parcelRegister("7A3TT", function(module, exports) {

$parcel$export(module.exports, "Hidden", function () { return $584eebc12d596346$export$8dc98ba7eadeaa56; });
$parcel$export(module.exports, "createHideableComponent", function () { return $584eebc12d596346$export$86427a43e3e48ebb; });
$parcel$export(module.exports, "useIsHidden", function () { return $584eebc12d596346$export$b5d7cc18bb8d2b59; });



var $6p9dH = parcelRequire("6p9dH");
var $584eebc12d596346$var$_tmpl$ = /*#__PURE__*/ (0, $38evH$template)(`<template>`);
const $584eebc12d596346$export$94b6d0abf7d33e8c = (0, $38evH$createContext)(false);
function $584eebc12d596346$export$8dc98ba7eadeaa56(props) {
    let isHidden = (0, $38evH$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
    if (isHidden) // Don't hide again if we are already hidden.
    return (0, $38evH$memo)(()=>props.children);
    // In SSR, portals are not supported by React. Instead, always render into a <template>
    // element, which the browser will never display to the user. In addition, the
    // content is not part of the accessible DOM tree, so it won't affect ids or other accessibility attributes.
    var _el$ = (0, $38evH$getNextElement)($584eebc12d596346$var$_tmpl$);
    (0, $38evH$insert)(_el$, (0, $38evH$createComponent)($584eebc12d596346$export$94b6d0abf7d33e8c, {
        value: true,
        get children () {
            return props.children;
        }
    }));
    return _el$;
}
function $584eebc12d596346$export$86427a43e3e48ebb(fn) {
    let Wrapper = (props)=>{
        let isHidden = (0, $38evH$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
        if (isHidden) return null;
        // oxlint-disable-next-line react/react-compiler
        let deliveredRef;
        let forwardedRef = (0, $6p9dH.useObjectRef)((node)=>{
            // Preserve synchronous source attachment; A's bridge owns delivery/cleanup.
            deliveredRef = props.ref;
            return (0, $6p9dH.attachRef)(deliveredRef, node);
        });
        (0, $38evH$createEffect)(()=>props.ref, (target)=>{
            let node = (0, $38evH$untrack)(()=>forwardedRef.current);
            if (node && target !== deliveredRef) {
                forwardedRef(null);
                forwardedRef(node);
            }
        });
        return fn(props, forwardedRef);
    };
    // @ts-ignore - for react dev tools
    Wrapper.displayName = fn.displayName || fn.name;
    return Wrapper;
}
function $584eebc12d596346$export$b5d7cc18bb8d2b59() {
    return (0, $38evH$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
}

});




parcelRegister("eXdQ3", function(module, exports) {

$parcel$export(module.exports, "useDOMRef", function () { return $ae314f6cf80336a8$export$c2c55ef9111cafd8; });
$parcel$export(module.exports, "useFocusableRef", function () { return $ae314f6cf80336a8$export$96a734597687c040; });
/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

var $6p9dH = parcelRequire("6p9dH");
function $ae314f6cf80336a8$export$a5795cc979dfae80(ref) {
    return {
        UNSAFE_getDOMNode () {
            return ref.current;
        }
    };
}
function $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef) {
    let resolvedFocusableRef = focusableRef || domRef;
    return {
        ...$ae314f6cf80336a8$export$a5795cc979dfae80(domRef),
        focus () {
            if (resolvedFocusableRef.current) resolvedFocusableRef.current.focus();
        }
    };
}
function $ae314f6cf80336a8$export$c2c55ef9111cafd8(ref) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $38evH$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $38evH$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$c7e28c72a4823176(ref) {
    return {
        get current () {
            return ref.current && ref.current.UNSAFE_getDOMNode();
        }
    };
}
function $ae314f6cf80336a8$export$1d5cc31d9d8df817(ref) {
    return $ae314f6cf80336a8$export$c7e28c72a4823176(ref);
}

});

parcelRegister("1NDEx", function(module, exports) {

$parcel$export(module.exports, "useSpectrumContextProps", function () { return $14f920461cb26c44$export$764f6146fadd77f7; });
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

var $2A4az = parcelRequire("2A4az");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $hp4AJ = parcelRequire("hp4AJ");

var $cJuZp = parcelRequire("cJuZp");

var $6p9dH = parcelRequire("6p9dH");
function $14f920461cb26c44$export$764f6146fadd77f7(props, ref, context) {
    let ctx = (0, $38evH$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
    let contextProps = new Proxy({}, {
        ownKeys: ()=>Reflect.ownKeys(ctx()).filter((key)=>key !== 'ref'),
        has: (_, key)=>key !== 'ref' && key in ctx(),
        getOwnPropertyDescriptor: (_, key)=>key !== 'ref' && key in ctx() ? {
                enumerable: true,
                configurable: true
            } : undefined,
        get: (_, key)=>key === 'ref' ? undefined : Reflect.get(ctx(), key)
    });
    let mergedRef = (0, $6p9dH.useObjectRef)((0, $hp4AJ.mergeRefs)(ref, (value)=>{
        let contextRef = ctx().ref;
        return (0, $6p9dH.attachRef)(typeof contextRef === 'function' ? contextRef : undefined, value);
    }));
    let mergedProps = (0, $7boJ2.mergeProps)(contextProps, props);
    // mergeProps does not merge `UNSAFE_style`
    let result = new Proxy(mergedProps, {
        get (target, key) {
            if (key === 'UNSAFE_style' && 'UNSAFE_style' in contextProps && contextProps.UNSAFE_style && 'UNSAFE_style' in props && props.UNSAFE_style) return {
                ...contextProps.UNSAFE_style,
                ...props.UNSAFE_style
            };
            if (key === 'styles' && 'styles' in contextProps && contextProps.styles && 'styles' in props && props.styles) return (0, $cJuZp.mergeStyles)(contextProps.styles, props.styles);
            return Reflect.get(target, key);
        }
    });
    return [
        result,
        mergedRef
    ];
}

});
parcelRegister("cJuZp", function(module, exports) {

$parcel$export(module.exports, "mergeStyles", function () { return $9451b9e2e831d96c$export$e618dc39ac9ad607; });
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
 */ // import {RuntimeStyleFunction, RenderProps} from './types';
// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
// type ArgTypes<T> = T extends (props: infer V) => any ? NullToObject<V> : never;
// type NullToObject<T> = T extends (null | undefined) ? {} : T;
// type BoxedTupleTypes<T extends any[]> = { [P in keyof T]: [ArgTypes<T[P]>] }[Exclude<keyof T, keyof any[]>];
// type BoxedReturnTypes<T extends any[]> = { [P in keyof T]: [InferReturn<T[P]>] }[Exclude<keyof T, keyof any[]>];
// type UnboxIntersection<T> = T extends { 0: infer U } ? U : never;
// type Arg<X, R> = RuntimeStyleFunction<X, R> | null | undefined;
// type NoInfer<T> = [T, void][T extends any ? 0 : 1];
// type InferReturn<T> = T extends (props: any) => infer R ? NullToObject<R> : never;
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
// type InferReturnType<T extends any[]> = UnboxIntersection<UnionToIntersection<BoxedReturnTypes<T>>>;
// Two overloads:
// 1. If a render props type is expected based on the return type, forward that type to all arguments.
// 2. Otherwise, infer the return type based on the arguments.
// export function merge<R extends RenderProps<string> = never, X = {}>(...args: Arg<NoInfer<X>, NoInfer<R>>[]): RuntimeStyleFunction<X, R>;
// export function merge<T extends Arg<any, any>[]>(...args: T): RuntimeStyleFunction<InferReturnType<T>, UnboxIntersection<UnionToIntersection<BoxedTupleTypes<T>>>>;
// export function merge(...args: any[]): RuntimeStyleFunction<any, any> {
//   return (props) => {
//     return mergeStyles(...args.map(f => typeof f === 'function' ? f(props) : null));
//   };
// }
/**
 * Merges multiple style strings together, combining the CSS properties from each.
 * Later styles take precedence over earlier ones for the same property.
 * Useful for composing styles from multiple `style()` macro calls.
 *
 * @example
 *   import {mergeStyles} from '@react-spectrum/s2';
 *   import {style} from '@react-spectrum/s2/style' with {type: 'macro'};
 *
 *   const baseStyles = style({padding: 8});
 *   const overrideStyles = style({padding: 16, color: 'heading'});
 *   const merged = mergeStyles(baseStyles, overrideStyles);
 *   // merged has `padding: 16` and `color: heading`.
 */ function $9451b9e2e831d96c$export$e618dc39ac9ad607(...styles) {
    let definedStyles = styles.filter(Boolean);
    if (definedStyles.length === 1) {
        let first = definedStyles[0];
        if (typeof first !== 'string') // static macro has a toString method so that we generate the style macro map for the entry
        // it's automatically called in other places, but for our merging, we have to call it ourselves
        return first.toString();
        return first;
    }
    let map = new Map();
    for (let style of definedStyles){
        // must call toString here for the static macro
        let str = style.toString();
        for (let [k, v] of $9451b9e2e831d96c$var$parse(str))map.set(k, v);
    }
    let res = '';
    for (let value of map.values())res += value;
    return res;
}
function $9451b9e2e831d96c$var$parse(s) {
    let properties = new Map();
    let i = 0;
    while(i < s.length){
        while(i < s.length && s[i] === ' ')i++;
        let start = i;
        readValue(); // property index
        // read conditions (up to the last segment)
        let condition = i;
        while(i < s.length && s[i] !== ' ')readValue();
        let property = s.slice(start, condition);
        properties.set(property, (properties.get(property) || '') + ' ' + s.slice(start, i));
    }
    function readValue() {
        if (s[i] === '-') // the beginning and end of arbitrary values are marked with -
        while(i < s.length && s[i] !== ' '){
            i++;
            if (s[i] === '-') {
                i++;
                break;
            }
        }
        else {
            while(i < s.length)if (s[i] === '_') i++;
            else {
                i++;
                break;
            }
        }
    }
    return properties;
}

});




var $gPqiz = parcelRequire("gPqiz");


var $c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7 = parcelRequire("gPqiz").ProgressCircle;
var $c405cf1fa9bf4fd5$export$afffa1e5edf12209 = parcelRequire("gPqiz").ProgressCircleContext;
export {$c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7 as ProgressCircle, $c405cf1fa9bf4fd5$export$afffa1e5edf12209 as ProgressCircleContext};
//# sourceMappingURL=ProgressCircle.native.js.map
