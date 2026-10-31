import {render} from '@solidjs/web';
// Extracted from ToggleButtonGroup.mdx render example 2; source content and algorithms retained.
  import {ToggleButtonGroup} from '../ListBox/native/tailwind/solid-ToggleButtonGroup';
  import {ToggleButton} from '../ListBox/native/tailwind/solid-ToggleButton';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<ToggleButtonGroup{...props}>
    <ToggleButton id="left">Bold</ToggleButton>
    <ToggleButton id="center">Italic</ToggleButton>
    <ToggleButton id="right">Underline</ToggleButton>
  </ToggleButtonGroup>);
}


export const title = "ToggleButtonGroup: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Text style'}} {...props} />, element);
}
