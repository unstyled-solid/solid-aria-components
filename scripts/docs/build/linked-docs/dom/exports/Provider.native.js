import "./Provider.native.css";
import {createComponent as $6XklG$createComponent, memo as $6XklG$memo, mergeProps as $6XklG$mergeProps, dynamic as $6XklG$dynamic, useHead as $6XklG$useHead, isServer as $6XklG$isServer} from "@solidjs/web";
import {createContext as $6XklG$createContext, useContext as $6XklG$useContext, createEffect as $6XklG$createEffect, onCleanup as $6XklG$onCleanup, createSignal as $6XklG$createSignal, isHydrating as $6XklG$isHydrating, onSettled as $6XklG$onSettled} from "solid-js";


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
const $38c4fc7450edae36$export$374e0245597d19a3 = (0, $6XklG$createContext)(null);
function $38c4fc7450edae36$export$2881499e37b75b9a(props) {
    let parentColorScheme = (0, $6XklG$useContext)($38c4fc7450edae36$export$374e0245597d19a3);
    let content = ()=>(0, $6XklG$createComponent)($38c4fc7450edae36$export$374e0245597d19a3, {
            get value () {
                return props.colorScheme || parentColorScheme;
            },
            get children () {
                return (0, $6XklG$createComponent)($38c4fc7450edae36$var$ProviderInner, props);
            }
        });
    let localizedContent = ()=>props.locale ? (0, $6XklG$createComponent)((0, $dnlDG.I18nProvider), {
            get locale () {
                return props.locale;
            },
            get children () {
                return content();
            }
        }) : content();
    return (0, $6XklG$memo)(()=>(0, $6XklG$memo)(()=>!!props.router)() ? (0, $6XklG$createComponent)((0, $fNnwP.RouterProvider), (0, $6XklG$mergeProps)(()=>props.router, {
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
    let Element = (0, $6XklG$dynamic)(()=>props.elementType || 'div');
    return (0, $6XklG$createComponent)(Element, (0, $6XklG$mergeProps)(()=>(0, $5gAIA.filterDOMProps)(props), {
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
                (0, $6XklG$createComponent)((0, $hL2UH.Fonts), {}),
                (0, $6XklG$memo)(()=>props.children)
            ];
        }
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
    (0, $6XklG$useHead)(()=>{
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
    (0, $6XklG$createEffect)(script, (src)=>{
        if (!src) return;
        let scriptEl = Array.from(document.scripts).find((s)=>s.src === src);
        if (scriptEl) {
            let onLoad = ()=>{
                let typekit = window.Typekit;
                if (typeof typekit !== 'undefined' && typeof typekit.load === 'function') typekit.load();
            };
            scriptEl.addEventListener('load', onLoad);
            (0, $6XklG$onCleanup)(()=>scriptEl.removeEventListener('load', onLoad));
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
const $9bce356509de5990$var$I18nContext = (0, $6XklG$createContext)(null);
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
    return (0, $6XklG$createComponent)($9bce356509de5990$var$I18nContext, {
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
    return (0, $6XklG$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $6XklG$memo)(()=>(0, $6XklG$memo)(()=>!!props.locale)() ? (0, $6XklG$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $6XklG$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $6XklG$useContext)($9bce356509de5990$var$I18nContext);
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
    let [isSSR, setSSR] = (0, $6XklG$createSignal)((0, $6XklG$isServer) || (0, $6XklG$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $6XklG$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $6XklG$onSettled)(()=>{
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

parcelRegister("fNnwP", function(module, exports) {

$parcel$export(module.exports, "RouterProvider", function () { return $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb; });
$parcel$export(module.exports, "openLink", function () { return $b7fdaee6ddcf59c4$export$95185d699e05d4d7; });
$parcel$export(module.exports, "useRouter", function () { return $b7fdaee6ddcf59c4$export$9a302a45f65d0572; });
$parcel$export(module.exports, "useLinkProps", function () { return $b7fdaee6ddcf59c4$export$7e924b3091a3bd18; });
$parcel$export(module.exports, "handleLinkClick", function () { return $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f; });


var $jBlzr = parcelRequire("jBlzr");

var $1FDXt = parcelRequire("1FDXt");

const $b7fdaee6ddcf59c4$var$RouterContext = (0, $6XklG$createContext)({
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
    return (0, $6XklG$createComponent)($b7fdaee6ddcf59c4$var$RouterContext, {
        value: ctx,
        get children () {
            return props.children;
        }
    });
}
function $b7fdaee6ddcf59c4$export$9a302a45f65d0572() {
    return (0, $6XklG$useContext)($b7fdaee6ddcf59c4$var$RouterContext);
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




var $4SbjT = parcelRequire("4SbjT");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");


var $38c4fc7450edae36$export$2881499e37b75b9a = parcelRequire("4SbjT").Provider;
var $38c4fc7450edae36$export$374e0245597d19a3 = parcelRequire("4SbjT").ColorSchemeContext;
var $9bce356509de5990$export$43bb16f9c6d9e3f7 = parcelRequire("dnlDG").useLocale;
export {$38c4fc7450edae36$export$2881499e37b75b9a as Provider, $38c4fc7450edae36$export$374e0245597d19a3 as ColorSchemeContext, $9bce356509de5990$export$43bb16f9c6d9e3f7 as useLocale};
//# sourceMappingURL=Provider.native.js.map
