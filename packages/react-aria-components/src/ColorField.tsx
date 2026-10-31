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

import {AriaColorFieldProps, useColorChannelField, useColorField} from 'react-aria/useColorField';

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
  useSlot
} from './utils';
import {ColorChannel, ColorSpace} from 'react-stately/Color';
import {
  ColorFieldState,
  useColorChannelFieldState,
  useColorFieldState
} from 'react-stately/useColorFieldState';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes, InputDOMProps, ValidationResult} from '@react-types/shared';
import {GroupContext} from './Group';
import {InputContext, type InputProps} from './Input';
import {LabelContext, type LabelProps} from './Label';
import {createContext, merge, omit, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, attachRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {mergeProps} from 'react-aria/mergeProps';
import {TextContext, type TextProps} from './Text';
import {useLocale} from 'react-aria/I18nProvider';

export interface ColorFieldRenderProps {
  /**
   * Whether the color field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the color field is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the color field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the color field is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * The color channel that this field edits, or "hex" if no `channel` prop is set.
   *
   * @selector [data-channel="hex | hue | saturation | ..."]
   */
  channel: ColorChannel | 'hex';
  /**
   * State of the color field.
   */
  state: ColorFieldState;
}

export interface ColorFieldProps
  extends
    Omit<
      AriaColorFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    InputDOMProps,
    RenderProps<ColorFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorField'
   */
  className?: ClassNameOrFunction<ColorFieldRenderProps>;
  /**
   * The color channel that this field edits. If not provided,
   * the color is edited as a hex value.
   */
  channel?: ColorChannel;
  /**
   * The color space that the color field operates in if a `channel` prop is provided.
   * If no `channel` is provided, the color field always displays the color as an RGB hex value.
   */
  colorSpace?: ColorSpace;
}

export const ColorFieldContext = createContext<ContextValue<ColorFieldProps, HTMLDivElement>>(null);
export const ColorFieldStateContext = createContext<ColorFieldState | null>(null);

/**
 * A color field allows users to edit a hex color or individual color channel value.
 */
export function ColorField(input: ColorFieldProps & {ref?: ForwardedRef<HTMLDivElement>}) {
  let [props, ref] = useContextProps(input, element => attachRef(input.ref as Ref<HTMLDivElement>, element as HTMLDivElement), ColorFieldContext);
  // These optional flags may appear after setup. Bind their individual reads:
  // the context merge's spread cannot publish newly introduced keys to RC13.
  return <>{props.channel
    ? <ColorChannelField {...props} channel={props.channel} isRequired={props.isRequired} isReadOnly={props.isReadOnly} forwardedRef={ref} localChildren={() => input.children} />
    : <HexColorField {...props} isRequired={props.isRequired} isReadOnly={props.isReadOnly} forwardedRef={ref} localChildren={() => input.children} />}</>;
}

interface ColorChannelFieldProps extends Omit<ColorFieldProps, 'channel'> {
  channel: ColorChannel;
  forwardedRef: ForwardedRef<HTMLDivElement>;
  localChildren: () => ColorFieldProps['children'];
}

function ColorChannelField(props: ColorChannelFieldProps) {
  let locale = useLocale();
  let state = useColorChannelFieldState(merge(props, {
    get locale() { return locale.locale; }
  }));

  let inputRef = useObjectRef<HTMLInputElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria =
    useColorChannelField(
      merge(removeDataAttributes(props), {
        get label() { return label(); },
        get validationBehavior() { return props.validationBehavior ?? 'native'; }
      }),
      state,
      inputRef
    );

  let {labelProps, inputProps, descriptionProps, errorMessageProps} = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };
  let children = useChildren(
        props,
        state,
        props.forwardedRef,
        inputProps,
        inputRef,
        labelProps,
        labelRef,
        descriptionProps as TextProps,
        errorMessageProps as TextProps,
         validation,
         props.localChildren
      );
  return (
    <>
      {children}
      {props.name && (
        <input
          type="hidden"
          name={props.name}
          form={props.form}
          value={isNaN(state.numberValue) ? '' : state.numberValue}
        />
      )}
    </>
  );
}

interface HexColorFieldProps extends ColorFieldProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
  localChildren: () => ColorFieldProps['children'];
}

function HexColorField(props: HexColorFieldProps) {
  let state = useColorFieldState(merge(props, {
    get validationBehavior() { return props.validationBehavior ?? 'native'; }
  }));

  let inputRef = useObjectRef<HTMLInputElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria = useColorField(
    merge(removeDataAttributes(props), {
      get label() { return label(); },
      get validationBehavior() { return props.validationBehavior ?? 'native'; }
    }),
    state,
    inputRef
  );
  let {labelProps, inputProps, descriptionProps, errorMessageProps} = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  return useChildren(
    props,
    state,
    props.forwardedRef,
    inputProps,
    inputRef,
    labelProps,
    labelRef,
    descriptionProps as TextProps,
    errorMessageProps as TextProps,
    validation,
    props.localChildren
  );
}

function useChildren(
  props: ColorFieldProps,
  state: ColorFieldState,
  ref: ForwardedRef<HTMLDivElement>,
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>,
  inputRef: Ref<HTMLInputElement>,
  labelProps: JSX.LabelHTMLAttributes<HTMLLabelElement>,
  labelRef: ForwardedRef<HTMLLabelElement>,
  descriptionProps: TextProps,
  errorMessageProps: TextProps,
  validation: ValidationResult,
  localChildren: () => ColorFieldProps['children']
) {
  let renderProps = useRenderProps(merge(props, {
    // Resolve local JSX under this field's providers, before consulting the
    // context merge whose slot lookup depends on the changing value bag.
    get children() {
      let children = localChildren();
      return children !== undefined ? children : props.children;
    },
    values: {
      state,
      get channel() { return props.channel || 'hex'; },
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return validation.isInvalid || false; },
      get isReadOnly() { return props.isReadOnly || false; },
      get isRequired() { return props.isRequired || false; }
    },
    defaultClassName: 'react-aria-ColorField'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <Provider
      values={[
        [ColorFieldStateContext, state],
        [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
        [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef})],
        [
          GroupContext,
          {
            role: 'presentation',
            get isInvalid() { return validation.isInvalid; },
            get isDisabled() { return props.isDisabled || false; }
          }
        ],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps,
              errorMessage: errorMessageProps
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
        data-channel={props.channel || 'hex'}
        data-disabled={props.isDisabled || undefined}
        data-invalid={validation.isInvalid || undefined}
        data-readonly={props.isReadOnly || undefined}
        data-required={props.isRequired || undefined}
      />
    </Provider>
  );
}
