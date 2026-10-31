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

import type {RefObject} from '@react-types/shared';
import {OpenTransition, type OpenTransitionRenderProps} from './OpenTransition';
import type {DOMRef} from '../utils/useDOMRef';
import {Provider} from '../provider/Provider';
import {createSignal, Show, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Overlay as ReactAriaOverlay} from 'react-aria/Overlay';

export interface OverlayProps {
  children: (props: OpenTransitionRenderProps) => JSX.Element;
  ref?: DOMRef<HTMLDivElement>;
  isOpen?: boolean;
  container?: Element;
  isKeyboardDismissDisabled?: boolean;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  nodeRef: RefObject<HTMLElement | null>;
  disableFocusManagement?: boolean;
  shouldContainFocus?: boolean;
}

export function Overlay(props: OverlayProps): JSX.Element {
  // A one-time initial status, not a reactive projection of `isOpen`.
  let [exited, setExited] = createSignal(untrack(() => !props.isOpen));

  let handleEntered = () => {
    setExited(false);
    props.onEntered?.();
  };

  let handleExited = () => {
    setExited(true);
    props.onExited?.();
  };

  // Don't un-render the overlay while it's transitioning out.
  let mountOverlay = () => props.isOpen || !exited();

  return (
    <Show when={mountOverlay()}><ReactAriaOverlay
      portalContainer={props.container}
      disableFocusManagement={props.disableFocusManagement}
      shouldContainFocus={props.shouldContainFocus}
      isExiting={!props.isOpen}>
      <Provider
        ref={props.ref}
        UNSAFE_style={{background: 'transparent', isolation: 'isolate'}}
        isDisabled={false}>
        <OpenTransition
          in={props.isOpen}
          appear
          onExit={() => props.onExit?.()}
          onExiting={() => props.onExiting?.()}
          onExited={handleExited}
          onEnter={() => props.onEnter?.()}
          onEntering={() => props.onEntering?.()}
          onEntered={handleEntered}
          nodeRef={props.nodeRef}>
          {transition => props.children(transition)}
        </OpenTransition>
      </Provider>
    </ReactAriaOverlay></Show>
  );
}
