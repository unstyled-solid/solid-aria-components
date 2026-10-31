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
import {createContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {DOMProps} from '@react-types/shared';
import type {PlacementAxis} from 'react-aria/useOverlayPosition';
import type {ClassNameOrFunction, ContextValue, RenderProps} from './utils';

export interface OverlayArrowContextValue extends OverlayArrowProps {
  placement: PlacementAxis | null;
}

export const OverlayArrowContext = createContext<
  ContextValue<OverlayArrowContextValue, HTMLDivElement>
>({
  placement: 'bottom'
});

export interface OverlayArrowProps
  extends
    Omit<JSX.HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'render' | 'children' | keyof DOMProps>,
    RenderProps<OverlayArrowRenderProps>,
    DOMProps {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-OverlayArrow'
   */
  className?: ClassNameOrFunction<OverlayArrowRenderProps>;
}

export interface OverlayArrowRenderProps {
  /**
   * The placement of the overlay relative to the trigger.
   *
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis | null;
}
