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

import {collectionChildren, PartialNode} from './types';
import type {JSX} from '@solidjs/web';
import {SectionProps} from '@react-types/shared';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Section<T>(props: SectionProps<T> & {key?: import('@react-types/shared').Key}): JSX.Element {
  return {type: Section, props, get key() {return props.key;}} as unknown as JSX.Element;
}

Section.getCollectionNode = function* getCollectionNode<T>(
  props: SectionProps<T>
): Generator<PartialNode<T>> {
  let {children, title, items} = props;
  yield {
    type: 'section',
    props: props,
    hasChildNodes: true,
    rendered: title,
    'aria-label': props['aria-label'],
    *childNodes() {
      if (typeof children === 'function') {
        if (!items) {
          throw new Error('props.children was a function but props.items is missing');
        }

        for (let item of items) {
          yield {
            type: 'item',
            value: item,
            renderer: children
          };
        }
      } else {
        let items: PartialNode<T>[] = [];
        collectionChildren(children).forEach(child => {
          items.push({
            type: 'item',
            element: child
          });
        });

        yield* items;
      }
    }
  };
};

// We don't want getCollectionNode to show up in the type definition
let _Section = Section as <T>(props: SectionProps<T> & {key?: import('@react-types/shared').Key}) => JSX.Element;
export {_Section as Section};
