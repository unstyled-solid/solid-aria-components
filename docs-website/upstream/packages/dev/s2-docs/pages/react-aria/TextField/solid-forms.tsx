import {render} from '@solidjs/web';
import {TextField} from './vanilla/TextField.solid';
import {Button} from '../Button/vanilla/Button.solid';
import {Form} from '../Button/vanilla/Form.solid';
export const title = 'Forms';
export function Example(props: Partial<Parameters<typeof TextField>[0]>) {
  return <Form><TextField isRequired type="email" {...props} label="Email" placeholder="Enter your email" name="email" /><Button type="submit">Submit</Button></Form>;
}
export function mount(element: HTMLElement, props: Partial<Parameters<typeof TextField>[0]> = {}) { return render(() => <Example {...props} />, element); }
