import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 4; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem, Text, Keyboard} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Permissions</Button>), () => (<Menu>
    <MenuItem textValue="Copy">
      {/*- begin highlight -*/}
      <Text slot="label">Copy</Text>
      <Text slot="description">Copy the selected text</Text>
      {/*- end highlight -*/}
      <Keyboard>⌘C</Keyboard>
    </MenuItem>
    <MenuItem textValue="Cut">
      <Text slot="label">Cut</Text>
      <Text slot="description">Cut the selected text</Text>
      <Keyboard>⌘X</Keyboard>
    </MenuItem>
    <MenuItem textValue="Paste">
      <Text slot="label">Paste</Text>
      <Text slot="description">Paste the copied text</Text>
      <Keyboard>⌘V</Keyboard>
    </MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
