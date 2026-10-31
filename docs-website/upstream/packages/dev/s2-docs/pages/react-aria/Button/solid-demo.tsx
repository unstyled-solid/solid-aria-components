import {render} from '@solidjs/web';
import {Button} from './Button.solid';

export const title = 'Press me';
export function mount(element: HTMLElement): () => void {
  return render(() => <Button onPress={() => alert('Button pressed!')}>Press me</Button>, element);
}
