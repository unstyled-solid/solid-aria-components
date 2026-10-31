import {ChevronLeftMedium as IconComponent} from '@adobe/react-spectrum-ui/dist/ChevronLeftMedium.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function ChevronLeftMedium(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
