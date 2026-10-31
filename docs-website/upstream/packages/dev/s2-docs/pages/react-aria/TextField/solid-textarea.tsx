import {render} from '@solidjs/web';
import {TextField, Label, TextArea} from 'solid-aria-components';
import './vanilla/TextField.css';
import '../Button/vanilla/Form.css';
export const title = 'TextArea';
export function mount(element: HTMLElement) {
  return render(() => <TextField><Label>Comment</Label><TextArea className="react-aria-TextArea inset" placeholder="Enter a comment" /></TextField>, element);
}
