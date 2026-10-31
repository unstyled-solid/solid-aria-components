import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 6; source content and algorithms retained.
import {ListBox, ListBoxItem, ListBoxLoadMoreItem} from './native/vanilla/solid-ListBox';
import {ProgressCircle} from './native/vanilla/solid-ProgressCircle';
import {Collection} from 'solid-aria-components/Collection';
import {useAsyncList} from 'solid-aria-components/useAsyncList';

interface Character {
  name: string
}

function AsyncLoadingExample() {
  let list = useAsyncList<Character>({
    async load({signal, cursor}) {
      let res = await fetch(
        cursor || `https://pokeapi.co/api/v2/pokemon`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  return (
    <ListBox
      aria-label="Pick a Pokemon"
      selectionMode="single"
      renderEmptyState={() => (
        <ProgressCircle isIndeterminate aria-label="Loading..." />
      )}>
      <Collection items={list.items}>
        {(item) => <ListBoxItem id={item.name}>{item.name}</ListBoxItem>}
      </Collection>
      {/*- begin highlight -*/}
      <ListBoxLoadMoreItem
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === 'loadingMore'} />
      {/*- end highlight -*/}
    </ListBox>
  );
}

export default AsyncLoadingExample;

export const title = "ListBox: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <AsyncLoadingExample {...{}} {...props} />, element);
}
