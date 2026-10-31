import { render } from '@solidjs/web';
import { Form } from './vanilla/Form.solid';
import { TextField } from './vanilla/TextField.solid';
import { Button } from './vanilla/Button.solid';
import { createSignal, onSettled } from 'solid-js';
function ErrorSummary() {
    let element: HTMLDivElement | undefined;
    onSettled(() => {element?.focus();});
    return <div role="alert" tabindex={-1} ref={node => {element = node;}}>
        <h3>Unable to submit</h3>
        <p>Please fix the validation errors below, and re-submit the form.</p>
    </div>;
}
function Example() {
    let [isInvalid, setInvalid] = createSignal(false);
    return (<Form 
    /*- begin highlight -*/
    onInvalid={e => {
            e.preventDefault();
            setInvalid(true);
        }} 
    /*- end highlight -*/
    onSubmit={e => {
            e.preventDefault();
            setInvalid(false);
        }} onReset={() => setInvalid(false)}>
      {isInvalid() && <ErrorSummary />}
      <TextField name="firstName" isRequired label="First Name" placeholder="Enter your first name"/>
      <TextField name="lastName" isRequired label="Last Name" placeholder="Enter your last name"/>
      <div style={{ "display": 'flex', "gap": "8px" }}>
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
    </Form>);
}
export const title = 'Form example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
