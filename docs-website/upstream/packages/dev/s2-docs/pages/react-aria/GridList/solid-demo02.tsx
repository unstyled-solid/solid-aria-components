import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 2; source content and algorithms retained.
  import {GridList, GridListItem} from '../ListBox/native/tailwind/solid-GridList';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<GridList{...props}>
    <GridListItem>Aardvark</GridListItem>
    <GridListItem>Cat</GridListItem>
    <GridListItem>Dog</GridListItem>
    <GridListItem>Kangaroo</GridListItem>
    <GridListItem>Panda</GridListItem>
    <GridListItem>Snake</GridListItem>
  </GridList>);
}


export const title = "GridList: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Favorite animal', selectionMode: 'multiple'}} {...props} />, element);
}
