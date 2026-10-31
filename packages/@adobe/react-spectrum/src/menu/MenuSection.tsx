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

import {classNames} from '../utils/classNames';
import {getChildNodes} from 'react-stately/private/collections/getChildNodes';
import {MenuItem} from './MenuItem';
import {Node} from '@react-types/shared';
import {For} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {TreeState} from 'react-stately/useTreeState';
import {useMenuSection} from 'react-aria/useMenu';
import {useSeparator} from 'react-aria/useSeparator';

interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

/** @private */
export function MenuSection<T>(props: MenuSectionProps<T>): JSX.Element {
  let {itemProps, headingProps, groupProps} = useMenuSection({
    get heading() { return props.item.rendered; },
    get 'aria-label'() { return props.item['aria-label']; }
  });

  let {separatorProps} = useSeparator({
    elementType: 'div'
  });

  let sectionIsFirst = () => {
    let firstSectionKey = props.state.collection.getFirstKey();
    return firstSectionKey === props.item.key && props.state.collection.getFirstKey() === firstSectionKey;
  };
  let sectionIsLast = () => {
    let lastSectionKey = [...props.state.collection].filter(node => node.type === 'section').at(-1)?.key;
    let lastKey = props.state.collection.getLastKey();
    return lastSectionKey === props.item.key && lastKey != null && props.state.collection.getItem(lastKey)!.parentKey === lastSectionKey;
  };

  return (
    <>
      {props.item.key !== props.state.collection.getFirstKey() && (
        <div {...separatorProps as JSX.HTMLAttributes<HTMLDivElement>} class={classNames(styles, 'spectrum-Menu-divider')} />
      )}
      <div {...itemProps as JSX.HTMLAttributes<HTMLDivElement>}>
        {props.item.rendered && (
          <span {...headingProps as JSX.HTMLAttributes<HTMLSpanElement>} class={classNames(styles, 'spectrum-Menu-sectionHeading')}>
            {props.item.rendered}
          </span>
        )}
        <div
          {...groupProps as JSX.HTMLAttributes<HTMLDivElement>}
          class={classNames(styles, 'spectrum-Menu', {
            'spectrum-Menu-section--noHeading': props.item.rendered == null,
            'spectrum-Menu-section--isFirst': sectionIsFirst(),
            'spectrum-Menu-section--isLast': sectionIsLast()
          })}>
          <For each={[...getChildNodes(props.item, props.state.collection)]} keyed={node => node.key}>{node =>
            <>{node().wrapper
              ? node().wrapper!(() => <MenuItem item={node()} state={props.state} />)
              : <MenuItem item={node()} state={props.state} />}</>
          }</For>
        </div>
      </div>
    </>
  );
}
