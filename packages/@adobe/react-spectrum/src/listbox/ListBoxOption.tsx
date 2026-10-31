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

import CheckmarkMedium from '@spectrum-icons/ui/CheckmarkMedium';
import {classNames} from '../utils/classNames';
import {ClearSlots, SlotProvider} from '../utils/Slots';
import {FocusRing} from 'react-aria/FocusRing';
import {Grid} from '../layout/Grid';
import {isFocusVisible} from 'react-aria/private/interactions/useFocusVisible';
import {ListBoxContext} from './ListBoxContext';
import {mergeProps} from 'react-aria/mergeProps';
import {Node} from '@react-types/shared';
import {merge, useContext} from 'solid-js';
import {Dynamic, type JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {Text} from '../text/Text';
import {useHover} from 'react-aria/useHover';
import {useOption} from 'react-aria/useListBox';

interface OptionProps<T> {
  item: Node<T>;
}

/** @private */
export function ListBoxOption<T>(props: OptionProps<T>): JSX.Element {
  let context = useContext(ListBoxContext)!;

  let ref = useObjectRef<HTMLDivElement | HTMLAnchorElement>();
  let {optionProps, labelProps, descriptionProps, isSelected, isDisabled, isFocused} = useOption(
    {
      get 'aria-label'() { return props.item['aria-label']; },
      get key() { return props.item.key; },
      isVirtualized: true
    },
    context.state,
    ref
  );
  let {hoverProps, isHovered} = useHover(merge(props, {
    get isDisabled() { return isDisabled(); }
  }));

  let contents = () => typeof props.item.rendered === 'string' ? <Text>{props.item.rendered}</Text> : props.item.rendered;
  let itemProps = merge(mergeProps(optionProps, merge(() => context.shouldFocusOnHover ? {} : hoverProps)), {
    ref,
    get class() { return classNames(styles, 'spectrum-Menu-item', {
      'is-focused': context.shouldUseVirtualFocus && isFocused() && isFocusVisible(),
      'is-disabled': isDisabled(),
      'is-selected': isSelected(),
      'is-selectable': context.state.selectionManager.selectionMode !== 'none',
      'is-hovered': (isHovered() && !context.shouldFocusOnHover) || (isFocused() && !isFocusVisible())
    }); }
  });

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => <Dynamic component={props.item.props.href ? 'a' : 'div'} {...compose(itemProps)}>
        <Grid UNSAFE_className={classNames(styles, 'spectrum-Menu-itemGrid')}>
          <ClearSlots>
            <SlotProvider
              slots={{
                text: merge({UNSAFE_className: styles['spectrum-Menu-itemLabel']}, labelProps),
                icon: {size: 'S', UNSAFE_className: styles['spectrum-Menu-icon']},
                avatar: {size: 'avatar-size-100', UNSAFE_className: styles['spectrum-Menu-avatar']},
                description: merge({UNSAFE_className: styles['spectrum-Menu-description']}, descriptionProps)
              }}>
              {contents()}
              {isSelected() && (
                <CheckmarkMedium
                  slot="checkmark"
                  UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
                />
              )}
            </SlotProvider>
          </ClearSlots>
        </Grid>
      </Dynamic>}
    </FocusRing>
  );
}
