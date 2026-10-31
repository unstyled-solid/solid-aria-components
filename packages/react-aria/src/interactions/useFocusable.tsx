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

import {
  DOMAttributes,
  FocusableDOMProps,
  FocusableElement,
  FocusableProps,
  RefObject
} from '@react-types/shared';
import {focusSafely} from './focusSafely';
import {getOwnerWindow} from '../utils/domHelpers';
import {isFocusable} from '../utils/isFocusable';
import {mergeProps} from '../utils/mergeProps';
import {Element as Renderable, onSettled, omit, untrack, useContext} from 'solid-js';
import type {Ref} from '../utils/useObjectRef';
import {useFocus} from './useFocus';
import {useKeyboard} from './useKeyboard';
import {useObjectRef} from '../utils/useObjectRef';
import {useSyncRef} from '../utils/useSyncRef';

export interface FocusableOptions<T = FocusableElement>
  extends FocusableProps<T>, FocusableDOMProps {
  /** Whether focus should be disabled. */
  isDisabled?: boolean;
}

export interface FocusableProviderProps extends Omit<DOMAttributes, 'ref'> {
  /** The child element to provide DOM props to. */
  children?: Renderable;
  ref?: Ref<FocusableElement>;
}

import {FocusableContext, FocusableContextValue} from './FocusableContext';
export {FocusableContext} from './FocusableContext';

function useFocusableContext(ref: RefObject<FocusableElement | null>): Omit<FocusableContextValue, 'ref'> {
  let context = useContext(FocusableContext) || {};
  useSyncRef(context, ref);

  // eslint-disable-next-line
  return omit(context, 'ref');
}

/**
 * Provides DOM props to the nearest focusable child.
 */
export function FocusableProvider(props: FocusableProviderProps) {
  let objRef = useObjectRef(props.ref);
  let context = mergeProps(omit(props, 'children', 'ref'), {ref: objRef});
  return <FocusableContext value={context}>{props.children}</FocusableContext>;
}

export interface FocusableAria {
  /** Props for the focusable element. */
  focusableProps: DOMAttributes;
}

/**
 * Used to make an element focusable and capable of auto focus.
 */
export function useFocusable<T extends FocusableElement = FocusableElement>(
  props: FocusableOptions<T>,
  domRef: RefObject<FocusableElement | null>
): FocusableAria {
  let {focusProps} = useFocus(props);
  let {keyboardProps} = useKeyboard(props);
  let interactions = mergeProps(focusProps, keyboardProps);
  let domProps = useFocusableContext(domRef);
  let interactionProps = new Proxy(domProps, {get(target, key) { return props.isDisabled ? undefined : Reflect.get(target, key); }});
  // Source useRef captures autoFocus only on initial setup; subsequent prop
  // changes must not request another autofocus after the settled mount.
  let autoFocusRef = {current: untrack(() => props.autoFocus)};

  onSettled(() => {
    if (autoFocusRef.current && domRef.current) {
      focusSafely(domRef.current);
    }
    autoFocusRef.current = false;
  });

  // Always set a tabIndex so that Safari allows focusing native buttons and inputs.
  return {
    focusableProps: mergeProps(
      {
        get onFocusIn() { return interactions.onFocusIn; },
        get onFocusOut() { return interactions.onFocusOut; },
        get onKeyDown() { return interactions.onKeyDown; },
        get onKeyUp() { return interactions.onKeyUp; },
        get tabIndex() { return props.isDisabled ? undefined : props.excludeFromTabOrder ? -1 : 0; }
      },
      interactionProps
    )
  };
}

export interface FocusableComponentProps extends FocusableOptions {
  children: (props: DOMAttributes & {ref: (element: FocusableElement | null) => void}) => Renderable;
  ref?: Ref<FocusableElement>;
}

export function Focusable(props: FocusableComponentProps) {
    let ref = useObjectRef(props.ref);
    let {focusableProps} = useFocusable(props, ref);

    onSettled(() => {
      if (process.env.NODE_ENV === 'production') {
        return;
      }

      let el = ref.current;
      if (!el || !(el instanceof getOwnerWindow(el).Element)) {
        console.error('<Focusable> child must forward its ref to a DOM element.');
        return;
      }

      if (!props.isDisabled && !isFocusable(el, {skipVisibilityCheck: true})) {
        console.warn(
          '<Focusable> child must be focusable. Please ensure the tabIndex prop is passed through.'
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
        el.localName !== 'summary' &&
        el.localName !== 'img' &&
        el.localName !== 'svg'
      ) {
        let role = el.getAttribute('role');
        if (!role) {
          console.warn('<Focusable> child must have an interactive ARIA role.');
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
          role !== 'tabpanel' &&
          role !== 'textbox' &&
          role !== 'treeitem' &&
          // aria-describedby is also announced on these roles
          role !== 'img' &&
          role !== 'meter' &&
          role !== 'progressbar'
        ) {
          console.warn(`<Focusable> child must have an interactive ARIA role. Got "${role}".`);
        }
      }
    });
    return props.children(mergeProps(focusableProps, {ref}));
}
