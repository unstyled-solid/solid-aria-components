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

import type {ArgsStoryFn, ComponentAnnotations, Renderer} from 'storybook/internal/csf';
import type {JSX} from '@solidjs/web';
import {OverlayArrow} from '../../src/OverlayArrow';
import {createSignal} from 'solid-js';
import {RouterProvider} from 'react-aria/private/utils/openLink';
import {Tab, TabList, TabPanel, TabProps, Tabs} from '../../src/Tabs';
import {Tooltip, TooltipTrigger} from '../../src/Tooltip';
import '../../stories/styles.css';

interface NativeStoryRenderer extends Renderer {
  component: (props: this['T']) => JSX.Element;
  storyResult: JSX.Element;
  canvasElement: HTMLElement;
}
type StoryArgs<T> = T extends (props: infer P) => unknown ? P : T;
type Meta<T> = ComponentAnnotations<NativeStoryRenderer, StoryArgs<T>>;
type StoryFn<T> = ArgsStoryFn<NativeStoryRenderer, StoryArgs<T>>;

export default {
  title: 'React Aria Components/Tabs',
  component: Tabs
} as Meta<typeof Tabs>;

export type TabsStory = StoryFn<typeof Tabs>;

export const TabsExample = (() => {
  let [url, setUrl] = createSignal('/FoR');

  return (
    <RouterProvider navigate={path => {setUrl(path);}}>
      <Tabs selectedKey={url()}>
        <TabList aria-label="History of Ancient Rome" style={{display: 'flex', gap: '8px'}}>
          <CustomTab id="/FoR" href="/FoR">
            Founding of Rome
          </CustomTab>
          <CustomTab id="/MaR" href="/MaR">
            Monarchy and Republic
          </CustomTab>
          <TooltipTrigger>
            <CustomTab id="/Emp" href="/Emp">
              Empire
            </CustomTab>
            <Tooltip
              offset={5}
              style={{
                background: 'Canvas',
                color: 'CanvasText',
                border: '1px solid gray',
                padding: '5px',
                'border-radius': '4px'
              }}>
              <OverlayArrow style={{transform: 'translateX(-50%)'}}>
                <svg width="8" height="8" style={{display: 'block'}}>
                  <path d="M0 0L4 4L8 0" fill="white" stroke-width={1} stroke="gray" />
                </svg>
              </OverlayArrow>
              I am a tooltip
            </Tooltip>
          </TooltipTrigger>
        </TabList>
        <TabPanel id="/FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
        <TabPanel id="/MaR">Senatus Populusque Romanus.</TabPanel>
        <TabPanel id="/Emp">Alea jacta est.</TabPanel>
      </Tabs>
    </RouterProvider>
  );
}) satisfies TabsStory;

const CustomTab = (props: TabProps) => {
  return (
    <Tab
      {...props}
      style={({isSelected}) => ({
        'border-bottom': '2px solid ' + (isSelected ? 'slateblue' : 'transparent')
      })}
    />
  );
};
