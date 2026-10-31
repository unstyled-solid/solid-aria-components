import { mergeProps as _$mergeProps } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
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
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/filterDOMProps.js";
import { Fonts } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Fonts.native.js";
import { generateDefaultColorSchemeStyles } from "./page.macro" with { type: 'macro' };
import { I18nProvider, useLocale } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/exports/I18nProvider.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/style/runtime.native.js";
import { RouterProvider } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/dom/react-aria/src/utils/openLink.js";
import { setColorScheme, style } from "../style" with { type: 'macro' };
export const ColorSchemeContext = createContext(null);
/**
 * Provider is the container for all React Spectrum components.
 * It loads the font and sets the colorScheme, locale, and other application level settings.
 */
export function Provider(props) {
    let parentColorScheme = useContext(ColorSchemeContext);
    let content = () => _$createComponent(ColorSchemeContext, {
        get value() {
            return props.colorScheme || parentColorScheme;
        },
        get children() {
            return _$createComponent(ProviderInner, props);
        }
    });
    let localizedContent = () => props.locale ? _$createComponent(I18nProvider, {
        get locale() {
            return props.locale;
        },
        get children() {
            return content();
        }
    }) : content();
    return _$memo(() => _$memo(() => !!props.router)() ? _$createComponent(RouterProvider, _$mergeProps(() => props.router, {
        get children() {
            return localizedContent();
        }
    })) : localizedContent());
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
    return _$createComponent(Element, _$mergeProps(() => filterDOMProps(props), {
        get lang() {
            return locale.locale;
        },
        get dir() {
            return locale.direction;
        },
        get style() {
            return props.UNSAFE_style;
        },
        get "class"() {
            return (props.UNSAFE_className ?? '') + mergeStyles(props.styles, providerStyles({
                // Set a default background if the provider is rendered as the root <html> element.
                background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
                colorScheme: props.colorScheme
            }));
        },
        get children() {
            return [_$createComponent(Fonts, {}), _$memo(() => props.children)];
        }
    }));
}
