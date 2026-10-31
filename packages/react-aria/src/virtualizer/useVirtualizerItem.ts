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

import {isElementVisible} from '../utils/isElementVisible';
import {Key, RefObject} from '@react-types/shared';
import {LayoutInfo, Size} from 'react-stately/useVirtualizerState';
import {createEffect} from 'solid-js';

interface IVirtualizer {
  updateItemSize(key: Key, size: Size): void;
}

export interface VirtualizerItemOptions {
  layoutInfo: LayoutInfo | null;
  virtualizer: IVirtualizer;
  ref: RefObject<HTMLElement | null>;
  shouldObserveItemSize?: boolean;
}

export function useVirtualizerItem(options: VirtualizerItemOptions): {updateSize: () => void} {
  let measure = (key: Key | null | undefined, element: HTMLElement | null, virtualizer: IVirtualizer) => {
    if (key != null && element) {
      // if the virtualized item is not visible (aka display none on virtualized collection),
      // we want to avoid reporting size 0 otherwise we get into a state where the virtualizer renders 0 items
      // when it is hidden and thus won't remeasure when it is is unhidden
      if (!isElementVisible(element)) {
        return;
      }
      let size = getSize(element);
      virtualizer.updateItemSize(key, size);
    }
  };
  let updateSize = () => measure(options.layoutInfo?.key, options.ref.current, options.virtualizer);

  createEffect(() => ({layoutInfo: options.layoutInfo, element: options.ref.current, virtualizer: options.virtualizer}), ({layoutInfo, element, virtualizer}) => {
    if (layoutInfo?.estimatedSize) {
      measure(layoutInfo.key, element, virtualizer);
    }
  });

  // TODO: Consider using a MutationObserver in addition to ResizeObserver to detect
  // when inner DOM structure changes cause an item's height to change.
  // The current ResizeObserver only observes direct children,
  // so mutations deeper in the tree won't trigger a remeasure, leading to stale cached heights and overlapping items.
  // useResizeObserver observes one element via ref, but the wrapper height is fixed by layout
  // and won't change when content grows. Observe direct children instead, then remeasure the
  // wrapper in updateSize.
  createEffect(() => ({shouldObserveItemSize: options.shouldObserveItemSize, el: options.ref.current, key: options.layoutInfo?.key}), ({shouldObserveItemSize, el}) => {
    if (!shouldObserveItemSize) {
      return;
    }

    if (!el || typeof ResizeObserver === 'undefined') {
      return;
    }

    let active = true;
    let resizeObserver = new ResizeObserver(entries => {
      if (!active || !entries.length) {
        return;
      }
      updateSize();
    });

    for (let child of el.children) {
      resizeObserver.observe(child);
    }

    return () => {
      active = false;
      resizeObserver.disconnect();
    };
  });

  return {updateSize};
}

function getSize(node: HTMLElement): Size {
  // Reset height before measuring so we get the intrinsic size
  let height = node.style.height;
  node.style.height = '';
  let size = new Size(node.scrollWidth, node.scrollHeight);
  node.style.height = height;
  return size;
}
