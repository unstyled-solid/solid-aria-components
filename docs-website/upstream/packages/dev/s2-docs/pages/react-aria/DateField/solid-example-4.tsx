import {render} from '@solidjs/web';
import {parseZonedDateTime} from '@internationalized/date';
import {DateField} from './vanilla/DateField.solid';
function Example(props: Record<string, unknown>) {return (<DateField
  {...props} /* PROPS */
  defaultValue={parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')} />);}
export const title = 'DateField example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
