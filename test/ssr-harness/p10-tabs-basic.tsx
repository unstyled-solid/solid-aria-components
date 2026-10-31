import {Tabs, TabList, Tab, TabPanel} from '../../packages/react-aria-components/src/Tabs';

// Physical translation of the frozen Tabs.ssr.test.js fixture.
export function Fixture() {
  return (
    <Tabs aria-label="Tabs">
      <TabList>
        <Tab id="1">Left</Tab>
        <Tab id="2">Middle</Tab>
        <Tab id="3">Right</Tab>
      </TabList>
      <TabPanel id="1">Left content</TabPanel>
      <TabPanel id="2">Middle content</TabPanel>
      <TabPanel id="3">Right content</TabPanel>
    </Tabs>
  );
}
