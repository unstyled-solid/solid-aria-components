import "./Provider.native.cee65002.css";
import {memo as $hkoAX$memo, mergeProps as $hkoAX$mergeProps, dynamic as $hkoAX$dynamic} from "@solidjs/web";
import {createContext as $hkoAX$createContext, useContext as $hkoAX$useContext} from "solid-js";
import {filterDOMProps as $hkoAX$filterDOMProps} from "react-aria/filterDOMProps";
import {Fonts as $hkoAX$Fonts} from "./Fonts";
import {I18nProvider as $hkoAX$I18nProvider, useLocale as $hkoAX$useLocale} from "react-aria/I18nProvider";
import {mergeStyles as $hkoAX$mergeStyles} from "../style/runtime";
import {RouterProvider as $hkoAX$RouterProvider} from "react-aria/private/utils/openLink";








var $1bda6a4eafc3ab47$var$_m$ = Symbol(), $1bda6a4eafc3ab47$var$_m$2 = Symbol();
var $1bda6a4eafc3ab47$var$_d$ = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$];
        const parentColorScheme = this[$1bda6a4eafc3ab47$var$_m$2];
        return props.colorScheme || parentColorScheme;
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$2 = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$];
        return $1bda6a4eafc3ab47$var$ProviderInner(props);
    },
    enumerable: true,
    configurable: true
};
function $1bda6a4eafc3ab47$var$_P$(_p, _p2) {
    this[$1bda6a4eafc3ab47$var$_m$] = _p;
    this[$1bda6a4eafc3ab47$var$_m$2] = _p2;
    Object.defineProperty(this, "value", $1bda6a4eafc3ab47$var$_d$);
    Object.defineProperty(this, "children", $1bda6a4eafc3ab47$var$_d$2);
}
$1bda6a4eafc3ab47$var$_P$.prototype = Object.prototype;
var $1bda6a4eafc3ab47$var$_d$3 = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$];
        return props.locale;
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$4 = {
    get () {
        const content = this[$1bda6a4eafc3ab47$var$_m$2];
        return content();
    },
    enumerable: true,
    configurable: true
};
function $1bda6a4eafc3ab47$var$_P$2(_p3, _p4) {
    this[$1bda6a4eafc3ab47$var$_m$] = _p3;
    this[$1bda6a4eafc3ab47$var$_m$2] = _p4;
    Object.defineProperty(this, "locale", $1bda6a4eafc3ab47$var$_d$3);
    Object.defineProperty(this, "children", $1bda6a4eafc3ab47$var$_d$4);
}
$1bda6a4eafc3ab47$var$_P$2.prototype = Object.prototype;
var $1bda6a4eafc3ab47$var$_d$5 = {
    get () {
        const localizedContent = this[$1bda6a4eafc3ab47$var$_m$];
        return localizedContent();
    },
    enumerable: true,
    configurable: true
};
function $1bda6a4eafc3ab47$var$_P$3(_p5) {
    this[$1bda6a4eafc3ab47$var$_m$] = _p5;
    Object.defineProperty(this, "children", $1bda6a4eafc3ab47$var$_d$5);
}
$1bda6a4eafc3ab47$var$_P$3.prototype = Object.prototype;
var $1bda6a4eafc3ab47$var$_d$6 = {
    get () {
        const locale = this[$1bda6a4eafc3ab47$var$_m$];
        return locale.locale;
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$7 = {
    get () {
        const locale = this[$1bda6a4eafc3ab47$var$_m$];
        return locale.direction;
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$8 = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$2];
        return props.UNSAFE_style;
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$9 = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$2];
        return (props.UNSAFE_className ?? '') + (0, $hkoAX$mergeStyles)(props.styles, $1bda6a4eafc3ab47$var$providerStyles({
            // Set a default background if the provider is rendered as the root <html> element.
            background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
            colorScheme: props.colorScheme
        }));
    },
    enumerable: true,
    configurable: true
}, $1bda6a4eafc3ab47$var$_d$0 = {
    get () {
        const props = this[$1bda6a4eafc3ab47$var$_m$2];
        return [
            (0, $hkoAX$Fonts)({}),
            (0, $hkoAX$memo)(()=>props.children)
        ];
    },
    enumerable: true,
    configurable: true
};
function $1bda6a4eafc3ab47$var$_P$4(_p6, _p7) {
    this[$1bda6a4eafc3ab47$var$_m$] = _p6;
    this[$1bda6a4eafc3ab47$var$_m$2] = _p7;
    Object.defineProperty(this, "lang", $1bda6a4eafc3ab47$var$_d$6);
    Object.defineProperty(this, "dir", $1bda6a4eafc3ab47$var$_d$7);
    Object.defineProperty(this, "style", $1bda6a4eafc3ab47$var$_d$8);
    Object.defineProperty(this, "class", $1bda6a4eafc3ab47$var$_d$9);
    Object.defineProperty(this, "children", $1bda6a4eafc3ab47$var$_d$0);
}
$1bda6a4eafc3ab47$var$_P$4.prototype = Object.prototype;
const $1bda6a4eafc3ab47$export$374e0245597d19a3 = (0, $hkoAX$createContext)(null);
function $1bda6a4eafc3ab47$export$2881499e37b75b9a(props) {
    let parentColorScheme = (0, $hkoAX$useContext)($1bda6a4eafc3ab47$export$374e0245597d19a3);
    let content = ()=>$1bda6a4eafc3ab47$export$374e0245597d19a3(new $1bda6a4eafc3ab47$var$_P$(props, parentColorScheme));
    let localizedContent = ()=>props.locale ? (0, $hkoAX$I18nProvider)(new $1bda6a4eafc3ab47$var$_P$2(props, content)) : content();
    return (0, $hkoAX$memo)(()=>(0, $hkoAX$memo)(()=>!!props.router)() ? (0, $hkoAX$RouterProvider)((0, $hkoAX$mergeProps)(()=>props.router, new $1bda6a4eafc3ab47$var$_P$3(localizedContent))) : localizedContent());
}
undefined;
let $1bda6a4eafc3ab47$var$providerStyles = function anonymous(props) {
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
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/macros/parcel-input/server/Provider.native.js:144:21";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/macros/parcel-input/server/Provider.native.js:144:21"
        };
    }
    return rules;
};
function $1bda6a4eafc3ab47$var$ProviderInner(props) {
    let locale = (0, $hkoAX$useLocale)();
    // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
    let Element = (0, $hkoAX$dynamic)(()=>props.elementType || 'div');
    return Element((0, $hkoAX$mergeProps)(()=>(0, $hkoAX$filterDOMProps)(props), new $1bda6a4eafc3ab47$var$_P$4(locale, props)));
}


export {$1bda6a4eafc3ab47$export$374e0245597d19a3 as ColorSchemeContext, $1bda6a4eafc3ab47$export$2881499e37b75b9a as Provider};
//# sourceMappingURL=Provider.native.js.map
