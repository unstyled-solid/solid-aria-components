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

import {Key} from '@react-types/shared';
import {flatten, type Element} from 'solid-js';

// Native Item/Section JSX is opaque collection data, consumed before rendering.
export interface CollectionDescriptor {
  type: {getCollectionNode(props: any, context?: any): Generator<PartialNode<any>, void, any>};
  props: any;
  readonly key?: Key | null;
}

export function isCollectionDescriptor(value: unknown): value is CollectionDescriptor {
  return !!value && typeof value === 'object' && 'type' in value && 'props' in value;
}

export function collectionChildren(value: Element): Element[] {
  let resolved = flatten(value);
  return Array.isArray(resolved) ? resolved : resolved == null ? [] : [resolved];
}

export interface PartialNode<T> {
  type?: string;
  key?: Key | null;
  value?: T;
  element?: Element;
  wrapper?: (element: Element | (() => Element)) => Element;
  rendered?: Element;
  textValue?: string;
  'aria-label'?: string;
  index?: number;
  renderer?: (item: T) => Element;
  hasChildNodes?: boolean;
  childNodes?: () => IterableIterator<PartialNode<T>>;
  props?: any;
  shouldInvalidate?: (context: any) => boolean;
}
