import {omit} from 'solid-js';
'use client';
import {
  CalendarCell as AriaCalendarCell,
  RangeCalendar as AriaRangeCalendar,
  CalendarHeading,
  Text,
  type DateValue,
  type RangeCalendarProps as AriaRangeCalendarProps,
  type CalendarCellProps
} from 'solid-aria-components';
import {composeRenderProps} from 'solid-aria-components';
import {Button} from './Button.solid';
import {ChevronLeft, ChevronRight} from './icons.solid';
import {CalendarGrid} from './Calendar.solid';
import './RangeCalendar.css';

export interface RangeCalendarProps<T extends DateValue> extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
}

export function RangeCalendar<T extends DateValue>(live0: RangeCalendarProps<T>) {
  let months = () => live0.visibleDuration?.months || 1;
  return (
    <AriaRangeCalendar {...omit(live0, "errorMessage")}>
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
    </AriaRangeCalendar>
  );
}

export {CalendarGrid};
export function CalendarCell(props: CalendarCellProps) {
  return (
    <AriaCalendarCell {...props}>
      {composeRenderProps(
        props.children,
        (
          children,
          live1
        ) => (
          <span
            class="button-base"
            data-variant="quiet"
            data-hovered={live1.isHovered || undefined}
            data-pressed={live1.isPressed || undefined}
            data-selected={live1.isSelectionStart || live1.isSelectionEnd || undefined}
            data-disabled={live1.isDisabled || undefined}>
            {children || live1.defaultChildren}
          </span>
        )
      )}
    </AriaCalendarCell>
  );
}
