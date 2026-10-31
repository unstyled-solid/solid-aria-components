import { render } from '@solidjs/web';
import { Form } from './vanilla/Form.solid';
import { TextField } from './vanilla/TextField.solid';
function Example(props: Record<string, unknown>) {
    return (<Form 
    /*- begin highlight -*/
    validationErrors={{
            username: 'This username is not available.'
        }}>
  {/*- end highlight -*/}
  <TextField name="username" label="Username" placeholder="Choose a username" defaultValue="admin"/>
    </Form>);
}
export const title = 'Form example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
