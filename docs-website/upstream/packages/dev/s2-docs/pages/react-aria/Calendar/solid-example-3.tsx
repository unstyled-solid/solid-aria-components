import {render} from '@solidjs/web';
import {parseDate, getLocalTimeZone} from '@internationalized/date';
import {useDateFormatter} from '../../../../../../../../packages/react-aria/src/i18n/useDateFormatter';
import {Calendar} from './vanilla/Calendar.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [date, setDate] = createSignal(parseDate('2020-02-03'));
  let formatter = useDateFormatter({ dateStyle: 'full' });

  return (
    <>
      <Calendar
        ///- begin highlight -///
        value={date()}
        onChange={setDate}
        ///- end highlight -///
      />
      <p>Selected date: {formatter().format(date()!.toDate(getLocalTimeZone()))}</p>
    </>
  );
}
export const title = 'Calendar example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
