import {A4uCheckmark as IconComponent} from '@adobe/react-spectrum-workflow/dist/Checkmark.js';
import {Icon} from '@adobe/react-spectrum/Icon';
import type {IconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/Icon';
import React, {JSX} from 'react';

export default function Checkmark(props: IconPropsWithoutChildren): JSX.Element {
  return <Icon {...props}><IconComponent /></Icon>;
}
