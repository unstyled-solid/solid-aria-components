import {ChevronRightSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/ChevronRightSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import type {JSX} from '@solidjs/web';

const ExpressIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => <svg viewBox="0 0 18 18" {...props}><path d="M7.707 4.293a1 1 0 1 0-1.414 1.414L9.586 9l-3.293 3.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414z" /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function ChevronRightSmall(props: UIIconPropsWithoutChildren): JSX.Element {
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
