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

import {classNames} from '../utils/classNames';

import {ClearSlots, SlotProvider, useSlotProps} from '../utils/Slots';
import {DOMProps, StyleProps} from '@react-types/shared';
import type {DOMRef} from '../utils/useDOMRef';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {Flex} from '../layout/Flex';
import {omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/illustratedmessage/vars.css';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumIllustratedMessageProps extends DOMProps, StyleProps {
  /** The contents of the IllustratedMessage. */
  children: JSX.Element;
}

/**
 * An IllustratedMessage displays an illustration and a message, usually
 * for an empty state or an error page.
 */
export function IllustratedMessage(
  inputProps: SpectrumIllustratedMessageProps & {ref?: DOMRef<HTMLDivElement>}
) {
  let props = useSlotProps(inputProps, 'illustration');
  let otherProps = omit(props, 'children', 'ref');
  let ref = untrack(() => inputProps.ref);

  let {styleProps} = useStyleProps(otherProps);
  let headingClassName = classNames(styles, 'spectrum-IllustratedMessage-heading');
  let contentClassName = classNames(styles, 'spectrum-IllustratedMessage-description');

  let slots = {
    heading: {UNSAFE_className: headingClassName},
    content: {UNSAFE_className: contentClassName}
  };

  return (
    <Flex
      {...filterDOMProps(otherProps)}
      UNSAFE_style={styleProps.style as JSX.CSSProperties}
      isHidden={styleProps.hidden === true}
      UNSAFE_className={classNames(styles, 'spectrum-IllustratedMessage', otherProps.UNSAFE_className)}
      ref={ref}>
      <ClearSlots>
        <SlotProvider slots={slots}>{props.children}</SlotProvider>
      </ClearSlots>
    </Flex>
  );
}
