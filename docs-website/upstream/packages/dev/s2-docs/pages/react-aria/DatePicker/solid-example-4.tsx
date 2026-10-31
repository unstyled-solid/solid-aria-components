import {render} from '@solidjs/web';
import {parseZonedDateTime} from '@internationalized/date';
import {DatePicker} from './vanilla/DatePicker.solid';
function Example(props: Record<string, unknown>) {return (<DatePicker
  {...props} /* PROPS */
  defaultValue={parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')} />);}
export const title = 'DatePicker example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
