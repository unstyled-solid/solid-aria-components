import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 15; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {ChevronDown} from './../ListBox/native-icons/solid-icons';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger trigger="longPress" children={[() => (<Button onPress={() => alert('crop')}>
    <span>Crop</span>
    <ChevronDown size={18} />
  </Button>), () => (<Menu>
    <MenuItem>Rotate</MenuItem>
    <MenuItem>Slice</MenuItem>
    <MenuItem>Clone stamp</MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 15";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
