import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 5; source content and algorithms retained.
import {Collection} from 'solid-aria-components/Collection';
import {useAsyncList} from 'solid-aria-components/useAsyncList';
import {Table, TableHeader, Column, Row, TableBody, Cell, TableLoadMoreItem} from '../ListBox/native/vanilla/solid-Table';
import {ProgressCircle} from '../ListBox/native/vanilla/solid-ProgressCircle';

interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: number;
}

function AsyncSortTable() {
  let list = useAsyncList<Character>({
    async load({ signal, cursor }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      let res = await fetch(
        cursor || 'https://swapi.py4e.com/api/people/?search=',
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
    <div
      style={{
        height: "150px",
        overflow: 'auto',
        border: '0.5px solid var(--border-color)',
        "border-radius": 'var(--radius)'
      }}>
      <Table
        aria-label="Star Wars characters"
        style={{"table-layout": 'fixed', width: '100%', border: 0}}>
        <TableHeader
          style={{
            position: 'sticky',
            top: 0,
            background: 'var(--overlay-background)',
            "z-index": "1px"
          }}>
          <Column id="name" isRowHeader>Name</Column>
          <Column id="height">Height</Column>
          <Column id="mass">Mass</Column>
          <Column id="birth_year">Birth Year</Column>
        </TableHeader>
        <TableBody
          renderEmptyState={() => (
            <div style={{display: 'flex', "align-items": 'center', "justify-content": 'center'}}>
              <ProgressCircle isIndeterminate aria-label="Loading..." />
            </div>
          )}>
          <Collection items={list.items}>
            {(item) => (
              <Row id={item.name}>
                <Cell>{item.name}</Cell>
                <Cell>{item.height}</Cell>
                <Cell>{item.mass}</Cell>
                <Cell>{item.birth_year}</Cell>
              </Row>
            )}
          </Collection>
          {/*- begin highlight -*/}
          <TableLoadMoreItem
            onLoadMore={list.loadMore}
            isLoading={list.loadingState === 'loadingMore'} />
          {/*- end highlight -*/}
        </TableBody>
      </Table>
    </div>
  );
}

export default AsyncSortTable;

export const title = "Table: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <AsyncSortTable {...{}} {...props} />, element);
}
