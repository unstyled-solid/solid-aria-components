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

import {DragItem, DragPreviewRenderer} from '@react-types/shared';
import {createRoot, getOwner, onCleanup, onSettled, runWithOwner, untrack} from 'solid-js';
import {attachRef, type Ref} from '../utils/useObjectRef';
import {insert, type JSX} from '@solidjs/web';

export interface DragPreviewProps {
  /**
   * A render function which returns a preview element, or an object containing the element
   * and a custom offset. If an object is returned, the provided `x` and `y` values will be
   * used as the drag preview offset instead of the default calculation.
   */
  children: (
    items: DragItem[]
  ) => JSX.Element | {element: JSX.Element; x: number; y: number} | null;
}

export function DragPreview(props: DragPreviewProps & {ref?: Ref<DragPreviewRenderer | null>}): JSX.Element {
  let owner = getOwner();
  let disposePreview: (() => void) | undefined;
  let raf: ReturnType<typeof requestAnimationFrame> | undefined;
  let clear = () => {
    disposePreview?.();
    disposePreview = undefined;
  };
  let renderer: DragPreviewRenderer =
      (items: DragItem[], callback: (node: HTMLElement | null, x?: number, y?: number) => void) => {
        // This will be called during the onDragStart event by useDrag. We need to render the
        // preview synchronously before this event returns so we can call event.dataTransfer.setDragImage.

        if (raf !== undefined) cancelAnimationFrame(raf);
        clear();
        runWithOwner(owner, () => createRoot(dispose => {
        let result = props.children(items);
        let element: JSX.Element | null;
        let offsetX: number | undefined;
        let offsetY: number | undefined;

        if (result && typeof result === 'object' && 'element' in result) {
          element = result.element;
          offsetX = result.x;
          offsetY = result.y;
        } else {
          element = result as JSX.Element | null;
        }

        let node: HTMLDivElement | null = null;
        if (element) {
          node = document.createElement('div');
          Object.assign(node.style, {zIndex: '-100', position: 'fixed', top: '0px', left: '-100000px'});
          document.body.appendChild(node);
          onCleanup(() => node?.remove());
          // RC13 insert runs its initial effect inline unless schedule:true is
          // requested. Keep the source render callback inside this owned root.
          insert(node, element, undefined, undefined, {schedule: false});
        }
        disposePreview = dispose;

        // Yield back to useDrag to set the drag image.
        callback(node, offsetX, offsetY);

        // Remove the preview from the DOM after a frame so the browser has time to paint.
        raf = requestAnimationFrame(() => {
          raf = undefined;
          clear();
        });
        }));
      };
  let ref = untrack(() => props.ref);
  let detach = () => {};
  onSettled(() => { detach = attachRef(ref, renderer); });
  onCleanup(() => {
    if (raf !== undefined) cancelAnimationFrame(raf);
    clear();
    detach();
  });
  return null;
}
