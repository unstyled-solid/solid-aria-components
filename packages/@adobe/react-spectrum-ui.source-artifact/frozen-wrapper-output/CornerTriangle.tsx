import {CornerTriangle as IconComponent} from '@adobe/react-spectrum-ui/dist/CornerTriangle.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import React, {JSX} from 'react';

export default function CornerTriangle(props: UIIconPropsWithoutChildren): JSX.Element {
  return <UIIcon {...props}><IconComponent /></UIIcon>;
}
