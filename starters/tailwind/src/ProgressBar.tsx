'use client';
import {omit} from 'solid-js';
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps
} from 'react-aria-components/ProgressBar';
import {Label} from './Field';
import {composeTailwindRenderProps} from './utils';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <AriaProgressBar
      {...omit(props, 'label')}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-2 font-sans w-64 max-w-full'
      )}>
      {state => (
        <>
          <div class="flex justify-between gap-2">
            <Label>{props.label}</Label>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">{state.valueText}</span>
          </div>
          <div class="max-w-full h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 outline outline-1 -outline-offset-1 outline-transparent relative overflow-hidden">
            <div
              class={`absolute top-0 h-full rounded-full bg-blue-500 forced-colors:bg-[Highlight] ${state.isIndeterminate ? 'left-full animate-in duration-1000 slide-in-from-left-[20rem] repeat-infinite ease-out' : 'left-0'}`}
              style={{width: (state.isIndeterminate ? 40 : state.percentage) + '%'}}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
