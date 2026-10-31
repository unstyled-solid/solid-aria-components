import {render} from '@solidjs/web';
import {RangeCalendar, CalendarMonthPicker, CalendarYearPicker} from 'solid-aria-components';
import {CalendarGrid, CalendarCell} from './vanilla/RangeCalendar.solid';
import {Button} from './vanilla/Button.solid';
import {Select, SelectItem} from './vanilla/Select.solid';
import {ChevronLeft, ChevronRight} from './icons.solid';
function Example(props: Record<string, unknown>) {return (<RangeCalendar>
  <div class="months">
    <div class="month">
      <header style={{display: 'flex', gap: "4px"}}>
        <Button slot="previous" variant="quiet">
          <ChevronLeft />
        </Button>
        {/*- begin highlight -*/}
        <CalendarMonthPicker>
          {(props) => (
            <Select {...props}>
              {item => <SelectItem>{item.formatted}</SelectItem>}
            </Select>
          )}
        </CalendarMonthPicker>
        <CalendarYearPicker>
          {(props) => (
            <Select {...props}>
              {item => <SelectItem>{item.formatted}</SelectItem>}
            </Select>
          )}
        </CalendarYearPicker>
        {/*- end highlight -*/}
        <Button slot="next" variant="quiet">
          <ChevronRight />
        </Button>
      </header>
      <CalendarGrid>
        {(date) => <CalendarCell date={date} />}
      </CalendarGrid>
    </div>
  </div>
</RangeCalendar>);}
export const title = 'RangeCalendar example 9';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
