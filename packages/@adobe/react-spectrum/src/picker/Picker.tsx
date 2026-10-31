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

import AlertMedium from '@spectrum-icons/ui/AlertMedium';
import {
  Alignment,
  AsyncLoadable,
  DimensionValue,
  DOMRefValue,
  FocusableRefValue,
  LabelPosition,
  SingleSelection,
  SpectrumLabelableProps,
  StyleProps
} from '@react-types/shared';
import {AriaSelectProps, HiddenSelect, useSelect} from 'react-aria/useSelect';
import ChevronDownMedium from '@spectrum-icons/ui/ChevronDownMedium';
import {classNames} from '../utils/classNames';
import {dimensionValue} from '../utils/styleProps';
import {Field} from '../label/Field';
import {FieldButton} from '../button/FieldButton';
import intlMessages from '../../intl/picker/*.json';
import {ListBoxBase, useListBoxLayout} from '../listbox/ListBoxBase';
import {mergeProps} from 'react-aria/mergeProps';
import {Popover} from '../overlays/Popover';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {ProgressCircle} from '../progress/ProgressCircle';
import {createEffect, createSignal, merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {attachRef, useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {SlotProvider, useSlotProps} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/dropdown/vars.css';
import {Text} from '../text/Text';
import {Tray} from '../overlays/Tray';
import {useDOMRef, useUnwrapDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useFormProps} from '../form/Form';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';
import {useIsMobileDevice} from '../utils/useIsMobileDevice';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useProvider, useProviderProps} from '../provider/Provider';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';
import {useSelectState} from 'react-stately/useSelectState';

export interface SpectrumPickerProps<T>
  extends
    Omit<
      AriaSelectProps<T>,
      | 'selectionMode'
      | 'selectedKey'
      | 'defaultSelectedKey'
      | 'onSelectionChange'
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'allowsEmptyCollection'
    >,
    Omit<SingleSelection, 'disallowEmptySelection'>,
    AsyncLoadable,
    SpectrumLabelableProps,
    StyleProps {
  /** Whether the textfield should be displayed with a quiet style. */
  isQuiet?: boolean;
  /**
   * Alignment of the menu relative to the input target.
   *
   * @default 'start'
   */
  align?: Alignment;
  /**
   * Direction the menu will render relative to the Picker.
   *
   * @default 'bottom'
   */
  direction?: 'bottom' | 'top';
  /**
   * Whether the menu should automatically flip direction when space is limited.
   *
   * @default true
   */
  shouldFlip?: boolean;
  /**
   * Width of the menu. By default, matches width of the trigger. Note that the minimum width of the
   * dropdown is always equal to the trigger's width.
   */
  menuWidth?: DimensionValue;
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;
}

/**
 * Pickers allow users to choose a single option from a collapsible list of options when space is
 * limited.
 */
export const Picker = function Picker<T extends object>(
  input: SpectrumPickerProps<T> & {ref?: DOMRef<HTMLDivElement>}
) {
  // Preserve the source slot → provider → Form precedence.
  let contextualProps = useFormProps(useProviderProps(useSlotProps(input, 'picker')));
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/picker');
  let props = merge(contextualProps, {
    get direction() { return contextualProps.direction === undefined ? 'bottom' as const : contextualProps.direction; },
    get align() { return contextualProps.align === undefined ? 'start' as const : contextualProps.align; },
    get shouldFlip() { return contextualProps.shouldFlip === undefined ? true : contextualProps.shouldFlip; },
    get placeholder() { return contextualProps.placeholder === undefined ? stringFormatter.format('placeholder') : contextualProps.placeholder; },
    get labelPosition() { return contextualProps.labelPosition === undefined ? 'top' as LabelPosition : contextualProps.labelPosition; }
  });

  let state = useSelectState(props);
  let domRef = useDOMRef<HTMLDivElement>(handle => attachRef(input.ref, handle));

  let popoverRef = useObjectRef<DOMRefValue<HTMLDivElement>>();
  let triggerRef = useObjectRef<FocusableRefValue<HTMLElement>>();
  let unwrappedTriggerRef = useUnwrapDOMRef(triggerRef);
  let listboxRef = useObjectRef<HTMLDivElement>();

  let isLoadingInitial = () => props.isLoading && state.collection.size === 0;
  let isLoadingMore = () => props.isLoading && state.collection.size > 0;
  let progressCircleId = useId();

  // We create the listbox layout in Picker and pass it to ListBoxBase below
  // so that the layout information can be cached even while the listbox is not mounted.
  // We also use the layout as the keyboard delegate for type to select.
  let layout = useListBoxLayout<T>();
  let {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    hiddenSelectProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails
  } = useSelect(
    merge(props, {
      get 'aria-describedby'() { return isLoadingInitial() ? progressCircleId() : undefined; }
    }),
    state,
    unwrappedTriggerRef
  );

  let isMobile = useIsMobileDevice();
  let {hoverProps, isHovered} = useHover({get isDisabled() { return props.isDisabled; }});

  // On small screen devices, the listbox is rendered in a tray, otherwise a popover.
  let listbox = () => (
    <ListBoxBase
      {...menuProps}
      ref={listboxRef}
      disallowEmptySelection
      autoFocus={state.focusStrategy || true}
      shouldSelectOnPressUp
      focusOnPointerEnter
      layout={layout()}
      state={state}
      width={isMobile() ? '100%' : undefined}
      // Set max height: inherit so Tray scrolling works
      UNSAFE_style={{'max-height': 'inherit'}}
      isLoading={props.isLoading}
      showLoadingSpinner={isLoadingMore()}
      onLoadMore={props.onLoadMore}
    />
  );

  // Measure the width of the button to inform the width of the menu (below).
  let [buttonWidth, setButtonWidth] = createSignal<number | undefined>(undefined);
  let provider = useProvider();

  let onResize = () => {
    if (!isMobile() && unwrappedTriggerRef.current) {
      let width = unwrappedTriggerRef.current.offsetWidth;
      setButtonWidth(width);
    }
  };

  useResizeObserver({
    ref: unwrappedTriggerRef,
    onResize: onResize
  });

  createEffect(() => ({scale: provider.scale, selectedKey: state.selectedKey,
    mobile: isMobile(), trigger: unwrappedTriggerRef.current}), ({mobile, trigger}) => {
    if (!mobile && trigger) {
      setButtonWidth(trigger.offsetWidth);
    }
  });

  let overlay = () => isMobile() ? (
    <Tray state={state}>{listbox()}</Tray>
  ) : (
    // If quiet, use the default width, otherwise match the width of the button. This can be overridden by the menuWidth prop.
    // Always have a minimum width of the button width. When quiet, there is an extra offset to add.
    // Not using style props for this because they don't support `calc`.
      <Popover
        UNSAFE_style={{
          width: props.menuWidth ? dimensionValue(props.menuWidth) : props.isQuiet || buttonWidth() === undefined ? undefined : `${buttonWidth()}px`,
          'min-width': props.isQuiet
            ? `calc(${buttonWidth()}px + calc(2 * var(--spectrum-dropdown-quiet-offset)))`
            : buttonWidth() === undefined ? undefined : `${buttonWidth()}px`
        }}
        UNSAFE_className={classNames(styles, 'spectrum-Dropdown-popover', {
          'spectrum-Dropdown-popover--quiet': props.isQuiet
        })}
        ref={popoverRef}
        placement={`${props.direction} ${props.align}`}
        shouldFlip={props.shouldFlip}
        hideArrow
        state={state}
        triggerRef={unwrappedTriggerRef}
        scrollRef={listboxRef}
        shouldContainFocus>
        {listbox()}
      </Popover>
  );

  let contents = () => {
    let value = state.selectedItem ? state.selectedItem.rendered : props.placeholder;
    return typeof value === 'string' ? <Text>{value}</Text> : value;
  };

  return (
    <Field
      {...props}
      ref={(element: HTMLElement | null) => domRef(element as HTMLDivElement | null)}
      wrapperClassName={classNames(styles, 'spectrum-Field', {
        'spectrum-Dropdown-fieldWrapper--quiet': props.isQuiet,
        'spectrum-Dropdown-fieldWrapper--positionSide': props.labelPosition === 'side'
      })}
      labelProps={labelProps as JSX.LabelHTMLAttributes<HTMLLabelElement>}
      descriptionProps={descriptionProps as JSX.HTMLAttributes<HTMLElement>}
      errorMessageProps={errorMessageProps as JSX.HTMLAttributes<HTMLElement>}
      isInvalid={isInvalid()}
      validationErrors={validationErrors()}
      validationDetails={validationDetails()}
      showErrorIcon={false}
      includeNecessityIndicatorInAccessibilityName
      elementType="span">
      {compose => (
    <div
      {...compose({get class() { return classNames(styles, 'spectrum-Dropdown', {
        'is-invalid': isInvalid() && !props.isDisabled,
        'is-disabled': props.isDisabled,
        'spectrum-Dropdown--quiet': props.isQuiet
      }); }})}>
      <HiddenSelect autoComplete={props.autoComplete} {...hiddenSelectProps} />
      <PressResponder {...mergeProps(hoverProps, triggerProps) as Omit<Parameters<typeof PressResponder>[0], 'children'>}>
        <FieldButton
          ref={triggerRef}
          isActive={state.isOpen}
          isQuiet={props.isQuiet}
          isDisabled={props.isDisabled}
          isInvalid={isInvalid()}
          autoFocus={props.autoFocus}
          UNSAFE_className={classNames(styles, 'spectrum-Dropdown-trigger', {
            'is-hovered': isHovered()
          })}>
          <SlotProvider
            slots={{
              icon: {UNSAFE_className: classNames(styles, 'spectrum-Icon'), size: 'S'},
              avatar: {
                UNSAFE_className: classNames(styles, 'spectrum-Dropdown-avatar'),
                size: 'avatar-size-100'
              },
              text: merge(valueProps, {
                get UNSAFE_className() { return classNames(styles, 'spectrum-Dropdown-label', {
                  'is-placeholder': !state.selectedItem
                }); }
              }),
              description: {
                isHidden: true
              }
            }}>
            {contents()}
          </SlotProvider>
          {isLoadingInitial() && (
            <ProgressCircle
              id={progressCircleId()}
              isIndeterminate
              size="S"
              aria-label={stringFormatter.format('loading')}
              UNSAFE_className={classNames(styles, 'spectrum-Dropdown-progressCircle')}
            />
          )}
          {isInvalid() && !isLoadingInitial() && !props.isDisabled && (
            <AlertMedium UNSAFE_className={classNames(styles, 'spectrum-Dropdown-invalidIcon')} />
          )}
          <ChevronDownMedium UNSAFE_className={classNames(styles, 'spectrum-Dropdown-chevron')} />
        </FieldButton>
      </PressResponder>
      {state.collection.size === 0 ? null : overlay()}
    </div>
      )}
    </Field>
  );
} as <T>(props: SpectrumPickerProps<T> & {ref?: DOMRef<HTMLDivElement>}) => JSX.Element;
