import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Group, type GroupProps } from 'solid-aria-components';
import { InputContext } from 'solid-aria-components';
import { Label } from './Form.solid';
import { createUniqueId } from 'solid-js';
import './InputGroup.css';
interface InputGroupProps extends GroupProps {
    label?: string;
}
export function InputGroup(props: InputGroupProps) {
    let id = createUniqueId();
    return (<div class="input-group">
      {props.label && (<Label elementType="span" id={id}>
          {props.label}
        </Label>)}
      <Group {...props} aria-labelledby={id} className="react-aria-Group inset">
        {live => {
          const inputContext = {get disabled() { return live.isDisabled; }};
          return (<InputContext value={inputContext}>
            {typeof props.children === 'function' ? props.children(live) : props.children}
          </InputContext>);
        }}
      </Group>
    </div>);
}
