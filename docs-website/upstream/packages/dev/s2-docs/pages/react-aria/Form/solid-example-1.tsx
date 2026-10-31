import { render } from '@solidjs/web';
import { Form } from './vanilla/Form.solid';
import { TextField } from './vanilla/TextField.solid';
import { Button } from './vanilla/Button.solid';
function Example(props: Record<string, unknown>) {
    return (<Form {...props}>
  <TextField label="Name" name="name" isRequired placeholder="Enter your full name"/>
  <TextField label="Email" name="email" type="email" isRequired placeholder="Enter your email"/>
  <div style={{ "display": 'flex', "gap": "8px" }}>
    <Button type="submit">Submit</Button>
    <Button type="reset" variant="secondary">Reset</Button>
  </div>
    </Form>);
}
export const title = 'Form example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
