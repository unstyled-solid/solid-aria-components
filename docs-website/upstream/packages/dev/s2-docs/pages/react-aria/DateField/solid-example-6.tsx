import {render} from '@solidjs/web';
import {today, getLocalTimeZone} from '@internationalized/date';
import {DateField} from './vanilla/DateField.solid';
import {Button} from './vanilla/Button.solid';
import {Form} from './vanilla/Form.solid';;
function Example(props: Record<string, unknown>) {return (<Form>
  <DateField
    label="Appointment date"
    ///- begin highlight -///
    name="date"
    isRequired
    minValue={today(getLocalTimeZone())}
    ///- end highlight -///
  />
  <Button type="submit">Submit</Button>
</Form>);}
export const title = 'DateField example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
