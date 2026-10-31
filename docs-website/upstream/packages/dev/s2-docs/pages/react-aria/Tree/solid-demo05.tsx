import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 5; source content and algorithms retained.
import {Tree, TreeItem} from '../ListBox/native/vanilla/solid-Tree';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree
  {...props}
  aria-label="Tree with links"
  defaultExpandedKeys={['bulbasaur', 'ivysaur']}>
  <TreeItem
    /*- begin highlight -*/
    href="https://pokemondb.net/pokedex/bulbasaur"
    target="_blank"
    /*- end highlight -*/
    id="bulbasaur"
    title="Bulbasaur">
    <TreeItem
      id="ivysaur"
      title="Ivysaur"
      href="https://pokemondb.net/pokedex/ivysaur"
      target="_blank">
      <TreeItem
        id="venusaur"
        title="Venusaur"
        href="https://pokemondb.net/pokedex/venusaur"
        target="_blank" />
    </TreeItem>
  </TreeItem>
</Tree>);
}


export const title = "Tree: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{selectionMode: 'multiple'}} {...props} />, element);
}
