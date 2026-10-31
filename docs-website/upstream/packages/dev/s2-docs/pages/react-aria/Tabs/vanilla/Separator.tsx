import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Separator as RACSeparator, type SeparatorProps } from 'solid-aria-components';
import './Separator.css';

export function Separator(props: SeparatorProps) {
  return <RACSeparator {...props} />;
}
