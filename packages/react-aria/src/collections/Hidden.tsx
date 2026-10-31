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

import type {Context, Element as ReactElement, Element as ReactNode, Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {createContext, createEffect, untrack, useContext} from 'solid-js';
import {attachRef, useObjectRef} from '../utils/useObjectRef';

// The React-specific global HTMLTemplateElement monkey patch is not needed by
// the native renderer. Keep template content isolated from the accessible DOM.

export const HiddenContext: Context<boolean> = createContext<boolean>(false);

export function Hidden(props: {children: ReactNode}): JSX.Element {
  let isHidden = useContext(HiddenContext);

  if (isHidden) {
    // Don't hide again if we are already hidden.
    return <>{props.children}</>;
  }


  // In SSR, portals are not supported by React. Instead, always render into a <template>
  // element, which the browser will never display to the user. In addition, the
  // content is not part of the accessible DOM tree, so it won't affect ids or other accessibility attributes.
  return <template><HiddenContext value>{props.children}</HiddenContext></template>;
}

/** Creates a component that forwards its ref and returns null if it is in a hidden subtree. */
// Note: this function is handled specially in the documentation generator. If you change it, you'll need to update DocsTransformer as well.
export function createHideableComponent<T, P = {}>(
  fn: (props: P, ref: Ref<T>) => ReactElement | null
): (props: P & {ref?: Ref<T>}) => ReactElement | null {
  let Wrapper = (props: P & {ref?: Ref<T>}) => {
    let isHidden = useContext(HiddenContext);
    if (isHidden) {
      return null;
    }

    // oxlint-disable-next-line react/react-compiler
    let deliveredRef: Ref<T>;
    let forwardedRef = useObjectRef<T>(node => {
      // Preserve synchronous source attachment; A's bridge owns delivery/cleanup.
      deliveredRef = props.ref;
      return attachRef(deliveredRef as any, node);
    });
    createEffect(() => props.ref, target => {
      let node = untrack(() => forwardedRef.current);
      if (node && target !== deliveredRef) {
        forwardedRef(null);
        forwardedRef(node);
      }
    });
    return fn(props, forwardedRef);
  };
  // @ts-ignore - for react dev tools
  Wrapper.displayName = fn.displayName || fn.name;
  return Wrapper;
}

/** Returns whether the component is in a hidden subtree. */
export function useIsHidden(): boolean {
  return useContext(HiddenContext);
}
