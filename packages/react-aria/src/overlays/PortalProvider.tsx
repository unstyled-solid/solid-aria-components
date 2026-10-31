/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {createContext, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';

export interface PortalProviderProps {
  /** Should return the element where we should portal to. Can clear the context by passing null. */
  getContainer?: (() => HTMLElement | null) | null;
  /**
   * The content of the PortalProvider. Should contain all children that want to portal their
   * overlays to the element returned by the provided `getContainer()`.
   */
  children: JSX.Element;
}

export interface PortalProviderContextValue extends Omit<PortalProviderProps, 'children'> {}

export const PortalContext =
  createContext<PortalProviderContextValue>({});

/**
 * Sets the portal container for all overlay elements rendered by its children.
 */
export function UNSAFE_PortalProvider(props: PortalProviderProps): JSX.Element {
  let parent = useUNSAFE_PortalContext();
  let value: PortalProviderContextValue = {
    get getContainer() {
      return props.getContainer === null ? undefined : (props.getContainer ?? parent.getContainer);
    }
  };
  return (
    <PortalContext value={value}>
      {props.children}
    </PortalContext>
  );
}

export function useUNSAFE_PortalContext(): PortalProviderContextValue {
  return useContext(PortalContext) ?? {};
}
