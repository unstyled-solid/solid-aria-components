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

import type {RefObject} from '@react-types/shared';
import {createEffect, onSettled, untrack} from 'solid-js';
import {useEvent} from './useEvent';

export interface LoadMoreProps {
  /** Whether data is currently being loaded. */
  isLoading?: boolean;
  /** Handler that is called when more items should be loaded, e.g. while scrolling near the bottom. */
  onLoadMore?: () => void;
  /**
   * The amount of offset from the bottom of your scrollable region that should trigger load more.
   * Uses a percentage value relative to the scroll body's client height. Load more is then
   * triggered when your current scroll position's distance from the bottom of the currently loaded
   * list of items is less than or equal to the provided value. (e.g. 1 = 100% of the scroll
   * region's height).
   *
   * @default 1
   */
  scrollOffset?: number;
  /** The data currently loaded. */
  items?: any;
}

export function useLoadMore(props: LoadMoreProps, ref: RefObject<HTMLElement | null>): void {
  // Handle scrolling, and call onLoadMore when nearing the bottom.
  let isLoading = untrack(() => props.isLoading);
  let previousPolicy: readonly unknown[] = untrack(() => [props.isLoading, props.onLoadMore, props.scrollOffset, props.items]);
  let onScroll = () => {
    if (ref.current && !isLoading && props.onLoadMore) {
      let shouldLoadMore =
        ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight <
        ref.current.clientHeight * (props.scrollOffset ?? 1);

      if (shouldLoadMore) {
        isLoading = true;
        props.onLoadMore();
      }
    }
  };

  let lastItems = untrack(() => props.items);
  createEffect(() => ({
    element: ref.current,
    policy: [props.isLoading, props.onLoadMore, props.scrollOffset, props.items] as const
  }), ({element, policy}) => {
    // Only update isLoadingRef if props object actually changed,
    // not if a local state change occurred.
    if (policy.some((value, index) => value !== previousPolicy[index])) {
      isLoading = policy[0];
      previousPolicy = policy;
    }
    let cancelled = false;
    onSettled(() => {
    if (cancelled || ref.current !== element) {return;}
    let items = policy[3];
    // TODO: Eventually this hook will move back into RAC during which we will accept the collection as a option to this hook.
    // We will only load more if the collection has changed after the last load to prevent multiple onLoadMore from being called
    // while the data from the last onLoadMore is being processed by RAC collection.
    let shouldLoadMore =
      ref?.current &&
       !isLoading &&
       props.onLoadMore &&
       (!items || items !== lastItems) &&
      ref.current.clientHeight === ref.current.scrollHeight;

    if (shouldLoadMore) {
      isLoading = true;
      props.onLoadMore?.();
    }

    lastItems = items;
    });
    return () => {cancelled = true;};
  });

  // TODO: maybe this should still just return scroll props?
  // Test against case where the ref isn't defined when this is called
  // Think this was a problem when trying to attach to the scrollable body of the table in OnLoadMoreTableBodyScroll
  useEvent(ref, 'scroll', onScroll);
}
