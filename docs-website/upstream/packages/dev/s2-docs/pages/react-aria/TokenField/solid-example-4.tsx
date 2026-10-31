import { render } from '@solidjs/web';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { TokenizingFieldValue } from './TokenizingFieldValue.solid';
function Example(props: Record<string, unknown>) {
    return (<TokenField allowsNewlines defaultValue={TokenizingFieldValue.tokenize('This example automatically tokenizes #hashtags and @usernames in the text.', /(?<=[\s\u200B]|^)[#@][^\s\u200B]+(?=[\s\u200B])/g)} label="Message">
  {segment => <Token>{segment.text}</Token>}
    </TokenField>);
}
export const title = 'TokenField example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
