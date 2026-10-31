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
import {AriaDateFieldProps, useDateField, useDateSegment} from 'react-aria/useDateField';
import {AriaTimeFieldProps, useTimeField} from 'react-aria/useTimeField';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RACValidation,
  removeDataAttributes,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlot,
  useSlottedContext
} from './utils';
import {createCalendar} from '@internationalized/date';
import {
  DateFieldState,
  DateSegmentType,
  DateValue,
  DateSegment as IDateSegment,
  useDateFieldState
} from 'react-stately/useDateFieldState';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes} from '@react-types/shared';
import {Group, GroupContext, type GroupProps} from './Group';
import {HiddenDateInput} from './HiddenDateInput';
import {HoverEvents} from '@react-types/shared';
import {Input, InputContext, type InputProps} from './Input';
import {LabelContext, type LabelProps} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {$PROXY, createContext, For, omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {TextContext, type TextProps} from './Text';
import {TimeFieldState, useTimeFieldState} from 'react-stately/useTimeFieldState';
import {TimeValue} from 'react-stately/useTimeFieldState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import type {Ref} from 'react-aria/private/utils/useObjectRef';

export interface DateFieldRenderProps {
  /**
   * State of the date field.
   */
  state: DateFieldState;
  /**
   * Whether the date field is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the date field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the date field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the date field is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
}
export interface DateFieldProps<T extends DateValue>
  extends
    Omit<
      AriaDateFieldProps<T>,
      'label' | 'description' | 'errorMessage' | 'validationState' | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<DateFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DateField'
   */
  className?: ClassNameOrFunction<DateFieldRenderProps>;
  ref?: Ref<HTMLDivElement>;
}
export interface TimeFieldProps<T extends TimeValue>
  extends
    Omit<
      AriaTimeFieldProps<T>,
      'label' | 'description' | 'errorMessage' | 'validationState' | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<DateFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TimeField'
   */
  className?: ClassNameOrFunction<DateFieldRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const DateFieldContext =
  createContext<ContextValue<DateFieldProps<any>, HTMLDivElement>>(null);
export const TimeFieldContext =
  createContext<ContextValue<TimeFieldProps<any>, HTMLDivElement>>(null);
export const DateFieldStateContext = createContext<DateFieldState | null>(null);
export const TimeFieldStateContext = createContext<TimeFieldState | null>(null);

/**
 * A date field allows users to enter and edit date and time values using a keyboard.
 * Each part of a date value is displayed in an individually editable segment.
 */
export function DateField<
  T extends DateValue
>(originalProps: DateFieldProps<T>) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(originalProps, localRef);
  let [props, ref] = useContextProps(originalProps, localRef, DateFieldContext);
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let locale = useLocale();
  let state = useDateFieldState(mergeProps(props, {
    get locale() { return locale.locale; },
    createCalendar,
    get validationBehavior() { return validationBehavior(); }
  }));

  let fieldRef = useObjectRef<HTMLDivElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let inputRef = useObjectRef<HTMLInputElement>();
  let aria =
    useDateField(
      mergeProps(removeDataAttributes(props), {
        get label() { return label(); },
        inputRef,
        get validationBehavior() { return validationBehavior(); }
      }),
      state,
      fieldRef
    );

  let {labelProps, fieldProps, inputProps, descriptionProps, errorMessageProps} = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };
  let renderProps = useRenderProps(mergeProps(removeDataAttributes(props), {
    values: {
      state,
      get isInvalid() { return state.isInvalid; },
      get isDisabled() { return state.isDisabled; },
      get isReadOnly() { return state.isReadOnly; },
      get isRequired() { return props.isRequired || false; }
    },
    defaultClassName: 'react-aria-DateField'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <Provider
      values={[
        [DateFieldStateContext, state],
        [
          GroupContext,
          mergeProps(fieldProps as GroupProps, {ref: fieldRef, get isInvalid() { return state.isInvalid; }, get isDisabled() { return state.isDisabled; }})
        ],
        [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
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
      <dom.div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-invalid={state.isInvalid || undefined}
        data-disabled={state.isDisabled || undefined}
        data-readonly={state.isReadOnly || undefined}
        data-required={props.isRequired || undefined}
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
 * A time field allows users to enter and edit time values using a keyboard.
 * Each part of a time value is displayed in an individually editable segment.
 */
export function TimeField<
  T extends TimeValue
>(originalProps: TimeFieldProps<T>) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(originalProps, localRef);
  let [props, ref] = useContextProps(originalProps, localRef, TimeFieldContext);
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let locale = useLocale();
  let state = useTimeFieldState(mergeProps(props, {
    get locale() { return locale.locale; },
    get validationBehavior() { return validationBehavior(); }
  }));

  let fieldRef = useObjectRef<HTMLDivElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let inputRef = useObjectRef<HTMLInputElement>();
  let aria =
    useTimeField(
      mergeProps(removeDataAttributes(props), {
        get label() { return label(); },
        inputRef,
        get validationBehavior() { return validationBehavior(); }
      }),
      state,
      fieldRef
    );

  let {labelProps, fieldProps, inputProps, descriptionProps, errorMessageProps} = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };
  let renderProps = useRenderProps(mergeProps(props, {
    values: {
      state,
      get isInvalid() { return state.isInvalid; },
      get isDisabled() { return state.isDisabled; },
      get isReadOnly() { return state.isReadOnly; },
      get isRequired() { return props.isRequired || false; }
    },
    defaultClassName: 'react-aria-TimeField'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <Provider
      values={[
        [TimeFieldStateContext, state],
        [
          GroupContext,
          mergeProps(fieldProps as GroupProps, {ref: fieldRef, get isInvalid() { return state.isInvalid; }, get isDisabled() { return state.isDisabled; }})
        ],
        [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
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
      <dom.div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-invalid={state.isInvalid || undefined}
        data-disabled={state.isDisabled || undefined}
        data-readonly={state.isReadOnly || undefined}
        data-required={props.isRequired || undefined}
      />
    </Provider>
  );
}

export interface DateInputRenderProps {
  /**
   * Whether the date input is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether an element within the date input is focused, either via a mouse or keyboard.
   *
   * @selector [data-focus-within]
   */
  isFocusWithin: boolean;
  /**
   * Whether an element within the date input is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the date input is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;

  /**
   * Whether the date input is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface DateInputProps
  extends SlotProps, StyleRenderProps<DateInputRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DateInput'
   */
  className?: ClassNameOrFunction<DateInputRenderProps>;
  children: (segment: IDateSegment) => JSX.Element;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A date input groups the editable date segments within a date field.
 */
export function DateInput(
  props: DateInputProps
): JSX.Element {
  // If state is provided by DateField/TimeField, just render.
  // Otherwise (e.g. in DatePicker), we need to call hooks and create state ourselves.
  let dateFieldState = useContext(DateFieldStateContext);
  let timeFieldState = useContext(TimeFieldStateContext);
  return dateFieldState || timeFieldState ? (
    <DateInputInner {...props} />
  ) : (
    <DateInputStandalone {...props} />
  );
}

function DateInputStandalone(props: DateInputProps) {
    let localRef = useObjectRef<HTMLDivElement>();
    useSyncRef(props, localRef);
    let [dateFieldProps, mergedRef] = useContextProps(
      {get slot() { return props.slot; }} as DateFieldProps<any>,
      localRef,
      DateFieldContext
    );
    let fieldRef = useObjectRef(mergedRef as Ref<HTMLDivElement>);
    let locale = useLocale();
    let state = useDateFieldState(mergeProps(dateFieldProps, {
      get locale() { return locale.locale; },
      createCalendar
    }));

    let inputRef = useObjectRef<HTMLInputElement>();
    let {fieldProps, inputProps} = useDateField(mergeProps(dateFieldProps, {inputRef}), state, fieldRef);

    return (
      <Provider
        values={[
          [DateFieldStateContext, state],
          [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
          [
            GroupContext,
            mergeProps(fieldProps as GroupProps, {ref: fieldRef, get isInvalid() { return state.isInvalid; }, get isDisabled() { return state.isDisabled; }})
          ]
        ]}>
        <DateInputInner {...props} />
      </Provider>
    );
}

function DateInputInner(props: DateInputProps) {
  let dateFieldState = useContext(DateFieldStateContext);
  let timeFieldState = useContext(TimeFieldStateContext);
  let state = dateFieldState ?? timeFieldState!;

  return (
    <>
      <Group
        {...omit(props, 'children') as GroupProps}
        ref={props.ref}
        slot={props.slot || undefined}
        className={props.className ?? 'react-aria-DateInput'}
        isReadOnly={state.isReadOnly}
        isInvalid={state.isInvalid}
        isDisabled={state.isDisabled}>
        <For each={state.segments} keyed={false}>
          {segment => {
            // Source rows are keyed by index. Keep their hosts while the segment's value changes.
            let liveSegment = new Proxy({} as IDateSegment, {
              get: (_target, key) => key === $PROXY ? undefined : Reflect.get(segment(), key),
              has: (_target, key) => key !== $PROXY && key in segment(),
              ownKeys: () => Reflect.ownKeys(segment()),
              getOwnPropertyDescriptor: (_target, key) => ({enumerable: true, configurable: true, get: () => Reflect.get(segment(), key)})
            });
            return props.children(liveSegment);
          }}
        </For>
      </Group>
      <Input className="" />
    </>
  );
}

export interface DateSegmentRenderProps extends Omit<IDateSegment, 'isEditable'> {
  /**
   * Whether the segment is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the segment is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the segment is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the value is a placeholder.
   *
   * @selector [data-placeholder]
   */
  isPlaceholder: boolean;
  /**
   * Whether the segment is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the date field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the date field is in an invalid state.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * The type of segment. Values include `literal`, `year`, `month`, `day`, etc.
   *
   * @selector [data-type="..."]
   */
  type: DateSegmentType;
}

export interface DateSegmentProps
  extends
    RenderProps<DateSegmentRenderProps, 'span'>,
    HoverEvents,
    GlobalDOMAttributes<HTMLSpanElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DateSegment'
   */
  className?: ClassNameOrFunction<DateSegmentRenderProps>;
  segment: IDateSegment;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * A date segment displays an individual unit of a date and time, and allows users to edit
 * the value by typing or using the arrow keys to increment and decrement.
 */
export function DateSegment(
  props: DateSegmentProps
) {
  let dateFieldState = useContext(DateFieldStateContext);
  let timeFieldState = useContext(TimeFieldStateContext);
  let state = dateFieldState ?? timeFieldState!;
  let otherProps = omit(props, 'segment', 'ref');
  let segment = new Proxy({} as IDateSegment, {
    get: (_target, key) => key === $PROXY ? undefined : Reflect.get(props.segment, key),
    has: (_target, key) => key !== $PROXY && key in props.segment,
    ownKeys: () => Reflect.ownKeys(props.segment),
    getOwnPropertyDescriptor: (_target, key) => ({enumerable: true, configurable: true, get: () => Reflect.get(props.segment, key)})
  });
  let domRef = useObjectRef<HTMLSpanElement>();
  useSyncRef(props, domRef);
  let {segmentProps} = useDateSegment(segment, state, domRef);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let {hoverProps, isHovered} = useHover(mergeProps(otherProps, {
    get isDisabled() { return state.isDisabled || segment.type === 'literal'; }
  }));
  let renderProps = useRenderProps(mergeProps(otherProps, {
    values: mergeProps(omit(segment, 'isEditable'), {
      get isReadOnly() { return state.isReadOnly; },
      get isInvalid() { return state.isInvalid; },
      get isDisabled() { return state.isDisabled; },
      get isHovered() { return isHovered(); },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); }
    }),
    get defaultChildren() { return segment.text; },
    defaultClassName: 'react-aria-DateSegment'
  }));

  return (
    <dom.span
      {...mergeProps(
        filterDOMProps(otherProps, {global: true}),
        segmentProps,
        focusProps,
        hoverProps
      )}
      {...renderProps}
      style={segmentProps.style}
      ref={domRef}
      data-placeholder={segment.isPlaceholder || undefined}
      data-invalid={state.isInvalid || undefined}
      data-readonly={state.isReadOnly || undefined}
      data-disabled={state.isDisabled || undefined}
      data-type={segment.type}
      data-hovered={isHovered() || undefined}
      data-focused={isFocused() || undefined}
      data-focus-visible={isFocusVisible() || undefined}
    />
  );
}
