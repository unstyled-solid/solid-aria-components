import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Button} from './vanilla/Button.solid';
export const title = 'Events';
export function Example() {
  const [pointerType, setPointerType] = createSignal('');
  return <><Button onPressStart={e => setPointerType(e.pointerType)} onPressEnd={() => setPointerType('')}>Press me</Button><p>{pointerType() ? `You are pressing the button with a ${pointerType()}!` : 'Ready to be pressed.'}</p></>;
}
export function mount(element: HTMLElement) { return render(() => <Example />, element); }
