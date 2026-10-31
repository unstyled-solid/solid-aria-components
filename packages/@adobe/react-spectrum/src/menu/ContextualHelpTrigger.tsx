/*
 * Copyright 2023 Adobe. All rights reserved.
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

import {DOMRefValue, Key, Node} from '@react-types/shared';
import {FocusScope} from 'react-aria/FocusScope';
import {getInteractionModality} from 'react-aria/private/interactions/useFocusVisible';
import helpStyles from '@adobe/spectrum-css-temp/components/contextualhelp/vars.css';
import {isFocusWithin, nodeContains} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {Popover} from '../overlays/Popover';
import {createEffect, createSignal, merge, omit} from 'solid-js';
import {Portal, type JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {collectionChildren, isCollectionDescriptor, type PartialNode} from 'react-stately/private/collections/types';
import {SlotProvider} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {SubmenuTriggerContext, useMenuStateContext} from './context';
import {TrayHeaderWrapper} from './Menu';
import {unwrapDOMRef} from '../utils/useDOMRef';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useSubmenuTrigger} from 'react-aria/useMenu';
import {useSubmenuTriggerState} from 'react-stately/useMenuTriggerState';

interface MenuDialogTriggerProps {
  /** Whether the menu item is currently unavailable. */
  isUnavailable?: boolean;
  /** The triggering Item and the Dialog, respectively. */
  children: [JSX.Element | (() => JSX.Element), JSX.Element | (() => JSX.Element)];
}

interface InternalMenuDialogTriggerProps extends MenuDialogTriggerProps {
  targetKey: Key;
}

export interface SpectrumMenuDialogTriggerProps extends MenuDialogTriggerProps {}

function ContextualHelpTriggerView(props: InternalMenuDialogTriggerProps): JSX.Element {
  let triggerRef = useObjectRef<HTMLLIElement>();
  let popoverRef = useObjectRef<DOMRefValue<HTMLDivElement>>();
  let context = useMenuStateContext()!;
  let parentMenuRef = context.menu;
  let state = context.state;
  let submenuTriggerState = useSubmenuTriggerState(
    {get triggerKey() {return props.targetKey;}},
    merge(context.rootMenuTriggerState!, state)
  );
  // oxlint-disable-next-line react/react-compiler
  let submenuRef = unwrapDOMRef(popoverRef);
  let {submenuTriggerProps, popoverProps} = useSubmenuTrigger(
    {
      parentMenuRef,
      submenuRef,
      type: 'dialog',
       get isDisabled() {return !props.isUnavailable;}
    },
    submenuTriggerState,
    triggerRef
  );
  let isMobile = useIsMobileDevice();
  let [traySubmenuAnimation, setTraySubmenuAnimation] = createSignal('');
  createEffect(() => submenuTriggerState.isOpen, isOpen => {
    if (isOpen) {
      // oxlint-disable-next-line react/react-compiler
      setTraySubmenuAnimation('spectrum-TraySubmenu-enter');
    }
  });
  let slots = (): Record<string, object> => props.isUnavailable ? {
      dialog: {
        UNSAFE_className: classNames(
          helpStyles,
          'react-spectrum-ContextualHelp-dialog',
          {
             'react-spectrum-ContextualHelp-dialog--isMobile': isMobile()
          },
          classNames(styles, {
             'spectrum-Menu-subdialog': !isMobile(),
             [traySubmenuAnimation()]: isMobile()
          })
        )
      },
      content: {UNSAFE_className: helpStyles['react-spectrum-ContextualHelp-content']},
      footer: {UNSAFE_className: helpStyles['react-spectrum-ContextualHelp-footer']}
     } : {};
  let trigger = () => {
    let child = props.children[0];
    return typeof child === 'function' ? child() : child;
  };
  let content = () => {
    let child = props.children[1];
    return typeof child === 'function' ? child() : child;
  };

  let onBlurWithin: NonNullable<Parameters<typeof Popover>[0]['onBlurWithin']> = e => {
    if (
      e.relatedTarget &&
      popoverRef.current &&
      !nodeContains(popoverRef.current.UNSAFE_getDOMNode(), e.relatedTarget as globalThis.Node) &&
      !(e.relatedTarget === triggerRef.current && getInteractionModality() === 'pointer')
    ) {
      if (submenuTriggerState.isOpen) {
        submenuTriggerState.close();
      }
    }
  };

  let onBackButtonPress = () => {
    setTraySubmenuAnimation('spectrum-TraySubmenu-exit');
    setTimeout(() => {
      submenuTriggerState.close();
      if (parentMenuRef.current && !isFocusWithin(parentMenuRef.current)) {
        parentMenuRef.current.focus();
      }
    }, 220); // Matches transition duration
  };

  let triggerProps = merge(() => isMobile()
    ? omit(submenuTriggerProps, 'onBlur', 'onHoverChange')
    : submenuTriggerProps);
  let overlay = () => {
   if (isMobile()) {
    if (context.trayContainerRef.current && submenuTriggerState.isOpen) {
      let subDialogKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = e => {
        switch (e.key) {
          case 'Escape':
            e.stopPropagation();
            onBackButtonPress();
            break;
        }
      };

      return <Portal mount={context.trayContainerRef.current}>
        <TrayHeaderWrapper
          isSubmenu
          parentMenuTreeState={state}
          rootMenuTriggerState={context.rootMenuTriggerState}
          wrapperKeyDown={subDialogKeyDown}
          onBackButtonPress={onBackButtonPress}>
          {content()}
        </TrayHeaderWrapper>
      </Portal>;
    }
  } else {
    let onDismissButtonPress = () => {
      submenuTriggerState.close();
      parentMenuRef.current?.focus();
    };

    return (
      <Popover
        {...popoverProps}
        UNSAFE_style={{'clip-path': 'unset', overflow: 'visible', filter: 'unset', 'border-width': '0px'}}
        UNSAFE_className={classNames(styles, 'spectrum-Submenu-popover')}
        onDismissButtonPress={onDismissButtonPress}
        onBlurWithin={onBlurWithin}
        container={context.popoverContainer!}
        state={submenuTriggerState}
        ref={popoverRef}
        triggerRef={triggerRef}
        placement="end top"
        containerPadding={0}
        hideArrow
        enableBothDismissButtons>
        <FocusScope restoreFocus contain>
           {content()}
        </FocusScope>
      </Popover>
    );
  }
  };

  return (
    <>
      <SubmenuTriggerContext value={merge({get isUnavailable() {return props.isUnavailable ?? false;}, triggerRef}, triggerProps)}>
        {trigger()}
      </SubmenuTriggerContext>
      <SlotProvider slots={slots()}>{submenuTriggerState.isOpen && overlay()}</SlotProvider>
    </>
  );
}

function ContextualHelpTrigger(props: SpectrumMenuDialogTriggerProps): JSX.Element {
  return {type: ContextualHelpTrigger, props} as unknown as JSX.Element;
}

ContextualHelpTrigger.getCollectionNode = function* getCollectionNode(props: SpectrumMenuDialogTriggerProps): Generator<PartialNode<object>, void, Node<object>[]> {
  let childArray = collectionChildren(props.children[0]).filter(isCollectionDescriptor);
  let [trigger] = childArray;
  let [, content] = props.children;
  let targetKey: Key;

  let nodes = yield {
    element: {...trigger, props: merge(trigger.props, {hasChildItems: true, isTrigger: true})} as unknown as JSX.Element,
    wrapper: element => (
      <ContextualHelpTriggerView targetKey={targetKey} {...props} children={[element, content]} />
    )
  };
  targetKey = nodes[0].key;
};

let _Item = ContextualHelpTrigger as unknown as (
  props: SpectrumMenuDialogTriggerProps
) => JSX.Element;
export {_Item as ContextualHelpTrigger};
