import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import dndStyles from './dnd.css';
import {mergeProps} from '../../src/utils/mergeProps';
import {JSX} from '@solidjs/web';
import {For, merge} from 'solid-js';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {useDraggableCollection} from '../../src/dnd/useDraggableCollection';
import {useDraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {useDraggableItem} from '../../src/dnd/useDraggableItem';
import {useFocusRing} from '../../src/focus/useFocusRing';
import {useListBox} from '../../src/listbox/useListBox';
import {useListState} from 'react-stately/useListState';
import {useOption} from '../../src/listbox/useOption';

export function DraggableListBox(props: any): JSX.Element {
  let state = useListState(props);
  let ref = useObjectRef<HTMLUListElement>();
  let {listBoxProps} = useListBox(
    merge(props, {
      shouldSelectOnPressUp: true
    }),
    state,
    ref
  );

  let dragState = useDraggableCollectionState(merge(props, {
    get collection() { return state.collection; },
    get selectionManager() { return state.selectionManager; },
    get getItems() { return props.getItems ||
      ((keys: Set<import('@react-types/shared').Key>) =>
        [...keys].map(key => {
          let item = state.collection.getItem(key);
          if (!item) {
            return null;
          }

          return {
            'text/plain': item.textValue
          };
        })); }
  }));
  useDraggableCollection({}, dragState, ref);

  return (
    <ul
      {...listBoxProps}
      ref={ref}
      class={dndStyles['draggable-listbox']}
      aria-label="example draggable listbox">
      <For each={[...state.collection]} keyed={item => item.key}>
        {item => <Option item={item()} state={state} dragState={dragState} />}
      </For>
    </ul>
  );
}

function Option(props: {item: import('@react-types/shared').Node<any>, state: ReturnType<typeof useListState<any>>, dragState: ReturnType<typeof useDraggableCollectionState>}) {
  let ref = useObjectRef<HTMLLIElement>();
  let {optionProps, isPressed, hasAction} = useOption({get key() { return props.item.key; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  let {dragProps} = useDraggableItem(
    {
      get key() { return props.item.key; },
      get hasAction() { return hasAction(); }
    },
    props.dragState
  );

  return (
    <li
      {...mergeProps(dragProps, optionProps, focusProps, {ref})}
      class={classNames(dndStyles, 'option', {
        'focus-visible': isFocusVisible(),
        pressed: isPressed()
      })}>
      {props.item.rendered}
    </li>
  );
}
