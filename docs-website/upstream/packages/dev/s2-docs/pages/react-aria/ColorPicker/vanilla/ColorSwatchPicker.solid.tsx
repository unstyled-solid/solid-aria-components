import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { ColorSwatchPicker as AriaColorSwatchPicker, ColorSwatchPickerItem as AriaColorSwatchPickerItem, type ColorSwatchPickerItemProps, type ColorSwatchPickerProps } from 'solid-aria-components';
import { ColorSwatch } from './ColorSwatch.solid';
import './ColorSwatchPicker.css';
export function ColorSwatchPicker(live0: ColorSwatchPickerProps) {
    return <AriaColorSwatchPicker {...omit(live0, "children")}>{live0.children}</AriaColorSwatchPicker>;
}
export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
    return (<AriaColorSwatchPickerItem {...props}>{() => <>
      <ColorSwatch />
    </>}</AriaColorSwatchPickerItem>);
}
