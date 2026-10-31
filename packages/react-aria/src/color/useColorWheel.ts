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

import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  InputDOMProps,
  MoveMoveEvent,
  RefObject
} from '@react-types/shared';
import {ColorWheelProps, ColorWheelState} from 'react-stately/useColorWheelState';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {mergeProps} from '../utils/mergeProps';
import {merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useFormReset} from '../utils/useFormReset';
import {useGlobalListeners} from '../utils/useGlobalListeners';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLabels} from '../utils/useLabels';
import {useLocale} from '../i18n/I18nProvider';
import {useMove} from '../interactions/useMove';
import {useVisuallyHidden} from '../visually-hidden/VisuallyHidden';

export interface AriaColorWheelProps
  extends ColorWheelProps, InputDOMProps, DOMProps, AriaLabelingProps {
  'aria-errormessage'?: string;
}

export interface AriaColorWheelOptions extends AriaColorWheelProps {
  /** The outer radius of the color wheel. */
  outerRadius: number;
  /** The inner radius of the color wheel. */
  innerRadius: number;
}

export interface ColorWheelAria {
  /** Props for the track element. */
  trackProps: DOMAttributes;
  /** Props for the thumb element. */
  thumbProps: DOMAttributes;
  /** Props for the visually hidden range input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Provides the behavior and accessibility implementation for a color wheel component.
 * Color wheels allow users to adjust the hue of an HSL or HSB color value on a circular track.
 */
export function useColorWheel(
  props: AriaColorWheelOptions,
  state: ColorWheelState,
  inputRef: RefObject<HTMLInputElement | null>
): ColorWheelAria {
  let isDisabled = () => props.isDisabled;
  let innerRadius = () => props.innerRadius;
  let outerRadius = () => props.outerRadius;

  let {addGlobalListener, removeGlobalListener} = useGlobalListeners();

  let thumbRadius = () => (innerRadius() + outerRadius()) / 2;

  let focusInput = () => {
    if (inputRef.current) {
      focusWithoutScrolling(inputRef.current);
    }
  };

  useFormReset(inputRef, () => state.defaultValue, value => state.setValue(value));

  let currentPosition: {current: {x: number; y: number} | null} = {current: null};

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      PageUp: () => {
        state.setDragging(true);
        state.increment(state.pageStep);
        state.setDragging(false);
      },
      PageDown: () => {
        state.setDragging(true);
        state.decrement(state.pageStep);
        state.setDragging(false);
      }
    },
    allowRepeats: true
  });

  let moveHandler = {
    onMoveStart() {
      currentPosition.current = null;
      state.setDragging(true);
    },
    onMove({deltaX, deltaY, pointerType, shiftKey}: MoveMoveEvent) {
      if (currentPosition.current == null) {
        currentPosition.current = state.getThumbPosition(thumbRadius());
      }
      currentPosition.current.x += deltaX;
      currentPosition.current.y += deltaY;
      if (pointerType === 'keyboard') {
        if (deltaX > 0 || deltaY < 0) {
          state.increment(shiftKey ? state.pageStep : state.step);
        } else if (deltaX < 0 || deltaY > 0) {
          state.decrement(shiftKey ? state.pageStep : state.step);
        }
      } else {
        state.setHueFromPoint(currentPosition.current.x, currentPosition.current.y, thumbRadius());
      }
    },
    onMoveEnd() {
      isOnTrack.current = false;
      state.setDragging(false);
      focusInput();
    }
  };
  let {moveProps: movePropsThumb} = useMove(moveHandler);

  let currentPointer: {current: number | null | undefined} = {current: undefined};
  let isOnTrack = {current: false};
  let {moveProps: movePropsContainer} = useMove({
    onMoveStart() {
      if (isOnTrack.current) {
        moveHandler.onMoveStart();
      }
    },
    onMove(e) {
      if (isOnTrack.current) {
        moveHandler.onMove(e);
      }
    },
    onMoveEnd() {
      if (isOnTrack.current) {
        moveHandler.onMoveEnd();
      }
    }
  });

  let onThumbDown = (id: number | null | undefined) => {
    if (!state.isDragging) {
      currentPointer.current = id;
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
    if (id === currentPointer.current) {
      focusInput();
      state.setDragging(false);
      currentPointer.current = undefined;
      isOnTrack.current = false;

      if (typeof PointerEvent !== 'undefined') {
        removeGlobalListener(window, 'pointerup', onThumbUp, false);
      } else {
        removeGlobalListener(window, 'mouseup', onThumbUp, false);
        removeGlobalListener(window, 'touchend', onThumbUp, false);
      }
    }
  };

  let onTrackDown = (
    track: Element,
    id: number | null | undefined,
    pageX: number,
    pageY: number
  ) => {
    let rect = track.getBoundingClientRect();
    let x = pageX - rect.x - rect.width / 2;
    let y = pageY - rect.y - rect.height / 2;
    let radius = Math.sqrt(x * x + y * y);
    if (
      innerRadius() < radius &&
      radius < outerRadius() &&
      !state.isDragging &&
      currentPointer.current === undefined
    ) {
      isOnTrack.current = true;
      currentPointer.current = id;
      state.setHueFromPoint(x, y, radius);

      focusInput();
      state.setDragging(true);

      if (typeof PointerEvent !== 'undefined') {
        addGlobalListener(window, 'pointerup', onTrackUp, false);
      } else {
        addGlobalListener(window, 'mouseup', onTrackUp, false);
        addGlobalListener(window, 'touchend', onTrackUp, false);
      }
    }
  };

  let onTrackUp = (e: PointerEvent | MouseEvent | TouchEvent) => {
    let id = 'pointerId' in e ? e.pointerId : 'changedTouches' in e ? e.changedTouches[0]?.identifier : undefined;
    if (isOnTrack.current && id === currentPointer.current) {
      isOnTrack.current = false;
      currentPointer.current = undefined;
      state.setDragging(false);
      focusInput();

      if (typeof PointerEvent !== 'undefined') {
        removeGlobalListener(window, 'pointerup', onTrackUp, false);
      } else {
        removeGlobalListener(window, 'mouseup', onTrackUp, false);
        removeGlobalListener(window, 'touchend', onTrackUp, false);
      }
    }
  };

  let trackInteractions = merge(() => isDisabled()
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
                  onTrackDown(e.currentTarget, e.pointerId, e.clientX, e.clientY);
                }
              }
            : {
                onMouseDown: (e: MouseEvent & {currentTarget: Element}) => {
                  if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
                    return;
                  }
                  onTrackDown(e.currentTarget, undefined, e.clientX, e.clientY);
                },
                onTouchStart: (e: TouchEvent & {currentTarget: Element}) => {
                  onTrackDown(
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
        keyboardProps,
        movePropsThumb
      ));

  // Provide a default aria-label if none is given
  let localeInfo = useLocale();

  let inputLabellingProps = useLabels(merge(props, {
    get 'aria-label'() {
      return props['aria-label'] == null && props['aria-labelledby'] == null
        ? state.value.getChannelName('hue', localeInfo.locale) : props['aria-label'];
    }
  }));

  let range = () => state.value.getChannelRange('hue');

  let forcedColorAdjustNoneStyle = {
    'forced-color-adjust': 'none'
  } as const;

  let {visuallyHiddenProps} = useVisuallyHidden({
    style: {
      opacity: '0.0001',
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    }
  });

  return {
    trackProps: mergeProps(trackInteractions, {
      get style() { return {
        position: 'relative',
        'touch-action': 'none',
        width: outerRadius() * 2 + 'px',
        height: outerRadius() * 2 + 'px',
        background: `
          conic-gradient(
            from 90deg,
            hsl(0, 100%, 50%),
            hsl(30, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(90, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(150, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(210, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(270, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(330, 100%, 50%),
            hsl(360, 100%, 50%)
          )
        `,
        'clip-path': `path(evenodd, "${circlePath(outerRadius(), outerRadius(), outerRadius())} ${circlePath(outerRadius(), outerRadius(), innerRadius())}")`,
        ...forcedColorAdjustNoneStyle
      } as JSX.CSSProperties; }
    }),
    thumbProps: mergeProps(thumbInteractions, {
      get style() {
        let {x, y} = state.getThumbPosition(thumbRadius());
        return {
        position: 'absolute',
        left: (outerRadius() + x).toFixed(3) + 'px',
        top: (outerRadius() + y).toFixed(3) + 'px',
        transform: 'translate(-50%, -50%)',
        'touch-action': 'none',
        ...forcedColorAdjustNoneStyle
      } as JSX.CSSProperties; }
    }),
    inputProps: mergeProps(inputLabellingProps, {
      type: 'range',
      get min() { return String(range().minValue); },
      get max() { return String(range().maxValue); },
      get step() { return String(range().step); },
      get 'aria-valuetext'() { return `${state.value.formatChannelValue('hue', localeInfo.locale)}, ${state.value.getHueName(localeInfo.locale)}`; },
      get disabled() { return isDisabled(); },
      get value() { return `${state.value.getChannelValue('hue')}`; },
      get name() { return props.name; },
      get form() { return props.form; },
      onChange: (e: Event) => {
        state.setHue(parseFloat((getEventTarget(e) as HTMLInputElement).value));
      },
      onInput: (e: Event) => {
        state.setHue(parseFloat((getEventTarget(e) as HTMLInputElement).value));
      },
      get style() { return visuallyHiddenProps.style; },
      get 'aria-errormessage'() { return props['aria-errormessage']; },
      get 'aria-describedby'() { return props['aria-describedby']; },
      get 'aria-details'() { return props['aria-details']; }
    })
  };
}

// Creates an SVG path string for a circle.
function circlePath(cx: number, cy: number, r: number) {
  return `M ${cx}, ${cy} m ${-r}, 0 a ${r}, ${r}, 0, 1, 0, ${r * 2}, 0 a ${r}, ${r}, 0, 1, 0 ${-r * 2}, 0`;
}
