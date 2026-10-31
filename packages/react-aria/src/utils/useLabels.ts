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

import {AriaLabelingProps, DOMProps} from '@react-types/shared';
import {useId} from './useId';

/**
 * Merges aria-label and aria-labelledby into aria-labelledby when both exist.
 *
 * @param props - Aria label props.
 * @param defaultLabel - Default value for aria-label when not present.
 */
export function useLabels(
  props: DOMProps & AriaLabelingProps,
  defaultLabel?: string
): DOMProps & AriaLabelingProps {
  const id = useId(() => props.id);
  return {
    get id() { return id(); },
    get 'aria-label'() {
      return !props['aria-label'] && !props['aria-labelledby'] && defaultLabel ? defaultLabel : props['aria-label'];
    },
    get 'aria-labelledby'() {
      let labelledBy = props['aria-labelledby'];
      if (labelledBy && props['aria-label']) {
        return [...new Set([id(), ...labelledBy.trim().split(/\s+/)])].join(' ');
      }
      return labelledBy ? labelledBy.trim().split(/\s+/).join(' ') : labelledBy;
    }
  };
}
