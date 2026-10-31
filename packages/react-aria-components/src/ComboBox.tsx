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
import {AriaComboBoxProps, useComboBox} from 'react-aria/useComboBox';

import {ButtonContext} from './Button';
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
import {Collection, FocusableElement, Node} from '@react-types/shared';
import {CollectionBuilder} from 'react-aria/CollectionBuilder';
import {ComboBoxState, useComboBoxState} from 'react-stately/useComboBoxState';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {FieldErrorContext} from './FieldError';
import {FieldInputContext} from './FieldInputContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {AriaLabelingProps, GlobalDOMAttributes, Key} from '@react-types/shared';
import {GroupContext} from './Group';
import {InputContext, type InputProps} from './Input';
import {LabelContext, type LabelProps} from './Label';
import {ListBoxContext, ListStateContext, type ListBoxProps} from './ListBox';
import {OverlayTriggerStateContext} from './Dialog';
import {PopoverContext} from './Popover';
import {createContext, createSignal, merge, omit, useContext, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {mergeProps} from 'react-aria/mergeProps';
import {TextContext, type TextProps} from './Text';
import {useFilter} from 'react-aria/useFilter';
import {useListFormatter} from 'react-aria/useListFormatter';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';

type SelectionMode = 'single' | 'multiple';

export interface ComboBoxRenderProps {
  /**
   * Whether the combobox is currently open.
   *
   * @selector [data-open]
   */
  isOpen: boolean;
  /**
   * Whether the combobox is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the combobox is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the combobox is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the combobox is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
}

export interface ComboBoxProps<T, M extends SelectionMode = 'single'>
  extends
    Omit<
      AriaComboBoxProps<T, M>,
      | 'children'
      | 'placeholder'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<ComboBoxRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ComboBox'
   */
  className?: ClassNameOrFunction<ComboBoxRenderProps>;
  /**
   * The filter function used to determine if an option should be included in the combo box list.
   * By default, a language-sensitive "contains" filter from `useFilter` is used.
   */
  defaultFilter?: (textValue: string, inputValue: string) => boolean;
  /**
   * Whether the text or key of the selected item is submitted as part of an HTML form. When
   * `allowsCustomValue` is `true`, this option does not apply and the text is always submitted.
   *
   * @default 'key'
   */
  formValue?: 'text' | 'key';
  /** Whether the combo box allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean;
  ref?: JSX.Ref<HTMLDivElement>;
}

export const ComboBoxContext =
  createContext<ContextValue<ComboBoxProps<any, SelectionMode>, HTMLDivElement>>(null);
export const ComboBoxStateContext = createContext<ComboBoxState<any, SelectionMode> | null>(null);

/**
 * A combo box combines a text input with a listbox, allowing users to filter a list of options to
 * items matching a query.
 */
export const ComboBox = /*#__PURE__*/ createHideableComponent(function ComboBox<
  T,
  M extends SelectionMode = 'single'
>(props: ComboBoxProps<T, M>, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, ComboBoxContext);
  let content = () => (
      <ListBoxContext value={{get items() { return props.items ?? props.defaultItems; }}}>
        {typeof props.children === 'function'
          ? props.children({
              isOpen: false,
              get isDisabled() { return props.isDisabled ?? false; },
              get isInvalid() { return props.isInvalid ?? false; },
              get isRequired() { return props.isRequired ?? false; },
              defaultChildren: null,
              get isReadOnly() { return props.isReadOnly ?? false; }
            })
          : props.children}
      </ListBoxContext>
  );

  return (
    <CollectionBuilder content={content()}>
      {collection => <ComboBoxInner props={props} collection={collection} comboBoxRef={ref} />}
    </CollectionBuilder>
  );
});

// Contexts to clear inside the popover.
const CLEAR_CONTEXTS = [
  LabelContext,
  ButtonContext,
  InputContext,
  FieldInputContext,
  GroupContext,
  TextContext
];

interface ComboBoxInnerProps<T> {
  props: ComboBoxProps<T, SelectionMode>;
  collection: Collection<Node<T>>;
  comboBoxRef: ForwardedRef<HTMLDivElement>;
}

function ComboBoxInner<T>(inner: ComboBoxInnerProps<T>) {
  let props = inner.props;
  let formValue = () => props.allowsCustomValue ? 'text' : props.formValue ?? 'key';

  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let {contains} = useFilter({sensitivity: 'base'});
  let state = useComboBoxState(mergeProps(props, {
    get defaultFilter() { return props.defaultFilter || contains; },
    // If props.items isn't provided, rely on collection filtering (aka listbox.items is provided or defaultItems provided to Combobox)
    get items() { return props.items; },
    children: undefined,
    get collection() { return inner.collection; },
    get validationBehavior() { return validationBehavior(); }
  }));

  let buttonRef = useObjectRef<HTMLButtonElement>();
  let inputRef = useObjectRef<HTMLInputElement>();
  let groupRef = useObjectRef<HTMLDivElement>();
  let listBoxRef = useObjectRef<HTMLDivElement>();
  let popoverRef = useObjectRef<HTMLElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let [labelElementType, setLabelElementType] = createSignal<'span' | 'label'>('label');
  let aria = useComboBox(merge(removeDataAttributes(props), {
    get label() { return label(); },
    inputRef, buttonRef, listBoxRef, popoverRef,
    get name() { return formValue() === 'text' ? props.name : undefined; },
    get validationBehavior() { return validationBehavior(); },
    get labelElementType() { return labelElementType(); }
  }), state);

  let {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    valueProps
  } = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  // Make menu width match input + button
  // Left for backward compatibility in case a <Group> is not rendered.
  let [menuWidth, setMenuWidth] = createSignal<string | null>(null);
  let onResize = () => {
    if (inputRef.current && !groupRef.current) {
      let buttonRect = buttonRef.current?.getBoundingClientRect();
      let inputRect = inputRef.current.getBoundingClientRect();
      let minX = buttonRect ? Math.min(buttonRect.left, inputRect.left) : inputRect.left;
      let maxX = buttonRect ? Math.max(buttonRect.right, inputRect.right) : inputRect.right;
      setMenuWidth(maxX - minX + 'px');
    }
  };

  useResizeObserver({
    ref: inputRef,
    onResize: onResize
  });

  // Position popover relative to group if available, otherwise input.
  let triggerRef = {
      get current() {
        return groupRef.current || inputRef.current;
      }
  };

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  let renderPropsState = {
    get isOpen() { return state.isOpen; },
    get isDisabled() { return props.isDisabled || false; },
    get isInvalid() { return validation.isInvalid || false; },
    get isRequired() { return props.isRequired || false; },
    get isReadOnly() { return props.isReadOnly || false; }
  };

  let renderProps = useRenderProps(mergeProps(props, {
    values: renderPropsState,
    defaultClassName: 'react-aria-ComboBox'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  let inputs = () => {
    if (!props.name || formValue() !== 'key') { return []; }
    let values: (Key | null)[] = Array.isArray(state.value) ? state.value : [state.value];
    if (values.length === 0) {
      values = [null];
    }

    return values.map(value => (
      <input type="hidden" name={props.name} form={props.form} value={value ?? ''} />
    ));
  };
  let fieldRef = (el: FocusableElement | null) => {
    inputRef(el as HTMLInputElement | null);
    if (el) { setLabelElementType(el.tagName.toLowerCase() === 'input' ? 'label' : 'span'); }
  };

  return (
    <Provider
      values={[
        [ComboBoxStateContext, state],
        [LabelContext, mergeProps(labelProps as LabelProps, {get elementType() { return labelElementType(); }, ref: labelRef})],
        [ButtonContext, mergeProps(buttonProps, {ref: buttonRef, get isPressed() { return state.isOpen; }})],
        [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
        [
          FieldInputContext,
          merge(inputProps, {
            ref: fieldRef,
            get value() { return state.inputValue; },
            onChange: (v: unknown) => state.setInputValue(v as string)
          }) as any
        ],
        [OverlayTriggerStateContext, state],
        [
          PopoverContext,
          {
            ref: popoverRef,
            triggerRef,
            scrollRef: listBoxRef,
            placement: 'bottom start',
            isNonModal: true,
            trigger: 'ComboBox',
            style: {get '--trigger-width'() { return menuWidth() ?? undefined; }},
            clearContexts: CLEAR_CONTEXTS
          }
        ],
        [ListBoxContext, mergeProps(listBoxProps as ListBoxProps<T>, {ref: listBoxRef})],
        [ListStateContext, state],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps as TextProps,
              errorMessage: errorMessageProps as TextProps
            }
          }
        ],
        [
          GroupContext,
          {ref: groupRef, get isInvalid() { return validation.isInvalid; }, get isDisabled() { return props.isDisabled || false; }}
        ],
        [FieldErrorContext, validation],
        [ComboBoxValueContext, valueProps as ComboBoxValueProps<T>]
      ]}>
      <dom.div
        {...DOMProps}
        {...renderProps}
        ref={inner.comboBoxRef}
        slot={props.slot || undefined}
        data-focused={state.isFocused ? 'true' : undefined}
        data-open={state.isOpen ? 'true' : undefined}
        data-disabled={props.isDisabled ? 'true' : undefined}
        data-readonly={props.isReadOnly ? 'true' : undefined}
        data-invalid={validation.isInvalid ? 'true' : undefined}
        data-required={props.isRequired ? 'true' : undefined}>
        {renderProps.children}
        {inputs()}
      </dom.div>
    </Provider>
  );
}

export interface ComboBoxValueRenderProps<T> {
  /**
   * Whether the value is a placeholder.
   *
   * @selector [data-placeholder]
   */
  isPlaceholder: boolean;
  /** The object values of the currently selected items. */
  selectedItems: (T | null)[];
  /** The textValue of the currently selected items. */
  selectedText: string;
  /** The state of the ComboBox. */
  state: ComboBoxState<T, 'single' | 'multiple'>;
}

export interface ComboBoxValueProps<T>
  extends
    Omit<JSX.HTMLAttributes<HTMLElement>, keyof RenderProps<unknown> | keyof GlobalDOMAttributes<HTMLDivElement> | keyof AriaLabelingProps | 'slot' | 'ref'>,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'id' | keyof AriaLabelingProps>,
    AriaLabelingProps,
    SlotProps,
    RenderProps<ComboBoxValueRenderProps<T>, 'div'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ComboBoxValue'
   */
  className?: ClassNameOrFunction<ComboBoxValueRenderProps<T>>;
  /** A value to display when no items are selected. */
  placeholder?: JSX.Element;
  id?: string;
  ref?: JSX.Ref<HTMLDivElement>;
}

export const ComboBoxValueContext =
  createContext<ContextValue<ComboBoxValueProps<any>, HTMLDivElement>>(null);

/**
 * ComboBoxValue renders the selected values of a ComboBox, or a placeholder if no value is
 * selected. By default, the items are rendered as a comma separated list. Use the render function
 * to customize this.
 */
export const ComboBoxValue = /*#__PURE__*/ createHideableComponent(function ComboBoxValue<T>(
  props: ComboBoxValueProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  [props, ref] = useContextProps(props, ref, ComboBoxValueContext);
  let state = useContext(ComboBoxStateContext)!;
  let formatter = useListFormatter();
  let selectedText = () =>
      formatter.format(
        state.selectedItems.map(item => item?.textValue || '').filter(v => v !== '')
       );

  let renderProps = useRenderProps(mergeProps(props, {
    get defaultChildren() { return selectedText() || props.placeholder; },
    defaultClassName: 'react-aria-ComboBoxValue',
    values: {
      get selectedItems() { return state.selectedItems.map(item => (item.value as T) ?? null); },
      get selectedText() { return selectedText(); },
      get isPlaceholder() { return state.selectedItems.length === 0; },
      state
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      ref={ref}
      {...DOMProps}
      {...renderProps}
      data-placeholder={state.selectedItems.length === 0 ? 'true' : undefined}
    />
  );
});
