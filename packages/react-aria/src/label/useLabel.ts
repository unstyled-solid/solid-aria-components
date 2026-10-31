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

import {AriaLabelingProps, DOMAttributes, DOMProps, LabelableProps} from '@react-types/shared';
import type {JSX, ValidComponent as ElementType} from '@solidjs/web';
type LabelHTMLAttributes<T> = JSX.LabelHTMLAttributes<T>;
import {useId} from '../utils/useId';
import {useLabels} from '../utils/useLabels';
import {createEffect} from 'solid-js';

export interface LabelAriaProps extends LabelableProps, DOMProps, AriaLabelingProps {
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   *
   * @default 'label'
   */
  labelElementType?: ElementType;
}

export interface LabelAria {
  /** Props to apply to the label container element. */
  labelProps: {id?: string; htmlFor?: string};
  /** Props to apply to the field container element being labeled. */
  fieldProps: AriaLabelingProps & DOMProps;
}

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 *
 * @param props - The props for labels and fields.
 */
export function useLabel(props: LabelAriaProps): LabelAria {
  let id = useId(() => props.id);
  let labelId = useId();
  let labelProps = {
    get id() { return props.label ? labelId() : undefined; },
    get htmlFor() { return props.label && (props.labelElementType ?? 'label') === 'label' ? id() : undefined; }
  };
  createEffect(() => !props.label && !props['aria-labelledby'] && !props['aria-label'], missing => {
  if (missing && process.env.NODE_ENV !== 'production') {
    console.warn(
      'If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility'
    );
  }
  });

  let fieldProps = useLabels({
    get id() { return id(); },
    get 'aria-label'() { return props['aria-label']; },
    get 'aria-labelledby'() {
      let labelledBy = props['aria-labelledby'];
      return props.label ? (labelledBy ? `${labelId()} ${labelledBy}` : labelId()) : labelledBy;
    }
  });

  return {
    labelProps,
    fieldProps
  };
}
