import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './tailwind/Tabs';
import { Home } from './illustrations';
import { Folder } from './illustrations';
import { Search } from './illustrations';
import { Settings } from './illustrations';
function Example(props: Record<string, unknown>) {
  return <Tabs {...props}>
  <TabList aria-label="Tabs">
    <Tab id="home">Home</Tab>
    <Tab id="files">Files</Tab>
    <Tab id="search">Search</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="home" className="flex items-center justify-center">
      <Home />
    </TabPanel>
    <TabPanel id="files" className="flex items-center justify-center">
      <Folder />
    </TabPanel>
    <TabPanel id="search" className="flex items-center justify-center">
      <Search />
    </TabPanel>
    <TabPanel id="settings" className="flex items-center justify-center">
      <Settings />
    </TabPanel>
  </TabPanels>
</Tabs>;
}
export const title = "Tabs source example 2";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
