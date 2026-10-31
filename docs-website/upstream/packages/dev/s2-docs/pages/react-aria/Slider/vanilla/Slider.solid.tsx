import {omit, Repeat} from 'solid-js';
'use client';
import {
  Slider as AriaSlider,
  SliderOutput,
  type SliderProps as AriaSliderProps,
  SliderThumb,
  SliderTrack,
  SliderFill
} from 'solid-aria-components';
import {Label} from './Form.solid';
import './Slider.css';

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
    <AriaSlider {...omit(live0, "label","thumbLabels","fillOffset")}>
      {live0.label && <Label>{live0.label}</Label>}
      <SliderOutput />
      <SliderTrack>
        {(live1) => (
          <>
            <div class="track inset" data-disabled={live1.isDisabled || undefined}>
              <SliderFill offset={live0.fillOffset} />
            </div>
            <Repeat count={live1.state.values.length}>{i => (
              <SliderThumb
               
                index={i}
                aria-label={live0.thumbLabels?.[i]}
                className="react-aria-SliderThumb indicator"
              />
            )}</Repeat>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
