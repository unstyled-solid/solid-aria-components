import {omit} from 'solid-js';
'use client';
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarHeading,
  type CalendarProps as AriaCalendarProps,
  type DateValue,
  type CalendarCellProps,
  type CalendarGridProps
} from 'solid-aria-components';
import {Text} from './Content.solid';
import {ChevronLeft, ChevronRight} from './icons.solid';
import {Button} from './Button.solid';
import './Calendar.css';

export interface CalendarProps<T extends DateValue> extends AriaCalendarProps<T> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>(live0: CalendarProps<T>) {
  let months = () => live0.visibleDuration?.months || 1;
  return (
    <AriaCalendar {...omit(live0, "errorMessage")}>
      <div class="months">
        {Array.from({length: months()}, (_, i) => (
          <div class="month">
            <header>
              {i === 0 && (
                <Button slot="previous" variant="quiet">
                  <ChevronLeft />
                </Button>
              )}
              <CalendarHeading offset={{months: i}} />
              {i === months() - 1 && (
                <Button slot="next" variant="quiet">
                  <ChevronRight />
                </Button>
              )}
            </header>
            <CalendarGrid offset={{months: i}}>{date => <CalendarCell date={date} />}</CalendarGrid>
          </div>
        ))}
      </div>
      {live0.errorMessage && <Text slot="errorMessage">{live0.errorMessage}</Text>}
    </AriaCalendar>
  );
}

export function CalendarCell(props: CalendarCellProps) {
  return (
    <AriaCalendarCell
      {...props}
      className="react-aria-CalendarCell button-base"
      data-variant="quiet"
    />
  );
}

export function CalendarGrid(props: CalendarGridProps) {
  return <AriaCalendarGrid {...props} />;
}
