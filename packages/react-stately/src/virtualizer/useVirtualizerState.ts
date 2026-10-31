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

import {Collection, Key} from '@react-types/shared';
import {InvalidationContext} from './types';
import {Layout} from './Layout';
import {createEffect, createMemo, createSignal, onSettled, untrack} from 'solid-js';
import {Rect} from './Rect';
import {ReusableView} from './ReusableView';
import {Size} from './Size';
import {Virtualizer} from './Virtualizer';

interface VirtualizerProps<T extends object, V, O> {
  // DOM consumers return lazy JSX values, resolved beneath the reusable row's
  // owner. The source content cache must not retain a memo-owned mounted subtree.
  renderView(type: string, content: T | null): V;
  layout: Layout<T>;
  collection: Collection<T>;
  onVisibleRectChange(rect: Rect): void;
  persistedKeys?: Set<Key> | null;
  layoutOptions?: O;
  allowsWindowScrolling?: boolean;
}

export interface VirtualizerState<T extends object, V> {
  // Live projection boundary: row/branch getters must read this before reading
  // mutable ReusableView fields, including when a pooled view keeps its identity.
  visibleViews: ReusableView<T, V>[];
  setVisibleRect: (rect: Rect) => void;
  size: Size;
  setSize: (size: Size) => void;
  contentSize: Size;
  virtualizer: Virtualizer<T, V>;
  isScrolling: boolean;
  startScrolling: () => void;
  endScrolling: () => void;
}

export function useVirtualizerState<T extends object, V, O = any>(
  opts: VirtualizerProps<T, V, O>
): VirtualizerState<T, V> {
  let [visibleRect, setRect] = createSignal(new Rect(0, 0, 0, 0));
  let [size, setSize] = createSignal(new Size());
  let [isScrolling, setScrolling] = createSignal(false);
  let [invalidationContext, setInvalidationContext] = createSignal<InvalidationContext>({});
  let visibleRectChanged = false;
  let requestedRect: Rect | null = null;
  let viewportGeneration = 0;
  let setVisibleRect = (rect: Rect) => {
    viewportGeneration++;
    setRect(rect);
  };

  // Setup owns one mutable source engine. Rendering projects its reusable views;
  // a layout's viewport correction is an explicit request, not a write from a
  // memo back into its own input. The settled effect below accepts that request.
  let virtualizer = untrack(() => new Virtualizer<T, V>({
    collection: opts.collection,
    layout: opts.layout,
    delegate: {
      setVisibleRect(rect) {
        requestedRect = rect;
      },
      // TODO: should changing these invalidate the entire cache?
      renderView: (type, content) => opts.renderView(type, content),
      invalidate: context => setInvalidationContext(context)
    }
  }));

  let mergedInvalidationContext = createMemo(() => {
    if (opts.layoutOptions != null) {
      return {...invalidationContext(), layoutOptions: opts.layoutOptions};
    }
    return invalidationContext();
  });

  let projection = createMemo(() => {
    requestedRect = null;
    let rect = visibleRect();
    let visibleViews = virtualizer.render({
      layout: opts.layout,
      collection: opts.collection,
      persistedKeys: opts.persistedKeys,
      layoutOptions: opts.layoutOptions,
      visibleRect: rect,
      size: opts.allowsWindowScrolling ? size() : rect,
      invalidationContext: mergedInvalidationContext(),
      isScrolling: isScrolling()
    });
    return {visibleViews, contentSize: virtualizer.contentSize, rect, requestedRect: requestedRect as Rect | null};
  });

  // Preserve the engine's early-return/new-render scroll-anchor scheduling and
  // publish scroll positions only after the matching DOM projection has settled.
  createEffect(projection, result => {
    let generation = viewportGeneration;
    let cancelled = false;
    onSettled(() => {
      if (cancelled || generation !== viewportGeneration) {
        return;
      }
      if (result.requestedRect) {
        visibleRectChanged = true;
        setVisibleRect(result.requestedRect);
      } else if (visibleRectChanged) {
        visibleRectChanged = false;
        opts.onVisibleRectChange(result.rect);
      }
    });
    return () => { cancelled = true; };
  });

  return {
    virtualizer,
    get visibleViews() { return projection().visibleViews; },
    setVisibleRect,
    get size() { return size(); },
    setSize: value => { setSize(value); },
    get contentSize() { return projection().contentSize; },
    get isScrolling() { return isScrolling(); },
    startScrolling: () => { setScrolling(true); },
    endScrolling: () => { setScrolling(false); }
  };
}
