import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './vanilla/Tabs';
import { Button } from './vanilla/Button';
import { createSignal } from 'solid-js';
import { Plus, Minus } from './icons';
function Example(props: Record<string, unknown>) {
  let [tabs, setTabs] = createSignal([{
    id: 1,
    title: 'Tab 1',
    content: 'Tab body 1'
  }, {
    id: 2,
    title: 'Tab 2',
    content: 'Tab body 2'
  }, {
    id: 3,
    title: 'Tab 3',
    content: 'Tab body 3'
  }]);
  let addTab = () => {
    setTabs(tabs => [...tabs, {
      id: tabs.length + 1,
      title: `Tab ${tabs.length + 1}`,
      content: `Tab body ${tabs.length + 1}`
    }]);
  };
  let removeTab = () => {
    if (tabs().length > 1) {
      setTabs(tabs => tabs.slice(0, -1));
    }
  };
  return <Tabs style={{
    "width": '100%'
  }}>
      <div style={{
      "display": 'flex'
    }}>
        <TabList aria-label="Dynamic tabs"
      ///- begin highlight -///
      items={tabs()}
      ///- end highlight -///
      style={{
        "flex": 1
      }}>
          {item => <Tab>{item.title}</Tab>}
        </TabList>
        <div class="button-group">
          <Button onPress={addTab} aria-label="Add tab">
            <Plus />
          </Button>
          <Button onPress={removeTab} aria-label="Remove tab">
            <Minus />
          </Button>
        </div>
      </div>
      <TabPanels items={tabs()}>
        {item => <TabPanel>{item.content}</TabPanel>}
      </TabPanels>
    </Tabs>;
}
export const title = "Tabs source example 3";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
