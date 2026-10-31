import {A4uShowMenu as IconComponent} from '@adobe/react-spectrum-workflow/dist/ShowMenu.js';
import {Icon} from '@adobe/react-spectrum/Icon';
import type {IconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/Icon';
import type {JSX} from '@solidjs/web';

export default function ShowMenu(props: IconPropsWithoutChildren): JSX.Element {
  return <Icon {...props}>{svgProps => <IconComponent {...svgProps} />}</Icon>;
}
