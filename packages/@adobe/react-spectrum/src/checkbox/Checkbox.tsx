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

import {AriaCheckboxProps, useCheckbox} from 'react-aria/useCheckbox';

import {CheckboxContext} from 'react-aria-components/Checkbox';
import {CheckboxGroupContext} from './context';
import CheckmarkSmall from '@spectrum-icons/ui/CheckmarkSmall';
import {classNames} from '../utils/classNames';
import DashSmall from '@spectrum-icons/ui/DashSmall';
import {StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {createEffect, merge, omit, Show, useContext} from 'solid-js';
import clsx from 'clsx';
import {mergeProps} from 'react-aria/mergeProps';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/checkbox/vars.css';
import {useCheckboxGroupItem} from 'react-aria/useCheckboxGroup';
import {useContextProps} from 'react-aria-components/slots';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useFormProps} from '../form/Form';
import {useHover} from 'react-aria/useHover';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';
import {useToggleState} from 'react-stately/useToggleState';

export interface SpectrumCheckboxProps extends Omit<AriaCheckboxProps, 'onClick'>, StyleProps {
  /**
   * This prop sets the emphasized style which provides visual prominence.
   */
  isEmphasized?: boolean;
  /**
   * A slot name for the component. Slots allow the component to receive props from a parent
   * component. An explicit `null` value indicates that the local props completely override all
   * props received from a parent.
   *
   * @private
   */
  slot?: string | null;
  ref?: FocusableRef<HTMLLabelElement>;
}

/**
 * Checkboxes allow users to select multiple items from a list of individual items,
 * or to mark one individual item as selected.
 */
export function Checkbox(props: SpectrumCheckboxProps) {
  let originalProps = props;
  let inputRef = useObjectRef<HTMLInputElement>();
  let domRef = useFocusableRef(props.ref, inputRef);

  let contextRef;
  [props, contextRef] = useContextProps(props, domRef, CheckboxContext);
  props = useProviderProps(props);
  props = useFormProps(props);
  let otherProps = omit(props, 'isIndeterminate', 'isEmphasized', 'autoFocus', 'children', 'ref');
  let {styleProps} = useStyleProps(otherProps);

  // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.
  let groupState = useContext(CheckboxGroupContext);
  let {labelProps, inputProps, isInvalid, isDisabled} = groupState
    ? // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
      useCheckboxGroupItem(
        merge(props, {
          // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
          // it's passed explicitly here to avoid typescript error (requires ignore).
          get value() { return props.value!; },
          // Only pass isRequired and validationState to react-aria if they came from
          // the props for this individual checkbox, and not from the group via context.
          get isRequired() { return originalProps.isRequired; },
          get validationState() { return originalProps.validationState; },
          get isInvalid() { return originalProps.isInvalid; }
        }),
        groupState,
        inputRef
      )
    : // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
      useCheckbox(props, useToggleState(props), inputRef);

  let {hoverProps, isHovered} = useHover({get isDisabled() { return isDisabled(); }});

  if (groupState && process.env.NODE_ENV !== 'production') {
    createEffect(() => ({
      unsupported: (['isSelected', 'defaultSelected', 'isEmphasized'] as const).filter(key => originalProps[key] != null),
      value: props.value
    }), ({unsupported, value}) => {
    for (let key of unsupported) {
        console.warn(
          `${key} is unsupported on individual <Checkbox> elements within a <CheckboxGroup>. Please apply these props to the group instead.`
        );
    }
    if (value == null) {
      console.warn('A <Checkbox> element within a <CheckboxGroup> requires a `value` property.');
    }
    });
  }

  return (
    <label
      {...mergeProps(labelProps, hoverProps)}
      {...styleProps}
      ref={contextRef}
      class={classNames(
        styles,
        'spectrum-Checkbox',
        {
          'is-checked': inputProps.checked,
          'is-indeterminate': props.isIndeterminate ?? false,
          'spectrum-Checkbox--quiet': !props.isEmphasized,
          'is-invalid': isInvalid(),
          'is-disabled': isDisabled(),
          'is-hovered': isHovered()
        },
        clsx(styleProps.class)
      )}>
      <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={props.autoFocus}>
        {compose => <input {...compose(mergeProps(inputProps, {
          ref: inputRef,
          class: classNames(styles, 'spectrum-Checkbox-input')
        }))} />}
      </FocusRing>
      <span class={classNames(styles, 'spectrum-Checkbox-box')}>
        <Show when={props.isIndeterminate} fallback={<CheckmarkSmall UNSAFE_className={classNames(styles, 'spectrum-Checkbox-checkmark')} />}>
          <DashSmall UNSAFE_className={classNames(styles, 'spectrum-Checkbox-partialCheckmark')} />
        </Show>
      </span>
      {props.children && (
        <span class={classNames(styles, 'spectrum-Checkbox-label')}>{props.children}</span>
      )}
    </label>
  );
}
