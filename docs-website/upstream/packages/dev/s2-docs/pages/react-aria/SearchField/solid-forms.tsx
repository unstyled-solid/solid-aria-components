import {render} from '@solidjs/web';
import {SearchField} from './vanilla/SearchField.solid';
import {Button} from '../Button/vanilla/Button.solid';
import {Form} from '../Button/vanilla/Form.solid';
export const title = 'Forms';
export function Example(props: Partial<Parameters<typeof SearchField>[0]>) {
  return <Form><SearchField isRequired {...props} label="Search" placeholder="Search documents" name="search" /><Button type="submit">Submit</Button></Form>;
}
export function mount(element: HTMLElement, props: Partial<Parameters<typeof SearchField>[0]> = {}) { return render(() => <Example {...props} />, element); }
