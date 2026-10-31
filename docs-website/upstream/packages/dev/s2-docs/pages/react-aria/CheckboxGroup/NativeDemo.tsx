import {CheckboxGroup, CheckboxField, CheckboxButton, Label} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Favorite sports checkbox group';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './CheckboxGroup.css';
import './Checkbox.css';

function Indicator() {
  return <div class="indicator"><svg viewBox="0 0 18 18" aria-hidden="true"><polyline points="2 9 7 14 16 4" /></svg></div>;
}

export default function NativeDemo() {
  return <CheckboxGroup data-orientation="vertical">
    <Label>Favorite sports</Label>
    <div class="checkbox-items">
      <CheckboxField value="soccer" isDisabled><CheckboxButton><Indicator />Soccer</CheckboxButton></CheckboxField>
      <CheckboxField value="baseball"><CheckboxButton><Indicator />Baseball</CheckboxButton></CheckboxField>
      <CheckboxField value="basketball"><CheckboxButton><Indicator />Basketball</CheckboxButton></CheckboxField>
    </div>
  </CheckboxGroup>;
}
