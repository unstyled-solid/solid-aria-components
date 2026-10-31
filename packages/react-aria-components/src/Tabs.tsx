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

import {
  AriaLabelingProps,
  FocusEvents,
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  LinkDOMProps,
  PressEvents
} from '@react-types/shared';
import {
  AriaTabListProps,
  AriaTabPanelProps,
  useTab,
  useTabList,
  useTabPanel
} from 'react-aria/useTabList';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  DOMRenderProps,
  PossibleLinkDOMRenderProps,
  RenderProps,
  SlotProps,
  StyleProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlottedContext
} from './utils';
import {Collection} from 'react-aria/Collection';
import {CollectionBuilder, createLeafComponent} from 'react-aria/CollectionBuilder';
import {CollectionNode} from 'react-aria/private/collections/BaseCollection';
import {
  CollectionProps,
  CollectionRendererContext,
  DefaultCollectionRenderer,
  usePersistedKeys
} from './Collection';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {Collection as ICollection, Node} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {Orientation} from '@react-types/shared';
import {createContext, createEffect, createMemo, merge, omit, Show, untrack, useContext, type Ref as ForwardedRef} from 'solid-js';
import {Dynamic, type JSX} from '@solidjs/web';
import {SelectionIndicatorContext} from './SelectionIndicatorContext';
import {SharedElementTransition} from './SharedElementTransition';
import {TabListState, useTabListState} from 'react-stately/useTabListState';
import {useEnterAnimation, useExitAnimation} from 'react-aria/private/utils/animation';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useObjectRef, type ObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';

export interface TabsProps
  extends
    Omit<AriaTabListProps<any>, 'items' | 'children'>,
    RenderProps<TabsRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Tabs'
   */
  className?: ClassNameOrFunction<TabsRenderProps>;
  ref?: ForwardedRef<HTMLDivElement>;
}

export interface TabsRenderProps {
  /**
   * The orientation of the tabs.
   *
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
}

export interface TabListProps<T>
  extends
    StyleRenderProps<TabListRenderProps>,
    AriaLabelingProps,
    Omit<CollectionProps<T>, 'disabledKeys'>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TabList'
   */
  className?: ClassNameOrFunction<TabListRenderProps>;
  ref?: ForwardedRef<HTMLDivElement>;
}

export interface TabListRenderProps {
  /**
   * The orientation of the tab list.
   *
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
  /**
   * State of the tab list.
   */
  state: TabListState<unknown>;
}

export interface TabProps
  extends
    Omit<RenderProps<TabRenderProps>, 'render'>,
    PossibleLinkDOMRenderProps<'div', TabRenderProps>,
    AriaLabelingProps,
    LinkDOMProps,
    HoverEvents,
    FocusEvents,
    PressEvents,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Tab'
   */
  className?: ClassNameOrFunction<TabRenderProps>;
  /** The unique id of the tab. */
  id?: Key;
  /** Whether the tab is disabled. */
  isDisabled?: boolean;
}

export interface TabRenderProps {
  /**
   * Whether the tab is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the tab is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the tab is currently selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the tab is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the tab is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the tab is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface TabPanelProps
  extends AriaTabPanelProps, RenderProps<TabPanelRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TabPanel'
   */
  className?: ClassNameOrFunction<TabPanelRenderProps>;
  /**
   * Whether to mount the tab panel in the DOM even when it is not currently selected. Inactive tab
   * panels are inert and cannot be interacted with. They must be styled appropriately so this is
   * clear to the user visually.
   *
   * @default false
   */
  shouldForceMount?: boolean;
}

export interface TabPanelRenderProps {
  /**
   * Whether the tab panel is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the tab panel is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the tab panel is currently non-interactive. This occurs when the
   * `shouldForceMount` prop is true, and the corresponding tab is not selected.
   *
   * @selector [data-inert]
   */
  isInert: boolean;
  /**
   * Whether the tab panel is currently entering. Use this to apply animations.
   *
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the tab panel is currently exiting. Use this to apply animations.
   *
   * @selector [data-exiting]
   */
  isExiting: boolean;
  /**
   * State of the tab list.
   */
  state: TabListState<unknown>;
}

export const TabsContext = createContext<ContextValue<TabsProps, HTMLDivElement>>(null);
export const TabListStateContext = createContext<TabListState<any> | null>(null);

/**
 * Tabs organize content into multiple sections and allow users to navigate between them.
 */
export function Tabs(props: TabsProps) {
  let ref = untrack(() => props.ref);
  [props, ref] = useContextProps(props, ref, TabsContext);
  let domRef = useObjectRef<HTMLDivElement>(ref as Ref<HTMLDivElement>);
  // Resolve discovery content beneath CollectionBuilder's Hidden owner, and
  // resolve visible content separately beneath the actual Tabs providers.
  let content = useRenderProps(merge(props, {
    defaultChildren: null,
    values: {get orientation() { return props.orientation ?? 'horizontal'; }}
  }));

  return (
    <CollectionBuilder content={content.children}>
      {collection => <TabsInner props={props} collection={collection} tabsRef={domRef} />}
    </CollectionBuilder>
  );
}

interface TabsInnerProps {
  props: TabsProps;
  collection: ICollection<Node<any>>;
  tabsRef: ObjectRef<HTMLDivElement>;
}

function TabsInner(input: TabsInnerProps) {
  let props = input.props;
  let orientation = () => props.orientation ?? 'horizontal';
  let state = useTabListState(merge(props, {
    get collection() { return input.collection; },
    children: undefined
  }));
  let {focusProps, isFocused, isFocusVisible} = useFocusRing({within: true});
  let values = {
    get orientation() { return orientation(); },
    get isFocusWithin() { return isFocused(); },
    get isFocusVisible() { return isFocusVisible(); }
  };
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-Tabs',
    values
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, focusProps)}
      ref={input.tabsRef}
      slot={props.slot || undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-orientation={orientation()}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-disabled={state.isDisabled ? 'true' : undefined}>
      <TabsContext value={props}>
        <TabListStateContext value={state}>
        {renderProps.children}
        </TabListStateContext>
      </TabsContext>
    </dom.div>
  );
}

/**
 * A TabList is used within Tabs to group tabs that a user can switch between. The ids of the items
 * within the <TabList> must match up with a corresponding item inside the <TabPanels>.
 */
export function TabList<T>(props: TabListProps<T>): JSX.Element {
  let state = useContext(TabListStateContext);
  return state ? <TabListInner props={props} forwardedRef={props.ref} /> : <Collection {...props} />;
}

interface TabListInnerProps<T> {
  props: TabListProps<T>;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
}

function TabListInner<T>(input: TabListInnerProps<T>) {
  let props = input.props;
  let state = useContext(TabListStateContext)!;
  let {CollectionRoot} = useContext(CollectionRendererContext);
  let tabsProps = useSlottedContext(TabsContext)!;
  let orientation = () => tabsProps.orientation ?? 'horizontal';
  let keyboardActivation = () => tabsProps.keyboardActivation ?? 'automatic';
  let objectRef = useObjectRef<HTMLDivElement>(untrack(() => input.forwardedRef) as Ref<HTMLDivElement>);

  let {tabListProps} = useTabList(
    merge(props, {
      get orientation() { return orientation(); },
      get keyboardActivation() { return keyboardActivation(); }
    }),
    state,
    objectRef
  );

  let renderProps = useRenderProps(merge(props, {
    children: null,
    defaultClassName: 'react-aria-TabList',
    values: {
      get orientation() { return orientation(); },
      state
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');
  let persistedKeys = usePersistedKeys(() => state.selectionManager.focusedKey);

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, tabListProps)}
      ref={objectRef}
      data-orientation={orientation()}>
      <SharedElementTransition>
        <CollectionRoot
          collection={state.collection}
          persistedKeys={persistedKeys()}
        />
      </SharedElementTransition>
    </dom.div>
  );
}

class TabItemNode extends CollectionNode<unknown> {
  static readonly type = 'item';
}

/**
 * A Tab provides a title for an individual item within a TabList.
 */
export const Tab = /*#__PURE__*/ createLeafComponent(
  TabItemNode,
  (props: TabProps, forwardedRef: ForwardedRef<HTMLDivElement>, item: Node<unknown>) => {
    let state = useContext(TabListStateContext)!;
    let ref = useObjectRef<HTMLDivElement | HTMLAnchorElement>(forwardedRef as Ref<HTMLDivElement | HTMLAnchorElement>);
    let {tabProps, isSelected, isDisabled, isPressed} = useTab(
      merge({get key() { return item.key; }}, props),
      state,
      ref
    );
    let {focusProps, isFocused, isFocusVisible} = useFocusRing();
    let {hoverProps, isHovered} = useHover(merge(props, {get isDisabled() { return isDisabled(); }}));

    let renderProps = useRenderProps<TabRenderProps, any>(merge(omit(props, 'id'), {
      get children() { return item.rendered; },
      defaultClassName: 'react-aria-Tab',
      values: {
        get isSelected() { return isSelected(); },
        get isDisabled() { return isDisabled(); },
        get isFocused() { return isFocused(); },
        get isFocusVisible() { return isFocusVisible(); },
        get isPressed() { return isPressed(); },
        get isHovered() { return isHovered(); }
      }
    }));

    let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');

    return (
      <Dynamic component={item.props.href ? dom.a : dom.div}
        {...mergeProps(DOMProps, renderProps, tabProps, focusProps, hoverProps)}
        ref={ref}
        data-selected={isSelected() ? 'true' : undefined}
        data-disabled={isDisabled() ? 'true' : undefined}
        data-focused={isFocused() ? 'true' : undefined}
        data-focus-visible={isFocusVisible() ? 'true' : undefined}
        data-pressed={isPressed() ? 'true' : undefined}
        data-hovered={isHovered() ? 'true' : undefined}>
        <SelectionIndicatorContext value={{get isSelected() { return isSelected(); }}}>
          {renderProps.children}
        </SelectionIndicatorContext>
      </Dynamic>
    );
  }
);

export interface TabPanelsProps<T>
  extends
    Omit<CollectionProps<T>, 'disabledKeys'>,
    StyleProps,
    DOMRenderProps<'div', undefined>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-TabPanels'
   */
  className?: string;
}

/**
 * Groups multiple `<TabPanel>` elements, and provides CSS variables for animated transitions.
 */
export const TabPanels = /*#__PURE__*/ createHideableComponent(function TabPanels<T>(
  props: TabPanelsProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  let state = useContext(TabListStateContext)!;
  let ref = useObjectRef<HTMLDivElement>(forwardedRef as Ref<HTMLDivElement>);

  let selectedKeyRef = {current: untrack(() => state.selectedKey)};
  let hasTransition: {current: boolean | null} = {current: null};
  // The compute phase captures the old DOM before render effects apply the
  // selection. The apply phase measures the updated DOM and writes the source
  // CSS-variable transition. No mirrored state or production flush is needed.
  createEffect<{element: HTMLDivElement | null; selectedKey: Key | null; previousSize: DOMRect | null}>(previous => {
    let selectedKey = state.selectedKey;
    let element = ref.current;
    let previousSize = previous?.previousSize ?? null;
    if (selectedKey != null && selectedKey !== selectedKeyRef.current && element && hasTransition.current) {
      previousSize = element.getBoundingClientRect();
    }
    return {element, selectedKey, previousSize};
  }, ({element: el, selectedKey, previousSize}) => {
    if (!el) {
      return;
    }

    if (hasTransition.current == null) {
      hasTransition.current = /width|height|block-size|inline-size|all/.test(
        window.getComputedStyle(el).transition
      );
    }

    if (
      hasTransition.current &&
      selectedKeyRef.current != null &&
      selectedKeyRef.current !== selectedKey
    ) {
      // Measure auto size.
      el.style.setProperty('--tab-panel-width', 'auto');
      el.style.setProperty('--tab-panel-height', 'auto');
      let {width, height} = el.getBoundingClientRect();

      if (
        previousSize &&
        (previousSize.width !== width || previousSize.height !== height)
      ) {
        // Revert to previous size.
        el.style.setProperty('--tab-panel-width', previousSize.width + 'px');
        el.style.setProperty('--tab-panel-height', previousSize.height + 'px');

        // Force style re-calculation to trigger animations.
        window.getComputedStyle(el).height;

        // Animate to current pixel size.
        el.style.setProperty('--tab-panel-width', width + 'px');
        el.style.setProperty('--tab-panel-height', height + 'px');

        // When animations complete, revert back to auto size.
        let cancelled = false;
        Promise.all(el.getAnimations().map(a => a.finished))
          .then(() => {
            if (!cancelled) {
              el.style.setProperty('--tab-panel-width', 'auto');
              el.style.setProperty('--tab-panel-height', 'auto');
            }
          })
          .catch(() => {});
        selectedKeyRef.current = selectedKey;
        return () => { cancelled = true; };
      }
    }

    selectedKeyRef.current = selectedKey;
  });

  let DOMProps = omit(filterDOMProps(props, {labelable: true, global: true}), 'id');

  return (
    <dom.div
      render={props.render}
      {...DOMProps}
      ref={ref}
      style={props.style}
      className={props.className || 'react-aria-TabPanels'}>
      <Collection {...props} />
    </dom.div>
  );
});

/**
 * A TabPanel provides the content for a tab.
 */
export const TabPanel = /*#__PURE__*/ createHideableComponent(function TabPanel(
  props: TabPanelProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const state = useContext(TabListStateContext)!;
  let ref = useObjectRef<HTMLDivElement>(forwardedRef as Ref<HTMLDivElement>);

  // Track if the tab panel was initially selected on mount (after extra render to populate the collection).
  // In this case, we don't want to trigger animations.
  let isSelected = () => state.selectedKey === props.id;
  // Source history: latch the first populated selection, then permanently
  // clear initial-selection status after this panel is deselected.
  let isInitiallySelected = createMemo<boolean | null>(previous => {
    if (previous == null && state.selectedKey != null) return isSelected();
    if (!isSelected() && previous) return false;
    return previous ?? null;
  });

  let isExiting = useExitAnimation(ref, isSelected);

  return (
    <Show when={isSelected() || props.shouldForceMount || isExiting()}>
      <TabPanelInner
        {...props}
        tabPanelRef={ref}
        isInitiallySelected={isInitiallySelected() || false}
        isExiting={isExiting()}
      />
    </Show>
  );
});

function TabPanelInner(
  props: TabPanelProps & {
    tabPanelRef: ObjectRef<HTMLDivElement>;
    isInitiallySelected: boolean;
    isExiting: boolean;
  }
) {
  let state = useContext(TabListStateContext)!;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let ref = props.tabPanelRef;
  let otherProps = omit(props, 'id', 'tabPanelRef', 'isInitiallySelected', 'isExiting');
  let {tabPanelProps} = useTabPanel(props, state, ref);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing();

  let isSelected = () => state.selectedKey === props.id;
  let enterAnimation = useEnterAnimation(ref);
  let isEntering = () => enterAnimation() && !props.isInitiallySelected;
  let renderProps = useRenderProps(merge(omit(props, 'id'), {
    defaultClassName: 'react-aria-TabPanel',
    values: {
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); },
      // @ts-ignore - compatibility with React < 19
      get isInert() { return !isSelected(); },
      get isEntering() { return isEntering(); },
      get isExiting() { return props.isExiting; },
      state
    }
  }));

  let DOMProps = omit(filterDOMProps(otherProps, {global: true}), 'id');

  let selectedDOMProps = mergeProps(DOMProps, tabPanelProps, focusProps, renderProps);
  let unselectedDOMProps = mergeProps(DOMProps, renderProps);
  let domProps = merge(() => isSelected() ? selectedDOMProps : unselectedDOMProps);

  return (
    <dom.div
      {...domProps}
      ref={ref}
      data-focused={isFocused() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      // @ts-ignore
      inert={!isSelected() || props.inert ? true : undefined}
      data-inert={!isSelected() ? 'true' : undefined}
      data-entering={isEntering() ? 'true' : undefined}
      data-exiting={props.isExiting ? 'true' : undefined}>
      <TabsContext value={null}>
        <TabListStateContext value={null}>
        <CollectionRendererContext value={DefaultCollectionRenderer}>
          {renderProps.children}
        </CollectionRendererContext>
        </TabListStateContext>
      </TabsContext>
    </dom.div>
  );
}
