import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 3; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

function Example() {
  let items = [
    { id: 1, name: 'New file…' },
    { id: 2, name: 'New window' },
    { id: 3, name: 'Open…' },
    { id: 4, name: 'Save' },
    { id: 5, name: 'Save as…' },
    { id: 6, name: 'Revert file' },
    { id: 7, name: 'Print…' },
    { id: 8, name: 'Close window' },
    { id: 9, name: 'Quit' }
  ];

  return (
    <MenuTrigger children={[() => (<Button>File</Button>), () => (<Menu items={items}>
        {(item) => <MenuItem>{item.name}</MenuItem>}
      </Menu>)]} />
  );
}

export default Example;

export const title = "Menu: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
