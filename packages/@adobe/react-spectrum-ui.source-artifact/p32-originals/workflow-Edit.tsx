import {A4uEdit as IconComponent} from '@adobe/react-spectrum-workflow/dist/Edit.js';
import {Icon} from '@adobe/react-spectrum/Icon';
import type {IconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/Icon';
import React, {JSX} from 'react';

export default function Edit(props: IconPropsWithoutChildren): JSX.Element {
  return <Icon {...props}><IconComponent /></Icon>;
}
