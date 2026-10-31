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
import {AriaDatePickerProps, useDatePicker} from 'react-aria/useDatePicker';
import {AriaDateRangePickerProps, useDateRangePicker} from 'react-aria/useDateRangePicker';
import {ButtonContext} from './Button';
import {CalendarContext, RangeCalendarContext} from './Calendar';
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
import {DateFieldContext} from './DateField';
import {
  DatePickerState,
  DatePickerStateOptions,
  DateValue,
  useDatePickerState
} from 'react-stately/useDatePickerState';
import {
  DateRangePickerState,
  DateRangePickerStateOptions,
  useDateRangePickerState
} from 'react-stately/useDateRangePickerState';
import {DialogContext, OverlayTriggerStateContext} from './Dialog';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes} from '@react-types/shared';
import {GroupContext, type GroupProps} from './Group';
import {HiddenDateInput} from './HiddenDateInput';
import {LabelContext, type LabelProps} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {PopoverContext} from './Popover';
import {createContext, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {attachRef, useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import {TextContext, type TextProps} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';

export interface DatePickerRenderProps {
  /**
   * Whether an element within the date picker is focused, either via a mouse or keyboard.
   *
   * @selector [data-focus-within]
   */
  isFocusWithin: boolean;
  /**
   * Whether an element within the date picker is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the date picker is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the date picker is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the date picker is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the date picker is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the date picker's popover is currently open.
   *
   * @selector [data-open]
   */
  isOpen: boolean;
  /**
   * State of the date picker.
   */
  state: DatePickerState;
}
export interface DateRangePickerRenderProps extends Omit<DatePickerRenderProps, 'state'> {
  /**
   * State of the date range picker.
   */
  state: DateRangePickerState;
}

export interface DatePickerProps<T extends DateValue>
  extends
    Omit<
      AriaDatePickerProps<T>,
      'label' | 'description' | 'errorMessage' | 'validationState' | 'validationBehavior'
    >,
    Pick<DatePickerStateOptions<T>, 'shouldCloseOnSelect'>,
    RACValidation,
    RenderProps<DatePickerRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DatePicker'
   */
  className?: ClassNameOrFunction<DatePickerRenderProps>;
  ref?: JSX.Ref<HTMLDivElement>;
}
export interface DateRangePickerProps<T extends DateValue>
  extends
    Omit<
      AriaDateRangePickerProps<T>,
      'label' | 'description' | 'errorMessage' | 'validationState' | 'validationBehavior'
    >,
    Pick<DateRangePickerStateOptions<T>, 'shouldCloseOnSelect'>,
    RACValidation,
    RenderProps<DateRangePickerRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DateRangePicker'
   */
  className?: ClassNameOrFunction<DateRangePickerRenderProps>;
  ref?: JSX.Ref<HTMLDivElement>;
}

export const DatePickerContext =
  createContext<ContextValue<DatePickerProps<any>, HTMLDivElement>>(null);
export const DateRangePickerContext =
  createContext<ContextValue<DateRangePickerProps<any>, HTMLDivElement>>(null);
export const DatePickerStateContext = createContext<DatePickerState | null>(null);
export const DateRangePickerStateContext = createContext<DateRangePickerState | null>(null);

// Contexts to clear inside the popover.
const CLEAR_CONTEXTS = [GroupContext, ButtonContext, LabelContext, TextContext];

/**
 * A date picker combines a DateField and a Calendar popover to allow users to enter or select a
 * date and time value.
 */
export function DatePicker<
  T extends DateValue
>(input: DatePickerProps<T>) {
  let [props, ref] = useContextProps(input,
    element => attachRef(input.ref as ObjectRefInput<HTMLDivElement>, element), DatePickerContext);
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let state = useDatePickerState(mergeProps(props, {
    get validationBehavior() { return validationBehavior(); }
  }));

  let groupRef = useObjectRef<HTMLDivElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria = useDatePicker(
    mergeProps(removeDataAttributes(props), {
      get label() { return label(); },
      get validationBehavior() { return validationBehavior(); }
    }),
    state,
    groupRef
  );
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps
  } = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  let {focusProps, isFocused, isFocusVisible} = useFocusRing({within: true});
  let renderProps = useRenderProps({
    get className() { return props.className; },
    get style() { return props.style; },
    get render() { return props.render; },
    get children() {
      let children = input.children;
      return children !== undefined ? children : props.children;
    },
    values: {
      state,
      get isFocusWithin() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); },
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return state.isInvalid; },
      get isOpen() { return state.isOpen; },
      get isReadOnly() { return props.isReadOnly || false; },
      get isRequired() { return props.isRequired || false; }
    },
    defaultClassName: 'react-aria-DatePicker'
  });

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <Provider
      values={[
        [DatePickerStateContext, state],
        [GroupContext, mergeProps(groupProps as GroupProps, {ref: groupRef, get isInvalid() { return state.isInvalid; }})],
        [DateFieldContext, fieldProps],
        [ButtonContext, mergeProps(buttonProps, {get isPressed() { return state.isOpen; }})],
        [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef, elementType: 'span' as const})],
        [CalendarContext, calendarProps as any],
        [OverlayTriggerStateContext, state],
        [
          PopoverContext,
          {
            trigger: 'DatePicker',
            triggerRef: groupRef,
            placement: 'bottom start',
            clearContexts: CLEAR_CONTEXTS
          }
        ],
        [DialogContext, dialogProps],
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
      <dom.div
        {...mergeProps(DOMProps, renderProps, focusProps)}
        ref={ref}
        slot={props.slot || undefined}
        data-focus-within={isFocused() || undefined}
        data-invalid={state.isInvalid || undefined}
        data-focus-visible={isFocusVisible() || undefined}
        data-disabled={props.isDisabled || undefined}
        data-readonly={props.isReadOnly || undefined}
        data-required={props.isRequired || undefined}
        data-open={state.isOpen || undefined}
      />
      <HiddenDateInput
        autoComplete={props.autoComplete}
        name={props.name}
        isDisabled={props.isDisabled}
        state={state}
      />
    </Provider>
  );
}

/**
 * A date range picker combines two DateFields and a RangeCalendar popover to allow
 * users to enter or select a date and time range.
 */
export function DateRangePicker<T extends DateValue>(
    input: DateRangePickerProps<T>
  ) {
    let [props, ref] = useContextProps(input,
      element => attachRef(input.ref as ObjectRefInput<HTMLDivElement>, element), DateRangePickerContext);
    let form = useSlottedContext(FormContext);
    let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
    let state = useDateRangePickerState(mergeProps(props, {
      get validationBehavior() { return validationBehavior(); }
    }));

    let groupRef = useObjectRef<HTMLDivElement>();
    let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
    let aria = useDateRangePicker(
      mergeProps(removeDataAttributes(props), {
        get label() { return label(); },
        get validationBehavior() { return validationBehavior(); }
      }),
      state,
      groupRef
    );
    let {
      groupProps,
      labelProps,
      startFieldProps,
      endFieldProps,
      buttonProps,
      dialogProps,
      calendarProps,
      descriptionProps,
      errorMessageProps
    } = aria;
    let validation = {
      get isInvalid() { return aria.isInvalid(); },
      get validationErrors() { return aria.validationErrors(); },
      get validationDetails() { return aria.validationDetails(); }
    };

    let {focusProps, isFocused, isFocusVisible} = useFocusRing({within: true});
    let renderProps = useRenderProps({
      get className() { return props.className; },
      get style() { return props.style; },
      get render() { return props.render; },
      get children() {
        let children = input.children;
        return children !== undefined ? children : props.children;
      },
      values: {
        state,
        get isFocusWithin() { return isFocused(); },
        get isFocusVisible() { return isFocusVisible(); },
        get isDisabled() { return props.isDisabled || false; },
        get isInvalid() { return state.isInvalid; },
        get isOpen() { return state.isOpen; },
        get isReadOnly() { return props.isReadOnly || false; },
        get isRequired() { return props.isRequired || false; }
      },
      defaultClassName: 'react-aria-DateRangePicker'
    });

    let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

    return (
      <Provider
        values={[
          [DateRangePickerStateContext, state],
          [GroupContext, mergeProps(groupProps as GroupProps, {ref: groupRef, get isInvalid() { return state.isInvalid; }})],
          [ButtonContext, mergeProps(buttonProps, {get isPressed() { return state.isOpen; }})],
          [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef, elementType: 'span' as const})],
          [RangeCalendarContext, calendarProps],
          [OverlayTriggerStateContext, state],
          [
            PopoverContext,
            {
              trigger: 'DateRangePicker',
              triggerRef: groupRef,
              placement: 'bottom start',
              clearContexts: CLEAR_CONTEXTS
            }
          ],
          [DialogContext, dialogProps],
          [
            DateFieldContext,
            {
              slots: {
                start: startFieldProps,
                end: endFieldProps
              }
            }
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
          [FieldErrorContext, validation]
        ]}>
        <dom.div
          {...mergeProps(DOMProps, renderProps, focusProps)}
          ref={ref}
          slot={props.slot || undefined}
          data-focus-within={isFocused() || undefined}
          data-invalid={state.isInvalid || undefined}
          data-focus-visible={isFocusVisible() || undefined}
          data-disabled={props.isDisabled || undefined}
          data-readonly={props.isReadOnly || undefined}
          data-required={props.isRequired || undefined}
          data-open={state.isOpen || undefined}
        />
      </Provider>
    );
  }
