import {Select, SelectValue} from '../../packages/react-aria-components/src/Select';
import {Label} from '../../packages/react-aria-components/src/Label';
import {Button} from '../../packages/react-aria-components/src/Button';
import {Popover} from '../../packages/react-aria-components/src/Popover';
import {ListBox, ListBoxItem} from '../../packages/react-aria-components/src/ListBox';

// Physical translation of the original Select.ssr.test.js fixture.
export function Fixture() {
  return <Select defaultSelectedKey="dog">
    <Label>Favorite Animal</Label>
    <Button><SelectValue /></Button>
    <Popover>
      <ListBox>
        <ListBoxItem id="cat">Cat</ListBoxItem>
        <ListBoxItem id="dog">Dog</ListBoxItem>
        <ListBoxItem id="kangaroo">Kangaroo</ListBoxItem>
      </ListBox>
    </Popover>
  </Select>;
}
