import {render} from '@solidjs/web';
// Extracted from TagGroup.mdx render example 1; source content and algorithms retained.
  import {TagGroup, Tag} from '../ListBox/native/vanilla/solid-TagGroup';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<TagGroup{...props}>
    <Tag>News</Tag>
    <Tag>Travel</Tag>
    <Tag>Gaming</Tag>
    <Tag>Shopping</Tag>
  </TagGroup>);
}


export const title = "TagGroup: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{label: 'Categories', selectionMode: 'multiple'}} {...props} />, element);
}
