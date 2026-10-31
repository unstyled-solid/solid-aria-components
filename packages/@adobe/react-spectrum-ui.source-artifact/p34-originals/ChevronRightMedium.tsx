import {ChevronRightMedium as IconComponent} from '@adobe/react-spectrum-ui/dist/ChevronRightMedium.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function ChevronRightMedium(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
