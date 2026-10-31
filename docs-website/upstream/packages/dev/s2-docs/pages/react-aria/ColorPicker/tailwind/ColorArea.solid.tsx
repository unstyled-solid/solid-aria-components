'use client';
import { ColorArea as AriaColorArea, type ColorAreaProps as AriaColorAreaProps } from 'solid-aria-components';
import { composeTailwindRenderProps } from './utils';
import { ColorThumb } from './ColorThumb.solid';
export interface ColorAreaProps extends AriaColorAreaProps {
}
export function ColorArea(props: ColorAreaProps) {
    return (<AriaColorArea {...props} className={composeTailwindRenderProps(props.className, 'w-full max-w-56 aspect-square rounded-lg bg-neutral-300 dark:bg-neutral-800 forced-colors:bg-[GrayText]')} style={(live0) => ({
            ...live0.defaultStyle,
            "background": live0.isDisabled ? undefined : live0.defaultStyle.background
        })}>
      <ColorThumb />
    </AriaColorArea>);
}
