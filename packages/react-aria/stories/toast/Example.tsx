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

import {createContext, For, omit, useContext, type Element} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {ToastState, ToastStateProps, useToastState} from 'react-stately/useToastState';
import {useButton} from '../../src/button/useButton';
import {useToast} from '../../src/toast/useToast';
import {useToastRegion} from '../../src/toast/useToastRegion';

const ToastContext = createContext<ToastState<string> | null>(null);

export function ToastContainer(props: ToastStateProps & {children: (state: ToastState<string>) => Element}): JSX.Element {
  let state = useToastState<string>(omit(props, 'children'));
  return (
    <ToastContext value={state}>
      {props.children(state)}
      <ToastRegion />
    </ToastContext>
  );
}

function ToastRegion() {
  let state = useContext(ToastContext)!;
  let ref = useObjectRef<HTMLDivElement>();
  let {regionProps} = useToastRegion({}, state, ref);
  return (
    <div
      {...regionProps}
      ref={ref}
      style={{
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        display: 'flex',
        'flex-direction': 'column',
        gap: '10px'
      }}>
      <For each={state.visibleToasts} keyed={toast => toast.key}>
        {toast => <Toast toast={toast()} />}
      </For>
    </div>
  );
}

function Toast(props: import('../../src/toast/useToast').AriaToastProps<string>) {
  let state = useContext(ToastContext)!;
  let ref = useObjectRef<HTMLDivElement>();
  let {toastProps, contentProps, titleProps, closeButtonProps} = useToast(props, state, ref);
  let buttonRef = useObjectRef<HTMLButtonElement>();
  let {buttonProps} = useButton(closeButtonProps, buttonRef);

  return (
    <div {...toastProps as JSX.HTMLAttributes<HTMLDivElement>} ref={ref} style={{margin: '20px', display: 'flex', gap: '5px'}}>
      <div {...contentProps as JSX.HTMLAttributes<HTMLDivElement>}>
        <div {...titleProps as JSX.HTMLAttributes<HTMLDivElement>}>{props.toast.content}</div>
      </div>
      <button {...buttonProps as JSX.ButtonHTMLAttributes<HTMLButtonElement>} ref={buttonRef}>
        x
      </button>
    </div>
  );
}
