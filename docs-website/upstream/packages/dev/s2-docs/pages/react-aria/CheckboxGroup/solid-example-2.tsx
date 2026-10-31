import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { CheckboxGroup } from '../Tabs/tailwind/CheckboxGroup';
import { Checkbox } from '../Tabs/tailwind/Checkbox';
function Example(props: Record<string, unknown>) {
  return <CheckboxGroup label="Email Notification Preferences" {...props}>
  <Checkbox value="product" description="Get notified about new features and improvements">
    Product Updates
  </Checkbox>
  <Checkbox value="security" description="Important notifications about your account safety">
    Security Alerts
  </Checkbox>
  <Checkbox value="marketing" description="Receive promotions, offers, and newsletters">
    Marketing Emails
  </Checkbox>
</CheckboxGroup>;
}
export const title = "CheckboxGroup source example 2";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
