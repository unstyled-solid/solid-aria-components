import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 4; source content and algorithms retained.
import {GridList, GridListItem, GridListLoadMoreItem, Text} from '../ListBox/native/vanilla/solid-GridList';
import {Collection} from 'solid-aria-components/Collection';
import {useAsyncList} from 'solid-aria-components/useAsyncList';
import {ProgressCircle} from '../ListBox/native/vanilla/solid-ProgressCircle';

type Item = {
  id: string;
  description?: string;
  alt_description?: string;
  urls: {regular: string};
  width: number;
  height: number;
  user: {name: string};
};

function AsyncLoadingExample() {
  let list = useAsyncList<Item, number | null>({
    async load({signal, cursor, items}) {
      let page = cursor || 1;
      let res = await fetch(
        `https://api.unsplash.com/topics/nature/photos?page=${page}&per_page=30&client_id=AJuU-FPh11hn7RuumUllp4ppT8kgiLS7LtOHp_sp4nc`,
        {signal}
      );
      let nextItems: Item[] = await res.json();
      // Filter duplicates which might be returned by the API.
      let existingKeys = new Set(items.map(i => i.id));
      nextItems = nextItems.filter(i => !existingKeys.has(i.id) && (i.description || i.alt_description));
      return {items: nextItems, cursor: nextItems.length ? page + 1 : null};
    }
  });

  return (
    <GridList
      aria-label="Nature photos"
      layout="grid"
      selectionMode="multiple"
      renderEmptyState={() => (
        <ProgressCircle isIndeterminate aria-label="Loading..." />
      )}>
      <Collection items={list.items}>
        {(item) => (
          <GridListItem textValue={item.description || item.alt_description}>
            <img src={item.urls.regular} width={item.width} height={item.height} alt="" />
            <Text>{item.description || item.alt_description}</Text>
            <Text slot="description">By {item.user.name}</Text>
          </GridListItem>
        )}
      </Collection>
      {/*- begin highlight -*/}
      <GridListLoadMoreItem
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === 'loadingMore'} />
      {/*- end highlight -*/}
    </GridList>
  );
}

export default AsyncLoadingExample;

export const title = "GridList: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <AsyncLoadingExample {...{}} {...props} />, element);
}
