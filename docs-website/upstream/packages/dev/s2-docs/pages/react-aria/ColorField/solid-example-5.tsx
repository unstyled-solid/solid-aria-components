import {render} from '@solidjs/web';
import {ColorField} from './vanilla/ColorField.solid';
import {Button} from './vanilla/Button.solid';
import {Form} from './vanilla/Form.solid';
function Example(props: Record<string, unknown>) {
  return (
    <Form>
      <ColorField
        {...props}
        label="Brand color"
        placeholder="Enter a color"
        ///- begin highlight -///
        name="brandColor"
        isRequired />
        {/*- end highlight -*/}
      <Button type="submit" style={{"margin-top": "8px"}}>Submit</Button>
    </Form>
  );
}
export const title = 'ColorField example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
