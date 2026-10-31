import {Asterisk as IconComponent} from '@adobe/react-spectrum-ui/dist/Asterisk.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function Asterisk(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
