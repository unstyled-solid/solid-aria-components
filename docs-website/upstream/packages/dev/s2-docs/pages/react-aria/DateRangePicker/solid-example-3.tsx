import {render} from '@solidjs/web';
import {parseDate, getLocalTimeZone, type CalendarDate} from '@internationalized/date';
import {type RangeValue} from 'solid-aria-components';
import {useDateFormatter} from '../../../../../../../../packages/react-aria/src/i18n/useDateFormatter';
import {DateRangePicker} from './vanilla/DateRangePicker.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [range, setRange] = createSignal<RangeValue<CalendarDate> | null>({
    start: parseDate('2025-02-03'),
    end: parseDate('2025-02-12')
  });
  let formatter = useDateFormatter({ dateStyle: 'long' });

  return (
    <>
      <DateRangePicker
        ///- begin highlight -///
        value={range()}
        onChange={setRange} />
        {/*- end highlight -*/}
      <p>Selected range: {range() ? formatter().formatRange(
        range()!.start.toDate(getLocalTimeZone()),
        range()!.end.toDate(getLocalTimeZone())
      ) : '--'}</p>
    </>
  );
}
export const title = 'DateRangePicker example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
