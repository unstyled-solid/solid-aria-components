import {RefObject} from '@react-types/shared';
import {createEffect} from 'solid-js';
import {useEffectEvent} from './useEffectEvent';

function hasResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

type useResizeObserverOptionsType<T> = {
  ref: RefObject<T | undefined | null> | undefined;
  box?: ResizeObserverBoxOptions;
  onResize: () => void;
};

export function useResizeObserver<T extends Element>(
  options: useResizeObserverOptionsType<T>
): void {
  // Only call onResize from inside the effect, otherwise we'll void our assumption that
  // useEffectEvents are safe to pass in.
  let onResizeEvent = useEffectEvent(undefined, () => options.onResize);

  createEffect(() => ({element: options.ref?.current, box: options.box}), ({element, box}) => {
    if (!element) {
      return;
    }

    if (!hasResizeObserver()) {
      window.addEventListener('resize', onResizeEvent, false);
      return () => {
        window.removeEventListener('resize', onResizeEvent, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver(entries => {
        if (!entries.length) {
          return;
        }

        onResizeEvent();
      });
      resizeObserverInstance.observe(element, {box});

      return () => {
        if (element) {
          resizeObserverInstance.unobserve(element);
        }
      };
    }
  });
}
