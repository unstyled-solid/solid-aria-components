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

import {AriaTagProps, useTag} from 'react-aria/useTagGroup';

import {classNames} from '../utils/classNames';
import {ClearButton} from '../button/ClearButton';
import {ClearSlots, SlotProvider} from '../utils/Slots';
import type {ListState} from 'react-stately/useListState';
import {mergeProps} from 'react-aria/mergeProps';
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {StyleProps, Node} from '@react-types/shared';
import clsx from 'clsx';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/tags/vars.css';
import {Text} from '../text/Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumTagProps<T> extends AriaTagProps<T> {
  state: ListState<T>;
}

export function Tag<T>(props: SpectrumTagProps<T>): JSX.Element {
  const otherProps = omit(props, 'item', 'state');

  let {styleProps} = useStyleProps(otherProps as StyleProps);
  let {hoverProps, isHovered} = useHover({});
  let {isFocused, isFocusVisible, focusProps} = useFocusRing({within: false});
  let ref = useObjectRef<HTMLDivElement>();
  let {removeButtonProps, gridCellProps, rowProps, allowsRemoving} = useTag(
    props,
    props.state,
    ref
  );

  return (
    <div
      {...mergeProps(rowProps, hoverProps, focusProps)}
      class={classNames(
        styles,
        'spectrum-Tag',
        {
          'focus-ring': isFocusVisible(),
          'is-focused': isFocused(),
          'is-hovered': isHovered(),
          'spectrum-Tag--removable': allowsRemoving()
        },
        clsx(styleProps.class)
      )}
      ref={ref}>
      <div class={classNames(styles, 'spectrum-Tag-cell')} {...gridCellProps as JSX.HTMLAttributes<HTMLDivElement>}>
        <SlotProvider
          slots={{
            icon: {UNSAFE_className: classNames(styles, 'spectrum-Tag-icon'), size: 'XS'},
            text: {UNSAFE_className: classNames(styles, 'spectrum-Tag-content')},
            avatar: {
              UNSAFE_className: classNames(styles, 'spectrum-Tag-avatar'),
              size: 'avatar-size-50'
            }
          }}>
          {typeof props.item.rendered === 'string' ? <Text>{props.item.rendered}</Text> : props.item.rendered}
          <ClearSlots>
            {allowsRemoving() && (
              <TagRemoveButton
                item={props.item}
                {...removeButtonProps}
                UNSAFE_className={classNames(styles, 'spectrum-Tag-removeButton')}
              />
            )}
          </ClearSlots>
        </SlotProvider>
      </div>
    </div>
  );
}

function TagRemoveButton(props: Parameters<typeof ClearButton>[0] & {item: Node<unknown>}) {
  let {styleProps} = useStyleProps(props);

  return (
    <span {...styleProps}>
      <ClearButton {...props} inset />
    </span>
  );
}
