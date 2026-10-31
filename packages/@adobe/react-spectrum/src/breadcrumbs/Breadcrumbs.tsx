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
import {ActionButton} from '../button/ActionButton';

import {AriaBreadcrumbsProps, useBreadcrumbs} from 'react-aria/useBreadcrumbs';
import {BreadcrumbItem} from './BreadcrumbItem';
import {classNames} from '../utils/classNames';
import {Key, StyleProps} from '@react-types/shared';
import FolderBreadcrumb from '@spectrum-icons/ui/FolderBreadcrumb';
import {Menu} from '../menu/Menu';
import {MenuTrigger} from '../menu/MenuTrigger';
import {createEffect, createMemo, For, merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {collectionChildren, isCollectionDescriptor, type CollectionDescriptor} from 'react-stately/private/collections/types';
import styles from '@adobe/spectrum-css-temp/components/breadcrumb/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useProviderProps} from '../provider/Provider';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';
import {useStyleProps} from '../utils/styleProps';
import {useValueEffect} from 'react-aria/private/utils/useValueEffect';

export interface SpectrumBreadcrumbsProps<T> extends AriaBreadcrumbsProps, StyleProps {
  /** The breadcrumb items. */
  children: JSX.Element;
  /** Whether the Breadcrumbs are disabled. */
  isDisabled?: boolean;
  /** Called when an item is acted upon (usually selection via press). */
  onAction?: (key: Key) => void;
  /**
   * Size of the Breadcrumbs including spacing and layout.
   *
   * @default 'L'
   */
  size?: 'S' | 'M' | 'L';
  /** Whether to always show the root item if the items are collapsed. */
  showRoot?: boolean;
  /**
   * Whether to place the last Breadcrumb item onto a new line.
   */
  isMultiline?: boolean;
  /**
   * Whether to autoFocus the last Breadcrumb item when the Breadcrumbs render.
   */
  autoFocusCurrent?: boolean;
}

const MIN_VISIBLE_ITEMS = 1;
const MAX_VISIBLE_ITEMS = 4;

/**
 * Breadcrumbs show hierarchy and navigational context for a user’s location within an application.
 */
export function Breadcrumbs<T>(input: SpectrumBreadcrumbsProps<T> & {ref?: DOMRef}) {
  let props = useProviderProps(input);
  let otherProps = omit(props, 'size', 'isMultiline', 'children', 'showRoot', 'isDisabled', 'onAction', 'autoFocusCurrent', 'ref');

  // Not using React.Children.toArray because it mutates the key prop.
  let childArray = createMemo(() => {
    let result: CollectionDescriptor[] = [];
    collectionChildren(props.children).forEach((child, index) => {
      if (isCollectionDescriptor(child)) {
        result.push(child.key == null ? merge(child, {key: index}) : child);
      }
    });
    return result;
  });

  let domRef = useDOMRef(input.ref);
  let listRef = useObjectRef<HTMLUListElement>();

  let [visibleItems, setVisibleItems] = useValueEffect(() => childArray().length);

  let {navProps} = useBreadcrumbs(props);
  let {styleProps} = useStyleProps(otherProps);

  let updateOverflow = createMemo(() => {
    let length = childArray().length;
    let showRoot = props.showRoot;
    let isMultiline = props.isMultiline;
    let list = listRef.current;
    return () => {
    let computeVisibleItems = (visibleItems: number): number => {
      // Refs can be null at runtime.
      let currListRef: HTMLUListElement | null = list;
      if (!currListRef) {
        return visibleItems;
      }

      let listItems = Array.from(currListRef.children) as HTMLLIElement[];
      if (listItems.length <= 0) {
        return visibleItems;
      }
      let containerWidth = currListRef.offsetWidth;
      let isShowingMenu = length > visibleItems;
      let calculatedWidth = 0;
      let newVisibleItems = 0;
      let maxVisibleItems = MAX_VISIBLE_ITEMS;

      if (showRoot) {
        calculatedWidth += (listItems.shift() as HTMLLIElement).offsetWidth;
        newVisibleItems++;
      }

      if (isShowingMenu) {
        calculatedWidth += (listItems.shift() as HTMLLIElement).offsetWidth;
        maxVisibleItems--;
      }

      if (showRoot && calculatedWidth >= containerWidth) {
        newVisibleItems--;
      }

      // TODO: what if multiline and only one breadcrumb??
      if (isMultiline) {
        listItems.pop();
        newVisibleItems++;
      } else {
        if (listItems.length > 0) {
          // Ensure the last breadcrumb isn't truncated when we measure it.
          let last = listItems.pop() as HTMLLIElement;
          last.style.overflow = 'visible';

          calculatedWidth += last.offsetWidth;
          if (calculatedWidth < containerWidth) {
            newVisibleItems++;
          }

          last.style.overflow = '';
        }
      }

      for (let breadcrumb of listItems.reverse()) {
        calculatedWidth += breadcrumb.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
      }

      return Math.max(MIN_VISIBLE_ITEMS, Math.min(maxVisibleItems, newVisibleItems));
    };

    setVisibleItems(function* () {
      // Update to show all items.
      yield length;

      // Measure, and update to show the items that fit.
      let newVisibleItems = computeVisibleItems(length);
      yield newVisibleItems;

      // If the number of items is less than the number of children,
      // then update again to ensure that the menu fits.
      if (newVisibleItems < length && newVisibleItems > 1) {
        yield computeVisibleItems(newVisibleItems);
      }
    });
    };
  });

  useResizeObserver({ref: domRef, onResize: () => {updateOverflow()();}});

  let lastChildren: JSX.Element | null = null;
  createEffect(() => ({children: props.children, update: updateOverflow()}), ({children, update}) => {
    if (children !== lastChildren) {
      lastChildren = children;
      update();
    }
  });

  let contents = createMemo(() => {
  let children = childArray();
  let contents: (CollectionDescriptor | {key: 'menu'; menu: true})[] = children;
  if (children.length > visibleItems()) {
    let breadcrumbs = [...children];
    contents = [{key: 'menu', menu: true}];
    let endItems = visibleItems();
    if (props.showRoot && visibleItems() > 1) {
      let rootItem = breadcrumbs.shift();
      if (rootItem) {contents.unshift(rootItem);}
      endItems--;
    }
    contents.push(...breadcrumbs.slice(-endItems));
  }
  return contents;
  });
  let renderMenu = () => {
    let children = childArray();
    let selectedItem = children[children.length - 1];
    let selectedKey = selectedItem.key ?? children.length - 1;
    let onMenuAction = (key: Key) => {
      // Don't fire onAction when clicking on the last item
      if (key !== selectedKey && props.onAction) {
        props.onAction(key);
      }
    };

    return (
        <MenuTrigger children={[
          () => (
          <ActionButton
            UNSAFE_className={classNames(styles, 'spectrum-Breadcrumbs-actionButton')}
            aria-label="…"
            isQuiet
            isDisabled={props.isDisabled}>
            <FolderBreadcrumb />
          </ActionButton>
          ),
          () => (
          <Menu selectionMode="single" selectedKeys={[selectedKey]} onAction={onMenuAction}>
            {children as unknown as JSX.Element}
          </Menu>
          )
        ]} />
    );

  };


  return (
    <nav {...styleProps} {...navProps} ref={domRef}>
      <ul
        ref={listRef}
        class={classNames(
          styles,
          'spectrum-Breadcrumbs',
          {
            'spectrum-Breadcrumbs--small': props.size === 'S',
            'spectrum-Breadcrumbs--medium': props.size === 'M',
            'spectrum-Breadcrumbs--multiline': props.isMultiline,
            'spectrum-Breadcrumbs--showRoot': props.showRoot,
            'is-disabled': props.isDisabled
          },
          styleProps.class as string | undefined
        )}>
        <For each={contents()} keyed={false}>{(child, index) => (
          <li class={classNames(styles, 'spectrum-Breadcrumbs-item')}>
            <BreadcrumbItem
              {...merge(() => 'props' in child() ? (child() as CollectionDescriptor).props : {isMenu: true})}
              isCurrent={index === contents().length - 1}
              isDisabled={props.isDisabled}
              onPress={() => props.onAction?.(child().key ?? index)}
              autoFocus={index === contents().length - 1 && props.autoFocusCurrent}>
              {'props' in child() ? (child() as CollectionDescriptor).props.children : renderMenu()}
            </BreadcrumbItem>
          </li>
        )}</For>
      </ul>
    </nav>
  );
}
