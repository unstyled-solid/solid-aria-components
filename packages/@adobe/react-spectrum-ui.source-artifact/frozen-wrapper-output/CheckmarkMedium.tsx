import {CheckmarkMedium as IconComponent} from '@adobe/react-spectrum-ui/dist/CheckmarkMedium.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function CheckmarkMedium(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
