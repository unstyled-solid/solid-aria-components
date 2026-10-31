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

import {createContext, createMemo, For} from 'solid-js';
import type {Element as ReactNode} from 'solid-js';
import {Key} from '@react-types/shared';

export interface CachedChildrenOptions<T> {
  /** Item objects in the collection. */
  items?: Iterable<T>;
  /** The contents of the collection. */
  children?: ReactNode | ((item: T) => ReactNode);
  /** Values that should invalidate the item cache when using dynamic collections. */
  dependencies?: ReadonlyArray<any>;
  /** A scope to prepend to all child item ids to ensure they are unique. */
  idScope?: Key;
  /** Whether to add `id` and `value` props to all child items. */
  addIdAndValue?: boolean;
}

// Native equivalent of cloneElement's id/value injection, read by the source
// leaf/branch factories. Wrapping components continue to forward explicit ids.
export const CachedItemContext = createContext<{id?: Key; value?: unknown} | null>(null);

/**
 * Maps over a list of items and renders React elements for them. Each rendered item is
 * cached based on object identity, and React keys are generated from the `key` or `id` property.
 */
export function useCachedChildren<T>(props: CachedChildrenOptions<T>, renderDynamic?: (output: ReactNode) => ReactNode): ReactNode {
  let previousDependencies: readonly unknown[] = [];
  let previousChildrenString: string | undefined;
  let cache = new WeakMap<WeakKey, {item: T}>();
  let rows = createMemo(() => {
    // Static authored children are not an item factory. In particular, probing
    // their getter for the development template string would construct JSX
    // outside the static content consumer and allocate duplicate fake nodes.
    if (!props.items) return [];
    let dependencies = props.dependencies || [];
    let childrenString = process.env.NODE_ENV !== 'production' && typeof props.children === 'function'
      ? props.children.toString() : undefined;
    if (dependencies.length !== previousDependencies.length || dependencies.some((value, i) => value !== previousDependencies[i]) || childrenString !== previousChildrenString) {
      cache = new WeakMap();
      previousDependencies = dependencies.slice();
      previousChildrenString = childrenString;
    }
    return Array.from(props.items || [], item => {
      let cacheKey = isWeakKey(item) ? item : null;
      let row = cacheKey ? cache.get(cacheKey) : undefined;
      if (!row) {
        row = {item};
        if (cacheKey) cache.set(cacheKey, row);
      }
      return row;
    });
  });
  // For owns cached row lifetimes. Cache entries contain data rather than mounted
  // JSX so a removed/reinserted row never reuses a disposed native owner.
  const createDynamic = () => For({
    get each() { return rows(); },
    children: row => {
      let value = {
        get id() {
          let item = row.item as {key?: Key; id?: Key} | null;
          let id = item?.key ?? item?.id;
          return props.addIdAndValue && id != null ? props.idScope != null ? `${props.idScope}:${id}` : id : undefined;
        },
        get value() { return props.addIdAndValue ? row.item : undefined; }
      };
      return CachedItemContext({value, get children() {
        return For({
          get each() { return [props.children as (item: T) => ReactNode]; },
          children: factory => factory(row.item)
        });
      }});
    }
  });
  // Callers construct this native boundary beneath the consuming provider.
  // A boolean row owns composition; items updates affect the inner list, not
  // a lazy accessor's construction scope. No cached disposed For instances.
  return For({
    get each() { return [!!props.items && typeof props.children === 'function']; },
    children: dynamic => dynamic ? (renderDynamic ? renderDynamic(createDynamic()) : createDynamic()) : For({
      // Resolve the authored constructor shallowly in its own list source.
      // Descendant binding changes must not reinvoke that constructor from a
      // deep-flatten accessor and reset its local state before publication.
      get each() { return [props.children]; },
      children: children => (typeof children !== 'function' || children.length === 0)
        ? children as ReactNode : undefined
    })
  });
}

function isWeakKey(value: any): value is WeakKey {
  switch (typeof value) {
    case 'object':
      return value != null;
    case 'function':
    case 'symbol':
      return true;
    default:
      return false;
  }
}
