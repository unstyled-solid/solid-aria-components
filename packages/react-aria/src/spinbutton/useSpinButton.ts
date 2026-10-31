/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {announce, clearAnnouncer} from '../live-announcer/LiveAnnouncer';

import {AriaButtonProps} from '../button/useButton';
import {DOMAttributes, InputBase, RangeInputBase, Validation, ValueBase} from '@react-types/shared';
import intlMessages from '../../intl/spinbutton/*.json';
import {createEffect, createSignal, merge, onSettled} from 'solid-js';
import {useEffectEvent} from '../utils/useEffectEvent';
import {useGlobalListeners} from '../utils/useGlobalListeners';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';

const noop = () => {};

export interface SpinButtonProps
  extends InputBase, Validation<number>, ValueBase<number>, RangeInputBase<number> {
  textValue?: string;
  onIncrement?: () => void;
  onIncrementPage?: () => void;
  onDecrement?: () => void;
  onDecrementPage?: () => void;
  onDecrementToMin?: () => void;
  onIncrementToMax?: () => void;
}

export interface SpinbuttonAria {
  spinButtonProps: DOMAttributes;
  incrementButtonProps: AriaButtonProps;
  decrementButtonProps: AriaButtonProps;
}

export function useSpinButton(props: SpinButtonProps): SpinbuttonAria {
  const _async: {current: number | undefined} = {current: undefined};
  const stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/spinbutton');

  let isSpinning = {current: false};
  const clearAsync = () => {
    clearTimeout(_async.current);
    isSpinning.current = false;
  };
  const clearAsyncEvent = useEffectEvent(() => {
    clearAsync();
  });

  onSettled(() => {
    return () => clearAsyncEvent();
  });

  let {keyboardProps} = useKeyboard({
    get isDisabled() {return props.isDisabled || props.isReadOnly;},
    shortcuts: {
      PageUp: () => {
        if (props.onIncrementPage) {
          props.onIncrementPage();
          return;
        }
        if (props.onIncrement) {
          props.onIncrement();
          return;
        }
        return false;
      },
      ArrowUp: () => {
        if (props.onIncrement) {
          props.onIncrement();
          return;
        }
        return false;
      },
      PageDown: () => {
        if (props.onDecrementPage) {
          props.onDecrementPage();
          return;
        }
        if (props.onDecrement) {
          props.onDecrement();
          return;
        }
        return false;
      },
      ArrowDown: () => {
        if (props.onDecrement) {
          props.onDecrement();
          return;
        }
        return false;
      },
      Home: () => {
        if (props.onDecrementToMin) {
          props.onDecrementToMin();
          return;
        }
        return false;
      },
      End: () => {
        if (props.onIncrementToMax) {
          props.onIncrementToMax();
          return;
        }
        return false;
      }
    },
    allowRepeats: true
  });

  let isFocused = {current: false};
  let onFocus = () => {
    isFocused.current = true;
  };

  let onBlur = () => {
    isFocused.current = false;
  };

  // Replace Unicode hyphen-minus (U+002D) with minus sign (U+2212).
  // This ensures that macOS VoiceOver announces it as "minus" even with other characters between the minus sign
  // and the number (e.g. currency symbol). Otherwise it announces nothing because it assumes the character is a hyphen.
  // In addition, replace the empty string with the word "Empty" so that iOS VoiceOver does not read "50%" for an empty field.
  let ariaTextValue = () =>
    props.textValue === ''
      ? stringFormatter.format('Empty')
      : (props.textValue || `${props.value}`).replace('-', '\u2212');

  createEffect(ariaTextValue, text => {
    if (isFocused.current) {
      clearAnnouncer('assertive');
      announce(text, 'assertive');
    }
  });

  // For touch users, if they move their finger like they're scrolling, we don't want to trigger a spin.
  let onPointerCancel = () => {
    clearAsync();
  };

  const onIncrementEvent = useEffectEvent(() => (props.onIncrement ?? noop)());
  const onDecrementEvent = useEffectEvent(() => (props.onDecrement ?? noop)());

  const stepUpEvent = useEffectEvent(() => {
    if (
      !props.isDisabled && !props.isReadOnly && (props.maxValue === undefined ||
      isNaN(props.maxValue) ||
      props.value === undefined ||
      isNaN(props.value) ||
      props.value < props.maxValue)
    ) {
      onIncrementEvent();
      // oxlint-disable-next-line react/react-compiler
      onIncrementPressStartEvent(60);
    }
  });

  const onIncrementPressStartEvent = useEffectEvent((initialStepDelay: number) => {
    clearAsyncEvent();
    isSpinning.current = true;
    // Start spinning after initial delay
    _async.current = window.setTimeout(stepUpEvent, initialStepDelay);
  });

  const stepDownEvent = useEffectEvent(() => {
    if (
      !props.isDisabled && !props.isReadOnly && (props.minValue === undefined ||
      isNaN(props.minValue) ||
      props.value === undefined ||
      isNaN(props.value) ||
      props.value > props.minValue)
    ) {
      onDecrementEvent();
      // oxlint-disable-next-line react/react-compiler
      onDecrementPressStartEvent(60);
    }
  });

  const onDecrementPressStartEvent = useEffectEvent((initialStepDelay: number) => {
    clearAsyncEvent();
    isSpinning.current = true;
    // Start spinning after initial delay
    _async.current = window.setTimeout(stepDownEvent, initialStepDelay);
  });

  let cancelContextMenu = (e: Event) => {
    e.preventDefault();
  };

  let {addGlobalListener, removeAllGlobalListeners} = useGlobalListeners();

  // Tracks in touch if the press end event was preceded by a press up.
  // If it wasn't, then we know the finger left the button while still in contact with the screen.
  // This means that the user is trying to scroll or interact in some way that shouldn't trigger
  // an increment or decrement.
  let isUp = {current: false};

  let [isIncrementPressed, setIsIncrementPressed] = createSignal<'touch' | 'mouse' | null>(null);
  createEffect(isIncrementPressed, isIncrementPressed => {
    if (isIncrementPressed === 'touch') {
      onIncrementPressStartEvent(600);
    } else if (isIncrementPressed) {
      onIncrementPressStartEvent(400);
    } else if (!isIncrementPressed) {
      clearAsyncEvent();
    }
  });

  let [isDecrementPressed, setIsDecrementPressed] = createSignal<'touch' | 'mouse' | null>(null);
  createEffect(isDecrementPressed, isDecrementPressed => {
    if (isDecrementPressed === 'touch') {
      onDecrementPressStartEvent(600);
    } else if (isDecrementPressed) {
      onDecrementPressStartEvent(400);
    } else if (!isDecrementPressed) {
      clearAsyncEvent();
    }
  });
  createEffect(() => props.isDisabled || props.isReadOnly, disabled => {
    if (disabled) {
      clearAsync();
      removeAllGlobalListeners();
      setIsIncrementPressed(null);
      setIsDecrementPressed(null);
    }
  });

  return {
    spinButtonProps: merge(keyboardProps, {
      role: 'spinbutton' as const,
      get 'aria-valuenow'() {return props.value !== undefined && !isNaN(props.value) ? props.value : undefined;},
      get 'aria-valuetext'() {return ariaTextValue();},
      get 'aria-valuemin'() {return props.minValue;},
      get 'aria-valuemax'() {return props.maxValue;},
      get 'aria-disabled'() {return props.isDisabled ? 'true' as const : undefined;},
      get 'aria-readonly'() {return props.isReadOnly ? 'true' as const : undefined;},
      get 'aria-required'() {return props.isRequired ? 'true' as const : undefined;},
      onFocus,
      onBlur
    }),
    incrementButtonProps: {
      onPressStart: e => {
        clearAsync();
        if (e.pointerType !== 'touch') {
          props.onIncrement?.();
          setIsIncrementPressed('mouse');
        } else {
          addGlobalListener(window, 'pointercancel', onPointerCancel, {capture: true});
          isUp.current = false;
          // For touch users, don't trigger a decrement on press start, we'll wait for the press end to trigger it if
          // the control isn't spinning.
          setIsIncrementPressed('touch');
        }
        addGlobalListener(window, 'contextmenu', cancelContextMenu);
      },
      onPressUp: e => {
        clearAsync();
        if (e.pointerType === 'touch') {
          isUp.current = true;
        }
        removeAllGlobalListeners();
        setIsIncrementPressed(null);
      },
      onPressEnd: e => {
        clearAsync();
        if (e.pointerType === 'touch') {
          if (!isSpinning.current && isUp.current) {
            props.onIncrement?.();
          }
        }
        isUp.current = false;
        setIsIncrementPressed(null);
      },
      onFocus,
      onBlur
    },
    decrementButtonProps: {
      onPressStart: e => {
        clearAsync();
        if (e.pointerType !== 'touch') {
          props.onDecrement?.();
          setIsDecrementPressed('mouse');
        } else {
          addGlobalListener(window, 'pointercancel', onPointerCancel, {capture: true});
          isUp.current = false;
          // For touch users, don't trigger a decrement on press start, we'll wait for the press end to trigger it if
          // the control isn't spinning.
          setIsDecrementPressed('touch');
        }
      },
      onPressUp: e => {
        clearAsync();
        if (e.pointerType === 'touch') {
          isUp.current = true;
        }
        removeAllGlobalListeners();
        setIsDecrementPressed(null);
      },
      onPressEnd: e => {
        clearAsync();
        if (e.pointerType === 'touch') {
          if (!isSpinning.current && isUp.current) {
            props.onDecrement?.();
          }
        }
        isUp.current = false;
        setIsDecrementPressed(null);
      },
      onFocus,
      onBlur
    }
  };
}
