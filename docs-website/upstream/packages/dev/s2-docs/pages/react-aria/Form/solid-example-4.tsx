import { render } from '@solidjs/web';
import { Form } from './vanilla/Form.solid';
import { TextField } from './vanilla/TextField.solid';
import { Button } from './vanilla/Button.solid';
function Example(props: Record<string, unknown>) {
    return (<Form 
    /*- begin highlight -*/
    onSubmit={event => {
            // Prevent default browser page refresh.
            event.preventDefault();
            // Get data from form.
            let form = event.target as HTMLFormElement;
            let formData = new FormData(form);
            let name = formData.get('name');
            alert(`Hello, ${name}!`);
            // Reset form after submission.
            form.reset();
        }}>
  {/*- end highlight -*/}
  <TextField name="name" label="Name" placeholder="Enter your full name"/>
  <Button type="submit">Submit</Button>
    </Form>);
}
export const title = 'Form example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
