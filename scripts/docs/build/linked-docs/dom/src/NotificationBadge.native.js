import "./NotificationBadge.native.css";
import {template as $92Pqa$template, getNextElement as $92Pqa$getNextElement, spread as $92Pqa$spread, ref as $92Pqa$ref, insert as $92Pqa$insert, scope as $92Pqa$scope, runHydrationEvents as $92Pqa$runHydrationEvents, createComponent as $92Pqa$createComponent, memo as $92Pqa$memo, isServer as $92Pqa$isServer, dynamic as $92Pqa$dynamic} from "@solidjs/web";
import {createContext as $92Pqa$createContext, untrack as $92Pqa$untrack, omit as $92Pqa$omit, createMemo as $92Pqa$createMemo, onSettled as $92Pqa$onSettled, createSignal as $92Pqa$createSignal, action as $92Pqa$action, onCleanup as $92Pqa$onCleanup, runWithOwner as $92Pqa$runWithOwner, useContext as $92Pqa$useContext, isHydrating as $92Pqa$isHydrating, merge as $92Pqa$merge, $PROXY as $92Pqa$$PROXY, createEffect as $92Pqa$createEffect, createUniqueId as $92Pqa$createUniqueId} from "solid-js";
import $92Pqa$clsx from "clsx";


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
parcelRegister("k0dKS", function(module, exports) {

$parcel$export(module.exports, "NotificationBadgeContext", function () { return $e8fe7a2fd970d55e$export$9ab75c96ebaa396c; });
$parcel$export(module.exports, "NotificationBadge", function () { return $e8fe7a2fd970d55e$export$529cab0ca6be204e; });

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $dBSpv = parcelRequire("dBSpv");

var $81zYK = parcelRequire("81zYK");


var $eXdQ3 = parcelRequire("eXdQ3");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");
parcelRequire("2fwg4");
var $jeZsY = parcelRequire("jeZsY");

var $1NDEx = parcelRequire("1NDEx");
var $e8fe7a2fd970d55e$var$_tmpl$ = /*#__PURE__*/ (0, $92Pqa$template)(`<span>`);
const $e8fe7a2fd970d55e$export$9ab75c96ebaa396c = (0, $92Pqa$createContext)(null);
const $e8fe7a2fd970d55e$var$badge = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        rules += p[0];
    }
    if (props.isDisabled) {
        rules += ' sk18';
        currentRules["display"] = typeof currentRules["display"] === 'object' ? currentRules["display"] : {
            "default": currentRules["display"]
        };
        currentRules["display"]["isDisabled"] = "none";
    } else {
        rules += ' sd18';
        currentRules["display"] = "flex";
    }
    rules += ' uk18';
    currentRules["fontFamily"] = "sans";
    rules += ' ucJ9TBTb18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ar)"] = "sans";
    rules += ' ud3Euai18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(he)"] = "sans";
    rules += ' uea18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ja)"] = "sans";
    rules += ' ugb18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ko)"] = "sans";
    rules += ' uhd18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh)"] = "sans";
    rules += ' uje18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-hant)"] = "sans";
    rules += ' u2NhKxcl18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-HK)"] = "sans";
    rules += ' uic18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    if (props.size === "XL") {
        rules += ' -_6BNtrc-c18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui";
    } else if (props.size === "L") {
        rules += ' -_6BNtrc-b18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-sm";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-sm";
    } else if (props.size === "M") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"M\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"M\""] = "ui-xs";
    } else if (props.size === "S") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-xs";
    }
    rules += ' xb18';
    currentRules["fontWeight"] = "normal";
    rules += ' _xa18';
    currentRules["fontWeight"] = "normal";
    rules += ' _Fd18';
    currentRules["lineHeight"] = "ui";
    rules += ' _FnuYUweb18';
    currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
        "default": currentRules["lineHeight"]
    };
    currentRules["lineHeight"][":lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    if (props.isStaticColor) {
        rules += ' ph18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isStaticColor"] = "auto";
    } else {
        rules += ' px18';
        currentRules["color"] = "white";
    }
    rules += ' plOVIhfc6LxY918';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"]["forcedColors"] = "ButtonText";
    rules += ' plOVIhfc6LxY918';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    rules += ' _jlOVIhfcf18';
    currentRules["borderStyle"] = typeof currentRules["borderStyle"] === 'object' ? currentRules["borderStyle"] : {
        "default": currentRules["borderStyle"]
    };
    currentRules["borderStyle"]["forcedColors"] = "solid";
    rules += ' _jlOVIhfcf18';
    currentRules["borderStyle"] = typeof currentRules["borderStyle"] === 'object' ? currentRules["borderStyle"] : {
        "default": currentRules["borderStyle"]
    };
    currentRules["borderStyle"][":is([data-hcm], [data-hcm] *)"] = "solid";
    rules += ' _klOVIhfcb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"]["forcedColors"] = "[1px]";
    rules += ' _klOVIhfcb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' hlOVIhfcb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"]["forcedColors"] = "[1px]";
    rules += ' hlOVIhfcb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"]["forcedColors"] = "[1px]";
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"]["forcedColors"] = "[1px]";
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' ilOVIhfcCp4usd18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"]["forcedColors"] = "ButtonBorder";
    rules += ' ilOVIhfcCp4usd18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonBorder";
    rules += ' _Ca18';
    currentRules["justifyContent"] = "center";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' gqMFGYc18';
    rules += ' FRuFGYc18';
    if (props.isSingleDigit) {
        rules += ' fa18';
        currentRules["aspectRatio"] = typeof currentRules["aspectRatio"] === 'object' ? currentRules["aspectRatio"] : {
            "default": currentRules["aspectRatio"]
        };
        currentRules["aspectRatio"]["isSingleDigit"] = "square";
    } else if (props.isIndicatorOnly) {
        rules += ' fa18';
        currentRules["aspectRatio"] = typeof currentRules["aspectRatio"] === 'object' ? currentRules["aspectRatio"] : {
            "default": currentRules["aspectRatio"]
        };
        currentRules["aspectRatio"]["isIndicatorOnly"] = "square";
    }
    if (!width) rules += ' ZK18';
    currentRules["width"] = "max";
    if (props.isDoubleDigit) {
        rules += ' Sv18';
        currentRules["paddingStart"] = typeof currentRules["paddingStart"] === 'object' ? currentRules["paddingStart"] : {
            "default": currentRules["paddingStart"]
        };
        currentRules["paddingStart"]["isDoubleDigit"] = "edge-to-text";
    }
    if (props.isDoubleDigit) {
        rules += ' Rv18';
        currentRules["paddingEnd"] = typeof currentRules["paddingEnd"] === 'object' ? currentRules["paddingEnd"] : {
            "default": currentRules["paddingEnd"]
        };
        currentRules["paddingEnd"]["isDoubleDigit"] = "edge-to-text";
    }
    rules += ' oh18';
    currentRules["borderTopStartRadius"] = "pill";
    rules += ' nh18';
    currentRules["borderTopEndRadius"] = "pill";
    rules += ' kh18';
    currentRules["borderBottomStartRadius"] = "pill";
    rules += ' jh18';
    currentRules["borderBottomEndRadius"] = "pill";
    if (props.isStaticColor) {
        rules += ' -g_-g_c18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["isStaticColor"] = "transparent-overlay-1000";
    } else {
        rules += ' -g_-g218';
        currentRules["backgroundColor"] = "accent";
    }
    rules += ' -g_-lOVIhfcg8qxrJ18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"]["forcedColors"] = "ButtonFace";
    rules += ' -g_-lOVIhfcg8qxrJ18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonFace";
    if (props.size === "XL") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-Fspvr8c18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"XL\" && isIndicatorOnly"] = "[0.8571428571428571em]";
        } else {
            rules += ' -F_-Fd60gf18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"XL\""] = 18;
        }
    } else if (props.size === "L") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-Fspvr8c18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"L\" && isIndicatorOnly"] = "[0.8571428571428571em]";
        } else {
            rules += ' -F_-FxhYlec18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"L\""] = 16;
        }
    } else if (props.size === "M") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-F7wvBT18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"M\" && isIndicatorOnly"] = 8;
        } else {
            rules += ' -F_-FObNfn18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"M\""] = "1lh";
        }
    } else if (props.size === "S") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-F7wvBT18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"S\" && isIndicatorOnly"] = 8;
        } else {
            rules += ' -F_-FAMzobb18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"S\""] = 12;
        }
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/NotificationBadge.native.js:20:14";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/NotificationBadge.native.js:20:14"
        };
    }
    return rules;
};
function $e8fe7a2fd970d55e$export$529cab0ca6be204e(inputProps) {
    let stringFormatter = (0, $jeZsY.useLocalizedStringFormatter)((0, $dBSpv.default), '@react-spectrum/s2');
    let [input, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $92Pqa$untrack)(()=>inputProps.ref), $e8fe7a2fd970d55e$export$9ab75c96ebaa396c);
    let props = input;
    let otherProps = (0, $92Pqa$omit)(props, 'size', 'value', 'isDisabled', 'staticColor');
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let locale = (0, $dnlDG.useLocale)();
    let valueInfo = (0, $92Pqa$createMemo)(()=>{
        let value = props.value;
        let formattedValue = '';
        let isIndicatorOnly = false;
        let isSingleDigit = false;
        let isDoubleDigit = false;
        if (value == null) isIndicatorOnly = true;
        else if (value <= 0) throw new Error('Value cannot be negative or zero');
        else if (!Number.isInteger(value)) throw new Error('Value must be a positive integer');
        else {
            formattedValue = new (0, $81zYK.NumberFormatter)(locale.locale).format(Math.min(value, 99));
            let length = Math.log(value <= 99 ? value : 99) * Math.LOG10E + 1 | 0; // for positive integers (https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript)
            if (length === 1) isSingleDigit = true;
            else if (length === 2) isDoubleDigit = true;
            if (value > 99) formattedValue = stringFormatter.format('notificationbadge.plus', {
                notifications: formattedValue
            });
        }
        return {
            formattedValue: formattedValue,
            isIndicatorOnly: isIndicatorOnly,
            isSingleDigit: isSingleDigit,
            isDoubleDigit: isDoubleDigit
        };
    });
    let ariaLabel = ()=>props['aria-label'] || (valueInfo().isIndicatorOnly ? stringFormatter.format('notificationbadge.indicatorOnly') : undefined);
    var _el$ = (0, $92Pqa$getNextElement)($e8fe7a2fd970d55e$var$_tmpl$);
    (0, $92Pqa$spread)(_el$, [
        ()=>(0, $5gAIA.filterDOMProps)(otherProps, {
                labelable: true
            }),
        {
            get role () {
                return ariaLabel() ? 'img' : undefined;
            },
            get "aria-label" () {
                return ariaLabel();
            },
            get "class" () {
                return (props.UNSAFE_className || '') + $e8fe7a2fd970d55e$var$badge({
                    size: props.size ?? 'S',
                    isIndicatorOnly: valueInfo().isIndicatorOnly,
                    isSingleDigit: valueInfo().isSingleDigit,
                    isDoubleDigit: valueInfo().isDoubleDigit,
                    isDisabled: props.isDisabled ?? false,
                    isStaticColor: !!props.staticColor
                }, props.styles);
            },
            get style () {
                return props.UNSAFE_style;
            }
        }
    ], true);
    (0, $92Pqa$ref)(()=>(node)=>domRef(node), _el$);
    (0, $92Pqa$insert)(_el$, (0, $92Pqa$scope)(()=>valueInfo().formattedValue));
    (0, $92Pqa$runHydrationEvents)();
    return _el$;
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


parcelRegister("dBSpv", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $9e88efdb2e50319b$export$2e2bcd8739ae039; });
var $9e88efdb2e50319b$export$2e2bcd8739ae039 = {
    "ar-AE": {
        "actionbar.actions": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "actionbar.actionsAvailable": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A} \u{627}\u{644}\u{645}\u{62A}\u{627}\u{62D}\u{629}.`,
        "actionbar.clearSelection": `\u{625}\u{632}\u{627}\u{644}\u{629} \u{627}\u{644}\u{62A}\u{62D}\u{62F}\u{64A}\u{62F}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{63A}\u{64A}\u{631} \u{645}\u{62D}\u{62F}\u{62F}`,
                other: ()=>`${formatter.number(args.count)} \u{645}\u{62D}\u{62F}\u{62F}`
            })}`,
        "actionbar.selectedAll": `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{627}\u{644}\u{643}\u{644}`,
        "actionbutton.pending": `\u{642}\u{64A}\u{62F} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{638}\u{627}\u{631}`,
        "breadcrumbs.more": `\u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F} \u{645}\u{646} \u{627}\u{644}\u{639}\u{646}\u{627}\u{635}\u{631}`,
        "button.pending": `\u{642}\u{64A}\u{62F} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{638}\u{627}\u{631}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{627}\u{644}\u{62A}\u{627}\u{631}\u{64A}\u{62E}`,
                other: `\u{627}\u{644}\u{62A}\u{648}\u{627}\u{631}\u{64A}\u{62E}`
            })} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}/\u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}\u{629} \u{63A}\u{64A}\u{631} \u{645}\u{62A}\u{648}\u{641}\u{631}\u{629}.`,
        "combobox.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "combobox.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "combobox.noResults": `\u{644}\u{627} \u{62A}\u{648}\u{62C}\u{62F} \u{646}\u{62A}\u{627}\u{626}\u{62C}`,
        "contextualhelp.help": `\u{645}\u{633}\u{627}\u{639}\u{62F}\u{629}`,
        "contextualhelp.info": `\u{645}\u{639}\u{644}\u{648}\u{645}\u{627}\u{62A}`,
        "datepicker.endTime": `\u{648}\u{642}\u{62A} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{647}\u{627}\u{621}`,
        "datepicker.startTime": `\u{648}\u{642}\u{62A} \u{627}\u{644}\u{628}\u{62F}\u{621}`,
        "datepicker.time": `\u{627}\u{644}\u{648}\u{642}\u{62A}`,
        "dialog.alert": `\u{62A}\u{646}\u{628}\u{64A}\u{647}`,
        "dialog.dismiss": `\u{62A}\u{62C}\u{627}\u{647}\u{644}`,
        "dropzone.replaceMessage": `\u{644}\u{644}\u{627}\u{633}\u{62A}\u{628}\u{62F}\u{627}\u{644}\u{60C} \u{642}\u{645} \u{628}\u{625}\u{641}\u{644}\u{627}\u{62A} \u{627}\u{644}\u{645}\u{644}\u{641}`,
        "inlinealert.informative": `\u{645}\u{639}\u{644}\u{648}\u{645}\u{627}\u{62A}`,
        "inlinealert.negative": `\u{62E}\u{637}\u{623}`,
        "inlinealert.notice": `\u{62A}\u{62D}\u{630}\u{64A}\u{631}`,
        "inlinealert.positive": `\u{62A}\u{645} \u{628}\u{646}\u{62C}\u{627}\u{62D}`,
        "label.(optional)": `(\u{627}\u{62E}\u{62A}\u{64A}\u{627}\u{631}\u{64A})`,
        "label.(required)": `(\u{645}\u{637}\u{644}\u{648}\u{628})`,
        "listview.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "listview.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "menu.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "menu.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "menu.moreActions": `\u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F} \u{645}\u{646} \u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "menu.noResults": `\u{644}\u{627} \u{62A}\u{648}\u{62C}\u{62F} \u{646}\u{62A}\u{627}\u{626}\u{62C}`,
        "menu.unavailable": `\u{63A}\u{64A}\u{631} \u{645}\u{64F}\u{62A}\u{648}\u{641}\u{631}\u{60C} \u{642}\u{64F}\u{645} \u{628}\u{627}\u{644}\u{62A}\u{648}\u{633}\u{64A}\u{639} \u{644}\u{644}\u{62D}\u{635}\u{648}\u{644} \u{639}\u{644}\u{649} \u{627}\u{644}\u{62A}\u{641}\u{627}\u{635}\u{64A}\u{644}`,
        "notificationbadge.indicatorOnly": `\u{646}\u{634}\u{627}\u{637} \u{62C}\u{62F}\u{64A}\u{62F}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "picker.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "picker.placeholder": `\u{62A}\u{62D}\u{62F}\u{64A}\u{62F}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{644}\u{645} \u{64A}\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{623}\u{64A} \u{639}\u{646}\u{635}\u{631}`,
                one: `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{639}\u{646}\u{635}\u{631} \u{648}\u{627}\u{62D}\u{62F}`,
                two: `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{639}\u{646}\u{635}\u{631}\u{64A}\u{646}`,
                few: ()=>`\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} ${formatter.number(args.count)} \u{639}\u{646}\u{627}\u{635}\u{631}`,
                other: ()=>`\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} ${formatter.number(args.count)} \u{639}\u{646}\u{635}\u{631}`
            })}`,
        "sidepanel.collapse": `\u{637}\u{64A} \u{627}\u{644}\u{644}\u{648}\u{62D}\u{629} \u{627}\u{644}\u{62C}\u{627}\u{646}\u{628}\u{64A}\u{629}`,
        "sidepanel.expand": `\u{62A}\u{648}\u{633}\u{64A}\u{639} \u{627}\u{644}\u{644}\u{648}\u{62D}\u{629} \u{627}\u{644}\u{62C}\u{627}\u{646}\u{628}\u{64A}\u{629}`,
        "slider.maximum": `\u{623}\u{642}\u{635}\u{649}`,
        "slider.minimum": `\u{623}\u{62F}\u{646}\u{649}`,
        "table.cancel": `\u{625}\u{644}\u{63A}\u{627}\u{621}`,
        "table.drag": `\u{633}\u{62D}\u{628}`,
        "table.editCell": `\u{62A}\u{639}\u{62F}\u{64A}\u{644} \u{627}\u{644}\u{62E}\u{644}\u{64A}\u{629}`,
        "table.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "table.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "table.resizeColumn": `\u{62A}\u{63A}\u{64A}\u{64A}\u{631} \u{62D}\u{62C}\u{645} \u{627}\u{644}\u{639}\u{645}\u{648}\u{62F}`,
        "table.save": `\u{62D}\u{641}\u{638}`,
        "table.sortAscending": `\u{641}\u{631}\u{632} \u{628}\u{62A}\u{631}\u{62A}\u{64A}\u{628} \u{62A}\u{635}\u{627}\u{639}\u{62F}\u{64A}`,
        "table.sortDescending": `\u{641}\u{631}\u{632} \u{628}\u{62A}\u{631}\u{62A}\u{64A}\u{628} \u{62A}\u{646}\u{627}\u{632}\u{644}\u{64A}`,
        "tag.actions": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "tag.hideButtonLabel": `\u{625}\u{638}\u{647}\u{627}\u{631} \u{623}\u{642}\u{644}`,
        "tag.noTags": `\u{628}\u{62F}\u{648}\u{646}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{639}\u{631}\u{636} \u{627}\u{644}\u{643}\u{644} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{645}\u{633}\u{62D} \u{627}\u{644}\u{643}\u{644}`,
        "toast.collapse": `\u{637}\u{64A}`,
        "toast.showAll": `\u{625}\u{638}\u{647}\u{627}\u{631} \u{627}\u{644}\u{643}\u{644}`,
        "treeview.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`
    },
    "bg-BG": {
        "actionbar.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "actionbar.actionsAvailable": `\u{41D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{438} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}.`,
        "actionbar.clearSelection": `\u{418}\u{437}\u{447}\u{438}\u{441}\u{442}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{438}\u{437}\u{431}\u{43E}\u{440}\u{430}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{44F}\u{43C}\u{430} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`,
                one: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}`,
                other: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`
            })}`,
        "actionbar.selectedAll": `\u{412}\u{441}\u{438}\u{447}\u{43A}\u{438} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`,
        "actionbutton.pending": `\u{43D}\u{435}\u{434}\u{43E}\u{432}\u{44A}\u{440}\u{448}\u{435}\u{43D}\u{43E}`,
        "breadcrumbs.more": `\u{41E}\u{449}\u{435} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`,
        "button.pending": `\u{43D}\u{435}\u{434}\u{43E}\u{432}\u{44A}\u{440}\u{448}\u{435}\u{43D}\u{43E}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{430}\u{442}\u{430} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435} \u{435} \u{43D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{430}`,
                other: `\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{442}\u{435} \u{434}\u{430}\u{442}\u{438} \u{43D}\u{435} \u{441}\u{430} \u{43D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{438}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "combobox.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "combobox.noResults": `\u{41D}\u{44F}\u{43C}\u{430} \u{440}\u{435}\u{437}\u{443}\u{43B}\u{442}\u{430}\u{442}\u{438}`,
        "contextualhelp.help": `\u{41F}\u{43E}\u{43C}\u{43E}\u{449}`,
        "contextualhelp.info": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "datepicker.endTime": `\u{41A}\u{440}\u{430}\u{435}\u{43D} \u{447}\u{430}\u{441}`,
        "datepicker.startTime": `\u{41D}\u{430}\u{447}\u{430}\u{43B}\u{435}\u{43D} \u{447}\u{430}\u{441}`,
        "datepicker.time": `\u{412}\u{440}\u{435}\u{43C}\u{435}`,
        "dialog.alert": `\u{421}\u{438}\u{433}\u{43D}\u{430}\u{43B}`,
        "dialog.dismiss": `\u{41E}\u{442}\u{445}\u{432}\u{44A}\u{440}\u{43B}\u{44F}\u{43D}\u{435}`,
        "dropzone.replaceMessage": `\u{41F}\u{443}\u{441}\u{43D}\u{435}\u{442}\u{435} \u{444}\u{430}\u{439}\u{43B} \u{437}\u{430} \u{437}\u{430}\u{43C}\u{44F}\u{43D}\u{430}`,
        "inlinealert.informative": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "inlinealert.negative": `\u{413}\u{440}\u{435}\u{448}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{435}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{43D}\u{435}\u{437}\u{430}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E})`,
        "label.(required)": `(\u{437}\u{430}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "listview.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "menu.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "menu.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "menu.moreActions": `\u{41F}\u{43E}\u{432}\u{435}\u{447}\u{435} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "menu.noResults": `\u{41D}\u{44F}\u{43C}\u{430} \u{440}\u{435}\u{437}\u{443}\u{43B}\u{442}\u{430}\u{442}\u{438}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{44A}\u{43F}\u{43D}\u{43E}, \u{440}\u{430}\u{437}\u{433}\u{44A}\u{43D}\u{435}\u{442}\u{435} \u{437}\u{430} \u{43F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{43E}\u{441}\u{442}\u{438}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430} \u{434}\u{435}\u{439}\u{43D}\u{43E}\u{441}\u{442}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "picker.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "picker.placeholder": `\u{418}\u{437}\u{431}\u{435}\u{440}\u{435}\u{442}\u{435}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{44F}\u{43C}\u{430} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`,
                one: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
                other: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`
            })}`,
        "sidepanel.collapse": `\u{421}\u{433}\u{44A}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{441}\u{442}\u{440}\u{430}\u{43D}\u{438}\u{447}\u{43D}\u{438}\u{44F} \u{43F}\u{430}\u{43D}\u{435}\u{43B}`,
        "sidepanel.expand": `\u{420}\u{430}\u{437}\u{433}\u{44A}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{441}\u{442}\u{440}\u{430}\u{43D}\u{438}\u{447}\u{43D}\u{438}\u{44F} \u{43F}\u{430}\u{43D}\u{435}\u{43B}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{438}\u{43D}\u{438}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{41E}\u{442}\u{43A}\u{430}\u{437}`,
        "table.drag": `\u{41F}\u{43B}\u{44A}\u{437}\u{43D}\u{435}\u{442}\u{435}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{43A}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43A}\u{43B}\u{435}\u{442}\u{43A}\u{430}`,
        "table.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "table.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "table.resizeColumn": `\u{41F}\u{440}\u{435}\u{43E}\u{440}\u{430}\u{437}\u{43C}\u{435}\u{440}\u{44F}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43A}\u{43E}\u{43B}\u{43E}\u{43D}\u{430}`,
        "table.save": `\u{417}\u{430}\u{43F}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435}`,
        "table.sortAscending": `\u{412}\u{44A}\u{437}\u{445}\u{43E}\u{434}\u{44F}\u{449}\u{43E} \u{441}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435}`,
        "table.sortDescending": `\u{41D}\u{438}\u{437}\u{445}\u{43E}\u{434}\u{44F}\u{449}\u{43E} \u{441}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435} `,
        "tag.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43F}\u{43E}-\u{43C}\u{430}\u{43B}\u{43A}\u{43E}`,
        "tag.noTags": `\u{41D}\u{438}\u{442}\u{43E} \u{435}\u{434}\u{438}\u{43D}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{418}\u{437}\u{447}\u{438}\u{441}\u{442}\u{438} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438}`,
        "toast.collapse": `\u{421}\u{432}\u{438}\u{432}\u{430}\u{43D}\u{435}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{436}\u{438} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438}`,
        "treeview.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`
    },
    "cs-CZ": {
        "actionbar.actions": `Akce`,
        "actionbar.actionsAvailable": `Dostupn\xe9 akce.`,
        "actionbar.clearSelection": `Vymazat v\xfdb\u{11B}r`,
        "actionbar.selected": (args)=>`Vybr\xe1no: ${args.count}`,
        "actionbar.selectedAll": `Vybr\xe1no v\u{161}e`,
        "actionbutton.pending": `\u{10D}ek\xe1 na vy\u{159}\xedzen\xed`,
        "breadcrumbs.more": `Dal\u{161}\xed polo\u{17E}ky`,
        "button.pending": `\u{10D}ek\xe1 na vy\u{159}\xedzen\xed`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Vybran\xe9 datum nen\xed`,
                other: `Vybran\xe1 data nejsou`
            })} k dispozici.`,
        "combobox.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "combobox.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "combobox.noResults": `\u{17D}\xe1dn\xe9 v\xfdsledky`,
        "contextualhelp.help": `N\xe1pov\u{11B}da`,
        "contextualhelp.info": `Informace`,
        "datepicker.endTime": `Kone\u{10D}n\xfd \u{10D}as`,
        "datepicker.startTime": `Po\u{10D}\xe1te\u{10D}n\xed \u{10D}as`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `V\xfdstraha`,
        "dialog.dismiss": `Odstranit`,
        "dropzone.replaceMessage": `P\u{159}et\xe1hn\u{11B}te soubor k nahrazen\xed`,
        "inlinealert.informative": `Informace`,
        "inlinealert.negative": `Chyba`,
        "inlinealert.notice": `Varov\xe1n\xed`,
        "inlinealert.positive": `\xdasp\u{11B}ch`,
        "label.(optional)": `(voliteln\u{11B})`,
        "label.(required)": `(po\u{17E}adov\xe1no)`,
        "listview.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "listview.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "menu.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "menu.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "menu.moreActions": `Dal\u{161}\xed akce`,
        "menu.noResults": `\u{17D}\xe1dn\xe9 v\xfdsledky`,
        "menu.unavailable": `Nen\xed k dispozici, rozbalen\xedm zobraz\xedte podrobnosti`,
        "notificationbadge.indicatorOnly": `Nov\xe1 aktivita`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "picker.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "picker.placeholder": `Vybrat\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nevybr\xe1ny \u{17E}\xe1dn\xe9 polo\u{17E}ky`,
                one: ()=>`Vybr\xe1na ${formatter.number(args.count)} polo\u{17E}ka`,
                few: ()=>`Vybr\xe1ny ${formatter.number(args.count)} polo\u{17E}ky`,
                other: ()=>`Vybr\xe1no ${formatter.number(args.count)} polo\u{17E}ek`
            })}`,
        "sidepanel.collapse": `Sbalit postrann\xed panel`,
        "sidepanel.expand": `Rozbalit postrann\xed panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Zru\u{161}it`,
        "table.drag": `P\u{159}et\xe1hnout`,
        "table.editCell": `Upravit bu\u{148}ku`,
        "table.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "table.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "table.resizeColumn": `Zm\u{11B}nit velikost sloupce`,
        "table.save": `Ulo\u{17E}it`,
        "table.sortAscending": `Se\u{159}adit vzestupn\u{11B}`,
        "table.sortDescending": `Se\u{159}adit sestupn\u{11B}`,
        "tag.actions": `Akce`,
        "tag.hideButtonLabel": `Zobrazit m\xe9n\u{11B}`,
        "tag.noTags": `\u{17D}\xe1dn\xfd`,
        "tag.showAllButtonLabel": (args, formatter)=>`Zobrazit v\u{161}e (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Smazat v\u{161}e`,
        "toast.collapse": `Sbalit`,
        "toast.showAll": `Zobrazit v\u{161}e`,
        "treeview.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`
    },
    "da-DK": {
        "actionbar.actions": `Handlinger`,
        "actionbar.actionsAvailable": `Tilg\xe6ngelige handlinger.`,
        "actionbar.clearSelection": `Ryd markering`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen valgt`,
                other: ()=>`${formatter.number(args.count)} valgt`
            })}`,
        "actionbar.selectedAll": `Alle valgt`,
        "actionbutton.pending": `afventende`,
        "breadcrumbs.more": `Flere elementer`,
        "button.pending": `afventende`,
        "calendar.invalidSelection": (args, formatter)=>`Valgte ${formatter.plural(args.selectedCount, {
                one: `dato`,
                other: `datoer`
            })} ikke ledige.`,
        "combobox.loading": `Indl\xe6ser...`,
        "combobox.loadingMore": `Indl\xe6ser flere...`,
        "combobox.noResults": `Ingen resultater`,
        "contextualhelp.help": `Hj\xe6lp`,
        "contextualhelp.info": `Oplysninger`,
        "datepicker.endTime": `Sluttidspunkt`,
        "datepicker.startTime": `Starttidspunkt`,
        "datepicker.time": `Klokkesl\xe6t`,
        "dialog.alert": `Advarsel`,
        "dialog.dismiss": `Luk`,
        "dropzone.replaceMessage": `Drop fil for at erstatte`,
        "inlinealert.informative": `Oplysninger`,
        "inlinealert.negative": `Fejl`,
        "inlinealert.notice": `Advarsel`,
        "inlinealert.positive": `Fuldf\xf8rt`,
        "label.(optional)": `(valgfrit)`,
        "label.(required)": `(obligatorisk)`,
        "listview.loading": `Indl\xe6ser...`,
        "listview.loadingMore": `Indl\xe6ser flere...`,
        "menu.loading": `Indl\xe6ser...`,
        "menu.loadingMore": `Indl\xe6ser flere...`,
        "menu.moreActions": `Flere handlinger`,
        "menu.noResults": `Ingen resultater`,
        "menu.unavailable": `Ikke tilg\xe6ngelig, udvid for detaljer`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Indl\xe6ser...`,
        "picker.loadingMore": `Indl\xe6ser flere...`,
        "picker.placeholder": `V\xe6lg\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen elementer valgt`,
                one: ()=>`${formatter.number(args.count)} element valgt`,
                other: ()=>`${formatter.number(args.count)} elementer valgt`
            })}`,
        "sidepanel.collapse": `Skjul sidepanel`,
        "sidepanel.expand": `Udvid sidepanel`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuller`,
        "table.drag": `Tr\xe6k`,
        "table.editCell": `Rediger celle`,
        "table.loading": `Indl\xe6ser...`,
        "table.loadingMore": `Indl\xe6ser flere...`,
        "table.resizeColumn": `Tilpas st\xf8rrelse p\xe5 kolonne`,
        "table.save": `Gem`,
        "table.sortAscending": `Sorter stigende`,
        "table.sortDescending": `Sorter faldende`,
        "tag.actions": `Handlinger`,
        "tag.hideButtonLabel": `Vis mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Vis alle (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Ryd alle`,
        "toast.collapse": `Skjul`,
        "toast.showAll": `Vis alle`,
        "treeview.loadingMore": `Indl\xe6ser flere...`
    },
    "de-DE": {
        "actionbar.actions": `Aktionen`,
        "actionbar.actionsAvailable": `Aktionen verf\xfcgbar.`,
        "actionbar.clearSelection": `Auswahl l\xf6schen`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nichts ausgew\xe4hlt`,
                one: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`,
                other: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`
            })}`,
        "actionbar.selectedAll": `Alles ausgew\xe4hlt`,
        "actionbutton.pending": `Ausstehend`,
        "breadcrumbs.more": `Weitere Elemente`,
        "button.pending": `Ausstehend`,
        "calendar.invalidSelection": (args, formatter)=>`Ausgew\xe4hlte(s) ${formatter.plural(args.selectedCount, {
                one: `Datum`,
                other: `Daten`
            })} nicht verf\xfcgbar.`,
        "combobox.loading": `Laden...`,
        "combobox.loadingMore": `Mehr laden ...`,
        "combobox.noResults": `Keine Ergebnisse`,
        "contextualhelp.help": `Hilfe`,
        "contextualhelp.info": `Informationen`,
        "datepicker.endTime": `Endzeit`,
        "datepicker.startTime": `Startzeit`,
        "datepicker.time": `Uhrzeit`,
        "dialog.alert": `Warnhinweis`,
        "dialog.dismiss": `Schlie\xdfen`,
        "dropzone.replaceMessage": `Datei zum Ersetzen ablegen`,
        "inlinealert.informative": `Informationen`,
        "inlinealert.negative": `Fehler`,
        "inlinealert.notice": `Warnung`,
        "inlinealert.positive": `Erfolg`,
        "label.(optional)": `(optional)`,
        "label.(required)": `(erforderlich)`,
        "listview.loading": `Laden...`,
        "listview.loadingMore": `Mehr laden ...`,
        "menu.loading": `Laden...`,
        "menu.loadingMore": `Mehr laden ...`,
        "menu.moreActions": `Mehr Aktionen`,
        "menu.noResults": `Keine Ergebnisse`,
        "menu.unavailable": `Nicht verf\xfcgbar, f\xfcr Details erweitern`,
        "notificationbadge.indicatorOnly": `Neue Aktivit\xe4t`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laden...`,
        "picker.loadingMore": `Mehr laden ...`,
        "picker.placeholder": `Ausw\xe4hlen\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Keine Elemente ausgew\xe4hlt`,
                one: ()=>`${formatter.number(args.count)} Element ausgew\xe4hlt`,
                other: ()=>`${formatter.number(args.count)} Elemente ausgew\xe4hlt`
            })}`,
        "sidepanel.collapse": `Seitliches Panel reduzieren`,
        "sidepanel.expand": `Seitliches Panel erweitern`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Abbrechen`,
        "table.drag": `Ziehen`,
        "table.editCell": `Zelle bearbeiten`,
        "table.loading": `Laden...`,
        "table.loadingMore": `Mehr laden ...`,
        "table.resizeColumn": `Spaltengr\xf6\xdfe \xe4ndern`,
        "table.save": `Speichern`,
        "table.sortAscending": `Aufsteigend sortieren`,
        "table.sortDescending": `Absteigend sortieren`,
        "tag.actions": `Aktionen`,
        "tag.hideButtonLabel": `Weniger zeigen`,
        "tag.noTags": `Keine`,
        "tag.showAllButtonLabel": (args, formatter)=>`Alle anzeigen (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Alle l\xf6schen`,
        "toast.collapse": `Reduzieren`,
        "toast.showAll": `Alle anzeigen`,
        "treeview.loadingMore": `Mehr laden ...`
    },
    "el-GR": {
        "actionbar.actions": `\u{395}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "actionbar.actionsAvailable": `\u{3A5}\u{3C0}\u{3AC}\u{3C1}\u{3C7}\u{3BF}\u{3C5}\u{3BD} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B5}\u{3C2} \u{3B5}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}.`,
        "actionbar.clearSelection": `\u{395}\u{3BA}\u{3BA}\u{3B1}\u{3B8}\u{3AC}\u{3C1}\u{3B9}\u{3C3}\u{3B7} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}\u{3C2}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{394}\u{3B5}\u{3BD} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} \u{3BA}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1}`,
                one: ()=>`${formatter.number(args.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF}`,
                other: ()=>`${formatter.number(args.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1}`
            })}`,
        "actionbar.selectedAll": `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} \u{3CC}\u{3BB}\u{3B1}`,
        "actionbutton.pending": `\u{3C3}\u{3B5} \u{3B5}\u{3BA}\u{3BA}\u{3C1}\u{3B5}\u{3BC}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "breadcrumbs.more": `\u{3A0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`,
        "button.pending": `\u{3C3}\u{3B5} \u{3B5}\u{3BA}\u{3BA}\u{3C1}\u{3B5}\u{3BC}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{397} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B1} \u{3B4}\u{3B5}\u{3BD} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B7}`,
                other: `\u{39F}\u{3B9} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B5}\u{3C2} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B5}\u{3C2} \u{3B4}\u{3B5}\u{3BD} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B5}\u{3C2}`
            })}.`,
        "combobox.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "combobox.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "combobox.noResults": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1} \u{3B1}\u{3C0}\u{3BF}\u{3C4}\u{3AD}\u{3BB}\u{3B5}\u{3C3}\u{3BC}\u{3B1}`,
        "contextualhelp.help": `\u{392}\u{3BF}\u{3AE}\u{3B8}\u{3B5}\u{3B9}\u{3B1}`,
        "contextualhelp.info": `\u{3A0}\u{3BB}\u{3B7}\u{3C1}\u{3BF}\u{3C6}\u{3BF}\u{3C1}\u{3AF}\u{3B5}\u{3C2}`,
        "datepicker.endTime": `\u{3A7}\u{3C1}\u{3CC}\u{3BD}\u{3BF}\u{3C2} \u{3BB}\u{3AE}\u{3BE}\u{3B7}\u{3C2}`,
        "datepicker.startTime": `\u{38F}\u{3C1}\u{3B1} \u{3AD}\u{3BD}\u{3B1}\u{3C1}\u{3BE}\u{3B7}\u{3C2}`,
        "datepicker.time": `\u{3A7}\u{3C1}\u{3CC}\u{3BD}\u{3BF}\u{3C2}`,
        "dialog.alert": `\u{395}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3AF}\u{3B7}\u{3C3}\u{3B7}`,
        "dialog.dismiss": `\u{391}\u{3C0}\u{3CC}\u{3C1}\u{3C1}\u{3B9}\u{3C8}\u{3B7}`,
        "dropzone.replaceMessage": `\u{391}\u{3C0}\u{3CC}\u{3B8}\u{3B5}\u{3C3}\u{3B7} \u{3B1}\u{3C1}\u{3C7}\u{3B5}\u{3AF}\u{3BF}\u{3C5} \u{3B3}\u{3B9}\u{3B1} \u{3B1}\u{3BD}\u{3C4}\u{3B9}\u{3BA}\u{3B1}\u{3C4}\u{3AC}\u{3C3}\u{3C4}\u{3B1}\u{3C3}\u{3B7}`,
        "inlinealert.informative": `\u{3A0}\u{3BB}\u{3B7}\u{3C1}\u{3BF}\u{3C6}\u{3BF}\u{3C1}\u{3AF}\u{3B5}\u{3C2}`,
        "inlinealert.negative": `\u{3A3}\u{3C6}\u{3AC}\u{3BB}\u{3BC}\u{3B1}`,
        "inlinealert.notice": `\u{3A0}\u{3C1}\u{3BF}\u{3B5}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3AF}\u{3B7}\u{3C3}\u{3B7}`,
        "inlinealert.positive": `\u{395}\u{3C0}\u{3B9}\u{3C4}\u{3C5}\u{3C7}\u{3AF}\u{3B1}`,
        "label.(optional)": `(\u{3C0}\u{3C1}\u{3BF}\u{3B1}\u{3B9}\u{3C1}\u{3B5}\u{3C4}\u{3B9}\u{3BA}\u{3CC})`,
        "label.(required)": `(\u{3B1}\u{3C0}\u{3B1}\u{3B9}\u{3C4}\u{3B5}\u{3AF}\u{3C4}\u{3B1}\u{3B9})`,
        "listview.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "listview.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "menu.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "menu.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "menu.moreActions": `\u{3A0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3B5}\u{3C2} \u{3B5}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "menu.noResults": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1} \u{3B1}\u{3C0}\u{3BF}\u{3C4}\u{3AD}\u{3BB}\u{3B5}\u{3C3}\u{3BC}\u{3B1}`,
        "menu.unavailable": `\u{39C}\u{3B7} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3BF}, \u{3B1}\u{3BD}\u{3AC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7} \u{3B3}\u{3B9}\u{3B1} \u{3BB}\u{3B5}\u{3C0}\u{3C4}\u{3BF}\u{3BC}\u{3AD}\u{3C1}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "notificationbadge.indicatorOnly": `\u{39D}\u{3AD}\u{3B1} \u{3B4}\u{3C1}\u{3B1}\u{3C3}\u{3C4}\u{3B7}\u{3C1}\u{3B9}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "picker.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "picker.placeholder": `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{394}\u{3B5}\u{3BD} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`,
                one: ()=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} ${formatter.number(args.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
                other: ()=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} ${formatter.number(args.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
            })}`,
        "sidepanel.collapse": `\u{3A3}\u{3CD}\u{3BC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7} \u{3C0}\u{3BB}\u{3B5}\u{3C5}\u{3C1}\u{3B9}\u{3BA}\u{3BF}\u{3CD} \u{3C0}\u{3BB}\u{3B1}\u{3B9}\u{3C3}\u{3AF}\u{3BF}\u{3C5}`,
        "sidepanel.expand": `\u{395}\u{3C0}\u{3AD}\u{3BA}\u{3C4}\u{3B1}\u{3C3}\u{3B7} \u{3C0}\u{3BB}\u{3B5}\u{3C5}\u{3C1}\u{3B9}\u{3BA}\u{3BF}\u{3CD} \u{3C0}\u{3BB}\u{3B1}\u{3B9}\u{3C3}\u{3AF}\u{3BF}\u{3C5}`,
        "slider.maximum": `\u{39C}\u{3AD}\u{3B3}\u{3B9}\u{3C3}\u{3C4}\u{3BF}`,
        "slider.minimum": `\u{395}\u{3BB}\u{3AC}\u{3C7}\u{3B9}\u{3C3}\u{3C4}\u{3BF}`,
        "table.cancel": `\u{391}\u{3BA}\u{3CD}\u{3C1}\u{3C9}\u{3C3}\u{3B7}`,
        "table.drag": `\u{39C}\u{3B5}\u{3C4}\u{3B1}\u{3C6}\u{3BF}\u{3C1}\u{3AC}`,
        "table.editCell": `\u{395}\u{3C0}\u{3B5}\u{3BE}\u{3B5}\u{3C1}\u{3B3}\u{3B1}\u{3C3}\u{3AF}\u{3B1} \u{3BA}\u{3B5}\u{3BB}\u{3B9}\u{3BF}\u{3CD}`,
        "table.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "table.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "table.resizeColumn": `\u{391}\u{3BB}\u{3BB}\u{3B1}\u{3B3}\u{3AE} \u{3BC}\u{3B5}\u{3B3}\u{3AD}\u{3B8}\u{3BF}\u{3C5}\u{3C2} \u{3C3}\u{3C4}\u{3AE}\u{3BB}\u{3B7}\u{3C2}`,
        "table.save": `\u{391}\u{3C0}\u{3BF}\u{3B8}\u{3AE}\u{3BA}\u{3B5}\u{3C5}\u{3C3}\u{3B7}`,
        "table.sortAscending": `\u{3A4}\u{3B1}\u{3BE}\u{3B9}\u{3BD}\u{3CC}\u{3BC}\u{3B7}\u{3C3}\u{3B7} \u{3BA}\u{3B1}\u{3C4}\u{3AC} \u{3B1}\u{3CD}\u{3BE}\u{3BF}\u{3C5}\u{3C3}\u{3B1} \u{3C3}\u{3B5}\u{3B9}\u{3C1}\u{3AC}`,
        "table.sortDescending": `\u{3A4}\u{3B1}\u{3BE}\u{3B9}\u{3BD}\u{3CC}\u{3BC}\u{3B7}\u{3C3}\u{3B7} \u{3BA}\u{3B1}\u{3C4}\u{3AC} \u{3C6}\u{3B8}\u{3AF}\u{3BD}\u{3BF}\u{3C5}\u{3C3}\u{3B1} \u{3C3}\u{3B5}\u{3B9}\u{3C1}\u{3AC}`,
        "tag.actions": `\u{395}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "tag.hideButtonLabel": `\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3BB}\u{3B9}\u{3B3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}`,
        "tag.noTags": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{395}\u{3BA}\u{3BA}\u{3B1}\u{3B8}\u{3AC}\u{3C1}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD}`,
        "toast.collapse": `\u{3A3}\u{3CD}\u{3BC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7}`,
        "toast.showAll": `\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD}`,
        "treeview.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`
    },
    "en-US": {
        "actionbar.actions": `Actions`,
        "actionbar.actionsAvailable": `Actions available.`,
        "actionbar.clearSelection": `Clear selection`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `None selected`,
                other: ()=>`${formatter.number(args.count)} selected`
            })}`,
        "actionbar.selectedAll": `All selected`,
        "actionbutton.pending": `pending`,
        "breadcrumbs.more": `More items`,
        "button.pending": `pending`,
        "calendar.invalidSelection": (args, formatter)=>`Selected ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} unavailable.`,
        "combobox.loading": `Loading\u{2026}`,
        "combobox.loadingMore": `Loading more\u{2026}`,
        "combobox.noResults": `No results`,
        "contextualhelp.help": `Help`,
        "contextualhelp.info": `Information`,
        "datepicker.endTime": `End time`,
        "datepicker.startTime": `Start time`,
        "datepicker.time": `Time`,
        "dialog.alert": `Alert`,
        "dialog.dismiss": `Dismiss`,
        "dropzone.replaceMessage": `Drop file to replace`,
        "inlinealert.informative": `Information`,
        "inlinealert.negative": `Error`,
        "inlinealert.notice": `Warning`,
        "inlinealert.positive": `Success`,
        "label.(optional)": `(optional)`,
        "label.(required)": `(required)`,
        "listview.loading": `Loading\u{2026}`,
        "listview.loadingMore": `Loading more\u{2026}`,
        "menu.loading": `Loading\u{2026}`,
        "menu.loadingMore": `Loading more\u{2026}`,
        "menu.moreActions": `More actions`,
        "menu.noResults": `No results`,
        "menu.unavailable": `Unavailable, expand for details`,
        "notificationbadge.indicatorOnly": `New activity`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Loading\u{2026}`,
        "picker.loadingMore": `Loading more\u{2026}`,
        "picker.placeholder": `Select\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `No items selected`,
                one: ()=>`${formatter.number(args.count)} item selected`,
                other: ()=>`${formatter.number(args.count)} items selected`
            })}`,
        "sidepanel.collapse": `Collapse side panel`,
        "sidepanel.expand": `Expand side panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Cancel`,
        "table.drag": `Drag`,
        "table.editCell": `Edit cell`,
        "table.loading": `Loading\u{2026}`,
        "table.loadingMore": `Loading more\u{2026}`,
        "table.resizeColumn": `Resize column`,
        "table.save": `Save`,
        "table.sortAscending": `Sort Ascending`,
        "table.sortDescending": `Sort Descending`,
        "tag.actions": `Actions`,
        "tag.hideButtonLabel": `Show less`,
        "tag.noTags": `None`,
        "tag.showAllButtonLabel": (args, formatter)=>`Show all (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Clear all`,
        "toast.collapse": `Collapse`,
        "toast.showAll": `Show all`,
        "treeview.loadingMore": `Loading more\u{2026}`
    },
    "es-ES": {
        "actionbar.actions": `Acciones`,
        "actionbar.actionsAvailable": `Acciones disponibles.`,
        "actionbar.clearSelection": `Borrar selecci\xf3n`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nada seleccionado`,
                one: ()=>`${formatter.number(args.count)} seleccionado`,
                other: ()=>`${formatter.number(args.count)} seleccionados`
            })}`,
        "actionbar.selectedAll": `Todos seleccionados`,
        "actionbutton.pending": `pendiente`,
        "breadcrumbs.more": `M\xe1s elementos`,
        "button.pending": `pendiente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `La fecha seleccionada no est\xe1 disponible`,
                other: `Las fechas seleccionadas no est\xe1n disponibles`
            })}.`,
        "combobox.loading": `Cargando\u{2026}`,
        "combobox.loadingMore": `Cargando m\xe1s\u{2026}`,
        "combobox.noResults": `Sin resultados`,
        "contextualhelp.help": `Ayuda`,
        "contextualhelp.info": `Informaci\xf3n`,
        "datepicker.endTime": `Hora de finalizaci\xf3n`,
        "datepicker.startTime": `Hora de inicio`,
        "datepicker.time": `Hora`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Descartar`,
        "dropzone.replaceMessage": `Suelte el archivo para reemplazar`,
        "inlinealert.informative": `Informaci\xf3n`,
        "inlinealert.negative": `Error`,
        "inlinealert.notice": `Advertencia`,
        "inlinealert.positive": `\xc9xito`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obligatorio)`,
        "listview.loading": `Cargando\u{2026}`,
        "listview.loadingMore": `Cargando m\xe1s\u{2026}`,
        "menu.loading": `Cargando\u{2026}`,
        "menu.loadingMore": `Cargando m\xe1s\u{2026}`,
        "menu.moreActions": `M\xe1s acciones`,
        "menu.noResults": `Sin resultados`,
        "menu.unavailable": `No disponible, ampliar para m\xe1s detalles`,
        "notificationbadge.indicatorOnly": `Nueva actividad`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Cargando\u{2026}`,
        "picker.loadingMore": `Cargando m\xe1s\u{2026}`,
        "picker.placeholder": `Seleccionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ning\xfan elemento seleccionado`,
                one: ()=>`${formatter.number(args.count)} elemento seleccionado`,
                other: ()=>`${formatter.number(args.count)} elementos seleccionados`
            })}`,
        "sidepanel.collapse": `Contraer el panel lateral`,
        "sidepanel.expand": `Expandir el panel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arrastrar`,
        "table.editCell": `Editar celda`,
        "table.loading": `Cargando\u{2026}`,
        "table.loadingMore": `Cargando m\xe1s\u{2026}`,
        "table.resizeColumn": `Cambiar el tama\xf1o de la columna`,
        "table.save": `Guardar`,
        "table.sortAscending": `Orden ascendente`,
        "table.sortDescending": `Orden descendente`,
        "tag.actions": `Acciones`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Ninguno`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar todo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Borrar todo`,
        "toast.collapse": `Contraer`,
        "toast.showAll": `Mostrar todo`,
        "treeview.loadingMore": `Cargando m\xe1s\u{2026}`
    },
    "et-EE": {
        "actionbar.actions": `Toimingud`,
        "actionbar.actionsAvailable": `Toimingud saadaval.`,
        "actionbar.clearSelection": `Puhasta valik`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Pole valitud`,
                other: ()=>`${formatter.number(args.count)} valitud`
            })}`,
        "actionbar.selectedAll": `K\xf5ik valitud`,
        "actionbutton.pending": `ootel`,
        "breadcrumbs.more": `Veel \xfcksusi`,
        "button.pending": `ootel`,
        "calendar.invalidSelection": (args, formatter)=>`Valitud ${formatter.plural(args.selectedCount, {
                one: `kuup\xe4ev`,
                other: `kuup\xe4evad`
            })} pole saadaval.`,
        "combobox.loading": `Laadimine...`,
        "combobox.loadingMore": `Laadi rohkem...`,
        "combobox.noResults": `Tulemusi pole`,
        "contextualhelp.help": `Spikker`,
        "contextualhelp.info": `Teave`,
        "datepicker.endTime": `L\xf5puaeg`,
        "datepicker.startTime": `Algusaeg`,
        "datepicker.time": `Aeg`,
        "dialog.alert": `Teade`,
        "dialog.dismiss": `L\xf5peta`,
        "dropzone.replaceMessage": `Kukuta fail asendamiseks`,
        "inlinealert.informative": `Teave`,
        "inlinealert.negative": `Viga`,
        "inlinealert.notice": `Hoiatus`,
        "inlinealert.positive": `Valmis`,
        "label.(optional)": `(valikuline)`,
        "label.(required)": `(n\xf5utav)`,
        "listview.loading": `Laadimine...`,
        "listview.loadingMore": `Laadi rohkem...`,
        "menu.loading": `Laadimine...`,
        "menu.loadingMore": `Laadi rohkem...`,
        "menu.moreActions": `Veel toiminguid`,
        "menu.noResults": `Tulemusi pole`,
        "menu.unavailable": `Pole k\xe4ttesaadav, \xfcksikasjade vaatamiseks laiendage`,
        "notificationbadge.indicatorOnly": `Uus tegevus`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laadimine...`,
        "picker.loadingMore": `Laadi rohkem...`,
        "picker.placeholder": `Valige\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\xfcksuseid pole valitud`,
                one: ()=>`${formatter.number(args.count)} \xfcksus valitud`,
                other: ()=>`${formatter.number(args.count)} \xfcksust valitud`
            })}`,
        "sidepanel.collapse": `Ahenda k\xfclgpaneel`,
        "sidepanel.expand": `Laienda k\xfclgpaneel`,
        "slider.maximum": `Maksimaalne`,
        "slider.minimum": `Minimaalne`,
        "table.cancel": `T\xfchista`,
        "table.drag": `Lohista`,
        "table.editCell": `Muuda lahtrit`,
        "table.loading": `Laadimine...`,
        "table.loadingMore": `Laadi rohkem...`,
        "table.resizeColumn": `Muuda veeru suurust`,
        "table.save": `Salvesta`,
        "table.sortAscending": `Sordi kasvavalt`,
        "table.sortDescending": `Sordi kahanevalt`,
        "tag.actions": `Toimingud`,
        "tag.hideButtonLabel": `Kuva v\xe4hem`,
        "tag.noTags": `Puudub`,
        "tag.showAllButtonLabel": (args, formatter)=>`Kuva k\xf5ik (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `T\xfchjenda k\xf5ik`,
        "toast.collapse": `Ahenda`,
        "toast.showAll": `Kuva k\xf5ik`,
        "treeview.loadingMore": `Laadi rohkem...`
    },
    "fi-FI": {
        "actionbar.actions": `Toiminnot`,
        "actionbar.actionsAvailable": `Toiminnot k\xe4ytett\xe4viss\xe4.`,
        "actionbar.clearSelection": `Poista valinta`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ei mit\xe4\xe4n valittu`,
                other: ()=>`${formatter.number(args.count)} valittu`
            })}`,
        "actionbar.selectedAll": `Kaikki valittu`,
        "actionbutton.pending": `odottaa`,
        "breadcrumbs.more": `Lis\xe4\xe4 kohteita`,
        "button.pending": `odottaa`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Valittu p\xe4iv\xe4m\xe4\xe4r\xe4 ei ole`,
                other: `Valitut p\xe4iv\xe4m\xe4\xe4r\xe4t eiv\xe4t ole`
            })} saatavilla.`,
        "combobox.loading": `Ladataan\u{2026}`,
        "combobox.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "combobox.noResults": `Ei tuloksia`,
        "contextualhelp.help": `Ohje`,
        "contextualhelp.info": `Tiedot`,
        "datepicker.endTime": `P\xe4\xe4ttymisaika`,
        "datepicker.startTime": `Alkamisaika`,
        "datepicker.time": `Aika`,
        "dialog.alert": `H\xe4lytys`,
        "dialog.dismiss": `Hylk\xe4\xe4`,
        "dropzone.replaceMessage": `Pudota korvaava tiedosto`,
        "inlinealert.informative": `Tiedot`,
        "inlinealert.negative": `Virhe`,
        "inlinealert.notice": `Varoitus`,
        "inlinealert.positive": `Onnistui`,
        "label.(optional)": `(valinnainen)`,
        "label.(required)": `(pakollinen)`,
        "listview.loading": `Ladataan\u{2026}`,
        "listview.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "menu.loading": `Ladataan\u{2026}`,
        "menu.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "menu.moreActions": `Lis\xe4\xe4 toimintoja`,
        "menu.noResults": `Ei tuloksia`,
        "menu.unavailable": `Ei saatavilla, laajenna saadaksesi lis\xe4tietoja`,
        "notificationbadge.indicatorOnly": `Uusi toiminta`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Ladataan\u{2026}`,
        "picker.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "picker.placeholder": `Valitse\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Kohteita ei ole valittu`,
                one: ()=>`${formatter.number(args.count)} kohde valittu`,
                other: ()=>`${formatter.number(args.count)} kohdetta valittu`
            })}`,
        "sidepanel.collapse": `Kutista sivupaneeli`,
        "sidepanel.expand": `Laajenna sivupaneelia`,
        "slider.maximum": `Maksimi`,
        "slider.minimum": `Minimi`,
        "table.cancel": `Peruuta`,
        "table.drag": `Ved\xe4`,
        "table.editCell": `Muokkaa solua`,
        "table.loading": `Ladataan\u{2026}`,
        "table.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "table.resizeColumn": `Muuta sarakkeen kokoa`,
        "table.save": `Tallenna`,
        "table.sortAscending": `Lajitteluj\xe4rjestys: nouseva`,
        "table.sortDescending": `Lajitteluj\xe4rjestys: laskeva`,
        "tag.actions": `Toiminnot`,
        "tag.hideButtonLabel": `N\xe4yt\xe4 v\xe4hemm\xe4n`,
        "tag.noTags": `Ei mit\xe4\xe4n`,
        "tag.showAllButtonLabel": (args, formatter)=>`N\xe4yt\xe4 kaikki (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Tyhjenn\xe4 kaikki`,
        "toast.collapse": `Pienenn\xe4`,
        "toast.showAll": `N\xe4yt\xe4 kaikki`,
        "treeview.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`
    },
    "fr-FR": {
        "actionbar.actions": `Actions`,
        "actionbar.actionsAvailable": `Actions disponibles.`,
        "actionbar.clearSelection": `Supprimer la s\xe9lection`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Aucun \xe9l\xe9ment s\xe9lectionn\xe9`,
                one: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9`,
                other: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9s`
            })}`,
        "actionbar.selectedAll": `Toute la s\xe9lection`,
        "actionbutton.pending": `En attente`,
        "breadcrumbs.more": `Plus d\u{2019}\xe9l\xe9ments`,
        "button.pending": `En attente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `La date s\xe9lectionn\xe9e est indisponible`,
                other: `Les dates s\xe9lectionn\xe9es sont indisponibles`
            })}.`,
        "combobox.loading": `Chargement...`,
        "combobox.loadingMore": `Chargement suppl\xe9mentaire...`,
        "combobox.noResults": `Aucun r\xe9sultat`,
        "contextualhelp.help": `Aide`,
        "contextualhelp.info": `Informations`,
        "datepicker.endTime": `Heure de fin`,
        "datepicker.startTime": `Heure de d\xe9but`,
        "datepicker.time": `Heure`,
        "dialog.alert": `Alerte`,
        "dialog.dismiss": `Rejeter`,
        "dropzone.replaceMessage": `D\xe9poser le fichier \xe0 remplacer`,
        "inlinealert.informative": `Informations`,
        "inlinealert.negative": `Erreur`,
        "inlinealert.notice": `Avertissement`,
        "inlinealert.positive": `Succ\xe8s`,
        "label.(optional)": `(facultatif)`,
        "label.(required)": `(requis)`,
        "listview.loading": `Chargement...`,
        "listview.loadingMore": `Chargement suppl\xe9mentaire...`,
        "menu.loading": `Chargement...`,
        "menu.loadingMore": `Chargement suppl\xe9mentaire...`,
        "menu.moreActions": `Autres actions`,
        "menu.noResults": `Aucun r\xe9sultat`,
        "menu.unavailable": `Indisponible, d\xe9velopper pour plus de d\xe9tails`,
        "notificationbadge.indicatorOnly": `Nouvelle activit\xe9`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Chargement...`,
        "picker.loadingMore": `Chargement suppl\xe9mentaire...`,
        "picker.placeholder": `S\xe9lectionner\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Aucun \xe9l\xe9ment s\xe9lectionn\xe9`,
                one: ()=>`${formatter.number(args.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
                other: ()=>`${formatter.number(args.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
            })}`,
        "sidepanel.collapse": `R\xe9duire le panneau lat\xe9ral`,
        "sidepanel.expand": `D\xe9velopper le panneau lat\xe9ral`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuler`,
        "table.drag": `Faire glisser`,
        "table.editCell": `Modifier la cellule`,
        "table.loading": `Chargement...`,
        "table.loadingMore": `Chargement suppl\xe9mentaire...`,
        "table.resizeColumn": `Redimensionner la colonne`,
        "table.save": `Enregistrer`,
        "table.sortAscending": `Trier par ordre croissant`,
        "table.sortDescending": `Trier par ordre d\xe9croissant`,
        "tag.actions": `Actions`,
        "tag.hideButtonLabel": `Afficher moins`,
        "tag.noTags": `Aucun`,
        "tag.showAllButtonLabel": (args, formatter)=>`Tout afficher (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Tout effacer`,
        "toast.collapse": `R\xe9duire`,
        "toast.showAll": `Tout afficher`,
        "treeview.loadingMore": `Chargement suppl\xe9mentaire...`
    },
    "he-IL": {
        "actionbar.actions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA}`,
        "actionbar.actionsAvailable": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA} \u{5D6}\u{5DE}\u{5D9}\u{5E0}\u{5D5}\u{5EA}.`,
        "actionbar.clearSelection": `\u{5E0}\u{5E7}\u{5D4} \u{5D1}\u{5D7}\u{5D9}\u{5E8}\u{5D4}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{5DC}\u{5D0} \u{5D1}\u{5D5}\u{5E6}\u{5E2}\u{5D4} \u{5D1}\u{5D7}\u{5D9}\u{5E8}\u{5D4}`,
                one: ()=>` ${formatter.number(args.count)} \u{5D1}\u{5D7}\u{5E8}`,
                other: ()=>`${formatter.number(args.count)} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
            })}",`,
        "actionbar.selectedAll": `\u{5DB}\u{5DC} \u{5D4}\u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`,
        "actionbutton.pending": `\u{5DE}\u{5DE}\u{5EA}\u{5D9}\u{5DF} \u{5DC}`,
        "breadcrumbs.more": `\u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E0}\u{5D5}\u{5E1}\u{5E4}\u{5D9}\u{5DD}`,
        "button.pending": `\u{5DE}\u{5DE}\u{5EA}\u{5D9}\u{5DF} \u{5DC}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{5E0}\u{5D1}\u{5D7}\u{5E8} ${formatter.plural(args.selectedCount, {
                one: `\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DA}`,
                other: `\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DB}\u{5D9}\u{5DD}`
            })} \u{5D0}\u{5D9}\u{5E0}\u{5D5} \u{5D6}\u{5DE}\u{5D9}\u{5DF}.`,
        "combobox.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "combobox.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "combobox.noResults": `\u{5D0}\u{5D9}\u{5DF} \u{5EA}\u{5D5}\u{5E6}\u{5D0}\u{5D5}\u{5EA}`,
        "contextualhelp.help": `\u{5E2}\u{5D6}\u{5E8}\u{5D4}`,
        "contextualhelp.info": `\u{5DE}\u{5D9}\u{5D3}\u{5E2}`,
        "datepicker.endTime": `\u{5E9}\u{5E2}\u{5EA} \u{5E1}\u{5D9}\u{5D5}\u{5DD}`,
        "datepicker.startTime": `\u{5E9}\u{5E2}\u{5EA} \u{5D4}\u{5EA}\u{5D7}\u{5DC}\u{5D4}`,
        "datepicker.time": `\u{5D6}\u{5DE}\u{5DF}`,
        "dialog.alert": `\u{5D4}\u{5EA}\u{5E8}\u{5D0}\u{5D4}`,
        "dialog.dismiss": `\u{5D4}\u{5EA}\u{5E2}\u{5DC}\u{5DD}`,
        "dropzone.replaceMessage": `\u{5E9}\u{5D7}\u{5E8}\u{5E8} \u{5D0}\u{5EA} \u{5D4}\u{5E7}\u{5D5}\u{5D1}\u{5E5} \u{5DC}\u{5D4}\u{5D7}\u{5DC}\u{5E4}\u{5D4}`,
        "inlinealert.informative": `\u{5DE}\u{5D9}\u{5D3}\u{5E2}`,
        "inlinealert.negative": `\u{5E9}\u{5D2}\u{5D9}\u{5D0}\u{5D4}`,
        "inlinealert.notice": `\u{5D0}\u{5D6}\u{5D4}\u{5E8}\u{5D4}`,
        "inlinealert.positive": `\u{5D4}\u{5E6}\u{5DC}\u{5D7}\u{5D4}`,
        "label.(optional)": `(\u{5D0}\u{5D5}\u{5E4}\u{5E6}\u{5D9}\u{5D5}\u{5E0}\u{5DC}\u{5D9})`,
        "label.(required)": `(\u{5E0}\u{5D3}\u{5E8}\u{5E9})`,
        "listview.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "listview.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "menu.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "menu.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "menu.moreActions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA} \u{5E0}\u{5D5}\u{5E1}\u{5E4}\u{5D5}\u{5EA}`,
        "menu.noResults": `\u{5D0}\u{5D9}\u{5DF} \u{5EA}\u{5D5}\u{5E6}\u{5D0}\u{5D5}\u{5EA}`,
        "menu.unavailable": `\u{5DC}\u{5D0} \u{5D6}\u{5DE}\u{5D9}\u{5DF}, \u{5D4}\u{5E8}\u{5D7}\u{5D1} \u{5DC}\u{5E4}\u{5E8}\u{5D8}\u{5D9}\u{5DD}`,
        "notificationbadge.indicatorOnly": `\u{5E4}\u{5E2}\u{5D9}\u{5DC}\u{5D5}\u{5EA} \u{5D7}\u{5D3}\u{5E9}\u{5D4}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "picker.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "picker.placeholder": `\u{5D1}\u{5D7}\u{5E8}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{5DC}\u{5D0} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD}`,
                one: ()=>`\u{5E4}\u{5E8}\u{5D9}\u{5D8} ${formatter.number(args.count)} \u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
                other: ()=>`${formatter.number(args.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
            })}`,
        "sidepanel.collapse": `\u{5DB}\u{5D5}\u{5D5}\u{5E5} \u{5D0}\u{5EA} \u{5D4}\u{5DC}\u{5D5}\u{5D7} \u{5D4}\u{5E6}\u{5D3}\u{5D3}\u{5D9}`,
        "sidepanel.expand": `\u{5D4}\u{5E8}\u{5D7}\u{5D1} \u{5D0}\u{5EA} \u{5D4}\u{5DC}\u{5D5}\u{5D7} \u{5D4}\u{5E6}\u{5D3}\u{5D3}\u{5D9}`,
        "slider.maximum": `\u{5DE}\u{5E7}\u{5E1}\u{5D9}\u{5DE}\u{5D5}\u{5DD}`,
        "slider.minimum": `\u{5DE}\u{5D9}\u{5E0}\u{5D9}\u{5DE}\u{5D5}\u{5DD}`,
        "table.cancel": `\u{5D1}\u{5D9}\u{5D8}\u{5D5}\u{5DC}`,
        "table.drag": `\u{5D2}\u{5E8}\u{5D9}\u{5E8}\u{5D4}`,
        "table.editCell": `\u{5E2}\u{5E8}\u{5D9}\u{5DB}\u{5EA} \u{5EA}\u{5D0}`,
        "table.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "table.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "table.resizeColumn": `\u{5E9}\u{5E0}\u{5D4} \u{5D0}\u{5EA} \u{5D2}\u{5D5}\u{5D3}\u{5DC} \u{5D4}\u{5E2}\u{5DE}\u{5D5}\u{5D3}\u{5D4}`,
        "table.save": `\u{5E9}\u{5DE}\u{5D9}\u{5E8}\u{5D4}`,
        "table.sortAscending": `\u{5DE}\u{5D9}\u{5D9}\u{5DF} \u{5D1}\u{5E1}\u{5D3}\u{5E8} \u{5E2}\u{5D5}\u{5DC}\u{5D4}`,
        "table.sortDescending": `\u{5DE}\u{5D9}\u{5D9}\u{5DF} \u{5D1}\u{5E1}\u{5D3}\u{5E8} \u{5D9}\u{5D5}\u{5E8}\u{5D3}`,
        "tag.actions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA}`,
        "tag.hideButtonLabel": `\u{5D4}\u{5E6}\u{5D2} \u{5E4}\u{5D7}\u{5D5}\u{5EA}`,
        "tag.noTags": `\u{5DC}\u{5DC}\u{5D0}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{5D4}\u{5E6}\u{5D2} \u{5D4}\u{5DB}\u{5DC} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5E0}\u{5E7}\u{5D4} \u{5D4}\u{5DB}\u{5D5}\u{5DC}`,
        "toast.collapse": `\u{5DB}\u{5D5}\u{5D5}\u{5E5}`,
        "toast.showAll": `\u{5D4}\u{5E6}\u{5D2} \u{5D4}\u{5DB}\u{5D5}\u{5DC}`,
        "treeview.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`
    },
    "hr-HR": {
        "actionbar.actions": `Radnje`,
        "actionbar.actionsAvailable": `Dostupne radnje.`,
        "actionbar.clearSelection": `Poni\u{161}ti odabir`,
        "actionbar.selected": (args)=>`Odabrano: ${args.count}`,
        "actionbar.selectedAll": `Sve odabrano`,
        "actionbutton.pending": `u tijeku`,
        "breadcrumbs.more": `Vi\u{161}e stavki`,
        "button.pending": `u tijeku`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Odabrani datum nije dostupan`,
                other: `Odabrani datumi nisu dostupni`
            })}.`,
        "combobox.loading": `U\u{10D}itavam...`,
        "combobox.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "combobox.noResults": `Nema rezultata`,
        "contextualhelp.help": `Pomo\u{107}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Vrijeme zavr\u{161}etka`,
        "datepicker.startTime": `Vrijeme po\u{10D}etka`,
        "datepicker.time": `Vrijeme`,
        "dialog.alert": `Upozorenje`,
        "dialog.dismiss": `Odbaci`,
        "dropzone.replaceMessage": `Ispustite datoteku za zamjenu`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Pogre\u{161}ka`,
        "inlinealert.notice": `Upozorenje`,
        "inlinealert.positive": `Uspje\u{161}no`,
        "label.(optional)": `(opcionalno)`,
        "label.(required)": `(obvezno)`,
        "listview.loading": `U\u{10D}itavam...`,
        "listview.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.loading": `U\u{10D}itavam...`,
        "menu.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.moreActions": `Dodatne radnje`,
        "menu.noResults": `Nema rezultata`,
        "menu.unavailable": `Nije dostupno, pro\u{161}iri za detalje`,
        "notificationbadge.indicatorOnly": `Nova aktivnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `U\u{10D}itavam...`,
        "picker.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "picker.placeholder": `Odaberite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nije odabrana nijedna stavka`,
                one: ()=>`Odabrana je ${formatter.number(args.count)} stavka`,
                other: ()=>`Odabrano je ${formatter.number(args.count)} stavki`
            })}`,
        "sidepanel.collapse": `Sklapanje bo\u{10D}nog panela`,
        "sidepanel.expand": `Pro\u{161}irenje bo\u{10D}ne plo\u{10D}e`,
        "slider.maximum": `Najvi\u{161}e`,
        "slider.minimum": `Najmanje`,
        "table.cancel": `Poni\u{161}ti`,
        "table.drag": `Povucite`,
        "table.editCell": `Uredi \u{107}eliju`,
        "table.loading": `U\u{10D}itavam...`,
        "table.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "table.resizeColumn": `Promijeni veli\u{10D}inu stupca`,
        "table.save": `Spremi`,
        "table.sortAscending": `Sortiraj uzlazno`,
        "table.sortDescending": `Sortiraj silazno`,
        "tag.actions": `Radnje`,
        "tag.hideButtonLabel": `Prika\u{17E}i manje`,
        "tag.noTags": `Nema`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E}i sve (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Poni\u{161}ti sve`,
        "toast.collapse": `Sa\u{17E}mi`,
        "toast.showAll": `Prika\u{17E}i sve`,
        "treeview.loadingMore": `U\u{10D}itavam jo\u{161}...`
    },
    "hu-HU": {
        "actionbar.actions": `M\u{171}veletek`,
        "actionbar.actionsAvailable": `M\u{171}veletek \xe1llnak rendelkez\xe9sre.`,
        "actionbar.clearSelection": `Kijel\xf6l\xe9s t\xf6rl\xe9se`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Egy sincs kijel\xf6lve`,
                other: ()=>`${formatter.number(args.count)} kijel\xf6lve`
            })}`,
        "actionbar.selectedAll": `Mind kijel\xf6lve`,
        "actionbutton.pending": `f\xfcgg\u{151}ben lev\u{151}`,
        "breadcrumbs.more": `Tov\xe1bbi elemek`,
        "button.pending": `f\xfcgg\u{151}ben lev\u{151}`,
        "calendar.invalidSelection": (args, formatter)=>`A kijel\xf6lt ${formatter.plural(args.selectedCount, {
                one: `d\xe1tum nem \xe9rhet\u{151} el`,
                other: `d\xe1tumok nem \xe9rhet\u{151}ek el`
            })}.`,
        "combobox.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "combobox.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "combobox.noResults": `Nincsenek tal\xe1latok`,
        "contextualhelp.help": `S\xfag\xf3`,
        "contextualhelp.info": `Inform\xe1ci\xf3`,
        "datepicker.endTime": `Befejez\xe9s ideje`,
        "datepicker.startTime": `Kezd\xe9s ideje`,
        "datepicker.time": `Id\u{151}`,
        "dialog.alert": `Figyelmeztet\xe9s`,
        "dialog.dismiss": `Elutas\xedt\xe1s`,
        "dropzone.replaceMessage": `Ejtse le a f\xe1jlt a cser\xe9hez`,
        "inlinealert.informative": `Inform\xe1ci\xf3`,
        "inlinealert.negative": `Hiba`,
        "inlinealert.notice": `Figyelmeztet\xe9s`,
        "inlinealert.positive": `Siker`,
        "label.(optional)": `(opcion\xe1lis)`,
        "label.(required)": `(k\xf6telez\u{151})`,
        "listview.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "listview.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "menu.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "menu.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "menu.moreActions": `Tov\xe1bbi lehet\u{151}s\xe9gek`,
        "menu.noResults": `Nincsenek tal\xe1latok`,
        "menu.unavailable": `Nem \xe9rhet\u{151} el, a r\xe9szletek\xe9rt bontsa ki`,
        "notificationbadge.indicatorOnly": `\xdaj tev\xe9kenys\xe9g`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "picker.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "picker.placeholder": `Kiv\xe1laszt\xe1s\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nincs kijel\xf6lve elem`,
                one: ()=>`${formatter.number(args.count)} elem kijel\xf6lve`,
                other: ()=>`${formatter.number(args.count)} elem kijel\xf6lve`
            })}`,
        "sidepanel.collapse": `Oldalpanel \xf6sszecsuk\xe1sa`,
        "sidepanel.expand": `Oldalpanel kibont\xe1sa`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `M\xe9gse`,
        "table.drag": `H\xfaz\xe1s`,
        "table.editCell": `Cella szerkeszt\xe9se`,
        "table.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "table.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "table.resizeColumn": `Oszlop \xe1tm\xe9retez\xe9se`,
        "table.save": `Ment\xe9s`,
        "table.sortAscending": `N\xf6vekv\u{151} rendez\xe9s`,
        "table.sortDescending": `Cs\xf6kken\u{151} rendez\xe9s`,
        "tag.actions": `M\u{171}veletek`,
        "tag.hideButtonLabel": `Mutass kevesebbet`,
        "tag.noTags": `Egyik sem`,
        "tag.showAllButtonLabel": (args, formatter)=>`Az \xf6sszes megjelen\xedt\xe9se (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\xd6sszes t\xf6rl\xe9se`,
        "toast.collapse": `\xd6sszecsuk\xe1s`,
        "toast.showAll": `\xd6sszes megjelen\xedt\xe9se`,
        "treeview.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`
    },
    "it-IT": {
        "actionbar.actions": `Azioni`,
        "actionbar.actionsAvailable": `Azioni disponibili.`,
        "actionbar.clearSelection": `Annulla selezione`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nessuno selezionato`,
                one: ()=>`${formatter.number(args.count)} selezionato`,
                other: ()=>`${formatter.number(args.count)} selezionati`
            })}`,
        "actionbar.selectedAll": `Tutti selezionati`,
        "actionbutton.pending": `in sospeso`,
        "breadcrumbs.more": `Altri elementi`,
        "button.pending": `in sospeso`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data selezionata non disponibile`,
                other: `Date selezionate non disponibili`
            })}.`,
        "combobox.loading": `Caricamento...`,
        "combobox.loadingMore": `Caricamento altri...`,
        "combobox.noResults": `Nessun risultato`,
        "contextualhelp.help": `Aiuto`,
        "contextualhelp.info": `Informazioni`,
        "datepicker.endTime": `Ora di fine`,
        "datepicker.startTime": `Ora di inizio`,
        "datepicker.time": `Ora`,
        "dialog.alert": `Avviso`,
        "dialog.dismiss": `Ignora`,
        "dropzone.replaceMessage": `Rilascia il file da sostituire`,
        "inlinealert.informative": `Informazioni`,
        "inlinealert.negative": `Errore`,
        "inlinealert.notice": `Avvertenza`,
        "inlinealert.positive": `Operazione riuscita`,
        "label.(optional)": `(facoltativo)`,
        "label.(required)": `(obbligatorio)`,
        "listview.loading": `Caricamento...`,
        "listview.loadingMore": `Caricamento altri...`,
        "menu.loading": `Caricamento...`,
        "menu.loadingMore": `Caricamento altri...`,
        "menu.moreActions": `Altre azioni`,
        "menu.noResults": `Nessun risultato`,
        "menu.unavailable": `Non disponibile, espandi per i dettagli`,
        "notificationbadge.indicatorOnly": `Nuova attivit\xe0`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Caricamento...`,
        "picker.loadingMore": `Caricamento altri...`,
        "picker.placeholder": `Seleziona\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nessun elemento selezionato`,
                one: ()=>`${formatter.number(args.count)} elemento selezionato`,
                other: ()=>`${formatter.number(args.count)} elementi selezionati`
            })}`,
        "sidepanel.collapse": `Comprimi pannello laterale`,
        "sidepanel.expand": `Espandi pannello laterale`,
        "slider.maximum": `Massimo`,
        "slider.minimum": `Minimo`,
        "table.cancel": `Annulla`,
        "table.drag": `Trascina`,
        "table.editCell": `Modifica cella`,
        "table.loading": `Caricamento...`,
        "table.loadingMore": `Caricamento altri...`,
        "table.resizeColumn": `Ridimensiona colonna`,
        "table.save": `Salva`,
        "table.sortAscending": `Ordinamento crescente`,
        "table.sortDescending": `Ordinamento decrescente`,
        "tag.actions": `Azioni`,
        "tag.hideButtonLabel": `Mostra meno`,
        "tag.noTags": `Nessuno`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostra tutto (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Cancella tutto`,
        "toast.collapse": `Comprimi`,
        "toast.showAll": `Mostra tutto`,
        "treeview.loadingMore": `Caricamento altri...`
    },
    "ja-JP": {
        "actionbar.actions": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "actionbar.actionsAvailable": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}\u{3092}\u{5229}\u{7528}\u{3067}\u{304D}\u{307E}\u{3059}\u{3002}`,
        "actionbar.clearSelection": `\u{9078}\u{629E}\u{3092}\u{30AF}\u{30EA}\u{30A2}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{9078}\u{629E}\u{3055}\u{308C}\u{3066}\u{3044}\u{307E}\u{305B}\u{3093}`,
                other: ()=>`${formatter.number(args.count)} \u{500B}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`
            })}`,
        "actionbar.selectedAll": `\u{3059}\u{3079}\u{3066}\u{3092}\u{9078}\u{629E}`,
        "actionbutton.pending": `\u{4FDD}\u{7559}`,
        "breadcrumbs.more": `\u{305D}\u{306E}\u{4ED6}\u{306E}\u{9805}\u{76EE}`,
        "button.pending": `\u{4FDD}\u{7559}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{9078}\u{629E}\u{3057}\u{305F}${formatter.plural(args.selectedCount, {
                one: `\u{65E5}\u{4ED8}`,
                other: `\u{65E5}\u{4ED8}`
            })}\u{306F}\u{4F7F}\u{7528}\u{3067}\u{304D}\u{307E}\u{305B}\u{3093}\u{3002}`,
        "combobox.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "combobox.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "combobox.noResults": `\u{7D50}\u{679C}\u{306A}\u{3057}`,
        "contextualhelp.help": `\u{30D8}\u{30EB}\u{30D7}`,
        "contextualhelp.info": `\u{60C5}\u{5831}`,
        "datepicker.endTime": `\u{7D42}\u{4E86}\u{6642}\u{523B}`,
        "datepicker.startTime": `\u{958B}\u{59CB}\u{6642}\u{523B}`,
        "datepicker.time": `\u{6642}\u{523B}`,
        "dialog.alert": `\u{30A2}\u{30E9}\u{30FC}\u{30C8}`,
        "dialog.dismiss": `\u{9589}\u{3058}\u{308B}`,
        "dropzone.replaceMessage": `\u{30D5}\u{30A1}\u{30A4}\u{30EB}\u{3092}\u{30C9}\u{30ED}\u{30C3}\u{30D7}\u{3057}\u{3066}\u{7F6E}\u{63DB}`,
        "inlinealert.informative": `\u{60C5}\u{5831}`,
        "inlinealert.negative": `\u{30A8}\u{30E9}\u{30FC}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `\u{FF08}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}\u{FF09}`,
        "label.(required)": `\u{FF08}\u{5FC5}\u{9808}\u{FF09}`,
        "listview.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "listview.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.moreActions": `\u{305D}\u{306E}\u{4ED6}\u{306E}\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "menu.noResults": `\u{7D50}\u{679C}\u{306A}\u{3057}`,
        "menu.unavailable": `\u{5229}\u{7528}\u{3067}\u{304D}\u{307E}\u{305B}\u{3093}\u{3002}\u{8A73}\u{3057}\u{304F}\u{306F}\u{3001}\u{5C55}\u{958B}\u{3057}\u{3066}\u{78BA}\u{8A8D}\u{3057}\u{3066}\u{304F}\u{3060}\u{3055}\u{3044}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{898F}\u{30A2}\u{30AF}\u{30C6}\u{30A3}\u{30D3}\u{30C6}\u{30A3}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "picker.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "picker.placeholder": `\u{9078}\u{629E}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{9805}\u{76EE}\u{304C}\u{9078}\u{629E}\u{3055}\u{308C}\u{3066}\u{3044}\u{307E}\u{305B}\u{3093}`,
                one: ()=>`${formatter.number(args.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`,
                other: ()=>`${formatter.number(args.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`
            })}`,
        "sidepanel.collapse": `\u{30B5}\u{30A4}\u{30C9}\u{30D1}\u{30CD}\u{30EB}\u{3092}\u{6298}\u{308A}\u{305F}\u{305F}\u{3080}`,
        "sidepanel.expand": `\u{30B5}\u{30A4}\u{30C9}\u{30D1}\u{30CD}\u{30EB}\u{3092}\u{5C55}\u{958B}`,
        "slider.maximum": `\u{6700}\u{5927}`,
        "slider.minimum": `\u{6700}\u{5C0F}`,
        "table.cancel": `\u{30AD}\u{30E3}\u{30F3}\u{30BB}\u{30EB}`,
        "table.drag": `\u{30C9}\u{30E9}\u{30C3}\u{30B0}`,
        "table.editCell": `\u{30BB}\u{30EB}\u{3092}\u{7DE8}\u{96C6}`,
        "table.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "table.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "table.resizeColumn": `\u{5217}\u{5E45}\u{3092}\u{5909}\u{66F4}`,
        "table.save": `\u{4FDD}\u{5B58}`,
        "table.sortAscending": `\u{6607}\u{9806}\u{306B}\u{4E26}\u{3079}\u{66FF}\u{3048}`,
        "table.sortDescending": `\u{964D}\u{9806}\u{306B}\u{4E26}\u{3079}\u{66FF}\u{3048}`,
        "tag.actions": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "tag.hideButtonLabel": `\u{8868}\u{793A}\u{3092}\u{6E1B}\u{3089}\u{3059}`,
        "tag.noTags": `\u{306A}\u{3057}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{3059}\u{3079}\u{3066}\u{306E} (${formatter.number(args.tagCount)}) \u{3092}\u{8868}\u{793A}`,
        "toast.clearAll": `\u{3059}\u{3079}\u{3066}\u{30AF}\u{30EA}\u{30A2}`,
        "toast.collapse": `\u{6298}\u{308A}\u{305F}\u{305F}\u{3080}`,
        "toast.showAll": `\u{3059}\u{3079}\u{3066}\u{3092}\u{8868}\u{793A}`,
        "treeview.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`
    },
    "ko-KR": {
        "actionbar.actions": `\u{C561}\u{C158}`,
        "actionbar.actionsAvailable": `\u{C0AC}\u{C6A9} \u{AC00}\u{B2A5}\u{D55C} \u{C561}\u{C158}`,
        "actionbar.clearSelection": `\u{C120}\u{D0DD} \u{D56D}\u{BAA9} \u{C9C0}\u{C6B0}\u{AE30}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{C120}\u{D0DD}\u{B41C} \u{D56D}\u{BAA9} \u{C5C6}\u{C74C}`,
                other: ()=>`${formatter.number(args.count)}\u{AC1C} \u{C120}\u{D0DD}\u{B428}`
            })}`,
        "actionbar.selectedAll": `\u{BAA8}\u{B450} \u{C120}\u{D0DD}\u{B428}`,
        "actionbutton.pending": `\u{BCF4}\u{B958} \u{C911}`,
        "breadcrumbs.more": `\u{AE30}\u{D0C0} \u{D56D}\u{BAA9}`,
        "button.pending": `\u{BCF4}\u{B958} \u{C911}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{C120}\u{D0DD}\u{D55C} ${formatter.plural(args.selectedCount, {
                one: `\u{C77C}\u{C790}\u{B97C}`,
                other: `\u{C77C}\u{C790}\u{B97C}`
            })} \u{C0AC}\u{C6A9}\u{D560} \u{C218} \u{C5C6}\u{C2B5}\u{B2C8}\u{B2E4}.`,
        "combobox.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "combobox.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "combobox.noResults": `\u{ACB0}\u{ACFC} \u{C5C6}\u{C74C}`,
        "contextualhelp.help": `\u{B3C4}\u{C6C0}\u{B9D0}`,
        "contextualhelp.info": `\u{C815}\u{BCF4}`,
        "datepicker.endTime": `\u{C885}\u{B8CC} \u{C2DC}\u{AC04}`,
        "datepicker.startTime": `\u{C2DC}\u{C791} \u{C2DC}\u{AC04}`,
        "datepicker.time": `\u{C2DC}\u{AC04}`,
        "dialog.alert": `\u{ACBD}\u{ACE0}`,
        "dialog.dismiss": `\u{BB34}\u{C2DC}`,
        "dropzone.replaceMessage": `\u{D30C}\u{C77C}\u{C744} \u{B4DC}\u{B86D}\u{D558}\u{C5EC} \u{BC14}\u{AFB8}\u{AE30}`,
        "inlinealert.informative": `\u{C815}\u{BCF4}`,
        "inlinealert.negative": `\u{C624}\u{B958}`,
        "inlinealert.notice": `\u{ACBD}\u{ACE0}`,
        "inlinealert.positive": `\u{C131}\u{ACF5}`,
        "label.(optional)": `(\u{C120}\u{D0DD} \u{C0AC}\u{D56D})`,
        "label.(required)": `(\u{D544}\u{C218} \u{C0AC}\u{D56D})`,
        "listview.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "listview.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.moreActions": `\u{AE30}\u{D0C0} \u{C561}\u{C158}`,
        "menu.noResults": `\u{ACB0}\u{ACFC} \u{C5C6}\u{C74C}`,
        "menu.unavailable": `\u{C0AC}\u{C6A9}\u{D560} \u{C218} \u{C5C6}\u{C74C}, \u{C790}\u{C138}\u{D788} \u{BCF4}\u{B824}\u{BA74} \u{D3BC}\u{CE58}\u{AE30}`,
        "notificationbadge.indicatorOnly": `\u{C0C8}\u{B85C}\u{C6B4} \u{D65C}\u{B3D9}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "picker.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "picker.placeholder": `\u{C120}\u{D0DD}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{C120}\u{D0DD}\u{D55C} \u{D56D}\u{BAA9} \u{C5C6}\u{C74C}`,
                one: ()=>`${formatter.number(args.count)}\u{AC1C} \u{D56D}\u{BAA9} \u{C120}\u{D0DD}\u{B428}`,
                other: ()=>`${formatter.number(args.count)}\u{AC1C} \u{D56D}\u{BAA9} \u{C120}\u{D0DD}\u{B428}`
            })}`,
        "sidepanel.collapse": `\u{C0AC}\u{C774}\u{B4DC} \u{D328}\u{B110} \u{CD95}\u{C18C}`,
        "sidepanel.expand": `\u{C0AC}\u{C774}\u{B4DC} \u{D328}\u{B110} \u{D655}\u{C7A5}`,
        "slider.maximum": `\u{CD5C}\u{B300}`,
        "slider.minimum": `\u{CD5C}\u{C18C}`,
        "table.cancel": `\u{CDE8}\u{C18C}`,
        "table.drag": `\u{B4DC}\u{B798}\u{ADF8}`,
        "table.editCell": `\u{C140} \u{D3B8}\u{C9D1}`,
        "table.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "table.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "table.resizeColumn": `\u{C5F4} \u{D06C}\u{AE30} \u{C870}\u{C815}`,
        "table.save": `\u{C800}\u{C7A5}`,
        "table.sortAscending": `\u{C624}\u{B984}\u{CC28}\u{C21C} \u{C815}\u{B82C}`,
        "table.sortDescending": `\u{B0B4}\u{B9BC}\u{CC28}\u{C21C} \u{C815}\u{B82C}`,
        "tag.actions": `\u{C561}\u{C158}`,
        "tag.hideButtonLabel": `\u{AC04}\u{B7B5}\u{D788} \u{BCF4}\u{AE30}`,
        "tag.noTags": `\u{C5C6}\u{C74C}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{BAA8}\u{B450} \u{D45C}\u{C2DC} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{BAA8}\u{B450} \u{C9C0}\u{C6B0}\u{AE30}`,
        "toast.collapse": `\u{C811}\u{AE30}`,
        "toast.showAll": `\u{BAA8}\u{B450} \u{D45C}\u{C2DC}`,
        "treeview.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`
    },
    "lt-LT": {
        "actionbar.actions": `Veiksmai`,
        "actionbar.actionsAvailable": `Galimi veiksmai.`,
        "actionbar.clearSelection": `I\u{161}valyti pasirinkim\u{105}`,
        "actionbar.selected": (args)=>`Pasirinkta: ${args.count}`,
        "actionbar.selectedAll": `Pasirinkta viskas`,
        "actionbutton.pending": `laukiama`,
        "breadcrumbs.more": `Daugiau element\u{173}`,
        "button.pending": `laukiama`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Datos`,
                other: `Dat\u{173}`
            })} pasirinkimas negalimas.`,
        "combobox.loading": `\u{12E}keliama...`,
        "combobox.loadingMore": `\u{12E}keliama daugiau...`,
        "combobox.noResults": `Rezultat\u{173} n\u{117}ra`,
        "contextualhelp.help": `\u{17D}inynas`,
        "contextualhelp.info": `Informacija`,
        "datepicker.endTime": `Pabaigos laikas`,
        "datepicker.startTime": `Prad\u{17E}ios laikas`,
        "datepicker.time": `Laikas`,
        "dialog.alert": `\u{12E}sp\u{117}jimas`,
        "dialog.dismiss": `Atmesti`,
        "dropzone.replaceMessage": `Pa\u{161}alinkite fail\u{105}, kad pakeistum\u{117}te`,
        "inlinealert.informative": `Informacija`,
        "inlinealert.negative": `Klaida`,
        "inlinealert.notice": `\u{12E}sp\u{117}jimas`,
        "inlinealert.positive": `S\u{117}kmingai`,
        "label.(optional)": `(pasirenkama)`,
        "label.(required)": `(privaloma)`,
        "listview.loading": `\u{12E}keliama...`,
        "listview.loadingMore": `\u{12E}keliama daugiau...`,
        "menu.loading": `\u{12E}keliama...`,
        "menu.loadingMore": `\u{12E}keliama daugiau...`,
        "menu.moreActions": `Daugiau veiksm\u{173}`,
        "menu.noResults": `Rezultat\u{173} n\u{117}ra`,
        "menu.unavailable": `Nepasiekiama, nor\u{117}dami gauti daugiau informacijos, i\u{161}skleiskite`,
        "notificationbadge.indicatorOnly": `Nauja veikla`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{12E}keliama...`,
        "picker.loadingMore": `\u{12E}keliama daugiau...`,
        "picker.placeholder": `Pasirinkite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nepasirinktas n\u{117} vienas elementas`,
                one: ()=>`Pasirinktas ${formatter.number(args.count)} elementas`,
                other: ()=>`Pasirinkta element\u{173}: ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `Sutraukti \u{161}onin\u{119} srit\u{12F}`,
        "sidepanel.expand": `I\u{161}skleisti \u{161}onin\u{119} srit\u{12F}`,
        "slider.maximum": `Daugiausia`,
        "slider.minimum": `Ma\u{17E}iausia`,
        "table.cancel": `At\u{161}aukti`,
        "table.drag": `Vilkti`,
        "table.editCell": `Redaguoti langel\u{12F}`,
        "table.loading": `\u{12E}keliama...`,
        "table.loadingMore": `\u{12E}keliama daugiau...`,
        "table.resizeColumn": `Keisti stulpelio dyd\u{12F}`,
        "table.save": `\u{12E}ra\u{161}yti`,
        "table.sortAscending": `Rikiuoti did\u{117}jimo tvarka`,
        "table.sortDescending": `Rikiuoti ma\u{17E}\u{117}jimo tvarka`,
        "tag.actions": `Veiksmai`,
        "tag.hideButtonLabel": `Rodyti ma\u{17E}iau`,
        "tag.noTags": `N\u{117}ra`,
        "tag.showAllButtonLabel": (args, formatter)=>`Rodyti visk\u{105} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `I\u{161}valyti visk\u{105}`,
        "toast.collapse": `Sutraukti`,
        "toast.showAll": `Rodyti visk\u{105}`,
        "treeview.loadingMore": `\u{12E}keliama daugiau...`
    },
    "lv-LV": {
        "actionbar.actions": `Darb\u{12B}bas`,
        "actionbar.actionsAvailable": `Pieejamas darb\u{12B}bas.`,
        "actionbar.clearSelection": `Not\u{12B}r\u{12B}t atlasi`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nav atlas\u{12B}ts nekas`,
                other: ()=>`Atlas\u{12B}ts(-i): ${formatter.number(args.count)}`
            })}`,
        "actionbar.selectedAll": `Atlas\u{12B}ts viss`,
        "actionbutton.pending": `gaida`,
        "breadcrumbs.more": `Vair\u{101}k vienumu`,
        "button.pending": `gaida`,
        "calendar.invalidSelection": (args, formatter)=>`Atlas\u{12B}tais(-ie) ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} nav pieejams(-i).`,
        "combobox.loading": `Notiek iel\u{101}de...`,
        "combobox.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "combobox.noResults": `Nav rezult\u{101}tu`,
        "contextualhelp.help": `Pal\u{12B}dz\u{12B}ba`,
        "contextualhelp.info": `Inform\u{101}cija`,
        "datepicker.endTime": `Beigu laiks`,
        "datepicker.startTime": `S\u{101}kuma laiks`,
        "datepicker.time": `Laiks`,
        "dialog.alert": `Br\u{12B}din\u{101}jums`,
        "dialog.dismiss": `Ner\u{101}d\u{12B}t`,
        "dropzone.replaceMessage": `Lai aizst\u{101}tu, nometiet failu`,
        "inlinealert.informative": `Inform\u{101}cija`,
        "inlinealert.negative": `K\u{13C}\u{16B}da`,
        "inlinealert.notice": `Br\u{12B}din\u{101}jums`,
        "inlinealert.positive": `Izdev\u{101}s`,
        "label.(optional)": `(neoblig\u{101}ti)`,
        "label.(required)": `(oblig\u{101}ti)`,
        "listview.loading": `Notiek iel\u{101}de...`,
        "listview.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "menu.loading": `Notiek iel\u{101}de...`,
        "menu.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "menu.moreActions": `Citas darb\u{12B}bas`,
        "menu.noResults": `Nav rezult\u{101}tu`,
        "menu.unavailable": `Nav pieejams, izv\u{113}rsiet, lai skat\u{12B}tu s\u{12B}k\u{101}ku inform\u{101}ciju`,
        "notificationbadge.indicatorOnly": `Jauna aktivit\u{101}te`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Notiek iel\u{101}de...`,
        "picker.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "picker.placeholder": `Izv\u{113}l\u{113}ties\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nav atlas\u{12B}ts neviens vienums`,
                one: ()=>`${formatter.number(args.count)} vienums atlas\u{12B}ts`,
                other: ()=>`${formatter.number(args.count)} ieraksti vienumi`
            })}`,
        "sidepanel.collapse": `Sak\u{13C}aut s\u{101}nu paneli`,
        "sidepanel.expand": `Izv\u{113}rst s\u{101}nu paneli`,
        "slider.maximum": `Maksim\u{101}l\u{101} v\u{113}rt\u{12B}ba`,
        "slider.minimum": `Minim\u{101}l\u{101} v\u{113}rt\u{12B}ba`,
        "table.cancel": `Atcelt`,
        "table.drag": `Vilk\u{161}ana`,
        "table.editCell": `Redi\u{123}\u{113}t \u{161}\u{16B}nu`,
        "table.loading": `Notiek iel\u{101}de...`,
        "table.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "table.resizeColumn": `Main\u{12B}t kolonnas lielumu`,
        "table.save": `Saglab\u{101}t`,
        "table.sortAscending": `K\u{101}rtot augo\u{161}\u{101} sec\u{12B}b\u{101}`,
        "table.sortDescending": `K\u{101}rtot dilsto\u{161}\u{101} sec\u{12B}b\u{101}`,
        "tag.actions": `Darb\u{12B}bas`,
        "tag.hideButtonLabel": `R\u{101}d\u{12B}t maz\u{101}k`,
        "tag.noTags": `Nav`,
        "tag.showAllButtonLabel": (args, formatter)=>`R\u{101}d\u{12B}t visu (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Not\u{12B}r\u{12B}t visu`,
        "toast.collapse": `Sak\u{13C}aut`,
        "toast.showAll": `R\u{101}d\u{12B}t visu`,
        "treeview.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`
    },
    "nb-NO": {
        "actionbar.actions": `Handlinger`,
        "actionbar.actionsAvailable": `Tilgjengelige handlinger.`,
        "actionbar.clearSelection": `T\xf8m utvalg`,
        "actionbar.selected": (args)=>`Valde element: ${args.count}`,
        "actionbar.selectedAll": `Alle er valgt`,
        "actionbutton.pending": `avventer`,
        "breadcrumbs.more": `Flere elementer`,
        "button.pending": `avventer`,
        "calendar.invalidSelection": (args, formatter)=>`Valgt(e) ${formatter.plural(args.selectedCount, {
                one: `dato`,
                other: `datoer`
            })} er utilgjengelig.`,
        "combobox.loading": `Laster inn...`,
        "combobox.loadingMore": `Laster inn flere...`,
        "combobox.noResults": `Ingen resultater`,
        "contextualhelp.help": `Hjelp`,
        "contextualhelp.info": `Informasjon`,
        "datepicker.endTime": `Sluttid`,
        "datepicker.startTime": `Starttid`,
        "datepicker.time": `Tid`,
        "dialog.alert": `Varsel`,
        "dialog.dismiss": `Lukk`,
        "dropzone.replaceMessage": `Slipp filen for \xe5 erstatte`,
        "inlinealert.informative": `Informasjon`,
        "inlinealert.negative": `Feil`,
        "inlinealert.notice": `Advarsel`,
        "inlinealert.positive": `Vellykket`,
        "label.(optional)": `(valgfritt)`,
        "label.(required)": `(obligatorisk)`,
        "listview.loading": `Laster inn...`,
        "listview.loadingMore": `Laster inn flere...`,
        "menu.loading": `Laster inn...`,
        "menu.loadingMore": `Laster inn flere...`,
        "menu.moreActions": `Flere handlinger`,
        "menu.noResults": `Ingen resultater`,
        "menu.unavailable": `Utilgjengelig, utvid for detaljer`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laster inn...`,
        "picker.loadingMore": `Laster inn flere...`,
        "picker.placeholder": `Velg \u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen elementer er valgt`,
                one: ()=>`${formatter.number(args.count)} element er valgt`,
                other: ()=>`${formatter.number(args.count)} elementer er valgt`
            })}`,
        "sidepanel.collapse": `Skjul sidepanelet`,
        "sidepanel.expand": `Vis sidepanelet`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Avbryt`,
        "table.drag": `Dra`,
        "table.editCell": `Rediger celle`,
        "table.loading": `Laster inn...`,
        "table.loadingMore": `Laster inn flere...`,
        "table.resizeColumn": `Endre st\xf8rrelse p\xe5 kolonne`,
        "table.save": `Lagre`,
        "table.sortAscending": `Sorter stigende`,
        "table.sortDescending": `Sorter synkende`,
        "tag.actions": `Handlinger`,
        "tag.hideButtonLabel": `Vis mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Vis alle (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Fjern alle`,
        "toast.collapse": `Skjul`,
        "toast.showAll": `Vis alle`,
        "treeview.loadingMore": `Laster inn flere...`
    },
    "nl-NL": {
        "actionbar.actions": `Acties`,
        "actionbar.actionsAvailable": `Acties beschikbaar.`,
        "actionbar.clearSelection": `Selectie wissen`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niets geselecteerd`,
                other: ()=>`${formatter.number(args.count)} geselecteerd`
            })}`,
        "actionbar.selectedAll": `Alles geselecteerd`,
        "actionbutton.pending": `in behandeling`,
        "breadcrumbs.more": `Meer items`,
        "button.pending": `in behandeling`,
        "calendar.invalidSelection": (args, formatter)=>`Geselecteerde ${formatter.plural(args.selectedCount, {
                one: `datum`,
                other: `datums`
            })} niet beschikbaar.`,
        "combobox.loading": `Laden...`,
        "combobox.loadingMore": `Meer laden...`,
        "combobox.noResults": `Geen resultaten`,
        "contextualhelp.help": `Help`,
        "contextualhelp.info": `Informatie`,
        "datepicker.endTime": `Eindtijd`,
        "datepicker.startTime": `Starttijd`,
        "datepicker.time": `Tijd`,
        "dialog.alert": `Melding`,
        "dialog.dismiss": `Negeren`,
        "dropzone.replaceMessage": `Bestand neerzetten om te vervangen`,
        "inlinealert.informative": `Informatie`,
        "inlinealert.negative": `Fout`,
        "inlinealert.notice": `Waarschuwing`,
        "inlinealert.positive": `Geslaagd`,
        "label.(optional)": `(optioneel)`,
        "label.(required)": `(vereist)`,
        "listview.loading": `Laden...`,
        "listview.loadingMore": `Meer laden...`,
        "menu.loading": `Laden...`,
        "menu.loadingMore": `Meer laden...`,
        "menu.moreActions": `Meer handelingen`,
        "menu.noResults": `Geen resultaten`,
        "menu.unavailable": `Niet beschikbaar, uitvouwen voor meer informatie`,
        "notificationbadge.indicatorOnly": `Nieuwe activiteit`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laden...`,
        "picker.loadingMore": `Meer laden...`,
        "picker.placeholder": `Selecteren\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Geen items geselecteerd`,
                one: ()=>`${formatter.number(args.count)} item geselecteerd`,
                other: ()=>`${formatter.number(args.count)} items geselecteerd`
            })}`,
        "sidepanel.collapse": `Zijpaneel samenvouwen`,
        "sidepanel.expand": `Zijpaneel uitvouwen`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuleren`,
        "table.drag": `Slepen`,
        "table.editCell": `Cel bewerken`,
        "table.loading": `Laden...`,
        "table.loadingMore": `Meer laden...`,
        "table.resizeColumn": `Kolomgrootte wijzigen`,
        "table.save": `Opslaan`,
        "table.sortAscending": `Oplopend sorteren`,
        "table.sortDescending": `Aflopend sorteren`,
        "tag.actions": `Acties`,
        "tag.hideButtonLabel": `Minder weergeven`,
        "tag.noTags": `Geen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Alles tonen (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Alles wissen`,
        "toast.collapse": `Samenvouwen`,
        "toast.showAll": `Alles weergeven`,
        "treeview.loadingMore": `Meer laden...`
    },
    "pl-PL": {
        "actionbar.actions": `Dzia\u{142}ania`,
        "actionbar.actionsAvailable": `Dost\u{119}pne dzia\u{142}ania.`,
        "actionbar.clearSelection": `Wyczy\u{15B}\u{107} zaznaczenie`,
        "actionbar.selected": (args)=>`Zaznaczono: ${args.count}`,
        "actionbar.selectedAll": `Wszystkie zaznaczone`,
        "actionbutton.pending": `oczekuj\u{105}ce`,
        "breadcrumbs.more": `Wi\u{119}cej element\xf3w`,
        "button.pending": `oczekuj\u{105}ce`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Wybrana data jest niedost\u{119}pna`,
                other: `Wybrane daty s\u{105} niedost\u{119}pne`
            })}.`,
        "combobox.loading": `Wczytywanie...`,
        "combobox.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "combobox.noResults": `Brak wynik\xf3w`,
        "contextualhelp.help": `Pomoc`,
        "contextualhelp.info": `Informacja`,
        "datepicker.endTime": `Godzina ko\u{144}cowa`,
        "datepicker.startTime": `Godzina pocz\u{105}tkowa`,
        "datepicker.time": `Godzina`,
        "dialog.alert": `Ostrze\u{17C}enie`,
        "dialog.dismiss": `Zignoruj`,
        "dropzone.replaceMessage": `Upu\u{15B}\u{107} plik, aby zast\u{105}pi\u{107}`,
        "inlinealert.informative": `Informacja`,
        "inlinealert.negative": `B\u{142}\u{105}d`,
        "inlinealert.notice": `Ostrze\u{17C}enie`,
        "inlinealert.positive": `Powodzenie`,
        "label.(optional)": `(opcjonalne)`,
        "label.(required)": `(wymagane)`,
        "listview.loading": `Wczytywanie...`,
        "listview.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "menu.loading": `Wczytywanie...`,
        "menu.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "menu.moreActions": `Wi\u{119}cej akcji`,
        "menu.noResults": `Brak wynik\xf3w`,
        "menu.unavailable": `Niedost\u{119}pne, rozwi\u{144}, aby zobaczy\u{107} szczeg\xf3\u{142}y`,
        "notificationbadge.indicatorOnly": `Nowa aktywno\u{15B}\u{107}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Wczytywanie...`,
        "picker.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "picker.placeholder": `Zaznacz\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nie zaznaczono \u{17C}adnych element\xf3w`,
                one: ()=>`${formatter.number(args.count)} zaznaczony element`,
                few: ()=>`${formatter.number(args.count)} zaznaczone elementy`,
                many: ()=>`${formatter.number(args.count)} zaznaczonych element\xf3w`,
                other: ()=>`${formatter.number(args.count)} zaznaczonych element\xf3w`
            })}`,
        "sidepanel.collapse": `Zwi\u{144} panel boczny`,
        "sidepanel.expand": `Rozwi\u{144} panel boczny`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Anuluj`,
        "table.drag": `Przeci\u{105}gnij`,
        "table.editCell": `Edytuj kom\xf3rk\u{119}`,
        "table.loading": `Wczytywanie...`,
        "table.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "table.resizeColumn": `Zmie\u{144} rozmiar kolumny`,
        "table.save": `Zapisz`,
        "table.sortAscending": `Sortuj rosn\u{105}co`,
        "table.sortDescending": `Sortuj malej\u{105}co`,
        "tag.actions": `Dzia\u{142}ania`,
        "tag.hideButtonLabel": `Wy\u{15B}wietl mniej`,
        "tag.noTags": `Brak`,
        "tag.showAllButtonLabel": (args, formatter)=>`Poka\u{17C} wszystko (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Wyczy\u{15B}\u{107} wszystko`,
        "toast.collapse": `Zwi\u{144}`,
        "toast.showAll": `Poka\u{17C} wszystko`,
        "treeview.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`
    },
    "pt-BR": {
        "actionbar.actions": `A\xe7\xf5es`,
        "actionbar.actionsAvailable": `A\xe7\xf5es dispon\xedveis.`,
        "actionbar.clearSelection": `Limpar sele\xe7\xe3o`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum selecionado`,
                one: ()=>`${formatter.number(args.count)} selecionado`,
                other: ()=>`${formatter.number(args.count)} selecionados`
            })}`,
        "actionbar.selectedAll": `Todos selecionados`,
        "actionbutton.pending": `pendente`,
        "breadcrumbs.more": `Mais itens`,
        "button.pending": `pendente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data`,
                other: `Datas`
            })} selecionada(s) indispon\xedvel(is).`,
        "combobox.loading": `Carregando...`,
        "combobox.loadingMore": `Carregando mais...`,
        "combobox.noResults": `Nenhum resultado`,
        "contextualhelp.help": `Ajuda`,
        "contextualhelp.info": `Informa\xe7\xf5es`,
        "datepicker.endTime": `Hora final`,
        "datepicker.startTime": `Hora inicial`,
        "datepicker.time": `Hora`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Descartar`,
        "dropzone.replaceMessage": `Solte o arquivo para substituir`,
        "inlinealert.informative": `Informa\xe7\xf5es`,
        "inlinealert.negative": `Erro`,
        "inlinealert.notice": `Aviso`,
        "inlinealert.positive": `Sucesso`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obrigat\xf3rio)`,
        "listview.loading": `Carregando...`,
        "listview.loadingMore": `Carregando mais...`,
        "menu.loading": `Carregando...`,
        "menu.loadingMore": `Carregando mais...`,
        "menu.moreActions": `Mais a\xe7\xf5es`,
        "menu.noResults": `Nenhum resultado`,
        "menu.unavailable": `Indispon\xedvel. Expanda para ver os detalhes`,
        "notificationbadge.indicatorOnly": `Nova atividade`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Carregando...`,
        "picker.loadingMore": `Carregando mais...`,
        "picker.placeholder": `Selecionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum item selecionado`,
                one: ()=>`${formatter.number(args.count)} item selecionado`,
                other: ()=>`${formatter.number(args.count)} itens selecionados`
            })}`,
        "sidepanel.collapse": `Recolher o painel lateral`,
        "sidepanel.expand": `Expandir o painel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arraste`,
        "table.editCell": `Editar c\xe9lula`,
        "table.loading": `Carregando...`,
        "table.loadingMore": `Carregando mais...`,
        "table.resizeColumn": `Redimensionar coluna`,
        "table.save": `Salvar`,
        "table.sortAscending": `Ordenar por ordem crescente`,
        "table.sortDescending": `Ordenar por ordem decrescente`,
        "tag.actions": `A\xe7\xf5es`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Nenhum`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar tudo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Limpar tudo`,
        "toast.collapse": `Recolher`,
        "toast.showAll": `Mostrar tudo`,
        "treeview.loadingMore": `Carregando mais...`
    },
    "pt-PT": {
        "actionbar.actions": `A\xe7\xf5es`,
        "actionbar.actionsAvailable": `A\xe7\xf5es dispon\xedveis.`,
        "actionbar.clearSelection": `Limpar sele\xe7\xe3o`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum selecionado`,
                one: ()=>`${formatter.number(args.count)} selecionado`,
                other: ()=>`${formatter.number(args.count)} selecionados`
            })}`,
        "actionbar.selectedAll": `Tudo selecionado`,
        "actionbutton.pending": `pendente`,
        "breadcrumbs.more": `Mais artigos`,
        "button.pending": `pendente`,
        "calendar.invalidSelection": (args, formatter)=>`A(s) ${formatter.plural(args.selectedCount, {
                one: `data`,
                other: `datas`
            })} selecionada(s) n\xe3o est\xe1(\xe3o) dispon\xedvel/dispon\xedvel(eis).`,
        "combobox.loading": `A carregar...`,
        "combobox.loadingMore": `A carregar mais...`,
        "combobox.noResults": `Sem resultados`,
        "contextualhelp.help": `Ajuda`,
        "contextualhelp.info": `Informa\xe7\xe3o`,
        "datepicker.endTime": `Terminar tempo`,
        "datepicker.startTime": `Iniciar tempo`,
        "datepicker.time": `Tempo`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Dispensar`,
        "dropzone.replaceMessage": `Largar ficheiro para substituir`,
        "inlinealert.informative": `Informa\xe7\xe3o`,
        "inlinealert.negative": `Erro`,
        "inlinealert.notice": `Aviso`,
        "inlinealert.positive": `Sucesso`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obrigat\xf3rio)`,
        "listview.loading": `A carregar...`,
        "listview.loadingMore": `A carregar mais...`,
        "menu.loading": `A carregar...`,
        "menu.loadingMore": `A carregar mais...`,
        "menu.moreActions": `Mais a\xe7\xf5es`,
        "menu.noResults": `Sem resultados`,
        "menu.unavailable": `Indispon\xedvel, expandir para mais detalhes`,
        "notificationbadge.indicatorOnly": `Nova atividade`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `A carregar...`,
        "picker.loadingMore": `A carregar mais...`,
        "picker.placeholder": `Selecionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum item selecionado`,
                one: ()=>`${formatter.number(args.count)} item selecionado`,
                other: ()=>`${formatter.number(args.count)} itens selecionados`
            })}.`,
        "sidepanel.collapse": `Fechar o painel lateral`,
        "sidepanel.expand": `Expandir o painel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arrastar`,
        "table.editCell": `Editar c\xe9lula`,
        "table.loading": `A carregar...`,
        "table.loadingMore": `A carregar mais...`,
        "table.resizeColumn": `Redimensionar coluna`,
        "table.save": `Guardar`,
        "table.sortAscending": `Ordenar por ordem ascendente`,
        "table.sortDescending": `Ordenar por ordem decrescente`,
        "tag.actions": `A\xe7\xf5es`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Nenhum`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar tudo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Limpar tudo`,
        "toast.collapse": `Colapsar`,
        "toast.showAll": `Mostrar tudo`,
        "treeview.loadingMore": `A carregar mais...`
    },
    "ro-RO": {
        "actionbar.actions": `Ac\u{21B}iuni`,
        "actionbar.actionsAvailable": `Ac\u{21B}iuni disponibile.`,
        "actionbar.clearSelection": `Goli\u{21B}i selec\u{21B}ia`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niciunul selectat`,
                one: ()=>` ${formatter.number(args.count)} selectat`,
                other: ()=>`${formatter.number(args.count)} selectate`
            })}`,
        "actionbar.selectedAll": `Toate elementele selectate`,
        "actionbutton.pending": `\xeen a\u{219}teptare`,
        "breadcrumbs.more": `Mai multe articole`,
        "button.pending": `\xeen a\u{219}teptare`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data selectat\u{103} nu este disponibil\u{103}`,
                other: `Datele selectate nu sunt disponibile`
            })}.`,
        "combobox.loading": `Se \xeencarc\u{103}...`,
        "combobox.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "combobox.noResults": `Niciun rezultat`,
        "contextualhelp.help": `Ajutor`,
        "contextualhelp.info": `Informa\u{21B}ii`,
        "datepicker.endTime": `Ora de sf\xe2r\u{219}it`,
        "datepicker.startTime": `Ora de \xeenceput`,
        "datepicker.time": `Ora`,
        "dialog.alert": `Alert\u{103}`,
        "dialog.dismiss": `Revocare`,
        "dropzone.replaceMessage": `Plasa\u{21B}i fi\u{219}ierul pentru a \xeenlocui`,
        "inlinealert.informative": `Informa\u{21B}ii`,
        "inlinealert.negative": `Eroare`,
        "inlinealert.notice": `Avertisment`,
        "inlinealert.positive": `Succes`,
        "label.(optional)": `(op\u{163}ional)`,
        "label.(required)": `(obligatoriu)`,
        "listview.loading": `Se \xeencarc\u{103}...`,
        "listview.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "menu.loading": `Se \xeencarc\u{103}...`,
        "menu.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "menu.moreActions": `Mai multe ac\u{21B}iuni`,
        "menu.noResults": `Niciun rezultat`,
        "menu.unavailable": `Indisponibil, extinde\u{21B}i pentru detalii`,
        "notificationbadge.indicatorOnly": `Activitate nou\u{103}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Se \xeencarc\u{103}...`,
        "picker.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "picker.placeholder": `Selecta\u{21B}i\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niciun articol selectat`,
                one: ()=>`${formatter.number(args.count)} articol selectat`,
                other: ()=>`${formatter.number(args.count)} articole selectate`
            })}`,
        "sidepanel.collapse": `Restr\xe2nge\u{21B}i panoul lateral`,
        "sidepanel.expand": ` Extinde\u{21B}i panoul lateral`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Anulare`,
        "table.drag": `Trage\u{21B}i`,
        "table.editCell": `Edita\u{21B}i celula`,
        "table.loading": `Se \xeencarc\u{103}...`,
        "table.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "table.resizeColumn": `Redimensiona\u{21B}i coloana`,
        "table.save": `Salva\u{21B}i`,
        "table.sortAscending": `Sorta\u{21B}i cresc\u{103}tor`,
        "table.sortDescending": `Sorta\u{21B}i descresc\u{103}tor`,
        "tag.actions": `Ac\u{21B}iuni`,
        "tag.hideButtonLabel": `Se afi\u{219}eaz\u{103} mai pu\u{21B}in`,
        "tag.noTags": `Niciuna`,
        "tag.showAllButtonLabel": (args, formatter)=>`Se afi\u{219}eaz\u{103} tot (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Goli\u{21B}i tot`,
        "toast.collapse": `Restr\xe2nge\u{21B}i`,
        "toast.showAll": `Afi\u{219}a\u{21B}i tot`,
        "treeview.loadingMore": `Se \xeencarc\u{103} mai multe...`
    },
    "ru-RU": {
        "actionbar.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "actionbar.actionsAvailable": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F} \u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{44B}.`,
        "actionbar.clearSelection": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{44C} \u{432}\u{44B}\u{431}\u{43E}\u{440}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{435} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                other: ()=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${formatter.number(args.count)}`
            })}`,
        "actionbar.selectedAll": `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} \u{432}\u{441}\u{435}`,
        "actionbutton.pending": `\u{432} \u{43E}\u{436}\u{438}\u{434}\u{430}\u{43D}\u{438}\u{438}`,
        "breadcrumbs.more": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{44B}\u{435} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{44B}`,
        "button.pending": `\u{432} \u{43E}\u{436}\u{438}\u{434}\u{430}\u{43D}\u{438}\u{438}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{430}\u{44F} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{430}`,
                other: `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{435} \u{434}\u{430}\u{442}\u{44B} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{44B}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "combobox.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "combobox.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{44B} \u{43E}\u{442}\u{441}\u{443}\u{442}\u{441}\u{442}\u{432}\u{443}\u{44E}\u{442}`,
        "contextualhelp.help": `\u{421}\u{43F}\u{440}\u{430}\u{432}\u{43A}\u{430}`,
        "contextualhelp.info": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "datepicker.endTime": `\u{412}\u{440}\u{435}\u{43C}\u{44F} \u{43E}\u{43A}\u{43E}\u{43D}\u{447}\u{430}\u{43D}\u{438}\u{44F}`,
        "datepicker.startTime": `\u{412}\u{440}\u{435}\u{43C}\u{44F} \u{43D}\u{430}\u{447}\u{430}\u{43B}\u{430}`,
        "datepicker.time": `\u{412}\u{440}\u{435}\u{43C}\u{44F}`,
        "dialog.alert": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "dialog.dismiss": `\u{41F}\u{440}\u{43E}\u{43F}\u{443}\u{441}\u{442}\u{438}\u{442}\u{44C}`,
        "dropzone.replaceMessage": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{449}\u{438}\u{442}\u{435} \u{444}\u{430}\u{439}\u{43B} \u{434}\u{43B}\u{44F} \u{437}\u{430}\u{43C}\u{435}\u{43D}\u{44B}`,
        "inlinealert.informative": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "inlinealert.negative": `\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{435}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{434}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{43E})`,
        "label.(required)": `(\u{43E}\u{431}\u{44F}\u{437}\u{430}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "listview.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.moreActions": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{44B}\u{435} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "menu.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{44B} \u{43E}\u{442}\u{441}\u{443}\u{442}\u{441}\u{442}\u{432}\u{443}\u{44E}\u{442}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}, \u{440}\u{430}\u{437}\u{432}\u{435}\u{440}\u{43D}\u{438}\u{442}\u{435} \u{434}\u{43B}\u{44F} \u{43F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{43E}\u{441}\u{442}\u{435}\u{439}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430}\u{44F} \u{430}\u{43A}\u{442}\u{438}\u{432}\u{43D}\u{43E}\u{441}\u{442}\u{44C}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "picker.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "picker.placeholder": `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{442}\u{44C}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{435}\u{442} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432}`,
                one: ()=>`${formatter.number(args.count)} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}`,
                other: ()=>`${formatter.number(args.count)} \u{44D}\u{43B}. \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`
            })}`,
        "sidepanel.collapse": `\u{421}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C} \u{431}\u{43E}\u{43A}\u{43E}\u{432}\u{443}\u{44E} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "sidepanel.expand": `\u{420}\u{430}\u{437}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C} \u{431}\u{43E}\u{43A}\u{43E}\u{432}\u{443}\u{44E} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{438}\u{43D}\u{438}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{41E}\u{442}\u{43C}\u{435}\u{43D}\u{430}`,
        "table.drag": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{441}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{435}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{43A}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{44F}\u{447}\u{435}\u{439}\u{43A}\u{443}`,
        "table.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "table.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "table.resizeColumn": `\u{418}\u{437}\u{43C}\u{435}\u{43D}\u{438}\u{442}\u{44C} \u{440}\u{430}\u{437}\u{43C}\u{435}\u{440} \u{441}\u{442}\u{43E}\u{43B}\u{431}\u{446}\u{430}`,
        "table.save": `\u{421}\u{43E}\u{445}\u{440}\u{430}\u{43D}\u{438}\u{442}\u{44C}`,
        "table.sortAscending": `\u{421}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{43F}\u{43E} \u{432}\u{43E}\u{437}\u{440}\u{430}\u{441}\u{442}\u{430}\u{43D}\u{438}\u{44E}`,
        "table.sortDescending": `\u{421}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{43F}\u{43E} \u{443}\u{431}\u{44B}\u{432}\u{430}\u{43D}\u{438}\u{44E}`,
        "tag.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{43C}\u{435}\u{43D}\u{44C}\u{448}\u{435}`,
        "tag.noTags": `\u{41D}\u{435}\u{442}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{432}\u{441}\u{435} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{44C} \u{432}\u{441}\u{435}`,
        "toast.collapse": `\u{421}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{432}\u{441}\u{435}`,
        "treeview.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`
    },
    "sk-SK": {
        "actionbar.actions": `Akcie`,
        "actionbar.actionsAvailable": `Dostupn\xe9 akcie.`,
        "actionbar.clearSelection": `Vymaza\u{165} v\xfdber`,
        "actionbar.selected": (args)=>`Vybran\xe9 polo\u{17E}ky: ${args.count}`,
        "actionbar.selectedAll": `V\u{161}etky vybrat\xe9 polo\u{17E}ky`,
        "actionbutton.pending": `\u{10D}akaj\xface`,
        "breadcrumbs.more": `\u{10E}al\u{161}ie polo\u{17E}ky`,
        "button.pending": `\u{10D}akaj\xface`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Vybrat\xfd d\xe1tum`,
                other: `Vybrat\xe9 d\xe1tumy`
            })}: nedostupn\xe9.`,
        "combobox.loading": `Na\u{10D}\xedtava sa...`,
        "combobox.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "combobox.noResults": `\u{17D}iadne v\xfdsledky`,
        "contextualhelp.help": `Pomoc`,
        "contextualhelp.info": `Inform\xe1cie`,
        "datepicker.endTime": `\u{10C}as ukon\u{10D}enia`,
        "datepicker.startTime": `\u{10C}as za\u{10D}iatku`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `Upozornenie`,
        "dialog.dismiss": `Zru\u{161}i\u{165}`,
        "dropzone.replaceMessage": `Presu\u{148}te s\xfabor, ktor\xfd chcete nahradi\u{165}`,
        "inlinealert.informative": `Inform\xe1cie`,
        "inlinealert.negative": `Chyba`,
        "inlinealert.notice": `Upozornenie`,
        "inlinealert.positive": `\xdaspech`,
        "label.(optional)": `(nepovinn\xe9)`,
        "label.(required)": `(povinn\xe9)`,
        "listview.loading": `Na\u{10D}\xedtava sa...`,
        "listview.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "menu.loading": `Na\u{10D}\xedtava sa...`,
        "menu.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "menu.moreActions": `\u{10E}al\u{161}ie akcie`,
        "menu.noResults": `\u{17D}iadne v\xfdsledky`,
        "menu.unavailable": `Nedostupn\xe9, rozba\u{13E}te podrobnosti`,
        "notificationbadge.indicatorOnly": `Nov\xe1 aktivita`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Na\u{10D}\xedtava sa...`,
        "picker.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "picker.placeholder": `Vybra\u{165}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{17D}iadne vybrat\xe9 polo\u{17E}ky`,
                one: ()=>`${formatter.number(args.count)} vybrat\xe1 polo\u{17E}ka`,
                other: ()=>`Po\u{10D}et vybrat\xfdch polo\u{17E}iek ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `Zbali\u{165} bo\u{10D}n\xfd panel`,
        "sidepanel.expand": `Rozbali\u{165} bo\u{10D}n\xfd panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Zru\u{161}i\u{165}`,
        "table.drag": `Presun\xfa\u{165}`,
        "table.editCell": `Upravi\u{165} bunku`,
        "table.loading": `Na\u{10D}\xedtava sa...`,
        "table.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "table.resizeColumn": `Zmeni\u{165} ve\u{13E}kos\u{165} st\u{13A}pca`,
        "table.save": `Ulo\u{17E}i\u{165}`,
        "table.sortAscending": `Zoradi\u{165} vzostupne`,
        "table.sortDescending": `Zoradi\u{165} zostupne`,
        "tag.actions": `Akcie`,
        "tag.hideButtonLabel": `Zobrazi\u{165} menej`,
        "tag.noTags": `\u{17D}iadne`,
        "tag.showAllButtonLabel": (args, formatter)=>`Zobrazi\u{165} v\u{161}etko (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Vymaza\u{165} v\u{161}etko`,
        "toast.collapse": `Zbali\u{165}`,
        "toast.showAll": `Zobrazi\u{165} v\u{161}etko`,
        "treeview.loadingMore": `Na\u{10D}\xedtava sa viac...`
    },
    "sl-SI": {
        "actionbar.actions": `Dejanja`,
        "actionbar.actionsAvailable": `Na voljo so dejanja.`,
        "actionbar.clearSelection": `Po\u{10D}isti izbor`,
        "actionbar.selected": (args)=>`Izbrano: ${args.count}`,
        "actionbar.selectedAll": `Izbrano vse`,
        "actionbutton.pending": `v teku`,
        "breadcrumbs.more": `Ve\u{10D} elementov`,
        "button.pending": `v teku`,
        "calendar.invalidSelection": (args, formatter)=>`Izbrano ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} ni na voljo.`,
        "combobox.loading": `Nalaganje...`,
        "combobox.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "combobox.noResults": `Ni rezultatov`,
        "contextualhelp.help": `Pomo\u{10D}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Kon\u{10D}ni \u{10D}as`,
        "datepicker.startTime": `Za\u{10D}etni \u{10D}as`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `Opozorilo`,
        "dialog.dismiss": `Opusti`,
        "dropzone.replaceMessage": `Spustite datoteko za zamenjavo`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Napaka`,
        "inlinealert.notice": `Opozorilo`,
        "inlinealert.positive": `Uspe\u{161}no`,
        "label.(optional)": `(opcijsko)`,
        "label.(required)": `(obvezno)`,
        "listview.loading": `Nalaganje...`,
        "listview.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "menu.loading": `Nalaganje...`,
        "menu.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "menu.moreActions": `Ve\u{10D} mo\u{17E}nosti`,
        "menu.noResults": `Ni rezultatov`,
        "menu.unavailable": `Ni na voljo, raz\u{161}irite za podrobnosti`,
        "notificationbadge.indicatorOnly": `Nova dejavnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Nalaganje...`,
        "picker.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "picker.placeholder": `Izberite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ni izbranih elementov`,
                one: ()=>`izbran je ${formatter.number(args.count)} element`,
                other: ()=>`izbranih je ${formatter.number(args.count)} elementov`
            })}.`,
        "sidepanel.collapse": `Strni stransko podokno`,
        "sidepanel.expand": `Raz\u{161}iri stransko podokno`,
        "slider.maximum": `Najve\u{10D}ji`,
        "slider.minimum": `Najmanj`,
        "table.cancel": `Prekli\u{10D}i`,
        "table.drag": `Povleci`,
        "table.editCell": `Uredi celico`,
        "table.loading": `Nalaganje...`,
        "table.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "table.resizeColumn": `Spremeni velikost stolpca`,
        "table.save": `Shrani`,
        "table.sortAscending": `Razvrsti nara\u{161}\u{10D}ajo\u{10D}e`,
        "table.sortDescending": `Razvrsti padajo\u{10D}e`,
        "tag.actions": `Dejanja`,
        "tag.hideButtonLabel": `Prika\u{17E}i manj`,
        "tag.noTags": `Ni\u{10D}`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E} vse (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Po\u{10D}isti vse`,
        "toast.collapse": `Strni`,
        "toast.showAll": `Prika\u{17E}i vse`,
        "treeview.loadingMore": `Nalaganje ve\u{10D} vsebine...`
    },
    "sr-SP": {
        "actionbar.actions": `Radnje`,
        "actionbar.actionsAvailable": `Dostupne su radnje.`,
        "actionbar.clearSelection": `Poni\u{161}ti izbor`,
        "actionbar.selected": (args)=>`Izabrano: ${args.count}`,
        "actionbar.selectedAll": `Sve je izabrano`,
        "actionbutton.pending": `nere\u{161}eno`,
        "breadcrumbs.more": `Vi\u{161}e stavki`,
        "button.pending": `nere\u{161}eno`,
        "calendar.invalidSelection": (args, formatter)=>`Izabrani ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} nije dostupan.`,
        "combobox.loading": `U\u{10D}itavam...`,
        "combobox.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "combobox.noResults": `Nema rezultata`,
        "contextualhelp.help": `Pomo\u{107}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Zavr\u{161}no vreme`,
        "datepicker.startTime": `Po\u{10D}etno vreme`,
        "datepicker.time": `Vreme`,
        "dialog.alert": `Upozorenje`,
        "dialog.dismiss": `Odbaci`,
        "dropzone.replaceMessage": `Otpustite datoteku radi zamene`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Gre\u{161}ka`,
        "inlinealert.notice": `Upozorenje`,
        "inlinealert.positive": `Uspe\u{161}no`,
        "label.(optional)": `(opciono)`,
        "label.(required)": `(obavezno)`,
        "listview.loading": `U\u{10D}itavam...`,
        "listview.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.loading": `U\u{10D}itavam...`,
        "menu.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.moreActions": `Dodatne radnje`,
        "menu.noResults": `Nema rezultata`,
        "menu.unavailable": `Nije dostupno, pro\u{161}irite za detalje`,
        "notificationbadge.indicatorOnly": `Nova aktivnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `U\u{10D}itavam...`,
        "picker.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "picker.placeholder": `Izaberite...`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nije izabrana nijedna stavka`,
                one: ()=>`Izabrana je ${formatter.number(args.count)} stavka`,
                other: ()=>`Izabrano je ${formatter.number(args.count)} stavki`
            })}`,
        "sidepanel.collapse": `Skupi bo\u{10D}nu tablu`,
        "sidepanel.expand": `Pro\u{161}iri bo\u{10D}nu tablu`,
        "slider.maximum": `Najvi\u{161}e`,
        "slider.minimum": `Najmanje`,
        "table.cancel": `Otka\u{17E}i`,
        "table.drag": `Prevuci`,
        "table.editCell": `Uredi \u{107}eliju`,
        "table.loading": `U\u{10D}itavam...`,
        "table.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "table.resizeColumn": `Promeni veli\u{10D}inu kolone`,
        "table.save": `Sa\u{10D}uvaj`,
        "table.sortAscending": `Sortiraj po rastu\u{107}em redosledu`,
        "table.sortDescending": `Sortiraj po opadaju\u{107}em redosledu`,
        "tag.actions": `Radnje`,
        "tag.hideButtonLabel": `Prika\u{17E}i manje`,
        "tag.noTags": `Ne postoji`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E}i sve (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Obri\u{161}i sve`,
        "toast.collapse": ` Skupi`,
        "toast.showAll": `Prika\u{17E}i sve`,
        "treeview.loadingMore": `U\u{10D}itavam jo\u{161}...`
    },
    "sv-SE": {
        "actionbar.actions": `\xc5tg\xe4rder`,
        "actionbar.actionsAvailable": `\xc5tg\xe4rder finns.`,
        "actionbar.clearSelection": `Rensa markering`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Inga valda`,
                one: ()=>`${formatter.number(args.count)} vald`,
                other: ()=>`${formatter.number(args.count)} valda`
            })}`,
        "actionbar.selectedAll": `Alla markerade`,
        "actionbutton.pending": `v\xe4ntande`,
        "breadcrumbs.more": `Fler artiklar`,
        "button.pending": `v\xe4ntande`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Valt datum \xe4r inte tillg\xe4ngligt.`,
                other: `Valda datum \xe4r inte tillg\xe4ngliga.`
            })}`,
        "combobox.loading": `L\xe4ser in...`,
        "combobox.loadingMore": `L\xe4ser in mer...`,
        "combobox.noResults": `Inga resultat`,
        "contextualhelp.help": `Hj\xe4lp`,
        "contextualhelp.info": `Information`,
        "datepicker.endTime": `Sluttid`,
        "datepicker.startTime": `Starttid`,
        "datepicker.time": `Tid`,
        "dialog.alert": `Varning`,
        "dialog.dismiss": `Avvisa`,
        "dropzone.replaceMessage": `Sl\xe4pp filen f\xf6r att ers\xe4tta`,
        "inlinealert.informative": `Information`,
        "inlinealert.negative": `Fel`,
        "inlinealert.notice": `Varning`,
        "inlinealert.positive": `Lyckades`,
        "label.(optional)": `(valfritt)`,
        "label.(required)": `(kr\xe4vs)`,
        "listview.loading": `L\xe4ser in...`,
        "listview.loadingMore": `L\xe4ser in mer...`,
        "menu.loading": `L\xe4ser in...`,
        "menu.loadingMore": `L\xe4ser in mer...`,
        "menu.moreActions": `Fler \xe5tg\xe4rder`,
        "menu.noResults": `Inga resultat`,
        "menu.unavailable": `Ej tillg\xe4nglig, expandera f\xf6r mer information`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `L\xe4ser in...`,
        "picker.loadingMore": `L\xe4ser in mer...`,
        "picker.placeholder": `V\xe4lj\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Inga objekt markerade`,
                one: ()=>`${formatter.number(args.count)} objekt markerat`,
                other: ()=>`${formatter.number(args.count)} objekt markerade`
            })}.`,
        "sidepanel.collapse": `D\xf6lj sidopanelen`,
        "sidepanel.expand": `Expandera sidopanelen`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Avbryt`,
        "table.drag": `Dra`,
        "table.editCell": `Redigera cell`,
        "table.loading": `L\xe4ser in...`,
        "table.loadingMore": `L\xe4ser in mer...`,
        "table.resizeColumn": `\xc4ndra storlek p\xe5 kolumn`,
        "table.save": `Spara`,
        "table.sortAscending": `Sortera i stigande ordning`,
        "table.sortDescending": `Sortera i fallande ordning`,
        "tag.actions": `\xc5tg\xe4rder`,
        "tag.hideButtonLabel": `Visa mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Visa alla (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Rensa alla`,
        "toast.collapse": `D\xf6lj`,
        "toast.showAll": `Visa alla`,
        "treeview.loadingMore": `L\xe4ser in mer...`
    },
    "tr-TR": {
        "actionbar.actions": `Eylemler`,
        "actionbar.actionsAvailable": `Eylemler mevcut.`,
        "actionbar.clearSelection": `Se\xe7imi temizle`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Hi\xe7biri se\xe7ilmedi`,
                other: ()=>`${formatter.number(args.count)} se\xe7ildi`
            })}`,
        "actionbar.selectedAll": `T\xfcm\xfc se\xe7ildi`,
        "actionbutton.pending": `beklemede`,
        "breadcrumbs.more": `Daha fazla \xf6\u{11F}e`,
        "button.pending": `beklemede`,
        "calendar.invalidSelection": (args, formatter)=>`Se\xe7ilen ${formatter.plural(args.selectedCount, {
                one: `tarih`,
                other: `tarihler`
            })} m\xfcsait de\u{11F}il.`,
        "combobox.loading": `Y\xfckleniyor...`,
        "combobox.loadingMore": `Daha fazla y\xfckleniyor...`,
        "combobox.noResults": `Sonu\xe7 yok`,
        "contextualhelp.help": `Yard\u{131}m`,
        "contextualhelp.info": `Bilgiler`,
        "datepicker.endTime": `Biti\u{15F} saati`,
        "datepicker.startTime": `Ba\u{15F}lang\u{131}\xe7 saati`,
        "datepicker.time": `Saat`,
        "dialog.alert": `Uyar\u{131}`,
        "dialog.dismiss": `Kapat`,
        "dropzone.replaceMessage": `De\u{11F}i\u{15F}tirmek i\xe7in dosyay\u{131} b\u{131}rak\u{131}n`,
        "inlinealert.informative": `Bilgiler`,
        "inlinealert.negative": `Hata`,
        "inlinealert.notice": `Uyar\u{131}`,
        "inlinealert.positive": `Ba\u{15F}ar\u{131}l\u{131}`,
        "label.(optional)": `(iste\u{11F}e ba\u{11F}l\u{131})`,
        "label.(required)": `(gerekli)`,
        "listview.loading": `Y\xfckleniyor...`,
        "listview.loadingMore": `Daha fazla y\xfckleniyor...`,
        "menu.loading": `Y\xfckleniyor...`,
        "menu.loadingMore": `Daha fazla y\xfckleniyor...`,
        "menu.moreActions": `Daha fazla eylem`,
        "menu.noResults": `Sonu\xe7 yok`,
        "menu.unavailable": `Kullan\u{131}lam\u{131}yor, ayr\u{131}nt\u{131}lar\u{131} g\xf6rmek i\xe7in geni\u{15F}letin`,
        "notificationbadge.indicatorOnly": `Yeni etkinlik`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Y\xfckleniyor...`,
        "picker.loadingMore": `Daha fazla y\xfckleniyor...`,
        "picker.placeholder": `Se\xe7in\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Hi\xe7bir \xf6ge se\xe7ilmedi`,
                one: ()=>`${formatter.number(args.count)} \xf6ge se\xe7ildi`,
                other: ()=>`${formatter.number(args.count)} \xf6ge se\xe7ildi`
            })}`,
        "sidepanel.collapse": `Yan paneli daralt`,
        "sidepanel.expand": `Yan paneli geni\u{15F}let`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `\u{130}ptal et`,
        "table.drag": `S\xfcr\xfckle`,
        "table.editCell": `H\xfccreyi d\xfczenle`,
        "table.loading": `Y\xfckleniyor...`,
        "table.loadingMore": `Daha fazla y\xfckleniyor...`,
        "table.resizeColumn": `S\xfctunu yeniden boyutland\u{131}r`,
        "table.save": `Kaydet`,
        "table.sortAscending": `Artan S\u{131}ralama`,
        "table.sortDescending": `Azalan S\u{131}ralama`,
        "tag.actions": `Eylemler`,
        "tag.hideButtonLabel": `Daha az g\xf6ster`,
        "tag.noTags": `Hi\xe7biri`,
        "tag.showAllButtonLabel": (args, formatter)=>`T\xfcm\xfcn\xfc g\xf6ster (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `T\xfcm\xfcn\xfc temizle`,
        "toast.collapse": `Daralt`,
        "toast.showAll": `T\xfcm\xfcn\xfc g\xf6ster`,
        "treeview.loadingMore": `Daha fazla y\xfckleniyor...`
    },
    "uk-UA": {
        "actionbar.actions": `\u{414}\u{456}\u{457}`,
        "actionbar.actionsAvailable": `\u{414}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{456} \u{434}\u{456}\u{457}.`,
        "actionbar.clearSelection": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{438} \u{432}\u{438}\u{431}\u{456}\u{440}`,
        "actionbar.selected": (args)=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}: ${args.count}`,
        "actionbar.selectedAll": `\u{423}\u{441}\u{435} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
        "actionbutton.pending": `\u{432} \u{43E}\u{447}\u{456}\u{43A}\u{443}\u{432}\u{430}\u{43D}\u{43D}\u{456}`,
        "breadcrumbs.more": `\u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432}`,
        "button.pending": `\u{432} \u{43E}\u{447}\u{456}\u{43A}\u{443}\u{432}\u{430}\u{43D}\u{43D}\u{456}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{430}`,
                other: `\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{456} \u{434}\u{430}\u{442}\u{438} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{456}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "combobox.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "combobox.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{456}\u{432} \u{43D}\u{435}\u{43C}\u{430}\u{454}`,
        "contextualhelp.help": `\u{414}\u{43E}\u{432}\u{456}\u{434}\u{43A}\u{430}`,
        "contextualhelp.info": `\u{406}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{44F}`,
        "datepicker.endTime": `\u{427}\u{430}\u{441} \u{437}\u{430}\u{432}\u{435}\u{440}\u{448}\u{435}\u{43D}\u{43D}\u{44F}`,
        "datepicker.startTime": `\u{427}\u{430}\u{441} \u{43F}\u{43E}\u{447}\u{430}\u{442}\u{43A}\u{443}`,
        "datepicker.time": `\u{427}\u{430}\u{441}`,
        "dialog.alert": `\u{421}\u{438}\u{433}\u{43D}\u{430}\u{43B} \u{442}\u{440}\u{438}\u{432}\u{43E}\u{433}\u{438}`,
        "dialog.dismiss": `\u{421}\u{43A}\u{430}\u{441}\u{443}\u{432}\u{430}\u{442}\u{438}`,
        "dropzone.replaceMessage": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{456}\u{442}\u{44C} \u{444}\u{430}\u{439}\u{43B} \u{434}\u{43B}\u{44F} \u{437}\u{430}\u{43C}\u{456}\u{43D}\u{438}`,
        "inlinealert.informative": `\u{406}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{44F}`,
        "inlinealert.negative": `\u{41F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{43E}\u{43F}\u{435}\u{440}\u{435}\u{434}\u{436}\u{435}\u{43D}\u{43D}\u{44F}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{456}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{43D}\u{435}\u{43E}\u{431}\u{43E}\u{432}\u{2019}\u{44F}\u{437}\u{43A}\u{43E}\u{432}\u{43E})`,
        "label.(required)": `(\u{43E}\u{431}\u{43E}\u{432}\u{2019}\u{44F}\u{437}\u{43A}\u{43E}\u{432}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "listview.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "menu.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "menu.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "menu.moreActions": `\u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{434}\u{456}\u{439}`,
        "menu.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{456}\u{432} \u{43D}\u{435}\u{43C}\u{430}\u{454}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}, \u{440}\u{43E}\u{437}\u{433}\u{43E}\u{440}\u{43D}\u{456}\u{442}\u{44C} \u{434}\u{43B}\u{44F} \u{434}\u{43E}\u{43A}\u{43B}\u{430}\u{434}\u{43D}\u{456}\u{448}\u{43E}\u{457} \u{456}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{457}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430} \u{430}\u{43A}\u{442}\u{438}\u{432}\u{43D}\u{456}\u{441}\u{442}\u{44C}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "picker.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "picker.placeholder": `\u{412}\u{438}\u{431}\u{440}\u{430}\u{442}\u{438}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{416}\u{43E}\u{434}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432} \u{43D}\u{435} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                one: ()=>`${formatter.number(args.count)} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                other: ()=>`\u{415}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}: ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `\u{417}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438} \u{431}\u{456}\u{447}\u{43D}\u{443} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "sidepanel.expand": `\u{420}\u{43E}\u{437}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438} \u{431}\u{456}\u{447}\u{43D}\u{443} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{456}\u{43D}\u{456}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{421}\u{43A}\u{430}\u{441}\u{443}\u{432}\u{430}\u{442}\u{438}`,
        "table.drag": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438} \u{43A}\u{43B}\u{456}\u{442}\u{438}\u{43D}\u{43A}\u{443}`,
        "table.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "table.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "table.resizeColumn": `\u{417}\u{43C}\u{456}\u{43D}\u{438}\u{442}\u{438} \u{440}\u{43E}\u{437}\u{43C}\u{456}\u{440} \u{441}\u{442}\u{43E}\u{432}\u{43F}\u{446}\u{44F}`,
        "table.save": `\u{417}\u{431}\u{435}\u{440}\u{435}\u{433}\u{442}\u{438}`,
        "table.sortAscending": `\u{421}\u{43E}\u{440}\u{442}\u{443}\u{432}\u{430}\u{442}\u{438} \u{437}\u{430} \u{437}\u{440}\u{43E}\u{441}\u{442}\u{430}\u{43D}\u{43D}\u{44F}\u{43C}`,
        "table.sortDescending": `\u{421}\u{43E}\u{440}\u{442}\u{443}\u{432}\u{430}\u{442}\u{438} \u{437}\u{430} \u{441}\u{43F}\u{430}\u{434}\u{430}\u{43D}\u{43D}\u{44F}\u{43C}`,
        "tag.actions": `\u{414}\u{456}\u{457}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{443}\u{432}\u{430}\u{442}\u{438} \u{43C}\u{435}\u{43D}\u{448}\u{435}`,
        "tag.noTags": `\u{41D}\u{435}\u{43C}\u{430}\u{454}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{438} \u{432}\u{441}\u{456} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{438} \u{432}\u{441}\u{435}`,
        "toast.collapse": `\u{417}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{438} \u{432}\u{441}\u{435}`,
        "treeview.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`
    },
    "zh-CN": {
        "actionbar.actions": `\u{64CD}\u{4F5C}`,
        "actionbar.actionsAvailable": `\u{6709}\u{53EF}\u{7528}\u{64CD}\u{4F5C}\u{3002}`,
        "actionbar.clearSelection": `\u{6E05}\u{9664}\u{9009}\u{62E9}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{65E0}\u{9009}\u{62E9}`,
                other: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}`
            })}`,
        "actionbar.selectedAll": `\u{5168}\u{9009}`,
        "actionbutton.pending": `\u{5F85}\u{5904}\u{7406}`,
        "breadcrumbs.more": `\u{66F4}\u{591A}\u{9879}\u{76EE}`,
        "button.pending": `\u{5F85}\u{5904}\u{7406}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{9009}\u{5B9A}\u{7684} ${formatter.plural(args.selectedCount, {
                one: `\u{4E2A}\u{65E5}\u{671F}`,
                other: `\u{4E2A}\u{65E5}\u{671F}`
            })} \u{4E0D}\u{53EF}\u{7528}\u{3002}`,
        "combobox.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "combobox.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "combobox.noResults": `\u{65E0}\u{7ED3}\u{679C}`,
        "contextualhelp.help": `\u{5E2E}\u{52A9}`,
        "contextualhelp.info": `\u{4FE1}\u{606F}`,
        "datepicker.endTime": `\u{7ED3}\u{675F}\u{65F6}\u{95F4}`,
        "datepicker.startTime": `\u{5F00}\u{59CB}\u{65F6}\u{95F4}`,
        "datepicker.time": `\u{65F6}\u{95F4}`,
        "dialog.alert": `\u{8B66}\u{62A5}`,
        "dialog.dismiss": `\u{53D6}\u{6D88}`,
        "dropzone.replaceMessage": `\u{5220}\u{9664}\u{8981}\u{66FF}\u{6362}\u{7684}\u{6587}\u{4EF6}`,
        "inlinealert.informative": `\u{4FE1}\u{606F}`,
        "inlinealert.negative": `\u{9519}\u{8BEF}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `\u{FF08}\u{975E}\u{5FC5}\u{987B}\u{FF09}`,
        "label.(required)": `\u{FF08}\u{5FC5}\u{586B}\u{FF09}`,
        "listview.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "listview.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "menu.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "menu.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "menu.moreActions": `\u{66F4}\u{591A}\u{64CD}\u{4F5C}`,
        "menu.noResults": `\u{65E0}\u{7ED3}\u{679C}`,
        "menu.unavailable": `\u{4E0D}\u{53EF}\u{7528}\u{FF0C}\u{5C55}\u{5F00}\u{4EE5}\u{67E5}\u{770B}\u{8BE6}\u{7EC6}\u{4FE1}\u{606F}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{6D3B}\u{52A8}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "picker.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "picker.placeholder": `\u{8BF7}\u{9009}\u{62E9}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9009}\u{62E9}\u{4EFB}\u{4F55}\u{9879}`,
                one: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}\u{9879}`,
                other: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}\u{9879}`
            })}`,
        "sidepanel.collapse": `\u{6298}\u{53E0}\u{4FA7}\u{9762}\u{677F}`,
        "sidepanel.expand": `\u{5C55}\u{5F00}\u{4FA7}\u{9762}\u{677F}`,
        "slider.maximum": `\u{6700}\u{5927}`,
        "slider.minimum": `\u{6700}\u{5C0F}`,
        "table.cancel": `\u{53D6}\u{6D88}`,
        "table.drag": `\u{62D6}\u{52A8}`,
        "table.editCell": `\u{7F16}\u{8F91}\u{5355}\u{5143}\u{683C}`,
        "table.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "table.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "table.resizeColumn": `\u{8C03}\u{6574}\u{5217}\u{5927}\u{5C0F}`,
        "table.save": `\u{4FDD}\u{5B58}`,
        "table.sortAscending": `\u{5347}\u{5E8F}\u{6392}\u{5E8F}`,
        "table.sortDescending": `\u{964D}\u{5E8F}\u{6392}\u{5E8F}`,
        "tag.actions": `\u{64CD}\u{4F5C}`,
        "tag.hideButtonLabel": `\u{663E}\u{793A}\u{66F4}\u{5C11}`,
        "tag.noTags": `\u{65E0}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{5168}\u{90E8}\u{663E}\u{793A} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5168}\u{90E8}\u{6E05}\u{9664}`,
        "toast.collapse": `\u{6298}\u{53E0}`,
        "toast.showAll": `\u{663E}\u{793A}\u{5168}\u{90E8}`,
        "treeview.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`
    },
    "zh-TW": {
        "actionbar.actions": `\u{52D5}\u{4F5C}`,
        "actionbar.actionsAvailable": `\u{53EF}\u{57F7}\u{884C}\u{7684}\u{52D5}\u{4F5C}\u{3002}`,
        "actionbar.clearSelection": `\u{6E05}\u{9664}\u{9078}\u{53D6}\u{9805}\u{76EE}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9078}\u{53D6}\u{4EFB}\u{4F55}\u{9805}\u{76EE}`,
                other: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}`
            })}`,
        "actionbar.selectedAll": `\u{5DF2}\u{9078}\u{53D6}\u{6240}\u{6709}\u{9805}\u{76EE}`,
        "actionbutton.pending": `\u{5F85}\u{8655}\u{7406}`,
        "breadcrumbs.more": `\u{66F4}\u{591A}\u{9805}\u{76EE}`,
        "button.pending": `\u{5F85}\u{8655}\u{7406}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{6240}\u{9078}\u{7684}${formatter.plural(args.selectedCount, {
                one: `\u{65E5}\u{671F}`,
                other: `\u{65E5}\u{671F}`
            })}\u{7121}\u{6CD5}\u{4F7F}\u{7528}\u{3002}`,
        "combobox.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "combobox.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "combobox.noResults": `\u{7121}\u{4EFB}\u{4F55}\u{7D50}\u{679C}`,
        "contextualhelp.help": `\u{8AAA}\u{660E}`,
        "contextualhelp.info": `\u{8CC7}\u{8A0A}`,
        "datepicker.endTime": `\u{7D50}\u{675F}\u{6642}\u{9593}`,
        "datepicker.startTime": `\u{958B}\u{59CB}\u{6642}\u{9593}`,
        "datepicker.time": `\u{6642}\u{9593}`,
        "dialog.alert": `\u{8B66}\u{793A}`,
        "dialog.dismiss": `\u{95DC}\u{9589}`,
        "dropzone.replaceMessage": `\u{653E}\u{7F6E}\u{8981}\u{53D6}\u{4EE3}\u{7684}\u{6A94}\u{6848}`,
        "inlinealert.informative": `\u{8CC7}\u{8A0A}`,
        "inlinealert.negative": `\u{932F}\u{8AA4}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `(\u{9078}\u{586B})`,
        "label.(required)": `(\u{5FC5}\u{586B})`,
        "listview.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "listview.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "menu.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "menu.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "menu.moreActions": `\u{66F4}\u{591A}\u{52D5}\u{4F5C}`,
        "menu.noResults": `\u{7121}\u{4EFB}\u{4F55}\u{7D50}\u{679C}`,
        "menu.unavailable": `\u{7121}\u{6CD5}\u{4F7F}\u{7528}\u{FF0C}\u{5C55}\u{958B}\u{4EE5}\u{53D6}\u{5F97}\u{8A73}\u{7D30}\u{8CC7}\u{6599}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{6D3B}\u{52D5}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "picker.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "picker.placeholder": `\u{9078}\u{53D6}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9078}\u{53D6}\u{4EFB}\u{4F55}\u{9805}\u{76EE}`,
                one: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}\u{9805}\u{76EE}`,
                other: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}\u{9805}\u{76EE}`
            })}`,
        "sidepanel.collapse": `\u{6536}\u{5408}\u{5074}\u{9762}\u{677F}`,
        "sidepanel.expand": `\u{5C55}\u{958B}\u{5074}\u{9762}\u{677F}`,
        "slider.maximum": `\u{6700}\u{5927}\u{503C}`,
        "slider.minimum": `\u{6700}\u{5C0F}\u{503C}`,
        "table.cancel": `\u{53D6}\u{6D88}`,
        "table.drag": `\u{62D6}\u{66F3}`,
        "table.editCell": `\u{7DE8}\u{8F2F}\u{5132}\u{5B58}\u{683C}`,
        "table.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "table.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "table.resizeColumn": `\u{8ABF}\u{6574}\u{6B04}\u{5927}\u{5C0F}`,
        "table.save": `\u{5132}\u{5B58}`,
        "table.sortAscending": `\u{905E}\u{589E}\u{6392}\u{5E8F}`,
        "table.sortDescending": `\u{905E}\u{6E1B}\u{6392}\u{5E8F}`,
        "tag.actions": `\u{52D5}\u{4F5C}`,
        "tag.hideButtonLabel": `\u{986F}\u{793A}\u{8F03}\u{5C11}`,
        "tag.noTags": `\u{7121}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{986F}\u{793A}\u{5168}\u{90E8} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5168}\u{90E8}\u{6E05}\u{9664}`,
        "toast.collapse": `\u{6536}\u{5408}`,
        "toast.showAll": `\u{986F}\u{793A}\u{5168}\u{90E8}`,
        "treeview.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`
    }
};

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
    (0, $92Pqa$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $92Pqa$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
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
        let cleanup = (0, $92Pqa$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $92Pqa$untrack)(()=>ref(null));
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
    let [revision, setRevision] = (0, $92Pqa$createSignal)(0);
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
    let detach = (0, $92Pqa$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $92Pqa$onCleanup)(()=>(0, $92Pqa$runWithOwner)(null, detach));
    return attach;
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
const $9bce356509de5990$var$I18nContext = (0, $92Pqa$createContext)(null);
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
    return (0, $92Pqa$createComponent)($9bce356509de5990$var$I18nContext, {
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
    return (0, $92Pqa$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $92Pqa$memo)(()=>(0, $92Pqa$memo)(()=>!!props.locale)() ? (0, $92Pqa$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $92Pqa$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $92Pqa$useContext)($9bce356509de5990$var$I18nContext);
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
    let [isSSR, setSSR] = (0, $92Pqa$createSignal)((0, $92Pqa$isServer) || (0, $92Pqa$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $92Pqa$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $92Pqa$onSettled)(()=>{
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



parcelRegister("2fwg4", function(module, exports) {

$parcel$export(module.exports, "useLocalizedStringFormatter", function () { return (parcelRequire("jeZsY")).useLocalizedStringFormatter; });
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
var $jeZsY = parcelRequire("jeZsY");

});
parcelRegister("jeZsY", function(module, exports) {

$parcel$export(module.exports, "useLocalizedStringFormatter", function () { return $039d673e4449a9dc$export$f12b703ca79dfbb1; });
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
var $1KHpV = parcelRequire("1KHpV");
var $6T0Up = parcelRequire("6T0Up");

var $dnlDG = parcelRequire("dnlDG");

const $039d673e4449a9dc$var$cache = new WeakMap();
function $039d673e4449a9dc$var$getCachedDictionary(strings) {
    let dictionary = $039d673e4449a9dc$var$cache.get(strings);
    if (!dictionary) {
        dictionary = new (0, $1KHpV.LocalizedStringDictionary)(strings);
        $039d673e4449a9dc$var$cache.set(strings, dictionary);
    }
    return dictionary;
}
function $039d673e4449a9dc$export$87b761675e8eaa10(strings, packageName) {
    return packageName && (0, $1KHpV.LocalizedStringDictionary).getGlobalDictionaryForPackage(packageName) || $039d673e4449a9dc$var$getCachedDictionary(strings);
}
function $039d673e4449a9dc$export$f12b703ca79dfbb1(strings, packageName) {
    let locale = (0, $dnlDG.useLocale)();
    let dictionary = $039d673e4449a9dc$export$87b761675e8eaa10(strings, packageName);
    let formatter = (0, $92Pqa$createMemo)(()=>new (0, $6T0Up.LocalizedStringFormatter)(locale.locale, dictionary));
    return {
        format: (key, variables)=>formatter().format(key, variables)
    };
}

});
parcelRegister("1KHpV", function(module, exports) {

$parcel$export(module.exports, "LocalizedStringDictionary", function () { return $146bc4121ea31084$export$c17fa47878dc55b6; });
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
 */ const $146bc4121ea31084$var$localeSymbol = Symbol.for('react-aria.i18n.locale');
const $146bc4121ea31084$var$stringsSymbol = Symbol.for('react-aria.i18n.strings');
let $146bc4121ea31084$var$cachedGlobalStrings = undefined;
class $146bc4121ea31084$export$c17fa47878dc55b6 {
    strings;
    defaultLocale;
    constructor(messages, defaultLocale = 'en-US'){
        // Clone messages so we don't modify the original object.
        // Filter out entries with falsy values which may have been caused by applying optimize-locales-plugin.
        this.strings = Object.fromEntries(Object.entries(messages).filter(([, v])=>v));
        this.defaultLocale = defaultLocale;
    }
    /** Returns a localized string for the given key and locale. */ getStringForLocale(key, locale) {
        let strings = this.getStringsForLocale(locale);
        let string = strings[key];
        if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
        return string;
    }
    /** Returns all localized strings for the given locale. */ getStringsForLocale(locale) {
        let strings = this.strings[locale];
        if (!strings) {
            strings = $146bc4121ea31084$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
            this.strings[locale] = strings;
        }
        return strings;
    }
    static getGlobalDictionaryForPackage(packageName) {
        if (typeof window === 'undefined') return null;
        let locale = window[$146bc4121ea31084$var$localeSymbol];
        if ($146bc4121ea31084$var$cachedGlobalStrings === undefined) {
            let globalStrings = window[$146bc4121ea31084$var$stringsSymbol];
            if (!globalStrings) return null;
            $146bc4121ea31084$var$cachedGlobalStrings = {};
            for(let pkg in globalStrings)$146bc4121ea31084$var$cachedGlobalStrings[pkg] = new $146bc4121ea31084$export$c17fa47878dc55b6({
                [locale]: globalStrings[pkg]
            }, locale);
        }
        let dictionary = $146bc4121ea31084$var$cachedGlobalStrings?.[packageName];
        if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
        return dictionary;
    }
}
function $146bc4121ea31084$var$getStringsForLocale(locale, strings, defaultLocale = 'en-US') {
    // If there is an exact match, use it.
    if (strings[locale]) return strings[locale];
    // Attempt to find the closest match by language.
    // For example, if the locale is fr-CA (French Canadian), but there is only
    // an fr-FR (France) set of strings, use that.
    // This could be replaced with Intl.LocaleMatcher once it is supported.
    // https://github.com/tc39/proposal-intl-localematcher
    let language = $146bc4121ea31084$var$getLanguage(locale);
    // If the locale has an explicit script (e.g. sr-Latn-RS), prefer a
    // language-script match (sr-Latn) over a language-only match (sr), since
    // those may represent entirely different scripts.
    let script = $146bc4121ea31084$var$getScript(locale);
    if (script && strings[`${language}-${script}`]) return strings[`${language}-${script}`];
    if (strings[language]) return strings[language];
    for(let key in strings){
        if (key.startsWith(language + '-')) return strings[key];
    }
    // Nothing close, use english.
    return strings[defaultLocale];
}
function $146bc4121ea31084$var$getLanguage(locale) {
    // @ts-ignore
    if (Intl.Locale) // @ts-ignore
    return new Intl.Locale(locale).language;
    return locale.split('-')[0];
}
function $146bc4121ea31084$var$getScript(locale) {
    // @ts-ignore
    if (Intl.Locale) // @ts-ignore
    return new Intl.Locale(locale).script;
    return undefined;
}

});

parcelRegister("6T0Up", function(module, exports) {

$parcel$export(module.exports, "LocalizedStringFormatter", function () { return $5038959e5c6897bf$export$2f817fcdc4b89ae0; });
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
 */ const $5038959e5c6897bf$var$pluralRulesCache = new Map();
const $5038959e5c6897bf$var$numberFormatCache = new Map();
class $5038959e5c6897bf$export$2f817fcdc4b89ae0 {
    locale;
    strings;
    constructor(locale, strings){
        this.locale = locale;
        this.strings = strings;
    }
    /** Formats a localized string for the given key with the provided variables. */ format(key, variables) {
        let message = this.strings.getStringForLocale(key, this.locale);
        return typeof message === 'function' ? message(variables, this) : message;
    }
    plural(count, options, type = 'cardinal') {
        let opt = options['=' + count];
        if (opt) return typeof opt === 'function' ? opt() : opt;
        let key = this.locale + ':' + type;
        let pluralRules = $5038959e5c6897bf$var$pluralRulesCache.get(key);
        if (!pluralRules) {
            pluralRules = new Intl.PluralRules(this.locale, {
                type: type
            });
            $5038959e5c6897bf$var$pluralRulesCache.set(key, pluralRules);
        }
        let selected = pluralRules.select(count);
        opt = options[selected] || options.other;
        return typeof opt === 'function' ? opt() : opt;
    }
    number(value) {
        let numberFormat = $5038959e5c6897bf$var$numberFormatCache.get(this.locale);
        if (!numberFormat) {
            numberFormat = new Intl.NumberFormat(this.locale);
            $5038959e5c6897bf$var$numberFormatCache.set(this.locale, numberFormat);
        }
        return numberFormat.format(value);
    }
    select(options, value) {
        let opt = options[value] || options.other;
        return typeof opt === 'function' ? opt() : opt;
    }
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
    let ctx = (0, $92Pqa$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
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
        return (0, $92Pqa$createComponent)(Context, {
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
            return (typeof value === 'function' ? value((0, $92Pqa$merge)(props.values, {
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
    let ctx = (0, $92Pqa$useContext)(context);
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
    let contextProps = (0, $92Pqa$omit)(ctx, 'ref');
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
    let finalProps = (0, $92Pqa$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $92Pqa$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $92Pqa$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $92Pqa$omit)(props, (key)=>key === (0, $92Pqa$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
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
    (0, $92Pqa$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $92Pqa$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $92Pqa$createEffect)(()=>({
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
    (0, $92Pqa$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $92Pqa$untrack)(()=>ref.current);
    });
    let domProps = (0, $92Pqa$merge)((0, $92Pqa$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $92Pqa$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $92Pqa$createComponent)(Host, domProps);
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
        has: (_, key)=>key !== (0, $92Pqa$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $92Pqa$$PROXY) ? undefined : mergeProperty(key)
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
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $92Pqa$clsx)(a, b);
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
    const prefix = (0, $92Pqa$isServer) || (0, $92Pqa$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $92Pqa$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $92Pqa$createSignal)(undefined, {
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
    register((0, $92Pqa$untrack)(res));
    (0, $92Pqa$createEffect)(res, register);
    (0, $92Pqa$onCleanup)(unregister);
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
    let [resolvedId, setResolvedId] = (0, $92Pqa$createSignal)((0, $92Pqa$untrack)(id1));
    let [publication, setPublication] = (0, $92Pqa$createSignal)(0);
    (0, $92Pqa$onSettled)(()=>{
        const currentId = (0, $92Pqa$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $92Pqa$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $92Pqa$createEffect)(()=>{
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




parcelRequire("k0dKS");

//# sourceMappingURL=NotificationBadge.native.js.map
