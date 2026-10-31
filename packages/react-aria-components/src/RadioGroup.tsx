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

import {
  AriaRadioGroupProps,
  AriaRadioProps,
  RadioAria,
  useRadio,
  useRadioGroup
} from 'react-aria/useRadioGroup';
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
  useSlot,
  useSlottedContext
} from './utils';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes} from '@react-types/shared';
import {HoverEvents, Orientation} from '@react-types/shared';
import {LabelContext, type LabelProps} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {RadioGroupState, useRadioGroupState} from 'react-stately/useRadioGroupState';
import {createContext, merge, omit, useContext} from 'solid-js';
import {SelectionIndicatorContext} from './SelectionIndicator';
import {SharedElementTransition} from './SharedElementTransition';
import {TextContext, type TextProps} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useObjectRef, type ObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {mergeRefs} from 'react-aria/mergeRefs';
import {VisuallyHidden} from 'react-aria/VisuallyHidden';

export interface RadioGroupProps
  extends
    Omit<
      AriaRadioGroupProps,
      | 'children'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<RadioGroupRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-RadioGroup'
   */
  className?: ClassNameOrFunction<RadioGroupRenderProps>;
  ref?: Ref<HTMLDivElement>;
}
export interface RadioProps
  extends
    Omit<AriaRadioProps, 'children'>,
    HoverEvents,
    RenderProps<RadioRenderProps, 'label'>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLLabelElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Radio'
   */
  className?: ClassNameOrFunction<RadioRenderProps>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
  ref?: Ref<HTMLLabelElement>;
}

export interface RadioFieldProps
  extends
    Omit<AriaRadioProps, 'children'>,
    RenderProps<RadioFieldRenderProps>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-RadioField'
   */
  className?: ClassNameOrFunction<RadioFieldRenderProps>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
  ref?: Ref<HTMLDivElement>;
}

export interface RadioButtonProps
  extends
    HoverEvents,
    RenderProps<RadioButtonRenderProps, 'label'>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLLabelElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-RadioButton'
   */
  className?: ClassNameOrFunction<RadioButtonRenderProps>;
  ref?: Ref<HTMLLabelElement>;
}

export interface RadioGroupRenderProps {
  /**
   * The orientation of the radio group.
   *
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
  /**
   * Whether the radio group is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the radio group is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the radio group is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the radio group is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the radio group.
   */
  state: RadioGroupState;
}

export interface RadioRenderProps {
  /**
   * Whether the radio is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the radio is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the radio is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the radio is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the radio is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the radio is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the radio is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the radio is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the checkbox is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
}

export interface RadioFieldRenderProps {
  /**
   * Whether the radio is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the radio is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the radio is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the radio is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the checkbox is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
}

export interface RadioButtonRenderProps extends RadioRenderProps {}

export const RadioGroupContext = createContext<ContextValue<RadioGroupProps, HTMLDivElement>>(null);
export const RadioContext =
  createContext<ContextValue<Partial<RadioProps>, HTMLLabelElement>>(null);
export const RadioFieldContext =
  createContext<ContextValue<Partial<RadioFieldProps>, HTMLDivElement>>(null);
export const RadioGroupStateContext = createContext<RadioGroupState | null>(null);

/**
 * A radio group allows a user to select a single item from a list of mutually exclusive options.
 */
export function RadioGroup(userProps: RadioGroupProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(userProps, localRef);
  let [props, ref] = useContextProps(userProps, localRef, RadioGroupContext);
  let domRef = useObjectRef<HTMLDivElement>(mergeRefs(ref));
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let state = useRadioGroupState(merge(props, {get validationBehavior() {return validationBehavior();}}));

  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria =
    useRadioGroup(
      merge(props, {get label() {return label();}, get validationBehavior() {return validationBehavior();}}),
      state
    );

  let {radioGroupProps, labelProps, descriptionProps, errorMessageProps} = aria;
  let renderProps = useRenderProps(merge(props, {
    values: {
      get orientation() {return props.orientation || 'vertical';},
      get isDisabled() {return state.isDisabled;},
      get isReadOnly() {return state.isReadOnly;},
      get isRequired() {return state.isRequired;},
      get isInvalid() {return state.isInvalid;},
      state
    },
    defaultClassName: 'react-aria-RadioGroup'
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, radioGroupProps)}
      ref={domRef}
      slot={props.slot || undefined}
      data-orientation={props.orientation || 'vertical'}
      data-invalid={state.isInvalid ? 'true' : undefined}
      data-disabled={state.isDisabled ? 'true' : undefined}
      data-readonly={state.isReadOnly ? 'true' : undefined}
      data-required={state.isRequired ? 'true' : undefined}>
      <RadioGroupStateContext value={state}>
        <LabelContext value={mergeProps(labelProps as LabelProps, {ref: labelRef, elementType: 'span' as const})}>
          <TextContext value={{slots: {description: descriptionProps as TextProps, errorMessage: errorMessageProps as TextProps}}}>
            <FieldErrorContext value={{get isInvalid() {return aria.isInvalid();}, get validationErrors() {return aria.validationErrors;}, get validationDetails() {return aria.validationDetails;}}}>
              <SharedElementTransition>{renderProps.children}</SharedElementTransition>
            </FieldErrorContext>
          </TextContext>
        </LabelContext>
      </RadioGroupStateContext>
    </dom.div>
  );
}

/**
 * A radio represents an individual option within a radio group.
 *
 * @deprecated Use RadioField + RadioButton instead.
 */
export function Radio(userProps: RadioProps) {
  let localRef = useObjectRef<HTMLLabelElement>();
  useSyncRef(userProps, localRef);
  let [props, ref] = useContextProps<RadioProps, Partial<RadioProps>, HTMLLabelElement>(omit(userProps, 'inputRef', 'ref'), localRef, RadioContext);
  let state = useContext(RadioGroupStateContext)!;
  let inputRef = useObjectRef<HTMLInputElement>();
  useSyncRef({get ref() {return [userProps.inputRef, props.inputRef];}}, inputRef);
  let aria = useRadio(
    merge(removeDataAttributes(omit(props, 'children')), {
      // ReactNode type doesn't allow function children.
      get children() {return typeof props.children === 'function' ? true : props.children;}
    }),
    state,
    inputRef
  );

  return (
    <InternalRadioContext value={merge(aria, {inputRef, defaultClassName: 'react-aria-Radio'})}>
      <RadioButton {...props} ref={mergeRefs(ref)} />
    </InternalRadioContext>
  );
}

interface InternalRadioContextValue extends RadioAria {
  inputRef: ObjectRef<HTMLInputElement>;
  defaultClassName: string;
}

const InternalRadioContext = createContext<InternalRadioContextValue | null>(null);

/**
 * A RadioField represents an individual option within a radio group, containing a RadioButton and
 * optional description.
 */
export function RadioField(userProps: RadioFieldProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(userProps, localRef);
  let [props, ref] = useContextProps<RadioFieldProps, Partial<RadioFieldProps>, HTMLDivElement>(omit(userProps, 'inputRef', 'ref'), localRef, RadioFieldContext);
  let domRef = useObjectRef<HTMLDivElement>(mergeRefs(ref));
  let state = useContext(RadioGroupStateContext)!;
  let inputRef = useObjectRef<HTMLInputElement>();
  useSyncRef({get ref() {return [userProps.inputRef, props.inputRef];}}, inputRef);
  let aria = useRadio(
    merge(removeDataAttributes(omit(props, 'children')), {
      // ReactNode type doesn't allow function children.
      get children() {return typeof props.children === 'function' ? true : props.children;}
    }),
    state,
    inputRef
  );
  let {descriptionProps, isSelected, isDisabled} = aria;

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-RadioField',
    values: {
      get isSelected() {return isSelected();},
      get isDisabled() {return isDisabled();},
      get isReadOnly() {return state.isReadOnly;},
      get isInvalid() {return state.isInvalid;},
      get isRequired() {return state.isRequired;}
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps)}
      ref={domRef}
      data-selected={isSelected() ? 'true' : undefined}
      data-disabled={isDisabled() ? 'true' : undefined}
      data-readonly={state.isReadOnly ? 'true' : undefined}
      data-invalid={state.isInvalid ? 'true' : undefined}
      data-required={state.isRequired ? 'true' : undefined}>
      <SelectionIndicatorContext value={{get isSelected() {return isSelected();}}}>
        <InternalRadioContext value={merge(aria, {inputRef, defaultClassName: 'react-aria-RadioButton'})}>
          <TextContext value={{slots: {description: descriptionProps as TextProps}}}>
            {renderProps.children}
          </TextContext>
        </InternalRadioContext>
      </SelectionIndicatorContext>
    </dom.div>
  );
}

/**
 * A RadioButton is the clickable area of a radio, including the indicator and label.
 */
export function RadioButton(props: RadioButtonProps) {
  let ref = useObjectRef<HTMLLabelElement>();
  useSyncRef(props, ref);
  let {labelProps, inputProps, isSelected, isDisabled, isPressed, defaultClassName, inputRef} =
    useContext(InternalRadioContext)!;
  let state = useContext(RadioGroupStateContext)!;
  let {isFocused, isFocusVisible, focusProps} = useFocusRing();
  let interactionDisabled = () => isDisabled() || state.isReadOnly;

  let {hoverProps, isHovered} = useHover(merge(props, {get isDisabled() {return interactionDisabled();}}));

  let renderProps = useRenderProps(merge(props, {
    defaultClassName,
    values: {
      get isSelected() {return isSelected();},
      get isPressed() {return isPressed();},
      get isHovered() {return isHovered();},
      get isFocused() {return isFocused();},
      get isFocusVisible() {return isFocusVisible();},
      get isDisabled() {return isDisabled();},
      get isReadOnly() {return state.isReadOnly;},
      get isInvalid() {return state.isInvalid;},
      get isRequired() {return state.isRequired;}
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.label
      {...mergeProps(DOMProps, labelProps, hoverProps, renderProps)}
      ref={ref}
      data-selected={isSelected() ? 'true' : undefined}
      data-pressed={isPressed() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-disabled={isDisabled() ? 'true' : undefined}
      data-readonly={state.isReadOnly ? 'true' : undefined}
      data-invalid={state.isInvalid ? 'true' : undefined}
      data-required={state.isRequired ? 'true' : undefined}>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={inputRef} />
      </VisuallyHidden>
      {renderProps.children}
    </dom.label>
  );
}
