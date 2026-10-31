import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 6; source content and algorithms retained.
import {MenuTrigger, SubmenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Actions</Button>), () => (<Menu>
    <MenuItem>Cut</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Delete</MenuItem>
    {/*- begin highlight -*/}
    <SubmenuTrigger children={[() => (<MenuItem>Share</MenuItem>), () => (<Menu>
        <MenuItem>SMS</MenuItem>
        <MenuItem>Instagram</MenuItem>
        <SubmenuTrigger children={[() => (<MenuItem>Email</MenuItem>), () => (<Menu>
            <MenuItem>Work</MenuItem>
            <MenuItem>Personal</MenuItem>
          </Menu>)]} />
      </Menu>)]} />
  </Menu>)]} />);
}


export const title = "Menu: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
