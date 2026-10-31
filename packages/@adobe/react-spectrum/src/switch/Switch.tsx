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

import {AriaSwitchProps, useSwitch} from 'react-aria/useSwitch';

import {classNames} from '../utils/classNames';
import {StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {omit} from 'solid-js';
import clsx from 'clsx';
import {mergeProps} from 'react-aria/mergeProps';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/toggle/vars.css';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHover} from 'react-aria/useHover';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';
import {useToggleState} from 'react-stately/useToggleState';

export interface SpectrumSwitchProps extends AriaSwitchProps, StyleProps {
  /**
   * This prop sets the emphasized style which provides visual prominence.
   */
  isEmphasized?: boolean;
  ref?: FocusableRef<HTMLLabelElement>;
}

/**
 * Switches allow users to turn an individual option on or off.
 * They are usually used to activate or deactivate a specific setting.
 */
export function Switch(props: SpectrumSwitchProps) {
  let ref = props.ref;
  props = useProviderProps(props);
  let otherProps = omit(props, 'isEmphasized', 'isDisabled', 'autoFocus', 'children', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});

  let inputRef = useObjectRef<HTMLInputElement>();
  let domRef = useFocusableRef(ref, inputRef);
  let state = useToggleState(props);
  let {labelProps, inputProps} = useSwitch(props, state, inputRef);

  return (
    <label
      {...mergeProps(labelProps, hoverProps)}
      {...styleProps}
      ref={domRef}
      class={classNames(
        styles,
        'spectrum-ToggleSwitch',
        {
          'spectrum-ToggleSwitch--quiet': !props.isEmphasized,
          'is-disabled': props.isDisabled,
          'is-hovered': isHovered()
        },
        clsx(styleProps.class)
      )}>
      <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={props.autoFocus}>
        {compose => <input {...compose(mergeProps(inputProps, {
          ref: inputRef,
          class: classNames(styles, 'spectrum-ToggleSwitch-input')
        }))} />}
      </FocusRing>
      <span class={classNames(styles, 'spectrum-ToggleSwitch-switch')} />
      {props.children && (
        <span class={classNames(styles, 'spectrum-ToggleSwitch-label')}>{props.children}</span>
      )}
    </label>
  );
}
