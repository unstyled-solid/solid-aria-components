import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { ComboBox as AriaComboBox, type ComboBoxProps as AriaComboBoxProps, ComboBoxValue, Input, type ListBoxItemProps, type ListBoxProps, type ValidationResult } from 'solid-aria-components';
import { Label, FieldError, FieldButton, Description } from './Form.solid';
import { DropdownItem, DropdownListBox } from './ListBox.solid';
import { Popover } from './Popover.solid';
import { ChevronDown } from '../native-icons/solid-icons';
import './ComboBox.css';
export interface ComboBoxProps<T, M extends 'single' | 'multiple'> extends Omit<AriaComboBoxProps<T, M>, 'children'> {
    label?: string;
    description?: string | null;
    errorMessage?: string | ((validation: ValidationResult) => string);
    children: JSX.Element | ((item: T) => JSX.Element);
    placeholder?: string;
}
export function ComboBox<T, M extends 'single' | 'multiple' = 'single'>(live0: ComboBoxProps<T, M>) {
    return (<AriaComboBox {...omit(live0, "label", "description", "errorMessage", "children", "placeholder")}>
      {live0.label && <Label>{live0.label}</Label>}
      <div class="combobox-field">
        <Input className="react-aria-Input inset" placeholder={live0.placeholder}/>
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      {omit(live0, "label", "description", "errorMessage", "children", "placeholder").selectionMode === 'multiple' && <ComboBoxValue placeholder="No items selected"/>}
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox>{live0.children}</ComboBoxListBox>
      </Popover>
    </AriaComboBox>);
}
export function ComboBoxListBox<T>(props: ListBoxProps<T>) {
    return <DropdownListBox {...props}/>;
}
export function ComboBoxItem(props: ListBoxItemProps) {
    return <DropdownItem {...props}/>;
}
