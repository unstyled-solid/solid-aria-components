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

import {Alignment, DOMProps, Orientation, StyleProps} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {Provider, useProvider, useProviderProps} from '../provider/Provider';
import {createEffect, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {SlotProvider, useSlotProps} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/buttongroup/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';
import {useStyleProps} from '../utils/styleProps';
import {useValueEffect} from 'react-aria/private/utils/useValueEffect';

export interface SpectrumButtonGroupProps extends DOMProps, StyleProps {
  /** Whether the Buttons in the ButtonGroup are all disabled. */
  isDisabled?: boolean;
  /**
   * The axis the ButtonGroup should align with. Setting this to 'vertical' will prevent
   * any switching behaviors between 'vertical' and 'horizontal'.
   *
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /** The Buttons contained within the ButtonGroup. */
  children: JSX.Element;
  /**
   * The alignment of the buttons within the ButtonGroup.
   *
   * @default 'start'
   */
  align?: Alignment | 'center';
  ref?: DOMRef<HTMLDivElement>;
}

/**
 * ButtonGroup handles overflow for a grouping of buttons whose actions are related to each other.
 */
export function ButtonGroup(input: SpectrumButtonGroupProps) {
  let provider = useProvider();
  let props = input;
  props = useProviderProps(props);
  props = useSlotProps(props, 'buttonGroup');

  let orientation = () => props.orientation ?? 'horizontal';
  let otherProps = omit(props, 'children', 'orientation', 'isDisabled', 'align', 'ref');

  let {styleProps} = useStyleProps(otherProps);
  let domRef = useDOMRef(untrack(() => input.ref));
  let [hasOverflow, setHasOverflow] = useValueEffect<boolean | undefined>(false);

  // oxlint-disable react/react-compiler, react-hooks/exhaustive-deps
  let checkForOverflow = (element: HTMLDivElement | null, direction: Orientation) => {
    let computeHasOverflow = () => {
      if (element && direction === 'horizontal') {
        let buttonGroupChildren = Array.from(element.children) as HTMLElement[];
        let maxX = element.offsetWidth + 1; // + 1 to account for rounding errors
        // If any buttons have negative X positions (align="end") or extend beyond
        // the width of the button group (align="start"), then switch to vertical.
        if (
          buttonGroupChildren.some(
            child => child.offsetLeft < 0 || child.offsetLeft + child.offsetWidth > maxX
          )
        ) {
          return true;
        }
        return false;
      }
    };
    if (direction === 'horizontal') {
      setHasOverflow(function* () {
        // Force to horizontal for measurement.
        yield false;

        // Measure, and update if there is overflow.
        yield computeHasOverflow();
      });
    }
  };
  // oxlint-enable react/react-compiler, react-hooks/exhaustive-deps

  // There are two main reasons we need to remeasure:
  // 1. Internal changes: Check for initial overflow or when orientation/scale/children change (from checkForOverflow dep array)
  createEffect(() => ({orientation: orientation(), scale: provider.scale, children: props.children, element: domRef.current}), ({orientation: direction, element}) => {
    checkForOverflow(element, direction);
  });

  // 2. External changes: buttongroup won't change size due to any parents changing size, so listen to its container for size changes to figure out if we should remeasure
  let parent = {get current() {return domRef.current?.parentElement;}};
  // oxlint-disable react/react-compiler, react-hooks/exhaustive-deps
  // oxlint-enable react/react-compiler, react-hooks/exhaustive-deps
  useResizeObserver({ref: parent, onResize: () => {
    // The resize callback takes a current imperative snapshot; the internal
    // effect above separately subscribes to element/orientation replacement.
    checkForOverflow(untrack(() => domRef.current), untrack(orientation));
  }});

  return (
    <div
      {...filterDOMProps(otherProps)}
      {...styleProps}
      ref={domRef}
      class={classNames(
        styles,
        'spectrum-ButtonGroup',
        {
          'spectrum-ButtonGroup--vertical': orientation() === 'vertical' || hasOverflow(),
          'spectrum-ButtonGroup--alignEnd': (props.align ?? 'start') === 'end',
          'spectrum-ButtonGroup--alignCenter': (props.align ?? 'start') === 'center'
        },
        styleProps.class as string | undefined
      )}>
      <SlotProvider
        slots={{
          button: {
            UNSAFE_className: classNames(styles, 'spectrum-ButtonGroup-Button')
          }
        }}>
        <Provider isDisabled={props.isDisabled}>{props.children}</Provider>
      </SlotProvider>
    </div>
  );
}
