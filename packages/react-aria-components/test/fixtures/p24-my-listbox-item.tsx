import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import {ListBoxItem, type ListBoxItemProps} from '../../src/ListBox';
import styles from '../../example/index.css';

// Complete frozen stories/utils.tsx:13–28; native CSS names retain source values.
export const MyListBoxItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      style={{'word-break': 'break-word', 'min-width': 'max-content', ...props.style}}
      className={({isFocused, isSelected, isHovered, isFocusVisible}) =>
        classNames(styles, 'item', {
          focused: isFocused,
          selected: isSelected,
          hovered: isHovered,
          focusVisible: isFocusVisible
        })
      }
    />
  );
};
