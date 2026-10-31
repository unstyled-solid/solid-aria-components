var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ColorSchemeContext", ()=>ColorSchemeContext);
/**
 * Provider is the container for all React Spectrum components.
 * It loads the font and sets the colorScheme, locale, and other application level settings.
 */ parcelHelpers.export(exports, "Provider", ()=>Provider);
var _web = require("@solidjs/web");
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
 */ var _solidJs = require("solid-js");
var _filterDOMProps = require("react-aria/filterDOMProps");
var _fonts = require("./Fonts");
var _i18Nprovider = require("react-aria/I18nProvider");
var _runtime = require("../style/runtime");
var _openLink = require("react-aria/private/utils/openLink");
const ColorSchemeContext = (0, _solidJs.createContext)(null);
function Provider(props) {
    let parentColorScheme = (0, _solidJs.useContext)(ColorSchemeContext);
    let content = ()=>(0, _web.createComponent)(ColorSchemeContext, {
            get value () {
                return props.colorScheme || parentColorScheme;
            },
            get children () {
                return (0, _web.createComponent)(ProviderInner, props);
            }
        });
    let localizedContent = ()=>props.locale ? (0, _web.createComponent)((0, _i18Nprovider.I18nProvider), {
            get locale () {
                return props.locale;
            },
            get children () {
                return content();
            }
        }) : content();
    return (0, _web.memo)(()=>(0, _web.memo)(()=>!!props.router)() ? (0, _web.createComponent)((0, _openLink.RouterProvider), (0, _web.mergeProps)(()=>props.router, {
            get children () {
                return localizedContent();
            }
        })) : localizedContent());
}
undefined;
let providerStyles = function anonymous(props) {
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
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/packages/@react-spectrum/s2/src/Provider.tsx:54:21";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/packages/@react-spectrum/s2/src/Provider.tsx:54:21"
        };
    }
    return rules;
};
function ProviderInner(props) {
    let locale = (0, _i18Nprovider.useLocale)();
    // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
    let Element = (0, _web.dynamic)(()=>props.elementType || 'div');
    return (0, _web.createComponent)(Element, (0, _web.mergeProps)(()=>(0, _filterDOMProps.filterDOMProps)(props), {
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
            return (props.UNSAFE_className ?? '') + (0, _runtime.mergeStyles)(props.styles, providerStyles({
                // Set a default background if the provider is rendered as the root <html> element.
                background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
                colorScheme: props.colorScheme
            }));
        },
        get children () {
            return [
                (0, _web.createComponent)((0, _fonts.Fonts), {}),
                (0, _web.memo)(()=>props.children)
            ];
        }
    }));
}
