import {render} from '@solidjs/web';
import type {JSX} from '@solidjs/web';
// Extracted from Popover.mdx render example 3; source content and algorithms retained.
import {Pressable, DialogTrigger} from 'solid-aria-components/Popover';
import {Popover} from '../ListBox/native/vanilla/solid-Popover';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<DialogTrigger>
  {/*- begin highlight -*/}
  <Pressable>
    {forwardedProps => (<span {...forwardedProps} ref={forwardedProps.ref as JSX.Ref<HTMLSpanElement>} tabindex={forwardedProps.tabIndex} role="button">Custom trigger</span>)}
  </Pressable>
  {/*- end highlight -*/}
  <Popover style={{padding: "16px"}}>
    This popover was triggered by a custom button.
  </Popover>
</DialogTrigger>);
}


export const title = "Popover: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
