import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import {MenuItem, MenuItemProps} from '../../src/Menu';
import type {JSX} from '@solidjs/web';
import styles from '../../example/index.css';
export const MyMenuItem = (props: MenuItemProps): JSX.Element => {
  return (
    <MenuItem
      {...props}
      className={({isFocused, isSelected, isOpen, isFocusVisible}) =>
        classNames(styles, 'item', {
          focused: isFocused,
          selected: isSelected,
          open: isOpen,
          focusVisible: isFocusVisible
        })
      }
    />
  );
};
