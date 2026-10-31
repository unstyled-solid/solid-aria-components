import {render} from '@solidjs/web';
import {isWeekend, today, getLocalTimeZone} from '@internationalized/date';
import {useLocale} from 'solid-aria-components';
import {Calendar} from './vanilla/Calendar.solid';
function Example(props: Record<string, unknown>) {
  let locale = useLocale();
  let now = today(getLocalTimeZone());
  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })]
  ];

  return (
    <Calendar
      {...props}
      aria-label="Appointment date"
      ///- begin highlight -///
      /* PROPS */
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={date => (
        isWeekend(date, locale.locale) ||
        disabledRanges.some((interval) =>
          date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
        )
      )} />
      ///- end highlight -///
  );
}
export const title = 'Calendar example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
