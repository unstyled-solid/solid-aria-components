import {ComboBox} from '../../packages/react-aria-components/src/ComboBox';
import {Label} from '../../packages/react-aria-components/src/Label';
import {Input} from '../../packages/react-aria-components/src/Input';
import {Popover} from '../../packages/react-aria-components/src/Popover';
import {ListBox, ListBoxItem} from '../../packages/react-aria-components/src/ListBox';

// Physical translation of the original default-selected-key SSR fixture.
export function Fixture() {
  return <ComboBox defaultSelectedKey="dog">
    <Label>Favorite Animal</Label>
    <Input />
    <Popover>
      <ListBox>
        <ListBoxItem id="cat">Cat</ListBoxItem>
        <ListBoxItem id="dog">Dog</ListBoxItem>
        <ListBoxItem id="kangaroo">Kangaroo</ListBoxItem>
      </ListBox>
    </Popover>
  </ComboBox>;
}
