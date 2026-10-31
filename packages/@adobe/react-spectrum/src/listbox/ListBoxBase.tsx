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

import {
  AriaLabelingProps,
  AsyncLoadable,
  DOMProps,
  FocusStrategy,
  Node,
  StyleProps
} from '@react-types/shared';
import {AriaListBoxOptions, AriaListBoxPropsBase, useListBox} from 'react-aria/useListBox';
import {classNames} from '../utils/classNames';
import {FocusScope} from 'react-aria/FocusScope';
import intlMessages from '../../intl/listbox/*.json';
import {ListBoxContext} from './ListBoxContext';
import {ListBoxLayout} from './ListBoxLayout';
import {ListBoxOption} from './ListBoxOption';
import {ListBoxSection} from './ListBoxSection';
import {ListState} from 'react-stately/useListState';
import {mergeProps} from 'react-aria/mergeProps';
import {ProgressCircle} from '../progress/ProgressCircle';
import {Accessor, createMemo, merge, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import clsx from 'clsx';
import {ReusableView} from 'react-stately/useVirtualizerState';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useProvider} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';
import {Virtualizer} from 'react-aria/private/virtualizer/Virtualizer';
import {VirtualizerItem} from 'react-aria/private/virtualizer/VirtualizerItem';

export interface SpectrumListBoxProps<T>
  extends AriaListBoxPropsBase<T>, AsyncLoadable, StyleProps {}

// Match the frozen React HTMLAttributes style contract rather than native
// hosts' additional string/attribute-removal forms.
type ListBoxDOMProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> & {
  style?: JSX.CSSProperties;
};

interface ListBoxBaseProps<T>
  extends AriaListBoxOptions<T>, DOMProps, AriaLabelingProps, StyleProps {
  layout: ListBoxLayout<T>;
  state: ListState<T>;
  autoFocus?: boolean | FocusStrategy;
  shouldFocusWrap?: boolean;
  shouldSelectOnPressUp?: boolean;
  focusOnPointerEnter?: boolean;
  domProps?: ListBoxDOMProps;
  disallowEmptySelection?: boolean;
  shouldUseVirtualFocus?: boolean;
  isLoading?: boolean;
  showLoadingSpinner?: boolean;
  onLoadMore?: () => void;
  renderEmptyState?: () => JSX.Element;
  onScroll?: () => void;
  ref?: Ref<HTMLDivElement>;
}

/** @private */
export function useListBoxLayout<T>(): Accessor<ListBoxLayout<T>> {
  let provider = useProvider();
  let layout = createMemo(
    () =>
      new ListBoxLayout<T>({
        estimatedRowHeight: provider.scale === 'large' ? 48 : 32,
        estimatedHeadingHeight: provider.scale === 'large' ? 33 : 26,
        paddingY: provider.scale === 'large' ? 5 : 4, // TODO: get from DNA
        placeholderHeight: provider.scale === 'large' ? 48 : 32
      })
  );

  return layout;
}

/** @private */
export function ListBoxBase<T extends object>(props: ListBoxBaseProps<T>): JSX.Element {
  let state = props.state;
  let objectRef = useObjectRef(props.ref);
  let {listBoxProps} = useListBox(
    merge(props, {
      get layoutDelegate() { return props.layout; },
      isVirtualized: true
    }),
    state,
    objectRef
  );
  let {styleProps} = useStyleProps(props);
  // Both source and native useStyleProps always construct an object style.
  // useListBox adds no style; domProps retains the source object-only type.
  // Keep the original spread precedence without coercing or dropping values.
  let spectrumStyleProps = styleProps as ListBoxDOMProps;
  let virtualizerDOMProps = mergeProps(
    listBoxProps, merge(() => props.domProps ?? {})
  ) as ListBoxDOMProps;

  // This overrides collection view's renderWrapper to support hierarchy of items in sections.
  // The header is extracted from the children so it can receive ARIA labeling properties.
  type View = ReusableView<Node<T>, JSX.Element>;
  let renderWrapper =
    (
      parent: View | null,
      reusableView: View,
      children: View[],
      renderChildren: (views: View[]) => JSX.Element
    ) => {
      if (reusableView.viewType === 'section') {
        return (
          <ListBoxSection
            item={reusableView.content!}
            layoutInfo={reusableView.layoutInfo!}
            virtualizer={reusableView.virtualizer}
            headerLayoutInfo={children.find(c => c.viewType === 'header')?.layoutInfo ?? null}>
            {renderChildren(children.filter(c => c.viewType === 'item'))}
          </ListBoxSection>
        );
      }

      return (
        <VirtualizerItem
          layoutInfo={reusableView.layoutInfo!}
          virtualizer={reusableView.virtualizer}
          parent={parent?.layoutInfo}>
          {reusableView.rendered}
        </VirtualizerItem>
      );
    };

  let focusedKey = createMemo(() => state.selectionManager.focusedKey);
  let persistedKeys = createMemo(() => focusedKey() != null ? new Set([focusedKey()!]) : null);
  let showLoadingSpinner = createMemo(() => props.showLoadingSpinner ?? props.isLoading);
  let layoutOptions = createMemo(() => ({isLoading: showLoadingSpinner()}));
  let context = {
    state,
    get renderEmptyState() { return props.renderEmptyState; },
    get shouldFocusOnHover() { return props.shouldFocusOnHover ?? false; },
    get shouldUseVirtualFocus() { return props.shouldUseVirtualFocus ?? false; }
  };

  return (
    <ListBoxContext value={context}>
      <FocusScope>
        <Virtualizer
          {...spectrumStyleProps}
          {...virtualizerDOMProps}
          ref={objectRef}
          persistedKeys={persistedKeys()}
          autoFocus={!!props.autoFocus || undefined}
          scrollDirection="vertical"
          class={classNames(styles, 'spectrum-Menu', clsx(styleProps.class))}
          layout={props.layout}
          layoutOptions={layoutOptions()}
          collection={state.collection}
          renderWrapper={renderWrapper}
          isLoading={props.isLoading}
          onLoadMore={props.onLoadMore}
          onScroll={props.onScroll}>
          {(type: string, item: Node<T> | null): JSX.Element => {
            if (type === 'item') {
              return <ListBoxOption item={item!} />;
            } else if (type === 'loader') {
              return <LoadingState />;
            } else if (type === 'placeholder') {
              return <EmptyState />;
            } else {
              return null;
            }
          }}
        </Virtualizer>
      </FocusScope>
    </ListBoxContext>
  );
}

function LoadingState() {
  let {state} = useContext(ListBoxContext)!;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/listbox');
  return (
    // aria-selected isn't needed here since this option is not selectable.
    <div
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
      style={{display: 'flex', 'align-items': 'center', 'justify-content': 'center', height: '100%'}}>
      <ProgressCircle
        isIndeterminate
        size="S"
        aria-label={
          state.collection.size > 0
            ? stringFormatter.format('loadingMore')
            : stringFormatter.format('loading')
        }
        UNSAFE_className={classNames(styles, 'spectrum-Dropdown-progressCircle')}
      />
    </div>
  );
}

function EmptyState() {
  let context = useContext(ListBoxContext)!;
  let emptyState = createMemo(() => context.renderEmptyState ? context.renderEmptyState() : null);

  return (
    <>{emptyState() != null && <div
      // aria-selected isn't needed here since this option is not selectable.
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option">
      {emptyState()}
    </div>}</>
  );
}
