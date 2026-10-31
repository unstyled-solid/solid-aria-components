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

import {AriaSwitchProps, SwitchAria, useSwitch} from 'react-aria/useSwitch';

import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RACValidation,
  removeDataAttributes,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlottedContext
} from './utils';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes, RefObject} from '@react-types/shared';
import {HoverEvents} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, useContext, type Ref as ForwardedRef} from 'solid-js';
import {attachRef, useObjectRef, type ObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {TextContext, type TextProps} from './Text';
import {ToggleState, useToggleState} from 'react-stately/useToggleState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {VisuallyHidden} from 'react-aria/VisuallyHidden';

export interface SwitchProps
  extends
    Omit<
      AriaSwitchProps,
      | 'children'
      | 'validationState'
      | 'validationBehavior'
      | 'isRequired'
      | 'isInvalid'
      | 'validate'
    >,
    HoverEvents,
    RenderProps<SwitchRenderProps, 'label'>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLLabelElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Switch'
   */
  className?: ClassNameOrFunction<SwitchRenderProps>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
  ref?: Ref<HTMLLabelElement>;
}

export interface SwitchFieldProps
  extends
    Omit<AriaSwitchProps, 'children' | 'validationState' | 'validationBehavior'>,
    RACValidation,
    RenderProps<SwitchFieldRenderProps>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SwitchField'
   */
  className?: ClassNameOrFunction<SwitchFieldRenderProps>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
  ref?: Ref<HTMLDivElement>;
}

export interface SwitchButtonProps
  extends
    HoverEvents,
    RenderProps<SwitchButtonRenderProps, 'label'>,
    SlotProps,
    GlobalDOMAttributes<HTMLLabelElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SwitchButton'
   */
  className?: ClassNameOrFunction<SwitchButtonRenderProps>;
  ref?: Ref<HTMLLabelElement>;
}

export interface SwitchRenderProps {
  /**
   * Whether the switch is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the switch is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the switch is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the switch is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the switch is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the switch is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the switch is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * State of the switch.
   */
  state: ToggleState;
}

export interface SwitchFieldRenderProps {
  /**
   * Whether the switch is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the switch is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the switch is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the switch invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the switch is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * State of the switch.
   */
  state: ToggleState;
}

export interface SwitchButtonRenderProps extends SwitchRenderProps {
  /**
   * Whether the switch invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the switch is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * State of the switch.
   */
  state: ToggleState;
}

export const SwitchContext = createContext<ContextValue<SwitchProps, HTMLLabelElement>>(null);
export const SwitchFieldContext =
  createContext<ContextValue<SwitchFieldProps, HTMLDivElement>>(null);
export const ToggleStateContext = createContext<ToggleState | null>(null);

/**
 * A switch allows a user to turn a setting on or off.
 *
 * @deprecated Use SwitchField + SwitchButton instead.
 */
export function Switch(userProps: SwitchProps) {
  let [props, ref] = useContextProps<SwitchProps, SwitchProps, HTMLLabelElement>(omit(userProps, 'inputRef', 'ref'), userProps.ref as ForwardedRef<HTMLLabelElement>, SwitchContext);
  let inputRef = useObjectRef<HTMLInputElement>([
    node => attachRef(userProps.inputRef, node),
    node => attachRef(props.inputRef, node)
  ]);
  let state = useToggleState(props);
  let aria = useSwitch(
    merge(removeDataAttributes(omit(props, 'children')), {
      // ReactNode type doesn't allow function children.
      get children() {return typeof props.children === 'function' ? true : props.children;}
    }),
    state,
    inputRef
  );

  return (
    <ToggleStateContext value={state}>
      <InternalSwitchContext value={merge(aria, {inputRef, defaultClassName: 'react-aria-Switch'})}>
        <SwitchButton {...props} ref={ref as Ref<HTMLLabelElement>} />
      </InternalSwitchContext>
    </ToggleStateContext>
  );
}

interface InternalSwitchContextValue extends SwitchAria {
  inputRef: ObjectRef<HTMLInputElement>;
  defaultClassName: string;
  isRequired?: boolean;
}

const InternalSwitchContext = createContext<InternalSwitchContextValue | null>(null);

/**
 * A switch allows a user to turn a setting on or off, with support for validation and help text.
 */
export function SwitchField(userProps: SwitchFieldProps) {
  let [props, ref] = useContextProps<SwitchFieldProps, SwitchFieldProps, HTMLDivElement>(omit(userProps, 'inputRef', 'ref'), userProps.ref as ForwardedRef<HTMLDivElement>, SwitchFieldContext);
  let form = useSlottedContext(FormContext);
  let inputRef = useObjectRef<HTMLInputElement>([
    node => attachRef(userProps.inputRef, node),
    node => attachRef(props.inputRef, node)
  ]);
  let state = useToggleState(props);
  let aria = useSwitch(
    merge(removeDataAttributes(omit(props, 'children')), {
      // ReactNode type doesn't allow function children.
      get children() {return typeof props.children === 'function' ? true : props.children;},
      get validationBehavior() {return props.validationBehavior ?? form?.validationBehavior ?? 'native';}
    }),
    state,
    inputRef
  );
  let {
    descriptionProps,
    errorMessageProps,
  } = aria;

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-SwitchField',
    values: {
      get isSelected() {return aria.isSelected();},
      get isDisabled() {return aria.isDisabled();},
      get isReadOnly() {return aria.isReadOnly();},
      get isInvalid() {return aria.isInvalid();},
      get isRequired() {return props.isRequired || false;},
      state
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps)}
      ref={ref}
      slot={props.slot || undefined}
      data-selected={aria.isSelected() ? 'true' : undefined}
      data-disabled={aria.isDisabled() ? 'true' : undefined}
      data-readonly={aria.isReadOnly() ? 'true' : undefined}
      data-invalid={aria.isInvalid() ? 'true' : undefined}
      data-required={props.isRequired ? 'true' : undefined}>
      <ToggleStateContext value={state}>
        <InternalSwitchContext value={merge(aria, {inputRef, defaultClassName: 'react-aria-SwitchButton', get isRequired() {return props.isRequired;}})}>
          <TextContext value={{slots: {description: descriptionProps as TextProps, errorMessage: errorMessageProps as TextProps}}}>
            <FieldErrorContext value={{get isInvalid() {return aria.isInvalid();}, get validationDetails() {return aria.validationDetails;}, get validationErrors() {return aria.validationErrors;}}}>
              {renderProps.children}
            </FieldErrorContext>
          </TextContext>
        </InternalSwitchContext>
      </ToggleStateContext>
    </dom.div>
  );
}

/**
 * A switch button is the clickable area of a switch, including the indicator and label.
 */
export function SwitchButton(props: SwitchButtonProps) {
  let ref = useObjectRef<HTMLLabelElement>(props.ref);
  let {
    labelProps,
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed,
    isInvalid,
    inputRef,
    defaultClassName,
  } = useContext(InternalSwitchContext)!;
  let context = useContext(InternalSwitchContext)!;
  let {isFocused, isFocusVisible, focusProps} = useFocusRing();
  let isInteractionDisabled = () => isDisabled() || isReadOnly();
  let state = useContext(ToggleStateContext)!;

  let {hoverProps, isHovered} = useHover(merge(props, {
    get isDisabled() {return isInteractionDisabled();}
  }));

  let renderProps = useRenderProps(merge(props, {
    defaultClassName,
    values: {
      get isSelected() {return isSelected();},
      get isPressed() {return isPressed();},
      get isHovered() {return isHovered();},
      get isFocused() {return isFocused();},
      get isFocusVisible() {return isFocusVisible();},
      get isDisabled() {return isDisabled();},
      get isReadOnly() {return isReadOnly();},
      get isInvalid() {return isInvalid();},
      get isRequired() {return context.isRequired || false;},
      state
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.label
      {...mergeProps(DOMProps, labelProps, hoverProps, renderProps)}
      ref={ref}
      slot={props.slot || undefined}
      data-selected={isSelected() ? 'true' : undefined}
      data-pressed={isPressed() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-disabled={isDisabled() ? 'true' : undefined}
      data-readonly={isReadOnly() ? 'true' : undefined}
      data-invalid={isInvalid() ? 'true' : undefined}
      data-required={context.isRequired ? 'true' : undefined}>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={inputRef} />
      </VisuallyHidden>
      {renderProps.children}
    </dom.label>
  );
}
