import {render} from '@solidjs/web';
import {I18nProvider} from 'solid-aria-components';
import {NumberField} from './vanilla/NumberField.solid';
export const title = 'Numbering system';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof I18nProvider>[0]> = {}) {
  return render(() => <I18nProvider locale="hi-IN-u-nu-deva" {...props}><NumberField label="Value" defaultValue={1024} /></I18nProvider>, element);
}
