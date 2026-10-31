import { render } from '@solidjs/web';
import { Token, TokenField } from './tailwind/TokenField.solid';
import { TokenizingFieldValue } from './TokenizingFieldValue.solid';
function Example(props: Record<string, unknown>) {
    return (<TokenField {...props} defaultValue={TokenizingFieldValue.tokenize('This example automatically tokenizes #hashtags and @usernames in the text.', /(?<=[\s\u200B]|^)[#@][^\s\u200B]+(?=[\s\u200B])/g)}>
  {segment => <Token>{segment.text}</Token>}
    </TokenField>);
}
export const title = 'TokenField example 2';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
