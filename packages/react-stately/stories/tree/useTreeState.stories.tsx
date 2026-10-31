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

import {Collection, Key, Node} from '@react-types/shared';
import {Item} from '../../src/collections/Item';
import {createMemo, For, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {TreeProps, TreeState} from '../../src/tree/useTreeState';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {mergeProps} from 'react-aria/mergeProps';
import {PressHookProps, usePress} from 'react-aria/usePress';
import {useSelectableCollection} from 'react-aria/private/selection/useSelectableCollection';
import {useSelectableItem} from 'react-aria/private/selection/useSelectableItem';
import {useTreeState} from '../../src/tree/useTreeState';

export default {
  title: 'useTreeState'
};

export const KeyboardNavigation = () => <TreeExample />;

function TreeExample(props = {}): JSX.Element {
  return (
    <Tree {...props}>
      <Item key="1" title="Animals">
        <Item>Aardvark</Item>
        <Item title="Bear">
          <Item>Black Bear</Item>
          <Item>Brown Bear</Item>
        </Item>
        <Item>Kangaroo</Item>
        <Item>Snake</Item>
      </Item>
      <Item key="2" title="Fruits">
        <Item>Apple</Item>
        <Item>Orange</Item>
        <Item title="Kiwi">
          <Item>Golden Kiwi</Item>
          <Item>Fuzzy Kiwi</Item>
        </Item>
      </Item>
    </Tree>
  );
}

function Tree(props: TreeProps<object>) {
  let state = useTreeState(props);
  let ref = useObjectRef<HTMLDivElement>();

  let keyboardDelegate = createMemo(() => new TreeKeyboardDelegate(state.collection, state.disabledKeys));

  let {collectionProps} = useSelectableCollection({
    get keyboardDelegate() {return keyboardDelegate();},
    ref,
    selectionManager: state.selectionManager
  });

  return (
    <div {...collectionProps} ref={ref} role="tree">
      {/* oxlint-disable-next-line react/react-compiler */}
      <TreeNodes nodes={state.collection} state={state} />
    </div>
  );
}

function TreeNodes(props: {nodes: Iterable<Node<any>>; state: TreeState<any>}) {
  return <For each={Array.from(props.nodes)} keyed={node => node.key}>
    {node => <TreeItem node={node()} state={props.state} />}
  </For>;
}

function TreeItem(props: {node: Node<any>; state: TreeState<any>}) {
  let state = untrack(() => props.state);
  let ref = useObjectRef<HTMLDivElement>();

  let {itemProps} = useSelectableItem({
    get key() {return props.node.key;},
    selectionManager: state.selectionManager,
    ref: ref
  });

  let {pressProps} = usePress(mergeProps(itemProps, {
    ref,
    onPress: () => state.toggleKey(props.node.key)
  }) as PressHookProps);

  let isExpanded = () => props.node.hasChildNodes && state.expandedKeys.has(props.node.key);
  let isSelected = () => state.selectionManager.isSelected(props.node.key);

  return (
    <div
      {...pressProps}
      aria-expanded={props.node.hasChildNodes ? String(isExpanded()) as 'true' | 'false' : undefined}
      aria-selected={isSelected() ? 'true' : 'false'}
      ref={ref}
      role="treeitem">
      <div class="title">{props.node.rendered}</div>
      {isExpanded() && (
        <div class="children" role="group">
          {/* oxlint-disable-next-line react/react-compiler */}
          <TreeNodes nodes={props.node.childNodes} state={state} />
        </div>
      )}
    </div>
  );
}

class TreeKeyboardDelegate<T> {
  collator: Intl.Collator;
  collection: Collection<Node<T>>;
  disabledKeys: Set<Key>;

  constructor(collection: Collection<Node<T>>, disabledKeys: Set<Key>) {
    this.collator = new Intl.Collator('en');
    this.collection = collection;
    this.disabledKeys = disabledKeys;
  }

  getKeyAbove(key: Key): Key | null {
    let {collection, disabledKeys} = this;
    let keyBefore = collection.getKeyBefore(key);

    while (keyBefore !== null) {
      let item = collection.getItem(keyBefore);

      if (item?.type === 'item' && !disabledKeys.has(item.key)) {
        return keyBefore;
      }

      keyBefore = collection.getKeyBefore(keyBefore);
    }

    return null;
  }

  getKeyBelow(key: Key): Key | null {
    let {collection, disabledKeys} = this;
    let keyBelow = collection.getKeyAfter(key);

    while (keyBelow !== null) {
      let item = collection.getItem(keyBelow);

      if (item?.type === 'item' && !disabledKeys.has(item.key)) {
        return keyBelow;
      }

      keyBelow = collection.getKeyAfter(keyBelow);
    }

    return null;
  }

  getFirstKey(): Key | null {
    let {collection, disabledKeys} = this;
    let key = collection.getFirstKey();

    while (key !== null) {
      let item = collection.getItem(key);

      if (item?.type === 'item' && !disabledKeys.has(item.key)) {
        return key;
      }

      key = collection.getKeyAfter(key);
    }

    return null;
  }

  getLastKey(): Key | null {
    let {collection, disabledKeys} = this;
    let key = collection.getLastKey();

    while (key !== null) {
      let item = collection.getItem(key);

      if (item?.type === 'item' && !disabledKeys.has(item.key)) {
        return key;
      }

      key = collection.getKeyBefore(key);
    }

    return null;
  }

  getKeyForSearch(search: string, fromKey = this.getFirstKey()): Key | null {
    let {collator, collection} = this;
    let key = fromKey;

    while (key !== null) {
      let item = collection.getItem(key);

      if (
        item?.textValue &&
        collator.compare(search, item.textValue.slice(0, search.length)) === 0
      ) {
        return key;
      }

      key = this.getKeyBelow(key);
    }

    return null;
  }
}
