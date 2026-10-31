import {omit} from 'solid-js';
import {
  Button,
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult
} from 'solid-aria-components/SearchField';
import {Label, FieldError, Description} from './solid-Form';
import {Search, X} from './../../native-icons/solid-icons';
import './SearchField.css';

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function SearchField(inputProps: SearchFieldProps) {
  let props = omit(inputProps, "label", "description", "errorMessage", "placeholder");
  return (
    <AriaSearchField {...props}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <Search size={18} />
      <Input placeholder={inputProps.placeholder} className="react-aria-Input inset" />
      <Button className="clear-button">
        <X size={14} />
      </Button>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
    </AriaSearchField>
  );
}
