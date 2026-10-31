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

import {merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {ToastContainer} from '../../../stories/toast/Example';
import {ToastStateProps} from 'react-stately/useToastState';

const metadata = {
  title: 'useToast',
  args: {
    maxVisibleToasts: 1,
    timeout: null
  },
  argTypes: {
    timeout: {
      control: 'radio',
      options: [null, 5000] as const
    }
  }
};
export default metadata;

let count = 0;

let ToastStory = (props: ToastStateProps & {timeout?: number | null}): JSX.Element => (
  <ToastContainer {...props}>
    {state => (
      <>
        <button onClick={() => state.add('Mmmmm toast ' + ++count, {timeout: props.timeout ?? undefined})}>
          Add toast
        </button>
      </>
    )}
  </ToastContainer>
);

export const Default = (args: ToastStateProps & {timeout?: number | null}) => <ToastStory {...merge(metadata.args, args)} />;
