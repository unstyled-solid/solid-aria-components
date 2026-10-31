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

import Chevron_L from './generated/S2_ChevronSize200';
import Chevron_M from './generated/S2_ChevronSize100';
import Chevron_S from './generated/S2_ChevronSize75';
import Chevron_XL from './generated/S2_ChevronSize300';
import Chevron_XS from './generated/S2_ChevronSize50';
import Chevron_XXL from './generated/S2_ChevronSize400';
import {omit} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import {style} from '../style' with {type: 'macro'};

let styles = style({
  width: {
    size: {
      M: 10,
      L: 12,
      XL: 14,
      XXL: 16,
      XS: 6,
      S: 10
    }
  },
  height: {
    size: {
      M: 10,
      L: 12,
      XL: 14,
      XXL: 16,
      XS: 6,
      S: 10
    }
  }
});

export default function Chevron(
  props: JSX.SVGAttributes<SVGSVGElement> & {className?: string; size?: 'M' | 'L' | 'XL' | 'XXL' | 'XS' | 'S'}
): JSX.Element {
  let otherProps = omit(props, 'size', 'className');
  let icons = {M: Chevron_M, L: Chevron_L, XL: Chevron_XL, XXL: Chevron_XXL, XS: Chevron_XS, S: Chevron_S};
  let Icon = dynamic(() => icons[props.size ?? 'M']);
  return <Icon {...otherProps} class={(props.className || props.class || '') + styles({size: props.size ?? 'M'})} />;
}
