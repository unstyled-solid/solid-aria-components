import {FolderBreadcrumb as IconComponent} from '@adobe/react-spectrum-ui/dist/FolderBreadcrumb.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import React, {JSX} from 'react';

const ExpressIcon = props => <svg viewBox="0 0 18 18" {...props}><circle cx={9} cy={9} r={2} /><circle cx={15} cy={9} r={2} /><circle cx={3} cy={9} r={2} /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function FolderBreadcrumb(props: UIIconPropsWithoutChildren): JSX.Element {
  let express = false;
  try {
    express = (useProvider() as any).theme.global.express;
  } catch {
    // ignore
  }
  return <UIIcon {...props}>{express ? <ExpressIcon /> : <IconComponent />}</UIIcon>;
}
