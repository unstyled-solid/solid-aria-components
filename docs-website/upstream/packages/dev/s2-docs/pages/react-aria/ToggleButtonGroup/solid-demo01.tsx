import {render} from '@solidjs/web';
// Extracted from ToggleButtonGroup.mdx render example 1; source content and algorithms retained.
  import {ToggleButtonGroup} from '../ListBox/native/vanilla/solid-ToggleButtonGroup';
  import {ToggleButton} from '../ListBox/native/vanilla/solid-ToggleButton';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<ToggleButtonGroup{...props}>
    <ToggleButton id="left">Bold</ToggleButton>
    <ToggleButton id="center">Italic</ToggleButton>
    <ToggleButton id="right">Underline</ToggleButton>
  </ToggleButtonGroup>);
}


export const title = "ToggleButtonGroup: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Text style'}} {...props} />, element);
}
