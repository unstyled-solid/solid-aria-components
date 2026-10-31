import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { RadioGroup, Radio } from '../Tabs/vanilla/RadioGroup';
function Example(props: Record<string, unknown>) {
  return <RadioGroup label="Shipping options" {...props}>
  <Radio value="standard" description="Delivers in 5–7 business days">
    Standard Shipping (Free)
  </Radio>
  <Radio value="expedited" description="Delivers in 2–3 business days">
    Expedited Shipping ($9.99)
  </Radio>
  <Radio value="dragon" description="Next-day delivery">
    Overnight Shipping ($19.99)
  </Radio>
</RadioGroup>;
}
export const title = "RadioGroup source example 1";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
