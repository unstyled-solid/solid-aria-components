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
  AriaCheckboxGroupProps,
  useCheckboxGroup,
  useCheckboxGroupItem
} from 'react-aria/useCheckboxGroup';

import {AriaCheckboxProps, CheckboxAria, useCheckbox} from 'react-aria/useCheckbox';
import {CheckboxGroupState, useCheckboxGroupState} from 'react-stately/useCheckboxGroupState';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
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
import {HoverEvents} from '@react-types/shared';
import {LabelContext, type LabelProps} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {createContext, omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
type Ref<T> = JSX.Ref<T>;
import {TextContext, type TextProps} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {useToggleState} from 'react-stately/useToggleState';
import {VisuallyHidden} from 'react-aria/VisuallyHidden';

export interface CheckboxGroupProps
  extends
    Omit<
      AriaCheckboxGroupProps,
      | 'children'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<CheckboxGroupRenderProps, 'div'>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-CheckboxGroup'
   */
  className?: ClassNameOrFunction<CheckboxGroupRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export interface CheckboxProps
  extends
    Omit<AriaCheckboxProps, 'children' | 'validationState' | 'validationBehavior'>,
    HoverEvents,
    RACValidation,
    RenderProps<CheckboxRenderProps, 'label'>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLLabelElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Checkbox'
   */
  className?: ClassNameOrFunction<CheckboxRenderProps>;
  ref?: Ref<HTMLLabelElement>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
}

export interface CheckboxFieldProps
  extends
    Omit<AriaCheckboxProps, 'children' | 'validationState' | 'validationBehavior'>,
    RACValidation,
    RenderProps<CheckboxFieldRenderProps>,
    SlotProps,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-CheckboxField'
   */
  className?: ClassNameOrFunction<CheckboxFieldRenderProps>;
  ref?: Ref<HTMLDivElement>;
  /**
   * A ref for the HTML input element.
   */
  inputRef?: Ref<HTMLInputElement | null>;
}

export interface CheckboxButtonProps
  extends
    HoverEvents,
    RenderProps<CheckboxButtonRenderProps, 'label'>,
    SlotProps,
    GlobalDOMAttributes<HTMLLabelElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-CheckboxButton'
   */
  className?: ClassNameOrFunction<CheckboxButtonRenderProps>;
  ref?: Ref<HTMLLabelElement>;
}

export interface CheckboxGroupRenderProps {
  /**
   * Whether the checkbox group is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the checkbox group is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the checkbox group is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the checkbox group is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the checkbox group.
   */
  state: CheckboxGroupState;
}

export interface CheckboxRenderProps {
  /**
   * Whether the checkbox is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the checkbox is indeterminate.
   *
   * @selector [data-indeterminate]
   */
  isIndeterminate: boolean;
  /**
   * Whether the checkbox is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the checkbox is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the checkbox is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the checkbox is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the checkbox is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the checkbox is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the checkbox invalid.
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

export interface CheckboxFieldRenderProps {
  /**
   * Whether the checkbox is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the checkbox is indeterminate.
   *
   * @selector [data-indeterminate]
   */
  isIndeterminate: boolean;
  /**
   * Whether the checkbox is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the checkbox is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the checkbox invalid.
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

export interface CheckboxButtonRenderProps extends CheckboxRenderProps {}

export const CheckboxContext = createContext<ContextValue<CheckboxProps, HTMLLabelElement>>(null);
export const CheckboxFieldContext =
  createContext<ContextValue<CheckboxFieldProps, HTMLDivElement>>(null);
export const CheckboxGroupContext =
  createContext<ContextValue<CheckboxGroupProps, HTMLDivElement>>(null);
export const CheckboxGroupStateContext = createContext<CheckboxGroupState | null>(null);

/**
 * A checkbox group allows a user to select multiple items from a list of options.
 */
export function CheckboxGroup(originalProps: CheckboxGroupProps) {
  let [props, ref] = useContextProps(originalProps, undefined, CheckboxGroupContext);
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let state = useCheckboxGroupState(mergeProps(props, {get validationBehavior() { return validationBehavior(); }}));
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let groupAria = useCheckboxGroup(
      mergeProps(props, {
        get label() { return label(); },
        get validationBehavior() { return validationBehavior(); }
      }),
      state
    );
  let {groupProps, labelProps, descriptionProps, errorMessageProps} = groupAria;
  let validation = {
    get isInvalid() { return groupAria.isInvalid(); },
    get validationErrors() { return groupAria.validationErrors; },
    get validationDetails() { return groupAria.validationDetails; }
  };

  let renderProps = useRenderProps(mergeProps(props, {
    values: {
      get isDisabled() { return state.isDisabled; },
      get isReadOnly() { return state.isReadOnly; },
      get isRequired() { return props.isRequired || false; },
      get isInvalid() { return state.isInvalid; },
      state
    },
    defaultClassName: 'react-aria-CheckboxGroup'
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, groupProps)}
      {...{get ref() {return [originalProps.ref, ref];}}}
      slot={props.slot || undefined}
      data-readonly={state.isReadOnly ? 'true' : undefined}
      data-required={props.isRequired ? 'true' : undefined}
      data-invalid={state.isInvalid ? 'true' : undefined}
      data-disabled={props.isDisabled ? 'true' : undefined}>
      <Provider
        values={[
          [CheckboxGroupStateContext, state],
          [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef, elementType: 'span' as const})],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps as TextProps,
                errorMessage: errorMessageProps as TextProps
              }
            }
          ],
          [FieldErrorContext, validation]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
}

interface InternalCheckboxContextValue extends CheckboxAria {
  inputRef: ObjectRef<HTMLInputElement>;
  defaultClassName: string;
  isIndeterminate?: boolean;
  isRequired?: boolean;
}

const InternalCheckboxContext = createContext<InternalCheckboxContextValue | null>(null);

/**
 * A checkbox allows a user to select an item, with support for validation and help text.
 */
export function CheckboxField(originalProps: CheckboxFieldProps) {
  let contextInputProps: CheckboxFieldProps = omit(originalProps, 'inputRef');
  let [props, ref] = useContextProps(contextInputProps, undefined, CheckboxFieldContext);
  let groupState = useContext(CheckboxGroupStateContext);
  let [aria, inputRef] = useCheckboxAria(props, originalProps);
  let {descriptionProps, errorMessageProps} = aria;

  let renderProps = useRenderProps(mergeProps(props, {
    defaultClassName: 'react-aria-CheckboxField',
    values: {
      get isSelected() { return aria.isSelected(); },
      get isIndeterminate() { return props.isIndeterminate || false; },
      get isDisabled() { return aria.isDisabled(); },
      get isReadOnly() { return aria.isReadOnly(); },
      get isInvalid() { return aria.isInvalid(); },
      get isRequired() { return props.isRequired || false; }
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps)}
      {...{get ref() {return [originalProps.ref, ref];}}}
      slot={props.slot || undefined}
      data-selected={aria.isSelected() ? 'true' : undefined}
      data-indeterminate={props.isIndeterminate ? 'true' : undefined}
      data-disabled={aria.isDisabled() ? 'true' : undefined}
      data-readonly={aria.isReadOnly() ? 'true' : undefined}
      data-invalid={aria.isInvalid() ? 'true' : undefined}
      data-required={props.isRequired ? 'true' : undefined}>
      <Provider
        values={[
          [
            InternalCheckboxContext,
             mergeProps(aria, {
               inputRef,
              defaultClassName: 'react-aria-CheckboxButton',
               get isIndeterminate() { return props.isIndeterminate; },
               get isRequired() { return props.isRequired; }
             })
          ],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps as TextProps,
                errorMessage: errorMessageProps as TextProps
              }
            }
          ],
          // In a CheckboxGroup, validation is handled at the group level instead of repeated on each checkbox.
          [FieldErrorContext, groupState ? null : {
            get isInvalid() { return aria.isInvalid(); },
            get validationDetails() { return aria.validationDetails; },
            get validationErrors() { return aria.validationErrors; }
          }]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
}

function useCheckboxAria(
  props: CheckboxProps | CheckboxFieldProps,
  originalProps: CheckboxProps | CheckboxFieldProps
): [CheckboxAria, ObjectRef<HTMLInputElement>] {
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let groupState = useContext(CheckboxGroupStateContext);
  let inputRef = useObjectRef<HTMLInputElement>();
  useSyncRef({get ref() {return mergeRefs(originalProps.inputRef, props.inputRef);}}, inputRef);
  let checkboxProps = mergeProps(removeDataAttributes(props), {
    get children() { return typeof props.children === 'function' ? true : props.children; },
    get value() { return props.value!; },
    get validationBehavior() { return validationBehavior(); }
  });

  let aria = groupState
    ? // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
      useCheckboxGroupItem(checkboxProps, groupState, inputRef)
    : // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
      useCheckbox(checkboxProps, useToggleState(props), inputRef);
  return [aria, inputRef];
}

/**
 * A checkbox allows a user to select multiple items from a list of individual items, or
 * to mark one individual item as selected.
 *
 * @deprecated Use CheckboxField + CheckboxButton instead.
 */
export function Checkbox(originalProps: CheckboxProps) {
  let contextInputProps: CheckboxProps = omit(originalProps, 'inputRef');
  let [props, ref] = useContextProps(contextInputProps, undefined, CheckboxContext);
  let [aria, inputRef] = useCheckboxAria(props, originalProps);

  return (
    <InternalCheckboxContext
      value={mergeProps(aria, {
        inputRef,
        defaultClassName: 'react-aria-Checkbox',
        get isIndeterminate() { return props.isIndeterminate; },
        get isRequired() { return props.isRequired; }
      })}>
      <CheckboxButton {...props} {...{get ref() {return [originalProps.ref, ref];}}} />
    </InternalCheckboxContext>
  );
}

/**
 * A checkbox button is the clickable area of a checkbox, including the indicator and label.
 */
export function CheckboxButton(props: CheckboxButtonProps) {
  let aria = useContext(InternalCheckboxContext)!;
  let {labelProps, inputProps, defaultClassName} = aria;
  let {isFocused, isFocusVisible, focusProps} = useFocusRing();
  let isInteractionDisabled = () => aria.isDisabled() || aria.isReadOnly();

  let {hoverProps, isHovered} = useHover(mergeProps(props, {get isDisabled() { return isInteractionDisabled(); }}));

  let renderProps = useRenderProps(mergeProps(props, {
    defaultClassName,
    values: {
      get isSelected() { return aria.isSelected(); },
      get isIndeterminate() { return aria.isIndeterminate || false; },
      get isPressed() { return aria.isPressed(); },
      get isHovered() { return isHovered(); },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); },
      get isDisabled() { return aria.isDisabled(); },
      get isReadOnly() { return aria.isReadOnly(); },
      get isInvalid() { return aria.isInvalid(); },
      get isRequired() { return aria.isRequired || false; }
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id', 'onClick');

  return (
    <dom.label
      {...mergeProps(DOMProps, labelProps, hoverProps, renderProps)}
       {...{get ref() {return props.ref;}}}
      slot={props.slot || undefined}
      data-selected={aria.isSelected() ? 'true' : undefined}
      data-indeterminate={aria.isIndeterminate ? 'true' : undefined}
      data-pressed={aria.isPressed() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-disabled={aria.isDisabled() ? 'true' : undefined}
      data-readonly={aria.isReadOnly() ? 'true' : undefined}
      data-invalid={aria.isInvalid() ? 'true' : undefined}
      data-required={aria.isRequired ? 'true' : undefined}>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} {...{get ref() {return aria.inputRef;}}} />
      </VisuallyHidden>
      {renderProps.children}
    </dom.label>
  );
}
