import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './vanilla/Tabs';
import { Form } from './vanilla/Form';
import { TextField } from './vanilla/TextField';
import { Button } from './vanilla/Button';
import { RadioGroup, Radio } from './vanilla/RadioGroup';
import { CheckboxGroup } from './vanilla/CheckboxGroup';
import { Checkbox } from './vanilla/Checkbox';
function Example(props: Record<string, unknown>) {
  return <Tabs {...props}>
  <TabList aria-label="Settings">
    <Tab id="general">General</Tab>
    <Tab id="appearance">Appearance</Tab>
    <Tab id="notifications">Notifications</Tab>
    <Tab id="profile">Profile</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="general">
      <Form>
        <TextField label="Homepage" defaultValue="react-aria.adobe.com" />
        <Checkbox defaultSelected>Show sidebar</Checkbox>
        <Checkbox>Show status bar</Checkbox>
      </Form>
    </TabPanel>
    <TabPanel id="appearance">
      <Form>
        <RadioGroup label="Theme" defaultValue="auto">
          <Radio value="auto">Auto</Radio>
          <Radio value="light">Light</Radio>
          <Radio value="dark">Dark</Radio>
        </RadioGroup>
        <RadioGroup label="Font size" defaultValue="medium">
          <Radio value="small">Small</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="large">Large</Radio>
        </RadioGroup>
      </Form>
    </TabPanel>
    <TabPanel id="notifications">
      <CheckboxGroup label="Notifications settings" defaultValue={['account', 'dms']}>
        <Checkbox value="account">Account activity</Checkbox>
        <Checkbox value="mentions">Mentions</Checkbox>
        <Checkbox value="dms">Direct message</Checkbox>
        <Checkbox value="marketing">Marketing emails</Checkbox>
      </CheckboxGroup>
    </TabPanel>
    <TabPanel id="profile">
      <Form>
        <TextField label="Name" defaultValue="Devon Govett" />
        <TextField label="Username" defaultValue="@devongovett" />
        <Button>Update profile</Button>
      </Form>
    </TabPanel>
  </TabPanels>
</Tabs>;
}
export const title = "Tabs source example 1";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
