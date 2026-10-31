import { render } from '@solidjs/web';
import { InputGroup } from './vanilla/InputGroup.solid';
import { Input } from 'solid-aria-components';
function Example(props: Record<string, unknown>) {
    return (<InputGroup {...props}>
  <Input style={{ "width": '3ch', "box-sizing": 'content-box' }} maxlength={3} aria-label="First 3 digits" placeholder="000"/>
  –
  <Input style={{ "width": '2ch', "box-sizing": 'content-box' }} maxlength={2} aria-label="Middle 2 digits" placeholder="00"/>
  –
  <Input style={{ "width": '4ch', "box-sizing": 'content-box' }} maxlength={4} aria-label="Last 4 digits" placeholder="0000"/>
    </InputGroup>);
}
export const title = 'Group example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
