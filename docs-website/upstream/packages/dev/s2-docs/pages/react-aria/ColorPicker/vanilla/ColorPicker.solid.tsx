import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button } from 'solid-aria-components';
import { ColorPicker as AriaColorPicker, type ColorPickerProps as AriaColorPickerProps } from 'solid-aria-components';
import { DialogTrigger } from './Dialog.solid';
import { ColorSwatch } from './ColorSwatch.solid';
import { ColorSlider } from './ColorSlider.solid';
import { ColorArea } from './ColorArea.solid';
import { ColorField } from './ColorField.solid';
import { Popover } from './Popover.solid';
import './ColorPicker.css';
export interface ColorPickerProps extends Omit<AriaColorPickerProps, 'children'> {
    label?: string;
    children?: JSX.Element;
}
export function ColorPicker(live0: ColorPickerProps) {
    return (<AriaColorPicker {...omit(live0, "label", "children")}>{() => <>
      <DialogTrigger>
        <Button className="color-picker">
          <ColorSwatch />
          <span>{live0.label}</span>
        </Button>
        <Popover hideArrow placement="bottom start" className="color-picker-dialog">
          {live0.children || (<>
              <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness"/>
              <ColorSlider colorSpace="hsb" channel="hue"/>
              <ColorField label="Hex"/>
            </>)}
        </Popover>
      </DialogTrigger>
    </>}</AriaColorPicker>);
}
