import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 4; source content and algorithms retained.
import {ListBox, ListBoxItem, Text} from './native/vanilla/solid-ListBox';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ListBox aria-label="Permissions" selectionMode="single">
  <ListBoxItem textValue="Read">
    {/*- begin highlight -*/}
    <Text slot="label">Read</Text>
    <Text slot="description">Read only</Text>
    {/*- end highlight -*/}
  </ListBoxItem>
  <ListBoxItem textValue="Write">
    <Text slot="label">Write</Text>
    <Text slot="description">Read and write only</Text>
  </ListBoxItem>
  <ListBoxItem textValue="Admin">
    <Text slot="label">Admin</Text>
    <Text slot="description">Full access</Text>
  </ListBoxItem>
</ListBox>);
}


export const title = "ListBox: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
