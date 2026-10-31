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

import {DOMAttributes, FocusableElement} from '@react-types/shared';
import {getOwnerWindow} from '../utils/domHelpers';
import {isFocusable} from '../utils/isFocusable';
import {mergeProps} from '../utils/mergeProps';
import {PressProps, usePress} from './usePress';
import {createEffect, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useFocusable} from './useFocusable';
import {useObjectRef, type Ref} from '../utils/useObjectRef';

export interface PressableProps extends PressProps {
  /** Native composition: spread the live props (including ref) onto one host. */
  children: (props: DOMAttributes & {ref: JSX.Ref<FocusableElement>}) => JSX.Element;
  ref?: Ref<FocusableElement>;
}

export function Pressable(props: PressableProps): JSX.Element {
    let ref = useObjectRef<FocusableElement>(props.ref);
    let hookProps = omit(props, 'children', 'ref');
    let {pressProps} = usePress(mergeProps(hookProps, {ref}));
    let {focusableProps} = useFocusable(hookProps, ref);

    createEffect(() => ({el: ref.current, isDisabled: props.isDisabled}), ({el, isDisabled}) => {
      if (process.env.NODE_ENV === 'production') {
        return;
      }

      if (!el || !(el instanceof getOwnerWindow(el).Element)) {
        console.error('<Pressable> child must forward its ref to a DOM element.');
        return;
      }

      if (!isDisabled && !isFocusable(el, {skipVisibilityCheck: true})) {
        console.warn(
          '<Pressable> child must be focusable. Please ensure the tabIndex prop is passed through.'
        );
        return;
      }

      if (
        el.localName !== 'button' &&
        el.localName !== 'input' &&
        el.localName !== 'select' &&
        el.localName !== 'textarea' &&
        el.localName !== 'a' &&
        el.localName !== 'area' &&
        el.localName !== 'summary'
      ) {
        let role = el.getAttribute('role');
        if (!role) {
          console.warn('<Pressable> child must have an interactive ARIA role.');
        } else if (
          // https://w3c.github.io/aria/#widget_roles
          role !== 'application' &&
          role !== 'button' &&
          role !== 'checkbox' &&
          role !== 'combobox' &&
          role !== 'gridcell' &&
          role !== 'link' &&
          role !== 'menuitem' &&
          role !== 'menuitemcheckbox' &&
          role !== 'menuitemradio' &&
          role !== 'option' &&
          role !== 'radio' &&
          role !== 'searchbox' &&
          role !== 'separator' &&
          role !== 'slider' &&
          role !== 'spinbutton' &&
          role !== 'switch' &&
          role !== 'tab' &&
          role !== 'textbox' &&
          role !== 'treeitem'
        ) {
          console.warn(`<Pressable> child must have an interactive ARIA role. Got "${role}".`);
        }
      }
    });

    let childProps = mergeProps(pressProps, focusableProps, {ref});
    return <>{props.children(childProps)}</>;
}
