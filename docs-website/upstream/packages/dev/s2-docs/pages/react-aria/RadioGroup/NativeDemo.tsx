import {RadioGroup, RadioField, RadioButton, Label} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Favorite pet radio group';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './RadioGroup.css';

export default function NativeDemo() {
  return <RadioGroup>
    <Label>Favorite pet</Label>
    <div class="radio-items">
      <RadioField value="dogs"><RadioButton><div class="indicator" />Dogs</RadioButton></RadioField>
      <RadioField value="cats"><RadioButton><div class="indicator" />Cats</RadioButton></RadioField>
    </div>
  </RadioGroup>;
}
