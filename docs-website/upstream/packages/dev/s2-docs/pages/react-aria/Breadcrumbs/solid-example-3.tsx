import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import type { Key } from 'solid-aria-components';
import { Breadcrumbs, Breadcrumb } from '../Tabs/vanilla/Breadcrumbs';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
  let [breadcrumbs, setBreadcrumbs] = createSignal([{
    id: 1,
    label: 'Home'
  }, {
    id: 2,
    label: 'Trendy'
  }, {
    id: 3,
    label: 'March 2022 Assets'
  }]);
  let navigate = (id: Key) => {
    let i = breadcrumbs().findIndex(item => item.id === id);
    setBreadcrumbs(breadcrumbs().slice(0, i + 1));
  };
  return /*- begin highlight -*/<Breadcrumbs items={breadcrumbs()} onAction={navigate}>
      {item => <Breadcrumb>{item.label}</Breadcrumb>}
    </Breadcrumbs>
  /*- end highlight -*/;
}
export const title = "Breadcrumbs source example 3";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
