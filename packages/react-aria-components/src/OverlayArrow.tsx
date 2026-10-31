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
  ClassNameOrFunction,
  ContextValue,
  dom,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import type {AriaLabelingProps, GlobalDOMAttributes} from '@react-types/shared';
import {merge, untrack, type Context, type Ref as NativeRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';

import {OverlayArrowContext, type OverlayArrowContextValue, type OverlayArrowProps} from './OverlayArrowContext';
export {OverlayArrowContext} from './OverlayArrowContext';
export type {OverlayArrowProps, OverlayArrowRenderProps} from './OverlayArrowContext';

/**
 * An OverlayArrow renders a custom arrow element relative to an overlay element
 * such as a popover or tooltip such that it aligns with a trigger element.
 */
export function OverlayArrow(props: OverlayArrowProps & AriaLabelingProps & GlobalDOMAttributes<HTMLDivElement> & SlotProps & {ref?: NativeRef<HTMLDivElement>}) {
  let ref = untrack(() => props.ref);
  // The canonical native HTML bag also accepts removal values. RAC's source
  // slot/label helper consumes the source-compatible subset without changing
  // the context identity or the live values it supplies.
  [props, ref] = useContextProps<typeof props, typeof props, HTMLDivElement>(props, ref, OverlayArrowContext as Context<ContextValue<typeof props, HTMLDivElement>>);
  let domRef = useObjectRef<HTMLDivElement>(ref as Ref<HTMLDivElement>);
  let placement = () => (props as OverlayArrowContextValue).placement;
  let style = (): JSX.CSSProperties => ({
    position: 'absolute',
    transform:
      placement() === 'top' || placement() === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
    ...(placement() != null ? {[placement()!]: '100%'} : {})
  });

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-OverlayArrow',
    values: {
      get placement() { return placement(); }
    }
  }));
  // remove undefined values from renderProps.style object so that it can be
  // spread merged with the other style object
  let mergedStyle = () => {
    let overrides = Object.fromEntries(Object.entries(renderProps.style ?? {}).filter(([, value]) => value !== undefined));
    return {...style(), ...overrides} as JSX.CSSProperties;
  };

  let DOMProps = filterDOMProps(props);

  return (
    <dom.div
      {...DOMProps}
      {...renderProps}
      style={mergedStyle()}
      ref={domRef}
      data-placement={placement()}
    />
  );
}
