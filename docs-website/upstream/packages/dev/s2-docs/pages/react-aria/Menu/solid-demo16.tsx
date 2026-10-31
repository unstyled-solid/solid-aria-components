import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 16; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem, SubmenuTrigger, Separator} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from 'solid-aria-components/Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger trigger="contextMenu" children={[() => (<Button className="context-menu-trigger">
    Right click here
  </Button>), () => (<Menu>
    <MenuItem>Open</MenuItem>
    <SubmenuTrigger children={[() => (<MenuItem>Open with</MenuItem>), () => (<Menu>
        <MenuItem>Preview</MenuItem>
        <MenuItem>Photoshop</MenuItem>
        <MenuItem>Safari</MenuItem>
      </Menu>)]} />
    <Separator />
    <MenuItem>Get Info</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Move to Trash</MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 16";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
