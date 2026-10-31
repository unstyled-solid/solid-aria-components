import {render} from '@solidjs/web';
import {Switch} from './vanilla/Switch.solid';
import {Button} from '../Button/vanilla/Button.solid';
import {Form} from '../Button/vanilla/Form.solid';
export const title = 'Forms';
export function mount(element: HTMLElement) {
  return render(() => <Form><Switch name="two-factor" isRequired description="Your organization requires two-factor authentication.">Two-factor authentication</Switch><Button type="submit" style={{'margin-top': '8px'}}>Submit</Button></Form>, element);
}
