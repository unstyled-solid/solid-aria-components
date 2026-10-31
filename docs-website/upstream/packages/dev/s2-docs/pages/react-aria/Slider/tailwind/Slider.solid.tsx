import {omit, Repeat} from 'solid-js';
'use client';

import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  SliderFill
} from 'solid-aria-components';
import {tv} from 'tailwind-variants';
import {Label} from './Field.solid';
import {composeTailwindRenderProps, focusRing} from './utils';

const trackStyles = tv({
  base: 'relative rounded-full',
  variants: {
    orientation: {
      horizontal: 'w-full h-[6px]',
      vertical: 'h-full w-[6px] ml-[50%] -translate-x-[50%]'
    },
    isDisabled: {
      false: 'bg-neutral-300 dark:bg-neutral-700 forced-colors:bg-[ButtonBorder]',
      true: 'bg-neutral-200 dark:bg-neutral-800 forced-colors:bg-[ButtonBorder]'
    }
  }
});

const fillStyles = tv({
  base: 'rounded-full',
  variants: {
    isDisabled: {
      false: 'bg-blue-500 forced-colors:bg-[Highlight]',
      true: 'bg-neutral-300 dark:bg-neutral-600 forced-colors:bg-[GrayText]'
    }
  }
});

const thumbStyles = tv({
  extend: focusRing,
  base: 'w-4.5 h-4.5 group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-300',
  variants: {
    isDragging: {
      true: 'bg-neutral-700 dark:bg-neutral-300 forced-colors:bg-[ButtonBorder]'
    },
    isDisabled: {
      true: 'border-neutral-300 dark:border-neutral-700 forced-colors:border-[GrayText]'
    }
  }
});

export interface SliderProps<T> extends AriaSliderProps<T> {
  /** Label for the slider. */
  label?: string;
  /** Aria labels for each thumb. */
  thumbLabels?: string[];
  /**
   * The offset from which to start the fill.
   *
   * @default 0
   */
  fillOffset?: number;
}

export function Slider<T extends number | number[]>(live0: SliderProps<T>) {
  return (
    <AriaSlider
      {...omit(live0, "label","thumbLabels","fillOffset")}
      className={composeTailwindRenderProps(
        live0.className,
        'font-sans orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)]'
      )}>
      <Label>{live0.label}</Label>
      <SliderOutput className="text-sm text-neutral-500 dark:text-neutral-400 orientation-vertical:hidden" />
      <SliderTrack className="group col-span-2 orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 flex items-center">
        {(live1) => (
          <>
            <div class={trackStyles(live1)}>
              <SliderFill offset={live0.fillOffset} className={fillStyles(live1)} />
            </div>
            <Repeat count={live1.state.values.length}>{i => (
              <SliderThumb
               
                index={i}
                aria-label={live0.thumbLabels?.[i]}
                className={thumbStyles}
              />
            )}</Repeat>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
