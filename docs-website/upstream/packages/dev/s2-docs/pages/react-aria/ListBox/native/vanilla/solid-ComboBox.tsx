import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  Input,
  type ListBoxItemProps,
  type ListBoxProps,
  type ValidationResult
} from 'solid-aria-components/ComboBox';
import {Label, FieldError, FieldButton, Description} from './solid-Form';
import {DropdownItem, DropdownListBox} from './solid-ListBox';
import {Popover} from './solid-Popover';
import {ChevronDown} from './../../native-icons/solid-icons';
import './ComboBox.css';

export interface ComboBoxProps<T, M extends 'single' | 'multiple'> extends Omit<
  AriaComboBoxProps<T, M>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: JSX.Element | ((item: T) => JSX.Element);
  placeholder?: string;
}

export function ComboBox<T, M extends 'single' | 'multiple' = 'single'>(inputProps: ComboBoxProps<T, M>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "children", "placeholder");
  return (
    <AriaComboBox {...props}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <div class="combobox-field">
        <Input className="react-aria-Input inset" placeholder={inputProps.placeholder} />
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      {props.selectionMode === 'multiple' && <ComboBoxValue placeholder="No items selected" />}
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox>{inputProps.children}</ComboBoxListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxListBox<T>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
