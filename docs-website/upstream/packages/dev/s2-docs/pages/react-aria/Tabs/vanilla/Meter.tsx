import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Meter as AriaMeter, type MeterProps as AriaMeterProps } from 'solid-aria-components';
import { Label } from './Form';
import './Meter.css';

export interface MeterProps extends AriaMeterProps {
  label?: string;
}

export function Meter(_props: MeterProps) {const props = omit(_props, "label");
  return (
    <AriaMeter {...props}>
      {(_props2) =>
      <>
          <Label>{_props.label}</Label>
          <span class="value">{_props2.valueText}</span>
          <div class="track inset">
            <div
            class="fill"
            style={
            {
              width: _props2.percentage + '%',
              '--fill-color':
              _props2.percentage < 70 ?
              'var(--green)' :
              _props2.percentage < 90 ?
              'var(--orange)' :
              'var(--red)'
            } as any
            } />
          
          </div>
        </>
      }
    </AriaMeter>);

}
