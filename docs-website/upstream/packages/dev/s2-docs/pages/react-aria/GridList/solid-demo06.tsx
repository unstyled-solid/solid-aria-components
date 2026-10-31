import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 6; source content and algorithms retained.
import {GridList} from '../ListBox/native/vanilla/solid-GridList';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<GridList
  aria-label="Search results"
  renderEmptyState={() => 'No results found.'}>
  {[]}
</GridList>);
}


export const title = "GridList: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
