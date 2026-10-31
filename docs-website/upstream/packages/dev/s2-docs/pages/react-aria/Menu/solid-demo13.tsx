import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 13; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/Menu';
import {MenuTrigger, Menu, MenuItem, MenuSection, Header} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {createSignal} from 'solid-js';

function Example() {
  let [style, setStyle] = createSignal<Selection>(new Set(['bold']));
  let [align, setAlign] = createSignal<Selection>(new Set(['left']));
  return (
    <MenuTrigger children={[() => (<Button>Edit</Button>), () => (<Menu>
        <MenuSection>
          <Header>Clipboard</Header>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </MenuSection>
        {/*- begin highlight -*/}
        <MenuSection
          selectionMode="multiple"
          selectedKeys={style()}
          onSelectionChange={setStyle}>
          {/*- end highlight -*/}
          <Header>Text style</Header>
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="italic">Italic</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
        <MenuSection selectionMode="single" selectedKeys={align()} onSelectionChange={setAlign}>
          <Header>Text alignment</Header>
          <MenuItem id="left">Left</MenuItem>
          <MenuItem id="center">Center</MenuItem>
          <MenuItem id="right">Right</MenuItem>
        </MenuSection>
      </Menu>)]} />
  );
}

export default Example;

export const title = "Menu: upstream example 13";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
