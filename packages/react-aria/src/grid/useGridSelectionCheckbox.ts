import {AriaCheckboxProps} from '../checkbox/useCheckbox';
import type {MultipleSelectionManager} from 'react-stately/useMultipleSelectionState';
import intlMessages from '../../intl/grid/*.json';
import {Key} from '@react-types/shared';
import {useId} from '../utils/useId';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';

export interface AriaGridSelectionCheckboxProps {
  /** A unique key for the checkbox. */
  key: Key;
}

export interface GridSelectionCheckboxAria {
  /** Props for the row selection checkbox element. */
  checkboxProps: AriaCheckboxProps;
}

/**
 * Provides the behavior and accessibility implementation for a selection checkbox in a grid.
 *
 * @param props - Props for the selection checkbox.
 * @param state - State of the grid, as returned by `useGridState`.
 */
export function useGridSelectionCheckbox(
  props: AriaGridSelectionCheckboxProps,
  state: {readonly selectionManager: MultipleSelectionManager}
): GridSelectionCheckboxAria {
  let checkboxId = useId();

  // Checkbox should always toggle selection, regardless of selectionBehavior.
  let onChange = () => state.selectionManager.toggleSelection(props.key);

  const stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/grid');

  return {
    checkboxProps: {
      get id() { return checkboxId(); },
      get 'aria-label'() { return stringFormatter.format('select'); },
      get isSelected() { return state.selectionManager.isSelected(props.key); },
      get isDisabled() { return !state.selectionManager.canSelectItem(props.key); },
      onChange
    }
  };
}
