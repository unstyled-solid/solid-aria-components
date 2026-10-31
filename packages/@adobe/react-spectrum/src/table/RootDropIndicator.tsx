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

import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useTableContext} from './TableViewBase';
import {useVisuallyHidden} from 'react-aria/VisuallyHidden';

export function RootDropIndicator(): JSX.Element {
  let context = useTableContext();
  let ref = useObjectRef<HTMLDivElement>();
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps} = context.dragAndDropHooks!.useDropIndicator!(
    {
      target: {type: 'root'}
    },
    context.dropState!,
    ref
  );
  let isDropTarget = () => context.dropState!.isDropTarget({type: 'root'});
  let {visuallyHiddenProps} = useVisuallyHidden();

  return (
    <>{(isDropTarget() || !dropIndicatorProps['aria-hidden']) && <div role="row" aria-hidden={dropIndicatorProps['aria-hidden']}>
      <div role="gridcell" aria-selected="false" aria-colspan={context.state.collection.columns.length}>
        <div role="button" {...visuallyHiddenProps} {...dropIndicatorProps} ref={ref} />
      </div>
    </div>}</>
  );
}
