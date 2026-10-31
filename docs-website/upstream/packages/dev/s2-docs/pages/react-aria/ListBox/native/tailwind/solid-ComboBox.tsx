import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {ChevronDown} from './../../native-icons/solid-icons';
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  ListBox,
  type ListBoxItemProps,
  type ValidationResult
} from 'solid-aria-components/ComboBox';
import {Description, FieldError, FieldGroup, Input, Label} from './solid-Field';
import {DropdownItem, DropdownSection, type DropdownSectionProps} from './solid-ListBox';
import {Popover} from './solid-Popover';
import {composeTailwindRenderProps} from './utils';
import {FieldButton} from './solid-FieldButton';

export interface ComboBoxProps<T, M extends 'single' | 'multiple'> extends Omit<
  AriaComboBoxProps<T, M>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  children: JSX.Element | ((item: T) => JSX.Element);
}

export function ComboBox<T, M extends 'single' | 'multiple' = 'single'>(inputProps: ComboBoxProps<T, M>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "children", "items");
  return (
    <AriaComboBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1 font-sans'
      )}>
      <Label>{inputProps.label}</Label>
      <FieldGroup>
        <Input className="ps-3 pe-1" />
        <FieldButton className="w-6 mr-1 outline-offset-0">
          <ChevronDown aria-hidden="true" className="w-4 h-4" />
        </FieldButton>
      </FieldGroup>
      {props.selectionMode === 'multiple' && (
        <ComboBoxValue
          placeholder="No items selected"
          className="text-xs text-neutral-600 dark:text-neutral-300"
        />
      )}
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
      <Popover className="w-(--trigger-width)">
        <ListBox
          items={inputProps.items}
          className="outline-0 p-1 box-border max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
          {inputProps.children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function ComboBoxSection<T>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
