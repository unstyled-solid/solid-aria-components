import { render } from '@solidjs/web';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { TokenFieldValue } from 'solid-aria-components';
import { createSignal } from 'solid-js';
function Example() {
    let [value, setValue] = createSignal(new TokenFieldValue([
        { type: 'text', text: 'Hello ' },
        { type: 'token', text: '@username' },
        { type: 'text', text: '!' }
    ]));
    return (<>
      {/*- begin highlight -*/}
      <TokenField value={value()} onChange={setValue} label="Message">
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      {/*- end highlight -*/}
      <p>Value: {value().toString()}</p>
    </>);
}
export const title = 'TokenField example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
