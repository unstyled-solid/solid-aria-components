import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { AlertTriangle } from '../icons';
import { Meter as AriaMeter, type MeterProps as AriaMeterProps } from 'solid-aria-components';
import { Label } from './Field';
import { composeTailwindRenderProps } from './utils';

export interface MeterProps extends AriaMeterProps {
  label?: string;
}

export function Meter(_props: MeterProps) {const props = omit(_props, "label");
  return (
    <AriaMeter
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-2 font-sans max-w-full'
      )}>
      {(_props2) =>
      <>
          <div class="flex justify-between gap-2">
            <Label>{_props.label}</Label>
            <span
            class={`text-sm ${_props2.percentage >= 80 ? 'text-red-600 dark:text-red-500' : 'text-neutral-600 dark:text-neutral-400'}`}>
              {_props2.percentage >= 80 &&
            <AlertTriangle
              aria-label="Alert"
              className="inline-block w-4 h-4 align-text-bottom" />

            }
              {' ' + _props2.valueText}
            </span>
          </div>
          <div class="w-64 max-w-full h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 outline outline-1 -outline-offset-1 outline-transparent relative">
            <div
            class={`absolute top-0 left-0 h-full rounded-full ${getColor(_props2.percentage)} forced-colors:bg-[Highlight]`}
            style={{ "width": _props2.percentage + '%' }} />
          
          </div>
        </>
      }
    </AriaMeter>);

}

function getColor(percentage: number) {
  if (percentage < 70) {
    return 'bg-green-600';
  }

  if (percentage < 80) {
    return 'bg-orange-500';
  }

  return 'bg-red-600';
}
