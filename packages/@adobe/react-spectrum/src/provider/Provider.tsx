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

import {BreakpointProvider, useMatchedBreakpoints} from '../utils/BreakpointProvider';

import clsx from 'clsx';
import {Context} from './context';
import type {DOMRef} from '../utils/useDOMRef';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {getVersion} from './version-macro';
import {I18nProvider, useLocale} from 'react-aria/I18nProvider';
import {ModalProvider, useModalProvider} from 'react-aria/private/overlays/useModal';
import {ProviderContext, ProviderProps} from './types';
import {createEffect, omit, useContext} from 'solid-js';
import {RouterProvider} from 'react-aria/private/utils/openLink';
import {shouldKeepSpectrumClassNames} from '../utils/classNames';
import styles from '@adobe/spectrum-css-temp/components/page/vars.css';
import typographyStyles from '@adobe/spectrum-css-temp/components/typography/index.css';
import {useColorScheme, useScale} from './mediaQueries';
import {useDOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

// A macro ensures that we don't import the entire package.json.
const version = getVersion();

const DEFAULT_BREAKPOINTS = {S: 640, M: 768, L: 1024, XL: 1280, XXL: 1536};

/**
 * Provider is the container for all React Spectrum applications.
 * It defines the theme, locale, and other application level settings,
 * and can also be used to provide common properties to a group of components.
 */
export function Provider(props: ProviderProps) {
  let prevContext = useContext(Context);
  let theme = () => {
  let value = props.theme ?? prevContext?.theme;
  if (!value) {
    throw new Error('theme not found, the parent provider must have a theme provided');
  }
  return value;
  };
  // Hooks must always be called.
  let autoColorScheme = useColorScheme(theme, () => props.defaultColorScheme || 'light');
  let autoScale = useScale(theme);
  let prevLocale = useLocale();
  // if the new theme doesn't support the prevColorScheme, we must resort to the auto
  let usePrevColorScheme = () => prevContext?.colorScheme ? !!theme()[prevContext.colorScheme] : false;

  // importance of color scheme props > parent > auto:(OS > default > omitted)
  let colorScheme = () => props.colorScheme ?? (usePrevColorScheme() ? prevContext!.colorScheme : autoColorScheme());
  let scale = () => props.scale ?? (prevContext ? prevContext.scale : autoScale());
  let locale = () => props.locale ?? (prevContext ? prevLocale.locale : undefined);
  let breakpoints = () => props.breakpoints ?? prevContext?.breakpoints ?? DEFAULT_BREAKPOINTS;
  let otherProps = omit(props, 'colorScheme', 'scale', 'locale', 'breakpoints', 'children', 'isQuiet', 'isEmphasized', 'isDisabled', 'isRequired', 'isReadOnly', 'validationState', 'router', 'ref');

  // select only the props with values so undefined props don't overwrite prevContext values
  let context: ProviderContext = {
    version,
    get theme() {return theme();},
    get breakpoints() {return breakpoints();},
    get colorScheme() {return colorScheme();},
    get scale() {return scale();},
    get isQuiet() {return props.isQuiet === undefined ? prevContext?.isQuiet : props.isQuiet;},
    get isEmphasized() {return props.isEmphasized === undefined ? prevContext?.isEmphasized : props.isEmphasized;},
    get isDisabled() {return props.isDisabled === undefined ? prevContext?.isDisabled : props.isDisabled;},
    get isRequired() {return props.isRequired === undefined ? prevContext?.isRequired : props.isRequired;},
    get isReadOnly() {return props.isReadOnly === undefined ? prevContext?.isReadOnly : props.isReadOnly;},
    get validationState() {return props.validationState === undefined ? prevContext?.validationState : props.validationState;}
  };

  let matchedBreakpoints = useMatchedBreakpoints(breakpoints);

  // Only wrap in a DOM node if the theme, colorScheme, or scale changed
  let domProps = () => filterDOMProps(otherProps);
  let {styleProps} = useStyleProps(otherProps, undefined, {get matchedBreakpoints() {return matchedBreakpoints();}});
  let shouldWrap = () => (
    !prevContext ||
    props.locale ||
    theme() !== prevContext.theme ||
    colorScheme() !== prevContext.colorScheme ||
    scale() !== prevContext.scale ||
    Object.keys(domProps()).length > 0 ||
    otherProps.UNSAFE_className ||
    (styleProps.style && Object.keys(styleProps.style).length > 0)
  );
  let contents = () => shouldWrap() ? (
      <ProviderWrapper
        {...props}
    UNSAFE_style={{isolation: !prevContext ? 'isolate' : undefined, ...(styleProps.style as Record<string, string | number | undefined>)}}
        ref={props.ref}>
        {props.children}
      </ProviderWrapper>
    ) : props.children;

  return (
    <Context value={context}>
      <I18nProvider locale={locale()}>
        <BreakpointProvider matchedBreakpoints={matchedBreakpoints()}>
          <ModalProvider>{props.router ? <RouterProvider {...props.router}>{contents()}</RouterProvider> : contents()}</ModalProvider>
        </BreakpointProvider>
      </I18nProvider>
    </Context>
  );
}

function ProviderWrapper(props: ProviderProps & {ref?: DOMRef<HTMLDivElement>}) {
  let otherProps = omit(props, 'children', 'ref');
  let locale = useLocale();
  let provider = useProvider();
  let {modalProviderProps} = useModalProvider();
  let {styleProps} = useStyleProps(otherProps);
  let domRef = useDOMRef(props.ref);

  let themeKey = () => Object.keys(provider.theme[provider.colorScheme]!)[0];
  let scaleKey = () => Object.keys(provider.theme[provider.scale]!)[0];

  let className = () => clsx(
    styleProps.class,
    styles['spectrum'],
    typographyStyles['spectrum'],
    Object.values(provider.theme[provider.colorScheme]!),
    Object.values(provider.theme[provider.scale]!),
    provider.theme.global ? Object.values(provider.theme.global) : null,
    {
      'react-spectrum-provider': shouldKeepSpectrumClassNames,
      spectrum: shouldKeepSpectrumClassNames,
      [themeKey()]: shouldKeepSpectrumClassNames,
      [scaleKey()]: shouldKeepSpectrumClassNames
    }
  );

  let style = () => ({
    ...(styleProps.style as Record<string, string | number | undefined>),
    // This ensures that browser native UI like scrollbars are rendered in the right color scheme.
    // See https://web.dev/color-scheme/.
    colorScheme:
      props.colorScheme ??
      provider.colorScheme ??
      Object.keys(provider.theme)
        .filter(k => k === 'light' || k === 'dark')
        .join(' ')
  });

  let hasWarned = false;
  createEffect(() => ({direction: locale.direction, node: domRef.current}), ({direction, node}) => {
    if (direction && node) {
      let closestDir = node.parentElement?.closest('[dir]');
      let dir = closestDir && closestDir.getAttribute('dir');
      if (dir && dir !== direction && !hasWarned && process.env.NODE_ENV !== 'production') {
        console.warn(`Language directions cannot be nested. ${direction} inside ${dir}.`);
        hasWarned = true;
      }
    }
  });

  return (
    <div
      {...filterDOMProps(otherProps)}
      {...styleProps}
      {...modalProviderProps}
      class={className()}
      style={style()}
      lang={locale.locale}
      dir={locale.direction}
      ref={domRef}>
      {props.children}
    </div>
  );
}

/**
 * Returns the various settings and styles applied by the nearest parent Provider. Properties
 * explicitly set by the nearest parent Provider override those provided by preceeding Providers.
 */
export function useProvider(): ProviderContext {
  let context = useContext(Context);
  if (!context) {
    throw new Error(
      'No root provider found, please make sure your app is wrapped within a <Provider>. ' +
        'Alternatively, this issue may be caused by duplicate packages, see https://github.com/adobe/react-spectrum/wiki/Frequently-Asked-Questions-(FAQs)#why-are-there-errors-after-upgrading-a-react-spectrum-package for more information.'
    );
  }
  return context;
}

export function useProviderProps<T>(props: T): T {
  let context = useContext(Context);
  if (!context) {
    return props;
  }
  let defaults = ['isQuiet', 'isEmphasized', 'isDisabled', 'isRequired', 'isReadOnly', 'validationState'];
  return new Proxy(props as object, {
    get(target, key) {return Reflect.has(target, key) ? Reflect.get(target, key, target) : defaults.includes(key as string) ? context[key as keyof ProviderContext] : undefined;},
    ownKeys(target) {return [...new Set([...defaults, ...Reflect.ownKeys(target)])];},
    getOwnPropertyDescriptor(target, key) {return Reflect.getOwnPropertyDescriptor(target, key) ?? (defaults.includes(key as string) ? {enumerable: true, configurable: true} : undefined);}
  }) as T;
}
