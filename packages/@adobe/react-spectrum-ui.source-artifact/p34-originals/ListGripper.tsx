import {ListGripper as IconComponent} from '@adobe/react-spectrum-ui/dist/ListGripper.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function ListGripper(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
