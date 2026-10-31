import {ChevronRightSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/ChevronRightSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import React, {JSX} from 'react';

const ExpressIcon = props => <svg viewBox="0 0 18 18" {...props}><path d="M7.707 4.293a1 1 0 1 0-1.414 1.414L9.586 9l-3.293 3.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414z" /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function ChevronRightSmall(props: UIIconPropsWithoutChildren): JSX.Element {
  let express = false;
  try {
    express = (useProvider() as any).theme.global.express;
  } catch {
    // ignore
  }
  return <UIIcon {...props}>{express ? <ExpressIcon /> : <IconComponent />}</UIIcon>;
}
