import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
'use client';
import { type ListBoxItemProps, Select as AriaSelect, type SelectProps as AriaSelectProps, SelectValue, type ValidationResult, type ListBoxProps } from 'solid-aria-components';
import { Button } from './Button.solid';
import { DropdownItem, DropdownListBox } from './ListBox.solid';
import { ChevronDown } from './icons.solid';
import { Popover } from './Popover.solid';
import { Label, FieldError, Description } from './Form.solid';
import './Select.css';
export interface SelectProps<T, M extends 'single' | 'multiple'> extends Omit<AriaSelectProps<T, M>, 'children'> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    items?: Iterable<T>;
    children: JSX.Element | ((item: T) => JSX.Element);
}
export function Select<T, M extends 'single' | 'multiple' = 'single'>(live0: SelectProps<T, M>) {
    return (<AriaSelect {...omit(live0, "label", "description", "errorMessage", "children", "items")}>
      {live0.label && <Label>{live0.label}</Label>}
      <Button>
        <SelectValue />
        <ChevronDown />
      </Button>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover hideArrow className="select-popover">
        <SelectListBox items={live0.items}>{live0.children}</SelectListBox>
      </Popover>
    </AriaSelect>);
}
export function SelectListBox<T>(props: ListBoxProps<T>) {
    return <DropdownListBox {...props}/>;
}
export function SelectItem(props: ListBoxItemProps) {
    return <DropdownItem {...props}/>;
}
