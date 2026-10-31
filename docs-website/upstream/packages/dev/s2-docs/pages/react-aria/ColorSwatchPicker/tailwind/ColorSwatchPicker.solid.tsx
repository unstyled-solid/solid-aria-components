import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { ColorSwatchPicker as AriaColorSwatchPicker, ColorSwatchPickerItem as AriaColorSwatchPickerItem, type ColorSwatchPickerItemProps, type ColorSwatchPickerProps } from 'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { ColorSwatch } from './ColorSwatch.solid';
import { focusRing } from './utils.solid';
import { tv } from 'tailwind-variants';
const pickerStyles = tv({
    base: 'flex gap-1',
    variants: {
        layout: {
            stack: 'flex-col',
            grid: 'flex-wrap'
        }
    }
});
export function ColorSwatchPicker(live0: Omit<ColorSwatchPickerProps, 'layout'>) {
    return (<AriaColorSwatchPicker {...omit(live0, "children")} className={composeRenderProps(omit(live0, "children").className, (className, renderProps) => pickerStyles({ ...renderProps, className }))}>
      {live0.children}
    </AriaColorSwatchPicker>);
}
const itemStyles = tv({
    extend: focusRing,
    base: 'relative rounded-xs [-webkit-tap-highlight-color:transparent]'
});
export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
    return (<AriaColorSwatchPickerItem {...props} className={itemStyles}>
{(live1) => (<>
          <ColorSwatch />
          {live1.isSelected && (<div class="absolute top-0 left-0 w-full h-full box-border border border-2 border-black dark:border-white outline outline-2 outline-white dark:outline-black -outline-offset-4 rounded-md forced-color-adjust-none"/>)}
        </>)}
    </AriaColorSwatchPickerItem>);
}
