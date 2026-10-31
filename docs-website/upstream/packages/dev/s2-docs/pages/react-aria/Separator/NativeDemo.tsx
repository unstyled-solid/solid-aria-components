import {Separator} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Horizontal and vertical separators';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './Separator.css';

export default function NativeDemo() {
  return <div style={{color: 'var(--text-color)'}}>
    <div style={{display: 'flex', 'flex-direction': 'column', 'text-align': 'center', gap: '8px'}}>
      Content above
      <Separator />
      Content below
    </div>
    <div style={{display: 'flex', 'flex-direction': 'row', 'margin-top': '16px', height: '40px', 'align-items': 'center', gap: '8px'}}>
      Content left
      <Separator orientation="vertical" />
      Content right
    </div>
  </div>;
}
