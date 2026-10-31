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

import {
  Alignment,
  DOMProps,
  LabelPosition,
  NecessityIndicator,
  StyleProps
} from '@react-types/shared';
import Asterisk from '@spectrum-icons/ui/Asterisk';
import {classNames} from '../utils/classNames';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import intlMessages from '../../intl/label/*.json';
import {omit} from 'solid-js';
import {dynamic, type JSX, type ValidComponent as ElementType} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/fieldlabel/vars.css';
import {createDOMRef, useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';

export interface LabelProps {
  children?: JSX.Element;
  htmlFor?: string; // for compatibility with React
  for?: string;
  elementType?: ElementType;
}

export interface SpectrumLabelPropsBase extends LabelProps, DOMProps, StyleProps {
  labelPosition?: LabelPosition; // default top
  labelAlign?: Alignment; // default start
  isRequired?: boolean;
  necessityIndicator?: NecessityIndicator; // default icon
  includeNecessityIndicatorInAccessibilityName?: boolean;
}

export interface SpectrumLabelProps extends SpectrumLabelPropsBase, Omit<JSX.HTMLAttributes<HTMLElement>, keyof SpectrumLabelPropsBase> {}

export function Label(input: SpectrumLabelProps & {ref?: DOMRef<HTMLLabelElement>}) {
  let props = useProviderProps(input);
  let labelPosition = () => props.labelPosition ?? 'top';
  let labelAlign = () => props.labelAlign ?? (labelPosition() === 'side' ? 'start' : null);
  let necessityIndicator = () => props.necessityIndicator ?? (props.isRequired != null ? 'icon' : null);
  let ElementType = dynamic(() => props.elementType ?? 'label');
  let otherProps = omit(props, 'children', 'labelPosition', 'labelAlign', 'isRequired', 'necessityIndicator', 'includeNecessityIndicatorInAccessibilityName', 'htmlFor', 'for', 'elementType', 'onClick', 'ref');

  let domRef = useDOMRef<HTMLLabelElement>();
  let handle = createDOMRef(domRef);
  useSyncRef({get ref() {return input.ref;}}, {
    get current() {return domRef.current ? handle : null;}
  });
  let {styleProps} = useStyleProps(otherProps);

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/label');
  let necessityLabel = () => props.isRequired
    ? stringFormatter.format('(required)')
    : stringFormatter.format('(optional)');
  let icon = () => (
    <Asterisk
      UNSAFE_className={classNames(styles, 'spectrum-FieldLabel-requiredIcon')}
      aria-label={
        props.includeNecessityIndicatorInAccessibilityName
          ? stringFormatter.format('(required)')
          : undefined
      }
    />
  );

  let labelClassNames = () => classNames(
    styles,
    'spectrum-FieldLabel',
    {
      'spectrum-FieldLabel--positionSide': labelPosition() === 'side',
      'spectrum-FieldLabel--alignEnd': labelAlign() === 'end'
    },
    styleProps.class as string | undefined
  );

  return (
    <ElementType
      {...filterDOMProps(otherProps as Parameters<typeof filterDOMProps>[0])}
      {...styleProps}
      onClick={props.onClick}
      ref={domRef}
      class={labelClassNames()}
      for={(props.elementType ?? 'label') === 'label' ? props.for || props.htmlFor : undefined}>
      {props.children}
      {(necessityIndicator() === 'label' || (necessityIndicator() === 'icon' && props.isRequired)) &&
        ' \u200b'}
      {/* necessityLabel is hidden to screen readers if the field is required because
       * aria-required is set on the field in that case. That will already be announced,
       * so no need to duplicate it here. If optional, we do want it to be announced here. */}
      {necessityIndicator() === 'label' && (
        <span aria-hidden={!props.includeNecessityIndicatorInAccessibilityName && props.isRequired != null ? props.isRequired ? 'true' : 'false' : undefined}>
          {necessityLabel()}
        </span>
      )}
      {necessityIndicator() === 'icon' && props.isRequired && icon()}
    </ElementType>
  );
}
