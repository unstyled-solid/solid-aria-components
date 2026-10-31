import {render} from '@solidjs/web';
import {parseDate, getLocalTimeZone} from '@internationalized/date';
import {useDateFormatter} from '../../../../../../../../packages/react-aria/src/i18n/useDateFormatter';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [range, setRange] = createSignal({
    start: parseDate('2025-02-03'),
    end: parseDate('2025-02-12')
  });
  let formatter = useDateFormatter({ dateStyle: 'long' });

  return (
    <>
      <RangeCalendar
        ///- begin highlight -///
        value={range()}
        onChange={setRange}
        ///- end highlight -///
      />
      <p>Selected range: {formatter().formatRange(
        range()!.start.toDate(getLocalTimeZone()),
        range()!.end.toDate(getLocalTimeZone())
      )}</p>
    </>
  );
}
export const title = 'RangeCalendar example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
