/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaTagGroupProps, useTag, useTagGroup} from 'react-aria/useTagGroup';

import {ButtonContext} from './Button';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  DOMProps,
  DOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlot
} from './utils';
import {Collection} from 'react-aria/Collection';
import {CollectionBuilder, createLeafComponent} from 'react-aria/CollectionBuilder';
import {
  CollectionProps,
  CollectionRendererContext,
  DefaultCollectionRenderer,
  ItemRenderProps,
  usePersistedKeys
} from './Collection';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {
  FocusEvents,
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  LinkDOMProps,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {ItemNode} from 'react-aria/private/collections/BaseCollection';
import {LabelContext, type LabelProps} from './Label';
import {ListState, UNSTABLE_useFilteredListState, useListState} from 'react-stately/useListState';
import {ListStateContext} from './ListBox';
import {mergeProps} from 'react-aria/mergeProps';
import {Node} from '@react-types/shared';
import {createContext, createEffect, merge, omit, useContext, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
type ReactNode = JSX.Element;
import {SelectableCollectionContext, SelectableCollectionContextValue} from './SelectableCollectionContext';
import {SelectionIndicatorContext} from './SelectionIndicator';
import {SharedElementTransition} from './SharedElementTransition';
import {TextContext, type TextProps} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useObjectRef} from 'react-aria/useObjectRef';
import {attachRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';

export interface TagGroupProps
  extends
    Omit<
      AriaTagGroupProps<unknown>,
      'children' | 'items' | 'label' | 'description' | 'errorMessage' | 'keyboardDelegate'
    >,
    DOMProps,
    SlotProps,
    DOMRenderProps<'div', undefined>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-TagGroup'
   */
  className?: string;
}

export interface TagListRenderProps {
  /**
   * Whether the tag list has no items and should display its empty state.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
  /**
   * Whether the tag list is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the tag list is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * State of the TagGroup.
   */
  state: ListState<unknown>;
}

export interface TagListProps<T>
  extends
    Omit<CollectionProps<T>, 'disabledKeys'>,
    StyleRenderProps<TagListRenderProps, 'div'>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TagList'
   */
  className?: ClassNameOrFunction<TagListRenderProps>;
  /** Provides content to display when there are no items in the tag list. */
  renderEmptyState?: (props: TagListRenderProps) => ReactNode;
}

export const TagGroupContext = createContext<ContextValue<TagGroupProps, HTMLDivElement>>(null);
export const TagListContext = createContext<ContextValue<TagListProps<any>, HTMLDivElement>>(null);

/**
 * A tag group is a focusable list of labels, categories, keywords, filters, or other items, with
 * support for keyboard navigation, selection, and removal.
 */
export function TagGroup(input: TagGroupProps & {ref?: ForwardedRef<HTMLDivElement>}) {
  let [props, ref] = useContextProps(input, element => attachRef(input.ref as ObjectRefInput<HTMLDivElement>, element as HTMLDivElement), TagGroupContext);
  return (
    <ListStateContext value={null}>
      <CollectionBuilder content={props.children}>
        {collection => <TagGroupInner props={props} forwardedRef={ref} collection={collection} />}
      </CollectionBuilder>
    </ListStateContext>
  );
}

interface TagGroupInnerProps<T> {
  props: TagGroupProps & SelectableCollectionContextValue<T>;
  forwardedRef: ForwardedRef<HTMLDivElement>;
  collection: any;
}

function TagGroupInner<T>(input: TagGroupInnerProps<T>) {
  let props = input.props;
  // Extract the user provided id so it doesn't clash with the collection id provided by Autocomplete
  // The native context bridge already returns an owned callable object ref.
  // React's fallback ref + useObjectRef conversion would add two redundant
  // attachment/revision relays here without supplying another DOM owner.
  let [otherProps, tagListRef] = useContextProps(omit(props, 'id'), undefined, SelectableCollectionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let DOMCollectionProps = omit(otherProps, 'filter', 'shouldUseVirtualFocus');
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let tagGroupState = useListState(merge(DOMCollectionProps, {
    children: undefined,
    get collection() { return input.collection; }
  }));

  // oxlint-disable-next-line react/react-compiler
  let filteredState = UNSTABLE_useFilteredListState(tagGroupState as ListState<T>, undefined, () => otherProps.filter);

  // Prevent DOM props from going to two places.
  let domProps = filterDOMProps(otherProps, {global: true});
  let domPropOverrides = new Proxy(domProps, {
    get: (target, key) => key === 'id' ? Reflect.get(target, key) : undefined
  });
  let {gridProps, labelProps, descriptionProps, errorMessageProps} = useTagGroup(
    merge(DOMCollectionProps, domPropOverrides, {get label() { return label(); }}),
    filteredState,
    tagListRef
  );

  return (
    <dom.div
      render={props.render}
      {...domProps}
      id={props.id}
      {...{get ref() { return input.forwardedRef; }}}
      slot={props.slot || undefined}
      className={props.className ?? 'react-aria-TagGroup'}
      style={props.style}>
      <Provider
        values={[
          [LabelContext, mergeProps(labelProps as LabelProps, {elementType: 'span' as const, ref: labelRef})],
          [TagListContext, mergeProps(gridProps, {ref: tagListRef}) as TagListProps<T> & {ref: ForwardedRef<HTMLDivElement>}],
          [ListStateContext, filteredState],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps as TextProps,
                errorMessage: errorMessageProps as TextProps
              }
            }
          ]
        ]}>
        {props.children}
      </Provider>
    </dom.div>
  );
}

/**
 * A tag list is a container for tags within a TagGroup.
 */
export function TagList<T>(props: TagListProps<T> & {ref?: ForwardedRef<HTMLDivElement>}): JSX.Element {
  let state = useContext(ListStateContext);
  return state ? <TagListInner props={props} forwardedRef={props.ref} /> : <Collection {...props} />;
}

interface TagListInnerProps<T> {
  props: TagListProps<T>;
  forwardedRef: ForwardedRef<HTMLDivElement>;
}

function TagListInner<T>(input: TagListInnerProps<T>) {
  let props = input.props;
  let state = useContext(ListStateContext)!;
  let {CollectionRoot} = useContext(CollectionRendererContext);
  let [gridProps, ref] = useContextProps({}, element => attachRef(input.forwardedRef as ObjectRefInput<HTMLDivElement>, element as HTMLDivElement), TagListContext);

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let renderValues = {
    get isEmpty() { return state.collection.size === 0; },
    get isFocused() { return isFocused(); },
    get isFocusVisible() { return isFocusVisible(); },
    state
  };
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-TagList',
    values: renderValues
  }));

  let persistedKeys = usePersistedKeys(() => state.selectionManager.focusedKey);
  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, gridProps, focusProps)}
      ref={ref}
      data-empty={state.collection.size === 0 || undefined}
      data-focused={isFocused() || undefined}
      data-focus-visible={isFocusVisible() || undefined}>
      <SharedElementTransition>
        {state.collection.size === 0 && props.renderEmptyState ? (
          props.renderEmptyState(renderValues)
        ) : (
          <CollectionRoot collection={state.collection} persistedKeys={persistedKeys()} />
        )}
      </SharedElementTransition>
    </dom.div>
  );
}

export interface TagRenderProps extends Omit<
  ItemRenderProps,
  'allowsDragging' | 'isDragging' | 'isDropTarget'
> {
  /**
   * Whether the tag group allows items to be removed.
   *
   * @selector [data-allows-removing]
   */
  allowsRemoving: boolean;
}

export interface TagProps
  extends
    RenderProps<TagRenderProps, 'div'>,
    LinkDOMProps,
    HoverEvents,
    FocusEvents,
    PressEvents,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Tag'
   */
  className?: ClassNameOrFunction<TagRenderProps>;
  /** A unique id for the tag. */
  id?: Key;
  /**
   * A string representation of the tags's contents, used for accessibility.
   * Required if children is not a plain text string.
   */
  textValue?: string;
  /** Whether the tag is disabled. */
  isDisabled?: boolean;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends
   * on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: () => void;
}

/**
 * A Tag is an individual item within a TagList.
 */
export const Tag = /*#__PURE__*/ createLeafComponent(
  ItemNode,
  (props: TagProps, forwardedRef: ForwardedRef<HTMLDivElement>, item: Node<unknown>) => {
    let state = useContext(ListStateContext)!;
    let ref = useObjectRef<HTMLDivElement>(forwardedRef as ObjectRefInput<HTMLDivElement>);
    let {focusProps, isFocusVisible} = useFocusRing({within: false});
    let tag = useTag({get item() { return item; }}, state, ref);
    let {rowProps, gridCellProps, removeButtonProps} = tag;
    let states = omit(tag, 'rowProps', 'gridCellProps', 'removeButtonProps');

    let {hoverProps, isHovered} = useHover({
      get isDisabled() { return !states.allowsSelection() && !states.hasAction(); },
      get onHoverStart() { return item.props.onHoverStart; },
      get onHoverChange() { return item.props.onHoverChange; },
      get onHoverEnd() { return item.props.onHoverEnd; }
    });

    let renderProps = useRenderProps(merge(omit(props, 'id', 'children'), {
      id: undefined,
      get children() { return item.rendered; },
      defaultClassName: 'react-aria-Tag',
      values: {
        get isSelected() { return states.isSelected(); },
        get isDisabled() { return states.isDisabled(); },
        get isFocused() { return states.isFocused(); },
        get isPressed() { return states.isPressed(); },
        get allowsSelection() { return states.allowsSelection(); },
        get hasAction() { return states.hasAction(); },
        get allowsRemoving() { return states.allowsRemoving(); },
        get isFocusVisible() { return isFocusVisible(); },
        get isHovered() { return isHovered(); },
        get selectionMode() { return state.selectionManager.selectionMode; },
        get selectionBehavior() { return state.selectionManager.selectionBehavior; }
      }
    }));

    createEffect(() => item.textValue, textValue => {
      if (!textValue && process.env.NODE_ENV !== 'production') {
        console.warn(
          'A `textValue` prop is required for <Tag> elements with non-plain text children for accessibility.'
        );
      }
    });

    let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');
    let selectionMode = () => state.selectionManager.selectionMode === 'none'
      ? undefined
      : state.selectionManager.selectionMode;

    return (
      <dom.div
        ref={ref}
        {...mergeProps(DOMProps, renderProps, rowProps, focusProps, hoverProps) as JSX.HTMLAttributes<HTMLDivElement>}
        data-selected={states.isSelected() || undefined}
        data-disabled={states.isDisabled() || undefined}
        data-hovered={isHovered() || undefined}
        data-focused={states.isFocused() || undefined}
        data-focus-visible={isFocusVisible() || undefined}
        data-pressed={states.isPressed() || undefined}
        data-allows-removing={states.allowsRemoving() || undefined}
        data-selection-mode={selectionMode()}>
        <div {...gridCellProps as JSX.HTMLAttributes<HTMLDivElement>} style={{display: 'contents'}}>
          <Provider
            values={[
              [
                ButtonContext,
                {
                  slots: {
                    remove: removeButtonProps
                  }
                }
              ],
              [CollectionRendererContext, DefaultCollectionRenderer],
               [SelectionIndicatorContext, {get isSelected() { return states.isSelected(); }}]
            ]}>
            {renderProps.children}
          </Provider>
        </div>
      </dom.div>
    );
  }
);
