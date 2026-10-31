import {
  AriaLabelingProps,
  AriaValidationProps,
  DOMAttributes,
  DOMProps,
  FocusableDOMProps,
  FocusableProps,
  InputDOMProps,
  LabelableProps,
  Orientation,
  RefObject,
  ValidationState
} from '@react-types/shared';
import {clamp} from 'react-stately/private/utils/number';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getSliderThumbId, sliderData} from './utils';
import {mergeProps} from '../utils/mergeProps';
import {createEffect, merge, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {SliderState} from 'react-stately/useSliderState';
import {useFocusable} from '../interactions/useFocusable';
import {useFormReset} from '../utils/useFormReset';
import {useGlobalListeners} from '../utils/useGlobalListeners';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLabel} from '../label/useLabel';
import {useLocale} from '../i18n/I18nProvider';
import {useMove} from '../interactions/useMove';

export interface SliderThumbProps extends FocusableProps, LabelableProps {
  /**
   * The orientation of the Slider.
   *
   * @deprecated - pass to the slider instead.
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /** Whether the Thumb is disabled. */
  isDisabled?: boolean;
  /**
   * Index of the thumb within the slider.
   *
   * @default 0
   */
  index?: number;
  /** @deprecated */
  isRequired?: boolean;
  /** @deprecated */
  isInvalid?: boolean;
  /** @deprecated */
  validationState?: ValidationState;
}

export interface AriaSliderThumbProps
  extends
    SliderThumbProps,
    DOMProps,
    Omit<FocusableDOMProps, 'excludeFromTabOrder'>,
    InputDOMProps,
    AriaLabelingProps,
    AriaValidationProps {}

export interface SliderThumbAria {
  /** Props for the root thumb element; handles the dragging motion. */
  thumbProps: DOMAttributes;

  /** Props for the visually hidden range input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement> & {tabIndex?: number};

  /** Props for the label element for this thumb (optional). */
  labelProps: {id?: string; htmlFor?: string};

  /** Whether this thumb is currently being dragged. */
  isDragging: Accessor<boolean>;
  /** Whether the thumb is currently focused. */
  isFocused: Accessor<boolean>;
  /** Whether the thumb is disabled. */
  isDisabled: Accessor<boolean>;
}

export interface AriaSliderThumbOptions extends AriaSliderThumbProps {
  /** A ref to the track element. */
  trackRef: RefObject<Element | null>;
  /** A ref to the thumb input element. */
  inputRef: RefObject<HTMLInputElement | null>;
}

/**
 * Provides behavior and accessibility for a thumb of a slider component.
 *
 * @param opts Options for this Slider thumb.
 * @param state Slider state, created via `useSliderState`.
 */
export function useSliderThumb(opts: AriaSliderThumbOptions, state: SliderState): SliderThumbAria {
  let index = () => opts.index ?? 0;
  let trackRef = {get current() { return opts.trackRef.current; }};
  let inputRef = {get current() { return opts.inputRef.current; }};
  let orientation = () => opts.orientation ?? state.orientation;
  let isDisabled = () => opts.isDisabled || state.isDisabled;
  let isVertical = () => orientation() === 'vertical';

  let locale = useLocale();
  let {addGlobalListener, removeGlobalListener} = useGlobalListeners();

  let data = sliderData.get(state)!;
  const {labelProps, fieldProps} = useLabel(merge(opts, {
    get id() { return getSliderThumbId(state, index()); },
    get 'aria-labelledby'() { return `${data.id} ${opts['aria-labelledby'] ?? ''}`.trim(); }
  }));

  const focusInput = () => {
    if (inputRef.current) {
      focusWithoutScrolling(inputRef.current);
    }
  };

  const isFocused = () => state.focusedThumb === index();

  createEffect(() => ({focused: isFocused(), element: inputRef.current}), ({focused, element}) => {
    if (focused && element) {
      focusWithoutScrolling(element);
    }
  });

  let reverseX = () => locale.direction === 'rtl';
  let currentPosition = {current: null as number | null};

  let keyboardUpdate = (cb: () => void) => {
    // remember to set this so that onChangeEnd is fired
    state.setThumbDragging(index(), true);
    cb();
    state.setThumbDragging(index(), false);
  };

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      PageUp: () => {
        return keyboardUpdate(() => {
          state.incrementThumb(index(), state.pageSize);
        });
      },
      PageDown: () => {
        return keyboardUpdate(() => {
          state.decrementThumb(index(), state.pageSize);
        });
      },
      Home: () => {
        return keyboardUpdate(() => {
          state.setThumbValue(index(), state.getThumbMinValue(index()));
        });
      },
      End: () => {
        return keyboardUpdate(() => {
          state.setThumbValue(index(), state.getThumbMaxValue(index()));
        });
      }
    },
    allowRepeats: true
  });

  let {moveProps} = useMove({
    onMoveStart() {
      currentPosition.current = null;
      state.setThumbDragging(index(), true);
    },
    onMove({deltaX, deltaY, pointerType, shiftKey}) {
      const {getThumbPercent, setThumbPercent, decrementThumb, incrementThumb, step, pageSize} =
        state;
      if (!trackRef.current) {
        return;
      }
      let {width, height} = trackRef.current.getBoundingClientRect();
      let size = isVertical() ? height : width;

      if (currentPosition.current == null) {
        currentPosition.current = getThumbPercent(index()) * size;
      }
      if (pointerType === 'keyboard') {
        if ((deltaX > 0 && reverseX()) || (deltaX < 0 && !reverseX()) || deltaY > 0) {
          decrementThumb(index(), shiftKey ? pageSize : step);
        } else {
          incrementThumb(index(), shiftKey ? pageSize : step);
        }
      } else {
        let delta = isVertical() ? deltaY : deltaX;
        if (isVertical() || reverseX()) {
          delta = -delta;
        }

        currentPosition.current += delta;
        setThumbPercent(index(), clamp(currentPosition.current / size, 0, 1));
      }
    },
    onMoveEnd() {
      state.setThumbDragging(index(), false);
    }
  });

  // Immediately register editability with the state
  createEffect(() => ({index: index(), editable: !isDisabled()}), ({index, editable}) => {
    state.setThumbEditable(index, editable);
  });

  const {focusableProps} = useFocusable(
    mergeProps(opts, {
      onFocus: () => state.setFocusedThumb(index()),
      onBlur: () => state.setFocusedThumb(undefined)
    }),
    inputRef
  );

  let currentPointer = {current: undefined as number | undefined};
  let onDown = (id?: number) => {
    focusInput();
    currentPointer.current = id;
    state.setThumbDragging(index(), true);

    addGlobalListener(window, 'mouseup', onUp, false);
    addGlobalListener(window, 'touchend', onUp, false);
    addGlobalListener(window, 'pointerup', onUp, false);
  };

  let onUp = (event: Event) => {
    let e = event as PointerEvent & Partial<TouchEvent>;
    let id = e.pointerId ?? e.changedTouches?.[0].identifier;
    if (id === currentPointer.current) {
      focusInput();
      state.setThumbDragging(index(), false);
      removeGlobalListener(window, 'mouseup', onUp, false);
      removeGlobalListener(window, 'touchend', onUp, false);
      removeGlobalListener(window, 'pointerup', onUp, false);
    }
  };

  let thumbPosition = () => {
    let position = state.getThumbPercent(index());
    return isVertical() || locale.direction === 'rtl' ? 1 - position : position;
  };

  let enabledInteractions = mergeProps(keyboardProps, moveProps, {
        onMouseDown: (e: MouseEvent) => {
          if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }
          onDown();
        },
        onPointerDown: (e: PointerEvent) => {
          if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }
          onDown(e.pointerId);
        },
        onTouchStart: (e: TouchEvent) => {
          onDown(e.changedTouches[0].identifier);
        }
      });
  let interactions = new Proxy({} as DOMAttributes, {
    get: (_, key) => isDisabled() ? undefined : Reflect.get(enabledInteractions, key),
    has: (_, key) => !isDisabled() && key in enabledInteractions,
    ownKeys: () => isDisabled() ? [] : Reflect.ownKeys(enabledInteractions),
    getOwnPropertyDescriptor: (_, key) => !isDisabled() && key in enabledInteractions
      ? {enumerable: true, configurable: true, get: () => Reflect.get(enabledInteractions, key)} : undefined
  });

  useFormReset(inputRef, () => state.defaultValues[index()], v => {
    state.setThumbValue(index(), v);
  });

  // We install mouse handlers for the drag motion on the thumb div, but
  // not the key handler for moving the thumb with the slider.  Instead,
  // we focus the range input, and let the browser handle the keyboard
  // interactions; we then listen to input's onChange to update state.
  return {
    inputProps: mergeProps(focusableProps, fieldProps, {
      type: 'range',
      get tabIndex() { return !isDisabled() ? 0 : undefined; },
      get min() { return state.getThumbMinValue(index()); },
      get max() { return state.getThumbMaxValue(index()); },
      get step() { return state.step; },
      get value() { return state.values[index()]; },
      get name() { return opts.name; },
      get form() { return opts.form; },
      get disabled() { return isDisabled(); },
      get 'aria-orientation'() { return orientation(); },
      get 'aria-valuetext'() { return state.getThumbValueLabel(index()); },
      get 'aria-required'() { return opts.isRequired ? 'true' as const : undefined; },
      get 'aria-invalid'() { return opts.isInvalid || opts.validationState === 'invalid' ? 'true' as const : undefined; },
      get 'aria-errormessage'() { return opts['aria-errormessage']; },
      get 'aria-describedby'() { return [data['aria-describedby'], opts['aria-describedby']]
        .filter(Boolean)
        .join(' '); },
      get 'aria-details'() { return [data['aria-details'], opts['aria-details']].filter(Boolean).join(' '); },
      onChange: (e: Event) => {
        state.setThumbValue(index(), parseFloat((getEventTarget(e) as HTMLInputElement).value));
      },
      onInput: (e: Event) => {
        state.setThumbValue(index(), parseFloat((getEventTarget(e) as HTMLInputElement).value));
      }
    }) as JSX.InputHTMLAttributes<HTMLInputElement> & {tabIndex?: number},
    thumbProps: mergeProps(interactions, {
      get style() { return {
        position: 'absolute',
        [isVertical() ? 'top' : 'left']: `${thumbPosition() * 100}%`,
        transform: 'translate(-50%, -50%)',
        'touch-action': 'none'
      }; }
    }),
    labelProps,
    isDragging: () => state.isThumbDragging(index()),
    isDisabled,
    isFocused
  };
}
