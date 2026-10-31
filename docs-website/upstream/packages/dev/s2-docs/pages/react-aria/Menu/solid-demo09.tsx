import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 9; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Links</Button>), () => (<Menu>
    {/*- begin highlight -*/}
    <MenuItem href="https://adobe.com/" target="_blank">Adobe</MenuItem>
    {/*- end highlight -*/}
    <MenuItem href="https://apple.com/" target="_blank">Apple</MenuItem>
    <MenuItem href="https://google.com/" target="_blank">Google</MenuItem>
    <MenuItem href="https://microsoft.com/" target="_blank">Microsoft</MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 9";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
