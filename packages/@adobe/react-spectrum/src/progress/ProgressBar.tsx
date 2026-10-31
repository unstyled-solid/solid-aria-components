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
import type {DOMRef} from '../utils/useDOMRef';
import {ProgressBarBase, SpectrumProgressBarProps} from './ProgressBarBase';
import {omit} from 'solid-js';
import styles from '@adobe/spectrum-css-temp/components/barloader/vars.css';
import {useProgressBar} from 'react-aria/useProgressBar';

/**
 * ProgressBars show the progression of a system operation: downloading, uploading, processing,
 * etc., in a visual way. They can represent either determinate or indeterminate progress.
 */
export function ProgressBar(props: SpectrumProgressBarProps & {ref?: DOMRef<HTMLDivElement>}) {
  let otherProps = omit(props, 'staticColor', 'variant');
  const {progressBarProps, labelProps} = useProgressBar(props);

  return (
    <ProgressBarBase
      {...otherProps}
      barProps={progressBarProps}
      labelProps={labelProps}
      barClassName={classNames(styles, {
        'spectrum-BarLoader--overBackground': props.variant === 'overBackground',
        'spectrum-BarLoader--staticWhite': props.staticColor === 'white',
        'spectrum-BarLoader--staticBlack': props.staticColor === 'black'
      })}
    />
  );
}
