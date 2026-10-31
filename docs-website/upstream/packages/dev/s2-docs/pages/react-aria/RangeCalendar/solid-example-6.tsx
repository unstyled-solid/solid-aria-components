import {render} from '@solidjs/web';
import {today, getLocalTimeZone} from '@internationalized/date';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
import {createSignal} from 'solid-js';
function Example(props: Record<string, unknown>) {
  let now = today(getLocalTimeZone());
  let [range, setRange] = createSignal({
    start: now.add({days: 6}),
    end: now.add({ days: 14 })
  });
  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 15 }), now.add({ days: 17 })],
    [now.add({ days: 23 }), now.add({ days: 24 })]
  ];
  let isInvalid = () => range()!.end.compare(range()!.start) > 7;

  return (
    <RangeCalendar
      {...props}
      aria-label="Trip dates"
      value={range()}
      onChange={setRange}
      ///- begin highlight -///
      /* PROPS */
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={(date, anchorDate) => (
        (anchorDate && Math.abs(date.compare(anchorDate)) > 7) ||
        disabledRanges.some((interval) =>
          date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
        )
      )}
      isInvalid={isInvalid()}
      errorMessage={isInvalid() ? 'Maximum stay duration is 1 week' : undefined} />
      ///- end highlight -///
  );
}
export const title = 'RangeCalendar example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
