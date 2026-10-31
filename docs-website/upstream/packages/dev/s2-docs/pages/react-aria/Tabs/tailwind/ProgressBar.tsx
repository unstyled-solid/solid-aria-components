import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps } from
'solid-aria-components';
import { Label } from './Field';
import { composeTailwindRenderProps } from './utils';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar(_props: ProgressBarProps) {const props = omit(_props, "label");
  return (
    <AriaProgressBar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-2 font-sans w-64 max-w-full'
      )}>
      {(_props2) =>
      <>
          <div class="flex justify-between gap-2">
            <Label>{_props.label}</Label>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">{_props2.valueText}</span>
          </div>
          <div class="max-w-full h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 outline outline-1 -outline-offset-1 outline-transparent relative overflow-hidden">
            <div
            class={`absolute top-0 h-full rounded-full bg-blue-500 forced-colors:bg-[Highlight] ${_props2.isIndeterminate ? 'left-full animate-in duration-1000 slide-in-from-left-[20rem] repeat-infinite ease-out' : 'left-0'}`}
            style={{ "width": (_props2.isIndeterminate ? 40 : _props2.percentage) + '%' }} />
          
          </div>
        </>
      }
    </AriaProgressBar>);

}
