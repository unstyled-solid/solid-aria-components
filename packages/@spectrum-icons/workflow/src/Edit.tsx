import {A4uEdit as IconComponent} from '@adobe/react-spectrum-workflow/dist/Edit.js';
import {Icon} from '@adobe/react-spectrum/Icon';
import type {IconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/Icon';
import type {JSX} from '@solidjs/web';

export default function Edit(props: IconPropsWithoutChildren): JSX.Element {
  return <Icon {...props}>{svgProps => <IconComponent {...svgProps} />}</Icon>;
}
