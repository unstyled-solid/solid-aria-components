import {Tab, Tabs, TabList, TabPanel} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'History of Ancient Rome tabs';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './Tabs.css';

export default function NativeDemo() {
  return <Tabs>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome<span class="react-aria-SelectionIndicator" /></Tab>
      <Tab id="MaR">Monarchy and Republic<span class="react-aria-SelectionIndicator" /></Tab>
      <Tab id="Emp">Empire<span class="react-aria-SelectionIndicator" /></Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Tabs>;
}
