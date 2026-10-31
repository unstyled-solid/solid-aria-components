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

import {chain} from './chain';
import clsx from 'clsx';
import {mergeIds} from './useId';
import {mergeRefs} from './mergeRefs';
import {$PROXY} from 'solid-js';

interface Props {
  [key: PropertyKey]: any;
}

type PropsArg = Props | null | undefined;

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = {[P in keyof T]: T[P]} extends {[key: number]: infer V}
  ? NullToObject<V>
  : never;
type NullToObject<T> = T extends null | undefined ? {} : T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, ids are deduplicated, and refs are merged.
 * For all other props, the last prop object overrides all previous ones.
 *
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends PropsArg[]>(...args: T): UnionToIntersection<TupleTypes<T>> {
  // Preserve source merge rules per property, without evaluating lazy children or
  // freezing reactive props while the component is being set up.
  return new Proxy({}, {
    ownKeys: () => [...new Set(args.flatMap(props => props ? Reflect.ownKeys(props) : []))],
    // This is an Adobe merge view, not one of Solid's own flattenable views.
    // Forwarding a source's $PROXY marker also forwards its internal view record,
    // causing native merge to flatten that one source and discard our merge rules.
    has: (_, key) => isPropKey(key) && hasProperty(key),
    getOwnPropertyDescriptor: (_, key) => isPropKey(key) && hasProperty(key)
      ? {enumerable: true, configurable: true, get: () => mergeProperty(key)} : undefined,
    get: (_, key) => isPropKey(key) ? mergeProperty(key) : undefined
  }) as UnionToIntersection<TupleTypes<T>>;

  function isPropKey(key: PropertyKey) {
    // Native SSR wraps functional spread sources in a proxy that supplies its
    // own $PROXY marker. Forwarding a source view's other private symbols then
    // makes native merge flatten that source rather than this Adobe merge.
    // Only explicitly owned symbol props belong to this public prop bag.
    return key !== $PROXY && (typeof key !== 'symbol' || args.some(props => props != null && Reflect.ownKeys(props).includes(key)));
  }

  function hasProperty(key: PropertyKey) {
    // Probe the effective source first, as value lookup does. A later local
    // property does not depend on an earlier context bag's changing key table.
    // This changes only the order of the existence OR, not undefined fallback.
    for (let i = args.length - 1; i >= 0; i--) {
      let props = args[i];
      if (props != null && key in props) { return true; }
    }
    return false;
  }

  function mergeProperty(key: PropertyKey) {
  let isEvent = typeof key === 'string' && key[0] === 'o' &&
    key[1] === 'n' && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90;
  // Ordinary properties have one effective source. Earlier getters are not
  // inputs when a later source supplies a defined value (including null/false).
  // Keep undefined fallback and key presence distinct, as in the source merge.
  if (!isEvent && key !== 'className' && key !== 'UNSAFE_className' && key !== 'id' && key !== 'ref') {
    for (let i = args.length - 1; i >= 0; i--) {
      let props: PropsArg = args[i];
      if (props && (i === 0 || key in props)) {
        let value = props[key];
        if (value !== undefined) { return value; }
      }
    }
    return undefined;
  }

  // Composed properties must still read both operands in source order. A scalar
  // accumulator avoids allocating an intermediate one-property bag per read.
  let result = args[0]?.[key];
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    if (props && key in props) {
      let a = result;
      let b = props[key];

      // Chain events
      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        // This is a lot faster than a regex.
        isEvent
      ) {
        result = chain(a, b);

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        (key === 'className' || key === 'UNSAFE_className') &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        result = clsx(a, b);
      } else if (key === 'id' && a && b) {
        result = mergeIds(a, b);
      } else if (key === 'ref' && a && b) {
        result = mergeRefs(a, b);
        // Override others
      } else {
        result = b !== undefined ? b : a;
      }
    }
  }

  return result;
  }
}
