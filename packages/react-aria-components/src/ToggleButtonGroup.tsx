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
import {AriaToggleButtonGroupProps, useToggleButtonGroup} from 'react-aria/useToggleButtonGroup';

import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes, Orientation} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import {ToggleGroupStateContext} from './ToggleGroupStateContext';
export {ToggleGroupStateContext} from './ToggleGroupStateContext';
import {SharedElementTransition} from './SharedElementTransition';
import {ToggleGroupState, useToggleGroupState} from 'react-stately/useToggleGroupState';

export interface ToggleButtonGroupRenderProps {
  /**
   * The orientation of the toggle button group.
   *
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
  /**
   * Whether the toggle button group is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the toggle button group.
   */
  state: ToggleGroupState;
}

export interface ToggleButtonGroupProps
  extends
    AriaToggleButtonGroupProps,
    RenderProps<ToggleButtonGroupRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ToggleButtonGroup'
   */
  className?: ClassNameOrFunction<ToggleButtonGroupRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ToggleButtonGroupContext = createContext<
  ContextValue<ToggleButtonGroupProps, HTMLDivElement>
>({});

/**
 * A toggle button group allows a user to toggle multiple options, with single or multiple
 * selection.
 */
export function ToggleButtonGroup(originalProps: ToggleButtonGroupProps): JSX.Element {
    let [props, mergedRef] = useContextProps(originalProps, originalProps.ref, ToggleButtonGroupContext);
    let ref = useObjectRef<HTMLDivElement>(mergedRef as ObjectRefInput<HTMLDivElement>);
    let state = useToggleGroupState(props);
    let {groupProps} = useToggleButtonGroup(props, state, ref);

    let renderProps = useRenderProps(merge(props, {
      values: {
        get orientation() { return props.orientation || 'horizontal'; },
        get isDisabled() { return state.isDisabled; },
        state
      },
      defaultClassName: 'react-aria-ToggleButtonGroup'
    }));

    let DOMProps = filterDOMProps(props, {global: true});

    return (
      <dom.div
        {...mergeProps(DOMProps, renderProps, groupProps)}
        ref={ref}
        slot={props.slot || undefined}
        data-orientation={props.orientation || 'horizontal'}
        data-disabled={props.isDisabled ? 'true' : undefined}>
        <ToggleGroupStateContext value={state}>
          <SharedElementTransition>{renderProps.children}</SharedElementTransition>
        </ToggleGroupStateContext>
      </dom.div>
    );
}
