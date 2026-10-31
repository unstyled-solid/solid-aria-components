import {render} from '@solidjs/web';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
// TODO: move this into the starter example.
function Example(props: Record<string, unknown>) {
  return (
    <RangeCalendar
      {...props}
      aria-label="Trip dates"
      ///- begin highlight -///
      /* PROPS */
      ///- end highlight -///
    />
  );
}
export const title = 'RangeCalendar example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
