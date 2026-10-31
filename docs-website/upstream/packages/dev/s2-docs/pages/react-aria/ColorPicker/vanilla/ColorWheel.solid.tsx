'use client';
import { ColorWheel as AriaColorWheel, type ColorWheelProps as AriaColorWheelProps, ColorWheelTrack } from 'solid-aria-components';
import { ColorThumb } from './ColorThumb.solid';
import './ColorWheel.css';
export interface ColorWheelProps extends Omit<AriaColorWheelProps, 'outerRadius' | 'innerRadius'> {
}
export function ColorWheel(props: ColorWheelProps) {
    return (<AriaColorWheel {...props} outerRadius={100} innerRadius={74}>
      <ColorWheelTrack />
      <ColorThumb />
    </AriaColorWheel>);
}
