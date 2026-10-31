import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 7; source content and algorithms retained.
import type {Key} from 'solid-aria-components/ComboBox';
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {createSignal} from 'solid-js';

function ControlledComboBox() {
  /*- begin collapse -*/
  let options = [
    {id: 1, name: 'Aerospace'},
    {id: 2, name: 'Mechanical'},
    {id: 3, name: 'Civil'},
    {id: 4, name: 'Biomedical'},
    {id: 5, name: 'Nuclear'},
    {id: 6, name: 'Industrial'},
    {id: 7, name: 'Chemical'},
    {id: 8, name: 'Agricultural'},
    {id: 9, name: 'Electrical'}
  ];
  /*- end collapse -*/

  let [fieldState, setFieldState] = createSignal<{value: Key | null, inputValue: string}>({
    value: null,
    inputValue: ''
  });

  let onChange = (id: Key | null) => {
    // Update inputValue when value changes.
    setFieldState({
      inputValue: id == null ? '' : options.find(o => o.id === id)?.name ?? '',
      value: id
    });
  };

  let onInputChange = (value: string) => {
    // Reset value to null if the input is cleared.
    setFieldState(prevState => ({
      inputValue: value,
      value: value === '' ? null : prevState.value
    }));
  };

  return (
    <div>
      <ComboBox
        label="Engineering major"
        placeholder="Select a major"
        /*- begin highlight -*/
        defaultItems={options}
        value={fieldState().value}
        inputValue={fieldState().inputValue}
        onChange={onChange}
        onInputChange={onInputChange}>
        {/*- end highlight -*/}
        {item => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
      <pre style={{"font-size": "12px"}}>
        Current selected major id: {fieldState().value}{'\n'}
        Current input text: {fieldState().inputValue}
      </pre>
    </div>
  );
}

export default ControlledComboBox;

export const title = "ComboBox: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <ControlledComboBox {...{}} {...props} />, element);
}
