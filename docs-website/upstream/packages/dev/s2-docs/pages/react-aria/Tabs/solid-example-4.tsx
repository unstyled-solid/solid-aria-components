import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import type { Key } from 'solid-aria-components';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './vanilla/Tabs';
import { Home } from './illustrations';
import { Folder } from './illustrations';
import { Search } from './illustrations';
import { Settings } from './illustrations';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
  let [tab, setTab] = createSignal<Key>("files");
  return <div>
      <Tabs
    ///- begin highlight -///
    selectedKey={tab()} onSelectionChange={setTab}
    ///- end highlight -///
    >
        <TabList aria-label="Tabs">
          <Tab id="home">Home</Tab>
          <Tab id="files">Files</Tab>
          <Tab id="search" isDisabled>Search</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="home" style={{
          "display": 'flex',
          "align-items": 'center',
          "justify-content": 'center'
        }}>
            <Home />
          </TabPanel>
          <TabPanel id="files" style={{
          "display": 'flex',
          "align-items": 'center',
          "justify-content": 'center'
        }}>
            <Folder />
          </TabPanel>
          <TabPanel id="search" style={{
          "display": 'flex',
          "align-items": 'center',
          "justify-content": 'center'
        }}>
            <Search />
          </TabPanel>
          <TabPanel id="settings" style={{
          "display": 'flex',
          "align-items": 'center',
          "justify-content": 'center'
        }}>
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <p>Selected tab: {tab()}</p>
    </div>;
}
export const title = "Tabs source example 4";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
