import {createFocusManager, getFocusableTreeWalker} from '../focus/FocusScope';
import {DateFieldState} from 'react-stately/useDateFieldState';
import type {DatePickerState} from 'react-stately/private/datepicker/DatePickerStateTypes';
import type {DateRangePickerState} from 'react-stately/private/datepicker/DateRangePickerStateTypes';
import {DOMAttributes, FocusableElement, RefObject} from '@react-types/shared';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {mergeProps} from '../utils/mergeProps';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocale} from '../i18n/I18nProvider';
import type {Accessor} from 'solid-js';
import {usePress} from '../interactions/usePress';

export function useDatePickerGroup(
  state: DatePickerState | DateRangePickerState | DateFieldState,
  ref: RefObject<Element | null>,
  disableArrowNavigation?: boolean | Accessor<boolean>
): DOMAttributes<FocusableElement> {
  let locale = useLocale();
  let isArrowNavigationDisabled = () => typeof disableArrowNavigation === 'function' ? disableArrowNavigation() : disableArrowNavigation;
  // oxlint-disable-next-line react/react-compiler
  let focusManager = createFocusManager(ref);

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      'Alt+ArrowDown': () => {
        if ('setOpen' in state) {
          state.setOpen(true);
          return;
        }
        return false;
      },
      'Alt+ArrowUp': () => {
        if ('setOpen' in state) {
          state.setOpen(true);
          return;
        }
        return false;
      },
      ArrowLeft: e => {
        if (isArrowNavigationDisabled()) {
          return false;
        }
        if (locale.direction === 'rtl') {
          if (ref.current) {
            let target = getEventTarget(e) as FocusableElement;
            let prev = findNextSegment(ref.current, target.getBoundingClientRect().left, -1);

            if (prev) {
              prev.focus();
              return;
            }
          }
        } else {
          focusManager.focusPrevious();
          return;
        }
        return false;
      },
      ArrowRight: e => {
        if (isArrowNavigationDisabled()) {
          return false;
        }
        if (locale.direction === 'rtl') {
          if (ref.current) {
            let target = getEventTarget(e) as FocusableElement;
            let next = findNextSegment(ref.current, target.getBoundingClientRect().left, 1);

            if (next) {
              next.focus();
              return;
            }
          }
        } else {
          focusManager.focusNext();
          return;
        }
        return false;
      }
    },
    allowRepeats: true
  });

  // Focus the first placeholder segment from the end on mouse down/touch up in the field.
  let focusLast = () => {
    if (!ref.current) {
      return;
    }
    // Try to find the segment prior to the element that was clicked on.
    let target = window.event ? (getEventTarget(window.event) as FocusableElement) : null;
    let walker = getFocusableTreeWalker(ref.current, {tabbable: true});
    if (target) {
      walker.currentNode = target;
      target = walker.previousNode() as FocusableElement;
    }

    // If no target found, find the last element from the end.
    if (!target) {
      let last: FocusableElement;
      do {
        last = walker.lastChild() as FocusableElement;
        if (last) {
          target = last;
        }
      } while (last);
    }

    // Now go backwards until we find an element that is not a placeholder.
    while (target?.hasAttribute('data-placeholder')) {
      let prev = walker.previousNode() as FocusableElement;
      if (prev && prev.hasAttribute('data-placeholder')) {
        target = prev;
      } else {
        break;
      }
    }

    if (target) {
      target.focus();
    }
  };

  let {pressProps} = usePress({
    preventFocusOnPress: true,
    allowTextSelectionOnPress: true,
    onPressStart(e) {
      if (e.pointerType === 'mouse') {
        focusLast();
      }
    },
    onPress(e) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        focusLast();
      }
    }
  });

  // oxlint-disable-next-line react/react-compiler
  return mergeProps(pressProps, keyboardProps);
}

function findNextSegment(group: Element, fromX: number, direction: number) {
  let walker = getFocusableTreeWalker(group, {tabbable: true});
  let node = walker.nextNode();
  let closest: FocusableElement | null = null;
  let closestDistance = Infinity;
  while (node) {
    let x = (node as Element).getBoundingClientRect().left;
    let distance = x - fromX;
    let absoluteDistance = Math.abs(distance);
    if (Math.sign(distance) === direction && absoluteDistance < closestDistance) {
      closest = node as FocusableElement;
      closestDistance = absoluteDistance;
    }
    node = walker.nextNode();
  }
  return closest;
}
