import "./Avatar.native.css";
import {createComponent as $2KnN7$createComponent, mergeProps as $2KnN7$mergeProps, template as $2KnN7$template, getNextElement as $2KnN7$getNextElement, spread as $2KnN7$spread, insert as $2KnN7$insert, scope as $2KnN7$scope, runHydrationEvents as $2KnN7$runHydrationEvents, ref as $2KnN7$ref, effect as $2KnN7$effect, readShallow as $2KnN7$readShallow, setAttribute as $2KnN7$setAttribute, className as $2KnN7$className, memo as $2KnN7$memo, getNextMarker as $2KnN7$getNextMarker, style as $2KnN7$style, dynamic as $2KnN7$dynamic, useHead as $2KnN7$useHead, isServer as $2KnN7$isServer} from "@solidjs/web";
import {createContext as $2KnN7$createContext, untrack as $2KnN7$untrack, omit as $2KnN7$omit, createMemo as $2KnN7$createMemo, useContext as $2KnN7$useContext, createSignal as $2KnN7$createSignal, createEffect as $2KnN7$createEffect, onCleanup as $2KnN7$onCleanup, onSettled as $2KnN7$onSettled, For as $2KnN7$For, merge as $2KnN7$merge, isHydrating as $2KnN7$isHydrating, action as $2KnN7$action, runWithOwner as $2KnN7$runWithOwner, createUniqueId as $2KnN7$createUniqueId, $PROXY as $2KnN7$$PROXY} from "solid-js";
import $2KnN7$clsx from "clsx";


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
parcelRegister("2for9", function(module, exports) {

$parcel$export(module.exports, "AvatarContext", function () { return $1a2ff02647122ccf$export$a20dad690e1279e2; });
$parcel$export(module.exports, "Avatar", function () { return $1a2ff02647122ccf$export$e2255cf6045e8d47; });


var $3BNNa = parcelRequire("3BNNa");

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $3kDOI = parcelRequire("3kDOI");

var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
const $1a2ff02647122ccf$var$imageStyles = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let flexShrink = false;
    let flexGrow = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "_v") flexShrink = true;
        if (p[1] === "_u") flexGrow = true;
        rules += p[0];
    }
    rules += ' sd18';
    currentRules["display"] = "flex";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' og18';
    currentRules["borderTopStartRadius"] = "full";
    rules += ' ng18';
    currentRules["borderTopEndRadius"] = "full";
    rules += ' kg18';
    currentRules["borderBottomStartRadius"] = "full";
    rules += ' jg18';
    currentRules["borderBottomEndRadius"] = "full";
    rules += ' ZifsFYc18';
    currentRules["width"] = 20;
    rules += ' FifsFYc18';
    currentRules["height"] = 20;
    if (!flexShrink) rules += ' _va18';
    currentRules["flexShrink"] = 0;
    if (!flexGrow) rules += ' _ua18';
    currentRules["flexGrow"] = 0;
    rules += ' __ca18';
    currentRules["disableTapHighlight"] = true;
    if (props.isOverBackground) {
        rules += ' _Lf18';
        currentRules["outlineStyle"] = typeof currentRules["outlineStyle"] === 'object' ? currentRules["outlineStyle"] : {
            "default": currentRules["outlineStyle"]
        };
        currentRules["outlineStyle"]["isOverBackground"] = "solid";
    } else {
        rules += ' _Le18';
        currentRules["outlineStyle"] = "none";
    }
    rules += ' OEzkoQe18';
    currentRules["outlineColor"] = "--s2-container-bg";
    if (props.isLH) {
        rules += ' _MBJrsse18';
        currentRules["outlineWidth"] = typeof currentRules["outlineWidth"] === 'object' ? currentRules["outlineWidth"] : {
            "default": currentRules["outlineWidth"]
        };
        currentRules["outlineWidth"]["isLH"] = "min(2px, max(1px, calc((((1lh / 64) - 1px) * 9999) + 1px)))";
    } else if (props.isLarge) {
        rules += ' _Mc18';
        currentRules["outlineWidth"] = typeof currentRules["outlineWidth"] === 'object' ? currentRules["outlineWidth"] : {
            "default": currentRules["outlineWidth"]
        };
        currentRules["outlineWidth"]["isLarge"] = 2;
    } else {
        rules += ' _Mb18';
        currentRules["outlineWidth"] = 1;
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Avatar.native.js:23:20";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Avatar.native.js:23:20"
        };
    }
    return rules;
};
const $1a2ff02647122ccf$export$a20dad690e1279e2 = (0, $2KnN7$createContext)(null);
function $1a2ff02647122ccf$export$e2255cf6045e8d47(inputProps) {
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $2KnN7$untrack)(()=>inputProps.ref), $1a2ff02647122ccf$export$a20dad690e1279e2);
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $2KnN7$omit)(props, 'alt', 'src', 'UNSAFE_style', 'UNSAFE_className', 'size', 'isOverBackground', 'slot', 'ref');
    const domProps = (0, $5gAIA.filterDOMProps)(otherProps);
    // In the docs build, we need to be able to simulate font scaling.
    let sizeInfo = (0, $2KnN7$createMemo)(()=>{
        let size = props.size ?? 24;
        let remSize;
        let isLarge = false;
        let isLH = false;
        if (typeof size === 'string') {
            remSize = size;
            isLH = size.endsWith('lh');
        } else {
            remSize = `calc(${size / 16} * var(--rem, 1rem))`;
            isLarge = size >= 64;
        }
        return {
            remSize: remSize,
            isLarge: isLarge,
            isLH: isLH
        };
    });
    return (0, $2KnN7$createComponent)((0, $3kDOI.ImageContext), {
        value: {},
        get children () {
            return (0, $2KnN7$createComponent)((0, $3kDOI.Image), (0, $2KnN7$mergeProps)(domProps, {
                ref: (node)=>domRef(node),
                get slot () {
                    return props.slot ?? 'avatar';
                },
                get alt () {
                    return props.alt ?? '';
                },
                get UNSAFE_style () {
                    return {
                        ...props.UNSAFE_style,
                        width: sizeInfo().remSize,
                        height: sizeInfo().remSize
                    };
                },
                get UNSAFE_className () {
                    return (props.UNSAFE_className ?? '') + ' ' + (0, $3BNNa.centerBaselineBefore);
                },
                get styles () {
                    return $1a2ff02647122ccf$var$imageStyles({
                        isOverBackground: props.isOverBackground,
                        isLarge: sizeInfo().isLarge,
                        isLH: sizeInfo().isLH
                    }, props.styles);
                },
                get src () {
                    return props.src;
                }
            }));
        }
    });
}

});
parcelRegister("3BNNa", function(module, exports) {

$parcel$export(module.exports, "centerBaselineBefore", function () { return $2a0b736edbe29175$export$179e9489a09b14ac; });
$parcel$export(module.exports, "centerBaseline", function () { return $2a0b736edbe29175$export$9d7e2342a7e53afa; });

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $cJuZp = parcelRequire("cJuZp");
var $2a0b736edbe29175$var$_tmpl$ = /*#__PURE__*/ (0, $2KnN7$template)(`<div>`);
const $2a0b736edbe29175$var$styles = " sd18 eb18 -macro-static-UwrWLe";
function $2a0b736edbe29175$export$768dac55bb57081d(props) {
    let domProps = (0, $5gAIA.filterDOMProps)(props);
    var _el$ = (0, $2KnN7$getNextElement)($2a0b736edbe29175$var$_tmpl$);
    (0, $2KnN7$spread)(_el$, [
        domProps,
        {
            get slot () {
                return props.slot;
            },
            get style () {
                return props.style;
            },
            get "class" () {
                return (0, $cJuZp.mergeStyles)($2a0b736edbe29175$var$styles, props.styles) + ' ' + $2a0b736edbe29175$export$179e9489a09b14ac;
            }
        }
    ], true);
    (0, $2KnN7$insert)(_el$, (0, $2KnN7$scope)(()=>props.children));
    (0, $2KnN7$runHydrationEvents)();
    return _el$;
}
const $2a0b736edbe29175$export$179e9489a09b14ac = "FRGfhd";
function $2a0b736edbe29175$export$9d7e2342a7e53afa(props = {}) {
    return (icon)=>(0, $2KnN7$createComponent)($2a0b736edbe29175$export$768dac55bb57081d, (0, $2KnN7$mergeProps)(props, {
            children: icon
        }));
}

});
parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

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


parcelRegister("3kDOI", function(module, exports) {

$parcel$export(module.exports, "ImageContext", function () { return $26d2202ec5ab80cc$export$8151eb379fcf2442; });
$parcel$export(module.exports, "Image", function () { return $26d2202ec5ab80cc$export$3e431a229df88919; });


var $4SbjT = parcelRequire("4SbjT");


var $6p9dH = parcelRequire("6p9dH");

var $6VqtR = parcelRequire("6VqtR");

var $esT6z = parcelRequire("esT6z");

var $cJuZp = parcelRequire("cJuZp");

var $1NDEx = parcelRequire("1NDEx");
var $26d2202ec5ab80cc$var$_tmpl$ = /*#__PURE__*/ (0, $2KnN7$template)(`<img>`, 1), $26d2202ec5ab80cc$var$_tmpl$2 = /*#__PURE__*/ (0, $2KnN7$template)(`<div><!$><!/><!$><!/>`), $26d2202ec5ab80cc$var$_tmpl$3 = /*#__PURE__*/ (0, $2KnN7$template)(`<picture><!$><!/><!$><!/>`), $26d2202ec5ab80cc$var$_tmpl$4 = /*#__PURE__*/ (0, $2KnN7$template)(`<source>`);
const $26d2202ec5ab80cc$export$8151eb379fcf2442 = (0, $2KnN7$createContext)(null);
function $26d2202ec5ab80cc$var$createState(src) {
    return {
        state: 'loading',
        src: src,
        startTime: Date.now(),
        loadTime: 0
    };
}
function $26d2202ec5ab80cc$var$reducer(state, action) {
    switch(action.type){
        case 'update':
            return {
                state: 'loading',
                src: action.src,
                startTime: Date.now(),
                loadTime: 0
            };
        case 'loaded':
        case 'error':
            return {
                ...state,
                state: action.type
            };
        case 'revealed':
            return {
                ...state,
                state: 'revealed',
                loadTime: Date.now() - state.startTime
            };
        default:
            return state;
    }
}
const $26d2202ec5ab80cc$var$wrapperStyles = " gH18 _Nc18 Pc18 -macro-static-g1owt";
const $26d2202ec5ab80cc$var$imgStyles = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' sb18';
    currentRules["display"] = "block";
    rules += ' Za18';
    currentRules["width"] = "full";
    rules += ' Fb18';
    currentRules["height"] = "full";
    rules += ' _H40ub4c18';
    currentRules["objectFit"] = "inherit";
    rules += ' __D40ub4c18';
    currentRules["objectPosition"] = "inherit";
    if (props.isRevealed) {
        rules += ' _Ib18';
        currentRules["opacity"] = typeof currentRules["opacity"] === 'object' ? currentRules["opacity"] : {
            "default": currentRules["opacity"]
        };
        currentRules["opacity"]["isRevealed"] = 1;
    } else {
        rules += ' _Ia18';
        currentRules["opacity"] = 0;
    }
    if (props.isTransitioning) {
        rules += ' Yf18';
        currentRules["transition"] = typeof currentRules["transition"] === 'object' ? currentRules["transition"] : {
            "default": currentRules["transition"]
        };
        currentRules["transition"]["isTransitioning"] = "opacity";
    } else {
        rules += ' Ye18';
        currentRules["transition"] = "none";
    }
    rules += ' Xe18';
    currentRules["transitionDuration"] = 500;
    if (props.isTransitioning) {
        rules += ' _2b18';
        currentRules["transitionTimingFunction"] = typeof currentRules["transitionTimingFunction"] === 'object' ? currentRules["transitionTimingFunction"] : {
            "default": currentRules["transitionTimingFunction"]
        };
        currentRules["transitionTimingFunction"]["isTransitioning"] = "default";
    } else {
        rules += ' _2b18';
        currentRules["transitionTimingFunction"] = "default";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Image.native.js:69:18";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Image.native.js:69:18"
        };
    }
    return rules;
};
function $26d2202ec5ab80cc$export$3e431a229df88919(inputProps) {
    let [props, domRef] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $2KnN7$untrack)(()=>inputProps.ref), $26d2202ec5ab80cc$export$8151eb379fcf2442);
    let hidden = ()=>props.hidden;
    let srcProp = ()=>props.src ?? '';
    let colorScheme = (0, $2KnN7$createMemo)(()=>(0, $2KnN7$useContext)((0, $4SbjT.ColorSchemeContext)));
    let cacheKey = (0, $2KnN7$createMemo)(()=>{
        let src = srcProp();
        return typeof src === 'object' ? JSON.stringify(src) : src;
    });
    let group = (0, $2KnN7$createMemo)(()=>(0, $2KnN7$useContext)(props.group ?? (0, $6VqtR.DefaultImageGroup)));
    let [state, setState] = (0, $2KnN7$createSignal)((0, $2KnN7$untrack)(()=>$26d2202ec5ab80cc$var$createState(cacheKey())));
    let dispatch = (action)=>setState((previous)=>$26d2202ec5ab80cc$var$reducer(previous, action));
    (0, $2KnN7$createEffect)(()=>({
            key: cacheKey(),
            hidden: hidden()
        }), ({ key: key, hidden: hidden })=>{
        if (!hidden && key !== (0, $2KnN7$untrack)(state).src) dispatch({
            type: 'update',
            src: key
        });
    });
    (0, $2KnN7$createEffect)(()=>({
            state: state().state,
            revealAll: group().revealAll,
            hidden: hidden()
        }), (value)=>{
        if (value.state === 'loaded' && value.revealAll && !value.hidden) dispatch({
            type: 'revealed'
        });
    });
    let imgRef = (0, $6p9dH.useObjectRef)();
    (0, $2KnN7$createEffect)(()=>({
            key: cacheKey(),
            hidden: hidden(),
            group: group()
        }), (value)=>{
        if (value.hidden) return;
        value.group.register(value.key);
        return ()=>value.group.unregister(value.key);
    });
    let onLoad = ()=>{
        group().load(cacheKey());
        dispatch({
            type: 'loaded'
        });
    };
    let onError = ()=>{
        dispatch({
            type: 'error'
        });
        group().unregister(cacheKey());
    };
    let isSkeleton = (0, $esT6z.useIsSkeleton)();
    let isAnimating = ()=>isSkeleton() || state().state === 'loading' || state().state === 'loaded';
    let animation = (0, $esT6z.useLoadingAnimation)(isAnimating);
    let disposed = false;
    (0, $2KnN7$onCleanup)(()=>{
        disposed = true;
    });
    (0, $2KnN7$createEffect)(()=>({
            hidden: hidden(),
            img: imgRef.current,
            node: domRef.current,
            state: state().state,
            key: cacheKey(),
            animating: isAnimating()
        }), (value)=>{
        if (value.hidden) return;
        (0, $2KnN7$onSettled)(()=>{
            // Cached-image checks run after native host attachment, under this owner.
            // Source's queued production check is retained without React act globals.
            if (value.state === 'loading' && value.img?.complete) queueMicrotask(()=>{
                if (disposed || imgRef.current !== value.img || hidden() || cacheKey() !== value.key) return;
                if (value.img.naturalWidth === 0 && value.img.naturalHeight === 0) onError();
                else onLoad();
            });
            animation(value.node);
        });
    });
    (0, $2KnN7$createEffect)(()=>props.alt, (alt)=>{
        alt;
    });
    let errorState = (0, $2KnN7$createMemo)(()=>!isSkeleton() && state().state === 'error' && props.renderError?.());
    let isRevealed = ()=>state().state === 'revealed' && !isSkeleton();
    let isTransitioning = ()=>isRevealed() && state().loadTime > 200;
    let renderImage = ()=>(()=>{
            var _el$ = (0, $2KnN7$getNextElement)($26d2202ec5ab80cc$var$_tmpl$);
            _el$.addEventListener("error", onError);
            _el$.addEventListener("load", onLoad);
            var _ref$ = imgRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $2KnN7$ref)(()=>_ref$, _el$) : imgRef = _el$;
            (0, $2KnN7$effect)(()=>({
                    e: props.fetchPriority,
                    t: typeof srcProp() === 'string' && srcProp() ? srcProp() : undefined,
                    a: props.alt,
                    o: props.crossOrigin,
                    i: props.decoding,
                    n: props.loading,
                    s: props.referrerPolicy,
                    h: props.width,
                    r: props.height,
                    d: props.itemProp,
                    l: (0, $2KnN7$readShallow)($26d2202ec5ab80cc$var$imgStyles({
                        isRevealed: isRevealed(),
                        isTransitioning: isTransitioning()
                    }))
                }), ({ e: e, t: t, a: a, o: o, i: i, n: n, s: s, h: h, r: r, d: d, l: l }, _p$)=>{
                e !== _p$?.e && (0, $2KnN7$setAttribute)(_el$, "fetchpriority", e);
                t !== _p$?.t && (0, $2KnN7$setAttribute)(_el$, "src", t);
                a !== _p$?.a && (0, $2KnN7$setAttribute)(_el$, "alt", a);
                o !== _p$?.o && (0, $2KnN7$setAttribute)(_el$, "crossorigin", o);
                i !== _p$?.i && (0, $2KnN7$setAttribute)(_el$, "decoding", i);
                n !== _p$?.n && (0, $2KnN7$setAttribute)(_el$, "loading", n);
                s !== _p$?.s && (0, $2KnN7$setAttribute)(_el$, "referrerpolicy", s);
                h !== _p$?.h && (0, $2KnN7$setAttribute)(_el$, "width", h);
                r !== _p$?.r && (0, $2KnN7$setAttribute)(_el$, "height", r);
                d !== _p$?.d && (0, $2KnN7$setAttribute)(_el$, "itemprop", d);
                (0, $2KnN7$className)(_el$, l, _p$?.l);
            });
            return _el$;
        })();
    return (0, $2KnN7$memo)(()=>(0, $2KnN7$memo)(()=>!hidden())() && (()=>{
            var _el$2 = (0, $2KnN7$getNextElement)($26d2202ec5ab80cc$var$_tmpl$2), _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, $2KnN7$getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, $2KnN7$getNextMarker)(_el$5.nextSibling);
            var _ref$2 = domRef;
            typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $2KnN7$ref)(()=>_ref$2, _el$2) : domRef = _el$2;
            (0, $2KnN7$insert)(_el$2, (0, $2KnN7$scope)(()=>errorState()), _el$4, _co$);
            (0, $2KnN7$insert)(_el$2, (0, $2KnN7$scope)((()=>{
                var _c$ = (0, $2KnN7$memo)(()=>!errorState());
                return ()=>_c$() && (Array.isArray(srcProp()) ? (()=>{
                        var _el$7 = (0, $2KnN7$getNextElement)($26d2202ec5ab80cc$var$_tmpl$3), _el$8 = _el$7.firstChild, [_el$9, _co$3] = (0, $2KnN7$getNextMarker)(_el$8.nextSibling), _el$0 = _el$9.nextSibling, [_el$1, _co$4] = (0, $2KnN7$getNextMarker)(_el$0.nextSibling);
                        (0, $2KnN7$insert)(_el$7, (0, $2KnN7$createComponent)((0, $2KnN7$For), {
                            get each () {
                                return srcProp();
                            },
                            keyed: false,
                            children: (source)=>{
                                let sourceProps = (0, $2KnN7$omit)((0, $2KnN7$merge)(source), 'colorScheme', 'srcSet');
                                let sourceColorScheme = ()=>source().colorScheme;
                                return (0, $2KnN7$memo)(()=>(0, $2KnN7$memo)(()=>!!(!sourceColorScheme() || !colorScheme() || colorScheme() === 'light dark' || sourceColorScheme() === colorScheme()))() ? (()=>{
                                        var _el$10 = (0, $2KnN7$getNextElement)($26d2202ec5ab80cc$var$_tmpl$4);
                                        (0, $2KnN7$spread)(_el$10, [
                                            sourceProps,
                                            {
                                                get srcset () {
                                                    return source().srcSet;
                                                },
                                                get media () {
                                                    return sourceColorScheme() && (!colorScheme() || colorScheme() === 'light dark') ? `${source().media ? `${source().media} and ` : ''}(prefers-color-scheme: ${sourceColorScheme()})` : source().media;
                                                }
                                            }
                                        ], false);
                                        (0, $2KnN7$runHydrationEvents)();
                                        return _el$10;
                                    })() : null);
                            }
                        }), _el$9, _co$3);
                        (0, $2KnN7$insert)(_el$7, (0, $2KnN7$scope)(()=>renderImage()), _el$1, _co$4);
                        (0, $2KnN7$effect)(()=>(0, $2KnN7$readShallow)(" _H40ub4c18 __D40ub4c18 -macro-static-CqXRF"), (_v$, _$p)=>{
                            (0, $2KnN7$className)(_el$7, _v$, _$p);
                        });
                        return _el$7;
                    })() : renderImage());
            })()), _el$6, _co$2);
            (0, $2KnN7$effect)(()=>({
                    e: props.slot || undefined,
                    t: (0, $2KnN7$readShallow)(props.UNSAFE_style),
                    a: (props.UNSAFE_className ?? '') + (0, $cJuZp.mergeStyles)($26d2202ec5ab80cc$var$wrapperStyles, props.styles) + ' ' + (isAnimating() ? (0, $esT6z.loadingStyle) : '')
                }), ({ e: e, t: t, a: a }, _p$)=>{
                e !== _p$?.e && (0, $2KnN7$setAttribute)(_el$2, "slot", e);
                (0, $2KnN7$style)(_el$2, t, _p$?.t);
                (0, $2KnN7$className)(_el$2, a, _p$?.a);
            });
            return _el$2;
        })());
}

});
parcelRegister("4SbjT", function(module, exports) {

$parcel$export(module.exports, "ColorSchemeContext", function () { return $38c4fc7450edae36$export$374e0245597d19a3; });
$parcel$export(module.exports, "Provider", function () { return $38c4fc7450edae36$export$2881499e37b75b9a; });


parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $hL2UH = parcelRequire("hL2UH");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");

var $cJuZp = parcelRequire("cJuZp");

var $fNnwP = parcelRequire("fNnwP");
const $38c4fc7450edae36$export$374e0245597d19a3 = (0, $2KnN7$createContext)(null);
function $38c4fc7450edae36$export$2881499e37b75b9a(props) {
    let parentColorScheme = (0, $2KnN7$useContext)($38c4fc7450edae36$export$374e0245597d19a3);
    let content = ()=>(0, $2KnN7$createComponent)($38c4fc7450edae36$export$374e0245597d19a3, {
            get value () {
                return props.colorScheme || parentColorScheme;
            },
            get children () {
                return (0, $2KnN7$createComponent)($38c4fc7450edae36$var$ProviderInner, props);
            }
        });
    let localizedContent = ()=>props.locale ? (0, $2KnN7$createComponent)((0, $dnlDG.I18nProvider), {
            get locale () {
                return props.locale;
            },
            get children () {
                return content();
            }
        }) : content();
    return (0, $2KnN7$memo)(()=>(0, $2KnN7$memo)(()=>!!props.router)() ? (0, $2KnN7$createComponent)((0, $fNnwP.RouterProvider), (0, $2KnN7$mergeProps)(()=>props.router, {
            get children () {
                return localizedContent();
            }
        })) : localizedContent());
}
undefined;
let $38c4fc7450edae36$var$providerStyles = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.colorScheme === "dark") {
        rules += ' -ICUGx-_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"dark\""] = "dark";
    } else if (props.colorScheme === "light") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light\""] = "light";
    } else if (props.colorScheme === "light dark") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\""] = "light";
        rules += ' -ICUGx-D1v0V_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "dark";
    }
    rules += ' _pK8eoyd18';
    currentRules["colorScheme"] = "--s2-color-scheme";
    if (props.colorScheme === "dark") {
        rules += ' -NvXmrd-_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"dark\""] = " ";
    } else if (props.colorScheme === "light") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light\""] = "initial";
    } else if (props.colorScheme === "light dark") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\""] = "initial";
        rules += ' -NvXmrd-D1v0V_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = " ";
    }
    if (props.colorScheme === "dark") {
        rules += ' -j9blY-_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"dark\""] = "initial";
    } else if (props.colorScheme === "light") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light\""] = " ";
    } else if (props.colorScheme === "light dark") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\""] = " ";
        rules += ' -j9blY-D1v0V_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "initial";
    }
    if (props.background === "layer-2") {
        rules += ' -Ovbhqd-g_g18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"layer-2\""] = "layer-2";
    } else if (props.background === "layer-1") {
        rules += ' -Ovbhqd-gqlRAZb18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"layer-1\""] = "layer-1";
    } else if (props.background === "base") {
        rules += ' -Ovbhqd-gX18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"base\""] = "base";
    }
    if (props.background === "layer-2") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"layer-2\""] = "--s2-container-bg";
    } else if (props.background === "layer-1") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"layer-1\""] = "--s2-container-bg";
    } else if (props.background === "base") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"base\""] = "--s2-container-bg";
    }
    rules += ' _Bb18';
    currentRules["isolation"] = "isolate";
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js:54:21";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js:54:21"
        };
    }
    return rules;
};
function $38c4fc7450edae36$var$ProviderInner(props) {
    let locale = (0, $dnlDG.useLocale)();
    // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
    let Element = (0, $2KnN7$dynamic)(()=>props.elementType || 'div');
    return (0, $2KnN7$createComponent)(Element, (0, $2KnN7$mergeProps)(()=>(0, $5gAIA.filterDOMProps)(props), {
        get lang () {
            return locale.locale;
        },
        get dir () {
            return locale.direction;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get "class" () {
            return (props.UNSAFE_className ?? '') + (0, $cJuZp.mergeStyles)(props.styles, $38c4fc7450edae36$var$providerStyles({
                // Set a default background if the provider is rendered as the root <html> element.
                background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
                colorScheme: props.colorScheme
            }));
        },
        get children () {
            return [
                (0, $2KnN7$createComponent)((0, $hL2UH.Fonts), {}),
                (0, $2KnN7$memo)(()=>props.children)
            ];
        }
    }));
}

});
parcelRegister("hL2UH", function(module, exports) {

$parcel$export(module.exports, "Fonts", function () { return $ced9160395cef184$export$20f257fc407da7a3; });


parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");

// Typekit ids for each CJK locale. These use dynamic subsetting, so cannot be loaded as CSS.
// Because of the large size of the JS, we only download the script for the locale that is used.
// Each of these kits includes regular, bold, extra bold, and black weights. Spectrum 2 does not use any lighter weights.
let $ced9160395cef184$var$scripts = {
    ja: 'pyb4hbv',
    ko: 'pux4zom',
    'zh-Hans': 'qwy0qqd',
    'zh-CN': 'qwy0qqd',
    'zh-SG': 'qwy0qqd',
    'zh-HK': 'wrf0dsa',
    'zh-Hant': 'twr1oiz',
    zh: 'twr1oiz'
};
// Font URLs from fonts.css to preload for each locale.
let $ced9160395cef184$var$preloads = {
    // Currently no preloads for arabic and hebrew, because we don't know which weights will be used ahead of time.
    // Browsers will emit warnings for unused preloads.
    // ar: [
    // 'https://use.typekit.net/af/dfb464/00000000000000007735a2f9/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3',
    // 'https://use.typekit.net/af/560a53/00000000000000007735a300/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3',
    // 'https://use.typekit.net/af/0f9162/00000000000000007735a307/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n6&v=3',
    // 'https://use.typekit.net/af/ab2792/00000000000000007735a309/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3'
    // 'https://use.typekit.net/af/560a53/00000000000000007735a300/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3'
    // ],
    // he: [
    // 'https://use.typekit.net/af/ffca46/00000000000000007735a30a/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3',
    // 'https://use.typekit.net/af/e90860/00000000000000007735a313/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3',
    // 'https://use.typekit.net/af/619974/00000000000000007735a31f/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n6&v=3'
    // 'https://use.typekit.net/af/e90860/00000000000000007735a313/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3'
    // ],
    en: [
        // Preload Adobe Clean Spectrum VF.
        'https://use.typekit.net/af/ca4cba/0000000000000000775c55a1/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n1&v=3'
    ]
};
function $ced9160395cef184$export$20f257fc407da7a3() {
    let localeState = (0, $dnlDG.useLocale)();
    let locale = ()=>new Intl.Locale(localeState.locale);
    let languageAndRegion = ()=>locale().language + (locale().region ? '-' + locale().region : '');
    let languageAndScript = ()=>locale().language + (locale().script ? '-' + locale().script : '');
    // Load script tag for CJK font
    let typekitId = ()=>$ced9160395cef184$var$scripts[locale().baseName] || $ced9160395cef184$var$scripts[languageAndRegion()] || $ced9160395cef184$var$scripts[languageAndScript()] || $ced9160395cef184$var$scripts[locale().language];
    let script = ()=>typekitId() ? `https://use.typekit.net/${typekitId()}.js` : null;
    // Native head resources are deduped and retained after scope disposal, including during SSR.
    // Preserve the React 19 CJK early return: a script locale does not also preload fonts.
    (0, $2KnN7$useHead)(()=>{
        let src = script();
        if (src) return {
            tag: 'script',
            props: {
                async: true,
                src: src
            }
        };
        // Start font loading before the stylesheet downloads, including during SSR.
        let preloadUrls = $ced9160395cef184$var$preloads[locale().language] || $ced9160395cef184$var$preloads.en;
        return preloadUrls.map((href)=>({
                tag: 'link',
                props: {
                    rel: 'preload',
                    href: href,
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: ''
                }
            }));
    });
    // useHead deliberately does not bind event/ref props. Attach only the owned load listener;
    // never remove a shared kit script when this provider or locale scope is disposed.
    (0, $2KnN7$createEffect)(script, (src)=>{
        if (!src) return;
        let scriptEl = Array.from(document.scripts).find((s)=>s.src === src);
        if (scriptEl) {
            let onLoad = ()=>{
                let typekit = window.Typekit;
                if (typeof typekit !== 'undefined' && typeof typekit.load === 'function') typekit.load();
            };
            scriptEl.addEventListener('load', onLoad);
            (0, $2KnN7$onCleanup)(()=>scriptEl.removeEventListener('load', onLoad));
        }
    });
    return null;
}

});
parcelRegister("ig9q0", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return (parcelRequire("dnlDG")).I18nProvider; });
$parcel$export(module.exports, "useLocale", function () { return (parcelRequire("dnlDG")).useLocale; });
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
var $dnlDG = parcelRequire("dnlDG");


});
parcelRegister("dnlDG", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return $9bce356509de5990$export$a54013f0d02a8f82; });
$parcel$export(module.exports, "useLocale", function () { return $9bce356509de5990$export$43bb16f9c6d9e3f7; });


var $fWxcB = parcelRequire("fWxcB");


var $kIyoO = parcelRequire("kIyoO");
const $9bce356509de5990$var$I18nContext = (0, $2KnN7$createContext)(null);
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
    return (0, $2KnN7$createComponent)($9bce356509de5990$var$I18nContext, {
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
    return (0, $2KnN7$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $2KnN7$memo)(()=>(0, $2KnN7$memo)(()=>!!props.locale)() ? (0, $2KnN7$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $2KnN7$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $2KnN7$useContext)($9bce356509de5990$var$I18nContext);
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
    let [isSSR, setSSR] = (0, $2KnN7$createSignal)((0, $2KnN7$isServer) || (0, $2KnN7$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $2KnN7$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $2KnN7$onSettled)(()=>{
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




parcelRegister("fNnwP", function(module, exports) {

$parcel$export(module.exports, "RouterProvider", function () { return $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb; });
$parcel$export(module.exports, "openLink", function () { return $b7fdaee6ddcf59c4$export$95185d699e05d4d7; });
$parcel$export(module.exports, "useRouter", function () { return $b7fdaee6ddcf59c4$export$9a302a45f65d0572; });
$parcel$export(module.exports, "useLinkProps", function () { return $b7fdaee6ddcf59c4$export$7e924b3091a3bd18; });
$parcel$export(module.exports, "handleLinkClick", function () { return $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f; });


var $jBlzr = parcelRequire("jBlzr");

var $1FDXt = parcelRequire("1FDXt");

const $b7fdaee6ddcf59c4$var$RouterContext = (0, $2KnN7$createContext)({
    isNative: true,
    open: $b7fdaee6ddcf59c4$var$openSyntheticLink,
    useHref: (href)=>href
});
function $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb(props) {
    let ctx = {
        isNative: false,
        open: (target, modifiers, href, routerOptions)=>{
            $b7fdaee6ddcf59c4$var$getSyntheticLink(target, (link)=>{
                if ($b7fdaee6ddcf59c4$export$efa8c9099e530235(link, modifiers)) props.navigate(href, routerOptions);
                else $b7fdaee6ddcf59c4$export$95185d699e05d4d7(link, modifiers);
            });
        },
        useHref: (href)=>props.useHref ? props.useHref(href) : href
    };
    return (0, $2KnN7$createComponent)($b7fdaee6ddcf59c4$var$RouterContext, {
        value: ctx,
        get children () {
            return props.children;
        }
    });
}
function $b7fdaee6ddcf59c4$export$9a302a45f65d0572() {
    return (0, $2KnN7$useContext)($b7fdaee6ddcf59c4$var$RouterContext);
}
function $b7fdaee6ddcf59c4$export$efa8c9099e530235(link, modifiers) {
    // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
    let target = link.getAttribute('target');
    return (!target || target === '_self') && link.origin === location.origin && !link.hasAttribute('download') && !modifiers.metaKey && // open in new tab (mac)
    !modifiers.ctrlKey && // open in new tab (windows)
    !modifiers.altKey && // download
    !modifiers.shiftKey;
}
function $b7fdaee6ddcf59c4$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
    let { metaKey: metaKey, ctrlKey: ctrlKey, altKey: altKey, shiftKey: shiftKey } = modifiers;
    // WebKit does not support firing click events with modifier keys, but does support keyboard events.
    // https://github.com/WebKit/WebKit/blob/c03d0ac6e6db178f90923a0a63080b5ca210d25f/Source/WebCore/html/HTMLAnchorElement.cpp#L184
    let event = (0, $1FDXt.isWebKit)() && (0, $1FDXt.isMac)() && !(0, $1FDXt.isIPad)() && true ? // @ts-ignore - keyIdentifier is a non-standard property, but it's what webkit expects
    new KeyboardEvent('keydown', {
        keyIdentifier: 'Enter',
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey
    }) : new MouseEvent('click', {
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey,
        detail: 1,
        bubbles: true,
        cancelable: true
    });
    $b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = setOpening;
    (0, $jBlzr.focusWithoutScrolling)(target);
    target.dispatchEvent(event);
    $b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = false;
}
// https://github.com/parcel-bundler/parcel/issues/8724
$b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = false;
function $b7fdaee6ddcf59c4$var$getSyntheticLink(target, open) {
    if (target instanceof HTMLAnchorElement) open(target);
    else if (target.hasAttribute('data-href')) {
        let link = document.createElement('a');
        link.href = target.getAttribute('data-href');
        if (target.hasAttribute('data-target')) link.target = target.getAttribute('data-target');
        if (target.hasAttribute('data-rel')) link.rel = target.getAttribute('data-rel');
        if (target.hasAttribute('data-download')) link.download = target.getAttribute('data-download');
        if (target.hasAttribute('data-ping')) link.ping = target.getAttribute('data-ping');
        if (target.hasAttribute('data-referrer-policy')) link.referrerPolicy = target.getAttribute('data-referrer-policy');
        target.appendChild(link);
        open(link);
        target.removeChild(link);
    }
}
function $b7fdaee6ddcf59c4$var$openSyntheticLink(target, modifiers) {
    $b7fdaee6ddcf59c4$var$getSyntheticLink(target, (link)=>$b7fdaee6ddcf59c4$export$95185d699e05d4d7(link, modifiers));
}
function $b7fdaee6ddcf59c4$export$bdc77b0c0a3a85d6(props) {
    let router = $b7fdaee6ddcf59c4$export$9a302a45f65d0572();
    return {
        get 'data-href' () {
            return props.href ? router.useHref(props.href) : undefined;
        },
        get 'data-target' () {
            return props.target;
        },
        get 'data-rel' () {
            return props.rel;
        },
        get 'data-download' () {
            return props.download;
        },
        get 'data-ping' () {
            return props.ping;
        },
        get 'data-referrer-policy' () {
            return props.referrerPolicy;
        }
    };
}
function $b7fdaee6ddcf59c4$export$51437d503373d223(props) {
    return {
        get 'data-href' () {
            return props.href;
        },
        get 'data-target' () {
            return props.target;
        },
        get 'data-rel' () {
            return props.rel;
        },
        get 'data-download' () {
            return props.download;
        },
        get 'data-ping' () {
            return props.ping;
        },
        get 'data-referrer-policy' () {
            return props.referrerPolicy;
        }
    };
}
function $b7fdaee6ddcf59c4$export$7e924b3091a3bd18(props) {
    let router = $b7fdaee6ddcf59c4$export$9a302a45f65d0572();
    const keys = [
        'href',
        'target',
        'rel',
        'download',
        'ping',
        'referrerPolicy'
    ];
    const isLinkKey = (key)=>keys.some((value)=>value === key);
    return new Proxy({}, {
        get: (_, key)=>isLinkKey(key) && props && props[key] !== undefined ? key === 'href' ? router.useHref(props.href ?? '') : props[key] : undefined,
        ownKeys: ()=>keys.filter((key)=>props && key in props && props[key] !== undefined),
        has: (_, key)=>isLinkKey(key) && !!props && key in props && props[key] !== undefined,
        getOwnPropertyDescriptor: (_, key)=>isLinkKey(key) && props && key in props && props[key] !== undefined ? {
                enumerable: true,
                configurable: true
            } : undefined
    });
}
function $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f(e, router, href, routerOptions) {
    // If a custom router is provided, prevent default and forward if this link should client navigate.
    if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && // If props are applied to a router Link component, it may have already prevented default.
    !e.defaultPrevented && $b7fdaee6ddcf59c4$export$efa8c9099e530235(e.currentTarget, e) && href) {
        e.preventDefault();
        router.open(e.currentTarget, e, href, routerOptions);
    }
}

});
parcelRegister("jBlzr", function(module, exports) {

$parcel$export(module.exports, "focusWithoutScrolling", function () { return $e45234824899ea9d$export$de79e2c695e052f3; });
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
 */ function $e45234824899ea9d$export$de79e2c695e052f3(element) {
    element.focus({
        preventScroll: true
    });
}

});

parcelRegister("1FDXt", function(module, exports) {

$parcel$export(module.exports, "isMac", function () { return $13789dac9c7006f0$export$9ac100e40613ea10; });
$parcel$export(module.exports, "isIPad", function () { return $13789dac9c7006f0$export$7bef049ce92e4224; });
$parcel$export(module.exports, "isIOS", function () { return $13789dac9c7006f0$export$fedb369cb70207f1; });
$parcel$export(module.exports, "isWebKit", function () { return $13789dac9c7006f0$export$78551043582a6a98; });
$parcel$export(module.exports, "isChrome", function () { return $13789dac9c7006f0$export$6446a186d09e379e; });
$parcel$export(module.exports, "isAndroid", function () { return $13789dac9c7006f0$export$a11b0059900ceec8; });
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
 */ function $13789dac9c7006f0$var$testUserAgent(re) {
    if (typeof window === 'undefined' || window.navigator == null) return false;
    let brands = window.navigator.userAgentData?.brands;
    return Array.isArray(brands) && brands.some((brand)=>re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $13789dac9c7006f0$var$testPlatform(re) {
    return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.userAgentData?.platform || window.navigator.platform) : false;
}
function $13789dac9c7006f0$var$cached(fn) {
    let res = null;
    return ()=>{
        if (res == null) res = fn();
        return res;
    };
}
const $13789dac9c7006f0$export$9ac100e40613ea10 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^Mac/i);
});
const $13789dac9c7006f0$export$186c6964ca17d99 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^iPhone/i);
});
const $13789dac9c7006f0$export$7bef049ce92e4224 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    $13789dac9c7006f0$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $13789dac9c7006f0$export$fedb369cb70207f1 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$186c6964ca17d99() || $13789dac9c7006f0$export$7bef049ce92e4224();
});
const $13789dac9c7006f0$export$e1865c3bedcd822b = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$9ac100e40613ea10() || $13789dac9c7006f0$export$fedb369cb70207f1();
});
const $13789dac9c7006f0$export$78551043582a6a98 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/AppleWebKit/i) && ($13789dac9c7006f0$export$fedb369cb70207f1() || !$13789dac9c7006f0$export$6446a186d09e379e());
});
const $13789dac9c7006f0$export$95df08bae54cb4df = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$78551043582a6a98() && !$13789dac9c7006f0$export$6446a186d09e379e() && !$13789dac9c7006f0$export$b7d78993b74f766d();
});
const $13789dac9c7006f0$export$6446a186d09e379e = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/Chrome|CriOS|CrMo/i);
});
const $13789dac9c7006f0$export$a11b0059900ceec8 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/Android/i);
});
const $13789dac9c7006f0$export$b7d78993b74f766d = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/(Firefox|FxiOS)/i);
});

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
        let cleanup = (0, $2KnN7$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $2KnN7$untrack)(()=>ref(null));
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
    let [revision, setRevision] = (0, $2KnN7$createSignal)(0);
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
    let detach = (0, $2KnN7$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $2KnN7$onCleanup)(()=>(0, $2KnN7$runWithOwner)(null, detach));
    return attach;
}

});

parcelRegister("6VqtR", function(module, exports) {

$parcel$export(module.exports, "DefaultImageGroup", function () { return $50ac9b7193eef459$export$a37e899304e5fef0; });


const $50ac9b7193eef459$var$defaultContext = {
    revealAll: true,
    register () {},
    unregister () {},
    load () {}
};
const $50ac9b7193eef459$export$a37e899304e5fef0 = $50ac9b7193eef459$export$c991cd1e9f87d921();
function $50ac9b7193eef459$export$c991cd1e9f87d921() {
    return (0, $2KnN7$createContext)($50ac9b7193eef459$var$defaultContext);
}
function $50ac9b7193eef459$var$reducer(state, action) {
    switch(action.type){
        case 'register':
            if (state.loaded.get(action.url) !== false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, false);
                return {
                    loadedAll: false,
                    // If we had previously loaded all items, then reset the timed out state
                    // since this is the first item of a new batch.
                    timedOut: state.loadedAll ? false : state.timedOut,
                    loadStartTime: state.loadedAll ? Date.now() : state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'unregister':
            if (state.loaded.has(action.url)) {
                let loaded = new Map(state.loaded);
                loaded.delete(action.url);
                return {
                    loadedAll: $50ac9b7193eef459$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'load':
            if (state.loaded.get(action.url) === false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, true);
                return {
                    loadedAll: $50ac9b7193eef459$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'timeout':
            if (!state.loadedAll && !state.timedOut) return {
                ...state,
                timedOut: true
            };
            return state;
        default:
            return state;
    }
}
function $50ac9b7193eef459$var$isAllLoaded(loaded) {
    for (let isLoaded of loaded.values()){
        if (!isLoaded) return false;
    }
    return true;
}
function $50ac9b7193eef459$export$1b926c015f09611d(props) {
    // If we are already inside another ImageCoordinator, just pass
    // through children and coordinate loading at the root.
    let ctx = (0, $2KnN7$createMemo)(()=>(0, $2KnN7$useContext)(props.group || $50ac9b7193eef459$export$a37e899304e5fef0));
    return (0, $2KnN7$memo)(()=>(0, $2KnN7$memo)(()=>ctx() !== $50ac9b7193eef459$var$defaultContext)() ? props.children : (0, $2KnN7$createComponent)($50ac9b7193eef459$var$ImageCoordinatorRoot, props));
}
function $50ac9b7193eef459$var$ImageCoordinatorRoot(props) {
    let [state, setState] = (0, $2KnN7$createSignal)({
        loadedAll: true,
        timedOut: false,
        loadStartTime: 0,
        loaded: new Map()
    });
    let dispatch = (action)=>setState((previous)=>$50ac9b7193eef459$var$reducer(previous, action));
    let register = (url)=>{
        dispatch({
            type: 'register',
            url: url
        });
    };
    let unregister = (url)=>{
        dispatch({
            type: 'unregister',
            url: url
        });
    };
    let load = (url)=>{
        dispatch({
            type: 'load',
            url: url
        });
    };
    (0, $2KnN7$createEffect)(()=>({
            loadedAll: state().loadedAll,
            loadStartTime: state().loadStartTime,
            timeout: props.timeout ?? 5000
        }), ({ loadedAll: loadedAll, loadStartTime: loadStartTime, timeout: timeout })=>{
        if (!loadedAll) {
            let timeoutId = setTimeout(()=>{
                dispatch({
                    type: 'timeout'
                });
            }, loadStartTime + timeout - Date.now());
            return ()=>clearTimeout(timeoutId);
        }
    });
    let Group = (0, $2KnN7$dynamic)(()=>props.group || $50ac9b7193eef459$export$a37e899304e5fef0);
    let value = {
        get revealAll () {
            return state().loadedAll || state().timedOut;
        },
        register: register,
        unregister: unregister,
        load: load
    };
    return (0, $2KnN7$createComponent)(Group, {
        value: value,
        get children () {
            return props.children;
        }
    });
}

});

parcelRegister("esT6z", function(module, exports) {

$parcel$export(module.exports, "useLoadingAnimation", function () { return $a87e6cec5d101a93$export$6b288fe07640c94c; });
$parcel$export(module.exports, "SkeletonContext", function () { return $a87e6cec5d101a93$export$74e166679b1f49ee; });
$parcel$export(module.exports, "useIsSkeleton", function () { return $a87e6cec5d101a93$export$4f8dc7555740235c; });
$parcel$export(module.exports, "loadingStyle", function () { return $a87e6cec5d101a93$export$d2353276f167b21f; });
$parcel$export(module.exports, "useSkeletonText", function () { return $a87e6cec5d101a93$export$a05a0b8a311cd65f; });
$parcel$export(module.exports, "SkeletonWrapper", function () { return $a87e6cec5d101a93$export$6069cbe61f690103; });
$parcel$export(module.exports, "useSkeletonIcon", function () { return $a87e6cec5d101a93$export$4b7803c08fe9a32b; });



var $f8FiF = parcelRequire("f8FiF");

var $cJuZp = parcelRequire("cJuZp");

var $5OYjY = parcelRequire("5OYjY");
var $a87e6cec5d101a93$var$_tmpl$ = /*#__PURE__*/ (0, $2KnN7$template)(`<span>`);
function $a87e6cec5d101a93$export$6b288fe07640c94c(isAnimating) {
    let animationRef = null;
    let [element, setElement] = (0, $2KnN7$createSignal)(null);
    let reduceMotion = (0, $5OYjY.useMediaQuery)('(prefers-reduced-motion: reduce)');
    (0, $2KnN7$createEffect)(()=>({
            element: element(),
            isAnimating: typeof isAnimating === 'function' ? isAnimating() : isAnimating,
            reduceMotion: reduceMotion()
        }), ({ element: element, isAnimating: isAnimating, reduceMotion: reduceMotion })=>{
        if (isAnimating && !animationRef && element && !reduceMotion && typeof element.animate === 'function') {
            // Use web animation API instead of CSS animations so that we can
            // synchronize it between all loading elements on the page (via startTime).
            animationRef = element.animate([
                {
                    backgroundPosition: '100%'
                },
                {
                    backgroundPosition: '0%'
                }
            ], {
                duration: 2000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            animationRef.startTime = 0;
        } else if (!isAnimating && animationRef) {
            animationRef.cancel();
            animationRef = null;
        }
    });
    (0, $2KnN7$onCleanup)(()=>animationRef?.cancel());
    return (element)=>{
        setElement(element);
    };
}
const $a87e6cec5d101a93$export$74e166679b1f49ee = (0, $2KnN7$createContext)(null);
function $a87e6cec5d101a93$export$4f8dc7555740235c() {
    return (0, $2KnN7$createMemo)(()=>(0, $2KnN7$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) || false);
}
function $a87e6cec5d101a93$export$8f31e4c4a37b8e9c(props) {
    // Disable all form components inside a skeleton.
    return (0, $2KnN7$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
        get value () {
            return props.isLoading;
        },
        get children () {
            return props.children;
        }
    });
}
const $a87e6cec5d101a93$export$d2353276f167b21f = "bNU3Fb"; // add to a separate layer so it overrides default style macro styles
function $a87e6cec5d101a93$export$a05a0b8a311cd65f(children, style) {
    let isSkeleton = $a87e6cec5d101a93$export$4f8dc7555740235c();
    return [
        ()=>isSkeleton() ? (0, $2KnN7$createComponent)($a87e6cec5d101a93$export$cb6ddd830302c2a8, {
                get children () {
                    return children();
                }
            }) : children(),
        ()=>isSkeleton() ? {
                ...style(),
                // This ensures the ellipsis on truncated text is also hidden.
                // -webkit-text-fill-color overrides any `color` property that is also set.
                '-webkit-text-fill-color': 'transparent'
            } : style()
    ];
}
function $a87e6cec5d101a93$export$cb6ddd830302c2a8(props) {
    var _el$ = (0, $2KnN7$getNextElement)($a87e6cec5d101a93$var$_tmpl$);
    var _ref$ = $a87e6cec5d101a93$export$6b288fe07640c94c(true);
    (typeof _ref$ === "function" || Array.isArray(_ref$)) && (0, $2KnN7$ref)(()=>_ref$, _el$);
    (0, $2KnN7$insert)(_el$, (0, $2KnN7$scope)(()=>props.children));
    (0, $2KnN7$effect)(()=>({
            e: (0, $f8FiF.inertValue)(true),
            t: $a87e6cec5d101a93$export$d2353276f167b21f + " pw18 _ma18 oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-2uZMFe"
        }), ({ e: e, t: t }, _p$)=>{
        e !== _p$?.e && (0, $2KnN7$setAttribute)(_el$, "inert", e);
        (0, $2KnN7$className)(_el$, t, _p$?.t);
    });
    return _el$;
}
function $a87e6cec5d101a93$export$6069cbe61f690103(props) {
    let isLoading = (0, $2KnN7$createMemo)(()=>(0, $2KnN7$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee));
    let animation = $a87e6cec5d101a93$export$6b288fe07640c94c(()=>isLoading() || false);
    const overrides = {
        get ref () {
            return isLoading() ? animation : undefined;
        },
        get className () {
            return isLoading() ? $a87e6cec5d101a93$export$d2353276f167b21f : undefined;
        },
        get inert () {
            return isLoading() ? true : undefined;
        }
    };
    return (0, $2KnN7$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
        value: null,
        get children () {
            return props.children(overrides);
        }
    });
}
// Adds default border radius around icons when displayed in a skeleton.
const $a87e6cec5d101a93$var$skeletonIconStyle = " oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-aBGxE";
function $a87e6cec5d101a93$export$4b7803c08fe9a32b(styles) {
    return (0, $2KnN7$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) ? (0, $cJuZp.mergeStyles)($a87e6cec5d101a93$var$skeletonIconStyle, styles) : styles || '';
}

});
parcelRegister("f8FiF", function(module, exports) {

$parcel$export(module.exports, "inertValue", function () { return $b057a3b5466fa32b$export$a9d04c5684123369; });
function $b057a3b5466fa32b$export$a9d04c5684123369(value) {
    // Native DOM rendering serializes inert as a boolean attribute: true adds it,
    // false removes it. React-version compatibility is not a native concern.
    return value;
}

});

parcelRegister("5OYjY", function(module, exports) {

$parcel$export(module.exports, "useMediaQuery", function () { return $43d069cb2f8e0f47$export$32d5543ab307c01; });
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
parcelRequire("iI6XF");
var $aPfEU = parcelRequire("aPfEU");
function $43d069cb2f8e0f47$export$32d5543ab307c01(query) {
    let supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
    let [matches, setMatches] = (0, $2KnN7$createSignal)(supportsMatchMedia ? window.matchMedia(query).matches : false);
    (0, $2KnN7$createEffect)(()=>query, (query)=>{
        if (!supportsMatchMedia) return;
        let mq = window.matchMedia(query);
        let onChange = (evt)=>{
            setMatches(evt.matches);
        };
        mq.addListener(onChange);
        return ()=>{
            mq.removeListener(onChange);
        };
    });
    // If in SSR, the media query should never match. Once the page hydrates,
    // this will update and the real value will be returned.
    let isSSR = (0, $aPfEU.useIsSSR)();
    return ()=>isSSR() ? false : matches();
}

});
parcelRegister("iI6XF", function(module, exports) {

$parcel$export(module.exports, "useIsSSR", function () { return (parcelRequire("aPfEU")).useIsSSR; });
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
var $aPfEU = parcelRequire("aPfEU");

});
parcelRegister("aPfEU", function(module, exports) {

$parcel$export(module.exports, "useIsSSR", function () { return $7e1ad04bebf79fde$export$535bd6ca7f90a273; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 


var $dyxC2 = parcelRequire("dyxC2");
function $7e1ad04bebf79fde$export$9f8ac96af4b1b2ae(props) {
    return props.children;
}
const $7e1ad04bebf79fde$export$619500959fc48b26 = (0, $dyxC2.useId);
function $7e1ad04bebf79fde$export$535bd6ca7f90a273() {
    const [isSSR, setIsSSR] = (0, $2KnN7$createSignal)((0, $2KnN7$isServer) || (0, $2KnN7$isHydrating)());
    // Reserve the same lifecycle slot on server and client.
    (0, $2KnN7$onSettled)(()=>{
        setIsSSR(false);
    });
    return isSSR;
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
    const prefix = (0, $2KnN7$isServer) || (0, $2KnN7$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $2KnN7$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $2KnN7$createSignal)(undefined, {
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
    register((0, $2KnN7$untrack)(res));
    (0, $2KnN7$createEffect)(res, register);
    (0, $2KnN7$onCleanup)(unregister);
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
    let [resolvedId, setResolvedId] = (0, $2KnN7$createSignal)((0, $2KnN7$untrack)(id1));
    let [publication, setPublication] = (0, $2KnN7$createSignal)(0);
    (0, $2KnN7$onSettled)(()=>{
        const currentId = (0, $2KnN7$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $2KnN7$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $2KnN7$createEffect)(()=>{
        publication();
        return id1();
    }, (currentId)=>{
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    return resolvedId;
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
    let ctx = (0, $2KnN7$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
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
        return (0, $2KnN7$createComponent)(Context, {
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
            return (typeof value === 'function' ? value((0, $2KnN7$merge)(props.values, {
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
    let ctx = (0, $2KnN7$useContext)(context);
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
    let contextProps = (0, $2KnN7$omit)(ctx, 'ref');
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
    let finalProps = (0, $2KnN7$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $2KnN7$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $2KnN7$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $2KnN7$omit)(props, (key)=>key === (0, $2KnN7$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
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
    (0, $2KnN7$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $2KnN7$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $2KnN7$createEffect)(()=>({
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
    (0, $2KnN7$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $2KnN7$untrack)(()=>ref.current);
    });
    let domProps = (0, $2KnN7$merge)((0, $2KnN7$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $2KnN7$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $2KnN7$createComponent)(Host, domProps);
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
        has: (_, key)=>key !== (0, $2KnN7$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $2KnN7$$PROXY) ? undefined : mergeProperty(key)
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
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $2KnN7$clsx)(a, b);
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
    (0, $2KnN7$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $2KnN7$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
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



var $2for9 = parcelRequire("2for9");


var $1a2ff02647122ccf$export$e2255cf6045e8d47 = parcelRequire("2for9").Avatar;
var $1a2ff02647122ccf$export$a20dad690e1279e2 = parcelRequire("2for9").AvatarContext;
export {$1a2ff02647122ccf$export$e2255cf6045e8d47 as Avatar, $1a2ff02647122ccf$export$a20dad690e1279e2 as AvatarContext};
//# sourceMappingURL=Avatar.native.js.map
