'use client';
import {SearchField as NativeSearchField, Label, Input, Button, type SearchFieldProps as NativeSearchFieldProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import './SearchField.css';
import './Form.css';

export interface SearchFieldProps extends NativeSearchFieldProps {
  label?: JSX.Element;
}

export function SearchField(props: SearchFieldProps) {
  return (
    <NativeSearchField {...props} className="react-aria-SearchField">
      {props.label && <Label class="react-aria-Label">{props.label}</Label>}
      <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      <Input className="react-aria-Input inset" />
      <Button className="clear-button">
        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </Button>
    </NativeSearchField>
  );
}
