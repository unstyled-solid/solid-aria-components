import {render} from '@solidjs/web';
import {Switch} from './vanilla/Switch.solid';
export const title = 'Switch — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Switch>[0]> = {}) {
  return render(() => <Switch {...props}>{props.children ?? 'Low power mode'}</Switch>, element);
}
