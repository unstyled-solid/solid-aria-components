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

import type {JSX, ValidComponent} from '@solidjs/web';
import {merge, omit} from 'solid-js';
import {mergeProps} from '../utils/mergeProps';
type ElementType = ValidComponent;
type AnchorHTMLAttributes<T extends HTMLAnchorElement> = JSX.AnchorHTMLAttributes<T>;
type ButtonHTMLAttributes<T extends HTMLButtonElement> = JSX.ButtonHTMLAttributes<T>;
type HTMLAttributes<T extends Element> = JSX.HTMLAttributes<T>;
type InputHTMLAttributes<T extends HTMLInputElement> = JSX.InputHTMLAttributes<T>;
import {AriaLabelingProps, DOMAttributes, Key, Orientation, RefObject} from '@react-types/shared';
import {AriaToggleButtonProps, ToggleButtonAria, useToggleButton} from './useToggleButton';
import {ToggleGroupProps, ToggleGroupState} from 'react-stately/useToggleGroupState';
import {ToggleState} from 'react-stately/useToggleState';
import {useToolbar} from '../toolbar/useToolbar';

export interface AriaToggleButtonGroupProps extends ToggleGroupProps, AriaLabelingProps {
  /**
   * The orientation of the the toggle button group.
   *
   * @default 'horizontal'
   */
  orientation?: Orientation;
}

export interface ToggleButtonGroupAria {
  /**
   * Props for the toggle button group container.
   */
  groupProps: JSX.HTMLAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a toggle button group component.
 * Toggle button groups allow users to select one or more options from a group.
 *
 * @param props - Props for the toggle button group.
 * @param state - State for the toggle button group, as returned by `useToggleGroupState`.
 * @param ref - A ref to the toggle button group element.
 */
export function useToggleButtonGroup(
  props: AriaToggleButtonGroupProps,
  state: ToggleGroupState,
  ref: RefObject<HTMLElement | null>
): ToggleButtonGroupAria {
  let {toolbarProps} = useToolbar(props, ref);

  return {
    groupProps: mergeProps(toolbarProps, {
      get role() { return state.selectionMode === 'single' ? 'radiogroup' : toolbarProps.role; },
      get 'aria-disabled'() { return props.isDisabled === undefined ? undefined : (props.isDisabled ? 'true' : 'false'); }
    })
  };
}

export interface AriaToggleButtonGroupItemProps<E extends ElementType = 'button'> extends Omit<
  AriaToggleButtonProps<E>,
  'id' | 'isSelected' | 'defaultSelected' | 'onChange'
> {
  /** An identifier for the item in the `selectedKeys` of a ToggleButtonGroup. */
  id: Key;
}

export interface AriaToggleButtonGroupItemOptions<E extends ElementType> extends Omit<
  AriaToggleButtonGroupItemProps<E>,
  'children'
> {}

// Order with overrides is important: 'button' should be default
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<'button'>,
  state: ToggleGroupState,
  ref: RefObject<HTMLButtonElement | null>
): ToggleButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<'a'>,
  state: ToggleGroupState,
  ref: RefObject<HTMLAnchorElement | null>
): ToggleButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<'div'>,
  state: ToggleGroupState,
  ref: RefObject<HTMLDivElement | null>
): ToggleButtonAria<HTMLAttributes<HTMLDivElement>>;
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<'input'>,
  state: ToggleGroupState,
  ref: RefObject<HTMLInputElement | null>
): ToggleButtonAria<InputHTMLAttributes<HTMLInputElement>>;
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<'span'>,
  state: ToggleGroupState,
  ref: RefObject<HTMLSpanElement | null>
): ToggleButtonAria<HTMLAttributes<HTMLSpanElement>>;
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<ElementType>,
  state: ToggleGroupState,
  ref: RefObject<Element | null>
): ToggleButtonAria<DOMAttributes>;
/**
 * Provides the behavior and accessibility implementation for a toggle button component.
 * ToggleButtons allow users to toggle a selection on or off, for example switching between two
 * states or modes.
 */
export function useToggleButtonGroupItem(
  props: AriaToggleButtonGroupItemOptions<ElementType>,
  state: ToggleGroupState,
  ref: RefObject<any>
): ToggleButtonAria<HTMLAttributes<any>> {
  let toggleState: ToggleState = {
    get isSelected() { return state.selectedKeys.has(props.id); },
    defaultSelected: false,
    setSelected(isSelected) {
      state.setSelected(props.id, isSelected);
    },
    toggle() {
      state.toggleKey(props.id);
    }
  };

  let {isPressed, isSelected, isDisabled, buttonProps} = useToggleButton(
    merge(omit(props, 'id', 'isDisabled'), {
      id: undefined,
      get isDisabled() { return props.isDisabled || state.isDisabled; }
    }),
    toggleState,
    ref
  );

  return {
    isPressed,
    isSelected,
    isDisabled,
    buttonProps: merge(omit(buttonProps, 'role', 'aria-checked', 'aria-pressed'), {
      get role() { return state.selectionMode === 'single' ? 'radio' : buttonProps.role; },
      get 'aria-checked'() { return state.selectionMode === 'single' ? (toggleState.isSelected ? 'true' : 'false') : buttonProps['aria-checked']; },
      get 'aria-pressed'() { return state.selectionMode === 'single' ? undefined : buttonProps['aria-pressed']; }
    })
  };
}
