/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {AriaDialogProps, useDialog} from 'react-aria/useDialog';

import {ButtonContext} from './Button';
import {
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMRenderProps,
  Provider,
  SlotProps,
  StyleProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {HeadingContext} from './Heading';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {OverlayTriggerProps, OverlayTriggerState} from 'react-stately/useOverlayTriggerState';
import {PopoverContext} from './PopoverContext';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {createContext, createEffect, merge, useContext} from 'solid-js';
import type {Accessor, Element as Child, Ref as NativeRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {RootMenuTriggerStateContext} from './RootMenuTriggerStateContext';
import {TextContext} from './Text';
import {useId} from 'react-aria/useId';
import {useIsHidden} from 'react-aria/private/collections/Hidden';
import {useMenuTriggerState} from 'react-stately/private/menu/useMenuTriggerState';
import {useOverlayTrigger} from 'react-aria/useOverlayTrigger';

export interface DialogTriggerProps extends OverlayTriggerProps {
  children: Child;
}

export interface DialogRenderProps {
  close: () => void;
}

export interface DialogProps
  extends
    AriaDialogProps,
    StyleProps,
    SlotProps,
    DOMRenderProps<'section', undefined>,
    GlobalDOMAttributes<HTMLElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-Dialog'
   */
  className?: string;
  /** Children of the dialog. A function may be provided to access a function to close the dialog. */
  children?: Child | ((opts: DialogRenderProps) => Child);
  ref?: NativeRef<HTMLElement>;
}

// Native providers may carry a live nullable value accessor. Existing object
// values and the null default remain supported; consumers resolve the current
// value in their tracking scope rather than snapshotting the initial policy.
export const DialogContext = createContext<ContextValue<DialogProps, HTMLElement> | Accessor<ContextValue<DialogProps, HTMLElement>>>(null);
export const OverlayTriggerStateContext = createContext<OverlayTriggerState | null>(null);

/**
 * A DialogTrigger opens a dialog when a trigger element is pressed.
 */
export function DialogTrigger(props: DialogTriggerProps): JSX.Element | null {
  // Use useMenuTriggerState instead of useOverlayTriggerState in case a menu is embedded in the dialog.
  // This is needed to handle submenus.
  let state = useMenuTriggerState(props);

  let buttonRef = useObjectRef<HTMLButtonElement>();
  let {triggerProps: baseTriggerProps, overlayProps: baseOverlayProps} = useOverlayTrigger({type: 'dialog'}, state, buttonRef);

  // Label dialog by the trigger as a fallback if there is no title slot.
  // This is done in RAC instead of hooks because otherwise we cannot distinguish
  // between context and props. Normally aria-labelledby overrides the title
  // but when sent by context we want the title to win.
  // oxlint-disable-next-line react/react-compiler
  let triggerId = useId();
  let triggerProps = mergeProps(baseTriggerProps, {get id() { return triggerId(); }});
  // oxlint-disable-next-line react/react-compiler
  let overlayProps = mergeProps(baseOverlayProps, {get 'aria-labelledby'() { return triggerId(); }});

  // If within a collection (e.g. Tabs), render nothing.
  // Not using createHideableComponent for this because that also creates a forwardRef.
  let isHidden = useIsHidden();
  if (isHidden) {
    return null;
  }

  return (
    <Provider
      values={[
        [OverlayTriggerStateContext, state],
        [RootMenuTriggerStateContext, state],
        [DialogContext, overlayProps],
        [
          PopoverContext,
          {
            trigger: 'DialogTrigger',
            triggerRef: buttonRef,
             get id() { return overlayProps.id; },
             get 'aria-labelledby'() { return overlayProps['aria-labelledby']; }
          }
        ]
      ]}>
      <PressResponder {...triggerProps} ref={buttonRef} isPressed={state.isOpen}>
        {props.children}
      </PressResponder>
    </Provider>
  );
}

/**
 * A dialog is an overlay shown above other content in an application.
 */
export function Dialog(originalProps: DialogProps): JSX.Element {
  let originalAriaLabelledby = () => originalProps['aria-labelledby'];
  let [props, mergedRef] = useContextProps(originalProps, undefined, DialogContext);
  let ref = useObjectRef<HTMLElement>(mergedRef as Ref<HTMLElement>);
  createEffect(() => ({element: ref.current, forwarded: originalProps.ref}), ({element, forwarded}) => {
    if (!element) { return; }
    let deliver = mergeRefs(forwarded);
    let cleanup = deliver(element);
    return typeof cleanup === 'function' ? cleanup : () => { deliver(null); };
  });
  let {dialogProps, titleProps, contentProps} = useDialog(
    merge(props, {
      // Only pass aria-labelledby from props, not context.
      // Context is used as a fallback below.
      get 'aria-labelledby'() { return originalAriaLabelledby(); }
    }),
    ref
  );
  let state = useContext(OverlayTriggerStateContext);

  let resolvedDialogProps = mergeProps(dialogProps, {
    get 'aria-labelledby'() {
      return !dialogProps['aria-label'] && !dialogProps['aria-labelledby'] ?
        props['aria-labelledby'] : dialogProps['aria-labelledby'];
    }
  });
  createEffect(() => ({label: dialogProps['aria-label'], labelledby: dialogProps['aria-labelledby'], fallback: props['aria-labelledby']}), ({label, labelledby, fallback}) => {
  if (!label && !labelledby) {
    // If aria-labelledby exists on props, we know it came from context.
    // Use that as a fallback in case there is no title slot.
    if (!fallback && process.env.NODE_ENV !== 'production') {
      console.warn(
        'If a Dialog does not contain a <Heading slot="title">, it must have an aria-label or aria-labelledby attribute for accessibility.'
      );
    }
  }
  });

  let renderProps = useRenderProps({
    defaultClassName: 'react-aria-Dialog',
    get className() { return props.className; },
    get style() { return props.style; },
    get children() { return props.children; },
    values: {
      close: state?.close || (() => {})
    }
  });

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.section
      {...mergeProps(DOMProps, renderProps, resolvedDialogProps)}
      render={props.render}
      ref={ref}
      slot={props.slot || undefined}>
      <Provider
        values={[
          [
            HeadingContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                // The frozen hook's title/content bags contain only live IDs.
                title: mergeProps(titleProps as Pick<typeof titleProps, 'id'>, {level: 2})
              }
            }
          ],
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                description: contentProps as Pick<typeof contentProps, 'id'>
              }
            }
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                close: {
                  onPress: () => state?.close()
                }
              }
            }
          ]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.section>
  );
}
