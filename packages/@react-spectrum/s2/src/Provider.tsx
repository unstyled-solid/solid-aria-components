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

import {createContext, useContext, type Component} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import {DOMProps, Href, RouterOptions} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {Fonts} from './Fonts';
import {generateDefaultColorSchemeStyles} from './page.macro' with {type: 'macro'};
import {I18nProvider, useLocale} from 'react-aria/I18nProvider';
import {mergeStyles} from '../style/runtime';
import {RouterProvider} from 'react-aria/private/utils/openLink';
import {setColorScheme, style} from '../style' with {type: 'macro'};
import {StyleString} from '../style/types';
import {UnsafeStyles} from './style-utils' with {type: 'macro'};

export type ColorScheme = 'light' | 'dark';
interface Router {
  navigate: (path: string, routerOptions: RouterOptions | undefined) => void;
  useHref?: (href: Href) => string;
}

export interface ProviderProps extends UnsafeStyles, DOMProps {
  /** The content of the Provider. */
  children: JSX.Element;
  /**
   * The locale for your application as a [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) language
   * code. Defaults to the browser/OS language setting.
   *
   * @default 'en-US'
   */
  locale?: string;
  /**
   * Provides a client side router to all nested React Spectrum links to enable client side
   * navigation.
   */
  router?: Router;
  /**
   * The color scheme for your application.
   * Defaults to operating system preferences.
   */
  colorScheme?: ColorScheme;
  /** The background for this provider. If not provided, the background is transparent. */
  background?: 'base' | 'layer-1' | 'layer-2';
  /** Spectrum-defined styles, returned by the `style()` macro. */
  styles?: StyleString;
  /**
   * The DOM element to render.
   *
   * @default div
   */
  elementType?: keyof JSX.IntrinsicElements;
}

export const ColorSchemeContext = createContext<ColorScheme | 'light dark' | null>(null);

/**
 * Provider is the container for all React Spectrum components.
 * It loads the font and sets the colorScheme, locale, and other application level settings.
 */
export function Provider(props: ProviderProps): JSX.Element {
  let parentColorScheme = useContext(ColorSchemeContext);
  let content = () => (
    <ColorSchemeContext value={props.colorScheme || parentColorScheme}>
      <ProviderInner {...props} />
    </ColorSchemeContext>
  );
  let localizedContent = () => props.locale
    ? <I18nProvider locale={props.locale}>{content()}</I18nProvider>
    : content();

  return <>{props.router
    ? <RouterProvider {...props.router}>{localizedContent()}</RouterProvider>
    : localizedContent()}</>;
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

function ProviderInner(props: ProviderProps) {
  let locale = useLocale();
  // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
  let Element = dynamic(() => props.elementType || 'div') as Component<JSX.HTMLAttributes<HTMLElement>>;
  return (
    <Element
      {...filterDOMProps(props)}
      lang={locale.locale}
      dir={locale.direction}
      style={props.UNSAFE_style}
      class={(props.UNSAFE_className ?? '') + mergeStyles(props.styles, providerStyles({
        // Set a default background if the provider is rendered as the root <html> element.
        background: props.background === undefined
          ? (props.elementType === 'html' ? 'base' : undefined)
          : props.background,
        colorScheme: props.colorScheme
      }))}>
      <Fonts />
      {props.children}
    </Element>
  );
}
