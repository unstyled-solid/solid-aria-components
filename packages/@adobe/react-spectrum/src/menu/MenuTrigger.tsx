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

import {Alignment, DOMRefValue} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {MenuContext, type MenuContextValue} from './context';
import {MenuTriggerProps, useMenuTriggerState} from 'react-stately/useMenuTriggerState';
import {Placement} from 'react-aria/useOverlayPosition';
import {Popover} from '../overlays/Popover';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {createMemo, merge, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import {SlotProvider} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {Tray} from '../overlays/Tray';
import {unwrapDOMRef, useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useInteractOutside} from 'react-aria/useInteractOutside';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useMenuTrigger} from 'react-aria/useMenu';

export interface SpectrumMenuTriggerProps extends MenuTriggerProps {
  /**
   * The contents of the MenuTrigger - a trigger and a Menu.
   */
  children: (JSX.Element | (() => JSX.Element))[];
  /**
   * Alignment of the menu relative to the trigger.
   *
   * @default 'start'
   */
  align?: Alignment;
  /**
   * Where the Menu opens relative to its trigger.
   *
   * @default 'bottom'
   */
  direction?: 'bottom' | 'top' | 'left' | 'right' | 'start' | 'end';
  /**
   * Whether the menu should automatically flip direction when space is limited.
   *
   * @default true
   */
  shouldFlip?: boolean;
  /**
   * Whether the Menu closes when a selection is made.
   *
   * @default true
   */
  closeOnSelect?: boolean;
  ref?: DOMRef<HTMLElement>;
}

/**
 * The MenuTrigger serves as a wrapper around a Menu and its associated trigger,
 * linking the Menu's open state with the trigger's press state.
 */
export function MenuTrigger(props: SpectrumMenuTriggerProps) {
  let triggerRef = useObjectRef<HTMLElement>();
  let domRef = useDOMRef(untrack(() => props.ref));
  let menuTriggerRef = domRef || triggerRef;
  let menuRef = useObjectRef<HTMLDivElement>();
  let parts = createMemo(() => props.children.filter(child => child != null && typeof child !== 'boolean'));
  let menuTrigger = () => {
    let child = parts()[0];
    return typeof child === 'function' ? child() : child;
  };
  let menu = () => {
    let child = parts()[1];
    return typeof child === 'function' ? child() : child;
  };
  let state = useMenuTriggerState(props);

  let {menuTriggerProps, menuProps} = useMenuTrigger({get trigger() {return props.trigger ?? 'press';}}, state, menuTriggerRef);

  let initialPlacement = (): Placement => {
    let direction = props.direction ?? 'bottom';
    let align = props.align ?? 'start';
    switch (direction) {
      case 'left':
      case 'right':
      case 'start':
      case 'end':
        return `${direction} ${align === 'end' ? 'bottom' : 'top'}` as Placement;
      case 'bottom':
      case 'top':
      default:
        return `${direction} ${align}` as Placement;
    }
  };

  let isMobile = useIsMobileDevice();
  let menuContext = merge(menuProps, {
    ref: menuRef,
    onClose: state.close,
    get closeOnSelect() {return props.closeOnSelect;},
    get autoFocus() {return state.focusStrategy || true;},
    get UNSAFE_style() {return isMobile()
      ? {
          width: '100%',
          'max-height': 'inherit'
        }
      : undefined;},
    get UNSAFE_className() {return classNames(styles, {'spectrum-Menu-popover': !isMobile()});},
    state
  });

  // Close when clicking outside the root menu when a submenu is open.
  let rootOverlayRef = useObjectRef<DOMRefValue<HTMLDivElement>>();
  // oxlint-disable-next-line react/react-compiler
  let rootOverlayDomRef = unwrapDOMRef(rootOverlayRef);
  useInteractOutside({
    ref: rootOverlayDomRef,
    onInteractOutside: () => {
      state?.close();
    },
    get isDisabled() {return !state.isOpen || state.expandedKeysStack.length === 0;}
  });

  // On small screen devices, the menu is rendered in a tray, otherwise a popover.
  let overlay = () => {
    if (isMobile()) {
      return (
        <Tray state={state} isFixedHeight ref={rootOverlayRef}>
          {menu()}
        </Tray>
      );
    } else {
      return (
        <Popover
          ref={rootOverlayRef}
          UNSAFE_style={{'clip-path': 'unset', overflow: 'visible', filter: 'unset', 'border-width': '0px'}}
          state={state}
          triggerRef={menuTriggerRef}
          scrollRef={menuRef}
          placement={initialPlacement()}
          hideArrow
          shouldFlip={props.shouldFlip ?? true}
          shouldContainFocus>
          {menu()}
        </Popover>
      );
    }
  };

  return (
    <>
      <SlotProvider slots={{actionButton: {get holdAffordance() {return (props.trigger ?? 'press') === 'longPress';}}}}>
        <PressResponder {...menuTriggerProps} ref={menuTriggerRef} isPressed={state.isOpen}>
          {menuTrigger()}
        </PressResponder>
      </SlotProvider>
      <MenuContext value={menuContext as MenuContextValue}>{overlay()}</MenuContext>
    </>
  );
}
