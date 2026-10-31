import {SuccessSmall as IconComponent} from '@adobe/react-spectrum-ui/dist/SuccessSmall.js';
import {UIIcon, UIIconPropsWithoutChildren} from '@adobe/react-spectrum/private/icon/UIIcon';
import {useProvider} from '@adobe/react-spectrum/Provider';
import type {JSX} from '@solidjs/web';

const ExpressIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => <svg viewBox="0 0 14 14" {...props}><path d="M11.523 3.057a6 6 0 1 0-9.046 7.887 6 6 0 0 0 9.046-7.887m-1.166 2.275L7.075 9.696a.87.87 0 0 1-.617.342l-.076.004a.86.86 0 0 1-.592-.235L3.55 7.704c-.17-.159-.266-.373-.274-.604s.077-.453.235-.621a.87.87 0 0 1 1.225-.04L6.27 7.881 8.973 4.29a.86.86 0 0 1 .693-.346.867.867 0 0 1 .692 1.388" /></svg>;

ExpressIcon.displayName = IconComponent.displayName;

export default function SuccessSmall(props: UIIconPropsWithoutChildren): JSX.Element {
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
