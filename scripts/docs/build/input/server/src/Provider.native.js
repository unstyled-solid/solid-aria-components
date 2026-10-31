import { mergeProps as _$mergeProps } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
var _m$ = Symbol(), _m$2 = Symbol();
var _d$ = {
    get() {
        const props = this[_m$];
        const parentColorScheme = this[_m$2];
        return props.colorScheme || parentColorScheme;
    },
    enumerable: true,
    configurable: true
}, _d$2 = {
    get() {
        const props = this[_m$];
        return ProviderInner(props);
    },
    enumerable: true,
    configurable: true
};
function _P$(_p, _p2) {
    this[_m$] = _p;
    this[_m$2] = _p2;
    Object.defineProperty(this, "value", _d$);
    Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
var _d$3 = {
    get() {
        const props = this[_m$];
        return props.locale;
    },
    enumerable: true,
    configurable: true
}, _d$4 = {
    get() {
        const content = this[_m$2];
        return content();
    },
    enumerable: true,
    configurable: true
};
function _P$2(_p3, _p4) {
    this[_m$] = _p3;
    this[_m$2] = _p4;
    Object.defineProperty(this, "locale", _d$3);
    Object.defineProperty(this, "children", _d$4);
}
_P$2.prototype = Object.prototype;
var _d$5 = {
    get() {
        const localizedContent = this[_m$];
        return localizedContent();
    },
    enumerable: true,
    configurable: true
};
function _P$3(_p5) {
    this[_m$] = _p5;
    Object.defineProperty(this, "children", _d$5);
}
_P$3.prototype = Object.prototype;
var _d$6 = {
    get() {
        const locale = this[_m$];
        return locale.locale;
    },
    enumerable: true,
    configurable: true
}, _d$7 = {
    get() {
        const locale = this[_m$];
        return locale.direction;
    },
    enumerable: true,
    configurable: true
}, _d$8 = {
    get() {
        const props = this[_m$2];
        return props.UNSAFE_style;
    },
    enumerable: true,
    configurable: true
}, _d$9 = {
    get() {
        const props = this[_m$2];
        return (props.UNSAFE_className ?? '') + mergeStyles(props.styles, providerStyles({
            // Set a default background if the provider is rendered as the root <html> element.
            background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
            colorScheme: props.colorScheme
        }));
    },
    enumerable: true,
    configurable: true
}, _d$0 = {
    get() {
        const props = this[_m$2];
        return [Fonts({}), _$memo(() => props.children)];
    },
    enumerable: true,
    configurable: true
};
function _P$4(_p6, _p7) {
    this[_m$] = _p6;
    this[_m$2] = _p7;
    Object.defineProperty(this, "lang", _d$6);
    Object.defineProperty(this, "dir", _d$7);
    Object.defineProperty(this, "style", _d$8);
    Object.defineProperty(this, "class", _d$9);
    Object.defineProperty(this, "children", _d$0);
}
_P$4.prototype = Object.prototype;
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
import { createContext, useContext } from "solid-js";
import { dynamic } from "@solidjs/web";
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/filterDOMProps.js";
import { Fonts } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/src/Fonts.native.js";
import { generateDefaultColorSchemeStyles } from "./page.macro" with { type: 'macro' };
import { I18nProvider, useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/I18nProvider.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/style/runtime.native.js";
import { RouterProvider } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/src/utils/openLink.js";
import { setColorScheme, style } from "../style" with { type: 'macro' };
export const ColorSchemeContext = createContext(null);
/**
 * Provider is the container for all React Spectrum components.
 * It loads the font and sets the colorScheme, locale, and other application level settings.
 */
export function Provider(props) {
    let parentColorScheme = useContext(ColorSchemeContext);
    let content = () => ColorSchemeContext(new _P$(props, parentColorScheme));
    let localizedContent = () => props.locale ? I18nProvider(new _P$2(props, content)) : content();
    return _$memo(() => _$memo(() => !!props.router)() ? RouterProvider(_$mergeProps(() => props.router, new _P$3(localizedContent))) : localizedContent());
}
generateDefaultColorSchemeStyles();
let providerStyles = style({
    ...setColorScheme(),
    '--s2-container-bg': {
        type: 'backgroundColor',
        value: {
            background: {
                base: 'base',
                'layer-1': 'layer-1',
                'layer-2': 'layer-2'
            }
        }
    },
    backgroundColor: {
        // Don't set a background unless one is requested.
        background: {
            base: '--s2-container-bg',
            'layer-1': '--s2-container-bg',
            'layer-2': '--s2-container-bg'
        }
    },
    isolation: 'isolate'
});
function ProviderInner(props) {
    let locale = useLocale();
    // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
    let Element = dynamic(() => props.elementType || 'div');
    return Element(_$mergeProps(() => filterDOMProps(props), new _P$4(locale, props)));
}
