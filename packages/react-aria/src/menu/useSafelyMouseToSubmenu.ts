import {nodeContains} from '../utils/shadowdom/DOMFunctions';
import {RefObject} from '@react-types/shared';
import {createEffect, createSignal} from 'solid-js';
import {useEffectEvent} from '../utils/useEffectEvent';
import {useInteractionModality} from '../interactions/useFocusVisible';
import {useResizeObserver} from '../utils/useResizeObserver';

interface SafelyMouseToSubmenuOptions {
  /** Ref for the parent menu. */
  menuRef: RefObject<Element | null>;
  /** Ref for the submenu. */
  submenuRef: RefObject<Element | null>;
  /** Whether the submenu is open. */
  isOpen: boolean;
  /** Whether this feature is disabled. */
  isDisabled?: boolean;
}

const ALLOWED_INVALID_MOVEMENTS = 2;
const THROTTLE_TIME = 50;
const TIMEOUT_TIME = 1000;
const ANGLE_PADDING = Math.PI / 12; // 15°

/**
 * Allows the user to move their pointer to the submenu without it closing when their mouse leaves
 * the trigger element. Prevents pointer events from going to the underlying menu if the user is
 * moving their pointer towards the sub-menu.
 */
export function useSafelyMouseToSubmenu(options: SafelyMouseToSubmenuOptions): void {
  let submenuRef = {get current() {return options.submenuRef.current;}};
  let prevPointerPos: {current: {x: number; y: number} | undefined} = {current: undefined};
  let submenuRect: {current: DOMRect | undefined} = {current: undefined};
  let lastProcessedTime = {current: 0};
  let timeout: {current: ReturnType<typeof setTimeout> | undefined} = {current: undefined};
  let autoCloseTimeout: {current: ReturnType<typeof setTimeout> | undefined} = {current: undefined};
  let submenuSide: {current: 'left' | 'right' | undefined} = {current: undefined};
  let movementsTowardsSubmenuCount = {current: 2};
  let [preventPointerEvents, setPreventPointerEvents] = createSignal(false);

  let updateSubmenuRect = () => {
    if (submenuRef.current) {
      submenuRect.current = submenuRef.current.getBoundingClientRect();
      submenuSide.current = undefined;
    }
  };
  useResizeObserver({get ref() {return options.isOpen ? submenuRef : undefined;}, onResize: updateSubmenuRect});

  let reset = () => {
    setPreventPointerEvents(false);
    movementsTowardsSubmenuCount.current = ALLOWED_INVALID_MOVEMENTS;
    prevPointerPos.current = undefined;
  };

  let modality = useInteractionModality();

  // Prevent mouse down over safe triangle. Clicking while pointer-events: none is applied
  // will cause focus to move unexpectedly since it will go to an element behind the menu.
  let onPointerDown = useEffectEvent((e: PointerEvent) => {
    if (preventPointerEvents()) {
      e.preventDefault();
    }
  });

  createEffect(() => ({menu: options.menuRef.current as HTMLElement | null, prevent: preventPointerEvents()}), ({menu, prevent}) => {
    if (menu) {
      menu.style.pointerEvents = prevent ? 'none' : '';
      return () => {menu.style.pointerEvents = '';};
    }
  });

  createEffect(() => ({submenu: submenuRef.current, menu: options.menuRef.current, isOpen: options.isOpen, isDisabled: options.isDisabled, modality: modality()}), ({submenu, menu, isOpen, isDisabled, modality}) => {
    if (isDisabled || !submenu || !isOpen || modality !== 'pointer' || !menu) {
      reset();
      return;
    }
    submenuRect.current = submenu.getBoundingClientRect();

    let onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        return;
      }

      let currentTime = Date.now();

      // Throttle
      if (currentTime - lastProcessedTime.current < THROTTLE_TIME) {
        return;
      }
      clearTimeout(timeout.current);
      clearTimeout(autoCloseTimeout.current);

      let {clientX: mouseX, clientY: mouseY} = e;

      if (!prevPointerPos.current) {
        prevPointerPos.current = {x: mouseX, y: mouseY};
        return;
      }

      if (!submenuRect.current) {
        return;
      }

      if (!submenuSide.current) {
        submenuSide.current = mouseX > submenuRect.current.right ? 'left' : 'right';
      }

      // Pointer is outside of parent menu
      if (
        mouseX < menu.getBoundingClientRect().left ||
        mouseX > menu.getBoundingClientRect().right ||
        mouseY < menu.getBoundingClientRect().top ||
        mouseY > menu.getBoundingClientRect().bottom
      ) {
        reset();
        return;
      }

      /* Check if pointer is moving towards submenu.
        Uses the 2-argument arctangent (https://en.wikipedia.org/wiki/Atan2) to calculate:
          - angle between previous pointer and top of submenu
          - angle between previous pointer and bottom of submenu
          - angle between previous pointer and current pointer (delta)
        If the pointer delta angle value is between the top and bottom angle values, we know the pointer is moving towards the submenu.
      */
      let prevMouseX = prevPointerPos.current.x;
      let prevMouseY = prevPointerPos.current.y;
      let toSubmenuX =
        submenuSide.current === 'right'
          ? submenuRect.current.left - prevMouseX
          : prevMouseX - submenuRect.current.right;
      let angleTop = Math.atan2(prevMouseY - submenuRect.current.top, toSubmenuX) + ANGLE_PADDING;
      let angleBottom =
        Math.atan2(prevMouseY - submenuRect.current.bottom, toSubmenuX) - ANGLE_PADDING;
      let anglePointer = Math.atan2(
        prevMouseY - mouseY,
        submenuSide.current === 'left' ? -(mouseX - prevMouseX) : mouseX - prevMouseX
      );
      let isMovingTowardsSubmenu = anglePointer < angleTop && anglePointer > angleBottom;

      movementsTowardsSubmenuCount.current = isMovingTowardsSubmenu
        ? Math.min(movementsTowardsSubmenuCount.current + 1, ALLOWED_INVALID_MOVEMENTS)
        : Math.max(movementsTowardsSubmenuCount.current - 1, 0);

      if (movementsTowardsSubmenuCount.current >= ALLOWED_INVALID_MOVEMENTS) {
        setPreventPointerEvents(true);
      } else {
        setPreventPointerEvents(false);
      }

      lastProcessedTime.current = currentTime;
      prevPointerPos.current = {x: mouseX, y: mouseY};

      // If the pointer is moving towards the submenu, start a timeout to close if no other movements are made after 500ms.
      if (isMovingTowardsSubmenu) {
        timeout.current = setTimeout(() => {
          reset();
          autoCloseTimeout.current = setTimeout(() => {
            // Fire a pointerover event to trigger the menu to close.
            // Wait until pointer-events:none is no longer applied
            let target = document.elementFromPoint(mouseX, mouseY);
            if (target && nodeContains(menu, target)) {
              target.dispatchEvent(
                new PointerEvent('pointerover', {bubbles: true, cancelable: true})
              );
            }
          }, 100);
        }, TIMEOUT_TIME);
      }
    };

    window.addEventListener('pointermove', onPointerMove);

    // Prevent pointer down over the safe triangle. See above comment.
    // Do not enable in tests, because JSDom doesn't do hit testing.
    if (process.env.NODE_ENV !== 'test') {
      window.addEventListener('pointerdown', onPointerDown, true);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (process.env.NODE_ENV !== 'test') {
        window.removeEventListener('pointerdown', onPointerDown, true);
      }
      clearTimeout(timeout.current);
      clearTimeout(autoCloseTimeout.current);
      movementsTowardsSubmenuCount.current = ALLOWED_INVALID_MOVEMENTS;
    };
  });
}
