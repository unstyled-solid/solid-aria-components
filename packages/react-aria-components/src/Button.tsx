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

import {announce} from 'react-aria/private/live-announcer/LiveAnnouncer';

import {AriaButtonProps, useButton} from 'react-aria/useButton';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {HoverEvents} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {ProgressBarContext} from './ProgressBar';
import {createContext, createEffect, merge, omit, type Ref as ForwardedRef} from 'solid-js';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';

export interface ButtonRenderProps {
  /**
   * Whether the button is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the button is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the button is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the button is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the button is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the button is currently in a pending state.
   *
   * @selector [data-pending]
   */
  isPending: boolean;
}

export interface ButtonProps
  extends
    Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents,
    SlotProps,
    RenderProps<ButtonRenderProps, 'button'>,
    Omit<GlobalDOMAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Button'
   */
  className?: ClassNameOrFunction<ButtonRenderProps>;
  /**
   * Whether the button is in a pending state. This disables press and hover events
   * while retaining focusability, and announces the pending state to screen readers.
   */
  isPending?: boolean;
}

interface ButtonContextValue extends ButtonProps {
  isPressed?: boolean;
}

export const ButtonContext = createContext<ContextValue<ButtonContextValue, HTMLButtonElement>>({});

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
export const Button = /*#__PURE__*/ createHideableComponent(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  let domRef = useObjectRef<HTMLButtonElement>(ref as Ref<HTMLButtonElement>);
  let ctx = props as ButtonContextValue;
  let isPending = () => !!ctx.isPending;
  let {buttonProps, isPressed} = useButton(props, domRef);
  buttonProps = useDisableInteractions(buttonProps, isPending);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing(props);
  let {hoverProps, isHovered} = useHover(merge(props, {
    get isDisabled() { return props.isDisabled || isPending(); }
  }));
  let renderValues = {
    get isHovered() { return isHovered(); },
    get isPressed() { return (ctx.isPressed || isPressed()) && !isPending(); },
    get isFocused() { return isFocused(); },
    get isFocusVisible() { return isFocusVisible(); },
    get isDisabled() { return props.isDisabled || false; },
    get isPending() { return isPending(); }
  };

  let renderProps = useRenderProps(merge(props, {
    values: renderValues,
    defaultClassName: 'react-aria-Button'
  }));

  let buttonId = useId(() => {
    let id = buttonProps.id;
    return typeof id === 'string' ? id : undefined;
  });
  let progressId = useId();

  let ariaLabelledby = () => {
    let labelledby = buttonProps['aria-labelledby'];
    if (isPending()) {
      // aria-labelledby wins over aria-label
      // https://www.w3.org/TR/accname-1.2/#computation-steps
      if (labelledby) {
        labelledby = `${labelledby} ${progressId()}`;
      } else if (buttonProps['aria-label']) {
        labelledby = `${buttonId()} ${progressId()}`;
      }
    }
    return labelledby;
  };

  let wasPending: boolean | undefined;
  createEffect(
    () => ({pending: isPending(), focused: isFocused(), labelledby: ariaLabelledby(), id: buttonId()}),
    ({pending, focused, labelledby, id}) => {
      let message = {'aria-labelledby': labelledby || id};
      if (wasPending !== undefined && wasPending !== pending && focused) {
        announce(message, 'assertive');
      }
      wasPending = pending;
    }
  );

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'onClick');
  let buttonType = () => buttonProps.type === 'submit' && isPending() ? 'button' : buttonProps.type;
  let ariaDisabled = () => isPending() ? 'true' : buttonProps['aria-disabled'];

  return (
    <dom.button
      {...mergeProps(DOMProps, renderProps, buttonProps, focusProps, hoverProps)}
      // When the button is in a pending state, we want to stop implicit form submission (ie. when the user presses enter on a text input).
      // We do this by changing the button's type to button.
      type={buttonType()}
      id={buttonId()}
      ref={domRef}
      aria-labelledby={ariaLabelledby()}
      slot={props.slot || undefined}
      aria-disabled={ariaDisabled()}
      data-disabled={props.isDisabled ? 'true' : undefined}
      data-pressed={renderValues.isPressed ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-pending={isPending() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}>
      <ProgressBarContext value={{get id() { return progressId(); }}}>
        {renderProps.children}
      </ProgressBarContext>
    </dom.button>
  );
});

// Events to preserve when isPending is true (for tooltips and other overlays)
const PRESERVED_EVENT_PATTERN =
  /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;

function useDisableInteractions<T extends object>(props: T, isPending: () => boolean): T {
  // Keep the source event-preservation rule as a live view instead of mutating
  // a hook's shared prop bag when pending changes.
  return omit(props, key => isPending() && typeof key === 'string' &&
    (key === 'href' || key === 'target' || key.startsWith('on') && !PRESERVED_EVENT_PATTERN.test(key))) as T;
}
