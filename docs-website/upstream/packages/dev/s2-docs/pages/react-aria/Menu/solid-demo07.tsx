import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 7; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem, Separator} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Actions</Button>), () => (<Menu>
    <MenuItem>New…</MenuItem>
    <MenuItem>Open…</MenuItem>
    {/*- begin highlight -*/}
    <Separator />
    {/*- end highlight -*/}
    <MenuItem>Save</MenuItem>
    <MenuItem>Save as…</MenuItem>
    <MenuItem>Rename…</MenuItem>
    <Separator />
    <MenuItem>Page setup…</MenuItem>
    <MenuItem>Print…</MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
