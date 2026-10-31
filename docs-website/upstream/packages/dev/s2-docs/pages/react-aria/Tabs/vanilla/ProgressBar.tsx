import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps } from
'solid-aria-components';
import { Label } from './Form';
import './ProgressBar.css';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar(_props: ProgressBarProps) {const props = omit(_props, "label");
  return (
    <AriaProgressBar {...props}>
      {(_props2) =>
      <>
          <Label>{_props.label}</Label>
          <span class="value">{_props2.valueText}</span>
          <div class="track inset">
            <div
            class="fill"
            style={{ '--percent': (_props2.isIndeterminate ? 100 : _props2.percentage) + '%' } as any} />
          
          </div>
        </>
      }
    </AriaProgressBar>);

}
