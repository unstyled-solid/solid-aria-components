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

import {AriaLabelingProps, DOMAttributes, DOMProps, RefObject} from '@react-types/shared';
import {ColorAreaProps, ColorAreaState} from 'react-stately/useColorAreaState';
import {ColorChannel} from 'react-stately/Color';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import intlMessages from '../../intl/color/*.json';
import {isAndroid, isIOS} from '../utils/platform';
import {mergeProps} from '../utils/mergeProps';
import {createSignal, merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {MoveMoveEvent} from '@react-types/shared';
import {useColorAreaGradient} from './useColorAreaGradient';
import {useFocus} from '../interactions/useFocus';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useFormReset} from '../utils/useFormReset';
import {useGlobalListeners} from '../utils/useGlobalListeners';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLabels} from '../utils/useLabels';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useMove} from '../interactions/useMove';
import {useVisuallyHidden} from '../visually-hidden/VisuallyHidden';

export interface AriaColorAreaProps extends ColorAreaProps, DOMProps, AriaLabelingProps {
  /**
   * The name of the x channel input element, used when submitting an HTML form. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  xName?: string;
  /**
   * The name of the y channel input element, used when submitting an HTML form. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  yName?: string;
  /**
   * The `<form>` element to associate the ColorArea with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).
   */
  form?: string;
}

export interface ColorAreaAria {
  /** Props for the color area container element. */
  colorAreaProps: DOMAttributes;
  /** Props for the thumb element. */
  thumbProps: DOMAttributes;
  /** Props for the visually hidden horizontal range input element. */
  xInputProps: JSX.InputHTMLAttributes<HTMLInputElement> & {tabIndex?: number};
  /** Props for the visually hidden vertical range input element. */
  yInputProps: JSX.InputHTMLAttributes<HTMLInputElement> & {tabIndex?: number};
}

export interface AriaColorAreaOptions extends AriaColorAreaProps {
  /** A ref to the input that represents the x axis of the color area. */
  inputXRef: RefObject<HTMLInputElement | null>;
  /** A ref to the input that represents the y axis of the color area. */
  inputYRef: RefObject<HTMLInputElement | null>;
  /** A ref to the color area containing element. */
  containerRef: RefObject<Element | null>;
}

/**
 * Provides the behavior and accessibility implementation for a color area component. Color area
 * allows users to adjust two channels of an RGB, HSL or HSB color value against a two-dimensional
 * gradient background.
 */
export function useColorArea(props: AriaColorAreaOptions, state: ColorAreaState): ColorAreaAria {
  let isDisabled = () => props.isDisabled;
  let inputXRef = {get current() { return props.inputXRef.current; }};
  let inputYRef = {get current() { return props.inputYRef.current; }};
  let containerRef = {get current() { return props.containerRef.current; }};
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/color');

  let {addGlobalListener, removeGlobalListener} = useGlobalListeners();

  let localeInfo = useLocale();
  let direction = () => localeInfo.direction;
  let locale = () => localeInfo.locale;

  let [focusedInput, setFocusedInput] = createSignal<'x' | 'y' | null>(null);
  // Event history is synchronous; the signal exposes committed accessibility state.
  let focusedInputRequest: 'x' | 'y' | null = null;
  let focusChannel = (input: 'x' | 'y') => {
    focusedInputRequest = input;
    setFocusedInput(input);
  };
  let focusInput = (inputRef: RefObject<HTMLInputElement | null> = inputXRef) => {
      if (inputRef.current) {
        focusWithoutScrolling(inputRef.current);
      }
    };

  useFormReset(inputXRef, () => state.defaultValue, value => state.setValue(value));

  let [valueChangedViaKeyboard, setValueChangedViaKeyboard] = createSignal(false);
  let [valueChangedViaInputChangeEvent, setValueChangedViaInputChangeEvent] = createSignal(false);
  let xChannel = () => state.channels.xChannel;
  let yChannel = () => state.channels.yChannel;
  let zChannel = () => state.channels.zChannel;

  let currentPosition: {x: number; y: number} | null = null;

  let keyboardUpdate = (cb: () => void, inputRef: RefObject<HTMLInputElement | null>, input: 'x' | 'y') => {
    state.setDragging(true);
    setValueChangedViaKeyboard(true);
    cb();
    state.setDragging(false);
    focusInput(inputRef);
    focusChannel(input);
  };

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      PageUp: () => {
        return keyboardUpdate(
          () => {
            state.incrementY(state.yChannelPageStep);
          },
          inputYRef,
          'y'
        );
      },
      PageDown: () => {
        return keyboardUpdate(
          () => {
            state.decrementY(state.yChannelPageStep);
          },
          inputYRef,
          'y'
        );
      },
      Home: () => {
        return keyboardUpdate(
          () => {
            direction() === 'rtl'
              ? state.incrementX(state.xChannelPageStep)
              : state.decrementX(state.xChannelPageStep);
          },
          inputXRef,
          'x'
        );
      },
      End: () => {
        return keyboardUpdate(
          () => {
            direction() === 'rtl'
              ? state.decrementX(state.xChannelPageStep)
              : state.incrementX(state.xChannelPageStep);
          },
          inputXRef,
          'x'
        );
      }
    },
    allowRepeats: true
  });

  let moveHandler = {
    onMoveStart() {
      currentPosition = null;
      state.setDragging(true);
    },
    onMove({deltaX, deltaY, pointerType, shiftKey}: MoveMoveEvent) {
      let {
        incrementX,
        decrementX,
        incrementY,
        decrementY,
        xChannelPageStep,
        xChannelStep,
        yChannelPageStep,
        yChannelStep,
        getThumbPosition,
        setColorFromPoint
      } = state;
      if (currentPosition == null) {
        currentPosition = getThumbPosition();
      }
      let {width, height} = containerRef.current?.getBoundingClientRect() || {width: 0, height: 0};
      let valueChanged = deltaX !== 0 || deltaY !== 0;
      if (pointerType === 'keyboard') {
        let deltaXValue =
          shiftKey && xChannelPageStep > xChannelStep ? xChannelPageStep : xChannelStep;
        let deltaYValue =
          shiftKey && yChannelPageStep > yChannelStep ? yChannelPageStep : yChannelStep;
        if ((deltaX > 0 && direction() === 'ltr') || (deltaX < 0 && direction() === 'rtl')) {
          incrementX(deltaXValue);
        } else if ((deltaX < 0 && direction() === 'ltr') || (deltaX > 0 && direction() === 'rtl')) {
          decrementX(deltaXValue);
        } else if (deltaY > 0) {
          decrementY(deltaYValue);
        } else if (deltaY < 0) {
          incrementY(deltaYValue);
        }
        setValueChangedViaKeyboard(valueChanged);
        // set the focused input based on which axis has the greater delta
        focusChannel(valueChanged && Math.abs(deltaY) > Math.abs(deltaX) ? 'y' : 'x');
      } else {
        currentPosition.x += ((direction() === 'rtl' ? -1 : 1) * deltaX) / width;
        currentPosition.y += deltaY / height;
        setColorFromPoint(currentPosition.x, currentPosition.y);
      }
    },
    onMoveEnd() {
      isOnColorArea = false;
      state.setDragging(false);
      let input = focusedInputRequest === 'x' ? inputXRef : inputYRef;
      focusInput(input);
    }
  };
  let {moveProps: movePropsThumb} = useMove(moveHandler);

  let {focusWithinProps} = useFocusWithin({
    onFocusWithinChange: (focusWithin: boolean) => {
      if (!focusWithin) {
        setValueChangedViaKeyboard(false);
        setValueChangedViaInputChangeEvent(false);
      }
    }
  });

  let currentPointer: number | null | undefined;
  let isOnColorArea = false;
  let {moveProps: movePropsContainer} = useMove({
    onMoveStart() {
      if (isOnColorArea) {
        moveHandler.onMoveStart();
      }
    },
    onMove(e) {
      if (isOnColorArea) {
        moveHandler.onMove(e);
      }
    },
    onMoveEnd() {
      if (isOnColorArea) {
        moveHandler.onMoveEnd();
      }
    }
  });

  let onThumbDown = (id: number | null | undefined) => {
    if (!state.isDragging) {
      currentPointer = id;
      setValueChangedViaKeyboard(false);
      focusInput();
      state.setDragging(true);
      if (typeof PointerEvent !== 'undefined') {
        addGlobalListener(window, 'pointerup', onThumbUp, false);
      } else {
        addGlobalListener(window, 'mouseup', onThumbUp, false);
        addGlobalListener(window, 'touchend', onThumbUp, false);
      }
    }
  };

  let onThumbUp = (e: PointerEvent | MouseEvent | TouchEvent) => {
    let id = 'pointerId' in e ? e.pointerId : 'changedTouches' in e ? e.changedTouches[0]?.identifier : undefined;
    if (id === currentPointer) {
      setValueChangedViaKeyboard(false);
      focusInput();
      state.setDragging(false);
      currentPointer = undefined;
      isOnColorArea = false;

      if (typeof PointerEvent !== 'undefined') {
        removeGlobalListener(window, 'pointerup', onThumbUp, false);
      } else {
        removeGlobalListener(window, 'mouseup', onThumbUp, false);
        removeGlobalListener(window, 'touchend', onThumbUp, false);
      }
    }
  };

  let onColorAreaDown = (
    colorArea: Element,
    id: number | null | undefined,
    clientX: number,
    clientY: number
  ) => {
    let rect = colorArea.getBoundingClientRect();
    let {width, height} = rect;
    let x = (clientX - rect.x) / width;
    let y = (clientY - rect.y) / height;
    if (direction() === 'rtl') {
      x = 1 - x;
    }
    if (
      x >= 0 &&
      x <= 1 &&
      y >= 0 &&
      y <= 1 &&
      !state.isDragging &&
      currentPointer === undefined
    ) {
      isOnColorArea = true;
      setValueChangedViaKeyboard(false);
      currentPointer = id;
      state.setColorFromPoint(x, y);

      focusInput();
      state.setDragging(true);

      if (typeof PointerEvent !== 'undefined') {
        addGlobalListener(window, 'pointerup', onColorAreaUp, false);
      } else {
        addGlobalListener(window, 'mouseup', onColorAreaUp, false);
        addGlobalListener(window, 'touchend', onColorAreaUp, false);
      }
    }
  };

  let onColorAreaUp = (e: PointerEvent | MouseEvent | TouchEvent) => {
    let id = 'pointerId' in e ? e.pointerId : 'changedTouches' in e ? e.changedTouches[0]?.identifier : undefined;
    if (isOnColorArea && id === currentPointer) {
      isOnColorArea = false;
      setValueChangedViaKeyboard(false);
      currentPointer = undefined;
      state.setDragging(false);
      focusInput();

      if (typeof PointerEvent !== 'undefined') {
        removeGlobalListener(window, 'pointerup', onColorAreaUp, false);
      } else {
        removeGlobalListener(window, 'mouseup', onColorAreaUp, false);
        removeGlobalListener(window, 'touchend', onColorAreaUp, false);
      }
    }
  };

  let colorAreaInteractions = merge(() => isDisabled()
    ? {}
    : mergeProps(
        // oxlint-disable-next-line react/react-compiler
        {
          ...(typeof PointerEvent !== 'undefined'
            ? {
                 onPointerDown: (e: PointerEvent & {currentTarget: Element}) => {
                  if (
                    e.pointerType === 'mouse' &&
                    (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)
                  ) {
                    return;
                  }
                  onColorAreaDown(e.currentTarget, e.pointerId, e.clientX, e.clientY);
                }
              }
            : {
                 onMouseDown: (e: MouseEvent & {currentTarget: Element}) => {
                  if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
                    return;
                  }
                  onColorAreaDown(e.currentTarget, undefined, e.clientX, e.clientY);
                },
                 onTouchStart: (e: TouchEvent & {currentTarget: Element}) => {
                  onColorAreaDown(
                    e.currentTarget,
                    e.changedTouches[0].identifier,
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                  );
                }
              })
        },
        movePropsContainer
      ));

  let thumbInteractions = merge(() => isDisabled()
    ? {}
    : mergeProps(
        // oxlint-disable-next-line react/react-compiler
        {
          ...(typeof PointerEvent !== 'undefined'
            ? {
                 onPointerDown: (e: PointerEvent) => {
                  if (
                    e.pointerType === 'mouse' &&
                    (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)
                  ) {
                    return;
                  }
                  onThumbDown(e.pointerId);
                }
              }
            : {
                 onMouseDown: (e: MouseEvent) => {
                  if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
                    return;
                  }
                  onThumbDown(undefined);
                },
                 onTouchStart: (e: TouchEvent) => {
                  onThumbDown(e.changedTouches[0].identifier);
                }
              })
        },
        focusWithinProps,
        keyboardProps,
        movePropsThumb
       ));

  let {focusProps: xInputFocusProps} = useFocus({
    onFocus: () => {
      focusChannel('x');
    }
  });

  let {focusProps: yInputFocusProps} = useFocus({
    onFocus: () => {
      focusChannel('y');
    }
  });

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValueChangedViaInputChangeEvent(true);
    if (target === inputXRef.current) {
      state.setXValue(parseFloat(target.value));
    } else if (target === inputYRef.current) {
      state.setYValue(parseFloat(target.value));
    }
  };

  let isMobile = isIOS() || isAndroid();

  const getAriaValueTextForChannel = (channel: ColorChannel) => {
      let value = state.getDisplayColor();
      const isAfterInput = valueChangedViaInputChangeEvent() || valueChangedViaKeyboard();
      return `${
        isAfterInput
          ? stringFormatter.format('colorNameAndValue', {
               name: value.getChannelName(channel, locale()),
               value: value.formatChannelValue(channel, locale())
            })
          : [
              stringFormatter.format('colorNameAndValue', {
                 name: value.getChannelName(channel, locale()),
                 value: value.formatChannelValue(channel, locale())
              }),
              stringFormatter.format('colorNameAndValue', {
                 name: value.getChannelName(channel === yChannel() ? xChannel() : yChannel(), locale()),
                 value: value.formatChannelValue(channel === yChannel() ? xChannel() : yChannel(), locale())
              }),
              stringFormatter.format('colorNameAndValue', {
                 name: value.getChannelName(zChannel(), locale()),
                 value: value.formatChannelValue(zChannel(), locale())
              })
            ].join(', ')
       }, ${value.getColorName(locale())}`;
     };

  let colorPickerLabel = () => stringFormatter.format('colorPicker');

  let inputLabellingOptions = merge(props, {get 'aria-label'() {
    return props['aria-label']
      ? stringFormatter.format('colorInputLabel', {
          label: props['aria-label'],
          channelLabel: colorPickerLabel()
        })
      : colorPickerLabel();
  }});
  let xInputLabellingProps = useLabels(inputLabellingOptions);

  let yInputLabellingProps = useLabels(inputLabellingOptions);

  let colorAreaLabellingProps = useLabels(
    merge(props, {get 'aria-label'() {
      return props['aria-label'] ? `${props['aria-label']}, ${colorPickerLabel()}`
        : isMobile && !props['aria-labelledby'] ? colorPickerLabel() : undefined;
    }})
  );

  let ariaRoleDescription = () => stringFormatter.format('twoDimensionalSlider');

  let {visuallyHiddenProps} = useVisuallyHidden({
    style: {
      opacity: '0.0001',
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    }
  });

  let {colorAreaStyleProps, thumbStyleProps} = useColorAreaGradient({
    get direction() { return direction(); },
    state,
    get xChannel() { return xChannel(); },
    get yChannel() { return yChannel(); },
    get zChannel() { return zChannel(); }
  });

  return {
    colorAreaProps: mergeProps(colorAreaLabellingProps, colorAreaInteractions, colorAreaStyleProps, {
      role: 'group' as const
    }),
    thumbProps: mergeProps(thumbInteractions, thumbStyleProps, {
      role: 'presentation' as const
    }),
    xInputProps: mergeProps(xInputLabellingProps, visuallyHiddenProps, xInputFocusProps, {
      type: 'range',
      get min() { return state.value.getChannelRange(xChannel()).minValue; },
      get max() { return state.value.getChannelRange(xChannel()).maxValue; },
      get step() { return state.xChannelStep; },
      get 'aria-roledescription'() { return ariaRoleDescription(); },
      get 'aria-valuetext'() { return getAriaValueTextForChannel(xChannel()); },
      'aria-orientation': 'horizontal',
      get 'aria-describedby'() { return props['aria-describedby']; },
      get 'aria-details'() { return props['aria-details']; },
      get disabled() { return isDisabled(); },
      get value() { return state.value.getChannelValue(xChannel()); },
      get name() { return props.xName; },
      get form() { return props.form; },
      get tabIndex() { return isMobile || !focusedInput() || focusedInput() === 'x' ? undefined : -1; },
      /*
        So that only a single "2d slider" control shows up when listing form elements for screen readers,
        add aria-hidden="true" to the unfocused control when the value has not changed via the keyboard,
        but remove aria-hidden to reveal the input for each channel when the value has changed with the keyboard.
      */
      get 'aria-hidden'() { return isMobile || !focusedInput() || focusedInput() === 'x' || valueChangedViaKeyboard()
          ? undefined
          : 'true' as const; },
      onChange,
      onInput: onChange
    }) as ColorAreaAria['xInputProps'],
    yInputProps: mergeProps(yInputLabellingProps, visuallyHiddenProps, yInputFocusProps, {
      type: 'range',
      get min() { return state.value.getChannelRange(yChannel()).minValue; },
      get max() { return state.value.getChannelRange(yChannel()).maxValue; },
      get step() { return state.yChannelStep; },
      get 'aria-roledescription'() { return ariaRoleDescription(); },
      get 'aria-valuetext'() { return getAriaValueTextForChannel(yChannel()); },
      'aria-orientation': 'vertical',
      get 'aria-describedby'() { return props['aria-describedby']; },
      get 'aria-details'() { return props['aria-details']; },
      get disabled() { return isDisabled(); },
      get value() { return state.value.getChannelValue(yChannel()); },
      get name() { return props.yName; },
      get form() { return props.form; },
      get tabIndex() { return isMobile || focusedInput() === 'y' ? undefined : -1; },
      /*
        So that only a single "2d slider" control shows up when listing form elements for screen readers,
        add aria-hidden="true" to the unfocused input when the value has not changed via the keyboard,
        but remove aria-hidden to reveal the input for each channel when the value has changed with the keyboard.
      */
      get 'aria-hidden'() {
        return isMobile || focusedInput() === 'y' || valueChangedViaKeyboard() ? undefined : 'true' as const;
      },
      onChange,
      onInput: onChange
    }) as ColorAreaAria['yInputProps']
  };
}
