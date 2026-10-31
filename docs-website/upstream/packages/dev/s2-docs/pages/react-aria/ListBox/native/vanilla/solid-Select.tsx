import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  type ListBoxItemProps,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
  type ValidationResult,
  type ListBoxProps
} from 'solid-aria-components/Select';
import {Button} from './solid-Button';
import {DropdownItem, DropdownListBox} from './solid-ListBox';
import {ChevronDown} from './../../native-icons/solid-icons';
import {Popover} from './solid-Popover';
import {Label, FieldError, Description} from './solid-Form';
import './Select.css';

export interface SelectProps<T, M extends 'single' | 'multiple'> extends Omit<
  AriaSelectProps<T, M>,
  'children'
> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: JSX.Element | ((item: T) => JSX.Element);
}

export function Select<T, M extends 'single' | 'multiple' = 'single'>(inputProps: SelectProps<T, M>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "children", "items");
  return (
    <AriaSelect {...props}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <Button>
        <SelectValue />
        <ChevronDown />
      </Button>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
      <Popover hideArrow className="select-popover">
        <SelectListBox items={inputProps.items}>{inputProps.children}</SelectListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectListBox<T>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
