import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 6; source content and algorithms retained.
import {Tree} from '../ListBox/native/vanilla/solid-Tree';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree
  aria-label="Search results"
  renderEmptyState={() => 'No results found.'}>
  {[]}
</Tree>);
}


export const title = "Tree: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
