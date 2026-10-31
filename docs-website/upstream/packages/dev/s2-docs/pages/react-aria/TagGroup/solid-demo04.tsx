import {render} from '@solidjs/web';
// Extracted from TagGroup.mdx render example 4; source content and algorithms retained.
import {TagGroup, Tag} from '../ListBox/native/vanilla/solid-TagGroup';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<TagGroup label="Photo categories">
  {/*- begin highlight -*/}
  <Tag href="https://en.wikipedia.org/wiki/Landscape_photography" target="_blank">Landscape</Tag>
  {/*- end highlight -*/}
  <Tag href="https://en.wikipedia.org/wiki/Portrait_photography" target="_blank">Portrait</Tag>
  <Tag href="https://en.wikipedia.org/wiki/Macro_photography" target="_blank">Macro</Tag>
  <Tag href="https://en.wikipedia.org/wiki/Night_photography" target="_blank">Night</Tag>
  <Tag href="https://en.wikipedia.org/wiki/Dualphotography" target="_blank">Dual</Tag>
  <Tag href="https://en.wikipedia.org/wiki/Golden_hour_(photography)" target="_blank">Golden Hour</Tag>
</TagGroup>);
}


export const title = "TagGroup: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
