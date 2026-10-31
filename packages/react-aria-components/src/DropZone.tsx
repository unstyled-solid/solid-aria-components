/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, GlobalDOMAttributes, HoverEvents} from '@react-types/shared';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {DropOptions, useDrop} from 'react-aria/useDrop';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {focusWithoutScrolling} from 'react-aria/private/utils/focusWithoutScrolling';
import {getEventTarget, nodeContains} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import intlMessages from '../intl/*.json';
import {isFocusable} from 'react-aria/private/utils/isFocusable';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, untrack, type Ref} from 'solid-js';
import type {Ref as NativeRef} from 'react-aria/private/utils/useObjectRef';
import {TextContext} from './Text';
import {useButton} from 'react-aria/useButton';
import {useClipboard} from 'react-aria/useClipboard';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useLabels} from 'react-aria/private/utils/useLabels';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useSlotId} from 'react-aria/private/utils/useId';
import {VisuallyHidden} from 'react-aria/VisuallyHidden';

export interface DropZoneRenderProps {
  /**
   * Whether the dropzone is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the dropzone is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the dropzone is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the dropzone is the drop target.
   *
   * @selector [data-drop-target]
   */
  isDropTarget: boolean;
  /**
   * Whether the dropzone is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface DropZoneProps
  extends
    Omit<DropOptions, 'getDropOperationForPoint' | 'ref' | 'hasDropButton'>,
    HoverEvents,
    RenderProps<DropZoneRenderProps>,
    SlotProps,
    AriaLabelingProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-DropZone'
   */
  className?: ClassNameOrFunction<DropZoneRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const DropZoneContext = createContext<ContextValue<DropZoneProps, HTMLDivElement>>(null);

/**
 * A drop zone is an area into which one or multiple objects can be dragged and dropped.
 */
export function DropZone(input: DropZoneProps) {
  let isDisabled = () => input.isDisabled ?? false;
  let [props, ref] = useContextProps(input, untrack(() => input.ref), DropZoneContext);
  let dropzoneRef = useObjectRef(ref as NativeRef<HTMLDivElement>);
  let buttonRef = useObjectRef<HTMLButtonElement>();
  let {dropProps, dropButtonProps, isDropTarget} = useDrop(merge(props, {
    ref: buttonRef,
    hasDropButton: true
  }));
  let {buttonProps} = useButton(dropButtonProps || {}, buttonRef);
  let {hoverProps, isHovered} = useHover(props);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let stringFormatter = useLocalizedStringFormatter(intlMessages, 'react-aria-components');

  let textId = useSlotId();
  let labelProps = useLabels({
    get 'aria-label'() {return props['aria-label'] || stringFormatter.format('dropzoneLabel');},
    get 'aria-labelledby'() {return [textId(), props['aria-labelledby']].filter(Boolean).join(' ');}
  });

  let {clipboardProps} = useClipboard({
    get isDisabled() {return isDisabled();},
    onPaste: items =>
      props.onDrop?.({
        type: 'drop',
        items,
        x: 0,
        y: 0,
        dropOperation: 'copy'
      })
  });

  let renderProps = useRenderProps(merge(props, {
    values: {
      get isHovered() {return isHovered();},
      get isFocused() {return isFocused();},
      get isFocusVisible() {return isFocusVisible();},
      get isDropTarget() {return isDropTarget();},
      get isDisabled() {return isDisabled();}
    },
    defaultClassName: 'react-aria-DropZone'
  }));
  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <TextContext value={{get id() {return textId();}, slot: 'label'}}>
      <dom.div
        {...mergeProps(DOMProps, renderProps, dropProps, hoverProps)}
        slot={props.slot || undefined}
        ref={dropzoneRef}
        onClick={e => {
          let target = getEventTarget(e) as HTMLElement | null;
          while (target && nodeContains(dropzoneRef.current, target)) {
            if (isFocusable(target)) {
              break;
            } else if (target === dropzoneRef.current && buttonRef.current) {
              focusWithoutScrolling(buttonRef.current);
              break;
            }

            target = target.parentElement;
          }
        }}
        data-hovered={isHovered() ? 'true' : undefined}
        data-focused={isFocused() ? 'true' : undefined}
        data-focus-visible={isFocusVisible() ? 'true' : undefined}
        data-drop-target={isDropTarget() ? 'true' : undefined}
        data-disabled={isDisabled() ? 'true' : undefined}>
        <VisuallyHidden>
          <button
            {...mergeProps(buttonProps, focusProps, clipboardProps, labelProps)}
            ref={buttonRef}
          />
        </VisuallyHidden>
        {renderProps.children}
      </dom.div>
    </TextContext>
  );
}
