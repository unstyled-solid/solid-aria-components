import {FolderBreadcrumb as IconComponent} from '@adobe/react-spectrum-ui/dist/FolderBreadcrumb.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import type {JSX} from '@solidjs/web';

const ExpressIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => <svg viewBox="0 0 18 18" {...props}><circle cx={9} cy={9} r={2} /><circle cx={15} cy={9} r={2} /><circle cx={3} cy={9} r={2} /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function FolderBreadcrumb(props: UIIconPropsWithoutChildren): JSX.Element {
  let provider: ReturnType<typeof useProvider> | undefined;
  try {
    provider = useProvider();
  } catch {
    // ignore
  }
  let renderIcon = Object.assign((iconProps: JSX.SvgSVGAttributes<SVGSVGElement>) => {
    let express = false;
    try {
      express = !!provider!.theme!.global!.express;
    } catch {
      // Preserve the source's standard branch when provider/theme is absent.
    }
    return express ? <ExpressIcon {...iconProps} /> : <IconComponent {...iconProps} />;
  }, {displayName: IconComponent.displayName});
  return <UIIcon {...props}>{renderIcon}</UIIcon>;
}
