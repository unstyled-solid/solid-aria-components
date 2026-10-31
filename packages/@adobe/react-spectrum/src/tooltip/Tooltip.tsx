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

import AlertSmall from '@spectrum-icons/ui/AlertSmall';
import {AriaTooltipProps, useTooltip} from 'react-aria/useTooltipTrigger';
import {classNames} from '../utils/classNames';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {StyleProps} from '@react-types/shared';
import InfoSmall from '@spectrum-icons/ui/InfoSmall';
import {mergeProps} from 'react-aria/mergeProps';
import {omit, untrack, useContext} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/tooltip/vars.css';
import SuccessSmall from '@spectrum-icons/ui/SuccessSmall';
import {TooltipContext} from './context';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumTooltipProps extends AriaTooltipProps, StyleProps {
  /**
   * The [visual style](https://spectrum.adobe.com/page/tooltip/#Semantic-variants) of the Tooltip.
   */
  variant?: 'neutral' | 'positive' | 'negative' | 'info';

  /**
   * The placement of the element with respect to its anchor element.
   *
   * @default 'top'
   */
  placement?: 'start' | 'end' | 'right' | 'left' | 'top' | 'bottom';

  /**
   * Whether the element is rendered.
   */
  showIcon?: boolean;

  children?: JSX.Element;
}

let iconMap = {
  info: InfoSmall,
  positive: SuccessSmall,
  negative: AlertSmall
};

/**
 * Display container for Tooltip content. Has a directional arrow dependent on its placement.
 */
export function Tooltip(inputProps: SpectrumTooltipProps & {ref?: DOMRef<HTMLDivElement>}) {
  let context = useContext(TooltipContext);
  let defaultRef = useDOMRef<HTMLDivElement>(untrack(() => inputProps.ref));
  let overlayRef = context.ref || defaultRef;
  let tooltipProviderProps = omit(context, 'ref', 'arrowProps', 'state', 'arrowRef');
  let props = mergeProps(inputProps, tooltipProviderProps);
  let variant = () => props.variant ?? 'neutral';
  let placement = () => props.placement ?? inputProps.placement ?? 'top';
  let otherProps = omit(props, 'variant', 'placement', 'isOpen', 'showIcon', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let {tooltipProps} = useTooltip(props, context.state);
  let Icon = dynamic(() => iconMap[variant() as keyof typeof iconMap]);

  return (
    <div
      {...styleProps}
      {...tooltipProps}
      class={classNames(
        styles,
        'spectrum-Tooltip',
        `spectrum-Tooltip--${variant()}`,
        `spectrum-Tooltip--${placement()}`,
        {
          'is-open': props.isOpen,
          [`is-open--${placement()}`]: props.isOpen
        },
        otherProps.UNSAFE_className
      )}
      ref={[defaultRef, overlayRef]}>
      {props.showIcon && variant() !== 'neutral' && (
        <Icon UNSAFE_className={classNames(styles, 'spectrum-Tooltip-typeIcon')} aria-hidden="true" />
      )}
      {props.children && (
        <span class={classNames(styles, 'spectrum-Tooltip-label')}>{props.children}</span>
      )}
      <span {...context.arrowProps} ref={context.arrowRef} class={classNames(styles, 'spectrum-Tooltip-tip')} />
    </div>
  );
}
