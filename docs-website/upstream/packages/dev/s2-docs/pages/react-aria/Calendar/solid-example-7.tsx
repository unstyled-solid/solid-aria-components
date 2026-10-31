import {render} from '@solidjs/web';
import {Calendar} from './vanilla/Calendar.solid';
function Example(props: Record<string, unknown>) {
  return (
    <Calendar
      {...props}
      aria-label="Appointment date"
      ///- begin highlight -///
      /* PROPS */
      ///- end highlight -///
     />
  );
}
export const title = 'Calendar example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
