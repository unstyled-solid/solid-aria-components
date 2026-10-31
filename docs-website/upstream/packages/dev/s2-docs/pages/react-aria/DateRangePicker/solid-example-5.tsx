import {render} from '@solidjs/web';
import {I18nProvider} from 'solid-aria-components';
import {parseDate} from '@internationalized/date';
import {DateRangePicker} from './vanilla/DateRangePicker.solid';
function Example(props: Record<string, unknown>) {return (<I18nProvider locale={props.locale as string | undefined}/* PROPS */>
  <DateRangePicker
    defaultValue={{
      start: parseDate('2025-02-03'),
      end: parseDate('2025-02-14')
    }} />
</I18nProvider>);}
export const title = 'DateRangePicker example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
