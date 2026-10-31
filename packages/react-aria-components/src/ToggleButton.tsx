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

import {AriaToggleButtonProps, useToggleButton} from 'react-aria/useToggleButton';

import {ButtonRenderProps} from './Button';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes, Key} from '@react-types/shared';
import {HoverEvents} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, untrack, useContext, type Ref as NativeRef} from 'solid-js';
import {SelectionIndicatorContext} from './SelectionIndicatorContext';
import {ToggleGroupStateContext} from './ToggleGroupStateContext';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {ToggleState, useToggleState} from 'react-stately/useToggleState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useToggleButtonGroupItem} from 'react-aria/useToggleButtonGroup';

export interface ToggleButtonRenderProps extends Omit<ButtonRenderProps, 'isPending'> {
  /**
   * Whether the button is currently selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * State of the toggle button.
   */
  state: ToggleState;
}

export interface ToggleButtonProps
  extends
    Omit<AriaToggleButtonProps, 'children' | 'elementType' | 'id'>,
    HoverEvents,
    SlotProps,
    RenderProps<ToggleButtonRenderProps, 'button'>,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ToggleButton'
   */
  className?: ClassNameOrFunction<ToggleButtonRenderProps>;
  /**
   * When used in a ToggleButtonGroup, an identifier for the item in `selectedKeys`. When used
   * standalone, a DOM id.
   */
  id?: Key;
  ref?: NativeRef<HTMLButtonElement>;
}

export const ToggleButtonContext = createContext<
  ContextValue<ToggleButtonProps, HTMLButtonElement>
>({});

/**
 * A toggle button allows a user to toggle a selection on or off, for example switching between two
 * states or modes.
 */
export function ToggleButton(props: ToggleButtonProps) {
  let ref = props.ref;
  [props, ref] = useContextProps(props, ref, ToggleButtonContext);
  let groupState = useContext(ToggleGroupStateContext);
  let domRef = useObjectRef<HTMLButtonElement>(ref as Ref<HTMLButtonElement>);
  let isGroupItem = !!groupState && untrack(() => props.id != null);
  let state = useToggleState(
    isGroupItem
      ? {
          get isSelected() { return props.id != null && groupState!.selectedKeys.has(props.id); },
          onChange(isSelected) {
            groupState!.setSelected(props.id!, isSelected);
          }
        }
      : props
  );

  let {buttonProps, isPressed, isSelected, isDisabled} =
    isGroupItem
      ? // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
        useToggleButtonGroupItem(merge(props, {get id() { return props.id!; }}), groupState!, domRef)
      : // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
        useToggleButton(
          merge(omit(props, 'id'), {get id() { return props.id != null ? String(props.id) : undefined; }}),
          state,
          domRef
        );

  let {focusProps, isFocused, isFocusVisible} = useFocusRing(props);
  let {hoverProps, isHovered} = useHover(merge(props, {get isDisabled() { return isDisabled(); }}));
  let renderProps = useRenderProps(merge(omit(props, 'id'), {
    id: undefined,
    values: {
      get isHovered() { return isHovered(); },
      get isPressed() { return isPressed(); },
      get isFocused() { return isFocused(); },
      get isSelected() { return state.isSelected; },
      get isFocusVisible() { return isFocusVisible(); },
      get isDisabled() { return isDisabled(); },
      state
    },
    defaultClassName: 'react-aria-ToggleButton'
  }));

  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');

  return (
    <dom.button
      {...mergeProps(DOMProps, renderProps, buttonProps, focusProps, hoverProps)}
      ref={domRef}
      slot={props.slot || undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-disabled={isDisabled() ? 'true' : undefined}
      data-pressed={isPressed() ? 'true' : undefined}
      data-selected={isSelected() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}>
      <SelectionIndicatorContext value={{get isSelected() { return isSelected(); }}}>
        {renderProps.children}
      </SelectionIndicatorContext>
    </dom.button>
  );
}
