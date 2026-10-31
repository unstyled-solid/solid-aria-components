import {CheckmarkMedium as IconComponent} from '@adobe/react-spectrum-ui/dist/CheckmarkMedium.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import type {JSX} from '@solidjs/web';

export default function CheckmarkMedium(props: UIIconPropsWithoutChildren): JSX.Element {
  let renderIcon = Object.assign((iconProps: JSX.SvgSVGAttributes<SVGSVGElement>) => <IconComponent {...iconProps} />, {displayName: IconComponent.displayName});
  return <UIIcon {...props}>{renderIcon}</UIIcon>;
}
