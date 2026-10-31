import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 2; source content and algorithms retained.
  import {MenuTrigger, SubmenuTrigger, Menu, MenuItem, MenuSection, MenuSeparator} from '../ListBox/native/tailwind/solid-Menu';
  import {Button} from '../ListBox/native/tailwind/solid-Button';
  import {MoreHorizontal} from './../ListBox/native-icons/solid-icons';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button aria-label="Actions" variant="secondary">
      <MoreHorizontal className="w-5 h-5" />
    </Button>), () => (<Menu>
      <MenuItem onAction={() => alert('open')}>Open</MenuItem>
      <MenuItem onAction={() => alert('rename')}>Rename…</MenuItem>
      <MenuItem onAction={() => alert('duplicate')}>Duplicate</MenuItem>
      <MenuItem onAction={() => alert('delete')}>Delete…</MenuItem>
      <SubmenuTrigger children={[() => (<MenuItem>Share</MenuItem>), () => (<Menu>
          <MenuItem>Email</MenuItem>
          <MenuItem>SMS</MenuItem>
          <MenuItem>Instagram</MenuItem>
        </Menu>)]} />
      <MenuSeparator />
      <MenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
        <MenuItem id="files">Show files</MenuItem>
        <MenuItem id="folders">Show folders</MenuItem>
      </MenuSection>
    </Menu>)]} />);
}


export const title = "Menu: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
