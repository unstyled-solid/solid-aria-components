import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 4; source content and algorithms retained.
import {Tree, TreeItem, TreeLoadMoreItem} from '../ListBox/native/vanilla/solid-Tree';
import {ProgressCircle} from '../ListBox/native/vanilla/solid-ProgressCircle';
import {Collection} from 'solid-aria-components/Collection';
import {useAsyncList} from 'solid-aria-components/useAsyncList';

interface Character {
  name: string
}

function AsyncLoadingExample() {
  ///- begin collapse -///
  let starWarsList = useAsyncList<Character>({
    async load({signal, cursor}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      let res = await fetch(cursor || 'https://swapi.py4e.com/api/people/?search=', {signal});
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next
      };
    }
  });
  ///- end collapse -///

  ///- begin collapse -///
  let pokemonList = useAsyncList<Character>({
    async load({signal, cursor, filterText}) {
      let res = await fetch(
        cursor || `https://pokeapi.co/api/v2/pokemon`,
        {signal}
      );
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next
      };
    }
  });
  ///- end collapse -///

  return (
    <Tree
      aria-label="Async loading tree"
      style={{height: "300px"}}
      renderEmptyState={() => (
        <ProgressCircle isIndeterminate aria-label="Loading..." />
      )}>
      <TreeItem title="Pokemon">
        <Collection items={pokemonList.items}>
          {(item) => <TreeItem id={item.name} title={item.name} />}
        </Collection>
        {/*- begin highlight -*/}
        <TreeLoadMoreItem
          onLoadMore={pokemonList.loadMore}
          isLoading={pokemonList.loadingState === 'loadingMore'} />
        {/*- end highlight -*/}
      </TreeItem>
      <TreeItem title="Star Wars">
        <Collection items={starWarsList.items}>
          {(item) => <TreeItem id={item.name} title={item.name} />}
        </Collection>
        {/*- begin highlight -*/}
        <TreeLoadMoreItem
          onLoadMore={starWarsList.loadMore}
          isLoading={starWarsList.loadingState === 'loadingMore'} />
        {/*- end highlight -*/}
      </TreeItem>
    </Tree>
  );
}

export default AsyncLoadingExample;

export const title = "Tree: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <AsyncLoadingExample {...{}} {...props} />, element);
}
