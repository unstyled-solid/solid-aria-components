/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Extracted from frozen stories/Toolbar.stories.tsx: ToolbarExample only.
import {Checkbox} from '../../src/Checkbox';
import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import {Link} from '../../src/Link';
import {Orientation} from '@react-types/shared';
import styles from '../../example/index.css';
import {ToggleButton} from '../../src/ToggleButton';
import {Toolbar, ToolbarProps} from '../../src/Toolbar';
import '../../stories/styles.css';
import {merge} from 'solid-js';

export function ToolbarExample(originalProps: ToolbarProps) {
  let props = merge({orientation: 'horizontal' as Orientation}, originalProps);
    return (
      <div>
        <label for="before">Input Before Toolbar</label>
        <input id="before" type="text" />
        <Toolbar {...props}>
          <div role="group" aria-label="Text style">
            <ToggleButton className={classNames(styles, 'toggleButtonExample')}>
              <strong>B</strong>
            </ToggleButton>
            <ToggleButton className={classNames(styles, 'toggleButtonExample')}>
              <div style={{'text-decoration': 'underline'}}>U</div>
            </ToggleButton>
            <ToggleButton className={classNames(styles, 'toggleButtonExample')}>
              <i>I</i>
            </ToggleButton>
          </div>
          <Checkbox>
            <div class="checkbox">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            Night Mode
          </Checkbox>
          <Link href="https://google.com">Help</Link>
        </Toolbar>
        <label for="after">Input After Toolbar</label>
        <input id="after" type="text" />
      </div>
    );
}
