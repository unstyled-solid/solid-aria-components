'use client';
import { ColorArea as AriaColorArea, type ColorAreaProps } from 'solid-aria-components';
import { ColorThumb } from './ColorThumb.solid';
import './ColorArea.css';
export function ColorArea(props: ColorAreaProps) {
    return (<AriaColorArea {...props}>
      <ColorThumb />
    </AriaColorArea>);
}
