import {render} from '@solidjs/web';
import {NumberField} from './vanilla/NumberField.solid';
import {Button} from '../Button/vanilla/Button.solid';
import {Form} from '../Button/vanilla/Form.solid';
export const title = 'Forms';
export function mount(element: HTMLElement) {
  return render(() => <Form><NumberField label="Width" name="width" isRequired /><Button type="submit">Submit</Button></Form>, element);
}
