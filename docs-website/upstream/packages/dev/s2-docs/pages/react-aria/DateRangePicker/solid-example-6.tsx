import {render} from '@solidjs/web';
import {isWeekend, today, getLocalTimeZone} from '@internationalized/date';
import {useLocale} from 'solid-aria-components';
import {DateRangePicker} from './vanilla/DateRangePicker.solid';
import {Button} from './vanilla/Button.solid';
import {Form} from './vanilla/Form.solid';;
function Example(props: Record<string, unknown>) {
  let locale = useLocale();
  let now = today(getLocalTimeZone());
  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })]
  ];

  return (
    <Form>
      <DateRangePicker
        {...props}
        label="Trip dates"
        ///- begin highlight -///
        startName="startDate"
        endName="endDate"
        /* PROPS */
        isRequired
        minValue={today(getLocalTimeZone())}
        isDateUnavailable={date => (
          isWeekend(date, locale.locale) ||
          disabledRanges.some((interval) =>
            date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
          )
        )}
        ///- end highlight -///
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
export const title = 'DateRangePicker example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
