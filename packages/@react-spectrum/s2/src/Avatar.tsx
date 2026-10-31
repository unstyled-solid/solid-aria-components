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

import {centerBaselineBefore} from './CenterBaseline';
import {ContextValue, SlotProps} from 'react-aria-components/slots';
import {createContext, createMemo, omit, untrack, type Ref} from 'solid-js';
import {DOMProps, DOMRefValue} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {
  getAllowedOverrides,
  StylesPropWithoutWidth,
  UnsafeStyles
} from './style-utils' with {type: 'macro'};
import {Image, ImageContext} from './Image';
import {isDocsEnv} from './macros' with {type: 'macro'};
import {style} from '../style' with {type: 'macro'};
import {useDOMRef} from './useDOMRef';
import {useSpectrumContextProps} from './useSpectrumContextProps';

export interface AvatarProps extends UnsafeStyles, DOMProps, SlotProps {
  /** Text description of the avatar. */
  alt?: string;
  /** The image URL for the avatar. */
  src?: string;
  /** Spectrum-defined styles, returned by the `style()` macro. */
  styles?: StylesPropWithoutWidth;
  /**
   * The size of the avatar.
   *
   * @default 24
   */
  size?:
    | 16
    | 20
    | 24
    | 28
    | 32
    | 36
    | 40
    | 44
    | 48
    | 56
    | 64
    | 80
    | 96
    | 112
    | (number & {})
    | `${number}lh`;
  /** Whether the avatar is over a color background. */
  isOverBackground?: boolean;
}

const imageStyles = style(
  {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'full',
    size: 20,
    flexShrink: 0,
    flexGrow: 0,
    disableTapHighlight: true,
    outlineStyle: {
      default: 'none',
      isOverBackground: 'solid'
    },
    outlineColor: '--s2-container-bg',
    outlineWidth: {
      default: 1,
      isLarge: 2,
      // if bigger than 64px, use 2px outline, otherwise use 1px outline
      isLH: 'min(2px, max(1px, calc((((1lh / 64) - 1px) * 9999) + 1px)))'
    }
  },
  getAllowedOverrides({width: false})
);

export const AvatarContext =
  createContext<ContextValue<Partial<AvatarProps>, DOMRefValue<HTMLImageElement>>>(null);

/**
 * An avatar is a thumbnail representation of an entity, such as a user or an organization.
 */
export function Avatar(
  inputProps: AvatarProps & {ref?: Ref<DOMRefValue<HTMLImageElement>>}
) {
  let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), AvatarContext);
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'alt', 'src', 'UNSAFE_style', 'UNSAFE_className', 'size', 'isOverBackground', 'slot', 'ref');
  const domProps = filterDOMProps(otherProps);

  // In the docs build, we need to be able to simulate font scaling.
  let sizeInfo = createMemo(() => {
  let size = props.size ?? 24;
  let remSize;
  let isLarge = false;
  let isLH = false;
  if (typeof size === 'string') {
    remSize = size;
    isLH = size.endsWith('lh');
  } else {
    remSize = isDocsEnv() ? `calc(${size / 16} * var(--rem, 1rem))` : `${size / 16}rem`;
    isLarge = size >= 64;
  }
  return {remSize, isLarge, isLH};
  });
  return (
    <ImageContext value={{}}>
      <Image
        {...domProps}
        ref={node => domRef(node as unknown as HTMLImageElement)}
        slot={props.slot ?? 'avatar'}
        alt={props.alt ?? ''}
        UNSAFE_style={{
          ...props.UNSAFE_style,
          width: sizeInfo().remSize,
          height: sizeInfo().remSize
        }}
        UNSAFE_className={(props.UNSAFE_className ?? '') + ' ' + centerBaselineBefore}
        styles={imageStyles({isOverBackground: props.isOverBackground, isLarge: sizeInfo().isLarge, isLH: sizeInfo().isLH}, props.styles)}
        src={props.src}
      />
    </ImageContext>
  );
}
