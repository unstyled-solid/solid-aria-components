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

import {DragPreview} from '../../src/dnd/DragPreview';

import {mergeProps} from '../../src/utils/mergeProps';
import {merge} from 'solid-js';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {useButton} from '../../src/button/useButton';
import {useDrag} from '../../src/dnd/useDrag';
import {useDrop} from '../../src/dnd/useDrop';

export function Draggable(props) {
  let preview = useObjectRef();
  let {dragProps, isDragging} = useDrag(merge({
    getItems() {
      return [
        {
          'text/plain': 'hello world'
        }
      ];
    },
    preview
  }, props));

  return (
    <>
      <div {...dragProps} role="button" tabIndex={0} data-dragging={String(isDragging())}>
        {props.children || 'Drag me'}
      </div>
      {props.renderPreview && <DragPreview ref={preview}>{props.renderPreview}</DragPreview>}
    </>
  );
}

export function Droppable(props) {
  let ref = useObjectRef();
  let {dropProps, isDropTarget} = useDrop(merge({ref}, props));

  let {buttonProps} = useButton({elementType: 'div'}, ref);

  return (
    <div {...mergeProps(dropProps, buttonProps)} ref={ref} data-droptarget={String(isDropTarget())}>
      {props.children || 'Drop here'}
    </div>
  );
}
