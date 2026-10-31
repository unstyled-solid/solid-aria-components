import {InfoSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/InfoSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import React, {JSX} from 'react';

const ExpressIcon = props => <svg viewBox="0 0 14 14" {...props}><path d="M7 1a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6m.867 8.677a.868.868 0 0 1-1.734 0V7a.868.868 0 0 1 1.734 0zM7 5.4c-.662 0-1.2-.538-1.2-1.2S6.338 3 7 3s1.2.539 1.2 1.2S7.662 5.4 7 5.4" /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function InfoSmall(props: UIIconPropsWithoutChildren): JSX.Element {
  let express = false;
  try {
    express = (useProvider() as any).theme.global.express;
  } catch {
    // ignore
  }
  return <UIIcon {...props}>{express ? <ExpressIcon /> : <IconComponent />}</UIIcon>;
}
