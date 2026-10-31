import {ArrowDownSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/ArrowDownSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import type {JSX} from '@solidjs/web';

export default function ArrowDownSmall(props: UIIconPropsWithoutChildren): JSX.Element {
  let renderIcon = Object.assign((iconProps: JSX.SvgSVGAttributes<SVGSVGElement>) => <IconComponent {...iconProps} />, {displayName: IconComponent.displayName});
  return <UIIcon {...props}>{renderIcon}</UIIcon>;
}
