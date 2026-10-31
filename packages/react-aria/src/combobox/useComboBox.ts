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

import {announce} from '../live-announcer/LiveAnnouncer';
import {AriaButtonProps} from '../button/useButton';
import {ariaHideOutside} from '../overlays/ariaHideOutside';
import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  InputDOMProps,
  KeyboardDelegate,
  LayoutDelegate,
  PressEvent,
  RefObject,
  RouterOptions,
  ValidationResult
} from '@react-types/shared';
import type {FocusEvent} from '@react-types/shared';
import {AriaListBoxOptions} from '../listbox/useListBox';
import {chain} from '../utils/chain';
import {ComboBoxProps, ComboBoxState, SelectionMode} from 'react-stately/useComboBoxState';
import {dispatchVirtualFocus} from '../focus/virtualFocus';
import type {JSX} from '@solidjs/web';
import {Accessor, createEffect, createMemo, merge, omit, onCleanup, untrack} from 'solid-js';
import {getActiveElement, getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {getChildNodes} from 'react-stately/private/collections/getChildNodes';
import {getItemCount} from 'react-stately/private/collections/getItemCount';
import {getItemId, listData} from '../listbox/utils';
import {getOwnerDocument} from '../utils/domHelpers';
import intlMessages from '../../intl/combobox/*.json';
import {isAppleDevice} from '../utils/platform';
import {ListKeyboardDelegate} from '../selection/ListKeyboardDelegate';
import {mergeProps} from '../utils/mergeProps';
import {privateValidationStateProp} from 'react-stately/private/form/useFormValidationState';
import {setInteractionModality} from '../interactions/useFocusVisible';
import {useEvent} from '../utils/useEvent';
import {useFormReset} from '../utils/useFormReset';
import {useSlotId} from '../utils/useId';
import {useObjectRef} from '../utils/useObjectRef';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLabels} from '../utils/useLabels';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useMenuTrigger} from '../menu/useMenuTrigger';
import {useRouter} from '../utils/openLink';
import {useSelectableCollection} from '../selection/useSelectableCollection';
import {TextFieldAria, useTextField} from '../textfield/useTextField';
import {useUpdateEffect} from '../utils/useUpdateEffect';

export interface AriaComboBoxProps<T, M extends SelectionMode = 'single'>
  extends ComboBoxProps<T, M>, DOMProps, InputDOMProps, AriaLabelingProps {
  /** Whether keyboard navigation is circular. */
  shouldFocusWrap?: boolean;
}

export interface AriaComboBoxOptions<T, M extends SelectionMode = 'single'> extends Omit<
  AriaComboBoxProps<T, M>,
  'children'
> {
  /** The ref for the input element. */
  inputRef: RefObject<HTMLInputElement | null>;
  /** The ref for the list box popover. */
  popoverRef: RefObject<Element | null>;
  /** The ref for the list box. */
  listBoxRef: RefObject<HTMLElement | null>;
  /** The ref for the optional list box popup trigger button. */
  buttonRef?: RefObject<Element | null>;
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   *
   * @default 'label'
   */
  labelElementType?: keyof JSX.IntrinsicElements;
  /** An optional keyboard delegate implementation, to override the default. */
  keyboardDelegate?: KeyboardDelegate;
  /**
   * A delegate object that provides layout information for items in the collection.
   * By default this uses the DOM, but this can be overridden to implement things like
   * virtualized scrolling.
   */
  layoutDelegate?: LayoutDelegate;
}

export interface ComboBoxAria<T> {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the label element. */
  labelProps: TextFieldAria['labelProps'];
  /** Props for the combo box input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the list box, to be passed to `useListBox`. */
  listBoxProps: AriaListBoxOptions<T>;
  /** Props for the optional trigger button, to be passed to `useButton`. */
  buttonProps: AriaButtonProps;
  /** Props for the element representing the selected value. */
  valueProps: DOMAttributes;
  /** Props for the combo box description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the combo box error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a combo box component. A combo box
 * combines a text input with a listbox, allowing users to filter a list of options to items
 * matching a query.
 *
 * @param props - Props for the combo box.
 * @param state - State for the select, as returned by `useComboBoxState`.
 */
export function useComboBox<T, M extends SelectionMode = 'single'>(
  props: AriaComboBoxOptions<T, M>,
  state: ComboBoxState<T, M>
): ComboBoxAria<T> {
  let backupBtnRef = useObjectRef<Element>();
  let buttonRef = {get current() { return (props.buttonRef ?? backupBtnRef).current; }};
  let popoverRef = {get current() { return props.popoverRef.current; }};
  let inputRef = {get current() { return props.inputRef.current; }};
  let listBoxRef = {get current() { return props.listBoxRef.current; }};

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/combobox');
  let {menuTriggerProps, menuProps} = useMenuTrigger<T>(
    {
      type: 'listbox',
      get isDisabled() { return props.isDisabled || props.isReadOnly; }
    },
    state,
    buttonRef
  );

  // Set listbox id so it can be used when calling getItemId later
  let metadata = {get id() { return menuProps.id!; }};
  listData.set(state, metadata);
  onCleanup(() => {
    if (listData.get(state) === metadata) { listData.delete(state); }
  });

  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let delegate = createMemo(
    () =>
      props.keyboardDelegate ||
      new ListKeyboardDelegate({
        collection: state.collection,
        disabledKeys: state.selectionManager.disabledKeys,
        ref: listBoxRef,
        layoutDelegate: props.layoutDelegate
      })
  );

  // Use useSelectableCollection to get the keyboard handlers to apply to the textfield
  let {collectionProps} = useSelectableCollection({
    get selectionManager() { return state.selectionManager; },
    get keyboardDelegate() { return delegate(); },
    disallowTypeAhead: true,
    disallowEmptySelection: true,
    get shouldFocusWrap() { return props.shouldFocusWrap; },
    ref: inputRef,
    // Prevent item scroll behavior from being applied here, should be handled in the user's Popover + ListBox component
    isVirtualized: true
  });

  let router = useRouter();

  // for textfield specific operations
  let {keyboardProps} = useKeyboard({
    shortcuts: {
      Enter: e => {
        // Prevent default form submission if menu is open since we may be selecting a option
        let shouldPreventDefault = state.isOpen;
        // If the focused item is a link, trigger opening it. Items that are links are not selectable.
        if (state.isOpen && listBoxRef.current && state.selectionManager.focusedKey != null) {
          let collectionItem = state.collection.getItem(state.selectionManager.focusedKey);
          if (collectionItem?.props.href) {
            let item = listBoxRef.current.querySelector(
              `[data-key="${CSS.escape(state.selectionManager.focusedKey.toString())}"]`
            );
            if (item instanceof HTMLAnchorElement) {
              router.open(
                item,
                e,
                collectionItem.props.href,
                collectionItem.props.routerOptions as RouterOptions
              );
            }
            state.close();
            return {shouldPreventDefault};
          } else if (collectionItem?.props.onAction) {
            collectionItem.props.onAction();
            state.close();
            return {shouldPreventDefault};
          }
        }
        state.commit();
        return {shouldPreventDefault};
      },
      Tab: () => {
        // If the focused item is a link, trigger opening it. Items that are links are not selectable.
        if (state.isOpen && listBoxRef.current && state.selectionManager.focusedKey != null) {
          let collectionItem = state.collection.getItem(state.selectionManager.focusedKey);
          if (collectionItem?.props.href) {
            state.close();
            return {shouldPreventDefault: false};
          } else if (collectionItem?.props.onAction) {
            collectionItem.props.onAction();
            state.close();
            return {shouldPreventDefault: false, shouldContinuePropagation: true};
          }
        }
        if (state.isOpen) {
          state.commit();
        }
        return {shouldPreventDefault: false, shouldContinuePropagation: true};
      },
      Escape: () => {
        let shouldContinuePropagation = false;
        if (!state.selectionManager.isEmpty || state.inputValue === '' || props.allowsCustomValue) {
          shouldContinuePropagation = true;
        }
        state.revert();
        return {shouldContinuePropagation};
      }
    }
  });

  let {keyboardProps: repeatKeyboardProps} = useKeyboard({
    shortcuts: {
      ArrowDown: () => {
        state.open('first', 'manual');
        return {shouldPreventDefault: false};
      },
      ArrowUp: () => {
        state.open('last', 'manual');
        return {shouldPreventDefault: false};
      },
      ArrowLeft: () => {
        state.selectionManager.setFocusedKey(null);
        return {shouldPreventDefault: false};
      },
      ArrowRight: () => {
        state.selectionManager.setFocusedKey(null);
        return {shouldPreventDefault: false};
      }
    },
    allowRepeats: true
  });

  let onBlur = (e: FocusEvent<HTMLInputElement>) => {
    let blurFromButton = nodeContains(buttonRef.current, e.relatedTarget as Element);
    let blurIntoPopover = nodeContains(popoverRef.current, e.relatedTarget as Node | null);

    // Ignore blur if focused moved to the button(if exists) or into the popover.
    if (blurFromButton || blurIntoPopover) {
      return;
    }

    if (props.onBlur) {
      props.onBlur(e);
    }

    state.setFocused(false);
  };

  let onFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (state.isFocused) {
      return;
    }

    if (props.onFocus) {
      props.onFocus(e);
    }

    state.setFocused(true);
  };

  let valueId = useValueId(() => [
    state.selectionManager.selectedKeys,
    state.selectionManager.selectionMode
  ]);
  let {labelProps, inputProps, descriptionProps, errorMessageProps} = useTextField(
    merge(omit(props, 'validate'), {
      // In multi-select mode, only set required if the selection is empty.
      get isRequired() { return (
        props.selectionMode === 'multiple'
          ? props.isRequired && state.selectionManager.isEmpty
          : props.isRequired); },
      onChange: (value: string) => state.setInputValue(value),
      get onKeyDown() { return !props.isReadOnly
        ? // oxlint-disable-next-line react/react-compiler
          chain(
            state.isOpen && collectionProps.onKeyDown,
            keyboardProps.onKeyDown,
            repeatKeyboardProps.onKeyDown,
            props.onKeyDown
          )
        : props.onKeyDown; },
      onBlur,
      get value() { return state.inputValue; },
      get defaultValue() { return state.defaultInputValue; },
      onFocus,
      autoComplete: 'off',
      validate: undefined,
      [privateValidationStateProp as '__reactAriaFormValidationState']: state,
      get 'aria-describedby'() { return (
        [valueId(), props['aria-describedby']].filter(Boolean).join(' ') || undefined); }
    }),
    inputRef
  );

  useFormReset(inputRef, () => state.defaultValue, value => state.setValue(value));

  // Press handlers for the ComboBox button
  let onPress = (e: PressEvent) => {
    if (e.pointerType === 'touch') {
      // Focus the input field in case it isn't focused yet
      inputRef.current?.focus();
      state.toggle(null, 'manual');
    }
  };

  let onPressStart = (e: PressEvent) => {
    if (e.pointerType !== 'touch') {
      inputRef.current?.focus();
      state.toggle(
        e.pointerType === 'keyboard' || e.pointerType === 'virtual' ? 'first' : null,
        'manual'
      );
    }
  };

  let triggerLabelProps = useLabels({
    get id() { return menuTriggerProps.id; },
    get 'aria-label'() { return stringFormatter.format('buttonLabel'); },
    get 'aria-labelledby'() { return props['aria-labelledby'] || (typeof labelProps.id === 'string' ? labelProps.id : undefined); }
  });

  let listBoxProps = useLabels({
    get id() { return menuProps.id; },
    get 'aria-label'() { return stringFormatter.format('listboxLabel'); },
    get 'aria-labelledby'() { return props['aria-labelledby'] || (typeof labelProps.id === 'string' ? labelProps.id : undefined); }
  });

  // If a touch happens on direct center of ComboBox input, might be virtual click from iPad so open ComboBox menu
  let lastEventTime = 0;
  let onTouchEnd = (e: globalThis.TouchEvent) => {
    if (props.isDisabled || props.isReadOnly) {
      return;
    }

    // Sometimes VoiceOver on iOS fires two touchend events in quick succession. Ignore the second one.
    if (e.timeStamp - lastEventTime < 500) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }

    let rect = (getEventTarget(e) as Element).getBoundingClientRect();
    let touch = e.changedTouches[0];

    let centerX = Math.ceil(rect.left + 0.5 * rect.width);
    let centerY = Math.ceil(rect.top + 0.5 * rect.height);

    if (touch.clientX === centerX && touch.clientY === centerY) {
      e.preventDefault();
      inputRef.current?.focus();
      state.toggle(null, 'manual');

      lastEventTime = e.timeStamp;
    }
  };

  // VoiceOver has issues with announcing aria-activedescendant properly on change
  // (especially on iOS). We use a live region announcer to announce focus changes
  // manually. In addition, section titles are announced when navigating into a new section.
  let focusedItem = createMemo(() =>
    state.selectionManager.focusedKey != null && state.isOpen
      ? state.collection.getItem(state.selectionManager.focusedKey)
      : undefined);
  let sectionKey = () => focusedItem()?.parentKey ?? null;
  let itemKey = () => state.selectionManager.focusedKey ?? null;
  let lastSection = untrack(sectionKey);
  let lastItem = untrack(itemKey);
  createEffect(() => {
    let item = focusedItem();
    let currentSectionKey = sectionKey();
    let currentItemKey = itemKey();
    let section = currentSectionKey != null ? state.collection.getItem(currentSectionKey) : null;
    let announcement: string | undefined;
    if (isAppleDevice() && item != null && currentItemKey != null && currentItemKey !== lastItem) {
      let sectionTitle = section?.['aria-label'] ||
        (typeof section?.rendered === 'string' ? section.rendered : '') || '';
      announcement = stringFormatter.format('focusAnnouncement', {
        isGroupChange: (section && currentSectionKey !== lastSection) ?? false,
        groupTitle: sectionTitle,
        groupCount: section ? [...getChildNodes(section, state.collection)].length : 0,
        optionText: item['aria-label'] || item.textValue || '',
        isSelected: state.selectionManager.isSelected(currentItemKey)
      });
    }
    return {sectionKey: currentSectionKey, itemKey: currentItemKey, announcement};
  }, ({sectionKey, itemKey, announcement}) => {
    if (announcement !== undefined) {
      announce(announcement);
    }

    lastSection = sectionKey;
    lastItem = itemKey;
  });

  // Announce the number of available suggestions when it changes
  let optionCount = createMemo(() => getItemCount(state.collection));
  let lastSize = untrack(optionCount);
  let lastOpen = untrack(() => state.isOpen);
  createEffect(() => {
    let count = optionCount();
    let isOpen = state.isOpen;
    let focusedKey = state.selectionManager.focusedKey;
    let didOpenWithoutFocusedItem = isOpen !== lastOpen && (focusedKey == null || isAppleDevice());
    return {
      optionCount: count,
      isOpen,
      announcement: isOpen && (didOpenWithoutFocusedItem || count !== lastSize)
        ? stringFormatter.format('countAnnouncement', {optionCount: count}) : undefined
    };
  }, ({optionCount, isOpen, announcement}) => {
    // Only announce the number of options available when the menu opens if there is no
    // focused item, otherwise screen readers will typically read e.g. "1 of 6".
    // The exception is VoiceOver since this isn't included in the message above.
    if (announcement !== undefined) {
      announce(announcement);
    }

    lastSize = optionCount;
    lastOpen = isOpen;
  });

  // Announce when a selection occurs for VoiceOver. Other screen readers typically do this automatically.
  // TODO: do we need to do this for multi-select?
  let lastSelectedKey = untrack(() => state.selectedKey);
  createEffect(() => {
    let isFocused = state.isFocused;
    let selectedItem = state.selectedItem;
    let selectedKey = state.selectedKey;
    let announcement: string | undefined;
    if (
      isAppleDevice() &&
      isFocused &&
      selectedItem &&
      selectedKey !== lastSelectedKey
    ) {
      let optionText = selectedItem['aria-label'] || selectedItem.textValue || '';
      announcement = stringFormatter.format('selectedAnnouncement', {optionText});
    }
    return {selectedKey, announcement};
  }, ({selectedKey, announcement}) => {
    if (announcement !== undefined) {
      announce(announcement);
    }
    lastSelectedKey = selectedKey;
  });

  createEffect(() => ({isOpen: state.isOpen, input: inputRef.current, popover: popoverRef.current}), ({isOpen, input, popover}) => {
    if (isOpen) {
      return ariaHideOutside(
        [input, popover].filter(element => element != null)
      );
    }
  });

  useUpdateEffect(() => {
    // Re-show focus ring when there is no virtually focused item.
    if (
      !focusedItem() &&
      inputRef.current &&
      getActiveElement(getOwnerDocument(inputRef.current)) === inputRef.current
    ) {
      dispatchVirtualFocus(inputRef.current, null);
    }
  }, () => [focusedItem()]);

  useEvent(
    listBoxRef,
    'react-aria-item-action',
    undefined,
    undefined,
    () => state.isOpen
      ? () => {
          state.close();
        }
      : undefined
  );

  return {
    labelProps: merge(labelProps, {
      // Focus the input in case the label is not a native <label> element.
      get onClick() { return (
        ('htmlFor' in labelProps && labelProps.htmlFor) || props.isDisabled
          ? undefined
          : () => {
              inputRef.current?.focus();
              setInteractionModality('keyboard');
            }); }
    }),
    buttonProps: merge(menuTriggerProps, triggerLabelProps, {
      excludeFromTabOrder: true,
      preventFocusOnPress: true,
      onPress,
      onPressStart,
      get isDisabled() { return props.isDisabled || props.isReadOnly; }
    }),
    // oxlint-disable-next-line react/react-compiler
    inputProps: mergeProps(inputProps, {
      role: 'combobox' as const,
      get 'aria-expanded'() { return menuTriggerProps['aria-expanded'] ? 'true' as const : 'false' as const; },
      get 'aria-controls'() { return state.isOpen ? menuProps.id : undefined; },
      // TODO: readd proper logic for completionMode = complete (aria-autocomplete: both)
      'aria-autocomplete': 'list' as const,
      get 'aria-activedescendant'() { let item = focusedItem(); return item ? getItemId(state, item.key) : undefined; },
      onTouchEnd,
      // This disable's iOS's autocorrect suggestions, since the combo box provides its own suggestions.
      autocorrect: 'off' as const,
      // This disable's the macOS Safari spell check auto corrections.
      spellcheck: 'false' as const
    }),
    listBoxProps: mergeProps(menuProps, listBoxProps, {
      onAction: undefined,
      get autoFocus() { return state.focusStrategy || true; },
      shouldUseVirtualFocus: true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      linkBehavior: 'selection' as const,
      ['UNSTABLE_itemBehavior']: 'action'
    }),
    valueProps: {
      get id() { return valueId(); }
    },
    descriptionProps,
    errorMessageProps,
    isInvalid: () => state.displayValidation.isInvalid,
    validationErrors: () => state.displayValidation.validationErrors,
    validationDetails: () => state.displayValidation.validationDetails
  };
}

// This is a modified version of useSlotId that uses useEffect instead of useLayoutEffect.
// Triggering re-renders from useLayoutEffect breaks useComboBoxState's useEffect logic in React 18.
// These re-renders preempt async state updates in the useEffect, which ends up running multiple times
// prior to the state being updated. This results in onSelectionChange being called multiple times.
// TODO: refactor useComboBoxState to avoid this.
function useValueId(depArray: Accessor<ReadonlyArray<unknown>>): Accessor<string | undefined> {
  // The shared native slot helper publishes the candidate ID before its settled
  // DOM presence check, and retries on live selection dependencies. React's
  // effect-vs-layout workaround is unnecessary under the native state contract.
  return useSlotId(depArray);
}
