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

import {PlacementAxis} from 'react-aria/useOverlayPosition';
import {createContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {StyleProps} from '@react-types/shared';
import type {ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {TooltipTriggerState} from 'react-stately/useTooltipTriggerState';

interface TooltipContextProps extends StyleProps {
  isOpen?: boolean;
  state?: TooltipTriggerState;
  ref?: ObjectRef<HTMLDivElement>;
  placement: PlacementAxis | null;
  arrowProps?: JSX.HTMLAttributes<HTMLElement>;
  arrowRef?: ObjectRef<HTMLElement>;
}

export const TooltipContext = createContext<TooltipContextProps>({placement: null});
