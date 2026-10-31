import {render} from '@solidjs/web';
import {I18nProvider} from 'solid-aria-components';
import {parseDate} from '@internationalized/date';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
function Example(props: Record<string, unknown>) {return (<I18nProvider locale={props.locale as string}/* PROPS */>
  <RangeCalendar
    defaultValue={{
      start: parseDate('2025-02-03'),
      end: parseDate('2025-02-12')
    }} />
</I18nProvider>);}
export const title = 'RangeCalendar example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
