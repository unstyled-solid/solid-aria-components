import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { CheckboxGroup } from '../Tabs/vanilla/CheckboxGroup';
import { Checkbox } from '../Tabs/vanilla/Checkbox';
import { Button } from '../Tabs/vanilla/Button';
import { Form } from '../Tabs/vanilla/Form';
;
function Example(props: Record<string, unknown>) {
  return <Form>
  <div style={{
      "display": 'flex',
      "gap": "32px",
      "flex-wrap": 'wrap'
    }}>
    <CheckboxGroup label="Sandwich condiments"
      /*- begin highlight -*/ name="condiments" isRequired>
      {/*- end highlight -*/}
      <Checkbox value="lettuce">Lettuce</Checkbox>
      <Checkbox value="tomato">Tomato</Checkbox>
      <Checkbox value="onion">Onion</Checkbox>
      <Checkbox value="sprouts">Sprouts</Checkbox>
    </CheckboxGroup>
    <CheckboxGroup label="Agree to the following" name="terms">
      {/*- begin highlight -*/}
      <Checkbox value="terms" isRequired>Terms and conditions</Checkbox>
      <Checkbox value="privacy" isRequired>Privacy policy</Checkbox>
      <Checkbox value="cookies" isRequired>Cookie policy</Checkbox>
      {/*- end highlight -*/}
    </CheckboxGroup>
  </div>
  <Button type="submit" style={{
      "margin-top": "8px"
    }}>Submit</Button>
</Form>;
}
export const title = "CheckboxGroup source example 4";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
