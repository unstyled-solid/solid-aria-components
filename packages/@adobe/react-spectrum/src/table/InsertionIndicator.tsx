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

import {classNames} from '../utils/classNames';
import {ItemDropTarget} from '@react-types/shared';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import styles from './table.css';
import {useTableContext} from './TableViewBase';
import {useVisuallyHidden} from 'react-aria/VisuallyHidden';

interface InsertionIndicatorProps {
  target: ItemDropTarget;
  rowProps: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: Omit<JSX.CSSProperties, 'top' | 'height' | 'width'> & {top?: string | number; height?: string | number; width?: string | number};
  };
}

export function InsertionIndicator(props: InsertionIndicatorProps): JSX.Element {
  let context = useTableContext();

  let ref = useObjectRef<HTMLDivElement>();
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps} = context.dragAndDropHooks!.useDropIndicator!(props, context.dropState!, ref);
  let {visuallyHiddenProps} = useVisuallyHidden();

  let isDropTarget = () => context.dropState!.isDropTarget(props.target);
  let top = () => {
    let rowProps = props.rowProps;
    return typeof rowProps.style?.top === 'number' && typeof rowProps.style?.height === 'number'
      ? rowProps.style.top + (props.target.dropPosition === 'after' ? rowProps.style.height : 0)
      : 0;
  };
  let width = () => typeof props.rowProps.style?.width === 'number'
    ? `${props.rowProps.style.width}px`
    : props.rowProps.style?.width;

  return (
    <>{(isDropTarget() || !dropIndicatorProps['aria-hidden']) && <div
      style={{
        position: 'absolute',
        top: `${top()}px`,
        width: width()
      }}
      role="row"
      aria-hidden={dropIndicatorProps['aria-hidden']}>
      <div
        role="gridcell"
        class={classNames(styles, 'react-spectrum-Table-InsertionIndicator', {
          'react-spectrum-Table-InsertionIndicator--dropTarget': isDropTarget()
        })}>
        <div {...visuallyHiddenProps} role="button" {...dropIndicatorProps} ref={ref} />
      </div>
    </div>}</>
  );
}
