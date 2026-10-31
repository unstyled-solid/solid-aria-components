import {CrossLarge as IconComponent} from '@adobe/react-spectrum-ui/dist/CrossLarge.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function CrossLarge(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
