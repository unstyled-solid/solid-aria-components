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

import {DOMAttributes} from '@react-types/shared';
import type {JSX} from '@solidjs/web';
import {useId} from '../utils/useId';

export interface AriaListBoxSectionProps {
  /** The heading for the section. */
  heading?: JSX.Element;
  /** An accessibility label for the section. Required if `heading` is not present. */
  'aria-label'?: string;
}

export interface ListBoxSectionAria {
  /** Props for the wrapper list item. */
  itemProps: DOMAttributes;

  /** Props for the heading element, if any. */
  headingProps: DOMAttributes;

  /** Props for the group element. */
  groupProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a section in a listbox.
 * See `useListBox` for more details about listboxes.
 *
 * @param props - Props for the section.
 */
export function useListBoxSection(props: AriaListBoxSectionProps): ListBoxSectionAria {
  let headingId = useId();
  let headingProps: DOMAttributes = {
    get id() { return headingId(); },
    role: 'presentation',
    onMouseDown: e => e.preventDefault()
  };

  return {
    itemProps: {
      role: 'presentation'
    },
    // Preserve the conditional source bag while its heading can change.
    headingProps: new Proxy(headingProps, {
      get: (target, key) => props.heading ? Reflect.get(target, key) : undefined,
      has: (target, key) => Boolean(props.heading) && key in target,
      ownKeys: target => props.heading ? Reflect.ownKeys(target) : [],
      getOwnPropertyDescriptor: (target, key) => props.heading ? Reflect.getOwnPropertyDescriptor(target, key) : undefined
    }),
    groupProps: {
      role: 'group',
      get 'aria-label'() { return props['aria-label']; },
      get 'aria-labelledby'() { return props.heading ? headingId() : undefined; }
    }
  };
}
