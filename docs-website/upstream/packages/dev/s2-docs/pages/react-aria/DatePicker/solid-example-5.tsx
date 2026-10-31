import {render} from '@solidjs/web';
import {I18nProvider} from 'solid-aria-components';
import {parseZonedDateTime} from '@internationalized/date';
import {DatePicker} from './vanilla/DatePicker.solid';
function Example(props: Record<string, unknown>) {return (<I18nProvider locale={props.locale as string}/* PROPS */>
  <DatePicker defaultValue={parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')} />
</I18nProvider>);}
export const title = 'DatePicker example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
