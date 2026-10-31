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

import {ClearPressResponder} from '../interactions/PressResponder';
import {FocusableContext} from '../interactions/useFocusable';
import {FocusScope} from '../focus/FocusScope';
import {createContext, createMemo, createSignal, onSettled, Show, useContext} from 'solid-js';
import {Portal, type JSX} from '@solidjs/web';
import {useIsSSR} from '../ssr/SSRProvider';
import {useUNSAFE_PortalContext} from './PortalProvider';

export interface OverlayProps {
  /**
   * The container element in which the overlay portal will be placed.
   *
   * @default document.body
   */
  portalContainer?: Element;
  /** The overlay to render in the portal. */
  children: JSX.Element;
  /**
   * Disables default focus management for the overlay, including containment and restoration.
   * This option should be used very carefully. When focus management is disabled, you must
   * implement focus containment and restoration to ensure the overlay is keyboard accessible.
   */
  disableFocusManagement?: boolean;
  /**
   * Whether to contain focus within the overlay.
   */
  shouldContainFocus?: boolean;
  /**
   * Whether the overlay is currently performing an exit animation. When true,
   * focus is allowed to move outside.
   */
  isExiting?: boolean;
}

export const OverlayContext = createContext<{
  contain: boolean;
  setContain: (value: boolean | ((previous: boolean) => boolean)) => void;
} | null>(null);

/**
 * A container which renders an overlay such as a popover or modal in a portal,
 * and provides a focus scope for the child elements.
 */
export function Overlay(props: OverlayProps): JSX.Element {
  let isSSR = useIsSSR();
  let [contain, setContain] = createSignal(false);
  let contextValue = {get contain() { return contain(); }, setContain};
  let portalContext = useUNSAFE_PortalContext();
  let portalContainer = createMemo(() => {
    if (!props.portalContainer && portalContext.getContainer) {
      return portalContext.getContainer();
    }
    return props.portalContainer === undefined ? (isSSR() ? null : document.body) : props.portalContainer;
  });

  return <Show when={!!portalContainer()}><Portal mount={portalContainer()!}>
    <OverlayContext value={contextValue}>
      <ClearPressResponder>
        <FocusableContext value={null}>
          <Show when={!props.disableFocusManagement} fallback={props.children}>
            <FocusScope restoreFocus contain={(props.shouldContainFocus || contain()) && !props.isExiting}>
              {props.children}
            </FocusScope>
          </Show>
        </FocusableContext>
      </ClearPressResponder>
    </OverlayContext>
    </Portal></Show>;
}

/** @private */
export function useOverlayFocusContain(): void {
  let ctx = useContext(OverlayContext);
  let setContain = ctx?.setContain;
  onSettled(() => {
    setContain?.(true);
  });
}
