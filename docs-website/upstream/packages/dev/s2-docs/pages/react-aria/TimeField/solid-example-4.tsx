import {render} from '@solidjs/web';
import {parseZonedDateTime} from '@internationalized/date';
import {TimeField} from './vanilla/TimeField.solid';
function Example(props: Record<string, unknown>) {return (<TimeField
  {...props} /* PROPS */
  defaultValue={parseZonedDateTime('2025-02-03T17:45:00[America/Los_Angeles]')} />);}
export const title = 'TimeField example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
