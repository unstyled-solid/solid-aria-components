import {render} from '@solidjs/web';
import {parseZonedDateTime} from '@internationalized/date';
import {DateRangePicker} from './vanilla/DateRangePicker.solid';
function Example(props: Record<string, unknown>) {return (<DateRangePicker
  {...props} /* PROPS */
  defaultValue={{
    start: parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]'),
    end: parseZonedDateTime('2025-02-14T08:45:00[America/Los_Angeles]')
  }} />);}
export const title = 'DateRangePicker example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
