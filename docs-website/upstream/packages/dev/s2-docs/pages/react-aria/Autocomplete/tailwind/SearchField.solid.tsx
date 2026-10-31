'use client';
import { SearchIcon, XIcon } from '../../Button/icons.solid';
import { SearchField as AriaSearchField, type SearchFieldProps as AriaSearchFieldProps, type ValidationResult } from 'solid-aria-components';
import { Description, FieldError, FieldGroup, Input, Label } from '../../Button/tailwind/Field.solid';
import { composeTailwindRenderProps } from '../../Button/tailwind/utils';
import { FieldButton } from '../../Button/tailwind/FieldButton.solid';
export interface SearchFieldProps extends AriaSearchFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
}
export function SearchField(props: SearchFieldProps) {
    return (<AriaSearchField {...props} className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1 min-w-[40px] font-sans max-w-full')}>
      {props.label && <Label>{props.label}</Label>}
      <FieldGroup>
        <SearchIcon aria-hidden="true" className="w-4 h-4 ml-2 text-neutral-500 dark:text-neutral-400 forced-colors:text-[ButtonText] group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600 forced-colors:group-disabled:text-[GrayText]"/>
        <Input placeholder={props.placeholder} className="pl-2 [&::-webkit-search-cancel-button]:hidden"/>
        <FieldButton className="mr-1 w-6 group-empty:invisible">
          <XIcon aria-hidden="true" className="w-4 h-4"/>
        </FieldButton>
      </FieldGroup>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaSearchField>);
}
