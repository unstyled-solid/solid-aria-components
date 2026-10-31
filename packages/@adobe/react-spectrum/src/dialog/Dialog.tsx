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

import {ActionButton} from '../button/ActionButton';
import {AriaDialogProps, useDialog} from 'react-aria/useDialog';
import {classNames} from '../utils/classNames';
import CrossLarge from '@spectrum-icons/ui/CrossLarge';
import {DialogContext, DialogContextValue} from './context';
import {DOMRefValue, StyleProps} from '@react-types/shared';
import {Grid} from '../layout/Grid';
import intlMessages from '../../intl/dialog/*.json';
import {mergeProps} from 'react-aria/mergeProps';
import {omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import {SlotProvider, useSlotProps} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/dialog/vars.css';
import {unwrapDOMRef, useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useHasChild} from '../utils/useHasChild';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumDialogProps extends AriaDialogProps, StyleProps {
  /** The contents of the Dialog. */
  children?: JSX.Element;
  ref?: DOMRef;
  /** The size of the Dialog. Only applies to "modal" type Dialogs. */
  size?: 'S' | 'M' | 'L';
  /** Whether the Dialog is dismissable. See the [examples](#examples) for more details. */
  isDismissable?: boolean;
  /** Handler that is called when the 'x' button of a dismissable Dialog is clicked. */
  onDismiss?: () => void;
}

let sizeMap = {
  S: 'small',
  M: 'medium',
  L: 'large',
  fullscreen: 'fullscreen',
  fullscreenTakeover: 'fullscreenTakeover'
};

/**
 * Dialogs are windows containing contextual information, tasks, or workflows that appear over the
 * user interface. Depending on the kind of Dialog, further interactions may be blocked until the
 * Dialog is acknowledged.
 */
export function Dialog(props: SpectrumDialogProps) {
  props = useSlotProps(props, 'dialog');
  let context = useContext(DialogContext) || ({} as DialogContextValue);
  let contextProps = omit(context, 'type');
  let type = () => context.type ?? 'modal';
  let isDismissable = () => props.isDismissable ?? contextProps.isDismissable;
  let onDismiss = () => props.onDismiss ?? contextProps.onClose;
  let otherProps = omit(props, 'children', 'isDismissable', 'onDismiss', 'size', 'ref');
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/dialog');
  let {styleProps} = useStyleProps(otherProps);

  let size = () => type() === 'popover' ? props.size || 'S' : props.size || 'L';

  let domRef = useDOMRef(props.ref);
  let gridRef = useObjectRef<DOMRefValue<HTMLDivElement>>();
  let sizeVariant = () => sizeMap[type() as keyof typeof sizeMap] || sizeMap[size()];
  let {dialogProps, titleProps, contentProps} = useDialog(mergeProps(contextProps, props), domRef);

  // oxlint-disable-next-line react/react-compiler
  let hasHeader = useHasChild(`.${styles['spectrum-Dialog-header']}`, unwrapDOMRef(gridRef));
  // oxlint-disable-next-line react/react-compiler
  let hasHeading = useHasChild(`.${styles['spectrum-Dialog-heading']}`, unwrapDOMRef(gridRef));
  // oxlint-disable-next-line react/react-compiler
  let hasFooter = useHasChild(`.${styles['spectrum-Dialog-footer']}`, unwrapDOMRef(gridRef));
  // oxlint-disable-next-line react/react-compiler
  let hasTypeIcon = useHasChild(`.${styles['spectrum-Dialog-typeIcon']}`, unwrapDOMRef(gridRef));

  let slots = {
      hero: {UNSAFE_className: styles['spectrum-Dialog-hero']},
      heading: mergeProps({
        get UNSAFE_className() {return classNames(styles, 'spectrum-Dialog-heading', {
          'spectrum-Dialog-heading--noHeader': !hasHeader(),
          'spectrum-Dialog-heading--noTypeIcon': !hasTypeIcon()
        });},
        level: 2
      }, titleProps),
      header: {
        get UNSAFE_className() {return classNames(styles, 'spectrum-Dialog-header', {
          // oxlint-disable-next-line react/react-compiler
          'spectrum-Dialog-header--noHeading': !hasHeading(),
          'spectrum-Dialog-header--noTypeIcon': !hasTypeIcon()
        });}
      },
      typeIcon: {UNSAFE_className: styles['spectrum-Dialog-typeIcon']},
      divider: {UNSAFE_className: styles['spectrum-Dialog-divider'], size: 'M'},
      content: mergeProps({UNSAFE_className: styles['spectrum-Dialog-content']}, contentProps),
      footer: {UNSAFE_className: styles['spectrum-Dialog-footer']},
      buttonGroup: {
        get UNSAFE_className() {return classNames(styles, 'spectrum-Dialog-buttonGroup', {
          'spectrum-Dialog-buttonGroup--noFooter': !hasFooter()
        });},
        align: 'end'
      }
    };

  return (
    <section
      {...styleProps}
      {...dialogProps}
      class={classNames(
        styles,
        'spectrum-Dialog',
        {
          [`spectrum-Dialog--${sizeVariant()}`]: sizeVariant(),
          'spectrum-Dialog--dismissable': isDismissable()
        },
        // Spectrum useStyleProps exposes UNSAFE_className through this getter.
        styleProps.class as string | undefined
      )}
      ref={domRef}>
      <Grid ref={gridRef} UNSAFE_className={styles['spectrum-Dialog-grid']}>
        <SlotProvider slots={slots}>{props.children}</SlotProvider>
        {isDismissable() && (
          <ActionButton
            UNSAFE_className={styles['spectrum-Dialog-closeButton']}
            isQuiet
            aria-label={stringFormatter.format('dismiss')}
            onPress={() => onDismiss()?.()}>
            <CrossLarge />
          </ActionButton>
        )}
      </Grid>
    </section>
  );
}
