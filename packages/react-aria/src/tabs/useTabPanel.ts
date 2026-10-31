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

import {AriaLabelingProps, DOMAttributes, DOMProps, Key, RefObject} from '@react-types/shared';
import {generateId} from './utils';
import {mergeProps} from '../utils/mergeProps';
import {TabListState} from 'react-stately/useTabListState';
import {useHasTabbableChild} from '../focus/useHasTabbableChild';
import {useLabels} from '../utils/useLabels';
import {merge} from 'solid-js';

export interface AriaTabPanelProps extends Omit<DOMProps, 'id'>, AriaLabelingProps {
  /** The unique id of the tab. */
  id?: Key;
}

export interface TabPanelAria {
  /** Props for the tab panel element. */
  tabPanelProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a tab panel. A tab panel is a
 * container for the contents of a tab, and is shown when the tab is selected.
 */
export function useTabPanel<T>(
  props: AriaTabPanelProps,
  state: TabListState<T> | null,
  ref: RefObject<Element | null>
): TabPanelAria {
  // The tabpanel should have tabIndex=0 when there are no tabbable elements within it.
  // Otherwise, tabbing from the focused tab should go directly to the first tabbable element
  // within the tabpanel.
  let hasTabbableChild = useHasTabbableChild(ref);

  const tabPanelProps = useLabels(merge(props, {
    get id() { return generateId(state, props.id ?? state?.selectedKey, 'tabpanel'); },
    get 'aria-labelledby'() { return generateId(state, state?.selectedKey, 'tab'); }
  }));

  return {
    tabPanelProps: mergeProps(tabPanelProps, {
      get tabIndex() { return hasTabbableChild() ? undefined : 0; },
      role: 'tabpanel' as const,
      get 'aria-describedby'() { return props['aria-describedby']; },
      get 'aria-details'() { return props['aria-details']; }
    })
  };
}
