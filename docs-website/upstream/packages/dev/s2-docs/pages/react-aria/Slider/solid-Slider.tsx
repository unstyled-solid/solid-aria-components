'use client';
import {
  Slider as AriaSlider,
  SliderOutput,
  type SliderProps as AriaSliderProps,
  SliderThumb,
  SliderTrack,
  SliderFill,
  Label
} from 'solid-aria-components';
import {For, omit} from 'solid-js';
import '../../../../../../starters/docs/src/Slider.css';

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

export function Slider<T extends number | number[]>(props: SliderProps<T>) {
  return (
    <AriaSlider {...omit(props, 'label', 'thumbLabels', 'fillOffset')}>
      {props.label && <Label>{props.label}</Label>}
      <SliderOutput />
      <SliderTrack>
        {({state, isDisabled}) => (
          <>
            <div class="track inset" data-disabled={isDisabled || undefined}>
                <SliderFill offset={props.fillOffset} />
            </div>
            <For each={state.values}>{(_, i) => (
              <SliderThumb
                index={i()}
                aria-label={props.thumbLabels?.[i()]}
                className="react-aria-SliderThumb indicator"
              />
            )}</For>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
