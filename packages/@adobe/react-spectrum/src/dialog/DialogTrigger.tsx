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

import {DialogContext} from './context';
import {Modal} from '../overlays/Modal';
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState
} from 'react-stately/useOverlayTriggerState';
import {Popover} from '../overlays/Popover';
import {PositionProps} from 'react-aria/useOverlayPosition';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {createEffect, createMemo, Match, merge, omit, onCleanup, Switch} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';
import {useObjectRef} from 'react-aria/useObjectRef';
import {SpectrumDialogProps} from './Dialog';
import {Tray} from '../overlays/Tray';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useOverlayTrigger} from 'react-aria/useOverlayTrigger';

export type SpectrumDialogClose = (close: () => void) => JSX.Element;

export interface SpectrumDialogTriggerProps extends OverlayTriggerProps, PositionProps {
  /**
   * The Dialog and its trigger element. See the DialogTrigger [Content section](#content) for more
   * information on what to provide as children.
   */
  children: [JSX.Element, SpectrumDialogClose | JSX.Element];
  /**
   * The type of Dialog that should be rendered. See the DialogTrigger [types
   * section](#dialog-types) for an explanation on each.
   *
   * @default 'modal'
   */
  type?: 'modal' | 'popover' | 'tray' | 'fullscreen' | 'fullscreenTakeover';
  /**
   * The type of Dialog that should be rendered when on a mobile device. See DialogTrigger [types
   * section](#dialog-types) for an explanation on each.
   */
  mobileType?: 'modal' | 'tray' | 'fullscreen' | 'fullscreenTakeover';
  /**
   * Whether a popover type Dialog's arrow should be hidden.
   */
  hideArrow?: boolean;
  /**
   * The ref of the element the Dialog should visually attach itself to. Defaults to the trigger
   * button if not defined.
   */
  targetRef?: RefObject<HTMLElement | null>;
  /** Whether a modal type Dialog should be dismissable. */
  isDismissable?: boolean;
  /** Whether pressing the escape key to close the dialog should be disabled. */
  isKeyboardDismissDisabled?: boolean;
}

function DialogTrigger(props: SpectrumDialogTriggerProps) {
  let positionProps = omit(props, 'children', 'type', 'mobileType', 'hideArrow', 'targetRef', 'isDismissable', 'isKeyboardDismissDisabled');
  let parts = createMemo(() => {
    let children = props.children;
    if (!Array.isArray(children) || children.length > 2) {
      throw new Error('DialogTrigger must have exactly 2 children');
    }
    return children;
  });
  // if a function is passed as the second child, it won't appear in toArray
  let trigger = () => parts()[0];
  let content = () => parts()[1];

  // On small devices, show a modal or tray instead of a popover.
  let isMobile = useIsMobileDevice();
  let desktopType = () => props.type ?? 'modal';
  let mobileType = () => props.mobileType ?? (desktopType() === 'popover' ? 'modal' : desktopType());
  let type = () => isMobile() ? mobileType() : desktopType();
  // Desktop popovers need a close button for the mobile modal view.
  let isDismissable = () => isMobile() && desktopType() !== 'modal' && mobileType() === 'modal'
    ? true : props.isDismissable;

  let state = useOverlayTriggerState(props);
  let wasOpen = {current: false};
  createEffect(() => state.isOpen, isOpen => {
    wasOpen.current = isOpen;
  });

  let isExiting = {current: false};
  let onExiting = () => (isExiting.current = true);
  let onExited = () => (isExiting.current = false);

  let lastType = {current: 'modal' as NonNullable<SpectrumDialogTriggerProps['type']>};
  createEffect(type, value => { lastType.current = value; });
  onCleanup(() => {
      if (
        (wasOpen.current || isExiting.current) &&
        lastType.current !== 'popover' &&
        lastType.current !== 'tray' &&
        process.env.NODE_ENV !== 'production'
      ) {
        console.warn(
          'A DialogTrigger unmounted while open. This is likely due to being placed within a trigger that unmounts or inside a conditional. Consider using a DialogContainer instead.'
        );
      }
  });

  let renderContent = () => {
    let child = content();
    // Zero-argument functions are native lazy JSX, not close-render callbacks.
    return typeof child === 'function' && child.length > 0 ? (child as SpectrumDialogClose)(state.close) : child as JSX.Element;
  };
  return <Switch fallback={
    <DialogTriggerBase
      type={type()}
      state={state}
      isDismissable={isDismissable()}
      trigger={trigger()}
      overlay={
        <Switch>
          <Match when={type() === 'tray'}>
            <Tray state={state} isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}>
              {renderContent()}
            </Tray>
          </Match>
          <Match when={type() === 'modal' || type() === 'fullscreen' || type() === 'fullscreenTakeover'}>
            <Modal
              state={state}
              isDismissable={type() === 'modal' ? isDismissable() : false}
              type={type() as 'modal' | 'fullscreen' | 'fullscreenTakeover'}
              isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
              onExiting={onExiting}
              onExited={onExited}>
              {renderContent()}
            </Modal>
          </Match>
        </Switch>
      }
    />
  }><Match when={type() === 'popover'}>
      <PopoverTrigger
        {...positionProps}
        state={state}
        targetRef={props.targetRef}
        trigger={trigger()}
        content={renderContent}
        isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
        hideArrow={props.hideArrow}
      />
  </Match></Switch>;
}

// Support DialogTrigger inside components using CollectionBuilder.
DialogTrigger.getCollectionNode = function* (props: SpectrumDialogTriggerProps) {
  let [trigger] = props.children.filter(child => child != null && typeof child !== 'boolean');
  let [, content] = props.children;
  yield {
    element: trigger,
    wrapper: (element: JSX.Element) => (
      <DialogTrigger {...props} children={[element, content]} />
    )
  };
};

/**
 * DialogTrigger serves as a wrapper around a Dialog and its associated trigger, linking the
 * Dialog's open state with the trigger's press state. Additionally, it allows you to customize the
 * type and positioning of the Dialog.
 */

// We don't want getCollectionNode to show up in the type definition
let _DialogTrigger = DialogTrigger as (props: SpectrumDialogTriggerProps) => JSX.Element;
export {_DialogTrigger as DialogTrigger};

function PopoverTrigger(props: Omit<SpectrumDialogTriggerProps, 'children'> & {state: OverlayTriggerState; trigger: JSX.Element; content: () => JSX.Element}) {
  let triggerRef = useObjectRef<HTMLElement>();
  let {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, props.state, triggerRef);

  let triggerPropsWithRef = merge(triggerProps, {
    get ref() { return props.targetRef ? undefined : triggerRef; }
  });

  return (
    <DialogTriggerBase
      type="popover"
      state={props.state}
      triggerProps={triggerPropsWithRef}
      dialogProps={overlayProps}
      trigger={props.trigger}
      overlay={
        <Popover {...omit(props, 'trigger', 'content')} triggerRef={props.targetRef || triggerRef} state={props.state}>
          {props.content()}
        </Popover>
      }
    />
  );
}

interface SpectrumDialogTriggerBase {
  type: 'modal' | 'popover' | 'tray' | 'fullscreen' | 'fullscreenTakeover';
  state: OverlayTriggerState;
  isDismissable?: boolean;
  dialogProps?: SpectrumDialogProps | {};
  triggerProps?: any;
  overlay?: JSX.Element;
  trigger: JSX.Element;
}

function DialogTriggerBase(props: SpectrumDialogTriggerBase) {
  let context = merge({
    get type() { return props.type; },
    onClose: props.state.close,
    get isDismissable() { return props.isDismissable; }
  }, () => props.dialogProps ?? {});

  return (
    <>
      <PressResponder
        {...props.triggerProps}
        onPress={props.state.toggle}
        isPressed={
          props.state.isOpen && props.type !== 'modal' && props.type !== 'fullscreen' && props.type !== 'fullscreenTakeover'
        }>
        {props.trigger}
      </PressResponder>
      <DialogContext value={context}>{props.overlay}</DialogContext>
    </>
  );
}
