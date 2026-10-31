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

import {DialogContext} from './context';
import {Modal} from '../overlays/Modal';
import {createMemo} from 'solid-js';
import {JSX} from '@solidjs/web';
import {useOverlayTriggerState} from 'react-stately/useOverlayTriggerState';

export interface SpectrumDialogContainerProps {
  /** The Dialog to display, if any. */
  children?: JSX.Element;
  /** Handler that is called when the 'x' button of a dismissable Dialog is clicked. */
  onDismiss: () => void;
  /**
   * The type of Dialog that should be rendered. See the visual options below for examples of each.
   *
   * @default 'modal'
   */
  type?: 'modal' | 'fullscreen' | 'fullscreenTakeover';
  /**
   * Whether the Dialog is dismissable. See the [Dialog docs](Dialog.html#dismissable-dialogs) for
   * more details.
   */
  isDismissable?: boolean;
  /** Whether pressing the escape key to close the dialog should be disabled. */
  isKeyboardDismissDisabled?: boolean;
}

/**
 * A DialogContainer accepts a single Dialog as a child, and manages showing and hiding
 * it in a modal. Useful in cases where there is no trigger element
 * or when the trigger unmounts while the dialog is open.
 */
export function DialogContainer(props: SpectrumDialogContainerProps): JSX.Element {
  let context = {
    get type() { return props.type ?? 'modal' as const; },
    onClose: () => props.onDismiss(),
    get isDismissable() { return props.isDismissable; }
  };

  // Resolve the lazy child inside its actual dialog context, not in the
  // container's outer setup owner.
  return <DialogContext value={context}><DialogContainerContent {...props} /></DialogContext>;
}

function DialogContainerContent(props: SpectrumDialogContainerProps): JSX.Element {
  let child = createMemo(() => {
    // Inspect the direct composition boundary before resolving a component's
    // output. One FocusScope, for example, renders several sentinel/content
    // nodes but is still one dialog child.
    let content = props.children;
    let childArray = Array.isArray(content)
      ? content.filter(child => child != null && typeof child !== 'boolean')
      : content == null || typeof content === 'boolean' ? [] : [content];
    if (childArray.length > 1) {
      throw new Error('Only a single child can be passed to DialogContainer.');
    }
    let candidate = childArray[0];
    return typeof candidate === 'function' || (typeof candidate === 'object' && candidate !== null)
      ? candidate : null;
  });
  // Preserve the last dialog during Modal's exit transition, just as the
  // source retains its last React element after children become empty.
  let lastChild = createMemo<JSX.Element>(previous => child() ?? previous ?? null);

  let state = useOverlayTriggerState({
    get isOpen() { return !!child(); },
    onOpenChange: isOpen => {
      if (!isOpen) {
        props.onDismiss();
      }
    }
  });

  return (
    <Modal
      state={state}
      type={props.type ?? 'modal'}
      isDismissable={props.isDismissable}
      isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}>
      {lastChild()}
    </Modal>
  );
}
