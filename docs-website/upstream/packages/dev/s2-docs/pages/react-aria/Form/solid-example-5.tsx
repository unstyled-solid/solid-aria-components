import { render } from '@solidjs/web';
import { Form } from './vanilla/Form.solid';
import { TextField } from './vanilla/TextField.solid';
import { Button } from './vanilla/Button.solid';
function Example(props: Record<string, unknown>) {
    return (<Form {...props}>
  <TextField label="Username" placeholder="Choose a username" isRequired validate={value => value === 'admin' ? 'Nice try.' : null} name="username" defaultValue="admin"/>
  <Button type="submit">Submit</Button>
    </Form>);
}
export const title = 'Form example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
