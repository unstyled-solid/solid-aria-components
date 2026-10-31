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

import type {JSX} from '@solidjs/web';
import {Key} from '@react-types/shared';
import {PartialNode} from '../collections/types';

export interface CellProps {
  'aria-label'?: string;
  key?: Key;
  /** The contents of the cell. */
  children: JSX.Element;
  /** A string representation of the cell's contents, used for features like typeahead. */
  textValue?: string;
  /** Indicates how many columns the data cell spans. */
  colSpan?: number;
}

export type CellElement = JSX.Element;
export type CellRenderer = (columnKey: Key) => CellElement;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Cell(props: CellProps): JSX.Element {
  return {type: Cell, props, get key() {return props.key;}} as unknown as JSX.Element;
}

Cell.getCollectionNode = function* getCollectionNode<T>(
  props: CellProps
): Generator<PartialNode<T>> {
  let {children} = props;

  let textValue =
    props.textValue || (typeof children === 'string' ? children : '') || props['aria-label'] || '';
  yield {
    type: 'cell',
    props: props,
    rendered: children,
    textValue,
    'aria-label': props['aria-label'],
    hasChildNodes: false
  };
};

/**
 * A Cell represents the value of a single Column within a Table Row.
 */
// We don't want getCollectionNode to show up in the type definition
let _Cell = Cell as (props: CellProps) => JSX.Element;
export {_Cell as Cell};
