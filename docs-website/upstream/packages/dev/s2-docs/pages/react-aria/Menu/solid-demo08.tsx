import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 8; source content and algorithms retained.
import {MenuTrigger, Menu, MenuItem, MenuLoadMoreItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {Collection} from 'solid-aria-components/Collection';
import {useAsyncList} from 'solid-aria-components/useAsyncList';

interface Character {
  name: string;
  birth_year: string;
}

function AsyncMenuExample() {
  let list = useAsyncList<Character>({
    async load({signal, cursor}) {
      if (cursor) cursor = cursor.replace(/^http:\/\//i, 'https://');
      let res = await fetch(cursor || 'https://swapi.py4e.com/api/people/', {signal});
      let json = await res.json();
      return {items: json.results, cursor: json.next};
    }
  });

  return (
    <MenuTrigger children={[() => (<Button>Select Character</Button>), () => (<Menu
        aria-label="Characters"
        renderEmptyState={() => list.loadingState === 'loading' ? 'Loading…' : 'No characters found'}>
        <Collection items={list.items}>
          {(item) => <MenuItem id={item.name}>{item.name}</MenuItem>}
        </Collection>
        {/*- begin highlight -*/}
        <MenuLoadMoreItem
          onLoadMore={list.loadMore}
          isLoading={list.loadingState === 'loadingMore'} />
        {/*- end highlight -*/}
      </Menu>)]} />
  );
}

export default AsyncMenuExample;

export const title = "Menu: upstream example 8";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <AsyncMenuExample {...{}} {...props} />, element);
}
