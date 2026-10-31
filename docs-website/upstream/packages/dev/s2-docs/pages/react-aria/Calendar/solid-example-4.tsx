import {render} from '@solidjs/web';
import {I18nProvider} from 'solid-aria-components';
import {parseDate} from '@internationalized/date';
import {Calendar} from './vanilla/Calendar.solid';
function Example(props: Record<string, unknown>) {return (<I18nProvider locale={props.locale as string}/* PROPS */>
  <Calendar defaultValue={parseDate('2025-02-03')} />
</I18nProvider>);}
export const title = 'Calendar example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
