import {render} from '@solidjs/web';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
import {Button} from './vanilla/Button.solid';
import {CalendarDate, today, getLocalTimeZone} from '@internationalized/date';
import {createSignal} from 'solid-js';
function Example() {
  let defaultDate = new CalendarDate(2021, 7, 1);
  let [focusedDate, setFocusedDate] = createSignal(defaultDate);

  return (
    <div>
      <Button
        style={{"margin-bottom": "20px"}}
        onPress={() => setFocusedDate(today(getLocalTimeZone()))}>
        Today
      </Button>
      <RangeCalendar
        ///- begin highlight -///
        focusedValue={focusedDate()}
        onFocusChange={setFocusedDate}
        ///- end highlight -///
      />
    </div>
  );
}
export const title = 'RangeCalendar example 8';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
