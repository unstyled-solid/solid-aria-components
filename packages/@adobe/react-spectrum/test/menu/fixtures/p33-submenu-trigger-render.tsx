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

// Frozen MenuTrigger.stories.tsx source lines 734–754.
import {action} from 'storybook/actions';
import type {JSX} from '@solidjs/web';
import {omit} from 'solid-js';
import {ActionButton} from '../../../src/button/ActionButton';
import {MenuTrigger, type SpectrumMenuTriggerProps} from '../../../src/menu/MenuTrigger';
import type {SpectrumMenuProps} from '../../../src/menu/Menu';

export function render(
  menu: (menuProps: Omit<SpectrumMenuProps<unknown>, 'children'>) => JSX.Element,
  input: Omit<SpectrumMenuTriggerProps, 'children'> & {isDisabled?: boolean} = {},
  menuProps: Omit<SpectrumMenuProps<unknown>, 'children'> = {}
): JSX.Element {
  let props = omit(input, 'isDisabled');
  // Native factories apply the source clone overrides last, while keeping the
  // Menu lazy under MenuTrigger's context. The source empty default is retained.
  return (
    <div style={{display: 'flex', width: 'auto', margin: '250px 0'}}>
      <MenuTrigger onOpenChange={action('onOpenChange')} {...props}>
        <ActionButton
          isDisabled={input.isDisabled}
          onPress={action('press')}
          onPressStart={action('pressstart')}
          onPressEnd={action('pressend')}>
          Menu Button
        </ActionButton>
        {menu(menuProps)}
      </MenuTrigger>
    </div>
  );
}
