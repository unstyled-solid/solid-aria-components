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

import {classNames} from '../utils/classNames';

import {isFocusWithin} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {Key, Node} from '@react-types/shared';
import {MenuContext, SubmenuTriggerContext, useMenuStateContext} from './context';
import {mergeProps} from 'react-aria/mergeProps';
import {Popover} from '../overlays/Popover';
import {merge, omit} from 'solid-js';
import {Portal, type JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {collectionChildren, isCollectionDescriptor, type PartialNode} from 'react-stately/private/collections/types';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useLocale} from 'react-aria/I18nProvider';
import {useSubmenuTrigger} from 'react-aria/useMenu';
import {useSubmenuTriggerState} from 'react-stately/useMenuTriggerState';

interface SubmenuTriggerProps {
  /**
   * The contents of the SubmenuTrigger - an Item and a Menu.
   */
  children: JSX.Element[];
  targetKey: Key;
}

export interface SpectrumSubmenuTriggerProps extends Omit<SubmenuTriggerProps, 'targetKey'> {}

function SubmenuTriggerView(props: SubmenuTriggerProps) {
  let triggerRef = useObjectRef<HTMLDivElement>();
  let menuTrigger = () => props.children[0];
  let menu = () => props.children[1];
  let context = useMenuStateContext()!;
  let parentMenuRef = context.menu;
  let menuRef = context.submenu;
  let submenuTriggerState = useSubmenuTriggerState({get triggerKey() {return props.targetKey;}}, context.rootMenuTriggerState!);
  let {submenuTriggerProps, submenuProps, popoverProps} = useSubmenuTrigger(
    {
      parentMenuRef,
      submenuRef: menuRef
    },
    submenuTriggerState,
    triggerRef
  );
  let isMobile = useIsMobileDevice();
  let onBackButtonPress = () => {
    submenuTriggerState.close();
    if (parentMenuRef.current && !isFocusWithin(parentMenuRef.current)) {
      parentMenuRef.current.focus();
    }
  };

  let locale = useLocale();
  let mobileSubmenuKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (locale.direction === 'ltr') {
          triggerRef.current?.focus();
        }
        break;
      case 'ArrowRight':
        if (locale.direction === 'rtl') {
          triggerRef.current?.focus();
        }
        break;
    }
  };

  let triggerProps = merge(() => isMobile()
    ? omit(submenuTriggerProps, 'onBlur', 'onHoverChange')
    : submenuTriggerProps);
  let overlay = () => {
    if (isMobile()) {
      return context.trayContainerRef.current && submenuTriggerState.isOpen
        ? <Portal mount={context.trayContainerRef.current!}>{menu()}</Portal>
        : null;
    }
    let onDismissButtonPress = () => {
      submenuTriggerState.close();
      parentMenuRef.current?.focus();
    };

    return (
      <Popover
        {...popoverProps}
        onDismissButtonPress={onDismissButtonPress}
        UNSAFE_className={classNames(styles, 'spectrum-Submenu-popover')}
        container={context.popoverContainer!}
        containerPadding={0}
        enableBothDismissButtons
        UNSAFE_style={{'clip-path': 'unset', overflow: 'visible', 'border-width': '0px'}}
        state={submenuTriggerState}
        triggerRef={triggerRef}
        scrollRef={menuRef}
        placement="end top"
        hideArrow>
        {menu()}
      </Popover>
    );
  };

  let menuContext = mergeProps(submenuProps, {
      ref: menuRef,
      get autoFocus() {return isMobile() ? submenuProps.autoFocus ?? true : submenuProps.autoFocus;},
      get UNSAFE_style() {return isMobile()
        ? {
            width: '100%',
            'max-height': 'inherit'
          }
        : undefined;},
      get UNSAFE_className() {return classNames(styles, {'spectrum-Menu-popover': !isMobile()});}
    }, merge(() => isMobile() ? {onBackButtonPress, onKeyDown: mobileSubmenuKeyDown} : {}));

  return (
    <>
      <SubmenuTriggerContext value={merge(triggerProps, {triggerRef})}>
        {menuTrigger()}
      </SubmenuTriggerContext>
      <MenuContext value={menuContext}>{overlay()}</MenuContext>
    </>
  );
}

function SubmenuTrigger(props: SpectrumSubmenuTriggerProps): JSX.Element {
  return {type: SubmenuTrigger, props} as unknown as JSX.Element;
}

SubmenuTrigger.getCollectionNode = function* (props: SpectrumSubmenuTriggerProps): Generator<PartialNode<object>, void, Node<object>[]> {
  // Resolve only the Item descriptor; the Menu must stay lazy until its overlay owns it.
  let childArray = collectionChildren(props.children[0]).filter(isCollectionDescriptor);
  let [trigger] = childArray;
  let [, content] = props.children;
  let targetKey: Key;

  let nodes = yield {
    element: {...trigger, props: merge(trigger.props, {hasChildItems: true, isTrigger: true})} as unknown as JSX.Element,
    wrapper: element => (
      <SubmenuTriggerView targetKey={targetKey} {...props}>
        {element}
        {content}
      </SubmenuTriggerView>
    )
  };
  // The builder supplies the same resolved collection key that React's keyed
  // rendered MenuItem carried. Native DOM children do not carry React keys.
  targetKey = nodes[0].key;
};

let _SubmenuTrigger = SubmenuTrigger as unknown as (
  props: SpectrumSubmenuTriggerProps
) => JSX.Element;
export {_SubmenuTrigger as SubmenuTrigger};
