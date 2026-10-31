import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { RadioGroup, Radio } from '../Tabs/vanilla/RadioGroup';
import { Button } from '../Tabs/vanilla/Button';
import { Form } from '../Tabs/vanilla/Form';
;
function Example(props: Record<string, unknown>) {
  return <Form>
  <RadioGroup label="Favorite pet"
    /*- begin highlight -*/ name="pet" isRequired>
    {/*- end highlight -*/}
    <Radio value="dog">Dog</Radio>
    <Radio value="cat">Cat</Radio>
    <Radio value="dragon">Dragon</Radio>
  </RadioGroup>
  <Button type="submit" style={{
      "margin-top": "8px"
    }}>Submit</Button>
</Form>;
}
export const title = "RadioGroup source example 4";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
