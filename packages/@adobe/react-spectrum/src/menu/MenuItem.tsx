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
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import {classNames} from '../utils/classNames';
import {ClearSlots, SlotProvider} from '../utils/Slots';
import {DOMAttributes, Node} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {Grid} from '../layout/Grid';
import InfoOutline from '@spectrum-icons/workflow/InfoOutline';
import intlMessages from '../../intl/menu/*.json';
import {merge, omit} from 'solid-js';
import {Dynamic, type JSX} from '@solidjs/web';
import {mergeProps} from 'react-aria/mergeProps';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {Text} from '../text/Text';
import {TreeState} from 'react-stately/useTreeState';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useMenuContext, useSubmenuTriggerContext} from './context';
import {useMenuItem} from 'react-aria/useMenu';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {useSlotId} from 'react-aria/private/utils/useId';

interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  isVirtualized?: boolean;
}

/** @private */
export function MenuItem<T>(props: MenuItemProps<T>): JSX.Element {
  let menuContext = useMenuContext();

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/menu');
  let locale = useLocale();

  let submenuTriggerContext = useSubmenuTriggerContext();
  let submenuTriggerProps = omit(submenuTriggerContext || {}, 'triggerRef');
  let isSubmenuTrigger = !!submenuTriggerContext;
  let isUnavailable = () => isSubmenuTrigger ? submenuTriggerContext!.isUnavailable : undefined;
  let isDisabled = () => props.state.disabledKeys.has(props.item.key);
  let isContextualHelpTrigger = () => isSubmenuTrigger && isUnavailable() !== undefined;
  let isSelectable = () =>
    (isContextualHelpTrigger() ? !isUnavailable() : !isSubmenuTrigger) &&
    props.state.selectionManager.selectionMode !== 'none';
  let isSelected = () => isSelectable() && props.state.selectionManager.isSelected(props.item.key);
  let itemref = useObjectRef<HTMLElement>();
  // oxlint-disable-next-line react/react-compiler
  let ref = useObjectRef(itemref);
  useSyncRef({get ref() { return submenuTriggerContext?.triggerRef; }}, ref);
  let {menuItemProps, labelProps, descriptionProps, keyboardShortcutProps} = useMenuItem(
    merge({
      get isSelected() { return isSelected(); },
      get isDisabled() { return isDisabled(); },
      get 'aria-label'() { return props.item['aria-label']; },
      get key() { return props.item.key; },
      get closeOnSelect() { return menuContext.closeOnSelect; },
      get isVirtualized() { return props.isVirtualized; }
    }, submenuTriggerProps),
    props.state,
    ref
  );
  let endId = useSlotId();
  let endProps: DOMAttributes = {get id() { return endId(); }};
  let hostProps = merge(menuItemProps, {
    ref,
    get 'aria-describedby'() { return endId() ? [menuItemProps['aria-describedby'], endId()]
      .filter(Boolean)
      .join(' ') : menuItemProps['aria-describedby']; },
    get class() { return classNames(styles, 'spectrum-Menu-item', {
      'is-disabled': isDisabled(),
      'is-selected': isSelected(),
      'is-selectable': isSelectable(),
      'is-open': submenuTriggerContext?.isOpen
    }); }
  });

  let contents = () => typeof props.item.rendered === 'string' ? <Text>{props.item.rendered}</Text> : props.item.rendered;

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => <Dynamic component={props.item.props.href ? 'a' : 'div'} {...compose(hostProps)}>
        <Grid UNSAFE_className={classNames(styles, 'spectrum-Menu-itemGrid')}>
          <ClearSlots>
            <SlotProvider
              slots={{
                text: merge({UNSAFE_className: styles['spectrum-Menu-itemLabel']}, labelProps),
                end: merge({UNSAFE_className: styles['spectrum-Menu-end']}, endProps),
                icon: {UNSAFE_className: styles['spectrum-Menu-icon'], size: 'S'},
                description: merge({UNSAFE_className: styles['spectrum-Menu-description']}, descriptionProps),
                keyboard: merge({UNSAFE_className: styles['spectrum-Menu-keyboard']}, keyboardShortcutProps),
                chevron: {UNSAFE_className: styles['spectrum-Menu-chevron'], size: 'S'}
              }}>
              {contents()}
              {isSelected() && (
                <CheckmarkMedium
                  slot="checkmark"
                  UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
                />
              )}
              {isUnavailable() && (
                <InfoOutline
                  slot="end"
                  size="XS"
                  alignSelf="center"
                  aria-label={stringFormatter.format('unavailable')}
                />
              )}
              {isUnavailable() == null &&
                isSubmenuTrigger &&
                (locale.direction === 'rtl' ? (
                  <ChevronLeft slot="chevron" />
                ) : (
                  <ChevronRight slot="chevron" />
                ))}
            </SlotProvider>
          </ClearSlots>
        </Grid>
      </Dynamic>}
    </FocusRing>
  );
}
