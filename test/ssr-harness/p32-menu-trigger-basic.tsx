import {MenuTrigger} from '../../packages/@adobe/react-spectrum/src/menu/MenuTrigger';
import {Menu} from '../../packages/@adobe/react-spectrum/src/menu/Menu';
import {ActionButton} from '../../packages/@adobe/react-spectrum/src/button/ActionButton';
import {Item} from 'react-stately/Item';

export function Fixture() {
  return <MenuTrigger>
    <ActionButton>Edit</ActionButton>
    <Menu>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Menu>
  </MenuTrigger>;
}
