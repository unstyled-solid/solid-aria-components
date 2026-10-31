import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 5; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem, MenuSection, Header} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Publish</Button>), () => (<Menu>
    {/*- begin highlight -*/}
    <MenuSection>
      <Header>Export</Header>
      {/*- end highlight -*/}
      <MenuItem>Image…</MenuItem>
      <MenuItem>Video…</MenuItem>
      <MenuItem>Text…</MenuItem>
    </MenuSection>
    <MenuSection>
      <Header>Share</Header>
      <MenuItem>YouTube…</MenuItem>
      <MenuItem>Instagram…</MenuItem>
      <MenuItem>Email…</MenuItem>
    </MenuSection>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
