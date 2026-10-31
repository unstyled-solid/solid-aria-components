import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 1; source content and algorithms retained.
  import {MenuTrigger, SubmenuTrigger, Menu, MenuItem, MenuSection, Separator, Text, Keyboard} from '../ListBox/native/vanilla/solid-Menu';
  import {Button} from '../ListBox/native/vanilla/solid-Button';
  import {Ellipsis, FolderOpen, Pencil, Copy, Trash, Share, Mail, Smartphone, Instagram} from './../ListBox/native-icons/solid-icons';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button aria-label="Actions">
      <Ellipsis size={18} />
    </Button>), () => (<Menu>
      <MenuSection>
        <MenuItem onAction={() => alert('open')} textValue="Open">
          <FolderOpen />
          <Text slot="label">Open</Text>
          <Keyboard>⌘O</Keyboard>
        </MenuItem>
        <MenuItem onAction={() => alert('rename')} textValue="Rename">
          <Pencil />
          <Text slot="label">Rename…</Text>
          <Keyboard>⌘R</Keyboard>
        </MenuItem>
        <MenuItem onAction={() => alert('duplicate')} textValue="Duplicate">
          <Copy />
          <Text slot="label">Duplicate</Text>
          <Keyboard>⌘D</Keyboard>
        </MenuItem>
        <MenuItem onAction={() => alert('delete')} textValue="Delete">
          <Trash />
          <Text slot="label">Delete…</Text>
          <Keyboard>⌘⌫</Keyboard>
        </MenuItem>
        <SubmenuTrigger children={[() => (<MenuItem textValue="Share">
            <Share />
            <Text slot="label">Share</Text>
          </MenuItem>), () => (<Menu>
            <MenuItem textValue="Email">
              <Mail />
              <Text slot="label">Email</Text>
            </MenuItem>
            <MenuItem textValue="SMS">
              <Smartphone />
              <Text slot="label">SMS</Text>
            </MenuItem>
            <MenuItem textValue="Instagram">
              <Instagram />
              <Text slot="label">Instagram</Text>
            </MenuItem>
          </Menu>)]} />
      </MenuSection>
      <Separator />
      <MenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
        <MenuItem id="files">Show files</MenuItem>
        <MenuItem id="folders">Show folders</MenuItem>
      </MenuSection>
    </Menu>)]} />);
}


export const title = "Menu: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
