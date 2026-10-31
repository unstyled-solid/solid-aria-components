import {
  AsyncLoadable,
  AriaLabelingProps,
  CollectionBase,
  FocusStrategy,
  MultipleSelection,
  Node,
  SelectionBehavior
} from '@react-types/shared';
import {ListState, useListState} from 'react-stately/useListState';
import {merge} from 'solid-js';
import {For, type JSX} from '@solidjs/web';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {useSelectableItem} from '../../src/selection/useSelectableItem';
import {useSelectableList} from '../../src/selection/useSelectableList';

function ListItem<T>(props: {item: Node<T>; state: ListState<T>}) {
  const ref = useObjectRef<HTMLLIElement>();
  const {itemProps} = useSelectableItem({
    get key() { return props.item.key; },
    ref,
    get selectionManager() { return props.state.selectionManager; }
  });
  const selected = () => props.state.selectionManager.isSelected(props.item.key);
  return (
    <li
      role="option"
      {...itemProps}
      ref={ref}
      style={{
        background: selected() ? 'dodgerblue' : undefined,
        color: selected() ? '#fff' : undefined
      }}
      aria-selected={selected() ? 'true' : undefined}>
      {props.item.rendered}
    </li>
  );
}

export function List<T extends object>(props: ListProps<T>): JSX.Element {
   const ref = useObjectRef<HTMLUListElement>();
  const state = useListState(props);
  const {listProps} = useSelectableList(merge(props, {
    get selectionManager() { return state.selectionManager; },
    get collection() { return state.collection; },
    get disabledKeys() { return state.disabledKeys; },
    selectOnFocus: true,
    ref
  }));

  return (
    <ul {...listProps} ref={ref} role="listbox" aria-label={props['aria-label'] ?? 'test listbox'}>
      <For each={[...state.collection]}>{item => (
        <ListItem item={item} state={state} />
      )}</For>
    </ul>
  );
}

export interface ListProps<T> extends CollectionBase<T>, AsyncLoadable, MultipleSelection, AriaLabelingProps {
  selectionBehavior?: SelectionBehavior;
  autoFocus?: boolean | FocusStrategy;
}
