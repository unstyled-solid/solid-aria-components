import {render} from '@solidjs/web';
import type {JSX} from '@solidjs/web';
// Extracted from Menu.mdx render example 14; source content and algorithms retained.
import {Pressable} from 'solid-aria-components/Menu';
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Pressable>
    {forwardedProps => (<span {...forwardedProps} ref={forwardedProps.ref as JSX.Ref<HTMLSpanElement>} tabindex={forwardedProps.tabIndex} role="button">Custom trigger</span>)}
  </Pressable>), () => (<Menu>
    <MenuItem>Open</MenuItem>
    <MenuItem>Rename…</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Delete…</MenuItem>
  </Menu>)]} />);
}


export const title = "Menu: upstream example 14";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
