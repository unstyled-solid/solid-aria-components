import {render} from '@solidjs/web';
import {Checkbox} from './vanilla/Checkbox.solid';
import {Button} from '../Button/vanilla/Button.solid';
import {Form} from '../Button/vanilla/Form.solid';
export const title = 'Forms';
export function mount(element: HTMLElement) {
  return render(() => <Form><Checkbox name="terms" value="agree" isRequired description="By clicking this checkbox, you agree to the terms and conditions.">Accept terms and conditions</Checkbox><Button type="submit" style={{'margin-top': '8px'}}>Submit</Button></Form>, element);
}
