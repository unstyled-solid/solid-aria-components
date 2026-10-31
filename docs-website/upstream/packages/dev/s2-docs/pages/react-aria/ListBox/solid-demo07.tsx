import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 7; source content and algorithms retained.
import {ListBox, ListBoxItem} from './native/vanilla/solid-ListBox';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ListBox aria-label="Links" selectionMode="multiple">
  {/*- begin highlight -*/}
  <ListBoxItem href="https://adobe.com/" target="_blank">Adobe</ListBoxItem>
  {/*- end highlight -*/}
  <ListBoxItem href="https://apple.com/" target="_blank">Apple</ListBoxItem>
  <ListBoxItem href="https://google.com/" target="_blank">Google</ListBoxItem>
  <ListBoxItem href="https://microsoft.com/" target="_blank">Microsoft</ListBoxItem>
</ListBox>);
}


export const title = "ListBox: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
