import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 8; source content and algorithms retained.
import {ListBox} from './native/vanilla/solid-ListBox';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ListBox
  aria-label="Search results"
  renderEmptyState={() => 'No results found.'}>
  {[]}
</ListBox>);
}


export const title = "ListBox: upstream example 8";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
