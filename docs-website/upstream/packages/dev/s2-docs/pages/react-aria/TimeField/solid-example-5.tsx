import {render} from '@solidjs/web';
import {Time} from '@internationalized/date';
import {TimeField} from './vanilla/TimeField.solid';
import {Button} from './vanilla/Button.solid';
import {Form} from './vanilla/Form.solid';;
function Example(props: Record<string, unknown>) {return (<Form>
  <TimeField
    label="Appointment time"
    ///- begin highlight -///
    name="time"
    isRequired
    minValue={new Time(9)}
    maxValue={new Time(17)}
    validate={time => time?.minute % 15 !== 0 ? 'Appointments start every 15 minutes.' : null}
    ///- end highlight -///
  />
  <Button type="submit">Submit</Button>
</Form>);}
export const title = 'TimeField example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
