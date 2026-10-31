'use client';
import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps
} from 'solid-aria-components';
import './ColorSwatch.css';

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      style={(live0) => ({
        background: `linear-gradient(${live0.color}, ${live0.color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
      })}
    />
  );
}
