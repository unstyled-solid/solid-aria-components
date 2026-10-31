import {render} from '@solidjs/web';
// Extracted from Tooltip.mdx render example 4; source content and algorithms retained.
import {Focusable, TooltipTrigger} from 'solid-aria-components/Tooltip';
import {Tooltip} from '../ListBox/native/vanilla/solid-Tooltip';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<TooltipTrigger>
  {/*- begin highlight -*/}
  <Focusable>
    {forwardedProps => (<span {...forwardedProps} role="button">Custom trigger</span>)}
  </Focusable>
  {/*- end highlight -*/}
  <Tooltip>Tooltip</Tooltip>
</TooltipTrigger>);
}


export const title = "Tooltip: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
