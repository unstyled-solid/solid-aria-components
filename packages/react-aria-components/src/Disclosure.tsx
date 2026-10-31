/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaDisclosureProps, DisclosureAria, useDisclosure} from 'react-aria/useDisclosure';

import {ButtonContext} from './Button';
import {
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  Provider,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {
  DisclosureGroupState,
  DisclosureGroupProps as StatelyDisclosureGroupProps,
  useDisclosureGroupState
} from 'react-stately/useDisclosureGroupState';
import {DisclosureState, useDisclosureState} from 'react-stately/useDisclosureState';

import {DOMProps, GlobalDOMAttributes, Key} from '@react-types/shared';

import {filterDOMProps} from 'react-aria/filterDOMProps';
import {LabelAriaProps} from 'react-aria/useLabel';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {createContext, omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useId} from 'react-aria/useId';

export interface DisclosureGroupProps
  extends
    StatelyDisclosureGroupProps,
    RenderProps<DisclosureGroupRenderProps>,
    DOMProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DisclosureGroup'
   */
  className?: ClassNameOrFunction<DisclosureGroupRenderProps>;
  ref?: JSX.Ref<HTMLDivElement>;
}

export interface DisclosureGroupRenderProps {
  /**
   * Whether the disclosure group is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the disclosure group.
   */
  state: DisclosureGroupState;
}

export const DisclosureGroupStateContext = createContext<DisclosureGroupState | null>(null);

/**
 * A DisclosureGroup is a grouping of related disclosures, sometimes called an accordion.
 * It supports both single and multiple expanded items.
 */
export function DisclosureGroup(props: DisclosureGroupProps) {
  let state = useDisclosureGroupState(props);

  let renderProps = useRenderProps(mergeProps(props, {
    defaultClassName: 'react-aria-DisclosureGroup',
    values: {
      get isDisabled() { return state.isDisabled; },
      state
    }
  }));

  let domProps = filterDOMProps(props, {global: true});

  return (
    <dom.div {...domProps} {...renderProps} ref={props.ref} data-disabled={props.isDisabled ? 'true' : undefined}>
      <DisclosureGroupStateContext value={state}>
        {renderProps.children}
      </DisclosureGroupStateContext>
    </dom.div>
  );
}

export interface DisclosureProps
  extends
    Omit<AriaDisclosureProps, 'children'>,
    RenderProps<DisclosureRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Disclosure'
   */
  className?: ClassNameOrFunction<DisclosureRenderProps>;
  ref?: JSX.Ref<HTMLDivElement>;
  /**
   * An id for the disclosure when used within a DisclosureGroup, matching the id used in
   * `expandedKeys`.
   */
  id?: Key;
}

export interface DisclosureRenderProps {
  /**
   * Whether the disclosure is expanded.
   *
   * @selector [data-expanded]
   */
  isExpanded: boolean;
  /**
   * Whether the disclosure has keyboard focus.
   *
   * @selector [data-focus-visible-within]
   */
  isFocusVisibleWithin: boolean;
  /**
   * Whether the disclosure is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the disclosure.
   */
  state: DisclosureState;
}

export const DisclosureContext = createContext<ContextValue<DisclosureProps, HTMLDivElement>>(null);
export const DisclosureStateContext = createContext<DisclosureState | null>(null);

interface InternalDisclosureContextValue {
  panelProps: DisclosureAria['panelProps'];
  panelRef: ObjectRef<HTMLDivElement>;
}

const InternalDisclosureContext = createContext<InternalDisclosureContextValue | null>(null);

/**
 * A disclosure is a collapsible section of content. It is composed of a a header with a heading and
 * trigger button, and a panel that contains the content.
 */
export function Disclosure(originalProps: DisclosureProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef({get ref() { return mergeRefs(originalProps.ref); }}, localRef);
  let [props, ref] = useContextProps(originalProps, localRef, DisclosureContext);
  let groupState = useContext(DisclosureGroupStateContext)!;
  let otherProps = omit(props, 'id');

  // Generate an id if one wasn't provided.
  // (can't pass id into useId since it can also be a number)
  let defaultId = useId();
  let id = () => props.id || defaultId();

  let isExpanded = () => groupState ? groupState.expandedKeys.has(id()) : props.isExpanded;
  let state = useDisclosureState(mergeProps(omit(props, 'onExpandedChange'), {
    get isExpanded() { return isExpanded(); },
    onExpandedChange(isExpanded: boolean) {
      if (groupState) {
        groupState.toggleKey(id());
      }

      props.onExpandedChange?.(isExpanded);
    }
  }));

  let panelRef = useObjectRef<HTMLDivElement>();
  let isDisabled = () => props.isDisabled || groupState?.isDisabled || false;
  let {buttonProps, panelProps} = useDisclosure(
    mergeProps(props, {
      get isExpanded() { return isExpanded(); },
      get isDisabled() { return isDisabled(); }
    }),
    state,
    panelRef
  );
  let {isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps} = useFocusRing({
    within: true
  });

  let renderProps = useRenderProps(mergeProps(otherProps, {
    id: undefined,
    defaultClassName: 'react-aria-Disclosure',
    values: {
      get isExpanded() { return state.isExpanded; },
      get isDisabled() { return isDisabled(); },
      get isFocusVisibleWithin() { return isFocusVisibleWithin(); },
      state
    }
  }));

  let domProps = filterDOMProps(otherProps, {global: true});

  return (
    <Provider
      values={[
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              trigger: mergeProps(buttonProps, {get 'aria-expanded'() { return state.isExpanded ? 'true' as const : 'false' as const; }})
            }
          }
        ],
        [InternalDisclosureContext, {panelProps, panelRef}],
        [DisclosureStateContext, state]
      ]}>
      <dom.div
        {...mergeProps(domProps, renderProps, focusWithinProps)}
        ref={ref}
        data-expanded={state.isExpanded ? 'true' : undefined}
        data-disabled={isDisabled() ? 'true' : undefined}
        data-focus-visible-within={isFocusVisibleWithin() ? 'true' : undefined}>
        {renderProps.children}
      </dom.div>
    </Provider>
  );
}

export interface DisclosurePanelRenderProps {
  /**
   * Whether keyboard focus is within the disclosure panel.
   *
   * @selector [data-focus-visible-within]
   */
  isFocusVisibleWithin: boolean;
}

export interface DisclosurePanelProps
  extends
    RenderProps<DisclosurePanelRenderProps>,
    DOMProps,
    LabelAriaProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DisclosurePanel'
   */
  className?: ClassNameOrFunction<DisclosurePanelRenderProps>;
  ref?: JSX.Ref<HTMLDivElement>;
  /**
   * The accessibility role for the disclosure's panel.
   *
   * @default 'group'
   */
  role?: 'group' | 'region';
  /**
   * The children of the component.
   */
  children: JSX.Element;
}

/**
 * A DisclosurePanel provides the content for a disclosure.
 */
export function DisclosurePanel(props: DisclosurePanelProps) {
    let {panelProps, panelRef} = useContext(InternalDisclosureContext)!;
    let {isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps} = useFocusRing({
      within: true
    });
    let renderProps = useRenderProps(mergeProps(props, {
      defaultClassName: 'react-aria-DisclosurePanel',
      values: {
        get isFocusVisibleWithin() { return isFocusVisibleWithin(); }
      }
    }));
    let DOMProps = filterDOMProps(props, {global: true, labelable: true});
    return (
      <dom.div
        {...mergeProps(DOMProps, renderProps, omit(panelProps, 'aria-hidden'), focusWithinProps, {get 'aria-hidden'() { return panelProps['aria-hidden'] ? 'true' as const : 'false' as const; }})}
        ref={mergeRefs(props.ref, panelRef)}
        role={props.role ?? 'group'}
        data-focus-visible-within={isFocusVisibleWithin() ? 'true' : undefined}>
        <Provider values={[[ButtonContext, null]]}>{props.children}</Provider>
      </dom.div>
    );
}
