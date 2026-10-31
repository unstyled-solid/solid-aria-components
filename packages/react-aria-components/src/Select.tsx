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

import {AriaSelectProps, HiddenSelect, useSelect} from 'react-aria/useSelect';

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
import {Collection, Node} from '@react-types/shared';
import {CollectionBuilder} from 'react-aria/CollectionBuilder';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {AriaLabelingProps, GlobalDOMAttributes} from '@react-types/shared';
import intlMessages from '../intl/*.json';
import {ItemRenderProps} from './Collection';
import {LabelContext, type LabelProps} from './Label';
import {ListBoxContext, ListStateContext, type ListBoxProps} from './ListBox';
import {mergeProps} from 'react-aria/mergeProps';
import {OverlayTriggerStateContext} from './Dialog';
import {PopoverContext} from './Popover';
import {createContext, omit, useContext, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {SelectState, useSelectState} from 'react-stately/useSelectState';
import {TextContext, type TextProps} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useListFormatter} from 'react-aria/useListFormatter';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';

type SelectionMode = 'single' | 'multiple';

export interface SelectRenderProps {
  /**
   * Whether the select is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the select is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the select is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the select is currently open.
   *
   * @selector [data-open]
   */
  isOpen: boolean;
  /**
   * Whether the select is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the select is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
}

export interface SelectProps<T = {}, M extends SelectionMode = 'single'>
  extends
    Omit<
      AriaSelectProps<T, M>,
      | 'children'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
      | 'items'
    >,
    RACValidation,
    RenderProps<SelectRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Select'
   */
  className?: ClassNameOrFunction<SelectRenderProps>;
  /**
   * Temporary text that occupies the select when it is empty.
   *
   * @default 'Select an item' (localized)
   */
  placeholder?: string;
  ref?: JSX.Ref<HTMLDivElement>;
}

export const SelectContext =
  createContext<ContextValue<SelectProps<any, SelectionMode>, HTMLDivElement>>(null);
export const SelectStateContext = createContext<SelectState<unknown, SelectionMode> | null>(null);

/**
 * A select displays a collapsible list of options and allows a user to select one of them.
 */
export const Select = /*#__PURE__*/ createHideableComponent(function Select<
  T,
  M extends SelectionMode = 'single'
>(props: SelectProps<T, M>, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, SelectContext);
  let content = () => {
    let children = props.children;
    return typeof children === 'function'
        ? children({
            isOpen: false,
             get isDisabled() { return props.isDisabled ?? false; },
             get isInvalid() { return props.isInvalid ?? false; },
             get isRequired() { return props.isRequired ?? false; },
            isFocused: false,
            isFocusVisible: false,
            defaultChildren: null
          })
         : children;
  };

  return (
    <CollectionBuilder content={content()}>
      {collection => <SelectInner props={props} collection={collection} selectRef={ref} />}
    </CollectionBuilder>
  );
});

// Contexts to clear inside the popover.
const CLEAR_CONTEXTS = [LabelContext, ButtonContext, TextContext];

interface SelectInnerProps<T> {
  props: SelectProps<T, SelectionMode>;
  selectRef: ForwardedRef<HTMLDivElement>;
  collection: Collection<Node<T>>;
}

function SelectInner<T>(inner: SelectInnerProps<T>) {
  let props = inner.props;
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let state = useSelectState(mergeProps(props, {
    get collection() { return inner.collection; },
    children: undefined,
    get validationBehavior() { return validationBehavior(); }
  }));

  let {isFocusVisible, focusProps} = useFocusRing({within: true});

  // Get props for child elements from useSelect
  let buttonRef = useObjectRef<HTMLButtonElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria = useSelect(
    mergeProps(removeDataAttributes(props), {
      get label() { return label(); },
      get validationBehavior() { return validationBehavior(); }
    }), state, buttonRef
  );
  let {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    hiddenSelectProps
  } = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  let renderPropsState = {
    get isOpen() { return state.isOpen; },
    get isFocused() { return state.isFocused; },
    get isFocusVisible() { return isFocusVisible(); },
    get isDisabled() { return props.isDisabled || false; },
    get isInvalid() { return validation.isInvalid || false; },
    get isRequired() { return props.isRequired || false; }
  };

  let renderProps = useRenderProps(mergeProps(props, {
    values: renderPropsState,
    defaultClassName: 'react-aria-Select'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  let scrollRef = useObjectRef<HTMLDivElement>();

  return (
    <Provider
      values={[
        [SelectContext, props],
        [SelectStateContext, state],
        [SelectValueContext, valueProps as SelectValueProps<T>],
        [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef, elementType: 'span' as const})],
        [
          ButtonContext,
          mergeProps(triggerProps, {ref: buttonRef, get isPressed() { return state.isOpen; }, get autoFocus() { return props.autoFocus; }})
        ],
        [OverlayTriggerStateContext, state],
        [
          PopoverContext,
          {
            trigger: 'Select',
            triggerRef: buttonRef,
            scrollRef,
            placement: 'bottom start',
            get 'aria-labelledby'() { return menuProps['aria-labelledby']; },
            clearContexts: CLEAR_CONTEXTS
          }
        ],
        [ListBoxContext, mergeProps(menuProps as ListBoxProps<T>, {ref: scrollRef})],
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
        [FieldErrorContext, validation]
      ]}>
      <dom.div
        {...mergeProps(DOMProps, renderProps, focusProps)}
        ref={inner.selectRef}
        slot={props.slot || undefined}
        data-focused={state.isFocused ? 'true' : undefined}
        data-focus-visible={isFocusVisible() ? 'true' : undefined}
        data-open={state.isOpen ? 'true' : undefined}
        data-disabled={props.isDisabled ? 'true' : undefined}
        data-invalid={validation.isInvalid ? 'true' : undefined}
        data-required={props.isRequired ? 'true' : undefined}>
        {renderProps.children}
        <HiddenSelect {...hiddenSelectProps} autoComplete={props.autoComplete} />
      </dom.div>
    </Provider>
  );
}

export interface SelectValueRenderProps<T> {
  /**
   * Whether the value is a placeholder.
   *
   * @selector [data-placeholder]
   */
  isPlaceholder: boolean;
  /**
   * The object value of the first selected item.
   *
   * @deprecated
   */
  selectedItem: T | null;
  /** The object values of the currently selected items. */
  selectedItems: (T | null)[];
  /** The textValue of the currently selected items. */
  selectedText: string;
  /** The state of the select. */
  state: SelectState<T, 'single' | 'multiple'>;
}

export interface SelectValueProps<T>
  extends
    Omit<JSX.HTMLAttributes<HTMLElement>, keyof RenderProps<unknown> | keyof GlobalDOMAttributes<HTMLSpanElement> | keyof AriaLabelingProps | 'slot'>,
    Omit<GlobalDOMAttributes<HTMLSpanElement>, 'id' | keyof AriaLabelingProps>,
    AriaLabelingProps,
    SlotProps,
    RenderProps<SelectValueRenderProps<T>, 'span'> {
  id?: string;
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SelectValue'
   */
  className?: ClassNameOrFunction<SelectValueRenderProps<T>>;
}

export const SelectValueContext =
  createContext<ContextValue<SelectValueProps<any>, HTMLSpanElement>>(null);

/**
 * SelectValue renders the current value of a Select, or a placeholder if no value is selected.
 * It is usually placed within the button element.
 */
export const SelectValue = /*#__PURE__*/ createHideableComponent(function SelectValue<T>(
  props: SelectValueProps<T>,
  ref: ForwardedRef<HTMLSpanElement>
) {
  [props, ref] = useContextProps(props, ref, SelectValueContext);
  let state = useContext(SelectStateContext)! as SelectState<T, 'single' | 'multiple'>;
  let select = useSlottedContext(SelectContext)!;
  let rendered = () => state.selectedItems.map(item => {
    let rendered = item.props?.children;
    // If the selected item has a function as a child, we need to call it to render to React.JSX.
    if (typeof rendered === 'function') {
      let fn = rendered as (s: ItemRenderProps) => JSX.Element;
      rendered = fn({
        isHovered: false,
        isPressed: false,
        isSelected: false,
        isFocused: false,
        isFocusVisible: false,
        isDisabled: false,
        selectionMode: 'single',
        selectionBehavior: 'toggle'
      });
    }

    return rendered;
  });

  let formatter = useListFormatter();
  let textValue = () => state.selectedItems.map(item => item?.textValue);
  let selectionMode = () => state.selectionManager.selectionMode;
  let selectedText = () => selectionMode() === 'single' ? (textValue()[0] ?? '') : formatter.format(textValue());

  let defaultChildren = () => {
    if (selectionMode() === 'single') {
      return rendered()[0];
    }

    let parts = formatter.formatToParts(textValue());
    if (parts.length === 0) {
      return null;
    }

    let index = 0;
    let items = rendered();
    return parts.map(part => {
      if (part.type === 'element') {
        return <>{items[index++]}</>;
      } else {
        return part.value;
      }
    });
  };

  let stringFormatter = useLocalizedStringFormatter(intlMessages, 'react-aria-components');

  let renderProps = useRenderProps(mergeProps(props, {
    get defaultChildren() { return defaultChildren() ?? select.placeholder ?? stringFormatter.format('selectPlaceholder'); },
    defaultClassName: 'react-aria-SelectValue',
    values: {
      get selectedItem() { return (state.selectedItems[0]?.value as T) ?? null; },
      get selectedItems() { return state.selectedItems.map(item => (item.value as T) ?? null); },
      get selectedText() { return selectedText(); },
      get isPlaceholder() { return state.selectedItems.length === 0; },
      state
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.span
      ref={ref}
      {...DOMProps}
      {...renderProps}
      data-placeholder={state.selectedItems.length === 0 ? 'true' : undefined}>
      {/* clear description and error message slots */}
      <TextContext value={undefined}>{renderProps.children}</TextContext>
    </dom.span>
  );
});
