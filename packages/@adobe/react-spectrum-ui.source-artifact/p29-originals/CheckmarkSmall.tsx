import {CheckmarkSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/CheckmarkSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function CheckmarkSmall(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
