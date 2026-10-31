import { mergeProps as _$mergeProps } from "@solidjs/web";
import { ssrElement as _$ssrElement } from "@solidjs/web";
import { ssrElementAttribute as _$ssrElementAttribute } from "@solidjs/web";
import { scope as _$scope } from "@solidjs/web";
import { escape as _$escape } from "@solidjs/web";
var _sk$ = k => k === "slot" || k === "style" || k === "class";
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
import { css } from "../style/style-macro" with { type: 'macro' };
import { filterDOMProps } from "/Users/avi/avir-oss/solid-aria-components/distribution/staged/server/react-aria/exports/filterDOMProps.js";
import { mergeStyles } from "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/server/style/runtime.native.js";
import { style } from "../style" with { type: 'macro' };
const styles = style({
    display: 'flex',
    alignItems: 'center'
});
/**
 * Vertically centers its children against the surrounding text baseline.
 * Use this to align icons or other inline elements with adjacent text without
 * breaking baseline alignment.
 *
 * @example
 *   import {CenterBaseline} from '@react-spectrum/s2/CenterBaseline';
 *   import {style} from '@react-spectrum/s2/style' with {type: 'macro'};
 *   import CheckmarkIcon from '@react-spectrum/s2/icons/Checkmark';
 *
 *   <span className={style({display: 'flex', gap: 4, alignItems: 'baseline'})}>
 *     <CenterBaseline>
 *       <CheckmarkIcon />
 *     </CenterBaseline>
 *     <span>Done</span>
 *   </span>;
 */
export function CenterBaseline(props) {
    let domProps = filterDOMProps(props);
    return _$ssrElement("div", domProps, () => _$scope(() => _$escape(props.children)), true, _sk$, () => _$ssrElementAttribute("slot", props.slot) + _$ssrElementAttribute("style", props.style) + _$ssrElementAttribute("class", mergeStyles(styles, props.styles) + ' ' + centerBaselineBefore));
}
export const centerBaselineBefore = css('&::before { content: "\u00a0"; width: 0; visibility: hidden }');
export function centerBaseline(props = {}) {
    return (icon) => CenterBaseline(_$mergeProps(props, {
        children: icon
    }));
}
