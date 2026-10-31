import { render } from '@solidjs/web';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { TagFieldValue } from './TagFieldValue.solid';
function Example(props: Record<string, unknown>) {
    return (<TokenField allowsNewlines defaultValue={new TagFieldValue([
            { type: 'token', text: 'Architecture' },
            { type: 'token', text: 'Design' },
            { type: 'token', text: 'Development' },
            { type: 'token', text: 'Marketing' },
            { type: 'token', text: 'Sales' }
        ])} label="Categories">
  {segment => <Token>{segment.text}</Token>}
    </TokenField>);
}
export const title = 'TokenField example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
