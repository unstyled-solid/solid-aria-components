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

import {FocusableElement} from '@react-types/shared';
import {mergeProps} from '../utils/mergeProps';
import {PressProps} from './usePress';
import {PressResponderContext} from './context';
import {omit, onSettled, untrack, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from '../utils/useObjectRef';
import {useSyncRef} from '../utils/useSyncRef';

interface PressResponderProps extends PressProps {
  children: JSX.Element;
  ref?: Ref<FocusableElement>;
}

export function PressResponder(props: PressResponderProps): JSX.Element {
    let isRegistered = false;
    let prevContext = useContext(PressResponderContext);
    // oxlint-disable-next-line react/react-compiler
    let context = mergeProps(omit(prevContext, 'ref'), omit(props, 'children', 'ref'), {
      register() {
        isRegistered = true;
        if (prevContext) {
          prevContext.register();
        }
      },
      // The attachment handle is established once, just like other native ref
      // bridges. S6's live prop bag may derive this stable handle reactively.
      ref: useObjectRef(untrack(() => props.ref || prevContext?.ref))
    });
    useSyncRef(prevContext, context.ref);

    onSettled(() => {
      if (!isRegistered) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            'A PressResponder was rendered without a pressable child. ' +
              'Either call the usePress hook, or wrap your DOM node with <Pressable> component.'
          );
        }
        isRegistered = true;
      }
    });

    return (
      <PressResponderContext value={context}>{props.children}</PressResponderContext>
    );
}

export function ClearPressResponder(props: {children: JSX.Element}): JSX.Element {
  let context = {register: () => {}};
  return (
    <PressResponderContext value={context}>{props.children}</PressResponderContext>
  );
}
