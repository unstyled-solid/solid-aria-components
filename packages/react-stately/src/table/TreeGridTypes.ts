/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import type {GridNode} from '../grid/GridCollection';
import type {Key} from '@react-types/shared';
import type {TableState} from './useTableState';

// Complete declaration extracted from frozen useTreeGridState.ts:22–31.
export interface TreeGridState<T> extends Omit<TableState<T>, 'expandedKeys'> {
  /** A set of keys for items that are expanded. */
  expandedKeys: 'all' | Set<Key>;
  /** Toggles the expanded state for a row by its key. */
  toggleKey(key: Key): void;
  /** The key map containing nodes representing the collection's tree grid structure. */
  keyMap: Map<Key, GridNode<T>>;
  /** The number of leaf columns provided by the user. */
  userColumnCount: number;
}
