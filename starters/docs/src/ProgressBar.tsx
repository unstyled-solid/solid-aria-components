'use client';
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps
} from 'react-aria-components/ProgressBar';
import {Label} from './Form';
import './ProgressBar.css';
import {omit} from 'solid-js';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string;
}

export function ProgressBar(props: ProgressBarProps) {
  let progressProps = omit(props, 'label');
  return (
    <AriaProgressBar {...progressProps}>
      {state => (
        <>
          <Label>{props.label}</Label>
          <span class="value">{state.valueText}</span>
          <div class="track inset">
            <div
              class="fill"
              style={{'--percent': (state.isIndeterminate ? 100 : state.percentage) + '%'}}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
