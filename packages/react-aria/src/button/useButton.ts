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

import type {JSX, ValidComponent} from '@solidjs/web';
import type {Accessor, Component} from 'solid-js';
import type {RefObject} from '@react-types/shared';
type ElementType = ValidComponent;
type HTMLAttributes<T extends Element> = JSX.HTMLAttributes<T>;
type ButtonHTMLAttributes<T extends HTMLButtonElement> = JSX.ButtonHTMLAttributes<T>;
type AnchorHTMLAttributes<T extends HTMLAnchorElement> = JSX.AnchorHTMLAttributes<T>;
type InputHTMLAttributes<T extends HTMLInputElement> = JSX.InputHTMLAttributes<T>;
import {
  AriaLabelingProps,
  DOMAttributes,
  FocusableDOMProps,
  FocusableProps,
  PressEvents
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {mergeProps} from '../utils/mergeProps';
import {useFocusable} from '../interactions/useFocusable';
import {usePress} from '../interactions/usePress';

export interface ButtonProps extends PressEvents, FocusableProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** The content to display in the button. */
  children?: JSX.Element;
}

export interface AriaBaseButtonProps extends FocusableDOMProps, AriaLabelingProps {
  /** Indicates whether the element is disabled to users of assistive technology. */
  'aria-disabled'?: boolean | 'true' | 'false';
  /**
   * Indicates whether the element, or another grouping element it controls, is currently expanded
   * or collapsed.
   */
  'aria-expanded'?: boolean | 'true' | 'false';
  /**
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that
   * can be triggered by an element.
   */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current
   * element.
   */
  'aria-controls'?: string;
  /** Indicates the current "pressed" state of toggle buttons. */
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
  /**
   * Indicates whether this element represents the current item within a container or set of related
   * elements.
   */
  'aria-current'?: boolean | 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time';
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Whether to prevent focus from moving to the button when pressing it.
   *
   * Caution, this can make the button inaccessible and should only be used when alternative
   * keyboard interaction is provided, such as ComboBox's MenuTrigger or a NumberField's
   * increment/decrement control.
   */
  preventFocusOnPress?: boolean;
  /**
   * The `<form>` element to associate the button with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#form).
   */
  form?: string;
  /**
   * The URL that processes the information submitted by the button.
   * Overrides the action attribute of the button's form owner.
   */
  formAction?: string;
  /** Indicates how to encode the form data that is submitted. */
  formEncType?: string;
  /** Indicates the HTTP method used to submit the form. */
  formMethod?: string;
  /** Indicates that the form is not to be validated when it is submitted. */
  formNoValidate?: boolean;
  /** Overrides the target attribute of the button's form owner. */
  formTarget?: string;
  /** Submitted as a pair with the button's value as part of the form data. */
  name?: string;
  /** The value associated with the button's name when it's submitted with the form data. */
  value?: string;
}

export interface AriaButtonElementTypeProps<T extends ElementType = 'button'> {
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'button'
   */
  elementType?: T | Component<any>;
}

export interface LinkButtonProps<
  T extends ElementType = 'button'
> extends AriaButtonElementTypeProps<T> {
  /** A URL to link to if elementType="a". */
  href?: string;
  /** The target window for the link. */
  target?: string;
  /**
   * The relationship between the linked resource and the current page. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).
   */
  rel?: string;
}

export interface AriaButtonProps<T extends ElementType = 'button'>
  extends ButtonProps, LinkButtonProps<T>, AriaBaseButtonProps {}

export interface AriaButtonOptions<E extends ElementType> extends Omit<
  AriaButtonProps<E>,
  'children'
> {}

export interface ButtonAria<T> {
  /** Props for the button element. */
  buttonProps: T;
  /** Whether the button is currently pressed. */
  isPressed: Accessor<boolean>;
}

// Order with overrides is important: 'button' should be default
export function useButton(
  props: AriaButtonOptions<'button'>,
  ref: RefObject<HTMLButtonElement | null>
): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
export function useButton(
  props: AriaButtonOptions<'a'>,
  ref: RefObject<HTMLAnchorElement | null>
): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
export function useButton(
  props: AriaButtonOptions<'div'>,
  ref: RefObject<HTMLDivElement | null>
): ButtonAria<HTMLAttributes<HTMLDivElement>>;
export function useButton(
  props: AriaButtonOptions<'input'>,
  ref: RefObject<HTMLInputElement | null>
): ButtonAria<InputHTMLAttributes<HTMLInputElement>>;
export function useButton(
  props: AriaButtonOptions<'span'>,
  ref: RefObject<HTMLSpanElement | null>
): ButtonAria<HTMLAttributes<HTMLSpanElement>>;
export function useButton(
  props: AriaButtonOptions<ElementType>,
  ref: RefObject<Element | null>
): ButtonAria<DOMAttributes>;
/**
 * Provides the behavior and accessibility implementation for a button component. Handles mouse,
 * keyboard, and touch interactions, focus behavior, and ARIA props for both native button elements
 * and custom element types.
 *
 * @param props - Props to be applied to the button.
 * @param ref - A ref to a DOM element for the button.
 */
export function useButton(
  props: AriaButtonOptions<ElementType>,
  ref: RefObject<any>
): ButtonAria<HTMLAttributes<any>> {
  let elementType = () => props.elementType ?? 'button';
  let additionalProps = {
    get role() { return elementType() === 'button' ? undefined : 'button'; },
    get type() { return elementType() === 'button' || elementType() === 'input' ? props.type ?? 'button' : undefined; },
    get disabled() { return elementType() === 'button' || elementType() === 'input' ? props.isDisabled : undefined; },
    get href() { return elementType() === 'a' && !props.isDisabled ? props.href : undefined; },
    get target() { return elementType() === 'a' ? props.target : undefined; },
    get rel() { return elementType() === 'a' ? props.rel : undefined; },
    get 'aria-disabled'() { return !props.isDisabled || elementType() === 'button' || elementType() === 'input' ? undefined : props.isDisabled; },
    get form() { return elementType() === 'button' ? props.form : undefined; },
    get formAction() { return elementType() === 'button' ? props.formAction : undefined; },
    get formEncType() { return elementType() === 'button' ? props.formEncType : undefined; },
    get formMethod() { return elementType() === 'button' ? props.formMethod : undefined; },
    get formNoValidate() { return elementType() === 'button' ? props.formNoValidate : undefined; },
    get formTarget() { return elementType() === 'button' ? props.formTarget : undefined; },
    get name() { return elementType() === 'button' ? props.name : undefined; },
    get value() { return elementType() === 'button' ? props.value : undefined; }
  };

  let {pressProps, isPressed} = usePress({
    get onPressStart() { return props.onPressStart; },
    get onPressEnd() { return props.onPressEnd; },
    get onPressChange() { return props.onPressChange; },
    get onPress() { return props.onPress; },
    get onPressUp() { return props.onPressUp; },
    get onClick() { return props.onClick; },
    get isDisabled() { return props.isDisabled; },
    get preventFocusOnPress() { return props.preventFocusOnPress; },
    ref
  });

  let {focusableProps} = useFocusable(props, ref);
  let focusProps = mergeProps(focusableProps, {
    get tabIndex() {
      return (props as AriaButtonOptions<ElementType> & {allowFocusWhenDisabled?: boolean}).allowFocusWhenDisabled && props.isDisabled
        ? -1 : focusableProps.tabIndex;
    }
  });
  let buttonProps = mergeProps(
    focusProps,
    pressProps,
    filterDOMProps(props, {labelable: true})
  );

  return {
    isPressed, // Used to indicate press state for visual
    buttonProps: mergeProps(additionalProps, buttonProps, {
      get 'aria-haspopup'() { return props['aria-haspopup']; },
      get 'aria-expanded'() { return props['aria-expanded']; },
      get 'aria-controls'() { return props['aria-controls']; },
      get 'aria-pressed'() { return props['aria-pressed']; },
      get 'aria-current'() { return props['aria-current']; },
      get 'aria-disabled'() { return props['aria-disabled']; }
    })
  };
}
