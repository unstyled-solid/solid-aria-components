import {render} from '@solidjs/web';
import {parseDate, getLocalTimeZone, type CalendarDate} from '@internationalized/date';
import {useDateFormatter} from '../../../../../../../../packages/react-aria/src/i18n/useDateFormatter';
import {DateField} from './vanilla/DateField.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [date, setDate] = createSignal<CalendarDate | null>(parseDate('2020-02-03'));
  let formatter = useDateFormatter({ dateStyle: 'full' });

  return (
    <>
      <DateField
        ///- begin highlight -///
        value={date()}
        onChange={setDate} />
      {/*- end highlight -*/}
      <p>Selected date: {date() ? formatter().format(date()!.toDate(getLocalTimeZone())) : '--'}</p>
    </>
  );
}
export const title = 'DateField example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
