/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, DOMProps} from '@react-types/shared';
import {createContext, createMemo, omit, untrack, type Context, type Component} from 'solid-js';
import type {JSX} from '@solidjs/web';
type ReactNode = JSX.Element;
type SVGProps = JSX.SVGElementTags['svg'] & {'attr:focusable'?: 'false'; inert?: boolean};
import {ContextValue, SlotProps} from 'react-aria-components/slots';
import {mergeStyles} from '../style/runtime';
import {SkeletonWrapper, useSkeletonIcon} from './Skeleton';
import {style} from '../style' with {type: 'macro'};
import {StyleString} from '../style/types';
import {UnsafeStyles} from './style-utils' with {type: 'macro'};
import {useSpectrumContextProps} from './useSpectrumContextProps';
import {mergeRefs} from 'react-aria/mergeRefs';

// Custom list of overrides, excluding width/height/flexGrow/flexShrink/flexBasis
const allowedOverrides = [
  'margin',
  'marginStart',
  'marginEnd',
  'marginTop',
  'marginBottom',
  'marginX',
  'marginY',
  'justifySelf',
  'alignSelf',
  'order',
  'gridArea',
  'gridRowStart',
  'gridRowEnd',
  'gridColumnStart',
  'gridColumnEnd',
  'position',
  'zIndex',
  'top',
  'bottom',
  'inset',
  'insetX',
  'insetY',
  'insetStart',
  'insetEnd',
  'rotate',
  '--iconPrimary',
  'size'
] as const;

// Omit --iconPrimary and size from type (they are private).
// Use the iconStyle() macro to apply them.
type AllowedOverrides = Exclude<(typeof allowedOverrides)[number], '--iconPrimary' | 'size'>;

export interface IconProps extends UnsafeStyles, SlotProps, AriaLabelingProps, DOMProps {
  'aria-hidden'?: boolean | 'false' | 'true';
  styles?: StyleString<AllowedOverrides>;
}

export interface IconContextValue extends UnsafeStyles, SlotProps {
  styles?: StyleString;
  render?: (icon: ReactNode) => ReactNode;
}

export interface IllustrationProps extends UnsafeStyles, SlotProps, AriaLabelingProps, DOMProps {
  'aria-hidden'?: boolean | 'false' | 'true';
  size?: 'S' | 'M' | 'L';
  styles?: StyleString<AllowedOverrides>;
}

export interface IllustrationContextValue extends IconContextValue {
  size?: 'S' | 'M' | 'L';
}

export const IconContext = createContext<ContextValue<Partial<IconContextValue>, SVGElement>>({});
export const IllustrationContext = createContext<
  ContextValue<Partial<IllustrationContextValue>, SVGElement>
>({});

const iconStyles = style(
  {
    size: 20,
    flexShrink: 0
  },
  allowedOverrides
);

export function createIcon(
  Component: Component<SVGProps>,
  context: Context<ContextValue<IconContextValue, SVGElement>> = IconContext
): Component<IconProps> {
  return (props: IconProps) => {
    let [ctx, ref] = untrack(() => useSpectrumContextProps(
    // TODO: remove this default once we release RAC and use DEFAULT_SLOT.
      {get slot() { return props.slot || 'icon'; }} as IconContextValue,
      undefined,
      context
    ));
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'styles');
    // Allocate context-dependent style derivation outside the cleared skeleton provider.
    let skeletonStyles = createMemo(() => useSkeletonIcon(mergeStyles(iconStyles(null, props.styles), ctx.styles)));
    const Svg = () => (
      <SkeletonWrapper>
        {overrides => <Component
          {...otherProps}
          attr:focusable="false"
          ref={mergeRefs<SVGElement>(ref, overrides.ref)}
          inert={overrides.inert}
          aria-label={props['aria-label']}
          aria-hidden={props['aria-label'] ? props['aria-hidden'] === true ? 'true' : props['aria-hidden'] || undefined : 'true'}
          role="img"
          data-slot={props.slot}
          class={
            (props.UNSAFE_className ?? '') +
            ' ' +
            skeletonStyles() + (overrides.className ? ' ' + overrides.className : '')
          }
          style={props.UNSAFE_style}
        />}
      </SkeletonWrapper>
    );

    return <>{ctx.render ? ctx.render(<Svg />) : <Svg />}</>;
  };
}

const illustrationStyles = style(
  {
    size: {
      size: {
        S: 48,
        M: 96,
        L: 160
      }
    },
    flexShrink: 0
  },
  allowedOverrides
);

export function createIllustration(
  Component: Component<SVGProps & {size?: 'S' | 'M' | 'L'}>
): Component<IllustrationProps & {render?: (icon: ReactNode) => ReactNode}> {
  return props => {
    let [ctx, ref] = untrack(() => useSpectrumContextProps(
      {get slot() { return props.slot || 'icon'; }} as IllustrationContextValue,
      undefined,
      IllustrationContext
    ));
    let size = () => props.size ?? ctx.size ?? 'M';
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'size', 'styles', 'render');
    const Svg = () => (
      <Component
        {...otherProps}
        ref={ref}
        size={size()}
        attr:focusable="false"
        aria-label={props['aria-label']}
        aria-hidden={props['aria-label'] ? props['aria-hidden'] === true ? 'true' : props['aria-hidden'] || undefined : 'true'}
        role="img"
        data-slot={props.slot}
        class={
          (props.UNSAFE_className ?? '') + ' ' + illustrationStyles({size: size()}, props.styles) + (ctx.styles || '')
        }
        style={props.UNSAFE_style}
      />
    );

    return <>{props.render ? props.render(<Svg />) : <Svg />}</>;
  };
}
