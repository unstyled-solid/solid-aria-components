/*
 * Copyright 2021 Adobe. All rights reserved.
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

import {AriaLabelingProps, DOMProps, StyleProps} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {ClearSlots, SlotProvider} from '../utils/Slots';
import {Dialog} from '../dialog/Dialog';
import {DialogTrigger} from '../dialog/DialogTrigger';
import HelpOutline from '@spectrum-icons/workflow/HelpOutline';
import helpStyles from '@adobe/spectrum-css-temp/components/contextualhelp/vars.css';
import InfoOutline from '@spectrum-icons/workflow/InfoOutline';
import intlMessages from '../../intl/contextualhelp/*.json';
import {mergeProps} from 'react-aria/mergeProps';
import {OverlayTriggerProps} from 'react-stately/useOverlayTriggerState';
import {Placement, PositionProps} from 'react-aria/useOverlayPosition';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {FocusableRef} from '../utils/useDOMRef';
import {useLabels} from 'react-aria/private/utils/useLabels';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';

export interface SpectrumContextualHelpProps
  extends OverlayTriggerProps, PositionProps, StyleProps, DOMProps, AriaLabelingProps {
  /** Contents of the Contextual Help popover. */
  children: JSX.Element;
  /**
   * Indicates whether contents are informative or provides helpful guidance.
   *
   * @default 'help'
   */
  variant?: 'help' | 'info';
  /**
   * The placement of the popover with respect to the action button.
   *
   * @default 'bottom start'
   */
  placement?: Placement;
}

/**
 * Contextual help shows a user extra information about the state of an adjacent component, or a
 * total view.
 */
export function ContextualHelp(props: SpectrumContextualHelpProps & {ref?: FocusableRef<HTMLButtonElement>}) {
  let variant = () => props.variant ?? 'help';
  let otherProps = omit(props, 'variant', 'placement', 'children', 'ref');

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/contextualhelp');

  let icon = () => variant() === 'info' ? <InfoOutline /> : <HelpOutline />;

  let slots = {
    content: {UNSAFE_className: helpStyles['react-spectrum-ContextualHelp-content']},
    footer: {UNSAFE_className: helpStyles['react-spectrum-ContextualHelp-footer']}
  };

  let labelProps = useLabels(merge(otherProps, {
    get 'aria-label'() {
      return !otherProps['aria-label'] && !otherProps['aria-labelledby']
        ? stringFormatter.format(variant())
        : otherProps['aria-label'];
    }
  }));

  return (
    <DialogTrigger {...otherProps} type="popover" placement={props.placement ?? 'bottom start'} hideArrow>
      <ActionButton
        {...mergeProps(otherProps, labelProps, {isDisabled: false})}
        ref={props.ref}
        UNSAFE_className={classNames(
          helpStyles,
          'react-spectrum-ContextualHelp-button',
          otherProps.UNSAFE_className
        )}
        isQuiet>
        {icon()}
      </ActionButton>
      <ClearSlots>
        <SlotProvider slots={slots}>
          <Dialog UNSAFE_className={classNames(helpStyles, 'react-spectrum-ContextualHelp-dialog')}>
            {props.children}
          </Dialog>
        </SlotProvider>
      </ClearSlots>
    </DialogTrigger>
  );
}
