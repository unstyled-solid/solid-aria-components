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

import {AriaLabelingProps} from '@react-types/shared';
import {ContextValue, SlotProps} from 'react-aria-components/slots';
import {createContext, untrack, type Ref, type Element as ReactNode} from 'solid-js';
import {
  getAllowedOverrides,
  StylesPropWithHeight,
  UnsafeStyles
} from './style-utils' with {type: 'macro'};
import {style} from '../style' with {type: 'macro'};
import {Toolbar} from 'react-aria-components/Toolbar';
import {useSpectrumContextProps} from './useSpectrumContextProps';

export interface ActionButtonGroupProps extends AriaLabelingProps, UnsafeStyles, SlotProps {
  /** Spectrum-defined styles, returned by the `style()` macro. */
  styles?: StylesPropWithHeight;
  /** The children of the group. */
  children: ReactNode;
  /**
   * Size of the buttons.
   *
   * @default 'M'
   */
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  /**
   * Spacing between the buttons.
   *
   * @default 'regular'
   */
  density?: 'compact' | 'regular';
  /**
   * Whether the button should be displayed with a [quiet
   * style](https://spectrum.adobe.com/web/rsp/components/action-button#component-options).
   */
  isQuiet?: boolean;
  /** Whether the buttons should divide the container width equally. */
  isJustified?: boolean;
  /**
   * The static color style to apply. Useful when the ActionButtonGroup appears over a color
   * background.
   */
  staticColor?: 'white' | 'black' | 'auto';
  /**
   * The axis the group should align with.
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the group is disabled. */
  isDisabled?: boolean;
}

export const actionGroupStyle = style(
  {
    display: 'flex',
    flexDirection: {
      orientation: {
        horizontal: 'row',
        vertical: 'column'
      }
    },
    gap: {
      density: {
        compact: 2,
        regular: {
          size: {
            XS: 4,
            S: 4,
            M: 8,
            L: 8,
            XL: 8
          }
        }
      }
    }
  },
  getAllowedOverrides({height: true})
);

export const ActionButtonGroupContext =
  createContext<ContextValue<Partial<ActionButtonGroupProps>, HTMLDivElement>>(null);

/**
 * An ActionButtonGroup is a grouping of related ActionButtons.
 */
export function ActionButtonGroup(inputProps: ActionButtonGroupProps & {ref?: Ref<HTMLDivElement>}) {
  let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ActionButtonGroupContext);
  let density = () => props.density ?? 'regular';
  let size = () => props.size ?? 'M';
  let orientation = () => props.orientation ?? 'horizontal';

  // Make sure we get all the same defaults as the ActionButtonGroup
  let context = {
    get size() { return size(); },
    get density() { return density(); },
    get orientation() { return orientation(); },
    get isJustified() { return props.isJustified; },
    get isQuiet() { return props.isQuiet; },
    get staticColor() { return props.staticColor; },
    get isDisabled() { return props.isDisabled; }
  };

  return (
    <Toolbar
      {...props}
      ref={value => { ref.current = value; }}
      style={props.UNSAFE_style}
      className={
        (props.UNSAFE_className || '') + actionGroupStyle({size: size(), density: density(), orientation: orientation(), isJustified: props.isJustified}, props.styles)
      }>
      <ActionButtonGroupContext value={context}>
        {props.children}
      </ActionButtonGroupContext>
    </Toolbar>
  );
}
