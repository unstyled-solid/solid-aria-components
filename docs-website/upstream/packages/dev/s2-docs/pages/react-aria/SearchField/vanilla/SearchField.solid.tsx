'use client';
import {
  Button,
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult
} from 'solid-aria-components';
import {Label, FieldError, Description} from '../../Button/vanilla/Form.solid';
import {Search, X} from '../../Button/icons.solid';
import './SearchField.css';

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function SearchField(props: SearchFieldProps) {
  return (
    <AriaSearchField {...props}>
      {props.label && <Label>{props.label}</Label>}
      <Search size={18} />
      <Input placeholder={props.placeholder} className="react-aria-Input inset" />
      <Button className="clear-button">
        <X size={14} />
      </Button>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaSearchField>
  );
}
