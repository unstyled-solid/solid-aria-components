import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Breadcrumbs, Breadcrumb } from '../Tabs/vanilla/Breadcrumbs';
function Example(props: Record<string, unknown>) {
  return <Breadcrumbs {...props}>
  <Breadcrumb href="#">Home</Breadcrumb>
  <Breadcrumb href="#">React Aria</Breadcrumb>
  <Breadcrumb>Breadcrumbs</Breadcrumb>
</Breadcrumbs>;
}
export const title = "Breadcrumbs source example 1";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
