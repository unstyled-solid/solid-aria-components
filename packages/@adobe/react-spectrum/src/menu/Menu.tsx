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

import {ActionButton} from '../button/ActionButton';
import {AriaMenuProps, useMenu} from 'react-aria/useMenu';
import ArrowDownSmall from '@spectrum-icons/ui/ArrowDownSmall';
import {classNames} from '../utils/classNames';
import {RefObject, StyleProps} from '@react-types/shared';
import {FocusScope} from 'react-aria/FocusScope';
import intlMessages from '../../intl/menu/*.json';
import {MenuContext, MenuStateContext, useMenuStateContext} from './context';
import {MenuItem} from './MenuItem';
import {MenuSection} from './MenuSection';
import {mergeProps} from 'react-aria/mergeProps';
import {createEffect, createSignal, For, merge, onCleanup, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import clsx from 'clsx';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import type {RootMenuTriggerState} from 'react-stately/useMenuTriggerState';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {TreeState, useTreeState} from 'react-stately/useTreeState';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useSlotId} from 'react-aria/private/utils/useId';
import {useStyleProps} from '../utils/styleProps';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';

export interface SpectrumMenuProps<T> extends AriaMenuProps<T>, StyleProps {
  ref?: DOMRef<HTMLDivElement>;
}

/**
 * Menus display a list of actions or options that a user can choose.
 */
export function Menu<T extends object>(props: SpectrumMenuProps<T>): JSX.Element {
  let contextProps = useContext(MenuContext);
  let parentMenuContext = useMenuStateContext();
  let rootMenuTriggerState = () => parentMenuContext ? parentMenuContext.rootMenuTriggerState : contextProps.state;
  let completeProps = mergeProps(contextProps, props);
  let domRef = useDOMRef(props.ref);
  let [popoverContainer, setPopoverContainer] = createSignal<HTMLElement | null>(null);
  let trayContainerRef = useObjectRef<HTMLDivElement>();
  let state = useTreeState(completeProps);
  let submenuRef = useObjectRef<HTMLDivElement>();
  let {menuProps} = useMenu(completeProps, state, domRef);
  let {styleProps} = useStyleProps(completeProps);
  // Spectrum's style producer and frozen React menuProps use object styles;
  // native host unions do not widen that source contract.
  let menuStyle = () => mergeProps(styleProps.style as JSX.CSSProperties, menuProps.style as JSX.CSSProperties | undefined);
  useSyncRef(contextProps, domRef);
  let [leftOffset, setLeftOffset] = createSignal({left: 0});
  let prevPopoverContainer = {current: null as HTMLElement | null};

  createEffect(() => ({container: popoverContainer(), offset: leftOffset()}), ({container, offset}) => {
    if (
      container &&
      prevPopoverContainer.current !== container &&
      offset.left === 0
    ) {
      prevPopoverContainer.current = container;
      let {left} = container.getBoundingClientRect();
      setLeftOffset({left: -1 * left});
    }
  });

  let hasOpenSubmenu = () => {
    let menuLevel = contextProps.submenuLevel ?? -1;
    let nextMenuLevelKey = rootMenuTriggerState()?.expandedKeysStack[menuLevel + 1];
    return nextMenuLevelKey != null && state.collection.getItem(nextMenuLevelKey) != null;
  };
  let menuStateContext = {
    get popoverContainer() { return popoverContainer(); },
    trayContainerRef,
    menu: domRef,
    submenu: submenuRef,
    get rootMenuTriggerState() { return rootMenuTriggerState(); },
    state
  };

  return (
    <MenuStateContext value={menuStateContext}>
      <div style={{height: hasOpenSubmenu() ? '100%' : undefined}} ref={trayContainerRef} />
      <FocusScope>
        <TrayHeaderWrapper
          onBackButtonPress={contextProps.onBackButtonPress}
          hasOpenSubmenu={hasOpenSubmenu()}
          isSubmenu={!!parentMenuContext}
          parentMenuTreeState={parentMenuContext?.state}
          rootMenuTriggerState={rootMenuTriggerState()}
          menuRef={domRef}>
          <div
            {...menuProps as JSX.HTMLAttributes<HTMLDivElement>}
            style={menuStyle()}
            ref={domRef}
            class={classNames(styles, 'spectrum-Menu', clsx(styleProps.class))}>
            <For each={[...state.collection]} keyed={item => item.key}>{item =>
              <>{item().type === 'section'
                ? <MenuSection item={item()} state={state} />
                : item().wrapper
                  ? item().wrapper!(() => <MenuItem item={item()} state={state} />)
                  : <MenuItem item={item()} state={state} />}</>
            }</For>
          </div>
        </TrayHeaderWrapper>
        {rootMenuTriggerState()?.isOpen && (
          <div
            ref={setPopoverContainer}
            style={{width: '100vw', position: 'absolute', top: '-5px', left: `${leftOffset().left}px`}}
          />
        )}
      </FocusScope>
    </MenuStateContext>
  );
}

export function TrayHeaderWrapper(props: {
  children: JSX.Element;
  isSubmenu?: boolean;
  hasOpenSubmenu?: boolean;
  parentMenuTreeState?: TreeState<any>;
  rootMenuTriggerState?: RootMenuTriggerState;
  onBackButtonPress?: () => void;
  wrapperKeyDown?: JSX.EventHandler<HTMLDivElement, KeyboardEvent>;
  menuRef?: RefObject<HTMLDivElement | null>;
}): JSX.Element {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/menu');
  let backButtonText = () => {
    let lastKey = props.rootMenuTriggerState?.expandedKeysStack.slice(-1)[0];
    return lastKey != null ? props.parentMenuTreeState?.collection.getItem(lastKey)?.textValue ?? '' : '';
  };
  let backButtonLabel = () => stringFormatter.format('backButton', {prevMenuButton: backButtonText()});
  let headingId = useSlotId();
  let isMobile = useIsMobileDevice();
  let locale = useLocale();

  let [traySubmenuAnimation, setTraySubmenuAnimation] = createSignal('');
  createEffect(() => ({hasOpenSubmenu: props.hasOpenSubmenu, mobile: isMobile()}), ({hasOpenSubmenu}) => {
    if (!hasOpenSubmenu) {
      setTraySubmenuAnimation('spectrum-TraySubmenu-enter');
    }
  });

  let timeoutRef = {current: null as ReturnType<typeof setTimeout> | null};
  let handleBackButtonPress = () => {
    setTraySubmenuAnimation('spectrum-TraySubmenu-exit');
    timeoutRef.current = setTimeout(() => {
      props.onBackButtonPress?.();
    }, 220); // Matches transition duration
  };

  onCleanup(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  });

  // When opening submenu in tray, focus the first item in the submenu after animation completes
  // This fixes an issue with iOS VO where the closed submenu was getting focus
  let focusTimeoutRef = {current: null as ReturnType<typeof setTimeout> | null};
  createEffect(() => ({
    mobile: isMobile(),
    isSubmenu: props.isSubmenu,
    hasOpenSubmenu: props.hasOpenSubmenu,
    animation: traySubmenuAnimation(),
    menu: props.menuRef
  }), ({mobile, isSubmenu, hasOpenSubmenu, animation, menu}) => {
    if (
      mobile &&
      isSubmenu &&
      !hasOpenSubmenu &&
      animation === 'spectrum-TraySubmenu-enter'
    ) {
      focusTimeoutRef.current = setTimeout(() => {
        let firstItem = menu?.current?.querySelector(
          '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'
        ) as HTMLElement;
        firstItem?.focus();
      }, 220);
    }
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  });

  return (
    <>
      <div
        role={headingId() ? 'dialog' : undefined}
        aria-labelledby={headingId()}
        aria-hidden={props.hasOpenSubmenu === undefined && isMobile() ? undefined : isMobile() && props.hasOpenSubmenu ? 'true' : 'false'}
        data-testid="menu-wrapper"
        class={classNames(styles, 'spectrum-Menu-wrapper', {
          'spectrum-Menu-wrapper--isMobile': isMobile(),
          'is-expanded': props.hasOpenSubmenu,
          [traySubmenuAnimation()]: isMobile()
        })}>
        <div
          role="presentation"
          class={classNames(styles, 'spectrum-Submenu-wrapper', {
            'spectrum-Submenu-wrapper--isMobile': isMobile()
          })}
          onKeyDown={props.wrapperKeyDown}>
          {isMobile() && props.isSubmenu && !props.hasOpenSubmenu && (
            <div class={classNames(styles, 'spectrum-Submenu-headingWrapper')}>
              <ActionButton aria-label={backButtonLabel()} isQuiet onPress={handleBackButtonPress}>
                {/* We don't have a ArrowLeftSmall so make due with ArrowDownSmall and transforms */}
                {locale.direction === 'rtl' ? (
                  <ArrowDownSmall UNSAFE_style={{rotate: '270deg'}} />
                ) : (
                  <ArrowDownSmall UNSAFE_style={{rotate: '90deg'}} />
                )}
              </ActionButton>
              <h1 id={headingId()} class={classNames(styles, 'spectrum-Submenu-heading')}>
                {backButtonText()}
              </h1>
            </div>
          )}
          {props.children}
        </div>
      </div>
    </>
  );
}
