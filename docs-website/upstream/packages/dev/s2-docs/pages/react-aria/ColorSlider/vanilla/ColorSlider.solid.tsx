import {omit} from 'solid-js';
'use client';
import {
  ColorSlider as AriaColorSlider,
  type ColorSliderProps as AriaColorSliderProps,
  SliderOutput,
  SliderTrack
} from 'solid-aria-components';
import {Label} from './Form.solid';
import {ColorThumb} from './ColorThumb.solid';
import './ColorSlider.css';

export interface ColorSliderProps extends AriaColorSliderProps {
  label?: string;
}

export function ColorSlider(live0: ColorSliderProps) {
  return (
    <AriaColorSlider {...omit(live0, "label")}>
      <Label>{live0.label}</Label>
      <SliderOutput />
      <SliderTrack
        style={(live1) => ({
          background: `${live1.defaultStyle.background},
            repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
        })}>
        <ColorThumb />
      </SliderTrack>
    </AriaColorSlider>
  );
}
