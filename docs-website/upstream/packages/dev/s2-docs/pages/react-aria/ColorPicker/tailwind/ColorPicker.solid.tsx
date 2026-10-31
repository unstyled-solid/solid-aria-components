import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button } from 'solid-aria-components';
import { ColorPicker as AriaColorPicker, type ColorPickerProps as AriaColorPickerProps } from 'solid-aria-components';
import { DialogTrigger } from 'solid-aria-components';
import { ColorSwatch } from './ColorSwatch.solid';
import { ColorArea } from './ColorArea.solid';
import { ColorSlider } from './ColorSlider.solid';
import { ColorField } from './ColorField.solid';
import { Dialog } from './Dialog.solid';
import { Popover } from './Popover.solid';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils.solid';
const buttonStyles = tv({
    extend: focusRing,
    base: 'border-0 bg-transparent flex gap-2 items-center cursor-default rounded-xs font-sans text-sm text-neutral-800 dark:text-neutral-200 [-webkit-tap-highlight-color:transparent]'
});
export interface ColorPickerProps extends Omit<AriaColorPickerProps, 'children'> {
    label?: string;
    children?: JSX.Element;
}
export function ColorPicker(live0: ColorPickerProps) {
    return (<AriaColorPicker {...omit(live0, "label", "children")}>{() => <>
      <DialogTrigger>
        <Button className={buttonStyles}>
          <ColorSwatch />
          <span>{live0.label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-2">
            {live0.children || (<>
                <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness"/>
                <ColorSlider colorSpace="hsb" channel="hue"/>
                <ColorField label="Hex"/>
              </>)}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </>}</AriaColorPicker>);
}
