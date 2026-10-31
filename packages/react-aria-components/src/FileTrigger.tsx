/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {filterDOMProps} from 'react-aria/filterDOMProps';

import {getEventTarget} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {GlobalDOMAttributes} from '@react-types/shared';
import {Input} from './Input';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {omit, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {Ref} from 'react-aria/private/utils/useObjectRef';
import {useObjectRef} from 'react-aria/useObjectRef';

export interface FileTriggerProps extends GlobalDOMAttributes<HTMLInputElement> {
  /**
   * Specifies what mime type of files are allowed.
   */
  acceptedFileTypes?: ReadonlyArray<string>;
  /**
   * Whether multiple files can be selected.
   */
  allowsMultiple?: boolean;
  /**
   * Specifies the use of a media capture mechanism to capture the media on the spot.
   */
  defaultCamera?: 'user' | 'environment';
  /**
   * Handler when a user selects a file.
   */
  onSelect?: (files: FileList | null) => void;
  /**
   * The children of the component.
   */
  children?: JSX.Element;
  ref?: ForwardedRef<HTMLInputElement>;
  /**
   * Enables the selection of directories instead of individual files.
   */
  acceptDirectory?: boolean;
}

/**
 * A FileTrigger allows a user to access the file system with any pressable React Aria or React
 * Spectrum component, or custom components built with usePress.
 */
export function FileTrigger(props: FileTriggerProps) {
  let rest = omit(props, 'onSelect', 'acceptedFileTypes', 'allowsMultiple', 'defaultCamera', 'children', 'acceptDirectory', 'ref');
  let inputRef = useObjectRef<HTMLInputElement>(props.ref as Ref<HTMLInputElement>);
  let domProps = filterDOMProps(rest, {global: true});

  return (
    <>
      <PressResponder
        onPress={() => {
          if (inputRef.current?.value) {
            inputRef.current.value = '';
          }
          inputRef.current?.click();
        }}>
        {props.children}
      </PressResponder>
      <Input
        {...domProps}
        className=""
        type="file"
        ref={inputRef}
        onClick={e => e.stopPropagation()}
        style={{display: 'none'}}
        accept={props.acceptedFileTypes?.toString()}
        onChange={e => props.onSelect?.((getEventTarget(e) as HTMLInputElement).files)}
        capture={props.defaultCamera}
        multiple={props.allowsMultiple}
        webkitdirectory={props.acceptDirectory ? '' : undefined}
      />
    </>
  );
}
