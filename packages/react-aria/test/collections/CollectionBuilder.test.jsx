import {
  Collection,
  CollectionBuilder,
  createBranchComponent,
  createLeafComponent
} from '../../src/collections/CollectionBuilder';
import {CollectionNode} from '../../src/collections/BaseCollection';
import {createSignal, Errored, For} from 'solid-js';
import {act, render} from '@react-spectrum/test-utils-internal';

class ItemNode extends CollectionNode {
  static type = 'item';
}

const Item = createLeafComponent(ItemNode, () => {
  return <div />;
});

const ItemsOld = createLeafComponent('item', () => {
  return <div />;
});

const SectionOld = createBranchComponent('section', () => {
  return <div />;
});

const renderItems = (items, spyCollection) => (
  <CollectionBuilder
    content={
      <Collection>
        <For each={items()}>{item => <Item key={item} />}</For>
      </Collection>
    }>
    {collection => {
      spyCollection.current = collection;
      return null;
    }}
  </CollectionBuilder>
);

const renderItemsWithIds = (items, spyCollection) => (
  <CollectionBuilder
    content={
      <Collection>
        <For each={items()} keyed={item => item.key}>{item => <Item key={item().key} id={item().id} />}</For>
      </Collection>
    }>
    {collection => {
      spyCollection.current = collection;
      return null;
    }}
  </CollectionBuilder>
);

const renderItemsOld = (items, spyCollection) => (
  <CollectionBuilder
    content={
      <Collection>
        <SectionOld>
          <For each={items()}>{item => <ItemsOld key={item} />}</For>
        </SectionOld>
      </Collection>
    }>
    {collection => {
      spyCollection.current = collection;
      return null;
    }}
  </CollectionBuilder>
);

// A native boundary catches the intentional rendering failure without halting
// the whole reactive runtime. Rethrow the same source error to the assertion.
function renderExpectingError(content) {
  let error;
  let view = render(() => <Errored fallback={failure => {
    error = failure();
    return null;
  }}>{content()}</Errored>);
  view.unmount();
  if (error) throw error;
}

describe('CollectionBuilder', () => {
  it('should be frozen even in case of empty initial collection', () => {
    let spyCollection = {};
    render(() => renderItems(() => [], spyCollection));
    expect(spyCollection.current.frozen).toBe(true);
  });

  it('should have correct firstKey, lastKey and should be frozen after all items are deleted', () => {
    let spyCollection = {};
    let setItems;
    render(() => {
      let [items, update] = createSignal(['a']);
      setItems = update;
      return renderItems(items, spyCollection);
    });
    act(() => setItems([]));
    expect(spyCollection.current.frozen).toBe(true);
    expect(spyCollection.current.firstKey).toBe(null);
    expect(spyCollection.current.lastKey).toBe(null);
  });

  it('should throw when two items share a key', () => {
    let spyCollection = {};
    let adjacent = [
      {key: 1, id: 'a'},
      {key: 2, id: 'a'},
      {key: 3, id: 'b'}
    ];
    expect(() => renderExpectingError(() => renderItemsWithIds(() => adjacent, spyCollection))).toThrow(
      'Duplicate key "a" found in collection. Every item in a collection must have a unique key.'
    );

    let separated = [
      {key: 1, id: 'a'},
      {key: 2, id: 'x'},
      {key: 3, id: 'a'}
    ];
    expect(() => renderExpectingError(() => renderItemsWithIds(() => separated, spyCollection))).toThrow(
      'Duplicate key "a" found in collection.'
    );
  });

  it('should allow a new item to reuse the key of an item removed in the same render', () => {
    let spyCollection = {};
    let setItems;
    render(() => {
      let [items, update] = createSignal([
          {key: 1, id: 'a'},
          {key: 2, id: 'b'}
        ]);
      setItems = update;
      return renderItemsWithIds(items, spyCollection);
    });
    expect([...spyCollection.current.getKeys()]).toEqual(['a', 'b']);

    act(() => setItems([
          {key: 1, id: 'a'},
          {key: 3, id: 'c'},
          {key: 4, id: 'b'}
        ]));
    expect([...spyCollection.current.getKeys()]).toEqual(['a', 'c', 'b']);

    act(() => setItems([{key: 5, id: 'a'}]));
    expect([...spyCollection.current.getKeys()]).toEqual(['a']);
  });

  it('should still support using strings for the collection node class in createLeafComponent/createBranchComponent', () => {
    let spyCollection = {};
    render(() => renderItemsOld(() => ['a'], spyCollection));
    expect(spyCollection.current.frozen).toBe(true);
    expect(spyCollection.current.firstKey).toBe('react-aria-2');
    expect(spyCollection.current.keyMap.get('react-aria-2').type).toBe('section');
    expect(spyCollection.current.keyMap.get('react-aria-2').firstChildKey).toBe('react-aria-1');
    expect(spyCollection.current.keyMap.get('react-aria-1').type).toBe('item');
  });
});
